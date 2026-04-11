# Loss Function

**Category:** 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

손실함수(Loss Function)는 **모델의 예측이 정답과 얼마나 다른지를 측정하는 함수**다. 학습의 목표는 결국 "손실함수를 최소화하는 파라미터를 찾는 것"으로 수렴한다. 회귀에는 MSE·MAE, 분류에는 Cross-Entropy·Hinge Loss가 표준. 손실 곡면은 산(골짜기) 모양으로 시각화되고, [Gradient Descent](./gradient-descent.md)는 그 골짜기를 내려가는 절차다.

## 설명

### 왜 필요한가

"모델이 잘 학습됐나?"를 숫자로 정의하지 않으면 개선할 수도 없다. 손실함수는 그 **객관적 잣대**다.

기본 개념:

```
Error = 실제값(y) − 예측값(ŷ)
```

그냥 Error를 더하면 양수·음수가 상쇄되므로, **제곱하거나 절댓값**으로 부호를 없앤 뒤 평균을 낸다.

### 회귀용 손실함수

**MSE (Mean Squared Error, 평균제곱오차)**

$$
\text{MSE} = \frac{1}{n}\sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$

- 큰 오차에 강한 페널티 (제곱하므로)
- 이상치(outlier)에 민감
- [Linear Regression](./linear-regression.md)의 기본값

**MAE (Mean Absolute Error, 평균절대오차)**

$$
\text{MAE} = \frac{1}{n}\sum_{i=1}^{n} |y_i - \hat{y}_i|
$$

- 이상치에 강건
- 미분이 0점에서 불연속 → 최적화가 덜 매끄러움

### 분류용 손실함수

**Cross-Entropy (교차 엔트로피)** — 분류의 사실상 표준

$$
\text{CE} = -\sum_{i} y_i \log(\hat{y}_i)
$$

예측 확률이 정답에 가까울수록 작아지고, 멀어질수록 급격히 커진다. 예: 고양이 사진을 "고양이 0.9"로 예측하면 loss = −log(0.9) ≈ 0.105. "고양이 0.1"로 예측하면 loss = −log(0.1) ≈ 2.3 (22배 페널티).

**Hinge Loss** — SVM에서 주로 사용. "정답과 오답의 마진(margin)"을 최대화.

### 학습의 목표 = 손실 최소화

학습 과정을 한 줄로 요약하면:

> "가능한 모든 파라미터 중 손실함수 값이 가장 작은 지점을 찾아가는 여정"

### 손실 곡면 시각화 (산 모양)

파라미터 공간을 2차원으로 축소하면, 손실은 3차원 산맥 지형처럼 그려진다.

```
       Loss
        ^
        |    /\        /\
        |   /  \      /  \
        |  /    \    /    \     ← 높은 산 = 나쁜 예측
        | /      \  /      \
        |/        \/        \
        +-----------*--------->  파라미터
                    ↑
                 최저점 (global minimum)
```

- **공이 산 위에서 굴러내려가는 모양** = Gradient Descent
- 골짜기가 여러 개면 **지역 최소값(local minimum)** 문제 발생
- 깊은 신경망의 손실 곡면은 고차원이라 극단적으로 복잡

### 주의점

- [Overfitting](./overfitting.md)과의 관계: **학습 손실**은 계속 줄어도 **검증 손실**은 어느 순간부터 올라간다. 학습 손실만 보면 속는다.
- 손실함수는 태스크(task)에 맞게 골라야 한다. 분류에 MSE를 쓰면 확률 해석이 깨지고 학습도 느려진다.
- 사용자 지표(예: 정확도, F1)와 최적화 지표(손실)가 항상 일치하지는 않는다.

## Reference

- [Part 0 — Ch.05 손실함수: 모델이 틀린 정도 재기](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#loss-function)

## 연관 entity

- [Gradient Descent](./gradient-descent.md) — 손실을 실제로 줄여나가는 알고리즘
- [Supervised Learning](./supervised-learning.md) — 손실함수를 쓰는 학습 패러다임
- [Overfitting](./overfitting.md) — 학습 손실과 검증 손실이 갈라지는 현상
- [Linear Regression](./linear-regression.md) — MSE 손실의 가장 단순한 사용 사례

## 출처

- Goodfellow, Bengio, Courville, "Deep Learning", 2016.
- PwC AI 리터러시 PPTX (Day1/Day2).

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX ingest.
