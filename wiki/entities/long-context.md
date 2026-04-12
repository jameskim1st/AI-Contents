# Long Context (롱 컨텍스트)

**Category:** 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

LLM의 컨텍스트 윈도우가 128K~2M 토큰으로 확장되면서 "코드베이스 통째로 넣기", "전체 책 한 번에 분석" 같은 사용법이 가능해졌다. "Long context가 [RAG](./rag.md)를 죽이나?" 논쟁이 2025~2026년 뜨겁지만, 현실적 결론은 **RAG + Long context를 함께 쓰는 Hybrid 접근이 2026년 표준**이다. 비용은 prompt caching으로 90%까지 절감 가능.

## 설명

### 주요 모델의 컨텍스트 윈도우 (2026)

| 모델 | 컨텍스트 윈도우 | 비고 |
|---|---|---|
| **Claude 3.5 / Opus 4** | 200K 토큰 (확장 1M) | Anthropic. 1M은 Claude Code 등 특정 환경에서 사용 가능 |
| **Gemini 2.0** | 2M 토큰 | Google. 현존 최대 컨텍스트 |
| **GPT-4o** | 128K 토큰 | OpenAI |
| **Llama 3.1** | 128K 토큰 | Meta |

### 실전 사용 사례

- **코드베이스 통째로 넣기** — 중소 프로젝트(수만 줄)를 전부 컨텍스트에 넣고 리팩토링·버그 분석. Claude Code가 이 패턴을 적극 활용.
- **전체 책 분석** — 300~500페이지 책을 한 번에 넣고 요약·질의응답. Gemini 2M이 특히 강점.
- **긴 회의록·법률 문서** — 수시간 분량의 회의 녹취록이나 수백 페이지 계약서를 통째로 분석.
- **멀티 파일 diff 리뷰** — PR의 모든 변경 파일을 한 번에 컨텍스트에 넣고 코드 리뷰.

### "Long Context가 RAG를 죽이나?" 논쟁

#### RAG가 여전히 필요한 이유

- **비용** — 1M 토큰 입력 = Claude 기준 약 **$3**. 매 질문마다 전체를 넣으면 비용이 폭발한다.
- **최신성** — 컨텍스트에 넣을 문서가 실시간으로 변하면 매번 다시 로드해야 함. 검색이 더 효율적.
- **규모** — 수백만 건의 문서 중 관련된 것만 찾아야 하는 경우, 전부 컨텍스트에 넣는 것은 물리적으로 불가.

#### Long Context가 RAG를 대체하는 영역

- **소규모 고정 문서** — 한 권의 매뉴얼, 하나의 코드베이스처럼 크기가 고정되고 자주 안 바뀌는 경우.
- **정밀 분석** — chunking으로 잘라내면 맥락이 손실되는 경우, 전체를 넣는 것이 품질이 월등히 높음.

#### 2026년 표준: Hybrid 접근

1. RAG로 관련 문서를 **검색·필터링**
2. 필터링된 결과를 **긴 컨텍스트에 통째로 주입**
3. LLM이 풍부한 맥락에서 답변 생성

→ "검색의 효율" + "긴 컨텍스트의 품질"을 결합.

### 한계: "Lost in the Middle"

Liu et al. (2023) "Lost in the Middle: How Language Models Use Long Contexts"에서 발견:

- LLM은 컨텍스트의 **처음과 끝**에 있는 정보는 잘 활용하지만, **중간에 있는 정보를 무시하는 경향**이 있다.
- 이 현상은 모델·태스크에 따라 정도가 다르지만, 2026년에도 완전히 해결되지 않았다.
- **대응 전략**: 중요 정보를 컨텍스트 앞이나 끝에 배치, 또는 반복 배치.

### Needle in a Haystack 벤치마크

긴 컨텍스트 안에 숨긴 특정 사실("needle")을 모델이 찾아낼 수 있는지 테스트하는 벤치마크. Claude와 Gemini는 거의 100% 정확도를 보이지만, 실제 복잡한 추론 태스크에서는 이 수치가 그대로 적용되지 않는다는 것이 학계의 컨센서스.

### 비용과 Prompt Caching

- **1M 토큰 입력 비용** (Claude 기준): 약 $3.
- **Prompt Caching**: 동일한 시스템 프롬프트나 문서를 반복 사용할 때, 캐시된 토큰은 **90% 할인**. 예: 코드베이스를 한 번 캐시해두면 이후 질문마다 $0.30 수준.
- Anthropic·Google 모두 prompt caching을 API에서 제공 (2025~).

## Reference

- [Part 2 — Ch.07 Context Engineering](https://ai-contents-wine.vercel.app/02-llm/#llm-ch7)
- [Part 9 — Ch.06 엔터프라이즈 RAG 설계](https://ai-contents-wine.vercel.app/09-data-enterprise/)
- [Part 6 — Ch.09 LLM Wiki](https://ai-contents-wine.vercel.app/06-vibe-master/) (long context와 RAG의 관계)

## 연관 entity

- [RAG](./rag.md) — long context의 가장 중요한 비교 대상
- [Chunking](./chunking.md) — long context가 충분하면 chunking을 줄이거나 생략 가능
- [Context Engineering](./context-engineering.md) — 긴 컨텍스트를 효과적으로 설계하는 방법론
- [Memory](./memory.md) — 컨텍스트 윈도우를 넘는 정보는 memory로 관리
- [SLM](./slm.md) — SLM은 컨텍스트 윈도우가 작아 long context의 반대 지점에 위치

## 출처

- Liu et al., "Lost in the Middle: How Language Models Use Long Contexts", 2023.
- Anthropic, "Introducing 200K Context Window", 2024. / "1M Context", 2025.
- Google, "Gemini 1.5 Pro — 2M Context", 2025.
- Anthropic, "Prompt Caching", 2025.
- Kamradt, "Needle in a Haystack Benchmark", 2023.

## 업데이트 이력

- 2026-04-12 — 신규 생성.
