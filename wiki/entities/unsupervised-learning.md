# Unsupervised Learning

**Category:** 학습 방법
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

**"정답(label) 없이 데이터 자체의 숨은 구조를 발견하는" [머신러닝](./machine-learning.md) 방법**. 라벨 y 없이 입력 x만 가지고 "비슷한 것끼리 묶기"(클러스터링), "고차원을 저차원으로 압축하기"(차원 축소), "정상 패턴에서 벗어난 것 찾기"(이상 탐지)를 한다. 대표 알고리즘은 **[K-Means](./k-means-clustering.md), DBSCAN, 계층적 클러스터링, PCA, t-SNE, UMAP, Autoencoder**. 장점은 **라벨 없이 바로 쓸 수 있다**는 것이지만, 결과가 "무엇을 의미하는지" 사람이 해석해야 하고 평가 지표도 불명확해서 [지도학습](./supervised-learning.md)보다 실무 적용이 까다롭다. 최근에는 **[자기지도학습](./self-supervised-learning.md)**이 라벨 없이도 지도학습에 버금가는 성능을 내며 비지도학습의 새 흐름을 주도한다.

## 설명

### 정의 — "설명 없는 학습"

주어진 데이터: `x₁, x₂, ..., xₙ` (라벨 y가 없다)

목적: 데이터의 **분포, 구조, 패턴**을 발견하는 것. 명확한 "정답"이 없기 때문에 **무엇을 찾을지**도 알고리즘과 사람의 판단에 맡겨진다.

### 3대 태스크

**1. 클러스터링 (Clustering) — "비슷한 것끼리 묶기"**

예: 쇼핑몰 고객 10만 명을 구매 패턴으로 묶어 5개 그룹으로 나눠 마케팅 전략 세우기.

- [**K-Means**](./k-means-clustering.md): K개 중심점을 반복적으로 이동시켜 군집화. 가장 유명하고 빠름.
- **DBSCAN**: 밀도 기반. K를 미리 정할 필요 없고 노이즈도 잡아냄. 임의 모양 군집 가능.
- **계층적 클러스터링 (Hierarchical)**: 덴드로그램으로 시각화. 작은 데이터에 유리.
- **Gaussian Mixture Model (GMM)**: 확률적 군집화.

**2. 차원 축소 (Dimensionality Reduction) — "고차원 → 저차원"**

예: 10,000개 feature를 가진 유전자 데이터를 2D로 압축해 시각화.

- **PCA (Principal Component Analysis)**: 분산을 최대화하는 직교축을 찾는다. 선형, 가장 빠름.
- **t-SNE**: 비선형, 군집 시각화의 왕. 느리고 global 구조는 약함.
- **UMAP**: t-SNE 대안. 빠르고 global 구조 보존 강함. 2026년 표준.
- **Autoencoder**: 신경망으로 압축→복원. 비선형, 딥러닝 기반.

**3. 이상 탐지 (Anomaly Detection) — "평소와 다른 것 찾기"**

예: 카드 부정거래, 제조 라인 불량품, 네트워크 침입.

- **Isolation Forest**: 이상값이 적은 분할로 격리됨.
- **One-Class SVM**: 정상 영역 경계 학습.
- **Autoencoder 기반**: 복원 오차가 크면 이상.
- **LOF (Local Outlier Factor)**: 밀도 비교.

### 대표 알고리즘 — K-Means 직관

```
1. K(군집 수)를 정한다.
2. K개의 중심점을 무작위로 찍는다.
3. 각 데이터 포인트를 가장 가까운 중심점에 배정.
4. 각 군집의 중심을 군집 내 점들의 평균으로 갱신.
5. 수렴할 때까지 3~4 반복.
```

고객 데이터가 "나이-연소득" 2D 평면에 흩어져 있다면, K=3일 때 대략 "20대 저소득", "30대 중산층", "50대 고소득" 같은 군집이 자연스럽게 나타난다. 이 라벨은 알고리즘이 붙여준 게 아니라 **사람이 해석해서 붙이는** 것이다.

### 차원 축소 — PCA 직관

