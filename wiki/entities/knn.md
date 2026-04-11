# K-Nearest Neighbors (KNN)

**Category:** 알고리즘
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

K-Nearest Neighbors(KNN, K-최근접 이웃)는 **"가장 가까운 K개 이웃을 찾아 다수결"** 로 예측하는 극도로 단순한 알고리즘이다. 학습 과정이 없고(lazy learning) 추론 시 모든 데이터와 거리를 계산한다. 분류·회귀 모두 가능. 단순하지만 2026년에도 [Vector DB](./vector-db.md)의 **ANN(Approximate Nearest Neighbor) 검색**의 이론적 원류로 살아있다.

## 설명

### 직관: "친구를 보면 그 사람을 안다"

새로운 점이 나타났을 때 "주변에 이미 라벨이 붙어 있는 점들 중 가장 가까운 K개의 다수결로 라벨을 정한다".

```
 y ^
   |   ○   ○
   |     ○       ● ●
   |       ○   ●   ●
   |         ? ← 새 데이터
   |       ○   ●
   |          ●
   +------------> x

 K=3일 때: 가장 가까운 3개 중 ●이 2개 → ●로 분류
```

### 알고리즘 (이게 전부)

1. K를 정한다 (예: K=5)
2. 새 점이 들어오면, **모든 학습 데이터와 거리를 계산**
3. 거리가 가장 짧은 K개 이웃을 고른다
4. **분류**: 다수결. **회귀**: 평균 (혹은 거리 가중 평균).

끝. 학습 단계가 사실상 존재하지 않는다.

### Lazy Learning — 학습 과정 없음

대부분의 ML 알고리즘은 **학습(fit) → 추론(predict)** 2단계다. KNN은 fit 단계가 그냥 "데이터 통째로 저장"이다.

| 단계 | 전통 ML | KNN |
|---|---|---|
| 학습 시간 | 길다 | 0 (저장만) |
| 추론 시간 | 짧다 | 김 (전체 스캔) |
| 메모리 | 모델 파라미터만 | **전체 데이터** |

→ 그래서 KNN을 **instance-based / memory-based / lazy learning**이라고 부른다. 학습을 추론 시점으로 미루는 것.

### K 값 선택이 전부

K가 너무 작으면 (K=1):
- 노이즈 하나에도 흔들림
- 결정 경계가 **울퉁불퉁** → overfit

K가 너무 크면 (K=N):
- 그냥 전체 다수결이 됨
- 지역 정보 무시 → underfit

```
K=1                K=5                K=100
결정경계 거친     적당              너무 매끄러움
(overfit)         (sweet spot)       (underfit)
```

실무: 보통 홀수 K를 쓰고 (동수 방지), 교차검증으로 5·7·11·15 중 고른다.

### 거리 척도 (Distance Metric)

"가깝다"의 정의가 여러 개다.

**유클리드 거리(Euclidean)** — 기본값
$$
d(x, y) = \sqrt{\sum_i (x_i - y_i)^2}
$$

**맨해튼 거리(Manhattan / L1)** — 격자 경로 합

**코사인 유사도(Cosine)** — 벡터 방향. 텍스트·임베딩에서 표준.
$$
\cos(\theta) = \frac{x \cdot y}{\|x\| \|y\|}
$$

**마할라노비스(Mahalanobis)** — 공분산 보정. 특징 스케일 차이 흡수.

### 한계

- **차원의 저주(Curse of Dimensionality)** — 고차원에선 "모든 점이 대략 같은 거리"가 되어버려 KNN이 망가진다. 이게 KNN이 원시 이미지·텍스트에 바로 쓰이지 못하는 이유.
- **스케일 민감** — 특징 단위가 다르면(연봉 만원 vs 나이 년) 큰 값이 거리를 지배. 반드시 **정규화/표준화** 필수.
- **추론 비용** — N개 데이터면 매 추론이 O(N·d). 수백만 샘플에서 직접 쓰긴 어렵다.

### 현대적 부활: Vector DB와 ANN

KNN은 학부 알고리즘 같지만, 2026년 LLM 시대의 [Vector DB](./vector-db.md)는 본질적으로 **대규모 KNN 엔진**이다. 다만 정확한 KNN은 느리므로 **ANN (Approximate Nearest Neighbor)**로 확장:

- **HNSW** — 그래프 기반. 근사 KNN을 로그 시간에
- **IVF** — 벡터 공간 클러스터링으로 후보 축소
- **PQ** — 양자화로 메모리 압축

이들은 모두 "KNN을 더 빨리 하는 방법"이다. 원리는 동일하게 "가장 가까운 K개".

### 언제 쓰나

- 데이터 작고 특징 차원 낮음
- 결정 경계 해석이 중요하지 않음
- **프로토타이핑 베이스라인** — 뭐든 KNN부터 돌려보고, 못 이기는 복잡 모델은 쓰지 말자
- 추천 시스템의 item-based collaborative filtering
- [Vector DB](./vector-db.md) 뒤의 의미 검색

## Reference

- [Part 0 — Ch.09 KNN: 가장 직관적인 알고리즘](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#knn)

## 연관 entity

- [Supervised Learning](./supervised-learning.md) — KNN이 속하는 패러다임
- [Vector DB](./vector-db.md) — 대규모 KNN·ANN 검색의 현대적 인프라
- [Loss Function](./loss-function.md) — KNN은 사실 loss function이 없는 드문 알고리즘 (비교용)

## 출처

- Cover & Hart, "Nearest Neighbor Pattern Classification", 1967.
- Hastie, Tibshirani, Friedman, "The Elements of Statistical Learning", Ch.13.
- PwC AI 리터러시 PPTX (Day1/Day2).

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX ingest.
