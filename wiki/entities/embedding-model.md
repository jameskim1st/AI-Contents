# Embedding Model

**Category:** 모델 / 도구
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

텍스트(또는 이미지, 코드)를 고정 길이의 벡터로 변환하는 모델. [RAG](./rag.md) 검색 품질의 기반. **2026년 MTEB 리더보드 1위는 Voyage AI의 `voyage-3-large`** — OpenAI `text-embedding-3-large` 대비 **+9.74%**, Cohere `embed-english-v3.0` 대비 **+20.71%** 평균 NDCG@10. 다만 "무조건 최신 모델"이 아니라 **언어·도메인·차원·비용**을 같이 봐야 한다.

## 설명

### 기본 원리

- 비슷한 의미의 텍스트는 벡터 공간에서 가깝게 배치된다.
- 코사인 유사도 또는 내적으로 검색.
- 차원(dimension)은 보통 384 ~ 3072.

### 2026년 주요 모델 비교

| 모델 | 차원 | MTEB 평균 | 특징 |
|---|---|---|---|
| **Voyage AI `voyage-3-large`** | 1024 (Matryoshka: 256/512/1024/2048) | **74.8** | 2026 MTEB 1위. 법률·금융 도메인 특화 모델(`voyage-law-2`, `voyage-finance-2`)도 제공 |
| OpenAI `text-embedding-3-large` | 3072 (축소 가능) | 64.6 | 생태계 호환성 최고, API 안정적 |
| Cohere `embed-english-v3.0` | 1024 | 62.0 | 다국어(100+), Compression 모드 지원 |
| Google `gemini-embedding-001` | 3072 | 68.3 | 2025 말 출시. 긴 컨텍스트(8k) |
| **BGE-M3** (BAAI, 오픈) | 1024 | 66.4 | 오픈소스 1위, dense/sparse/multi-vector 동시 |
| Nomic `nomic-embed-text-v2` | 768 | 62.9 | 완전 오픈(가중치+데이터+코드) |
| Jina `jina-embeddings-v3` | 1024 | 65.5 | 태스크 어댑터, 긴 컨텍스트(8k) |

### 선택 기준

1. **언어** — 한국어/다국어는 Voyage, Cohere, BGE-M3가 상대적으로 강함. 영어 전용이면 선택지 넓음.
2. **도메인** — 법률/의료/금융은 도메인 특화 모델이 일반 모델을 종종 앞선다 (Voyage 법률 벤치 +23%).
3. **차원(dimension)** — 크면 정확하지만 저장·검색 비용 증가. **Matryoshka Representation Learning**으로 동적 축소 가능.
4. **컨텍스트 길이** — 긴 문서는 8k+ 지원 모델이 유리 (Jina v3, Gemini).
5. **비용** — API 호출 비용 + 벡터 DB 저장 비용. 대규모(10M+ chunks)면 오픈소스 + 자체 호스팅이 합리적.
6. **라이선스** — 상용/오픈. BGE-M3, Nomic은 상업 사용 가능.

### 2026년 주요 트렌드

- **Matryoshka Embeddings** — 한 번 학습으로 여러 차원 지원 (OpenAI, Voyage, Nomic). 단계적 검색(coarse-to-fine)에 유리.
- **Multi-vector / ColBERT 2세대** — 청크당 벡터 여러 개 → 정확도↑, 비용↑. Vespa·Qdrant가 네이티브 지원.
- **Multimodal embeddings** — 텍스트+이미지 통합 (Voyage multimodal-3, Cohere Embed v3 Multimodal, Google multimodalembedding@001).
- **Domain adapter** — 기본 모델 + LoRA 스타일 어댑터로 도메인 특화.

### 함정

- MTEB 점수는 참고일 뿐 — 실제 도메인 QA 테스트셋으로 재평가 필수.
- "더 큰 차원 = 더 좋음"이 아님. 실서비스에서는 512~1024가 sweet spot.
- 임베딩 모델을 바꾸면 **전체 벡터 DB를 재인덱싱**해야 함.

## Reference

- [Part 1 — Ch.04 토큰과 임베딩](https://ai-contents-wine.vercel.app/01-llm/#llm-ch4)
- [Part 1 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/01-data-basics/)
- [Part 4 — Ch.06 엔터프라이즈 RAG 설계](https://ai-contents-wine.vercel.app/04-data-enterprise/)

## 연관 entity

- [RAG](./rag.md)
- [Chunking](./chunking.md) — 임베딩 모델의 컨텍스트에 맞춰야 함
- [Hybrid Search](./hybrid-search.md) — Dense 벡터의 한계를 BM25로 보완
- [Reranking](./reranking.md) — 임베딩 검색 위에 얹는 2차 필터
- [GraphRAG](./graphrag.md)

## 출처

- MTEB Leaderboard (HuggingFace), 2026-04 스냅샷.
- Voyage AI, "voyage-3-large Technical Report", 2025-11.
- BGE-M3 Paper (Chen et al., 2024).
- Nomic Atlas, "nomic-embed-text-v2 Release", 2025.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
