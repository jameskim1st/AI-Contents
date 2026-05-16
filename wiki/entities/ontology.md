# Ontology (온톨로지)

**Category:** 개념 / 지식 표현
**Status:** stable (LLM 시대에 재부상 중)
**Last updated:** 2026-04-16

## TL;DR

특정 도메인의 **개념·관계·규칙**을 컴퓨터가 이해할 수 있는 **형식 언어**로 명세한 것. [Graph DB](./graph-db.md)의 사촌이지만 차이가 있다 — Property Graph(Neo4j)가 "실용적 관계 그래프"라면, 온톨로지(RDF/OWL)는 "**의미론적 그래프 + 추론 규칙**"이다. 2010년대에 시들었지만 2024-2025 LLM 환각·도메인 지식 주입 문제로 재부상. 재부상의 증거: GraphRAG(MS, 2024-02), OG-RAG 논문의 정량 벤치(+55% fact recall, +40% correctness — arXiv:2412.15235), Palantir Ontology 기반 AIP의 커머셜 매출 +71% YoY(Q1 2025). 다만 학술 OWL과 Palantir의 "운영 온톨로지"는 같은 단어를 쓰되 다른 계보이므로 구분이 필요하다.

## 설명

### 정의

> "An ontology is a formal, explicit specification of a shared conceptualization."
> — Tom Gruber, Stanford KSL, *Knowledge Acquisition* 5(2):199-220, 1993

쉽게 말해 — **"이 도메인엔 어떤 종류가 있고, 어떤 관계가 있고, 어떤 규칙이 성립하는가"** 를 컴퓨터가 추론할 수 있는 형태로 적은 것.

### Property Graph vs Ontology — 결정적 차이

| | Property Graph (Neo4j) | Ontology (RDF/OWL) |
|---|---|---|
| **모델** | 노드·엣지·속성 | Subject-Predicate-Object 트리플 |
| **스키마** | 선택적, 유연 | 엄격, 선언적 |
| **의미론** | 응용 코드가 해석 | 형식 의미론, 자동 추론 |
| **표준** | 벤더별 (Cypher, Gremlin) | W3C 표준 (RDF, OWL, SPARQL) |
| **추론** | 없음 (직접 쿼리) | **있음** (OWL reasoner가 새 사실 도출) |
| **사용** | 운영 그래프 (소셜·사기 탐지) | 도메인 지식 표현 (의료·법률·과학) |

**핵심 차이는 "추론"** — 온톨로지에 "Mammal은 Animal의 하위", "Dog는 Mammal의 하위"를 선언하면, "Dog는 Animal이다"를 자동으로 도출한다.

### 4대 표준 (W3C)

1. **RDF (Resource Description Framework)** — 데이터 모델 (Subject-Predicate-Object 트리플)
2. **RDFS / OWL (Web Ontology Language)** — 스키마 + 추론 규칙
3. **SPARQL** — 트리플 쿼리 언어 (SQL의 RDF 버전)
4. **SHACL** — 데이터 검증 (스키마 강제)

### 실전 사례

| 분야 | 온톨로지 |
|---|---|
| **웹** | Schema.org — 구글이 웹페이지를 이해하는 표준 |
| **의료** | SNOMED CT, ICD-10, FHIR |
| **생명과학** | Gene Ontology (GO), UniProt |
| **공공/오픈** | Wikidata (전 세계 1억+ 엔티티), DBpedia |
| **검색** | Google Knowledge Graph (5천억+ 사실), Bing Entity Graph |
| **금융** | FIBO (Financial Industry Business Ontology) |
| **법률** | Legal Knowledge Interchange Format |
| **엔터프라이즈 운영** | **Palantir Foundry Ontology** (운영 온톨로지 계열 — 아래 "변종" 섹션 참조) |

### LLM 시대의 부활

2010년대에는 "딥러닝이 다 해결"이라는 분위기로 시들었지만, 2024-26년 다시 떠오른 이유:

