# K-Means Clustering

**Category:** 알고리즘
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

K-Means는 **가장 유명한 비지도학습(unsupervised learning) 알고리즘**이다. 라벨이 없는 데이터를 K개의 그룹으로 묶는다. 알고리즘은 ①K 지정 → ②중심 무작위 → ③가장 가까운 중심에 할당 → ④중심 재계산 → ③반복. 최적 K는 **Elbow Method**로 찾는다. 한계는 K를 미리 정해야 하고 구형 클러스터만 잘 잡는다는 것.

## 설명

### 비지도학습에서의 위치

지도학습이 "정답(label)이 있는 문제"라면, 비지도학습은 "**정답 없이 구조를 찾는 문제**". K-Means는 그 중에서 가장 대표적인 **군집화(clustering)** 알고리즘이다.

```
지도학습:   (x, y) → y=? 예측      ← 답이 있다
비지도학습: (x)    → 구조=?  발견   ← 답이 없다 (K-Means 위치)
```

### 알고리즘 4단계

#### Step 1. K를 정한다

몇 개 그룹으로 나눌지 **사람이 먼저 정한다**. K=3이면 3개 클러스터.

#### Step 2. 중심(centroid)을 무작위로 놓는다

```
 ●   ●           ●
   ●   ●    ★  ← 랜덤 초기화된 중심
 ●           ★
  ●    ●  ●     ★
     ●   ●
```

#### Step 3. 각 점을 가장 가까운 중심에 할당

```
 ①   ①           ②
   ①   ①    ★
 ①           ★②
  ③    ③  ③     ★
     ③   ③
```

각 점이 가장 가까운 별표(중심)에 소속된다.

#### Step 4. 중심을 재계산

각 그룹에 속한 점들의 평균(mean)으로 중심을 옮긴다.

```
 ①   ①           ②
   ①★①      ★②  ← 중심이 각 그룹 중앙으로 이동
 ①           ②
  ③    ③  ③
     ★③ ③
```

#### → Step 3으로 돌아가 반복

중심이 더 이상 움직이지 않을 때까지 Step 3·4를 반복. 보통 수십 번이면 수렴.

### 수식으로

목적함수 (within-cluster sum of squares, WCSS):

$$
\text{WCSS} = \sum_{k=1}^{K} \sum_{x \in C_k} \| x - \mu_k \|^2
$$

즉 "각 점에서 자기 클러스터 중심까지 거리의 제곱합"을 최소화. [Loss Function](./loss-function.md) 관점에서 보면 이것이 K-Means의 손실함수.

### 최적 K 찾기: Elbow Method

K를 1, 2, 3, ... 로 늘려가며 WCSS를 그려보면:

```
WCSS
 ^
 |●
 | \
 |  \
 |   ●
 |    \
 |     \
 |      ●  ← 꺾이는 지점 (elbow) = 최적 K
 |       \___
 |           ●___●___●___●
 +----------------------> K
 1  2  3  4  5  6  7  8
```

K를 늘릴수록 WCSS는 당연히 떨어지지만, **"팔꿈치(elbow)"** 모양의 꺾임점이 비용 대비 효과가 가장 좋은 K. 실루엣 계수(Silhouette Score)와 병행하면 더 확실.

### 시각화: 점들이 색칠되는 과정

```
반복 0 (초기)       반복 1              반복 5 (수렴)
●●●●●●             ①①①②②②            ①①①②②②
●●●●●●             ①①①②②②            ①①①②②②
●●●●●●      →      ③③③③③③     →      ③③③②②②
●●●●●●             ③③③③③③            ③③③③③③
(모두 회색)        (대략 구분)          (안정화)
```

애니메이션으로 보면 중심이 점점 그룹 중앙으로 빨려드는 모습이 나온다.

### 한계

1. **K를 미리 알아야 한다** — 데이터를 보기 전에 몇 개 그룹인지 알기 어렵다. Elbow·Silhouette·Gap Statistic 등으로 우회.
2. **초기값 의존성** — 랜덤 초기화에 따라 지역 최소값에 빠짐. **K-Means++** 로 초기화를 개선 (기본 scikit-learn 설정).
3. **구형 클러스터만 잘 찾는다** — 길쭉하거나 초승달 모양 분포는 실패. 이 경우 DBSCAN, Spectral Clustering, Gaussian Mixture Model이 더 나음.
4. **스케일 민감** — 특징 단위가 다르면 표준화 필수 ([KNN](./knn.md)과 동일한 함정).
5. **이상치(outlier) 취약** — 평균으로 중심을 잡으므로 극단값에 끌려감.

### 현장 활용

- **고객 세분화(Customer Segmentation)** — 구매 패턴 기반 K개 페르소나 추출
- **이미지 압축** — 픽셀 색을 K개 대표색으로 양자화
- **문서 주제 묶음** — 임베딩 벡터를 K-Means로 토픽 그룹핑
- **이상 탐지** — 클러스터에서 먼 점을 outlier로 간주
- **LLM 파이프라인에서** — 벡터 DB 검색 전 IVF 인덱스가 내부적으로 K-Means 사용

### vs 다른 비지도 알고리즘

| 알고리즘 | 특징 | 쓰임 |
|---|---|---|
| **K-Means** | 구형 클러스터, 빠름 | 대부분의 일반 케이스 |
| **DBSCAN** | 밀도 기반, K 불필요 | 임의 모양 + 이상치 탐지 |
| **Hierarchical** | 트리 구조 계층 | 분류체계(taxonomy) 탐색 |
| **GMM** | 확률 기반, soft assignment | 겹치는 클러스터 |

## Reference

- [Part 0 — Ch.10 K-Means: 비지도학습의 대표선수](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#k-means-clustering)

## 연관 entity

- [Unsupervised Learning](./unsupervised-learning.md) — K-Means가 속하는 패러다임
- [Loss Function](./loss-function.md) — WCSS가 K-Means의 손실함수
- [KNN](./knn.md) — 이름·거리 계산이 비슷하지만 완전히 다른 알고리즘 (지도 vs 비지도)
- [Vector DB](./vector-db.md) — IVF 인덱스 내부에서 K-Means를 사용

## 출처

- MacQueen, "Some methods for classification and analysis of multivariate observations", 1967.
- Arthur & Vassilvitskii, "k-means++: The Advantages of Careful Seeding", 2007.
- PwC AI 리터러시 PPTX (Day1/Day2).

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX ingest.
