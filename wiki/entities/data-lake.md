# Data Lake

**Category:** 저장소 / 원본 데이터
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

James Dixon이 2010년 Pentaho 블로그에서 제안한 개념으로, **모든 형태의 원본 데이터(raw)를 값싸게, 가공 없이, 일단 전부 담아두는** 저장소. 오늘날 클라우드에서는 **Amazon S3, Azure Data Lake Storage (ADLS) Gen2, Google Cloud Storage, HDFS**가 대표 구현체다. "먼저 저장하고 나중에 구조화하라"(Schema-on-read) 철학으로, [Data Warehouse](./data-warehouse.md)의 제약을 뒤집었다.

## 설명

### 왜 필요했나

2010년대 빅데이터 시대에 로그, 센서, 클릭스트림, 이미지, 동영상, JSON API 응답 같은 **비정형·반정형** 데이터가 폭증했다. RDBMS·DW는 사전 스키마가 필요해서 이 데이터를 버리거나 극히 일부만 저장했다. Data Lake는 "일단 다 저장하고 나중에 읽을 때 구조를 부여하자"는 발상.

### 대표 스토리지

| 제품 | 제공 | 특징 |
|---|---|---|
| **Amazon S3** | AWS | 사실상 업계 표준 오브젝트 스토리지. S3 Standard $23/TB/월부터 |
| **Azure Data Lake Storage Gen2 (ADLS)** | Microsoft | 계층적 네임스페이스(HNS)를 붙인 Blob Storage. Fabric·Databricks와 통합 |
| **Google Cloud Storage (GCS)** | Google | BigQuery와 native 통합 |
| **HDFS (Hadoop Distributed File System)** | Apache | 온프렘 시대의 원조. 2026년 신규 구축은 거의 없음 |

### Schema-on-read vs Schema-on-write

- **Schema-on-write** (RDBMS/DW): 쓰는 순간 스키마 검증. 엄격하지만 유연성 낮음.
- **Schema-on-read** (Data Lake): 저장은 그냥 바이트. 읽을 때 파서가 스키마를 씌움. 유연하지만 품질 보장이 소비자 책임.

### 파일 포맷

Data Lake에서 널리 쓰이는 columnar/row 포맷.

| 포맷 | 특징 | 주 용도 |
|---|---|---|
| **Parquet** | Columnar, 압축률·스캔 속도 우수. 사실상 표준 | 분석, Spark, Trino |
| **ORC** | Columnar, Hive 생태계 | Hive, Presto |
| **Avro** | Row-oriented, 스키마 진화에 강함 | Kafka, 스트리밍 |
| **JSON/CSV** | 텍스트, 단순 | 원본 수집, 상호운용 |

### "데이터 늪(Data Swamp)" 문제

Data Lake가 통제 없이 운영되면 **Data Swamp(늪)**가 된다.

- 무엇이 어디에 있는지 아무도 모름 (카탈로그 부재)
- 스키마·오너·품질 미상
- 중복 파일 수백만 개
- 쿼리는 느리고 결과는 믿을 수 없음

이 문제 때문에 2020년대 초 **Data Lakehouse** 개념이 등장했다 → [Data Lakehouse](./data-lakehouse.md) 참고.

### 언제 Data Lake를 쓰나

- 스키마가 자주 바뀌거나 아예 없는 원본 데이터 (앱 로그, IoT)
- ML 학습용 raw 데이터 (이미지, 음성, 텍스트 코퍼스)
- 규제상 원본 보존 (금융 거래 원장, 의료 영상)
- 저장 비용 최소화가 1순위일 때

### 2026년 위치

Data Lake 자체를 "최종 분석 플랫폼"으로 쓰는 곳은 거의 없다. 대신 **Lakehouse의 storage layer**로서 [Delta Lake](./delta-lake.md) / [Apache Iceberg](./apache-iceberg.md) 테이블 포맷이 올라가는 기반이 된다.

## Reference

- [Part 1 — Ch.04 Data Lake와 비정형 데이터](https://ai-contents-wine.vercel.app/01-data-basics/)
- [Part 8 — Ch.05 Lake에서 Lakehouse로](https://ai-contents-wine.vercel.app/08-data-enterprise/)

## 연관 entity

- [Data Warehouse](./data-warehouse.md) — 대척점. 구조화 vs 원본
- [Data Lakehouse](./data-lakehouse.md) — Lake의 단점을 해결한 후계자
- [Delta Lake](./delta-lake.md) — Lake 위에 올라가는 테이블 포맷
- [Apache Iceberg](./apache-iceberg.md) — 경쟁 테이블 포맷
- [Medallion Architecture](./medallion-architecture.md) — Lake 데이터를 계층화하는 패턴

## 출처

- James Dixon, "Pentaho, Hadoop, and Data Lakes" (2010)
- AWS S3 Documentation 2026
- Microsoft Learn: ADLS Gen2

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