1. **환각 줄이기** — LLM에 도메인 온톨로지를 주입하면 "사실 근거"가 생김
2. **GraphRAG의 백본** — [GraphRAG](./graphrag.md)가 지식 그래프를 활용할 때, 잘 만든 온톨로지가 있으면 추론 품질이 비약적으로 높아짐
3. **규제 산업** — 의료·법률·금융은 "왜 이 결정을 내렸는가"를 설명해야 하는데, 온톨로지는 추론 경로가 명시적이라 적합
4. **LLM ↔ KG 결합 연구** — Neo4j, Stardog, Ontotext가 주도. "LLM이 자연어로 묻고, KG가 사실 근거를 제공"

### 실용적 구분 — Taxonomy / Schema / Ontology / Knowledge Graph

실무자들이 가장 많이 헷갈리는 4가지를 한 줄로:

> **"Taxonomy classifies. Schema validates. Ontology means. Knowledge graph remembers."**

| 용어 | 하는 일 | 예시 |
|---|---|---|
| **Taxonomy (분류 체계)** | 대상을 카테고리로 **분류** | 서점 장르 분류, 생물 분류학 |
| **Schema (스키마)** | 데이터 구조를 **검증** (유효/무효) | JSON Schema, SQL DDL, Avro |
| **Ontology (온톨로지)** | 개념·관계의 **의미**를 명세 + 추론 | OWL의 "Mammal ⊂ Animal" |
| **Knowledge Graph (지식 그래프)** | 특정 사실들의 집합을 **기억** (인스턴스) | Wikidata, Google KG |

실무 포인트: 쓸만한 지식 그래프는 **인스턴스 그래프 + 스키마/온톨로지**의 결합으로 만들어진다. "온톨로지 vs 지식 그래프"는 대립이 아니라 "문법 vs 글"의 관계에 가깝다.

### 변종 — Palantir Ontology (운영 온톨로지)

학술 온톨로지와 같은 단어를 쓰지만 **질적으로 다른 계보**. Palantir Foundry/AIP의 중심 개념이며 2024-2025 엔터프라이즈 AI 열풍의 상업적 주인공.

| | 학술 온톨로지 (OWL/Protégé) | Palantir Ontology |
|---|---|---|
| **성격** | Descriptive · Inferential (서술하고 추론) | Operational · Kinetic (운영을 집행) |
| **구성요소** | 클래스·속성·공리 | Objects + **Actions** + **Policies** + Write-back |
| **도구 생태계** | W3C 표준 (RDF/OWL/SPARQL/Protégé) | Palantir 독점 (Foundry/AIP) |
| **비유** | 도서관 카탈로그 | 살아 움직이는 디지털 트윈 (DDD + Data Fabric) |
| **추론** | OWL reasoner가 "새 사실"을 도출 | 액션이 "세계를 변경" (write-back) |

**2024-2025 재무·도입 신호:**
- Palantir 커머셜 매출 **+71% YoY (Q1 2025)**, +64% YoY (Q4 2024) — 성장 동력 대부분이 "Ontology 기반 운영 AI"(AIP)
- Airbus Skywise >$850M/yr 매출 기회 (2017~)
- BP ~$1B 절감, Fortune-100 CPG $100M year-one (7-ERP 통합 5일)

**독자 주의:** 벤더가 "Ontology"라는 단어를 쓸 때 어느 쪽을 가리키는지 항상 확인해야 한다. W3C OWL을 염두에 두고 읽다가 Palantir 마케팅을 만나면 전혀 다른 개념을 보고 있게 된다. 공통점은 "도메인 지식의 명시적 명세"라는 뿌리뿐이다.

### 2024-2025 핵심 발전

