# GraphRAG

**Category:** 아키텍처 / 패턴
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

**지식 그래프(Knowledge Graph)를 RAG와 결합**한 검색 패턴. Microsoft Research가 2024년 7월 논문·오픈소스로 공개한 이후 2025~2026 엔터프라이즈 RAG의 차세대 표준으로 부상. 기존 벡터 [RAG](./rag.md)가 약한 지점 — **여러 문서에 걸친 추론**, **"이 사건과 그 사건은 어떻게 연결되나"** 같은 multi-hop 질의 — 를 그래프 순회로 해결한다. **LinkedIn 고객 지원 사례: 평균 해결 시간 28.6% 감소** (Microsoft 2025 blog). Neo4j·TigerGraph·Kuzu + LLM 조합이 흔한 스택.

## 설명

### 왜 벡터 RAG만으로 부족했나

- "2022년 X 법인의 이사가 2024년 어느 회사로 이동했나" → 여러 문서를 연결해야 답 나옴.
- "이 특허가 인용한 논문의 저자가 만든 회사는?" → 2~3 hop 추론.
- 벡터 검색은 "쿼리와 의미 비슷한 청크"만 가져오지, **엔터티 관계**를 따라가지 못한다.

### GraphRAG의 파이프라인

1. **Indexing 단계** (한 번만)
   - LLM이 문서에서 entity와 relation을 추출 → (주체, 관계, 객체) 트리플.
   - Hierarchical community detection (Leiden 알고리즘)으로 클러스터링.
   - 각 커뮤니티에 대해 LLM이 요약을 생성 → "community summary".
2. **Query 단계**
   - **Global search** — community summary들을 훑으며 폭넓은 질문에 답.
   - **Local search** — 특정 entity에서 시작해 그래프 이웃과 관련 청크를 모아 답.
   - **Drift search** (2025 추가) — Local에서 시작해 Global로 확장하는 하이브리드.

### 2026 실전 사례

- **LinkedIn** — 고객 지원 티켓 시스템에 GraphRAG 도입, 평균 해결 시간 **28.6% 감소** (Microsoft Research 2024 + LinkedIn Engineering Blog 2025).
- **Glean** — 엔터프라이즈 검색에 Glean Knowledge Graph 적용.
- **Bloomberg** — 금융 entity 그래프 + RAG로 뉴스·공시 간 추론.
- **Neo4j + LangChain** — `Neo4jGraph` + `GraphCypherQAChain` 표준 레시피.

### 언제 쓰나 (vs 쓰지 마나)

**GraphRAG가 맞는 경우:**
- 문서 간 관계·인용·상속이 핵심 (법률·논문·공시·특허).
- Multi-hop 질의가 많음.
- 엔터티(사람·회사·제품)가 문서의 주된 단위.
- 답변에 "전체 주제 요약"이 필요 (community summary의 강점).

**GraphRAG가 과한 경우:**
- FAQ·고객 매뉴얼 같은 단일 문서 내 답변.
- 데이터가 자주 바뀜 → 인덱싱 비용 폭증.
- 작은 코퍼스 (1만 청크 미만) — 벡터 RAG로 충분.

### 비용 현실

- Indexing 1회 비용이 벡터 RAG의 **10~50배** (LLM이 entity·relation 추출).
- Microsoft 공식 예제 기준 1GB 텍스트 인덱싱에 수백 달러.
- 2025 이후 `graph-rag-fast` 같은 경량 변형 등장 (Docugami, Kuzu 등).

### 2026 주요 구현체

| 이름 | 제공 | 특징 |
|---|---|---|
| **Microsoft GraphRAG** | Microsoft (MIT) | 원조, Python CLI |
| **LlamaIndex Property Graph Index** | LlamaIndex | 코드 1줄로 시작 |
| **LangChain Neo4j Graph** | LangChain + Neo4j | 엔터프라이즈 호환 |
| **Kuzu GraphRAG** | Kuzu DB | 임베디드, 경량 |
| **Nebula Graph + LLM** | Nebula | 중국권, 대규모 |

### 한계

- 엔터티 추출 오류가 그래프 전체 품질을 망가뜨림 → LLM 추출 단계 평가 필수.
- 해석 가능성은 높아지지만 구축·운영 복잡도↑.
- 벡터 RAG와 병행하는 "GraphRAG + Vector" 하이브리드가 실전에서 가장 흔함.

## 강의 어디에 나오나

- [Part 4 — Ch.08 GraphRAG와 Knowledge Graph](../../src/content/data-enterprise.html)
- [Part 1 — Ch.04 데이터의 두 세계](../../src/content/data-basics.html)

## 연관 entity

- [RAG](./rag.md) — 상위 개념
- [Embedding Model](./embedding-model.md)
- [Hybrid Search](./hybrid-search.md)
- [Reranking](./reranking.md)
- [RAGAS](./ragas.md) — Multi-hop Precision 메트릭으로 평가
- [Document AI](./document-ai.md) — entity 추출의 전처리
- [LLM Wiki](./llm-wiki.md) — 지식 누적이라는 측면에서 사상적 친척

## 출처

- Edge et al., "From Local to Global: A Graph RAG Approach to Query-Focused Summarization", Microsoft Research, 2024-07.
- Microsoft Research Blog, "GraphRAG: New tool for complex data discovery", 2024.
- LinkedIn Engineering, "Building Customer Support RAG with Knowledge Graphs", 2025.
- LangChain × Neo4j "GraphRAG Patterns", 2025-2026.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
