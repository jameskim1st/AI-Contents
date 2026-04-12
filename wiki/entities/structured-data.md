# Structured Data (정형 데이터)

**Category:** 개념 / 데이터 유형
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

스키마가 미리 고정된, 행·열 테이블 형태로 저장되는 데이터. RDBMS(Oracle, MySQL, PostgreSQL), CSV, Excel이 대표. 전체 엔터프라이즈 데이터의 **약 20%**만이 정형인데도, 지난 50년간 IT 예산의 대부분이 여기에 쓰였다. SQL로 빠르게 쿼리·검증할 수 있지만, 스키마 변경에 취약하고 유연성이 떨어진다.

## 설명

### 정의

**스키마 우선(schema-on-write)** 데이터. 저장하기 전에 "어떤 컬럼이 있고, 각 컬럼이 어떤 타입이며, 어떤 제약조건을 가지는지"를 먼저 정의한다.

```sql
CREATE TABLE customers (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 대표 저장소

| 분류 | 제품 | 용도 |
|---|---|---|
| OLTP RDBMS | PostgreSQL, MySQL, Oracle, SQL Server | 트랜잭션 |
| OLAP DW | Snowflake, BigQuery, Redshift, Databricks | 분석 |
| 파일 포맷 | CSV, Parquet, ORC, Avro | 교환·저장 |
| 스프레드시트 | Excel, Google Sheets | 현업 |

### 장점

1. **빠른 쿼리** — B-Tree·컬럼스토어 인덱스로 수십억 row도 초 단위.
2. **강력한 검증** — 타입·NOT NULL·UNIQUE·FOREIGN KEY 제약.
3. **ACID 트랜잭션** — 금융·결제에 필수.
4. **성숙한 도구 생태계** — SQL·BI·ORM 수십 년 누적.

### 한계

1. **스키마 변경 비용** — 새 컬럼 추가가 운영 중에는 위험. 수십억 row 테이블의 `ALTER TABLE`은 수 시간.
2. **유연성 부족** — 고객마다 속성이 다른 경우 빈 컬럼 난립.
3. **조인 비용** — 정규화가 과하면 5테이블 조인으로 성능 붕괴.
4. **현실과의 괴리** — 실제 비즈니스 데이터의 80%는 문서·이미지·대화 등 [비정형](./unstructured-data.md).

### AI 시대의 역할

LLM 시대에도 **정형 데이터는 여전히 핵심**이다. 단, 역할이 바뀌었다:
- 과거: BI 리포트의 원천
- 현재: **Text-to-SQL**로 LLM이 쿼리 생성 (ChatGPT Advanced Analytics, Claude Code SQL 도구)
- Snowflake Cortex, Databricks Genie가 대표. 정형 데이터 위에 **semantic layer**를 얹어 자연어 질의를 가능케 한다.

## Reference

- [Part 8 — Ch.02 정형 vs 비정형 vs 반정형](https://ai-contents-wine.vercel.app/08-data-basics/)
- [Part 9 — Ch.03 엔터프라이즈 데이터 아키텍처](https://ai-contents-wine.vercel.app/09-data-enterprise/)

## 연관 entity

- [Unstructured Data](./unstructured-data.md) — 반대 개념, 80%의 비중
- [Semi-Structured Data](./semi-structured-data.md) — 중간 형태
- [ETL](./etl.md) — 정형 데이터 통합의 전통 패턴
- [Modern Data Stack](./modern-data-stack.md) — 정형 데이터 파이프라인의 현대화

## 출처

- Codd, E. F. (1970). "A Relational Model of Data for Large Shared Data Banks".
- Snowflake "What is Structured Data" (2026).
- IDC Enterprise Data Report 2025.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