10차원 공간에 흩어진 점들이 사실상 2차원 평면 위에 놓여 있다면, PCA는 "분산이 가장 큰 방향"을 1축, "그 다음 큰 방향"을 2축으로 선택해 2D로 투영한다. 정보 손실을 최소화하면서 시각화·저장·계산을 가능하게 한다.

**실무 용도**:
- 시각화 (2D/3D 산점도)
- 노이즈 제거
- 저장 공간 절감
- 다른 ML 모델의 전처리

### 구체 사례

| 도메인 | 데이터 | 태스크 | 알고리즘 |
|---|---|---|---|
| 커머스 | 고객 구매 이력 | 세분화 | K-Means |
| 금융 | 카드 거래 로그 | 사기 탐지 | Isolation Forest |
| 제조 | 센서 시계열 | 불량품 감지 | Autoencoder |
| 바이오 | 유전자 발현 | 차원축소·시각화 | PCA, UMAP |
| 마케팅 | 상품 특성 | 유사 상품 군집 | 계층적 |
| 보안 | 네트워크 트래픽 | 이상 탐지 | One-Class SVM |

### 장점 vs 단점

**장점**
- **라벨 불필요** — 데이터만 있으면 바로 시작.
- 새로운 패턴·구조 발견 가능 (사람이 몰랐던 것까지).
- 탐색적 데이터 분석(EDA)에 강력.

**단점**
- **평가 어려움** — "올바른 답"이 없어서 성능 측정이 모호. 실루엣 계수, 인트라/인터 클러스터 거리 같은 간접 지표만 존재.
- **해석 필요** — "이 군집은 뭘 의미하는가?"는 사람이 답해야 함.
- 하이퍼파라미터(K 값, ε 값)에 민감.
- 결과 안정성 낮음 (초기값에 따라 달라짐).

### 자기지도학습으로의 연결

엄밀히 말하면 **[자기지도학습](./self-supervised-learning.md)은 비지도학습의 하위 분야**다. 라벨이 없지만, 데이터 자체에서 **"가짜 라벨(pretext task)"**을 만들어 지도학습처럼 훈련한다. GPT의 "다음 토큰 예측"이 대표 예: 원문 "나는 사과를 ___"에서 `나는 사과를`이 X, `먹는다`가 Y인 것처럼 학습.

이 방식이 2020년 이후 CV와 NLP 모두에서 **순수 비지도 클러스터링보다 압도적 성능**을 내면서, 전통 비지도학습(K-Means 등)의 실무 비중은 점점 축소되고 있다. 여전히 탐색·시각화·이상 탐지에서는 비지도학습이 핵심이다.

### K 값 고르기 — Elbow Method

K-Means의 고민거리: K를 몇으로 할지. **Elbow Method**는 K를 바꿔가며 WCSS(Within-Cluster Sum of Squares)를 플롯했을 때 "팔꿈치처럼 꺾이는 지점"을 K로 선택. 더 정교한 지표로는 **Silhouette Score, Gap Statistic, Davies-Bouldin Index**.

## Reference

- [Part 0 — Ch.05 비지도학습: 스스로 구조 찾기](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#unsupervised-learning)

## 연관 entity

- [Machine Learning](./machine-learning.md) — 상위 카테고리
- [Supervised Learning](./supervised-learning.md) — 대조되는 학습 방법
- [K-Means Clustering](./k-means-clustering.md) — 대표 클러스터링 알고리즘
- [Self-Supervised Learning](./self-supervised-learning.md) — 비지도학습의 현대 확장판

## 출처

- Hastie, Tibshirani, Friedman, *The Elements of Statistical Learning*, Springer, 2009 — Ch. 14.
- Bishop, *Pattern Recognition and Machine Learning*, Springer, 2006 — Ch. 9.
- van der Maaten, Hinton, "Visualizing Data using t-SNE", JMLR 2008.
- McInnes et al., "UMAP: Uniform Manifold Approximation and Projection", 2018.
- PwC AI 리터러시 Day1/Day2 교육자료.

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX (Day1/Day2) ingest.
