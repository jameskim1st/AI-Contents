# Data Mart

**Category:** 저장소 / OLAP 서브셋
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

특정 부서·주제 영역에 집중한 **[Data Warehouse](./data-warehouse.md)의 부분집합**. HR Mart, Finance Mart, Sales Mart, Marketing Mart처럼 도메인별로 쪼개 만든다. Ralph Kimball의 차원 모델링을 표준 설계 방법으로 쓰고, 최종 사용자(BI 분석가, 현업 부서)의 쿼리 응답 속도와 권한 분리를 목표로 한다.

## 설명

### DW와의 관계

DW가 "전사 단일 진실(single source of truth)"이라면, Data Mart는 "우리 팀만 쓰는 작은 DW"다. 규모는 보통 수 GB~수 TB이며 DW에서 수 PB의 일부만 잘라 가져온다.

### 두 가지 구현 방식

| 방식 | 설명 | 대표 주창자 |
|---|---|---|
| **Dependent Mart** | 전사 DW를 먼저 만들고, 거기서 ETL로 mart 생성 | Bill Inmon (top-down) |
| **Independent Mart** | 부서별로 독자 mart를 먼저 만들고, 나중에 연결 | Ralph Kimball (bottom-up) |

Inmon 방식은 정합성이 높지만 구축 시간이 길고, Kimball 방식은 빠르지만 mart 간 정의 충돌(conformed dimension 문제)이 생긴다. 2026년 클라우드에서는 실무적으로 **Kimball 방식 + conformed dimensions** 하이브리드가 표준.

### Dimensional Modeling 핵심

- **Fact 테이블**: 측정 이벤트 (주문 1건, 페이지뷰 1건).
- **Dimension 테이블**: 기술적 맥락 (상품, 고객, 날짜, 지역).
- **Slowly Changing Dimension (SCD)**:
  - Type 1: 덮어쓰기 (과거 없음)
  - Type 2: 이력 행 추가 (가장 일반적)
  - Type 3: 이전 값 컬럼으로 유지
- **Conformed Dimension**: 여러 fact가 공유하는 표준 dim (예: `dim_date`는 전사 공통).

### 도메인별 예시

- **Finance Mart**: `fact_gl_transaction`, `dim_account`, `dim_cost_center`. IFRS 결산, 예산 대비 실적.
- **HR Mart**: `fact_headcount_snapshot`, `dim_employee`, `dim_position`. 이직률, 보직 이동, 급여 분포.
- **Sales Mart**: `fact_order_line`, `dim_product`, `dim_customer`. 매출 퍼널, 지역별 달성률.
- **Marketing Mart**: `fact_campaign_touch`, `dim_channel`. 어트리뷰션, ROAS.

### 장점

- 쿼리가 단순하고 빠르다 (도메인 특화 인덱스·파티셔닝)
- 권한 분리가 쉽다 (HR Mart는 HR 팀만)
- 부서가 직접 정의·소유해 비즈니스 친화적

### 단점

- 중복 적재로 저장 비용 증가
- Mart 간 정의 불일치 위험 (예: "활성 고객" 정의가 mart마다 다름)
- ETL 파이프라인 수 폭증

### 2026 트렌드: Data Mart의 재해석

**dbt (data build tool)** + 클라우드 DW 조합이 mart 구축의 사실상 표준이 되었다. Mart를 별도 DB가 아닌 DW 내부의 **schema·layer**(예: `marts.finance`)로 배치하는 방식이 일반적. [Medallion Architecture](./medallion-architecture.md)의 **Gold 레이어**가 사실상 현대판 Data Mart다.

## Reference

- [Part 1 — Ch.03 Data Mart와 차원 모델링](https://ai-contents-wine.vercel.app/01-data-basics/)
- [Part 8 — Ch.04 부서별 데이터 전략](https://ai-contents-wine.vercel.app/08-data-enterprise/)

## 연관 entity

- [Data Warehouse](./data-warehouse.md) — Mart의 상위 개념이자 원천
- [Medallion Architecture](./medallion-architecture.md) — Gold 레이어가 현대판 Data Mart
- [Data Lakehouse](./data-lakehouse.md) — Mart가 소속되는 2026년 표준 아키텍처

## 출처

- "The Data Warehouse Toolkit" (Ralph Kimball, 3rd ed. 2013)
- "Building the Data Warehouse" (Bill Inmon)
- dbt Labs: Best Practices Guide 2026

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
