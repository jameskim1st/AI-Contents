# Data Lakehouse

**Category:** 아키텍처 / 저장소
**Status:** stable (2026년 사실상 표준)
**Last updated:** 2026-04-12

## TL;DR

Databricks가 2020년 "Lakehouse: A New Generation of Open Platforms" 논문에서 제시한 아키텍처. **[Data Lake](./data-lake.md)의 저비용·오픈 포맷**과 **[Data Warehouse](./data-warehouse.md)의 ACID·성능·BI 친화성**을 한 플랫폼에서 동시에 제공한다. 2026년 기준 신규 엔터프라이즈 데이터 플랫폼의 사실상 표준이며, **Databricks**와 **Microsoft Fabric(OneLake)**가 시장을 양분한다.

## 설명

### 등장 배경: "두 시스템" 문제

2010년대 기업들은 다음 구조를 썼다.

```
[원본 데이터] → Data Lake (S3) → ETL → Data Warehouse → BI
                    ↑                        ↑
                   ML 학습                   분석 리포팅
```

- Lake에 원본을 두고 ML이 사용, DW에 정제본을 두고 BI가 사용.
- 두 시스템이 **중복 저장**, 두 팀이 **같은 데이터로 다른 결론**, ETL 파이프라인이 **악몽**.

Lakehouse는 이를 하나로 합친다.

```
[원본] → Lakehouse (S3/ADLS + Delta/Iceberg) → BI + ML + 스트리밍
```

### 가능하게 만든 기술: 오픈 테이블 포맷

Lakehouse의 핵심은 Parquet 파일 위에 **트랜잭션 로그**를 붙여 ACID를 부여한 오픈 테이블 포맷이다. 2026년 3대 포맷:

| 포맷 | 기원 | 상세 |
|---|---|---|
| **[Delta Lake](./delta-lake.md)** | Databricks (2019) | 가장 성숙, Databricks 기본 |
| **[Apache Iceberg](./apache-iceberg.md)** | Netflix (2018) | 멀티 엔진 중립성, 2025~26 급부상 |
| **Apache Hudi** | Uber (2017) | 스트리밍·upsert 워크로드 강점 |

셋 다 Parquet + 메타데이터 레이어 구조로, **스냅샷·브랜치·시간여행·스키마 진화**를 지원한다.

### Lakehouse의 기능 체크리스트

- **ACID 트랜잭션**: 여러 writer가 충돌 없이 쓴다.
- **Schema enforcement & evolution**: 잘못된 타입은 reject, 컬럼 추가·삭제는 버전 관리.
- **Time Travel**: `VERSION AS OF 42` 또는 `TIMESTAMP AS OF '2026-01-01'`로 과거 상태 조회.
- **BI 직접 연결**: Power BI, Tableau가 Warehouse처럼 붙는다.
- **ML 직접 학습**: Spark, PyTorch가 같은 테이블을 읽는다.
- **스트리밍 지원**: Kafka → Delta/Iceberg로 연속 적재.

### 2026 대표 플랫폼

| 플랫폼 | 제공자 | 특징 |
|---|---|---|
| **Databricks Lakehouse Platform** | Databricks | Delta Lake + Unity Catalog + Photon 엔진. 사실상 원조 |
| **Microsoft Fabric** | Microsoft | **OneLake** (통합 스토리지) + Delta 기본. Office·Power BI와 네이티브 통합 |
| **Snowflake + Iceberg Tables** | Snowflake | 전통의 DW 강자가 Iceberg로 Lakehouse화 |
| **AWS Analytics (S3 Tables + Glue + Athena)** | Amazon | 2024년 발표된 S3 Tables가 Iceberg 기반 |

### Unity Catalog — 거버넌스 계층

Databricks의 **Unity Catalog**는 Lakehouse 전체에 걸친 통합 거버넌스 계층이다.

- 3-level namespace: `catalog.schema.table`
- Row/column-level security
- Data lineage 자동 추적
- Volume (비정형 파일), Model, Function까지 통합 관리

2024년 Databricks가 Unity Catalog를 오픈소스화(Unity Catalog OSS)하며 사실상의 표준 카탈로그로 자리 잡고 있다.

### 데이터 레이어링 패턴

Lakehouse에서는 보통 [Medallion Architecture](./medallion-architecture.md)로 데이터를 **Bronze → Silver → Gold** 3층으로 조직한다. 참고로 Gold 계층이 현대판 [Data Mart](./data-mart.md)에 해당한다.

### Schema Evolution & Time Travel 예시

```sql
-- 컬럼 추가 (기존 데이터 재작성 없이)
ALTER TABLE sales ADD COLUMN loyalty_tier STRING;

-- 3일 전 상태로 조회
SELECT * FROM sales TIMESTAMP AS OF '2026-04-09 00:00:00';

-- 잘못된 MERGE 되돌리기
RESTORE TABLE sales TO VERSION AS OF 127;
```

## 강의 어디에 나오나

- [Part 1 — Ch.05 Lakehouse 등장](../../src/content/data-basics.html)
- [Part 4 — Ch.06 Databricks vs Fabric](../../src/content/data-enterprise.html)

## 연관 entity

- [Data Lake](./data-lake.md) — Lakehouse의 저장 레이어
- [Data Warehouse](./data-warehouse.md) — Lakehouse가 흡수한 기능
- [Delta Lake](./delta-lake.md) — 핵심 테이블 포맷
- [Apache Iceberg](./apache-iceberg.md) — 경쟁 테이블 포맷
- [Medallion Architecture](./medallion-architecture.md) — Lakehouse 내부 데이터 조직 패턴
- [Data Mart](./data-mart.md) — Gold 레이어의 원형

## 출처

- "Lakehouse: A New Generation of Open Platforms That Unify Data Warehousing and Advanced Analytics" (Armbrust et al., CIDR 2021)
- Databricks Lakehouse Platform Docs 2026
- Microsoft Fabric Documentation 2026
- Unity Catalog OSS (https://www.unitycatalog.io)

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
