# CDC (Change Data Capture)

**Category:** 패턴 / 데이터 파이프라인
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

운영 DB의 **변경(INSERT/UPDATE/DELETE)을 실시간으로 감지해 다운스트림에 전파**하는 기법. 배치 `SELECT *`로 주기적으로 긁는 대신, DB의 **Transaction Log(WAL, binlog, redo log)**를 읽어 이벤트 스트림으로 변환한다. Debezium(오픈소스), Fivetran·Airbyte HD가 대표. 2020년대 후반 **스트리밍 [ELT](./elt.md)와 이벤트 기반 아키텍처의 기반 기술**이 됐다. Kafka와 찰떡궁합.

## 설명

### 왜 필요한가

전통 배치 ETL의 문제:
- 매 시간마다 `SELECT * FROM orders WHERE updated_at > ?` → 느림
- 대형 테이블에서는 full scan 비용 막대
- DELETE된 행을 감지 못함 (soft delete 없이는)
- 최신성 1시간~1일 지연

CDC는 DB가 **이미 쓰고 있는** 트랜잭션 로그를 그대로 재사용한다:
- PostgreSQL: **WAL (Write-Ahead Log)** + 논리 복제
- MySQL: **binlog**
- Oracle: **redo log / LogMiner / GoldenGate**
- SQL Server: **CDC/CT** 기능
- MongoDB: **change streams**

### 대표 구현

| 도구 | 유형 | 특징 |
|---|---|---|
| **Debezium** | 오픈소스 | Kafka Connect 기반, Red Hat 주도, 업계 표준 |
| **Fivetran HVR** | 상업 SaaS | 2021년 HVR 인수, enterprise DB 강함 |
| **Airbyte CDC** | 오픈소스 | Debezium 랩핑, 커뮤니티 |
| **AWS DMS** | 매니지드 | AWS 내 마이그레이션 용 |
| **Estuary Flow** | 현대 SaaS | Real-time 전용, milliseconds 지연 |
| **Oracle GoldenGate** | 레거시 상업 | Oracle 공식, 금융권 표준 |
| **Striim, Qlik Replicate** | 상업 | 엔터프라이즈 |

### 동작 방식 (Debezium 예)

```
[PostgreSQL] -- WAL --> [Debezium Connector] -- JSON --> [Kafka Topic]
                                                              ↓
                                                    [Snowflake / Elastic / Flink]
```

각 변경은 다음 JSON 이벤트로 표현:
```json
{
  "before": {"id": 42, "name": "김철수"},
  "after":  {"id": 42, "name": "김영희"},
  "op": "u",
  "ts_ms": 1712800000000
}
```

### 3가지 CDC 방식

1. **Log-based** (권장) — 트랜잭션 로그 직접 읽음. 성능·정확성 모두 우수.
2. **Trigger-based** — DB 트리거로 변경을 감사 테이블에 쓰기. 소스 DB 부하 증가.
3. **Query-based** — `updated_at` 컬럼을 주기적으로 쿼리. 간단하지만 DELETE 못 잡음.

### Kafka와의 관계

CDC 이벤트는 자연스럽게 **Kafka 토픽**으로 흘러간다 → [Streaming Data](./streaming-data.md) 아키텍처의 입구. 이 조합이 "**Streaming ETL / ELT**"의 핵심.

**Kappa Architecture**: Lambda(배치+스트림 이중화)를 단순화해 **모든 걸 스트림**으로 처리하는 아키텍처. CDC가 전제 조건.

### 유스케이스 (2026)

1. **Data Warehouse 실시간 동기화** — 운영 DB → Snowflake, 지연 <1분
2. **마이크로서비스 간 이벤트 공유** — Outbox 패턴
3. **캐시 무효화** — Redis/Elasticsearch 갱신
4. **감사 로그(Audit)** — 규제 대응
5. **AI/ML feature store** — 실시간 피처 업데이트
6. **Zero-downtime migration** — 온프렘 → 클라우드

### 한계

1. **DB 권한 필요** — WAL 접근에 replication 권한 필수. DBA 설득 필요.
2. **Schema evolution** — 소스 스키마가 바뀌면 컨슈머가 깨짐. Schema Registry(Confluent) 필수.
3. **순서 보장** — 파티션 설계 실수하면 순서가 섞임.
4. **초기 스냅샷** — 기존 데이터는 별도 initial load 필요.
5. **운영 복잡성** — Kafka·Debezium·Schema Registry 3개를 다 운영해야 함. → **매니지드 서비스**(Confluent Cloud, Redpanda) 수요 증가.

## Reference

- [Part 10 — Ch.08 배치 vs 실시간 데이터](https://ai-contents-wine.vercel.app/10-data-basics/)
- [Part 11 — Ch.10 실시간 데이터 파이프라인](https://ai-contents-wine.vercel.app/11-data-enterprise/)
- [Part 11 — Ch.11 이벤트 기반 아키텍처](https://ai-contents-wine.vercel.app/11-data-enterprise/)

## 연관 entity

- [Streaming Data](./streaming-data.md) — CDC가 공급하는 스트림의 소비자
- [ELT](./elt.md) — CDC는 Extract의 실시간 버전
- [Modern Data Stack](./modern-data-stack.md) — MDS의 Ingestion 층
- [ETL](./etl.md) — 배치 ETL을 대체

## 출처

- Debezium 공식 문서 (https://debezium.io)
- Confluent "Change Data Capture" ebook (2024).
- Martin Kleppmann "Designing Data-Intensive Applications" Ch.11.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