- **Microsoft GraphRAG** (2024-02 블로그 · 2024-04 arXiv:2404.16130) — LLM이 문서에서 entity·relation을 추출해 지식 그래프를 만들고 Leiden 커뮤니티 요약으로 multi-hop 질의를 해결. 오픈소스 공개 후 2025-2026 엔터프라이즈 RAG의 차세대 표준으로 부상. 자세히는 [GraphRAG](./graphrag.md).
- **OG-RAG — Ontology-Grounded RAG** (Sharma et al., MS Research, arXiv:2412.15235, 2024-12; EMNLP 2025) — 사전 정의된 도메인 온톨로지에 검색을 그라운딩. 4개 LLM 벤치에서 **+55% fact recall, +40% correctness, +27% reasoning**. 학술 온톨로지가 LLM 시대에 "쓸모있다"는 최초의 정량 증거 중 하나. 규제 산업에서 특히 선호.
- **Stardog Voicebox** — "첫 EKG + LLM data assistant"로 포지셔닝. 슬로건: *"Enterprise AI Requires the Fusion of LLM and Knowledge Graph."*
- **Neo4j + LangGraph** — 에이전트의 사실상 표준 오픈소스 스택. 메모리=Neo4j, 오케스트레이션=[LangGraph](./langgraph.md), 도구=Text2Cypher. Google **Gen AI Toolbox for Databases (2025)** 에 Neo4j 포함되어 "DB 바로 붙이는" 에이전트 툴킷으로 합류.
- **Ontotext + TopQuadrant 2025 파트너십** — legacy 시맨틱 웹 벤더 통합. 플래그십은 LLM-populated 시맨틱 데이터 카탈로그.
- **자동 KG 구축**: AutoSchemaKG (Bai et al., 2025), KARMA (Lu & Wang, 2025) 등 멀티에이전트 스키마 추출 프레임워크. v1 실패의 주요 원인이던 "수공 메타데이터 부담"을 정면으로 해결.

### v1 실패와 v2 부활 — 역사적 계보

타임라인: **1993** Gruber 정의 → **2001** Berners-Lee Semantic Web 비전 → **2005** Shirky 비판 → **2012** Singhal "things, not strings" → **2024** LLM × KG 재결합.

**2005년의 결정적 비판 — Clay Shirky:**

> "[The Semantic Web is] a throwback to archaic efforts to force the world into hierarchical organizational schema that become out of date almost immediately."
> — Clay Shirky, NYU, O'Reilly ETech, 2005-03

요지: 링크가 공짜인 디지털 세계에선 하향식 분류 체계보다 상향식 태그(folksonomy)가 더 강력하다. 이 비판이 Web 2.0 사조와 맞물려 시맨틱 웹 v1을 실질적으로 꺾었다.

**v1 (2000s) 실패 원인 — 현장 베테랑들의 집단적 진단 (Kurt Cagle, Philippe Fournier-Viger 등):**
1. OWL의 지나친 학술성 — 실무자 진입 장벽
2. 저자 인센티브 부재 — RDFa를 손으로 달 이유 없음
3. 수공 메타데이터의 비현실성 — 한 평가: *"inaccurate, insufficient, subjective, shoddy"*
4. Reasoning 확장 한계 — OWL DL reasoner가 대규모에서 실용 속도 못 냄

**v2 (2024-2025)가 다른 이유 — 한 줄로:**

> **LLM이 entity 추출·스키마 초안 작성이라는 80%의 막노동을 자동화한다.**

즉 v1 실패 원인 중 1·2·3번이 LLM으로 해결 가능해졌다. Stardog Voicebox 같은 자연어 인터페이스가 OWL 편집기 학습 부담을 없애고, 자동 KG 프레임워크가 수공 메타데이터 부담을 덜어낸다.

**Denny Vrandečić (Wikidata 공동창업자, Wikimedia Foundation)의 "both-and" 프레이밍:**
- KG의 약점 = **brittleness** (모델링 안 된 건 못 답함)
- LLM의 약점 = **hallucination** (없는 것도 있다고 우김)
- 두 약점이 **서로 상쇄**되는 합성이 LLM×KG 결합의 본질

벤더 중심 서사가 아닌, 학계·개발자 양쪽에서 존중받는 균형잡힌 요약.

### 한계

