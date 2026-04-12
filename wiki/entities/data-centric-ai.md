# Data-Centric AI

**Category:** 방법론 / 운동
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

**Andrew Ng**이 2021년부터 주창한 운동. 기존 ML 연구가 "같은 데이터로 더 나은 모델 찾기"(**Model-centric**)에 집중했다면, Data-Centric AI는 "같은 모델로 더 나은 데이터 만들기"로 시각을 뒤집는다. Ng의 유명한 발언 — "**ML 실무의 80%는 데이터 작업이다**". 핵심 루프는 **Error Analysis → Data Improvement → Retrain**. 경험칙 "**Small clean data > Big noisy data**"가 핵심이며, Ng가 창업한 **Landing AI**가 제조업에서 이를 상용화했다. 2021년 시작된 **Data-Centric AI Competition**은 "모델 고정, 데이터만 바꿔 정확도 경쟁"이라는 파격적 룰로 운동을 가시화했다.

## 설명

### 역사

- **2021-03** — Andrew Ng가 "From Model-Centric to Data-Centric AI" 강연 공개 (deeplearning.ai).
- **2021-06** — NeurIPS 2021 Data-Centric AI Workshop.
- **2021-Q4** — 제1회 **Data-Centric AI Competition** (MNIST 모델 고정, 데이터만 개선).
- **2022~** — MIT에서 **Data-Centric AI** 강좌 개설.
- **2024~** — LLM 시대에 **data curation** 관점에서 재조명 (Phi-3, LIMA 논문 등).
- **2026** — 대규모 사전학습이 [Pre-training Data](./pre-training-data.md)의 질에 좌우된다는 공감대가 업계 표준.

### Model-centric vs Data-centric

| 구분 | Model-centric | Data-centric |
|---|---|---|
| 가정 | 데이터는 고정, 모델이 변수 | 모델은 고정, 데이터가 변수 |
| 대표 활동 | 하이퍼파라미터 튜닝, 아키텍처 탐색 | 라벨 정제, 모호한 케이스 해소, 엣지 케이스 수집 |
| 성공 지표 | 벤치마크 SOTA | "**라벨 일관성**" 및 실무 배포 정확도 |
| 누가 한다 | ML 연구자 | 도메인 전문가 + ML 엔지니어 |

### 핵심 루프

```
1. Train baseline model
2. Error Analysis
   ↓ 실패 케이스 범주화 ("어두운 조명", "흐린 이미지"...)
3. Data Improvement
   ↓ 해당 범주의 데이터 추가/재라벨링/정제
4. Retrain
   ↓ 개선 측정
5. Repeat
```

Ng의 철학: **"모델 1%를 짜내기 위해 아키텍처 2주 튜닝하느니, 라벨 일관성을 바로잡아 10% 올려라."**

### Small Clean > Big Noisy

- Landing AI 제조업 사례: 500장의 잘 라벨링된 결함 이미지가 50,000장의 소음 데이터를 이긴다.
- **LIMA 논문 (Meta, 2023)** — 1000개의 고품질 인스트럭션으로도 RLHF 없이 GPT-4급 스타일 학습 가능. → [Fine-tuning Data](./fine-tuning-data.md)의 패러다임 전환.
- **Phi-3 (Microsoft, 2024)** — 3.8B 파라미터 모델이 교과서 품질 데이터만으로 훨씬 큰 모델 성능 추격.
- **Textbooks Are All You Need (Microsoft, 2023)** — 동일한 철학 논문.

### 기법

**1. 라벨 일관성 향상**
- 여러 라벨러의 불일치 탐지 및 재검토.
- **Cleanlab** 라이브러리 — 통계적으로 의심스러운 라벨 자동 탐지.
- **Snorkel** — 약한 라벨을 프로그래밍으로 결합.

**2. 엣지 케이스 수집**
- Active learning — 모델이 가장 불확실한 샘플을 우선 라벨링.
- **hard example mining** — 실패 케이스를 의도적으로 확대.

**3. 데이터 큐레이션**
- **Deduplication** — 중복 제거. 2024 연구(Lee et al.)는 웹 데이터의 중복 제거만으로 모델 품질이 크게 오름을 증명.
- **Quality filtering** — perplexity, classifier로 저품질 필터.
- **Synthetic augmentation** — [Synthetic Data](./synthetic-data.md) 생성.

### LLM 시대에 부활한 이유

2020~2023년은 "모델 키우기" 시대였다. 하지만 2024 이후:
- 기초 모델들이 수렴 → 차별화는 **데이터**.
- 합성 데이터 비중 급증.
- **Fine-tuning Data**의 품질이 성패를 결정 (LIMA, Alpaca).
- [Pre-training Data](./pre-training-data.md) 큐레이션이 연구의 핵심 주제가 됨.

즉 Data-Centric AI는 "전통 ML 운동"이 아니라 **2026년 LLM 전체에 관통하는 사고 방식**이 되었다.

### 2026 도구

- **Cleanlab** — 라벨 오류 탐지, 상용 버전 Cleanlab Studio.
- **Snorkel Flow** — 약한 라벨 + 데이터 프로그래밍.
- **Lilac** — 데이터셋 탐색·필터링.
- **Scale AI / Surge AI** — 고품질 라벨링 서비스.
- **Argilla** — 오픈소스 데이터 큐레이션 플랫폼.

## Reference

- [Part 1 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/01-data-basics/)
- [Part 8 — Ch.03 데이터 품질과 거버넌스](https://ai-contents-wine.vercel.app/08-data-enterprise/)

## 연관 entity

- [Data Quality](./data-quality.md) — 자매 개념
- [Fine-tuning Data](./fine-tuning-data.md) — LIMA 식 소량 고품질 접근
- [Pre-training Data](./pre-training-data.md) — 대규모 큐레이션
- [Synthetic Data](./synthetic-data.md) — 데이터 증강 전략
- [Data Bias](./data-bias.md) — 데이터 개선으로 편향 완화
- [Evaluation](./evaluation.md) — Error analysis의 기반

## 출처

- Andrew Ng, "From Model-Centric to Data-Centric AI", DeepLearning.AI, 2021.
- NeurIPS Data-Centric AI Workshop, 2021.
- Zhou et al., "LIMA: Less Is More for Alignment", Meta, 2023.
- Gunasekar et al., "Textbooks Are All You Need", Microsoft, 2023.
- Landing AI case studies, 2022~2025.
- MIT 6.S975 Data-Centric AI course materials.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
