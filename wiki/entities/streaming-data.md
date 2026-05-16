# Streaming Data (스트리밍 데이터)

**Category:** 개념 / 아키텍처
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

데이터를 **이벤트 단위로 끊김 없이 흐르는 스트림으로 취급**하고, 생성 즉시(밀리초~초 단위) 처리하는 방식. Apache Kafka(2011 LinkedIn), Apache Flink, Apache Pulsar, AWS Kinesis가 대표. 배치(Batch)가 "어제 치 장부를 정산"이라면, 스트림은 "계산대 옆에서 실시간으로 돈을 세는" 방식. 금융 사기 탐지, IoT, 실시간 추천, [CDC](./cdc.md) 기반 데이터 동기화에 필수. 2026년에는 LLM의 **스트리밍 컨텍스트 갱신**에도 쓰인다.

## 설명

### Batch vs Stream

| | Batch | Stream |
|---|---|---|
| 처리 단위 | 대용량 묶음 | 개별 이벤트 |
| 지연 | 분~일 | 밀리초~초 |
| 완결성 | 완결 데이터셋 | 끝없는 흐름 |
| 대표 도구 | Spark, Hadoop, dbt | Kafka, Flink, Pulsar |
| 상태 관리 | 덜 중요 | 핵심 (stateful) |
| 유스케이스 | 월말 정산, DW 적재 | 사기 탐지, 실시간 대시보드 |

**Lambda Architecture**: 배치+스트림 둘 다 운영. 복잡.
**Kappa Architecture**: 스트림 하나로 통일. 2020년대 주류.

### 주요 시스템 (2026)

**Apache Kafka** — 2011년 LinkedIn에서 탄생, 2017년 Apache 재단. 업계 표준 분산 로그·메시지 브로커. **Confluent**가 상업화. 포춘 100대 기업의 80%+ 사용. 경쟁: Redpanda(C++ 재구현, Kafka API 호환).

**Apache Flink** — 독일 TU Berlin 출신. **Stateful stream processing**의 강자. Exactly-once 보장. Alibaba·Netflix·Uber가 대규모 운영. **Ververica**가 상업화. 경쟁: Kafka Streams, Spark Structured Streaming.

**Apache Pulsar** — Yahoo! 출신(2016). Kafka 대안. **Geo-replication**·**멀티테넌시** 내장. StreamNative가 상업화.

**AWS Kinesis** — 완전 관리형. Data Streams, Firehose, Analytics 3종. AWS 생태계 통합이 장점.

**Google Pub/Sub** — GCP 매니지드. At-least-once, 글로벌 분산.

**Azure Event Hubs** — Microsoft 버전.

### 핵심 개념

1. **Topic / Stream** — 이름 있는 이벤트 로그 (`orders`, `clicks`).
2. **Partition** — 병렬 처리와 순서 보장을 위한 분할.
3. **Producer / Consumer** — 쓰는 쪽 / 읽는 쪽.
4. **Offset** — 각 컨슈머의 읽기 위치 북마크.
5. **Retention** — 이벤트 보관 기간 (수 시간~수 년).
6. **Event Time vs Processing Time** — 실제 발생 시각 vs 처리 시각. Watermark로 관리.
7. **Windowing** — 끝없는 스트림에 경계를 그어 집계 (Tumbling, Sliding, Session).
8. **State** — 처리기가 보유하는 중간 집계. Flink의 RocksDB state backend.

### Event-Driven Architecture

스트리밍은 **마이크로서비스 간 통신**의 주된 수단이기도 하다. 동기 REST 호출 대신 비동기 이벤트 발행:

```
[Order Service] -- OrderCreated 이벤트 --> Kafka
                                           ↓ ↓ ↓
                        [Payment] [Inventory] [Notification]
```

장점: 서비스 간 결합도 낮춤, 확장성, 재생(replay) 가능.
패턴: **Event Sourcing**, **CQRS**, **Saga**.

### 대표 유스케이스

1. **금융 사기 탐지** — 결제 승인을 수백 ms 내에 판정. Capital One·Uber 등.
2. **IoT·센서** — 공장 설비, 차량, 스마트 시티. 초당 수백만 이벤트.
3. **실시간 추천** — 클릭→모델 재학습/피처 업데이트. Netflix·TikTok.
4. **로그·관측성** — Datadog, Splunk, OpenTelemetry의 백엔드.
5. **[CDC](./cdc.md) 동기화** — 운영 DB → DW/Lake 실시간 복제.
6. **AI 에이전트의 실시간 컨텍스트** — 2026년 트렌드. LLM이 Kafka 토픽을 구독해 최신 사건 반영.

### 한계·고민

1. **운영 난이도** — Kafka 클러스터 운영은 전용 팀이 필요. → Confluent Cloud 등 매니지드 선호.
2. **Exactly-once 보장의 어려움** — 분산 시스템의 본질적 난제. Flink·Kafka Transactions로 해결.
3. **Schema 관리** — 수천 개 토픽의 스키마 진화. Schema Registry 필수.
4. **비용** — 초당 수만 이벤트면 월 수천만 원. 과투자 흔함.
5. **Batch의 단순함** — 모든 게 스트림일 필요 없다. "Streaming-first"가 과대평가라는 비판.

### 2026 트렌드

- **Serverless streaming** — AWS Kinesis On-Demand, Confluent Serverless
- **SQL on streams** — ksqlDB, Flink SQL, Materialize, RisingWave. dbt 스타일로 스트림 변환.
- **Iceberg + Streaming** — Iceberg 테이블 포맷이 배치·스트림 통합의 접착제
- **AI 통합** — Kafka → Vector DB → LLM 파이프라인

## Reference

- [Part 10 — Ch.08 배치 vs 실시간 데이터](https://ai-contents-wine.vercel.app/10-data-basics/)
- [Part 11 — Ch.10 실시간 데이터 파이프라인](https://ai-contents-wine.vercel.app/11-data-enterprise/)
- [Part 11 — Ch.11 이벤트 기반 아키텍처](https://ai-contents-wine.vercel.app/11-data-enterprise/)

## 연관 entity

- [CDC](./cdc.md) — 스트림의 주요 공급자
- [Modern Data Stack](./modern-data-stack.md) — 스트리밍은 MDS의 실시간 확장
- [ELT](./elt.md) — 스트리밍 ELT의 기반
- [ETL](./etl.md) — 배치 패턴과의 대조

## 출처

- Kreps, J. "The Log: What every software engineer should know" (LinkedIn, 2013).
- Kleppmann, M. "Designing Data-Intensive Applications" Ch.11.
- Apache Kafka, Flink, Pulsar 공식 문서.
- Confluent "Streaming Data Report 2025".

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
