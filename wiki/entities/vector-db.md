# Vector Database

**Category:** 저장소 / 인프라
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

AI 시대에 새로 등장한 저장소 계층. 텍스트·이미지·코드 등을 고차원 벡터(예: OpenAI 1536차원, Voyage 1024차원)로 임베딩해 저장하고, **ANN(Approximate Nearest Neighbor) 알고리즘**(HNSW, IVF, PQ)으로 유사도 검색을 수행. **Pinecone, Weaviate, Qdrant, Milvus, Chroma** 같은 전용 제품과, **pgvector(PostgreSQL), Supabase Vector, Elasticsearch, MongoDB Atlas Vector** 같은 기존 DB 확장형이 양대 진영. 2026년 트렌드는 "전용 vector DB vs 기존 DB 확장" 논쟁이 후자 쪽으로 기울고 있다는 것 — 운영 복잡도 절감이 성능보다 우선순위가 되었기 때문. [RAG](./rag.md) 파이프라인의 핵심 저장 계층이며 [Embedding Model](./embedding-model.md)과 [Augmented LLM](./augmented-llm.md) 논의에 반드시 등장.

## 설명

### 왜 벡터 DB가 필요한가

전통 RDB는 정확 일치(`WHERE name = 'Alice'`)와 범위 검색에 최적화되어 있다. 반면 LLM 시대의 검색은 **의미 유사도**(semantic similarity)가 필요하다. "고양이"라는 질의에 "냥이", "반려묘"가 나와야 하고, 영어 "cat"도 매칭되어야 한다. 이를 위해 텍스트를 **고차원 벡터 공간**에 투영한 뒤 **코사인 유사도 / 내적 / L2 거리**로 가장 가까운 벡터를 찾는다.

### 주요 제품 (2026 기준)

**전용 Vector DB**

| 제품 | 특징 | 포지션 |
|---|---|---|
| **Pinecone** | 관리형 SaaS, 사용 쉬움, serverless 티어 | 엔터프라이즈 기본값 |
| **Weaviate** | 오픈소스 + 하이브리드 검색 강점, GraphQL API | 자체 호스팅 선호 |
| **Qdrant** | Rust 기반, 고성능, 필터링 강력 | 성능 우선 프로젝트 |
| **Milvus** | Zilliz가 주도, 대규모(수십억 벡터)에 강함 | 하이퍼스케일 |
| **Chroma** | 로컬·임베디드, 개발자 친화 | 프로토타입 / LangChain 기본 |

**기존 DB 확장형 (2026 대세)**

| 제품 | 특징 |
|---|---|
| **pgvector** | PostgreSQL 확장, HNSW 지원, 운영 단일화 |
| **Supabase Vector** | pgvector 기반의 관리형 서비스 |
| **Elasticsearch** | kNN + BM25 하이브리드 네이티브 |
| **MongoDB Atlas Vector Search** | 기존 문서 DB와 통합 |
| **Redis Vector** | 캐시 + 벡터, 밀리초 지연 |

2026년 Gartner 보고서는 "2025년 vector DB 시장의 48%가 pgvector 계열로 이동"했다고 추산. 즉 **신규 저장소를 추가하는 부담**이 성능 이득보다 크다는 현장 판단.

### ANN 알고리즘 (핵심 3가지)

1. **HNSW (Hierarchical Navigable Small World)** — 그래프 기반, 가장 인기. Recall 대비 속도가 우수. Weaviate, Qdrant, pgvector 기본값.
2. **IVF (Inverted File Index)** — 벡터 공간을 클러스터로 분할한 뒤 일부 클러스터만 검색. 메모리 효율적. Milvus, FAISS에서 사용.
3. **PQ (Product Quantization)** — 벡터를 압축해 저장. 수십억 벡터 규모에서 필수. IVF-PQ, HNSW-PQ 결합 형태로 쓰인다.

**트레이드오프**: Recall ↔ Latency ↔ Memory. HNSW는 메모리 많이 먹고, IVF-PQ는 메모리 적지만 recall이 떨어진다.

### 차원과 비용

- **OpenAI text-embedding-3-small**: 1536차원 (또는 축소 가능 Matryoshka)
- **OpenAI text-embedding-3-large**: 3072차원
- **Voyage voyage-3**: 1024차원
- **Cohere embed-v3**: 1024차원
- **BGE-M3 (오픈소스)**: 1024차원

차원이 높을수록 표현력은 좋지만 **저장 비용과 검색 지연**이 선형 증가. 1M 문서 × 1536차원 × float32 = **6GB**. 1B 문서면 6TB. 그래서 **Product Quantization**으로 4~8배 압축이 사실상 필수.

### 2026 현장 통계

- RAG 프로덕션 시스템의 **71%가 pgvector 또는 Elasticsearch**를 1차 저장소로 사용 (LangChain SoAE 2026).
- 전용 vector DB를 선택한 조직의 주 이유는 **"수십억 벡터 규모"**와 **"멀티테넌시"**.
- 하이브리드 검색(벡터 + BM25) 없는 시스템의 RAG 품질은 vector-only 대비 평균 **-18% nDCG** (BEIR 벤치마크).

### 한계

- **임베딩 품질이 천장** — Garbage embedding → Garbage retrieval. [Embedding Model](./embedding-model.md) 선택이 더 중요.
- **업데이트 비용** — 문서가 바뀌면 재임베딩 + 재색인. CDC 파이프라인 필수.
- **Cold start** — HNSW 인덱스 빌드에 수 시간 걸림(수억 규모).
- **평가의 어려움** — 유사도가 "좋은 검색"을 보장하지 않음 → [Reranking](./reranking.md) 필요.

## Reference

- [Part 1 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/01-data-basics/)
- [Part 4 — Ch.06 엔터프라이즈 RAG 설계](https://ai-contents-wine.vercel.app/04-data-enterprise/)

## 연관 entity

- [Embedding Model](./embedding-model.md) — 벡터를 만드는 상류 단계
- [RAG](./rag.md) — 벡터 DB의 1차 유스케이스
- [Augmented LLM](./augmented-llm.md) — 외부 메모리 계층으로서의 벡터 DB
- [Hybrid Search](./hybrid-search.md) — 벡터 + 키워드 결합
- [Reranking](./reranking.md) — 벡터 검색 결과의 후처리
- [Chunking](./chunking.md) — 벡터화 이전 단계
- [Graph DB](./graph-db.md) — 대체/보완 저장소

## 출처

- Malkov & Yashunin, "Efficient and robust approximate nearest neighbor search using HNSW graphs", 2018.
- Jégou et al., "Product Quantization for Nearest Neighbor Search", 2011.
- Gartner, "Market Guide for Vector Databases", 2026 Q1.
- LangChain State of Agent Engineering 2026.
- pgvector documentation, 2026.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
