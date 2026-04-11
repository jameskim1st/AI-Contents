# Overfitting

**Category:** 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

과적합(Overfitting)은 모델이 **학습 데이터를 너무 잘 외워서** 새 데이터에는 일반화하지 못하는 현상이다. 증상은 "학습 손실↓ + 검증 손실↑"의 분기 패턴. 방지법은 Train/Validation/Test 3분할, Regularization, Dropout, Early stopping, Data augmentation 등. 머신러닝 실무에서 가장 흔한 실패 모드.

## 설명

### 직관: 암기 vs 이해

학생이 시험 직전 기출문제 10개를 **통째로 외웠다**고 치자.
- 기출과 똑같이 나오면 100점
- 숫자만 살짝 바뀌면 0점

이것이 바로 overfitting이다. 모델이 "데이터의 일반적 패턴"이 아니라 **개별 사례의 잡음까지 외워버린** 상태.

반대 극단은 **Underfitting**: 너무 단순한 모델이라 시험지를 펼쳐놓고도 문제를 못 푸는 상태.

### 진단: 학습 곡선이 갈라진다

```
Loss
 ^
 |                         ┌──── 검증 손실 (↑)
 |\                       /
 | \                     /
 |  \                   /
 |   \_______________  /
 |    \              \/
 |     \______________\___ 학습 손실 (↓)
 +----------------------->
                Epoch
       ↑             ↑
   Sweet spot    Overfitting 시작
```

- **초반**: 학습·검증 손실 둘 다 감소 → 좋음
- **Sweet spot**: 검증 손실 최저점 → 이 지점의 모델이 최적
- **후반**: 학습 손실은 계속 줄지만 검증 손실이 **뒤집혀 상승** → Overfitting

### 모델 복잡도 vs 손실 (U자 곡선)

```
Loss
 ^                                    /  ← 검증 손실
 |\                                  /
 | \                                /
 |  \                              /
 |   \                            /
 |    \________________________ _/
 |              ↓
 |          최적 복잡도         \___ 학습 손실 (↓)
 +-------------------------------->
    단순 ─────→ 복잡   모델 복잡도
    [Underfit]  [Sweet spot]  [Overfit]
```

모델이 복잡해질수록 학습 손실은 계속 떨어지지만, 검증 손실은 **U자 모양**을 그린다. 바닥이 바로 우리가 원하는 지점.

### 방지책

#### 1. Train / Validation / Test 3분할 — 가장 기본

```
전체 데이터
 ├── Train (60~80%)      ← 모델 학습
 ├── Validation (10~20%) ← 하이퍼파라미터 튜닝 / 조기 종료
 └── Test (10~20%)       ← 최종 평가 (딱 한 번만!)
```

Test set을 여러 번 보면 "test set에 과적합"이 되므로, **진짜 마지막 한 번**만 사용.

#### 2. Regularization (정규화)

손실함수에 "파라미터 크기 페널티"를 추가해 모델을 단순하게 강제.

$$
L_{\text{total}} = L_{\text{data}} + \lambda \|w\|^2
$$

- **L2 (Ridge)**: 가중치 제곱합 페널티. 2026년 LLM 학습의 AdamW가 기본 탑재.
- **L1 (Lasso)**: 절댓값 페널티. 희소성(sparsity) 유도.

#### 3. Dropout

학습 중 뉴런을 **무작위로 일시 제거**(보통 10~50%). 네트워크가 특정 경로에 의존하지 못하게 해 일반화 강제. Hinton이 2012년 제안, 아직도 현역.

#### 4. Early Stopping (조기 종료)

검증 손실이 N 에폭 동안 개선되지 않으면 학습 중단. 위의 "Sweet spot" 자동 포착.

#### 5. Data Augmentation (데이터 증강)

이미지: 회전·뒤집기·색 변경. 텍스트: 동의어 치환·역번역. NLP에서는 LLM 생성 데이터까지 사용. "데이터가 많아질수록 외우기 어려워진다"는 원리.

#### 6. 더 많은 데이터

가장 강력한 해결책. LLM 스케일링 법칙의 본질이기도 하다.

### 실무 체크리스트

- 검증 손실을 매 에폭 기록하고 그래프로 본다
- 검증 성능이 학습 성능보다 훨씬 나쁘면 overfit 의심
- [Linear Regression](./linear-regression.md)처럼 단순 모델부터 시작해 복잡도를 올린다
- **절대로 test set으로 하이퍼파라미터를 고르지 않는다**

## Reference

- [Part 0 — Ch.07 과적합: 외운 모델 vs 이해한 모델](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#overfitting)

## 연관 entity

- [Supervised Learning](./supervised-learning.md) — overfitting이 주로 발생하는 패러다임
- [Loss Function](./loss-function.md) — 학습 손실/검증 손실 분기로 overfit 진단
- [Linear Regression](./linear-regression.md) — 다항 회귀 차수 ↑ 시 overfitting 교과서 예제

## 출처

- Hinton et al., "Dropout: A Simple Way to Prevent Neural Networks from Overfitting", 2014.
- Goodfellow, Bengio, Courville, "Deep Learning", Ch.7 Regularization.
- PwC AI 리터러시 PPTX (Day1/Day2).

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX ingest.
