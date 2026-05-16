# dbt (Data Build Tool)

**Category:** 도구 / 데이터 파이프라인
**Status:** stable (2026년 사실상 표준)
**Last updated:** 2026-04-12

## TL;DR

2016년 Fishtown Analytics(現 dbt Labs)가 만든 SQL 기반 **데이터 변환 프레임워크**. 분석가가 `SELECT` 문만 쓰면 dbt가 의존성 그래프를 만들어 순서대로 실행하고, 테스트·문서화·버전 관리까지 엮어준다. [ELT](./elt.md)의 **T(Transform)**를 담당하며, 2026년 기준 **Modern Data Stack의 사실상 표준**. Analytics Engineer라는 새 직군을 만들어낸 도구.

## 설명

### 핵심 아이디어

SQL을 **소프트웨어 엔지니어링**처럼 다루자:
- Git으로 버전 관리
- PR 리뷰
- 테스트 (null 체크, unique, FK)
- 문서 자동 생성
- 환경 분리 (dev/staging/prod)

```
/models
  /staging
    stg_customers.sql      -- SELECT ... FROM raw.customers
    stg_orders.sql
  /marts
    dim_customers.sql      -- ref('stg_customers') 로 의존성 선언
    fct_orders.sql
```

`dbt run`을 실행하면 dbt가 `ref()` 기반으로 DAG를 빌드해 올바른 순서로 `CREATE TABLE AS SELECT`를 발행한다.

### dbt가 해결한 문제

기존 SQL 워크플로는:
- 수백 개 뷰·프로시저가 `dbo.` 아래 평평하게 존재
- 누가 언제 만들었는지 모름
- 의존성이 암묵적 → 하나 고치면 어디가 깨지는지 모름
- 테스트 전무

dbt는 이걸 **컴파일러 + 패키지 매니저 + 테스트 러너**로 바꿨다.

### 주요 기능

1. **Model** — 하나의 `SELECT` = 하나의 테이블/뷰. Jinja 템플릿으로 동적 생성.
2. **ref() / source()** — 모델 간 의존성 선언. dbt가 DAG로 변환.
3. **Tests** — `not_null`, `unique`, `accepted_values`, `relationships` 내장. Custom 가능.
4. **Documentation** — `dbt docs generate`로 lineage 그래프·컬럼 설명 자동 생성.
5. **Seeds** — CSV를 테이블로 로드.
6. **Snapshots** — SCD Type 2 자동화.
7. **Macros** — Jinja로 SQL 재사용.
8. **Packages** — dbt_utils 같은 커뮤니티 라이브러리.

### dbt Core vs dbt Cloud

| | dbt Core | dbt Cloud |
|---|---|---|
| 라이선스 | Apache 2.0 오픈소스 | 상업 SaaS |
| 비용 | 무료 | Developer $100/user/월~ |
| 실행 | CLI, 사용자가 직접 스케줄 | 웹 UI·스케줄러·CI 내장 |
| IDE | VS Code 등 외부 | 브라우저 IDE |
| 용도 | 엔지니어 중심 | 대규모 팀·거버넌스 |

2024년 **dbt-core 1.8부터 semantic layer**가 통합되어 BI 도구와의 연동이 강화됐다.

### 지원 DW

Snowflake, BigQuery, Databricks, Redshift, Postgres, Trino, DuckDB, Microsoft Fabric, Azure Synapse 등 **30+**. "dbt adapter"로 확장.

### 2026년 위치

- dbt Labs 가치 평가 **$4.2B** (2023 Series D 기준)
- **월간 사용자 100만+**
- 경쟁 도구 등장: SQLMesh(2023), Google Dataform, Coalesce
- 2025년 **Fusion engine** 발표 — 기존 Python 컴파일러를 Rust로 대체, 속도 10배

### 한계

1. **SQL 한정** — 복잡한 ML 전처리는 Python으로 빠져나가야 함. dbt Python models가 있으나 제한적.
2. **실시간 아님** — 배치 지향. 스트리밍은 Materialize·RisingWave가 별도로 필요.
3. **학습곡선** — Jinja·매크로가 초심자에게 어려움.

## Reference

- [Part 10 — Ch.06 SQL을 엔지니어링처럼](https://ai-contents-wine.vercel.app/10-data-basics/)
- [Part 11 — Ch.07 Modern Data Stack 구축](https://ai-contents-wine.vercel.app/11-data-enterprise/)
- [Part 11 — Ch.08 Analytics Engineering 실전](https://ai-contents-wine.vercel.app/11-data-enterprise/)

## 연관 entity

- [ELT](./elt.md) — dbt가 담당하는 패턴의 T
- [Modern Data Stack](./modern-data-stack.md) — dbt가 중심인 스택
- [ETL](./etl.md) — dbt가 대체한 전통 패턴

## 출처

- dbt Labs 공식 문서 (https://docs.getdbt.com)
- "What is Analytics Engineering?" dbt Labs blog (2020).
- dbt Fusion announcement (dbt Coalesce 2025).

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
