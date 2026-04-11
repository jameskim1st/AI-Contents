# Evaluation (Agent)

**Category:** 도구 / 운영
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

에이전트의 출력 품질을 자동으로 측정하는 시스템. **52%만 도입** (LangChain SoAE 2026) — Observability(89%)와 큰 갭. 비결정성 때문에 전통적 unit test가 무력. LLM-as-judge, 시나리오 기반 eval, "벤치마크가 깨졌다" 문제가 핵심 화두.

## 설명

### 왜 어려운가

전통적 테스트의 두 가정이 모두 깨짐:
- ❌ "같은 입력 = 같은 출력" — 비결정성
- ❌ "정답이 명확히 정의됨" — LLM은 여러 좋은 답 가능

### 평가 방법

#### 1. LLM-as-judge

다른 LLM이 출력을 평가:
```
"다음 답변이 사용자 질문에 적절한가? 1-5점으로 평가"
```
- 장점: 자동, 확장 가능
- 단점: judge LLM도 편향, 비싸고 느림

#### 2. 시나리오 기반 (scenario-based)

미리 정의한 시나리오 N개에 대해 통과/실패 측정:
```
시나리오: "고객이 환불 요청"
기대: 에이전트가 정책 확인 + 사람 escalation
체크: tool_call="check_refund_policy" 호출했나? 
       tool_call="escalate_to_human" 호출했나?
```

#### 3. 최종 메트릭

- 정확도, 유용성 (사람이 평가)
- 작업 완수율 (task success rate)
- 비용·지연시간
- 사용자 만족도 (CSAT)

#### 4. Continuous evaluation

매 모델 변경, 매 프롬프트 변경, 매 도구 추가 시 자동 eval. CI/CD의 일부.

### "Web agent benchmarks are broken"

- WebArena, Mind2Web 등 인기 벤치 → 통과해도 프로덕션 실패
- 벤치는 한정된 환경, 프로덕션은 무한 변형
- 결론: 벤치에 의존하지 말고 **자기 도메인 시나리오로 평가** 해야 함

### 주요 도구 (2026)

| 도구 | 회사 | 강점 |
|---|---|---|
| **Braintrust** | Braintrust | Eval + obs 통합 |
| **Maxim** | Maxim AI | 멀티 에이전트 평가 |
| **Latitude** | Latitude | 오픈소스 |
| **Patronus** | Patronus AI | 환각 검출 특화 |
| **Phoenix** | Arize | 오픈소스 + obs |

### 89% vs 52% — 왜 이런 갭이?

- Observability는 라이브러리 한 줄 추가하면 시작 가능
- Eval은 "무엇을 평가할지"를 사람이 정의해야 함 → 인지 비용 ↑
- 결과: "보고는 있는데 평가는 못 함"

### 개선 패턴

1. 처음 1주: LLM-as-judge로 baseline
2. 1개월: 시나리오 50개 정의
3. 3개월: Continuous eval 파이프라인
4. 6개월: 사용자 피드백 → eval 시나리오로 환원

## Reference

- [Part 3 — Ch.08 Evaluation — 비결정 시스템 평가](https://ai-contents-wine.vercel.app/03-ai-agents-advanced/) ⭐

## 연관 entity

- [Observability](./observability.md) — 보완 영역
- [Production Gap](./production-gap.md)
- [Human-in-the-Loop](./human-in-the-loop.md) — 평가 결과를 사람 fallback에 활용

## 출처

- LangChain State of Agent Engineering 2026 (89%/52% 통계)
- Agent Observability and Evaluation Guide (Towards AI 2026)
- Top 5 AI Agent Evaluation Tools 2026 (Latitude)
- Top 5 AI Evaluation Platforms 2026 (Maxim)

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
