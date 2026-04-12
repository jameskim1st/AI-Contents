# Data Mesh

**Category:** 방법론 / 아키텍처
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

**2019년 Zhamak Dehghani(ThoughtWorks)**가 제안한 **조직적·사회기술적 데이터 아키텍처**. 중앙 집중식 데이터 팀·데이터 레이크 한계를 극복하기 위해 **4가지 원칙**으로 전환한다: (1) **Domain ownership** — 데이터를 만드는 도메인이 소유·책임, (2) **Data as a product** — 데이터셋을 문서·SLA·품질 점수를 갖춘 "상품"으로 취급, (3) **Self-serve data platform** — 도메인 팀이 중앙 팀 없이도 파이프라인 구축 가능, (4) **Federated computational governance** — 분산 소유하되 글로벌 정책·표준은 통합. [Data Contracts](./data-contracts.md)와 밀접하게 연결되며, 2026년 Fortune 500의 **40%가 부분 채택**(Gartner)으로 대기업 확산이 실체화됐다.

## 설명

### 등장 배경

**중앙 집중식 데이터 레이크의 병목**:
- 비즈니스 팀 → "이 지표가 필요해" → **중앙 데이터 팀** → 요구사항 해석 → 소스 팀과 협의 → 파이프라인 개발 → 지연 수 주~수 개월.
- 중앙 팀은 도메인 지식 없음, 소스 팀은 데이터 품질에 책임 없음.
- **"디지털 트윈 팀"** 병목 — 모든 요청이 거기로 수렴.
- 분석가들이 자기 지표를 다르게 계산 → **single source of truth 부재**.

Dehghani의 통찰: **"데이터는 소프트웨어처럼 분산 소유되어야 한다."** 마이크로서비스가 모놀리스를 대체한 것처럼.

### 4가지 원칙

**1. Domain-oriented Decentralized Data Ownership**
- 주문 도메인이 `orders` 데이터를 소유·관리·노출.
- 결제 도메인이 `payments` 데이터를 소유.
- 각 도메인은 **소스 정렬형(source-aligned)** 또는 **소비자 정렬형(consumer-aligned)** 데이터셋을 공개.
- 중앙 팀은 "**플랫폼**"을 제공할 뿐 데이터 자체는 안 만듦.

**2. Data as a Product**
데이터셋을 **진짜 상품**처럼 다룬다. 특징:
- **발견 가능(Discoverable)** — 카탈로그에서 찾을 수 있음.
- **주소 지정 가능(Addressable)** — 영구 URI.
- **신뢰할 수 있음(Trustworthy)** — 품질 SLA 명시, 모니터링.
- **자체 설명적(Self-describing)** — 스키마, 예시, 문서 포함.
- **상호운용(Interoperable)** — 글로벌 표준 준수.
- **안전(Secure)** — 접근 제어.
- **가치 있음(Valuable on its own)**.

여기에 **Data Product Owner** 역할이 새로 등장. 팀에 PM처럼 data product manager를 둔다.

**3. Self-serve Data Platform**
도메인 팀이 **중앙 팀 허가 없이도** 파이프라인·테이블·대시보드를 만들 수 있는 공통 인프라.
- CI/CD, 카탈로그, 관측 가능성, 보안이 플랫폼 수준에서 제공.
- 도메인 엔지니어가 "**플랫폼 엔지니어**"가 되지 않아도 된다.
- 예: Databricks Unity Catalog, Snowflake Horizon, Atlan, dbt Cloud, Monte Carlo 조합.

**4. Federated Computational Governance**
분산 소유하되 **글로벌 정책은 통합**. 
- 어떤 PII 필드는 자동으로 마스킹.
- 모든 데이터 product는 공통 스키마 표준을 따름.
- 거버넌스 위원회에 각 도메인 대표 + 중앙 거버넌스 팀.
- "**computational**"이 핵심 — 규칙이 문서가 아니라 **코드로 강제**.

### 중앙 vs Mesh 대조

