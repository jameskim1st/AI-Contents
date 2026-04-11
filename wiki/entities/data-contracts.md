# Data Contracts

**Category:** 거버넌스 / 방법론
**Status:** stable (2026 급부상 중)
**Last updated:** 2026-04-12

## TL;DR

데이터 생산자(upstream, 예: 프로덕트 엔지니어)와 소비자(downstream, 예: 데이터 팀 / ML 팀) 사이의 **스키마·품질·SLA에 대한 공식 약속**. 2022년 Chad Sanderson이 대중화. [Data Mesh](./data-mesh.md)의 핵심 구성요소. 2026년 엔터프라이즈 데이터 품질 문제의 근본 해결책으로 주목.

## 설명

### 해결하는 문제

전통적 데이터 파이프라인의 고질병:
- Upstream이 스키마 변경 → Downstream 파이프라인 붕괴
- "누가 이 컬럼의 의미를 결정하나?" 책임 공백
- 데이터 품질 문제를 downstream만 떠안음
- Ad-hoc 수정이 기술 부채로 누적

### Data Contract의 구성요소

1. **Schema** — 필드 이름, 타입, 필수 여부
2. **Semantics** — 각 필드의 의미 (예: `revenue`는 세전? 세후?)
3. **Quality SLA** — completeness, freshness, accuracy 기준
4. **Ownership** — 누가 책임지나 (팀, 사람)
5. **Versioning** — 변경 시 deprecation 정책
6. **Enforcement** — 위반 시 파이프라인 실패 vs 알림

### Schema as Code

YAML/Protobuf/JSON Schema로 선언 후 버전 관리:
```yaml
name: user_event
owner: product-team
schema:
  user_id: {type: string, required: true}
  event_type: {type: enum, values: [click, view, purchase]}
  timestamp: {type: timestamp, required: true}
sla:
  freshness: 5 minutes
  completeness: 99.9%
```

### 도구·프레임워크 (2026)

- **Protocol Buffers / Avro** — schema 선언 + 호환성 검사
- **Great Expectations** — quality rule 정의·실행
- **dbt contracts** — dbt 2025부터 공식 지원
- **Soda Contracts** — 전용 제품
- **Open Data Contract Standard (ODCS)** — 업계 표준 제안

### [Data Mesh](./data-mesh.md)와의 관계

Data Mesh의 "Data as a Product" 원칙을 **운영화** 하는 메커니즘. 데이터 제품마다 contract가 있어야 마켓플레이스가 작동.

## Reference

- [Part 4 — Ch.10 데이터 거버넌스](https://ai-contents-wine.vercel.app/04-data-enterprise/)
- [Part 4 — Ch.02 Modern Data Stack](https://ai-contents-wine.vercel.app/04-data-enterprise/)

## 연관 entity

- [Data Mesh](./data-mesh.md) — 상위 아키텍처 철학
- [Data Quality](./data-quality.md) — contract가 품질 기준을 정의
- [dbt](./dbt.md) — dbt contracts 지원
- [Modern Data Stack](./modern-data-stack.md)
- [EU AI Act](./eu-ai-act.md) — 규제가 data lineage·책임을 요구

## 출처

- Chad Sanderson의 블로그·YouTube (대중화자)
- Open Data Contract Standard (ODCS)
- dbt Labs 공식 문서

## 업데이트 이력

- 2026-04-12 — 신규 생성. data-mesh·data-quality lint 경고 해결.
