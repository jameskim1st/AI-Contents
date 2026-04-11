# Data Quality

**Category:** 품질 / 방법론
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

데이터가 "쓸 만한지"를 결정하는 5대 차원: **Completeness(완전성), Accuracy(정확성), Consistency(일관성), Timeliness(적시성), Validity(유효성)**. 2026년 에이전트 프로덕션 실패 원인 조사에서 **데이터 품질 이슈가 32%로 1위**를 차지했다 — "Quality is the production killer"라는 말이 나올 정도. 도구 생태계는 **Great Expectations(오픈소스 assertion 기반), Monte Carlo(관측 중심 상용), Soda(SQL 기반), dbt tests(변환 파이프라인 내장)**로 4분된다. 단순 rule-based에서 ML-based anomaly detection으로 이동 중이며, [Production Gap](./production-gap.md)의 핵심 원인으로 지목된다.

## 설명

### 5대 차원 (DAMA-DMBOK 표준)

1. **Completeness (완전성)** — 필수 필드가 채워졌는가. 예: 주문의 `customer_id`가 NULL인 비율.
2. **Accuracy (정확성)** — 실제 세계와 일치하는가. 예: 고객 주소가 실제 주소인가. 측정 어렵다 — ground truth가 필요.
3. **Consistency (일관성)** — 시스템 간·레코드 간 충돌이 없는가. 예: CRM의 "홍길동"과 ERP의 "Hong Gil-dong"이 동일인이어야.
4. **Timeliness (적시성)** — 최신인가. 배치가 늦어 어제 매출을 보고하는 대시보드는 SLA 위반.
5. **Validity (유효성)** — 형식·값 범위를 만족하는가. 예: 이메일이 regex를 통과, 나이가 0~120.

(일부 프레임워크는 **Uniqueness(유일성)**, **Integrity(참조무결성)**을 추가해 7대 차원으로 본다.)

### 왜 LLM 시대에 더 중요해졌나

전통 BI는 **리포트 1장**의 실수였지만, LLM 시스템에서는 **에이전트가 잘못된 데이터를 근거로 자동 액션**을 한다. 환불 승인, 이메일 발송, DB 업데이트 — 실수의 파급 범위가 다르다. 2026년 Databricks Customer Report는 에이전트 장애의 원인을 다음으로 정리했다.

| 원인 | 비율 |
|---|---|
| **데이터 품질 문제** | **32%** (1위) |
| 프롬프트/컨텍스트 드리프트 | 24% |
| 외부 API 변경 | 18% |
| 모델 업데이트 | 14% |
| 인프라 | 12% |

"**Quality is the production killer**" — 이 표현이 2026년 [Production Gap](./production-gap.md) 논의의 핵심이 되었다.

### 탐지 기법

**1. Data Profiling** — 통계량(평균, 분포, null 비율, 카디널리티) 자동 수집. 초기 탐색 필수.

**2. Rule-based Validation** — 명시적 assertion.
```yaml
# Great Expectations 예
- expect_column_values_to_not_be_null:
    column: customer_id
- expect_column_values_to_be_between:
    column: age
    min_value: 0
    max_value: 120
```

**3. ML-based Anomaly Detection** — 과거 패턴에서 벗어난 값을 자동 탐지. "어제 대비 매출이 -40%" 같은 이상. Monte Carlo, Bigeye가 대표. "**Data Observability**"라는 카테고리로 자리잡음.

**4. Contract Testing** — 생산자(producer)와 소비자(consumer) 간 스키마 계약. [Data Contracts](./data-contracts.md) 참조.

### 2026 도구 비교

| 도구 | 접근 | 특징 |
|---|---|---|
| **Great Expectations** | 오픈소스 assertion | Python 네이티브, 1000+ 기대 함수 |
| **Monte Carlo** | 상용 observability | ML 이상 탐지, 데이터 lineage 자동 |
| **Soda** | SQL 기반 | YAML 선언, CI/CD 통합 쉬움 |
| **dbt tests** | 변환 내장 | `not_null`, `unique`, `accepted_values`, custom SQL |
| **Bigeye** | 상용 observability | Monte Carlo의 경쟁자, 메트릭 중심 |
| **Elementary** | dbt 생태계 | dbt 로그에 기생해 품질 리포트 |

### 프로세스 정착

1. **Define SLI/SLO** — "주문 테이블의 null 비율은 0.1% 이하" 같은 수치 목표.
2. **Instrument** — 파이프라인 각 단계에 assertion 꽂기.
3. **Alert** — Slack/PagerDuty로 실시간 알림.
4. **Root cause** — lineage를 따라 상류 원인 추적.
5. **Fix & post-mortem** — 재발 방지를 위한 계약 업데이트.

### EU AI Act와의 연결

[EU AI Act](./eu-ai-act.md) **Article 10**은 고위험 AI 시스템의 학습·검증·테스트 데이터에 대해 **"품질 기준 충족"**과 **"대표성·편향 분석 문서화"**를 의무화한다. 데이터 품질은 이제 거버넌스 요구사항이다 — 내부 KPI가 아니라 **감사 대상**.

## 강의 어디에 나오나

- [Part 1 — Ch.04 데이터의 두 세계](../../src/content/data-basics.html)
- [Part 4 — Ch.03 데이터 품질과 거버넌스](../../src/content/data-enterprise.html)

## 연관 entity

- [Production Gap](./production-gap.md) — 품질이 1위 실패 원인
- [Data Contracts](./data-contracts.md) — 품질 계약화
- [EU AI Act](./eu-ai-act.md) — Article 10 데이터 거버넌스
- [dbt](./dbt.md) — dbt tests가 품질 1차 방어선
- [Data Bias](./data-bias.md) — 품질의 윤리적 측면
- [Observability](./observability.md) — 데이터 observability 연결
- [Evaluation](./evaluation.md) — 모델 품질의 상류

## 출처

- DAMA International, "DAMA-DMBOK: Data Management Body of Knowledge", 2nd ed.
- Databricks Customer Report, "Why Agents Fail in Production", 2026 Q1.
- Monte Carlo, "State of Data Quality 2026".
- Great Expectations documentation, 2026.
- Soda, "Data Quality in the Age of AI", 2025.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
