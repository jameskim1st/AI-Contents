# RAG (Retrieval-Augmented Generation)

**Category:** 아키텍처 / 패턴
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

LLM이 답변을 생성하기 전에 외부 지식 저장소에서 관련 문서를 검색해 컨텍스트로 주입하는 패턴. **Lewis et al. 2020 논문**에서 처음 제안된 이후 엔터프라이즈 LLM 배포의 사실상 표준이 되었다. 기본 파이프라인은 Query → Retrieve → Rerank → Augment → Generate 5단계. **2026년 현장의 가장 뼈아픈 통계: RAG 실패의 약 80%는 모델이 아니라 ingestion과 chunking 단계에서 발생한다** (Databricks·Unstructured 2026 리포트 공통). 한계(매 질문마다 재검색)를 극복하려는 시도가 [LLM Wiki](./llm-wiki.md)와 [GraphRAG](./graphrag.md).

## 설명

### 기본 5단계 파이프라인

```
[User Query]
   ↓
1. Query Understanding (재작성, HyDE, 멀티쿼리)
   ↓
2. Retrieve (Vector + BM25 → Hybrid)
   ↓
3. Rerank (Cross-encoder)
   ↓
4. Augment (컨텍스트 주입, 프롬프트 합성)
   ↓
5. Generate (LLM 호출)
   ↓
[Answer + Citations]
```

### 2020 → 2026 진화

- **2020 (Naive RAG)** — Fixed chunking + dense retrieval + GPT-3.
- **2023 (Advanced RAG)** — Hybrid search, reranking, parent-child 구조.
- **2024 (Modular RAG)** — Router, memory, agent loop와 결합.
- **2025 (Agentic RAG)** — 에이전트가 검색 계획을 세우고 반복.
- **2026 (Post-RAG 논쟁)** — Karpathy의 [LLM Wiki](./llm-wiki.md), Microsoft의 [GraphRAG](./graphrag.md), 긴 컨텍스트 LLM(2M+) 덕에 "RAG가 아직도 필요한가" 논쟁이 본격화.

### 2026년 핵심 통계

- **RAG 실패의 80%가 ingestion/chunking 단계에서 발생** (Databricks Customer Report 2026, Unstructured State of Unstructured Data 2026 공통).
- 엔터프라이즈 RAG 프로젝트의 **63%가 프로토타입 → 프로덕션 전환에 실패** (Gartner 2026 Q1).
- 성공한 프로덕션 RAG의 **92%가 Hybrid Search를 사용** (LangChain SoAE 2026).

### 왜 RAG가 여전히 지배적인가

- **데이터 지역성** — 기업 데이터를 외부에 노출하지 않고 활용.
- **출처 추적** — 답변마다 citation을 제공 가능 → 거버넌스 요구(EU AI Act) 충족.
- **최신성** — 모델 재학습 없이 지식 업데이트.
- **비용** — Fine-tuning 대비 10~100배 저렴.

### 한계

- 매 질문마다 재검색 (누적 없음) — [LLM Wiki](./llm-wiki.md)가 이 지점을 공격.
- 여러 문서에 걸친 추론 약함 — [GraphRAG](./graphrag.md)가 보완.
- 검색 품질이 전체 품질의 천장 → [Hybrid Search](./hybrid-search.md), [Reranking](./reranking.md) 필수.
- 평가가 어렵다 → [RAGAS](./ragas.md) 같은 자동 메트릭 필요.

## Reference

- [Part 8 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/08-data-basics/)
- [Part 9 — Ch.06 엔터프라이즈 RAG 설계](https://ai-contents-wine.vercel.app/09-data-enterprise/)
- [Part 6 — Ch.09 LLM Wiki](https://ai-contents-wine.vercel.app/06-vibe-master/) (RAG와의 대비)

## 연관 entity

- [Chunking](./chunking.md) — 파이프라인 1단계 품질을 결정
- [Embedding Model](./embedding-model.md) — 검색 품질의 기반
- [Hybrid Search](./hybrid-search.md) — 2026 기본 검색 방식
- [Reranking](./reranking.md) — Top-k 정렬의 마지막 관문
- [RAGAS](./ragas.md) — 자동 평가
- [GraphRAG](./graphrag.md) — 다중 문서 추론용 진화형
- [Document AI](./document-ai.md) — ingestion 전처리
- [LLM Wiki](./llm-wiki.md) — 재검색 없는 대안
- [Evaluation](./evaluation.md)
- [Observability](./observability.md)

## 출처

- Lewis et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", NeurIPS 2020.
- Databricks State of Data + AI 2026.
- Unstructured.io, "State of Unstructured Data 2026".
- Gartner, "Hype Cycle for Generative AI 2026 Q1".
- LangChain State of Agent Engineering (SoAE) 2026.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
