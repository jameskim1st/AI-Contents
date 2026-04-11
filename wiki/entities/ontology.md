# Ontology (온톨로지)

**Category:** 개념 / 지식 표현
**Status:** stable (LLM 시대에 재부상 중)
**Last updated:** 2026-04-12

## TL;DR

특정 도메인의 **개념·관계·규칙**을 컴퓨터가 이해할 수 있는 **형식 언어**로 명세한 것. [Graph DB](./graph-db.md)의 사촌이지만 차이가 있다 — Property Graph(Neo4j)가 "실용적 관계 그래프"라면, 온톨로지(RDF/OWL)는 "**의미론적 그래프 + 추론 규칙**"이다. 2026년 LLM 환각·도메인 지식 주입 문제로 다시 주목받고 있다.

## 설명

### 정의

> "An ontology is a formal, explicit specification of a shared conceptualization."
> — Tom Gruber, 1993

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

### LLM 시대의 부활

2010년대에는 "딥러닝이 다 해결"이라는 분위기로 시들었지만, 2024-26년 다시 떠오른 이유:

1. **환각 줄이기** — LLM에 도메인 온톨로지를 주입하면 "사실 근거"가 생김
2. **GraphRAG의 백본** — [GraphRAG](./graphrag.md)가 지식 그래프를 활용할 때, 잘 만든 온톨로지가 있으면 추론 품질이 비약적으로 높아짐
3. **규제 산업** — 의료·법률·금융은 "왜 이 결정을 내렸는가"를 설명해야 하는데, 온톨로지는 추론 경로가 명시적이라 적합
4. **LLM ↔ KG 결합 연구** — Neo4j, Stardog, ontotext가 주도. "LLM이 자연어로 묻고, KG가 사실 근거를 제공"

### 한계

- **구축 비용이 큼** — 도메인 전문가가 직접 모델링해야 함
- **유지보수 어려움** — 도메인이 바뀔 때마다 갱신
- **학습 곡선** — RDF/OWL/SPARQL은 SQL보다 가파르다
- **운영 그래프와는 도구가 다름** — Property Graph(Neo4j)와 트리플 스토어(GraphDB, Stardog, Virtuoso)는 별개 생태계

## Reference

- [Part 1 — Ch.03 데이터가 사는 곳 (Graph DB 섹션 내)](https://ai-contents-wine.vercel.app/01-data-basics/#sl-special)
- [Part 4 — Ch.09 GraphRAG](https://ai-contents-wine.vercel.app/04-data-enterprise/) (간접 — 온톨로지 기반 GraphRAG)

## 연관 entity

- [Graph DB](./graph-db.md) — 사촌 기술, 운영 측면 강함
- [GraphRAG](./graphrag.md) — 온톨로지를 활용한 RAG 진화형
- [Data Quality](./data-quality.md) — SHACL은 데이터 검증의 일종
- [EU AI Act](./eu-ai-act.md) — 설명 가능성 요구사항과 연결

## 출처

- Tom Gruber, "A Translation Approach to Portable Ontology Specifications" (1993)
- W3C Semantic Web Standards (https://www.w3.org/standards/semanticweb/)
- "Knowledge Graphs and LLMs" — Neo4j, Stardog 백서 (2024-26)

## 업데이트 이력

- 2026-04-12 — 신규 생성. Ch.03 특수 저장소 확장 작업의 일환.
