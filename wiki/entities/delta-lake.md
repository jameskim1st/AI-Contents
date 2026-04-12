# Delta Lake

**Category:** 오픈 테이블 포맷
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

Databricks가 2019년에 만들고 2022년 **Delta Lake 2.0**으로 Linux Foundation에 기증해 오픈소스화한 테이블 포맷. **Parquet 데이터 파일 + JSON 기반 트랜잭션 로그(`_delta_log/`)** 구조로 오브젝트 스토리지에 ACID, upsert/merge, time travel, schema enforcement를 부여한다. [Data Lakehouse](./data-lakehouse.md)의 원조 구현이며 Databricks의 기본 포맷, 2025년 **Delta Lake 4.0**에서 Iceberg 호환을 강화했다.

## 설명

### 구조

```
s3://lake/sales/
├── part-00000-xxx.parquet     ← 실제 데이터
├── part-00001-xxx.parquet
├── part-00002-xxx.parquet
└── _delta_log/
    ├── 00000000000000000000.json   ← 커밋 0 (CREATE)
    ├── 00000000000000000001.json   ← 커밋 1 (INSERT)
    ├── 00000000000000000002.json   ← 커밋 2 (MERGE)
    └── ...
```

- 데이터 파일은 **Apache Parquet** (불변).
- `_delta_log/` 안의 JSON 파일이 각 커밋을 기록: 어떤 파일이 추가(`add`)/제거(`remove`)되었는지, 스키마는 무엇인지, 통계는 얼마인지.
- 체크포인트(기본 10 커밋마다 Parquet)로 로그 스캔 비용을 줄인다.

### 핵심 기능

- **ACID 트랜잭션**: Optimistic concurrency control. 커밋 충돌 시 재시도.
- **UPSERT / MERGE**: `MERGE INTO target USING source ON ...` — CDC 적재의 핵심.
- **DELETE / UPDATE**: 오브젝트 스토리지에서 행 단위 삭제·수정 (GDPR 삭제권 대응).
- **Time Travel**: `VERSION AS OF n` / `TIMESTAMP AS OF '2026-04-01'`.
- **Schema Enforcement**: 잘못된 타입은 write 시 reject.
- **Schema Evolution**: `mergeSchema=true`로 컬럼 추가 허용.
- **Z-Ordering**: 자주 필터링되는 컬럼으로 데이터 파일 물리 재배치 → 파일 스킵률 극대화.
- **Liquid Clustering** (2024~): Z-Order의 후계자. 파티션 없이 자동 클러스터링.
- **Deletion Vectors**: 파일 재작성 없이 삭제 표식만 기록 → MERGE 10배 빠름.

### 연혁

| 연도 | 이벤트 |
|---|---|
| 2019 | Delta Lake 0.1, Databricks 런타임 내부 포맷 |
| 2020 | Delta Lake 0.7, OSS Spark 3.0 호환 |
| 2022 | **Delta Lake 2.0** — 모든 기능 오픈소스, Linux Foundation 기증 |
| 2023 | Delta Lake 3.0, **UniForm** (Iceberg 호환 메타데이터 자동 생성) |
| 2024 | Delta Lake 3.2, Liquid Clustering GA |
| 2025 | **Delta Lake 4.0** — 변수/row tracking, Iceberg 양방향 호환 |

### UniForm — Iceberg와의 평화

Delta Lake 3.0부터 **UniForm (Universal Format)**이 도입됐다. Delta 테이블을 쓸 때 내부적으로 [Apache Iceberg](./apache-iceberg.md) 메타데이터도 동시에 생성해, **같은 파일을 Iceberg 리더가 그대로 읽을 수 있게** 한다. 이로 인해 "Delta냐 Iceberg냐" 논쟁이 상당 부분 무의미해졌다.

### Delta vs Iceberg vs Hudi (2026)

| 기준 | Delta Lake | Iceberg | Hudi |
|---|---|---|---|
| 주 스폰서 | Databricks | Apache (원 Netflix) | Apache (원 Uber) |
| 강점 | 성숙도, Spark 통합, MERGE 성능 | 멀티 엔진, 스냅샷 브랜치 | 스트리밍 upsert, incremental |
| 엔진 지원 | Spark, Trino, Flink, PowerBI, Fabric | Spark, Trino, Flink, Snowflake, BigQuery, Redshift | Spark, Flink, Presto |
| 카탈로그 | Unity Catalog | Iceberg REST Catalog, Glue, Polaris | Hive Metastore |

### 사용 예시 (Spark)

```python
from delta.tables import DeltaTable

# MERGE (CDC 적재)
DeltaTable.forPath(spark, "s3://lake/customers").alias("t") \
  .merge(source.alias("s"), "t.id = s.id") \
  .whenMatchedUpdateAll() \
  .whenNotMatchedInsertAll() \
  .execute()

# Time Travel
spark.read.format("delta").option("versionAsOf", 42) \
  .load("s3://lake/customers")
```

## Reference

- [Part 1 — Ch.06 Delta Lake 입문](https://ai-contents-wine.vercel.app/01-data-basics/)
- [Part 8 — Ch.07 오픈 테이블 포맷 전쟁](https://ai-contents-wine.vercel.app/08-data-enterprise/)

## 연관 entity

- [Data Lakehouse](./data-lakehouse.md) — Delta Lake가 구현하는 상위 아키텍처
- [Apache Iceberg](./apache-iceberg.md) — 주 경쟁자, UniForm으로 호환
- [Data Lake](./data-lake.md) — Delta가 올라가는 스토리지 레이어
- [Medallion Architecture](./medallion-architecture.md) — Delta 테이블로 Bronze/Silver/Gold 구성

## 출처

- "Delta Lake: High-Performance ACID Table Storage over Cloud Object Stores" (Armbrust et al., VLDB 2020)
- Delta Lake 공식 (https://delta.io)
- Databricks Blog: "Announcing Delta Lake 2.0" (2022)
- Delta Lake 4.0 Release Notes (2025)

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
