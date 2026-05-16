# ETL (Extract-Transform-Load)

**Category:** 패턴 / 데이터 파이프라인
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

1970년대 후반 데이터 웨어하우징과 함께 등장한 전통적 데이터 통합 패턴. **추출(Extract) → 변환(Transform) → 적재(Load)** 순서로 소스 시스템의 데이터를 정제해 DW에 집어넣는다. Informatica PowerCenter, Microsoft SSIS, IBM DataStage, Talend가 대표 도구. 정제된 데이터만 DW에 들어가므로 품질이 높지만, **스키마 변경에 취약하고 느리며 비싸다**. 2015년 이후 클라우드에서는 [ELT](./elt.md)에게 주류를 내줬다.

## 설명

### 세 단계

1. **Extract (추출)** — 소스 시스템(OLTP DB, ERP, CRM, 파일, API)에서 데이터를 읽는다. 보통 야간 배치.
2. **Transform (변환)** — **별도의 staging 서버**(ETL 전용 서버)에서 조인·정제·집계·타입 변환·PII 마스킹. 이 단계가 가장 무겁다.
3. **Load (적재)** — 변환 완료된 데이터만 데이터 웨어하우스에 적재.

```
[소스 DB] → Extract → [ETL 서버] → Transform → [ETL 서버] → Load → [DW]
```

### 대표 제품

| 제품 | 벤더 | 특징 |
|---|---|---|
| Informatica PowerCenter | Informatica | 1990년대부터 엔터프라이즈 표준. GUI 드래그앤드롭 |
| SSIS (SQL Server Integration Services) | Microsoft | SQL Server와 함께 무료 제공 |
| IBM DataStage | IBM | 대기업 레거시, 병렬 처리 강함 |
| Talend | Qlik (인수) | 오픈소스 기반 |
| Oracle Data Integrator (ODI) | Oracle | Oracle DB 생태계 |

### 장점

1. **정제된 DW** — 쓰레기는 Transform 단계에서 걸러짐. BI 신뢰도가 높음.
2. **컴플라이언스** — PII 마스킹이 적재 전에 이뤄져 규제 대응이 수월.
3. **예측 가능한 배치** — 매일 새벽 3시 고정된 스케줄.
4. **성숙한 거버넌스** — Informatica 등은 Lineage·Catalog 내장.

### 한계 (ELT가 부상한 이유)

1. **느림** — Transform이 ETL 서버에서 이뤄지므로 병목. 수 시간 배치가 일반.
2. **스키마 변경 취약** — 소스에 컬럼 하나 추가되면 ETL job 수정·재검증. 변경 리드타임 수 주.
3. **전용 서버 비용** — ETL 서버와 DW가 분리돼 인프라 이중화.
4. **실시간 불가** — 구조적으로 배치 지향.
5. **벤더 락인** — Informatica는 라이선스가 연간 수억 원. GUI 기반이라 코드 버전 관리 난이도 상승.

### ETL vs ELT

| | ETL | [ELT](./elt.md) |
|---|---|---|
| 순서 | E → T → L | E → L → T |
| Transform 위치 | 별도 ETL 서버 | DW/Lake 내부 |
| 전형적 도구 | Informatica, SSIS | [dbt](./dbt.md), Fivetran |
| 장점 | 정제된 DW | 유연·빠름·저렴 |
| 주류 시기 | 1990~2015 | 2015~현재 |

### 2026년 현주소

ETL이 완전히 죽은 건 아니다:
- **금융·헬스케어 레거시**에는 여전히 Informatica·DataStage가 운영 중.
- 규제·컴플라이언스가 엄격한 영역에서는 "적재 전 정제"가 요구됨.
- **ETL 툴 벤더들도 클라우드 ELT로 전환** 중 (Informatica IDMC, Talend Cloud).

## Reference

- [Part 10 — Ch.05 데이터 파이프라인의 역사](https://ai-contents-wine.vercel.app/10-data-basics/)
- [Part 11 — Ch.06 레거시 ETL에서 Modern Data Stack으로](https://ai-contents-wine.vercel.app/11-data-enterprise/)

## 연관 entity

- [ELT](./elt.md) — 후계자, 클라우드 시대의 표준
- [dbt](./dbt.md) — ELT의 T를 담당하는 현대 도구
- [Modern Data Stack](./modern-data-stack.md) — ETL 이후의 전체 체인
- [CDC](./cdc.md) — Extract 단계를 실시간화하는 기술

## 출처

- Kimball, R. "The Data Warehouse ETL Toolkit" (2004).
- Informatica "ETL vs ELT" whitepaper (2025).
- Fivetran blog "The Death of ETL" (2021).

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
