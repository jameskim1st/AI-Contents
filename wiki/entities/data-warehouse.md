# Data Warehouse (DW)

**Category:** 저장소 / OLAP
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

Bill Inmon과 Ralph Kimball이 1990년대에 정립한, **분석 전용**으로 설계된 대규모 DB. RDBMS와 달리 columnar 저장·MPP 실행·차원 모델링으로 수십억 행 집계 쿼리를 초 단위에 처리한다. 2026년 클라우드 DW 시장은 **Snowflake, Google BigQuery, Amazon Redshift, Databricks SQL**이 주도하며, 전통의 Teradata·Oracle Exadata가 온프렘 영역에 잔존한다.

## 설명

### 왜 DW가 별도로 필요한가

[RDBMS](./rdbms.md)는 OLTP(한 건 한 건의 트랜잭션)에 최적화되어 있어, "지난 1년 지역별 매출 TOP10" 같은 **OLAP(분석)** 쿼리에는 너무 느리다. DW는 정반대 방향으로 최적화된다.

| | OLTP (RDBMS) | OLAP (DW) |
|---|---|---|
| 읽기 패턴 | 한 행 조회 | 수억 행 집계 |
| 저장 방식 | Row-oriented | **Columnar** |
| 쓰기 빈도 | 초당 수천 건 | 배치 수 분~수 시간 |
| 스키마 | 정규화(3NF) | **차원 모델링**(Star/Snowflake) |
| 인덱스 | B-Tree | Zone map, Bloom filter |

### 컬럼 저장(Columnar Storage)

행이 아닌 열 단위로 파일을 분리 저장. `SUM(amount)` 같이 한 컬럼만 읽으면 되는 쿼리에서 I/O가 수십 배 줄어들고, 동종 데이터가 모여 있어 압축률도 높다.

### Star / Snowflake Schema

- **Fact 테이블**: 측정값 (매출, 수량). 보통 수억 행.
- **Dimension 테이블**: 분석 축 (날짜, 상품, 고객, 지역).
- **Star**: fact 중심으로 dim이 한 단계로 붙음.
- **Snowflake**: dim이 다시 정규화되어 가지 치듯 확장 (예: product → category → department).

자세히는 [Data Mart](./data-mart.md) 항목의 dimensional modeling 참고.

### 2026 대표 제품

| 제품 | 특징 | UI |
|---|---|---|
| **Snowflake** | Cloud-native, 저장·연산 분리, multi-cluster warehouse | **Snowsight** (웹 콘솔) |
| **Google BigQuery** | 서버리스, 슬롯 기반 과금, Dremel 엔진 | BigQuery Studio |
| **Amazon Redshift** | AWS 네이티브, RA3 인스턴스, Spectrum으로 S3 직접 쿼리 | Redshift Query Editor v2 |
| **Databricks SQL** | Lakehouse 위의 DW 경험, Photon 엔진 | Databricks Workspace |
| **Teradata VantageCloud** | 전통 강자, 금융·통신의 레거시 코어 | Teradata Studio |

### 사용 예시

- **BI 리포팅**: Tableau, Power BI, Looker가 연결해서 대시보드를 만드는 곳.
- **재무 결산**: 분기 매출, 손익 계산서, 연결재무제표.
- **마케팅 분석**: 고객 세그멘테이션, 코호트 분석, 퍼널.
- **규제 보고**: BIS 자기자본비율, IFRS17.

### 비용 구조

대부분의 클라우드 DW는 **저장 비용 + 컴퓨트 비용** 분리 모델.

- Snowflake: 저장 $23/TB/월, 컴퓨트는 Warehouse 크기(XS~6XL) × 실행 시간(초 단위).
- BigQuery: 저장 $20/TB/월, **On-demand**($6.25/TB 스캔) 또는 **Capacity**(슬롯 예약).
- Redshift: RA3 인스턴스 시간당 과금 + Managed Storage.

이 구조 때문에 "비효율 쿼리 한 방이 수천만 원"이 되는 사건이 잦아, **FinOps**가 별도 직군으로 자리 잡았다.

## 강의 어디에 나오나

- [Part 1 — Ch.02 데이터 웨어하우스와 OLAP](../../src/content/data-basics.html)
- [Part 4 — Ch.03 클라우드 DW 비교](../../src/content/data-enterprise.html)

## 연관 entity

- [RDBMS](./rdbms.md) — OLTP의 담당자. DW는 OLTP에서 ETL로 주기 적재된다
- [Data Mart](./data-mart.md) — DW의 도메인별 부분집합
- [Data Lakehouse](./data-lakehouse.md) — DW와 Lake를 통합한 2026년 트렌드
- [Medallion Architecture](./medallion-architecture.md) — Lakehouse에서 DW 계층을 구성하는 패턴

## 출처

- "Building the Data Warehouse" (Bill Inmon, 1992)
- "The Data Warehouse Toolkit" (Ralph Kimball, 1996)
- Snowflake Docs 2026
- Gartner Magic Quadrant for Cloud Database Management Systems 2025

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
