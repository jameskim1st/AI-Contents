# Hybrid Search

**Category:** 아키텍처 / 패턴
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

키워드 기반 검색(**BM25**)과 의미 기반 벡터 검색(**Dense Retrieval**)을 함께 돌린 뒤 **Reciprocal Rank Fusion(RRF)** 또는 가중합으로 결합하는 방식. 벡터만 쓰면 고유명사·숫자·약어·코드 같은 정확 매칭에서 구멍이 생기고, BM25만 쓰면 의미 일반화를 못 한다. **2026년 프로덕션 RAG의 사실상 표준** — LangChain SoAE 2026에 따르면 성공한 프로덕션 RAG의 **92%가 Hybrid Search를 사용**.

## 설명

### 왜 벡터만으로는 부족한가

- "SKU-A7X" 같은 고유 식별자는 벡터 공간에서 의미를 못 갖춘다.
- "2026년 3분기" 같은 정확한 날짜·숫자.
- 코드 스니펫, 에러 메시지.
- 약어·오타.

→ 이런 토큰은 **BM25가 압도적으로 우세**.

### 왜 BM25만으로는 부족한가

- "애플이 만든 회사"로 "Apple Inc." 찾기.
- 동의어·패러프레이즈.
- 다국어 (쿼리는 한국어, 문서는 영어).

→ 이런 케이스는 **Dense vector가 우세**.

### 결합 방식

#### 1. Reciprocal Rank Fusion (RRF)

```
score(d) = Σ 1 / (k + rank_i(d))
```

- 각 검색기의 순위만 사용 (점수 스케일 무시).
- `k=60`이 가장 흔한 기본값 (Microsoft 2020 논문).
- 튜닝 파라미터 최소 → 2026년 가장 널리 쓰임.

#### 2. Weighted Sum

```
score(d) = α * bm25_norm(d) + (1 - α) * vector_norm(d)
```

- `α`는 보통 0.3~0.5.
- 점수 정규화가 필요 (min-max 또는 z-score).
- 도메인별 튜닝 가능하지만 관리 비용 있음.

#### 3. ColBERT-style late interaction

- 토큰 수준 multi-vector 매칭 → 정확도 최고.
- 비용도 최고. Vespa, Qdrant가 지원.

### 2026 주요 제품

| 벡터 DB / 엔진 | Hybrid 기본 지원 | 비고 |
|---|---|---|
| **Weaviate** | O (hybrid search API) | α 파라미터 |
| **Qdrant** | O (sparse + dense) | BM42 자체 sparse |
| **Pinecone** | O (Serverless, 2024 이후) | sparse-dense index |
| **Elasticsearch / OpenSearch** | O (BM25 + kNN) | 전통적 기업 표준 |
| **Vespa** | O | ColBERT, 쿼리 프로파일 유연 |
| **pgvector + ts_vector** | 수동 결합 | Postgres 생태계 |

### 2026 트렌드: Learned Sparse

- **SPLADE v3**, **BM42** 같은 "학습된 sparse representation"이 순수 BM25를 대체 중.
- Dense와 같은 트랜스포머 모델을 쓰지만 결과는 sparse 벡터 → BM25와 벡터의 장점을 모두 가짐.

### 함정

- Elasticsearch의 `_score`를 그대로 α-weighted에 넣으면 스케일이 맞지 않아 한쪽이 늘 이긴다 → 정규화 필수.
- 같은 문서가 두 검색에서 모두 top에 들어오면 RRF가 강력하게 밀어올리지만, 그게 항상 정답은 아님 → [Reranking](./reranking.md) 필수.

## Reference

- [Part 11 — Ch.06 엔터프라이즈 RAG 설계](https://ai-contents-wine.vercel.app/11-data-enterprise/)
- [Part 10 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/10-data-basics/)

## 연관 entity

- [RAG](./rag.md)
- [Embedding Model](./embedding-model.md)
- [Reranking](./reranking.md) — Hybrid 결과의 Top-100을 Top-10으로 줄이는 후속 단계
- [Chunking](./chunking.md)
- [RAGAS](./ragas.md)

## 출처

- Cormack, Clarke, Büttcher, "Reciprocal Rank Fusion Outperforms Condorcet and Individual Rank Learning Methods", SIGIR 2009.
- Microsoft Research, "RRF for Large-scale Retrieval", 2020.
- LangChain State of Agent Engineering 2026.
- Qdrant BM42 announcement, 2024.
- Weaviate Hybrid Search Docs, 2026.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
