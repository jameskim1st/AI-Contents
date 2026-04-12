# Modern Data Stack (MDS)

**Category:** 아키텍처 / 패턴
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

2015년 전후 클라우드 데이터 웨어하우스를 중심으로 재편된 데이터 플랫폼 아키텍처 총칭. **Ingestion → Storage → Transformation → BI → Observability**의 5층 구조로, 각 층은 **best-of-breed SaaS**로 구성된다. 전형: Fivetran → Snowflake → [dbt](./dbt.md) → Looker → Monte Carlo. [ETL](./etl.md) 전용 툴 대신 [ELT](./elt.md)를 기본으로 하며, "Modular · Cloud-native · SQL-first"가 원칙. 2020~2023년 전성기 이후 2024년부터 **통합(consolidation) vs 분산(composable)** 논쟁 중.

## 설명

### 5계층

```
┌─────────────────────────────────────────┐
│ 5. Observability / Governance           │  Monte Carlo, DataHub, Atlan, Collibra
├─────────────────────────────────────────┤
│ 4. BI / Activation                      │  Looker, Tableau, Mode, Hex, Metabase
├─────────────────────────────────────────┤
│ 3. Transformation                       │  dbt, SQLMesh, Dataform
├─────────────────────────────────────────┤
│ 2. Storage / Compute (Cloud DW/Lake)    │  Snowflake, BigQuery, Databricks, Redshift
├─────────────────────────────────────────┤
│ 1. Ingestion                            │  Fivetran, Airbyte, Stitch, Hevo, Meltano
└─────────────────────────────────────────┘
                   ↑
              소스 시스템
         (Salesforce, Stripe, DB, 로그)
```

### 각 층 대표 제품 (2026)

**Ingestion (수집)**
- **Fivetran** — SaaS, 10,000+ 커넥터, 비싸지만 편함
- **Airbyte** — 오픈소스, 600+ 커넥터, 셀프호스팅 가능
- **Hevo, Stitch** — 중간 가격대
- **Meltano** — 오픈소스, Singer 기반

**Storage/Compute**
- **Snowflake** — 시장 리더, 완전 관리형, 컴퓨팅-스토리지 분리
- **Databricks** — Spark 뿌리, Lakehouse 개념, ML 강함
- **BigQuery** — Google Cloud, Serverless, 초대용량
- **Redshift** — AWS, 가격 경쟁력
- **Microsoft Fabric** — 2024 발표, OneLake 기반

**Transformation**
- **[dbt](./dbt.md)** — 사실상 표준
- **SQLMesh** — dbt 대안, semantic versioning
- **Coalesce** — GUI 기반

**BI / Activation**
- **Looker** (Google) — LookML 모델링
- **Tableau** (Salesforce) — 시각화 강자
- **Mode, Hex** — notebook 기반, 분석가 친화
- **Metabase** — 오픈소스
- **Hightouch, Census** — Reverse ETL (DW → SaaS)

**Observability**
- **Monte Carlo** — 데이터 다운타임 탐지 리더
- **Bigeye, Anomalo, Soda** — 경쟁
- **DataHub, Atlan, Collibra** — 카탈로그·거버넌스

### 2020~2026 진화 타임라인

| 시기 | 특징 |
|---|---|
| 2015~2019 | Snowflake·BigQuery 등장, MDS 용어 생성 |
| 2020~2022 | 코로나 특수, MDS 회사 VC 폭발. Fivetran·dbt Labs 유니콘화 |
| 2023 | 경기 침체, "Too many tools" 불만. 통합 흐름 시작 |
| 2024 | Databricks vs Snowflake 경쟁 격화. **Lakehouse** 대세 |
| 2025 | **AI/LLM 통합**. Snowflake Cortex, Databricks Genie, Text-to-SQL 내장 |
| 2026 | **Composable vs Integrated** 논쟁. Iceberg 테이블 포맷 표준화 |

### "Modern"이 뭐가 "Modern"인가

전통 스택과의 차이:

| 항목 | 전통 (on-prem) | Modern Data Stack |
|---|---|---|
| 스토리지 | Oracle/Teradata | Snowflake/BigQuery |
| 변환 | Informatica ETL | dbt ELT |
| 스케일 | 수직 | 수평·탄력 |
| 배포 | 월 단위 | 시간 단위 |
| 라이선스 | 영구 + 연간 유지보수 | 사용량 기반 |
| 버전 관리 | 없음 | Git |
| 협업 | DBA 중심 | Analytics Engineer |

### 비판·한계

1. **툴 과잉** — 작은 회사가 5개 SaaS 구독하면 월 수천만 원. "Postmodern Data Stack"으로 단순화 요구.
2. **Snowflake 청구서 쇼크** — 컴퓨팅 과금이 예측 불가.
3. **벤더 분산 = 거버넌스 파편화** — 권한·메타데이터가 5곳에 흩어짐.
4. **AI 네이티브 부족** — MDS는 분석용 설계, 에이전트·RAG용 아님. → 2026년 "AI Data Stack" 논의.

### Lakehouse vs Warehouse

2024년부터 경계가 흐려졌다:
- **Snowflake**: Warehouse로 시작 → Iceberg·Python UDF로 Lakehouse화
- **Databricks**: Lakehouse로 시작 → SQL Warehouse 추가
- **결론**: 둘 다 같은 방향으로 수렴 중. 2026년 Iceberg가 **테이블 포맷 표준**으로 정착.

## Reference

- [Part 8 — Ch.07 Modern Data Stack 한 눈에](https://ai-contents-wine.vercel.app/08-data-basics/)
- [Part 9 — Ch.07 Modern Data Stack 구축](https://ai-contents-wine.vercel.app/09-data-enterprise/)
- [Part 9 — Ch.09 Lakehouse vs Warehouse](https://ai-contents-wine.vercel.app/09-data-enterprise/)

## 연관 entity

- [ELT](./elt.md) — MDS의 기본 패턴
- [dbt](./dbt.md) — Transformation 층의 핵심
- [CDC](./cdc.md) — Ingestion 층의 실시간 기술
- [Streaming Data](./streaming-data.md) — MDS의 실시간 확장
- [ETL](./etl.md) — MDS가 대체한 전통

## 출처

- a16z "Emerging Architectures for Modern Data Infrastructure" (2020).
- Fivetran "Modern Data Stack" whitepaper.
- dbt Labs "The Analytics Engineering Guide".
- Benn Stancil "The Modern Data Experience" (substack).

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
