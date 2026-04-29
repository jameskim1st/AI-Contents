# RAGAS

**Category:** 도구 / 평가
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

[RAG](./rag.md) 파이프라인을 **레이블 없는 데이터에서 자동 평가**하는 오픈소스 프레임워크 (ragas.io). 핵심 아이디어: LLM을 "채점자(LLM-as-judge)"로 써서 사람 주석 없이도 품질을 측정한다. 4대 메트릭이 **Faithfulness / Answer Relevance / Context Precision / Context Recall**. 2023년 Exploding Gradients에서 출발, 2026년에는 LangSmith·Braintrust·Langfuse와 네이티브 통합. [Evaluation](./evaluation.md) 도입률 52%의 현실에서 "처음 도입하기 가장 쉬운 RAG 평가 도구".

## 설명

### 4대 핵심 메트릭

| 메트릭 | 질문 | 측정 대상 |
|---|---|---|
| **Faithfulness** | "답변이 컨텍스트에만 근거하는가?" (할루시네이션 여부) | 생성 |
| **Answer Relevance** | "답변이 질문에 실제로 답하는가?" | 생성 |
| **Context Precision** | "검색된 컨텍스트 중 실제로 관련 있는 건 몇 %인가?" | 검색 |
| **Context Recall** | "정답에 필요한 컨텍스트를 다 찾아왔는가?" | 검색 |

→ 검색 품질(Precision/Recall)과 생성 품질(Faithfulness/Relevance)을 **분리해서** 측정할 수 있는 것이 가장 큰 가치. "RAG가 나쁜데 어디가 나쁜지 모른다" 문제를 해결.

### 2026 확장 메트릭

- **Answer Correctness** — ground-truth가 있을 때 정답과의 의미 유사도.
- **Answer Similarity** — 의미 벡터 유사도.
- **Aspect Critique** — "답변이 유해한가/편향됐나/공식적인가" 같은 커스텀 기준.
- **Noise Sensitivity** — 컨텍스트에 무관한 문서를 섞었을 때 정확도 하락 정도 (2025 추가).
- **Multi-hop Precision** — GraphRAG·다단계 RAG용 (2026 추가).

### 어떻게 동작하나 (Faithfulness 예시)

1. 생성된 답변을 **claim 단위**로 분해 ("X는 Y이다", "A는 B보다 크다"…).
2. 각 claim에 대해 "컨텍스트로부터 뒷받침되는가?"를 **LLM-as-judge**가 평가.
3. `faithfulness = 뒷받침되는 claim / 전체 claim`.

### 실전 도입 방법

1. **데이터셋 준비** — 질문 50~200개. ground-truth 답이 없어도 됨 (Faithfulness, Answer Relevance는 reference-free).
2. **Synthetic test set** — RAGAS의 `TestsetGenerator`가 내 문서에서 질문·답을 [Synthetic Data](./synthetic-data.md) 방식으로 자동 생성.
3. **베이스라인 측정** — 현재 파이프라인의 4대 메트릭 기록.
4. **A/B 실험** — chunking·embedding·reranker 바꿀 때마다 재측정.
5. **CI 통합** — LangSmith/Braintrust에서 PR마다 자동 실행.

### 2026 통계

- LangChain SoAE 2026: RAG 평가 도구 도입률 중 **RAGAS 41%** (1위), Promptfoo 19%, TruLens 14%, 커스텀 26%.
- GitHub 스타 16k+ (2026-04 기준).
- Faithfulness 메트릭은 사람 평가와의 Pearson 상관 0.7 이상 (ragas 공식 벤치).

### 한계

- LLM-as-judge는 **판사 모델 자체의 편향**을 물려받음 (GPT-4가 GPT-4 답변에 후하다는 2024 연구).
- 비용: 1회 평가 세트 실행에 판사 LLM 호출 수백~수천 건.
- Ground-truth 없이 돌리면 절대 수치가 아닌 **상대 비교**로만 써야 함.
- 한국어·일본어는 claim 분해 품질이 영어보다 떨어진다 → 판사 모델로 Claude Opus/GPT-4o 권장.

## Reference

- [Part 9 — Ch.07 RAG 평가와 운영](https://ai-contents-wine.vercel.app/09-data-enterprise/)
- [Part 4 — Ch.10 Observability + Evaluation (Part B)](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch10)

## 연관 entity

- [RAG](./rag.md) — 평가 대상
- [Evaluation](./evaluation.md) — 상위 개념
- [Observability](./observability.md) — 트레이싱과 함께 씀
- [Synthetic Data](./synthetic-data.md) — test set 자동 생성
- [Hybrid Search](./hybrid-search.md) — Context Precision/Recall로 측정
- [Reranking](./reranking.md)
- [Chunking](./chunking.md)

## 출처

- Es et al., "RAGAS: Automated Evaluation of Retrieval Augmented Generation", EACL 2024.
- ragas.io 공식 문서 (2026).
- LangChain State of Agent Engineering 2026.
- Exploding Gradients blog, 2024~2026.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
