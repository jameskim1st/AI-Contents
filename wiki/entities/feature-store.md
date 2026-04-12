# Feature Store

**Category:** 저장소 / MLOps
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

ML feature를 중앙에서 정의·저장·재사용·서빙하기 위한 인프라 계층. **Offline store(학습용, 대용량·고지연 OK)**와 **Online store(실시간 서빙용, 밀리초 지연)**의 이중 구조가 핵심. **Uber Michelangelo(2017)**가 원형을 공개하면서 업계가 따라 만들기 시작했고, **Feast(오픈소스), Tecton(Feast 창업자 상용), Databricks Feature Store, AWS SageMaker Feature Store, Hopsworks**가 2026년의 주요 선택지. 해결하는 핵심 문제는 **Training-Serving Skew** — "학습 때 쓴 feature와 서빙 때 쓴 feature가 미묘하게 다른" 악명 높은 버그. LLM 시대에도 레거시 ML 시스템·추천·리스크·이상탐지에서 여전히 살아남은 인프라.

## 설명

### 왜 Feature Store가 필요한가

ML 조직이 커지면서 반복되는 고통들:
1. **중복 계산** — 팀 A와 팀 B가 동일한 "지난 30일 구매 금액"을 각자 구현.
2. **Training-Serving Skew** — 학습은 Pandas로, 서빙은 Java로 구현 → 미묘한 차이가 누적 → 프로덕션 정확도 급락.
3. **Point-in-time correctness** — 과거 특정 시점의 feature 값을 학습용으로 재현하기 어려움 (데이터 누수).
4. **거버넌스** — 어떤 feature가 어디서 쓰이는지 아무도 모름.

Feature Store는 이 네 가지를 한 번에 해결한다.

### 이중 저장소 구조

```
[Raw Data]
   ↓ feature 정의 (SQL, Python)
   ↓
┌──────────────┐         ┌──────────────┐
│ Offline Store│         │ Online Store │
│ (Parquet,    │ sync →  │ (Redis,      │
│  Iceberg, BQ)│         │  DynamoDB)   │
│              │         │              │
│ 학습용       │         │ 서빙용       │
│ TB 규모      │         │ ms 지연      │
└──────────────┘         └──────────────┘
        ↓                       ↓
    Training                Inference
```

**동일한 정의**에서 두 저장소를 생성하므로 Training-Serving Skew가 구조적으로 방지된다.

### 주요 제품 (2026)

| 제품 | 종류 | 특징 |
|---|---|---|
| **Feast** | 오픈소스 | 경량, 클라우드 중립, Python 정의 |
| **Tecton** | 상용 (Feast 창업자) | 실시간 스트리밍 feature 강점 |
| **Databricks Feature Store** | 플랫폼 내장 | Delta Lake 통합, Unity Catalog 거버넌스 |
| **AWS SageMaker Feature Store** | 클라우드 관리형 | Online = 낮은 레이턴시, Offline = S3 |
| **Hopsworks** | 오픈소스+상용 | 유럽 기반, 멀티 모달 feature 지원 |
| **Vertex AI Feature Store** | GCP 관리형 | BigQuery와 긴밀 통합 |

### Training-Serving Skew 실제 사례

Facebook 2018 논문은 대규모 뉴스피드 랭킹 모델에서 **"학습 AUC 0.82 → 서빙 AUC 0.74"** 격차가 있었다고 보고. 원인은 학습 시 Pandas로 계산된 `user_interaction_count_7d`와 서빙 시 C++로 계산된 값이 경계 조건에서 달랐기 때문. Feature Store는 **단일 정의 + 동일한 계산 엔진**으로 이를 막는다.

### Point-in-time Join (시점 정확성)

학습 데이터를 만들 때 가장 실수하기 쉬운 부분. "2024-03-15에 이 고객이 클릭했다"는 레이블에 대해, feature는 **2024-03-15 그 시점의** `총 구매 금액`을 써야 한다. 현재 값을 쓰면 **미래 정보 누수(data leakage)** 발생. Feature Store는 이 시점 join을 자동화한다.

```python
# Feast 예
training_df = store.get_historical_features(
    entity_df=labels,  # event_timestamp 포함
    features=["user:total_purchase_7d", "user:last_login"],
).to_df()
```

### LLM 시대에도 살아남은 이유

RAG·에이전트가 핫하지만 **전통 ML 워크로드**는 사라지지 않았다:
- 추천 시스템 (Netflix, Spotify, 쿠팡)
- 광고 랭킹 (Meta, Google)
- 사기 탐지 (PayPal, 토스)
- 신용 평가 (Capital One)
- 물류 ETA 예측 (Uber, 배민)

이들은 여전히 **구조화된 feature + gradient boosting / DNN** 기반이다. LLM 시대의 AI 팀조차 이런 시스템을 서포트하기 위해 Feature Store를 운영한다. 한편 LLM 쪽은 feature 대신 **[Vector DB](./vector-db.md)**와 **프롬프트 컨텍스트**가 유사한 역할을 맡는다.

### 한계

- **복잡성** — 팀 규모 30명 미만이면 과잉 엔지니어링. SQL view + 캐시로 충분한 경우 많음.
- **Streaming feature 어려움** — 실시간 집계는 여전히 Flink·Kafka Streams와 결합해야.
- **LLM과의 접점 부족** — 대부분의 Feature Store가 고차원 벡터·임베딩에는 약함.

## Reference

- [Part 8 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/08-data-basics/)
- [Part 9 — Ch.05 MLOps와 Feature Store](https://ai-contents-wine.vercel.app/09-data-enterprise/)

## 연관 entity

- [Data Warehouse](./data-warehouse.md) — Offline store의 전통 기반
- [Data Lakehouse](./data-lakehouse.md) — 2026 표준 기반
- [Vector DB](./vector-db.md) — LLM 시대의 대응 계층
- [dbt](./dbt.md) — feature 정의 SQL 관리
- [Evaluation](./evaluation.md) — Training-serving skew 탐지 근거
- [Data Quality](./data-quality.md) — feature 품질 모니터링

## 출처

- Uber Engineering, "Meet Michelangelo: Uber's Machine Learning Platform", 2017.
- Feast documentation, 2026.
- Tecton, "The State of the Feature Store 2026".
- Hopsworks, "Feature Store for ML", 2024.
- Facebook, "Applied Machine Learning at Facebook", 2018.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
