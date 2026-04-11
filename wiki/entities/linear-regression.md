# Linear Regression

**Category:** 알고리즘
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

선형 회귀(Linear Regression)는 **가장 단순한 지도학습 알고리즘**이자 머신러닝 입문의 첫 관문이다. "y = wx + b"라는 직선 하나로 데이터를 설명하려 한다. 손실함수는 MSE (각 점과 회귀선 사이 거리의 제곱합), 학습은 [Gradient Descent](./gradient-descent.md) 혹은 정규방정식(closed-form)으로. 단순하지만 해석 가능성이 뛰어나고, 더 복잡한 모든 알고리즘의 **개념적 토대**.

## 설명

### 기본 아이디어: 직선 하나로 세상 설명하기

데이터가 점으로 찍혀 있을 때, 그 경향을 가장 잘 나타내는 **직선**을 찾는 것.

```
 y ^
   |           ●
   |        ●/
   |       /    ← 이 직선을 찾는 것이 목표
   |     ●
   |   ●/
   | ●/
   +-------------> x
```

수식:

$$
\hat{y} = wx + b
$$

- $w$ : 기울기 (weight)
- $b$ : 절편 (bias)
- $\hat{y}$ : 예측값

### 예: 연봉 vs 만족도

x축을 "연봉", y축을 "직무 만족도"로 놓으면 전형적으로 우상향 직선이 나온다. 선형회귀는 "연봉이 1천만원 오르면 만족도가 평균 0.x점 오른다"라는 관계를 **정량화**해준다. 해석 가능성(interpretability)이 매우 높아, 통계학·경제학·의학에서 기본 도구로 쓰인다.

### 손실함수: MSE

"회귀선이 얼마나 잘 맞는가"의 기준은 **각 데이터 포인트와 직선 사이 수직 거리의 제곱합**:

$$
L(w, b) = \frac{1}{n}\sum_{i=1}^{n} (y_i - (wx_i + b))^2
$$

```
 y ^
   |        ●
   |        |←-- 오차(residual)
   |       /
   |      ●
   |    /↑
   |   ●  \
   |  /   └ 이 거리의 제곱합을 최소화
   +-------------> x
```

이 손실함수는 [Loss Function](./loss-function.md) 문서에서 상세히 다룬 MSE 그 자체. 제곱이므로 **큰 오차에 더 큰 페널티**를 준다.

### 학습 방법

두 가지 길이 있다.

**1. Closed-form (정규방정식)**

선형대수적으로 한 방에 해가 나온다:

$$
w = (X^\top X)^{-1} X^\top y
$$

- 장점: 반복 없음, 정확한 해
- 단점: 특징 수(d)가 크면 $O(d^3)$ 행렬 역연산 폭발 → 대규모엔 부적합

**2. Gradient Descent**

[Gradient Descent](./gradient-descent.md)로 MSE를 조금씩 줄여나가는 방식. 거대 데이터·특징에 확장성 있고, 신경망과 동일한 학습 철학이라 교육적으로 중요.

### 다중 선형 회귀 (Multiple Features)

특징이 여러 개면:

$$
\hat{y} = w_1 x_1 + w_2 x_2 + \dots + w_d x_d + b
$$

예: 집값 = $w_1$·면적 + $w_2$·방수 + $w_3$·역까지거리 + $b$. 각 $w_i$가 해당 특징의 **중요도**이자 **영향 방향**(부호)을 말해준다.

### 비선형 데이터엔 부족

현실 데이터는 직선 하나로 안 잡힌다. 예를 들어 `y = x^2` 모양의 분포:

```
 y ^
   |  ●               ●
   |   ●             ●
   |     ●         ●
   |       ●_____●     ← 직선으론 절대 못 맞춤
   +-------------> x
```

해결책:

1. **다항 회귀(Polynomial Regression)**: $\hat{y} = w_1 x + w_2 x^2 + w_3 x^3 + \dots$
2. **비선형 변환(Feature Engineering)**: log, exp, sin 등을 적용 후 선형화
3. **비선형 모델**: 결정트리, SVM 커널, 신경망

**단, 다항 차수를 너무 올리면** → [Overfitting](./overfitting.md)의 교과서 예제가 된다. 차수 1 → 경직, 차수 10 → 학습 데이터만 외움.

### 가정 (알고 쓰자)

- **선형성** — x와 y의 관계가 직선이어야 함
- **독립성** — 샘플이 서로 독립
- **등분산성** — 오차 분산이 일정
- **정규성** — 오차가 정규분포 (엄밀 통계용)

이 가정이 무너지면 회귀 계수의 **신뢰성**이 떨어진다. 실무 ML에선 예측력 위주로 쓰기 때문에 가정 검증을 생략하기도 하지만, 원리는 알고 있어야 한다.

## Reference

- [Part 0 — Ch.08 선형회귀: 가장 단순한 지도학습](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#linear-regression)

## 연관 entity

- [Supervised Learning](./supervised-learning.md) — 선형 회귀가 속하는 패러다임
- [Loss Function](./loss-function.md) — MSE로 회귀선 품질 측정
- [Gradient Descent](./gradient-descent.md) — 계수 w, b를 학습하는 알고리즘
- [Overfitting](./overfitting.md) — 다항 차수 ↑ 시의 고전적 실패 사례

## 출처

- Galton, "Regression towards mediocrity in hereditary stature", 1886 (regression 개념 원조).
- Hastie, Tibshirani, Friedman, "The Elements of Statistical Learning", Ch.3.
- PwC AI 리터러시 PPTX (Day1/Day2).

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX ingest.
