# ELT (Extract-Load-Transform)

**Category:** 패턴 / 데이터 파이프라인
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

클라우드 데이터 웨어하우스의 등장(Redshift 2012, BigQuery 2011, Snowflake 2014)으로 가능해진 현대 데이터 통합 패턴. **추출(Extract) → 적재(Load) → 변환(Transform)** 순서로, 원본 데이터를 먼저 싸고 큰 스토리지에 다 집어넣고, 변환은 DW 안에서 SQL로 한다. Fivetran(Extract+Load) + [dbt](./dbt.md)(Transform)가 2026년 사실상 표준 조합. [ETL](./etl.md)보다 **유연·빠름·저렴**하지만, 거버넌스가 느슨하면 "데이터 늪(data swamp)"이 된다.

## 설명

### 왜 순서가 바뀌었나

2010년대 전까지는 저장과 컴퓨팅이 비쌌다. 그래서 **쓸모없는 데이터를 DW에 넣는 건 낭비**였고, Transform이 Load 앞에 와야 했다.

그런데 S3·Snowflake·BigQuery가 등장하면서:
- **저장 비용**: GB당 수 원 수준 (S3 Standard $0.023/GB/월)
- **컴퓨팅 비용**: 쿼리할 때만 과금 (Serverless)
- **스케일**: 페타바이트도 선형 확장

**→ "일단 다 넣고 나중에 변환하자"가 경제적으로 합리적**이 됐다.

### 세 단계

1. **Extract (추출)** — 소스에서 **원본 그대로** 꺼낸다. 거의 변환 없음.
2. **Load (적재)** — 클라우드 DW(Snowflake, BigQuery, Databricks, Redshift)나 Data Lake(S3)에 **raw layer**로 저장.
3. **Transform (변환)** — DW 내부에서 SQL로 정제·조인·집계. [dbt](./dbt.md)가 표준 도구.

```
[소스] → Extract → [클라우드 DW raw] → Transform (dbt) → [staging] → [mart]
```

Medallion Architecture(Bronze/Silver/Gold)도 ELT 위에서 동작하는 계층화 패턴.

### 대표 스택 (2026)

| 역할 | 대표 제품 |
|---|---|
| Extract+Load (EL) | Fivetran, Airbyte, Stitch, Hevo |
| Destination (L) | Snowflake, BigQuery, Databricks, Redshift, Microsoft Fabric |
| Transform (T) | [dbt](./dbt.md) Core/Cloud, SQLMesh, Dataform |
| Orchestration | Airflow, Dagster, Prefect |

Fivetran이 2026년 기준 **10,000+ 커넥터**, dbt는 **100만+ 주간 활성 사용자**.

### 장점

1. **유연성** — 원본이 보존되므로 요구사항이 바뀌어도 재변환 가능.
2. **속도** — 클라우드 DW의 분산 컴퓨팅으로 Transform이 빠름.
3. **저렴한 스토리지** — raw layer를 오브젝트 스토리지에 둠.
4. **코드 기반** — dbt의 SQL + Jinja는 Git에서 버전 관리·PR 리뷰.
5. **실시간 가능** — [CDC](./cdc.md)와 결합해 스트리밍 ELT로 진화.

### 한계

1. **데이터 늪 위험** — "일단 다 넣자"가 지나치면 아무도 모르는 테이블이 수만 개. → Data Catalog(DataHub, Atlan, Collibra)와 Lineage가 필수.
2. **컴퓨팅 비용 폭증** — Transform이 DW 안에서 돌면 쿼리 과금이 눈덩이. Snowflake 월 청구서 쇼크는 업계 밈.
3. **거버넌스 숙제** — PII가 raw에 그대로 들어가므로 마스킹·접근 제어를 Load 후에 설계해야 함.
4. **SQL의 한계** — 복잡한 로직은 Python UDF나 Spark로 빠져나가야 함.

### ETL vs ELT 비교

| | [ETL](./etl.md) | ELT |
|---|---|---|
| 순서 | E → T → L | E → L → T |
| Transform 위치 | 별도 서버 | DW/Lake 내부 |
| 스토리지 비용 | 낮음 | 높음 (원본 보존) |
| 유연성 | 낮음 | 높음 |
| 실시간성 | 배치 | 배치+스트림 |
| 2026 주류 | 레거시 | ✅ |

## Reference

- [Part 10 — Ch.05 데이터 파이프라인의 역사](https://ai-contents-wine.vercel.app/10-data-basics/)
- [Part 11 — Ch.07 Modern Data Stack 구축](https://ai-contents-wine.vercel.app/11-data-enterprise/)

## 연관 entity

- [ETL](./etl.md) — 선배 패턴
- [dbt](./dbt.md) — ELT의 T를 담당하는 표준 도구
- [Modern Data Stack](./modern-data-stack.md) — ELT 중심의 전체 스택
- [CDC](./cdc.md) — Extract 단계를 실시간화

## 출처

- Snowflake "ETL vs ELT" docs (2026).
- Fivetran "The Modern Data Stack" whitepaper (2023).
- dbt Labs "Analytics Engineering Guide".

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