| 차원 | 중앙 집중식 (Data Lake/Warehouse) | Data Mesh |
|---|---|---|
| 소유 | 중앙 데이터 팀 | 각 비즈니스 도메인 |
| 변경 속도 | 느림 (중앙 병목) | 빠름 (도메인 자치) |
| 품질 책임 | 중앙 팀 (도메인 지식 부족) | 도메인 팀 (최고 이해자) |
| 확장 | 수직 (중앙 팀 키우기) | 수평 (도메인 추가) |
| 리스크 | 사일로 되풀이 가능 | 일관성·표준 유지 어려움 |

### Data Contract와의 관계

Mesh의 "data product" 약속을 **기계가 검증 가능**하게 만든 것이 [Data Contracts](./data-contracts.md). 생산자·소비자 간 스키마·SLA·품질 지표를 명시한 YAML/Protobuf 계약. Mesh 원칙 #2와 #4를 **실행**하는 도구.

```yaml
# 예: data contract
dataProduct: orders.v1
owner: orders-team
schema:
  - name: order_id
    type: UUID
    required: true
quality:
  - freshness: 15m
  - completeness: 99.9%
sla:
  availability: 99.95%
```

### 실제 채택 사례

| 기업 | 특징 |
|---|---|
| **Zalando** | Mesh의 유럽 대표 사례, Dehghani와 직접 협업 |
| **Netflix** | 사실상 mesh 선행, "data products" 용어 원조 중 하나 |
| **JP Morgan** | 금융권 대규모 도입, 규제 준수와 병행 |
| **Intuit** | TurboTax·QuickBooks 도메인별 mesh |
| **PayPal** | 사기 탐지 도메인 자치 |
| **Roche** | 헬스케어 regulated 환경에서 mesh |

2026년 **Gartner 보고서**: Fortune 500의 **약 40%가 부분 mesh 채택**, 완전 채택은 12%. 실패 사례도 많다 — 조직 문화가 준비되지 않으면 사일로만 고착화.

### 비판과 한계

- **조직 변혁이 기술보다 어렵다** — 도메인 팀에 데이터 엔지니어가 없으면 quality 더 악화.
- **표준화 실패 시 파편화** — 각 도메인이 다른 스택을 쓰면 통합 불가.
- **스타트업/중소기업에 과잉** — 팀 규모 100명 미만이면 중앙 팀이 낫다.
- **기술 제품이 아님** — 도구로 "mesh 깔기" 불가능, 방법론일 뿐.
- **Feature Store, Lakehouse와 결합 필요** — mesh 자체만으론 기술 스택 아님.

### LLM 시대의 data mesh

2026년 관점에서:
- **AI팀이 새 "도메인"**으로 편입 — embedding, RAG corpus, prompt library가 data product화.
- [Vector DB](./vector-db.md) 기반 "**Knowledge product**" 개념 등장 — 내부 문서를 벡터화해 노출.
- [EU AI Act](./eu-ai-act.md) Article 10 준수를 위해 **도메인별 데이터 거버넌스**가 법적으로도 유리.

## Reference

- [Part 8 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/08-data-basics/)
- [Part 9 — Ch.07 엔터프라이즈 데이터 조직론](https://ai-contents-wine.vercel.app/09-data-enterprise/)

## 연관 entity

- [Data Contracts](./data-contracts.md) — Mesh 원칙의 실행 도구
- [Data Lakehouse](./data-lakehouse.md) — 기술 기반
- [Data Quality](./data-quality.md) — "Data as a product"의 핵심 지표
- [dbt](./dbt.md) — 도메인 팀 self-serve 변환 도구
- [Feature Store](./feature-store.md) — ML 도메인의 data product
- [EU AI Act](./eu-ai-act.md) — Article 10 거버넌스와 정합

## 출처

- Dehghani, "How to Move Beyond a Monolithic Data Lake to a Distributed Data Mesh", Martin Fowler's blog, 2019-05.
- Dehghani, "Data Mesh: Delivering Data-Driven Value at Scale", O'Reilly, 2022.
- Zalando Engineering Blog, "Data Mesh at Zalando", 2021~2024.
- Gartner, "Survey Analysis: Data Mesh Adoption 2026".
- ThoughtWorks Technology Radar, 2020~2026.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
