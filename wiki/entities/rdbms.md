# RDBMS (Relational Database Management System)

**Category:** 저장소 / OLTP
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

1970년 E.F. Codd의 관계형 모델에서 출발한, 행·열로 구성된 테이블과 외래키 제약으로 데이터를 관리하는 DB. PostgreSQL, MySQL, Oracle Database, Microsoft SQL Server가 4대 대표 제품. **ACID 트랜잭션**과 **강한 스키마**를 핵심 강점으로 주문·결제·회원 같은 OLTP 워크로드의 표준이다. 2026년에도 기업 핵심 시스템의 90% 이상이 RDBMS에 의존한다.

## 설명

### 핵심 특징

- **관계형 모델**: 데이터를 테이블(릴레이션)로 저장하고, PK/FK로 관계를 표현한다.
- **강한 스키마(schema-on-write)**: 테이블 생성 시 컬럼·타입·제약이 고정된다. 잘못된 타입은 `INSERT` 단계에서 거부된다.
- **ACID**: Atomicity, Consistency, Isolation, Durability. 은행 이체처럼 "전부 반영되거나 전부 롤백"이 필요한 곳에 필수.
- **SQL**: ISO/ANSI 표준 선언형 쿼리 언어. `SELECT / INSERT / UPDATE / DELETE / JOIN`.

### 대표 제품 (2026)

| 제품 | 라이선스 | 강점 |
|---|---|---|
| **PostgreSQL 17** | 오픈소스 (PostgreSQL License) | 확장성(extensions), JSONB, pgvector, 사실상 "스위스 군용 칼" |
| **MySQL 8.4 LTS** | 오픈소스 (GPL) / Oracle 소유 | 웹 서비스 표준, 단순성, 복제 |
| **Oracle Database 23ai** | 상용 | 엔터프라이즈 기능, RAC, Exadata 통합 |
| **Microsoft SQL Server 2025** | 상용 | Windows·.NET 생태계, T-SQL |

### 관리 도구 (UI)

- **pgAdmin 4** — PostgreSQL 전용 웹/데스크톱 GUI. 쿼리 편집기, ERD, 서버 통계.
- **DBeaver** — 다중 DBMS를 지원하는 오픈소스 GUI. 하나의 창에서 PostgreSQL·MySQL·Oracle을 동시에 연결.
- **MySQL Workbench**, **SQL Developer**(Oracle), **SSMS**(SQL Server) — 벤더 공식 도구.

### 실제 사용 예시

- **주문·결제**: 쿠팡, 네이버페이 같은 전자상거래의 주문 테이블은 일반적으로 PostgreSQL/Oracle에 저장된다. 결제 금액은 1원도 틀리면 안 되므로 ACID가 필수.
- **회원 관리**: `users`, `accounts`, `roles` 테이블. 참조 무결성(FK)으로 고아 레코드를 원천 차단.
- **ERP·CRM**: SAP S/4HANA, Oracle E-Business Suite는 내부적으로 RDBMS 위에 구축.

### 한계

1. **수평 확장이 어렵다** — 단일 노드 아키텍처가 기본. 샤딩은 애플리케이션 레이어에서 수동으로 관리해야 한다.
2. **비정형 데이터 약함** — 로그, 이미지, JSON 문서를 저장은 할 수 있어도 분석에는 부적합. → [NoSQL](./nosql.md), [Data Lake](./data-lake.md)가 보완.
3. **분석 쿼리에 느림** — 수억 행의 집계 쿼리는 columnar 저장소에 밀린다. → [Data Warehouse](./data-warehouse.md)가 분담.
4. **스키마 변경 비용** — 운영 중 `ALTER TABLE`은 락·다운타임 위험.

## Reference

- [Part 1 — Ch.01 데이터 저장소의 종류](https://ai-contents-wine.vercel.app/01-data-basics/)
- [Part 8 — Ch.02 엔터프라이즈 데이터 아키텍처](https://ai-contents-wine.vercel.app/08-data-enterprise/)

## 연관 entity

- [Data Warehouse](./data-warehouse.md) — RDBMS로는 감당 못 하는 OLAP 워크로드를 분담
- [NoSQL](./nosql.md) — RDBMS의 반대편. 비정형·수평 확장 전용
- [Data Lake](./data-lake.md) — 비정형 원본 데이터의 수용소

## 출처

- "A Relational Model of Data for Large Shared Data Banks" (E.F. Codd, 1970)
- PostgreSQL 17 Release Notes (2024)
- DB-Engines Ranking 2026 Q1

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
