# Medallion Architecture

**Category:** 아키텍처 패턴 / 데이터 레이어링
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

Databricks가 2019~2020년경 제안한 [Data Lakehouse](./data-lakehouse.md)용 데이터 레이어링 패턴. 데이터를 **Bronze(raw) → Silver(cleaned) → Gold(business-ready)** 세 층으로 점진 정제하며 흐르게 한다. 각 층의 품질·쓰임·SLA가 명확히 다르고, 장애나 재처리 시 상위 층을 하위 층에서 재생성할 수 있다. 2026년 Lakehouse 프로젝트에서 사실상 기본 설계가 되었다.

## 설명

### 세 개의 메달

이름은 올림픽 메달에서 온다 — 위로 갈수록 가치가 커진다.

```
┌─────────────────────────────────────────────┐
│ Gold    — 비즈니스·BI·ML feature 서빙용    │  ← 현업 대시보드, ML 모델
├─────────────────────────────────────────────┤
│ Silver  — 정제·조인·적합한 스키마          │  ← 데이터 분석가, ad hoc 쿼리
├─────────────────────────────────────────────┤
│ Bronze  — 원본 그대로, append-only         │  ← 원본 보존, 재처리 기준
└─────────────────────────────────────────────┘
       ↑
   외부 소스 (Kafka, CDC, API, 파일)
```

### Bronze Layer — 원본 보존

- **목적**: 외부 소스에서 들어온 데이터를 **있는 그대로** 보존. 재처리·감사의 절대 기준점.
- **내용**: Kafka 토픽, CDC 스트림, 로그 파일, API 응답의 거의 원본 복제.
- **스키마**: 매우 느슨. 원본 컬럼 + 수집 시각 + 소스 식별자 정도만 추가.
- **쓰기 방식**: Append-only. 절대 삭제·수정하지 않는다.
- **품질 기대치**: **없음**. 중복·누락·잘못된 값 모두 그대로 들어올 수 있다.
- **소비자**: 데이터 엔지니어, 재처리 파이프라인. 분석가는 원칙적으로 접근하지 않는다.

### Silver Layer — 정제 및 통합

- **목적**: 다양한 소스를 조인·정제해 **단일 진실의 원천**을 만든다.
- **처리**:
  - 타입 캐스팅, null 처리, 중복 제거
  - 소스 간 조인 (예: 주문 + 고객 + 상품)
  - PII 마스킹, 필드명 표준화
  - SCD Type 2 이력 관리 (참고: [Data Mart](./data-mart.md)의 dimensional modeling)
- **스키마**: 엄격. 컬럼·타입·제약이 명시되고, `NOT NULL`을 강제.
- **품질 기대치**: 신뢰 가능. 데이터 품질 테스트(dbt tests, Great Expectations, DLT expectations)가 반드시 통과해야 함.
- **소비자**: 데이터 분석가, 데이터 과학자. Ad hoc 쿼리가 여기서 일어난다.

### Gold Layer — 비즈니스 · BI · ML 서빙

- **목적**: 특정 비즈니스 질문에 **즉시 답하는** 집계·피처 테이블.
- **내용**:
  - BI 대시보드용 집계 (일별 KPI, 지역별 매출, 퍼널)
  - ML feature store용 피처 테이블
  - 경영진 리포트용 요약 테이블
  - API 서빙용 denormalized mart
- **스키마**: 소비처에 최적화. 차원/팩트 형태, 혹은 wide flat 테이블.
- **품질 기대치**: 최상. SLA 기반 freshness, row count alert, 비즈니스 룰 검증.
- **소비자**: 경영진, 현업 부서, ML 서빙, 외부 API.

Gold 레이어는 사실상 현대 Lakehouse 환경의 [Data Mart](./data-mart.md)다.

### 구현 기술

보통 [Delta Lake](./delta-lake.md) 또는 [Apache Iceberg](./apache-iceberg.md) 테이블로 각 층을 구현한다. Databricks에서는 **Delta Live Tables (DLT)** 혹은 2025년 이름이 바뀐 **Lakeflow Declarative Pipelines**로 선언적으로 파이프라인을 정의한다.

```python
@dlt.table(name="bronze_orders")
def bronze_orders():
    return spark.readStream.format("kafka").load()

@dlt.table(name="silver_orders")
@dlt.expect("valid_amount", "amount > 0")
def silver_orders():
    return dlt.read_stream("bronze_orders").select(...)

@dlt.table(name="gold_daily_revenue")
def gold_daily_revenue():
    return dlt.read("silver_orders") \
              .groupBy("order_date", "region") \
              .agg(sum("amount").alias("revenue"))
```

### 장점

- **재처리 가능성**: Silver가 깨지면 Bronze에서 재생성. Gold가 깨지면 Silver에서 재생성.
- **명확한 계약**: 각 층의 품질 기대치가 다르므로 "이 테이블 믿어도 되나요?" 질문이 사라진다.
- **권한 분리**: Bronze는 엔지니어만, Silver는 분석가, Gold는 비즈니스.
- **데이터 품질 게이트**: 각 층 사이에 expectation / test를 둬서 나쁜 데이터 전파를 차단.

### 한계 / 오해

- "3층이면 충분"한 것은 아니다. 큰 조직은 Silver를 여러 단계로 쪼개거나, Platinum 층을 추가하기도 한다.
- Medallion은 **논리적 레이어링**이지 물리적 DB가 3개라는 뜻이 아니다. 같은 Lakehouse 안의 schema로 구현된다.

## Reference

- [Part 10 — Ch.08 Medallion Architecture](https://ai-contents-wine.vercel.app/10-data-basics/)
- [Part 11 — Ch.09 Lakehouse 파이프라인 설계](https://ai-contents-wine.vercel.app/11-data-enterprise/)

## 연관 entity

- [Data Lakehouse](./data-lakehouse.md) — Medallion이 사는 상위 아키텍처
- [Delta Lake](./delta-lake.md) — 각 층을 구현하는 기본 테이블 포맷
- [Apache Iceberg](./apache-iceberg.md) — 대체 구현 포맷
- [Data Mart](./data-mart.md) — Gold 레이어의 원형 개념
- [Data Warehouse](./data-warehouse.md) — Gold 레이어와 역할이 유사

## 출처

- Databricks: "What is the medallion lakehouse architecture?" (docs)
- "The Lakehouse Reference Architecture" (Databricks Blog, 2022)
- Delta Live Tables / Lakeflow Declarative Pipelines Docs 2026

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
