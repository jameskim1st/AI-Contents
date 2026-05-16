# Graph Database

**Category:** 저장소 / NoSQL 서브카테고리
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

데이터를 **노드(Node)**, **엣지(Edge)**, **속성(Property)**로 저장하고 **관계 탐색**에 최적화된 DB. [NoSQL](./nosql.md) 4대 유형 중 하나다. **Neo4j**가 사실상 업계 표준이며 Amazon Neptune, TigerGraph, Memgraph, ArangoDB가 주요 경쟁자. 2025~2026년 **GraphRAG**의 부상으로 LLM·지식 그래프 결합의 저장소로 재조명받고 있다.

## 설명

### 데이터 모델

가장 널리 쓰이는 모델은 **Labeled Property Graph (LPG)**.

```
(Alice:Person {name:"Alice", age:30})
        │
        │ [:FRIENDS_WITH {since:2019}]
        ↓
(Bob:Person   {name:"Bob",   age:32})
        │
        │ [:WORKS_AT]
        ↓
(Acme:Company {name:"Acme"})
```

- **Node**: 엔티티. 라벨(`:Person`, `:Company`)과 속성(Map)을 가진다.
- **Edge (Relationship)**: 방향·타입·속성을 가진 연결.
- **Property**: Key-Value.

또 다른 모델로 **RDF (Resource Description Framework)** — `(subject, predicate, object)` 트리플 기반, SPARQL 쿼리. 의미 웹과 [온톨로지(Ontology)](./ontology.md) 영역에서 주류. Property Graph가 "실용적 관계 그래프"라면 RDF/온톨로지는 "의미론적 그래프 + 자동 추론"이다.

### 왜 별도 DB가 필요한가

"친구의 친구의 친구" 같은 다중 홉 조인을 [RDBMS](./rdbms.md)에서 하면 `JOIN` 수만큼 비용이 폭발한다. Graph DB는 **인덱스 없는 인접성(index-free adjacency)**으로 노드에서 이웃 노드로 O(1) 이동 — 홉 수가 늘어도 비용이 거의 선형.

### 쿼리 언어

#### Cypher (Neo4j 발)

```cypher
// Alice의 친구의 친구 중 Acme에서 일하는 사람
MATCH (alice:Person {name:"Alice"})-[:FRIENDS_WITH*2]->(friend)-[:WORKS_AT]->(c:Company {name:"Acme"})
RETURN friend.name;
```

2019년 ISO 표준화를 위해 **GQL (Graph Query Language)**이 만들어졌고, **ISO/IEC 39075:2024**로 정식 국제 표준이 되었다. Cypher와 문법이 거의 같다.

#### Gremlin (Apache TinkerPop)

```
g.V().has('Person','name','Alice').out('FRIENDS_WITH').out('FRIENDS_WITH').out('WORKS_AT').has('name','Acme').values('name')
```

#### SPARQL (RDF용)

```sparql
SELECT ?friend WHERE {
  :alice :friends_with/:friends_with ?friend .
  ?friend :works_at :Acme .
}
```

### 2026 대표 제품

| 제품 | 제공 | 특징 |
|---|---|---|
| **Neo4j 5.x** | Neo4j Inc. | 사실상 업계 표준. Cypher 원조. Community/Enterprise/AuraDB |
| **Amazon Neptune** | AWS | LPG(Gremlin) + RDF(SPARQL) 둘 다. 완전관리형 |
| **TigerGraph** | TigerGraph | GSQL. 매우 큰 그래프·딥링크 쿼리 성능 |
| **Memgraph** | Memgraph | In-memory, Cypher 호환, 스트리밍 그래프 |
| **ArangoDB** | ArangoDB | Multi-model (document + graph + key-value) |
| **Neo4j AuraDB** | Neo4j 클라우드 | GCP/AWS/Azure 위의 서버리스 매니지드 |

### 주요 유스케이스

#### 1. 지식 그래프 (Knowledge Graph)

- Google, Amazon, LinkedIn의 내부 KG가 대표.
- 엔티티와 관계 사실을 저장해 검색·추천·답변에 활용.
- 기업에서는 제품·고객·부서·프로세스를 연결한 엔터프라이즈 KG.

#### 2. 추천 시스템

- "이 상품을 본 사람들이 다음에 본 상품" — 사용자/상품/카테고리 그래프 탐색.
- 협업 필터링의 변형을 그래프 쿼리로 자연스럽게 표현.

#### 3. 사기 탐지 (Fraud Detection)

- 금융·e-commerce에서 결제·계정·기기·IP·주소를 노드로, 동일 주소를 공유하는 여러 계정, 동일 디바이스에서 여러 신용카드 등 **비정상 패턴을 그래프 쿼리**로 탐지.
- Neo4j의 대표 상용 사례.

#### 4. 네트워크·IT 관리

- 서버·서비스·의존성을 노드로, 장애 전파 분석.
- Configuration Management Database (CMDB)의 현대 구현.

#### 5. 보안·위협 인텔리전스

- MITRE ATT&CK의 TTP, 행위자, 자산을 연결.
- 공격 경로 탐색 (attack path graph).

### GraphRAG — LLM과의 연결

2024년 Microsoft Research가 "GraphRAG" 논문·구현을 공개하면서 주목받은 패턴:

1. 문서 코퍼스에서 LLM으로 엔티티·관계 추출 → 지식 그래프 구축
2. 질의 시 벡터 검색 + 그래프 탐색을 결합해 **더 정확하고 설명 가능한** 답변 생성
3. 커뮤니티 탐지로 요약본 생성 → 고수준 질문에도 답변 가능

기존 vector-only RAG가 약한 "여러 엔티티를 연결한 추론"에 강점. Neo4j는 GraphRAG 전용 라이브러리(`neo4j-graphrag`)를, Microsoft는 `graphrag` 오픈소스를 운영한다. 2026년 엔터프라이즈 RAG의 주요 옵션으로 자리 잡았다.

```
[문서] → LLM 추출 → [지식 그래프 (Neo4j)]
                              ↕
                    [벡터 임베딩]
                              ↕
                        사용자 질문 → GraphRAG → 답변
```

### 한계

- 범용 OLTP·OLAP 대체가 아니다. 관계 중심 워크로드가 아닐 때 RDBMS보다 느리고 복잡.
- 수평 확장이 어렵다(그래프 파티셔닝 자체가 NP-hard).
- 인재 풀이 RDBMS보다 작다.

## Reference

- [Part 10 — Ch.10 Graph DB 입문](https://ai-contents-wine.vercel.app/10-data-basics/)
- [Part 11 — Ch.11 GraphRAG와 지식 그래프](https://ai-contents-wine.vercel.app/11-data-enterprise/)

## 연관 entity

- [NoSQL](./nosql.md) — Graph DB는 NoSQL 4대 유형 중 하나
- [RDBMS](./rdbms.md) — 관계 탐색에서 Graph DB에 밀리는 대척점
- [Data Warehouse](./data-warehouse.md) — 관계가 아닌 집계 분석의 담당자
- [Ontology](./ontology.md) — 의미론과 자동 추론을 더한 사촌 기술
- [GraphRAG](./graphrag.md) — Graph DB를 RAG에 적용한 패턴

## 출처

- Neo4j Graph Database Documentation 2026
- Microsoft Research, "GraphRAG: Unlocking LLM discovery on narrative private data" (2024)
- ISO/IEC 39075:2024 Graph Query Language (GQL)
- Amazon Neptune Developer Guide

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
