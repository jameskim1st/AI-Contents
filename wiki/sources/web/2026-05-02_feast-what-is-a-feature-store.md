---
title: "Feature Store Explained"
authors: ["Willem Pienaar", "Mike Del Balso"]
publication: "Feast Blog (feast.dev)"
date: "2021-01-21"
url: "https://feast.dev/blog/what-is-a-feature-store/"
fetched_at: "2026-05-02"
type: web
license: "Public blog (CC-style; cite as source)"
used_for:
  - "Part 11 Ch.01 Layer 3 — Feature Store 상세 설명·도식"
  - "wiki/entities/feature-store.md 보강 근거"
related_entities:
  - feature-store
  - data-warehouse
  - vector-db
---

## 핵심 요약

Feast 프로젝트 메인테이너 Willem Pienaar(Feast 창시자, 현 Tecton 공동창업자)와 Mike Del Balso(Tecton CEO, 전 Uber Michelangelo 리드)가 공동 작성한 Feature Store 입문 글. 업계 표준 용어 정의(offline/online store, transformation pipeline, feature registry, point-in-time correctness)의 출처가 되는 글.

### 다루는 핵심 개념

1. **Feature Store가 푸는 3대 문제**
   - Training-Serving Skew (학습/서빙 정의 차이로 인한 정확도 저하)
   - Feature 재사용 — 팀 간 중복 ETL 제거
   - Point-in-time correctness — 과거 시점 feature 값을 정확히 재현

2. **아키텍처 4 컴포넌트**
   - **Offline Store** — Snowflake / BigQuery / S3. 수개월~수년치 feature 데이터, 학습용
   - **Online Store** — DynamoDB / Redis / Cassandra. 현재 값만, 밀리초 응답
   - **Transformation Pipelines** — batch / streaming / on-demand 3종
   - **Feature Registry** — feature 정의·메타데이터·소유자·lineage의 중앙 카탈로그 ("single source of truth")

3. **Entity 기반 데이터 모델**
   - 모든 feature는 entity(예: user_id)와 timestamp에 묶여 저장
   - 표준화된 관리 + 단순한 프로덕션 쿼리 가능

4. **Online vs Offline 서빙**
   - Offline: 노트북 친화 SDK, point-in-time correct view 제공 → 학습 데이터 생성
   - Online: 고성능 API, 저지연 KV 스토어 → 실시간 추론

### 인용된 사례

- **Uber Michelangelo (2017)** — 초기 Feature Store 구현체. "operational ML stack의 필수 컴포넌트로 자리잡게 한 시작점"으로 언급

## 본 사이트에서의 사용

- [Part 11 Ch.01 Layer 3 — Feature Store + Vector DB](https://ai-contents-wine.vercel.app/11-data-enterprise/) (Feature Store 워크플로 SVG와 본문 설명의 직접 출처)

## 관련 wiki entity

- [feature-store.md](../../entities/feature-store.md)
- [vector-db.md](../../entities/vector-db.md)
- [data-warehouse.md](../../entities/data-warehouse.md)
