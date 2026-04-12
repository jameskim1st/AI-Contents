# Prompt Caching

**Category:** 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

동일한 시스템 프롬프트나 context prefix를 반복 전송할 때, 이를 캐싱하여 **토큰 처리 비용을 최대 90% 절감**하는 기법. 2024년 8월 Anthropic이 도입하고, 2024년 10월 OpenAI가 뒤이어 도입했다. 에이전트 시대에 같은 `CLAUDE.md`나 시스템 지시를 매 호출마다 보내는 비용을 제거하는 결정적 최적화이며, 내부적으로는 **KV cache 재사용** 원리에 기반한다.

## 설명

### 문제 — 반복되는 프롬프트 비용

LLM API를 사용할 때, 대부분의 요청은 동일한 구조를 공유한다:

```
[시스템 프롬프트: 2,000 토큰] ← 매번 동일
[컨텍스트 문서: 10,000 토큰] ← 매번 동일
[사용자 메시지: 200 토큰]   ← 요청마다 다름
```

전체 12,200 토큰 중 **12,000 토큰(98%)**이 매 요청마다 반복된다. 이를 매번 처음부터 처리하는 것은 비용과 지연(latency) 측면에서 낭비다.

에이전트 시나리오에서는 이 문제가 극대화된다. [Claude Code](./claude-code.md) 같은 코딩 에이전트는 한 세션에서 수십~수백 번 API를 호출하며, 매번 동일한 [CLAUDE.md](./claude-md.md) 설정 파일과 시스템 프롬프트를 전송한다.

### KV Cache 재사용 원리

[Transformer](./transformer.md)가 텍스트를 처리할 때, 각 토큰에 대해 **Key(K)**와 **Value(V)** 벡터를 계산한다. 이 KV 값들은 Attention 메커니즘에서 사용되며, 동일한 입력에 대해서는 항상 같은 KV 값이 산출된다.

```
일반 처리:
  요청 1: [시스템 프롬프트] → KV 계산 → [사용자 메시지] → KV 계산 → 응답
  요청 2: [시스템 프롬프트] → KV 재계산 ← 낭비!  → [사용자 메시지] → KV 계산 → 응답

Prompt Caching:
  요청 1: [시스템 프롬프트] → KV 계산 → 캐시 저장 → [사용자 메시지] → 응답
  요청 2: [시스템 프롬프트] → 캐시 히트! → [사용자 메시지] → 응답
```

캐시된 토큰은 KV 계산을 건너뛰므로 **연산 비용과 지연이 대폭 감소**한다.

### Anthropic의 Prompt Caching (2024년 8월)

Anthropic은 Claude API에서 명시적 캐시 제어 방식을 도입했다:

```json
{
  "system": [
    {
      "type": "text",
      "text": "당신은 PwC의 AI 컨설턴트입니다...",
      "cache_control": {"type": "ephemeral"}
    }
  ],
  "messages": [...]
}
```

- `cache_control` 블록을 통해 개발자가 **어떤 부분을 캐싱할지 명시적으로 지정**
- 캐시 타입: `ephemeral` (약 5분 유지, 사용 시마다 갱신)
- **캐시 쓰기**: 일반 입력 토큰 비용의 1.25배 (최초 1회)
- **캐시 읽기**: 일반 입력 토큰 비용의 **0.1배** (이후 요청) → **90% 절감**
- 최소 캐싱 단위: 1,024 토큰 (Claude 3.5 Sonnet 기준)

### OpenAI의 Automatic Prefix Caching (2024년 10월)

OpenAI는 다른 접근을 택했다:

- **자동 감지**: 개발자가 별도 설정 없이도 동일한 prefix를 자동으로 캐싱
- 요청의 앞부분(prefix)이 이전 요청과 동일하면 자동 캐시 히트
- **캐시 읽기**: 입력 토큰 비용의 **0.5배** (50% 절감)
- 명시적 제어 불가 — 시스템이 자동으로 판단

| 비교 | Anthropic | OpenAI |
|---|---|---|
| 제어 방식 | 명시적 (`cache_control`) | 자동 (prefix matching) |
| 절감률 | 최대 90% | 최대 50% |
| 개발자 부담 | 코드 수정 필요 | 수정 불필요 |
| 유연성 | 높음 (캐시 대상 선택 가능) | 낮음 (prefix만 캐싱) |

### 에이전트 시대의 필수 기술

에이전트 아키텍처에서 prompt caching이 결정적인 이유:

1. **[Claude Code](./claude-code.md)**: 한 세션에 수백 번 API 호출. 매번 CLAUDE.md + 시스템 프롬프트 + 컨텍스트를 전송. 캐싱 없이는 비용이 수십 배로 불어남
2. **[MCP](./mcp.md) 기반 에이전트**: 도구 정의(tool schema)가 매 호출에 포함됨. 도구가 20개이면 도구 정의만 수천 토큰
3. **RAG 시스템**: 검색된 문서를 context로 넣을 때, 공통 문서 부분을 캐싱
4. **멀티턴 대화**: 대화 히스토리가 길어질수록 prefix가 커지므로 캐싱 효과 극대화

### 실전 비용 영향 예시

10,000 토큰 시스템 프롬프트를 가진 에이전트가 하루 1,000회 호출하는 경우:

```
캐싱 없이: 10,000 x 1,000 = 10M 입력 토큰/일
캐싱 적용 (Anthropic):
  - 캐시 쓰기: 10,000 x 1 x 1.25배 = 12,500 토큰 비용
  - 캐시 읽기: 10,000 x 999 x 0.1배 = 999,000 토큰 비용
  - 합계: 약 1M 토큰 비용 (90% 절감)
```

### Google, 기타 제공업체

- **Google Gemini**: 2024년 말 Context Caching 도입. 긴 문서(수십만 토큰)를 캐싱하는 데 특화
- **Together AI, Fireworks**: 오픈소스 모델 호스팅에서도 prefix caching 지원 확대

## Reference

- [Part 1 — Ch.07 Context Engineering](https://ai-contents-wine.vercel.app/01-llm/#llm-ch7)

## 연관 entity

- [MCP](./mcp.md) — 에이전트 도구 호출 시 prompt caching과 시너지
- [Harness Engineering](./harness-engineering.md) — 하네스에 포함되는 시스템 프롬프트 캐싱
- [Claude Code](./claude-code.md) — prompt caching의 대표적 수혜 에이전트

## 출처

- Anthropic "Prompt Caching" documentation (2024.08)
- OpenAI "API Prompt Caching" announcement (2024.10)
- Deepfounder "AI Reasoning Models 2026" (prompt caching과 reasoning 비용 절감 맥락)

## 업데이트 이력

- 2026-04-12 — 신규 생성.
