# Reranking

**Category:** 아키텍처 / 패턴
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

1차 검색(벡터·BM25·[Hybrid](./hybrid-search.md))이 뽑아온 Top-100 문서를 **Cross-encoder 모델**로 다시 점수 매겨 Top-10으로 좁히는 단계. Bi-encoder(임베딩 검색)보다 훨씬 정확하지만 **훨씬 느리기 때문에** 1차 검색 뒤에만 쓴다. 2026년 실전 RAG에서 **정확도에 단일 요소로 가장 큰 영향**을 미치는 기법 — Cohere·Pinecone 벤치마크 공통 +20~35% NDCG 개선.

## 설명

### Bi-encoder vs Cross-encoder

| | Bi-encoder (임베딩 검색) | Cross-encoder (재정렬) |
|---|---|---|
| 구조 | Query와 Doc을 각각 인코딩 | Query·Doc을 **같이** 인코딩 |
| 속도 | 빠름 (문서는 사전 계산 가능) | 느림 (쿼리마다 전체 재계산) |
| 정확도 | 적절함 | 훨씬 높음 |
| 사용처 | 1차 후보 검색 | Top-N 재정렬 |

→ 자연스러운 결합: **Bi-encoder로 Top-100 뽑고 → Cross-encoder로 Top-10 재정렬**. 이 패턴이 2026년 표준.

### 2026 주요 Reranker

| 모델/API | 회사 | 특징 |
|---|---|---|
| **Cohere Rerank v3.5** | Cohere | API 표준, 100+ 언어, multimodal 지원 |
| **BGE Reranker v2-m3** | BAAI | 오픈소스 1위, 경량 버전(`v2-m3-gemma`) |
| **Voyage `rerank-2`** | Voyage AI | 긴 컨텍스트(16k), 도메인 특화 |
| **Jina Reranker v2** | Jina AI | 다국어, 상용 가능 |
| **Mixedbread `mxbai-rerank-large-v1`** | Mixedbread | 오픈소스, Apache 2.0 |
| **FlashRank** | 오픈소스 | ONNX 기반 초경량 (수 ms) |

### Top-100 → Top-10 패턴

```
User Query
  ↓
Hybrid Search (BM25 + Dense, RRF)
  ↓
Top-100 candidates
  ↓
Cross-encoder Reranker
  ↓
Top-10 for LLM context
  ↓
LLM Generate
```

왜 100 → 10인가:
- 1차 검색의 Recall은 높지만 Precision이 낮다.
- LLM context window는 한정 → Top-10 정도가 보통 sweet spot.
- "Lost in the middle" 현상 때문에 Top-5만 쓰는 팀도 많음.

### 정확도 영향 (2026 벤치)

- Cohere Rerank 3.5 공식 벤치마크: **BEIR 평균 +22% NDCG@10** (Hybrid 대비).
- Pinecone 2026 리포트: **엔터프라이즈 QA에서 reranker 도입만으로 hallucination -34%**.
- 단순 벡터 Only → Hybrid → Hybrid+Rerank로 갈수록 정확도 곡선은 계단식 상승.

### 비용/지연 트레이드오프

- Cohere Rerank API: 100 docs 재정렬 약 100~200ms, 호출당 $0.002 수준.
- 자체 호스팅 (BGE v2-m3): GPU A10G 한 장으로 초당 수십 쿼리.
- FlashRank: CPU만으로 가능, 정확도는 낮음.

### LLM-as-Reranker

- 2025~2026 실험: Claude/GPT가 직접 Top-10을 고르도록 하는 "LLM reranker". 정확도는 최고지만 비용·지연이 Cross-encoder의 10배 이상. [Agentic RAG](./rag.md) 맥락에서 주로 등장.

### 함정

- 1차 검색이 관련 문서를 Top-100에 못 넣었으면 reranker가 구해줄 수 없음 → Recall부터 올려야 함.
- Reranker는 "검색 결과를 고르는" 작업이지 "답하는" 작업이 아님. 생성 품질은 별도 문제.

## 강의 어디에 나오나

- [Part 4 — Ch.06 엔터프라이즈 RAG 설계](../../src/content/data-enterprise.html)
- [Part 1 — Ch.04 데이터의 두 세계](../../src/content/data-basics.html)

## 연관 entity

- [RAG](./rag.md)
- [Hybrid Search](./hybrid-search.md) — 통상 reranker의 입력을 만든다
- [Embedding Model](./embedding-model.md) — Bi-encoder 담당
- [RAGAS](./ragas.md) — Context Precision으로 reranker 효과 측정
- [Evaluation](./evaluation.md)

## 출처

- Cohere, "Rerank 3.5 Benchmark Report", 2025.
- Pinecone, "State of Retrieval 2026".
- BGE Reranker v2 Technical Report (BAAI), 2024.
- Nogueira & Cho, "Passage Re-ranking with BERT", 2019 (원조).

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
