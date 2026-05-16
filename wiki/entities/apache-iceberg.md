# Apache Iceberg

**Category:** 오픈 테이블 포맷
**Status:** stable (2026년 급부상)
**Last updated:** 2026-04-12

## TL;DR

Netflix가 2017년 Hive 테이블의 한계(파티션 기반 쿼리의 불안정성)를 해결하려고 만든 오픈 테이블 포맷. 2018년 Apache Software Foundation에 기증되어 2020년 top-level project가 되었다. **멀티 엔진 중립성**이 최대 강점 — Spark, Trino, Flink, Snowflake, BigQuery, Redshift, Athena가 모두 Iceberg를 1급으로 지원한다. 2024~2026년 사이 **Databricks의 Tabular 인수**와 **Snowflake Polaris Catalog** 발표로 업계의 중심 포맷으로 급부상했다.

## 설명

### 왜 만들어졌나

기존 Hive 테이블은 디렉토리·파티션 기반이라 다음 문제가 있었다.

- `ls` 기반 메타데이터 → 파일 수가 많으면 쿼리 플래닝이 느려진다
- 파티션 스키마 변경이 거의 불가능
- 동시 쓰기의 atomicity가 없음
- 스키마 진화가 제한적 (컬럼 rename이 깨짐)

Iceberg는 이를 **명시적 메타데이터 트리**로 해결했다.

### 구조

```
s3://lake/events/
├── data/
│   └── ... (Parquet 파일)
└── metadata/
    ├── v1.metadata.json           ← 테이블 메타데이터 (스키마, 파티션, 스냅샷)
    ├── v2.metadata.json
    ├── snap-xxx.avro              ← Manifest List
    └── xxx.avro                   ← Manifest File (데이터 파일 목록 + 통계)
```

- **Metadata file**: 현재 스키마, 파티션 spec, 모든 스냅샷
- **Manifest list**: 한 스냅샷에 속한 manifest들의 포인터
- **Manifest file**: 실제 데이터 파일 경로 + 행 수 + 컬럼별 min/max

이 3층 구조 덕분에 **스냅샷 단위 ACID**, **컬럼 통계 기반 파일 스킵**, **파티션 spec 변경(hidden partitioning)**이 가능하다.

### 핵심 기능

- **Schema evolution**: 컬럼 추가/삭제/재명명/재순서/타입 승격 모두 안전.
- **Hidden partitioning**: 사용자가 `WHERE date = '2026-04-12'`라고만 써도 Iceberg가 자동으로 파티션 프루닝. `year(ts)`, `month(ts)`, `bucket(16, id)` 같은 파티션 변환 내장.
- **Time travel & rollback**: `VERSION AS OF`, `FOR SYSTEM_TIME AS OF`.
- **Branching & Tagging** (Git-like): 테이블에 브랜치를 만들어 실험 후 main에 병합.
- **Row-level operations**: MERGE, UPDATE, DELETE. 2025년 **V3 spec**에서 row lineage 추가.
- **Format version**: v1 → v2 (deletion vectors) → v3 (2025, variant type · row lineage · geometry).

### 멀티 엔진 지원 (2026)

| 엔진 | 지원 수준 |
|---|---|
| Apache Spark | Full read/write |
| Trino / Presto | Full read/write |
| Apache Flink | Streaming read/write |
| Snowflake | Iceberg Tables (read/write, 외부 카탈로그 연동) |
| Google BigQuery | BigLake Iceberg Tables |
| Amazon Athena | Full read/write |
| Amazon Redshift | External table read |
| DuckDB | Read |
| ClickHouse | Read |

이 다원성이 Delta Lake와의 최대 차별점. 어떤 엔진에 lock-in되지 않는다.

### Iceberg REST Catalog

Iceberg는 카탈로그(테이블 이름 → 현재 메타데이터 파일 경로 맵핑)를 표준 REST API로 정의한다. 이를 구현한 서버 제품:

- **Apache Polaris** (2024, Snowflake 오픈소스화) — 사실상의 참조 구현
- **Databricks Unity Catalog** — 2024년 6월 Iceberg REST 호환 발표
- **AWS Glue** — Iceberg REST 엔드포인트 제공
- **Lakekeeper**, **Nessie**, **Gravitino** — OSS 구현

REST Catalog의 의미: **어느 회사 카탈로그든 어느 엔진에서든 같은 프로토콜로 접근 가능**.

### 2024~2026 전환점

- **2024년 6월** — Databricks가 **Tabular**(Iceberg 창시자 Ryan Blue가 창업한 회사)를 10억 달러 이상에 인수. Delta와 Iceberg의 통합 노선을 공식화.
- **2024년 6월** — Snowflake가 **Polaris Catalog**를 오픈소스 발표.
- **2024년 12월** — AWS re:Invent에서 **S3 Tables** 발표 (Iceberg가 기본 포맷).
- **2025~** — Iceberg v3 spec 표준화. "Iceberg가 사실상의 저장 표준"이라는 표현이 흔해짐.

### Delta Lake와의 관계

[Delta Lake](./delta-lake.md)의 **UniForm**이 Delta 쓰기 시 Iceberg 메타데이터도 자동 생성해주면서 둘은 상호 호환 방향으로 수렴 중. 실무자는 "Delta냐 Iceberg냐"보다 "어느 카탈로그를 쓸 것인가"를 고민하는 단계로 옮겨갔다.

## Reference

- [Part 10 — Ch.07 Apache Iceberg와 멀티 엔진](https://ai-contents-wine.vercel.app/10-data-basics/)
- [Part 11 — Ch.08 Lakehouse 포맷 전쟁](https://ai-contents-wine.vercel.app/11-data-enterprise/)

## 연관 entity

- [Delta Lake](./delta-lake.md) — 경쟁·수렴 관계의 포맷
- [Data Lakehouse](./data-lakehouse.md) — Iceberg가 구현하는 상위 아키텍처
- [Data Lake](./data-lake.md) — Iceberg가 올라가는 스토리지 레이어
- [Data Warehouse](./data-warehouse.md) — Snowflake·BigQuery가 Iceberg를 흡수 중

## 출처

- "Iceberg: A Modern Table Format for Big Data" (Ryan Blue, 2018)
- Apache Iceberg 공식 (https://iceberg.apache.org)
- Databricks: "Databricks + Tabular" 발표 (2024.06)
- Snowflake: Apache Polaris 발표 (2024.06)
- Iceberg V3 Spec (2025)

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
