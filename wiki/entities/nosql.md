# NoSQL

**Category:** 저장소 / 비관계형 DB 카테고리
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

"Not Only SQL"의 약자로, [RDBMS](./rdbms.md)의 엄격한 관계형 모델에서 벗어나 **수평 확장·비정형 데이터·개발 속도**를 목표로 설계된 DB들의 포괄 카테고리. 2000년대 후반 웹스케일 서비스(구글, 아마존, 페이스북)가 한계를 경험하면서 탄생했다. 4대 유형(Document, Key-Value, Column-family, Graph)이 있으며, **CAP 정리**에 기반해 각기 다른 트레이드오프를 선택한다.

## 설명

### 등장 배경

- 2000년대 후반: 검색 엔진, SNS, e-commerce가 TB·PB 규모, 초당 수백만 요청, 전 세계 분산을 요구.
- RDBMS는 단일 노드·강한 스키마·ACID 중심이라 한계.
- Google BigTable (2006), Amazon Dynamo (2007) 논문이 NoSQL 운동의 기술적 토대.
- "NoSQL"이란 용어는 2009년 San Francisco meetup에서 대중화.

### 4대 유형

#### 1. Document Store

- **저장 단위**: JSON/BSON 문서 (중첩 가능).
- **대표 제품**: **MongoDB**, **Couchbase**, **Amazon DocumentDB**, **Azure Cosmos DB (Mongo API)**.
- **쿼리**: MongoDB Query Language, 집계 파이프라인.
- **적합**: 제품 카탈로그, 사용자 프로필, CMS 콘텐츠. 스키마가 자주 바뀌는 도메인.

```json
{
  "_id": "u_1234",
  "name": "홍길동",
  "addresses": [
    {"type": "home", "city": "서울"},
    {"type": "work", "city": "판교"}
  ],
  "tags": ["vip", "early-adopter"]
}
```

#### 2. Key-Value Store

- **저장 단위**: 단일 키 → 값 (바이트). 가장 단순.
- **대표 제품**: **Redis**, **Amazon DynamoDB**, **etcd**, **Hazelcast**.
- **쿼리**: `GET key`, `SET key value`. 보조 인덱스는 제한적.
- **적합**: 세션 저장, 캐시, 피처 플래그, 리더보드, 큐. 초저지연(<1ms) 랜덤 액세스.
- **특기**: Redis는 in-memory이며 String/List/Hash/Set/Sorted Set/Stream 등 고수준 자료구조 제공.

#### 3. Column-Family (Wide-Column) Store

- **저장 단위**: 행 키 + 컬럼 패밀리. 행마다 컬럼이 달라도 됨.
- **대표 제품**: **Apache Cassandra**, **Apache HBase**, **ScyllaDB**, **Google Bigtable**.
- **쿼리**: CQL (Cassandra Query Language, SQL 유사).
- **적합**: 시계열, 로그, IoT 센서, 고쓰기 워크로드. 선형 수평 확장.

#### 4. Graph DB

- **저장 단위**: 노드·엣지·속성.
- **대표 제품**: **Neo4j**, **Amazon Neptune**, **TigerGraph**, **ArangoDB**.
- **쿼리**: Cypher, Gremlin, SPARQL.
- **적합**: SNS 관계, 추천, 지식 그래프, 사기 탐지. → 자세히는 [Graph DB](./graph-db.md).

### CAP 정리

Eric Brewer (2000) — 분산 시스템은 다음 3가지를 **동시에 보장할 수 없다**.

- **C**onsistency: 모든 노드가 같은 시점에 같은 데이터를 본다
- **A**vailability: 모든 요청에 응답한다
- **P**artition tolerance: 네트워크 분할이 있어도 동작한다

네트워크 분할은 현실에서 발생하므로 실무적으로는 **CP vs AP** 선택이다.

| 선택 | 예시 |
|---|---|
| **CP** (Consistency 우선) | MongoDB(기본), HBase, etcd |
| **AP** (Availability 우선) | Cassandra, DynamoDB(eventually consistent 모드) |

**PACELC**(Daniel Abadi, 2012)가 이를 확장 — 파티션이 없을 때에도 Latency vs Consistency 트레이드오프가 있다.

### 언제 NoSQL을 쓰나

- **수평 확장 필수**: 단일 노드 RDBMS로 감당 안 될 때 (수억 사용자, 글로벌 배포)
- **비정형·반정형 스키마**: 필드가 자주 추가되거나 레코드마다 다름
- **초저지연**: 캐시, 세션 (Redis 계열)
- **고쓰기 처리량**: IoT, 로그, 텔레메트리 (Cassandra)
- **개발 속도**: 스키마 마이그레이션 없이 빠르게 배포
- **그래프 탐색**: 관계 다중 홉 쿼리 ([Graph DB](./graph-db.md))

### 한계

- **트랜잭션 약함**: 멀티-키/멀티-문서 트랜잭션은 제한적이거나 비쌈 (단, MongoDB 4.0+는 multi-doc tx 지원).
- **조인 약함**: 애플리케이션 레이어에서 조인 구현 필요.
- **일관된 쿼리 언어 부재**: 제품마다 다름.
- **학습 곡선**: 제품별 데이터 모델링 베스트 프랙티스가 완전히 다르다.

### 2026년 위치

NoSQL 초기의 "RDBMS 대체" 담론은 사라졌다. 대신 **polyglot persistence** — 서비스마다 적합한 DB를 고르는 것 — 이 표준. 많은 조직에서:

- 핵심 트랜잭션: PostgreSQL
- 세션·캐시: Redis
- 로그·이벤트: Cassandra or OpenSearch
- 분석: [Data Lakehouse](./data-lakehouse.md)
- 관계 데이터: [Graph DB](./graph-db.md)

## Reference

- [Part 10 — Ch.09 NoSQL 4대 유형](https://ai-contents-wine.vercel.app/10-data-basics/)
- [Part 11 — Ch.10 Polyglot Persistence 전략](https://ai-contents-wine.vercel.app/11-data-enterprise/)

## 연관 entity

- [RDBMS](./rdbms.md) — NoSQL의 대척점 (이자 협력자)
- [Graph DB](./graph-db.md) — NoSQL 4대 유형 중 하나
- [Data Lake](./data-lake.md) — 비정형 대용량 저장의 또 다른 선택지

## 출처

- Brewer's CAP Theorem (2000)
- Amazon Dynamo paper (2007)
- Google BigTable paper (2006)
- DB-Engines Ranking 2026 Q1
- MongoDB Atlas Docs 2026

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