- **구축 비용이 큼** — 도메인 전문가가 직접 모델링해야 함 (LLM이 일부를 자동화하지만 검증은 사람 몫)
- **유지보수 어려움** — 도메인이 바뀔 때마다 갱신
- **학습 곡선** — RDF/OWL/SPARQL은 SQL보다 가파르다
- **운영 그래프와는 도구가 다름** — Property Graph(Neo4j)와 트리플 스토어(GraphDB, Stardog, Virtuoso)는 별개 생태계
- **벤더 간 용어 충돌** — 학술 OWL과 Palantir Ontology는 같은 단어를 쓰지만 다른 개념. 자료를 읽을 때 어느 계보인지 먼저 확인해야 오해가 없다.
- **벤더 발표 수치의 일반화 주의** — "X 도입 후 -28.6% 해결시간" 같은 수치는 벤더/고객 벤치. 재현성은 학술 논문(OG-RAG 등)에서 찾는 편이 낫다.

## Reference

- [Part 11 — Ch.10 온톨로지와 지식 그래프](https://ai-contents-wine.vercel.app/11-data-enterprise/#p9-ch10) — 본 엔티티의 사이트 챕터 ⭐
- [Part 11 — Ch.09 GraphRAG](https://ai-contents-wine.vercel.app/11-data-enterprise/#p9-ch9) — 온톨로지 기반 GraphRAG
- [Part 10 — Ch.03 데이터가 사는 곳 (Ontology 사이드 박스)](https://ai-contents-wine.vercel.app/10-data-basics/#sl-special)

## 연관 entity

- [Graph DB](./graph-db.md) — 사촌 기술, 운영 측면 강함
- [GraphRAG](./graphrag.md) — 온톨로지를 활용한 RAG 진화형 (OG-RAG 변형 포함)
- [LangGraph](./langgraph.md) — Neo4j + LangGraph 에이전트 스택의 오케스트레이션 계층
- [Data Quality](./data-quality.md) — SHACL은 데이터 검증의 일종
- [EU AI Act](./eu-ai-act.md) — 설명 가능성 요구사항과 연결

## 출처

- Gruber, T. R. "A Translation Approach to Portable Ontology Specifications", *Knowledge Acquisition* 5(2):199-220, 1993
- Berners-Lee, T., Hendler, J., Lassila, O. "The Semantic Web", *Scientific American*, 2001년 5월호
- Shirky, C. "Ontology is Overrated: Categories, Links, and Tags", O'Reilly ETech, 2005-03
- Singhal, A. "Introducing the Knowledge Graph: things, not strings", Google Official Blog, 2012-05-16
- Edge, D. et al. "From Local to Global: A Graph RAG Approach to Query-Focused Summarization", arXiv:2404.16130, MS Research, 2024-04
- Larson, J. & Truitt, S. "GraphRAG: Unlocking LLM discovery on narrative private data", MS Research Blog, 2024-02-13
- Sharma, K. et al. "OG-RAG: Ontology-Grounded Retrieval-Augmented Generation for Large Language Models", arXiv:2412.15235, MS Research, 2024-12 (EMNLP 2025)
- Rathle, P. "The GraphRAG Manifesto: Adding Knowledge to GenAI", Neo4j Blog, 2024-07-11
- Palantir Investor Relations (Q4 2024 / Q1 2025 실적 공시)
- Stardog Voicebox 제품 페이지 (2024-2025)
- W3C Semantic Web Standards (https://www.w3.org/standards/semanticweb/)

본 엔티티의 원 자료는 `wiki/sources/web/2026-04-16_ontology-llm-2024-2025-research.md`, `2026-04-16_ontology-palantir-enterprise.md`, `2026-04-16_ontology-critique-revival.md`에 상세 기록.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Ch.03 특수 저장소 확장 작업의 일환.
- 2026-04-16 — 2024-2025 리서치 반영: 실용적 4-way 구분(Taxonomy/Schema/Ontology/KG), Palantir 변종 섹션, GraphRAG/OG-RAG 정량 증거, Shirky 비판과 v2 부활 서사 추가. 3개 신규 source 파일(research·enterprise·critique-revival 계열)에 근거.
