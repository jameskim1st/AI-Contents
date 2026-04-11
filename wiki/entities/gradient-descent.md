# Gradient Descent

**Category:** 알고리즘
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

경사하강법(Gradient Descent)은 "**산에서 조금씩 내려가며 최저점 찾기**"다. [Loss Function](./loss-function.md)의 기울기(gradient)를 구해 반대 방향으로 파라미터를 업데이트하는, 현대 딥러닝 학습의 기본 알고리즘. 학습률(learning rate)이 너무 크면 발산하고, 너무 작으면 수렴이 느리다. 변형으로 SGD, Mini-batch, Momentum, Adam 등이 있다.

## 설명

### 직관: 안개 낀 산에서 내려가기

눈가리개를 쓰고 산 위에 서 있다고 상상하자. 목표는 가장 낮은 곳에 도달하는 것. 방법은 단순하다:

1. 발 밑의 **경사를 느낀다** (= gradient 계산)
2. 가장 가파르게 내려가는 방향으로 **한 발 내딛는다** (= 파라미터 업데이트)
3. 반복.

수식으로:

$$
\theta_{t+1} = \theta_t - \eta \cdot \nabla L(\theta_t)
$$

- $\theta$ : 모델 파라미터 (가중치 w, 편향 b)
- $\eta$ : **학습률(learning rate)**
- $\nabla L$ : 손실함수의 기울기

### 학습률 (Learning Rate) — 가장 중요한 하이퍼파라미터

```
η 너무 큼:  ● → ● → ●  발산 (산을 뛰어넘음)
                  ↑↓↑↓↑↓

η 적당:     ●
              ↘ ●
                 ↘ ●
                    ↘ ● ← 최저점 도달

η 너무 작음: ●→●→●→●→●... 수렴이 하염없이 느림
```

- 너무 크면: 최저점을 건너뛰며 **진동/발산**
- 너무 작으면: **학습이 끝나지 않음**
- 현실: 대개 1e-3 ~ 1e-5 범위에서 시작, 스케줄러(warmup, cosine decay)로 조정

### 변형 알고리즘

| 변형 | 아이디어 | 쓰임 |
|---|---|---|
| **Batch GD** | 전체 데이터로 한 번에 기울기 계산 | 소규모 데이터·이론 |
| **SGD (Stochastic)** | 샘플 1개씩 업데이트 | 노이즈 있지만 빠름 |
| **Mini-batch SGD** | 32~512개 묶음 단위 | **실무 표준** |
| **Momentum** | 이전 이동 방향 관성 추가 | 골짜기 탈출 |
| **RMSProp** | 파라미터별 학습률 자동 조정 | RNN에서 인기 |
| **Adam** | Momentum + RMSProp 결합 | **LLM 학습 기본값** |
| **AdamW** | Adam + weight decay 분리 | 2026년 Transformer 학습의 사실상 표준 |

### Backpropagation과의 관계

경사하강법은 "**어떻게 업데이트하느냐**"를 다루고, [Backpropagation](./backpropagation.md)(역전파)은 "**그 기울기를 어떻게 효율적으로 계산하느냐**"를 다룬다. 딥러닝에서 이 둘은 언제나 한 쌍.

```
Forward pass  → 예측 → Loss 계산
                                ↓
Backward pass ← 기울기 ←── dL/dθ (Backpropagation)
                                ↓
Update        → θ ← θ − η·∇L     (Gradient Descent)
```

### 시각화: 공이 굴러내려가는 손실 곡면

```
Loss
 ^
 |    ●    ← 시작점 (랜덤 초기화)
 |     ↘
 |      ●
 |       ↘
 |        ●
 |         ↘_
 |           ●___● ← 최저점 수렴
 +--------------->
                 파라미터 θ
```

실제 신경망의 손실 곡면은 **수백만~수십억 차원**의 초고차원 공간이다. 사람이 상상할 수 없지만 수학적으로는 동일한 원리로 작동.

### 한계·주의점

- **지역 최소값(Local Minimum)** — 사실 Transformer처럼 거대 모델에서는 거의 문제가 안 되고, **안장점(saddle point)**이 더 큰 걸림돌.
- **Vanishing/Exploding Gradient** — 깊은 네트워크에서 기울기가 0에 가깝거나 폭발. ReLU·LayerNorm·Residual Connection으로 완화.
- **기울기 = 로컬 정보만 사용** — 전역 지형을 모르고 근시안적으로 움직인다.

## Reference

- [Part 0 — Ch.06 경사하강법: 산에서 내려오기](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#gradient-descent)

## 연관 entity

- [Loss Function](./loss-function.md) — 경사하강법이 최소화하려는 대상
- [Neural Network](./neural-network.md) — 경사하강법으로 학습하는 주된 모델
- [Supervised Learning](./supervised-learning.md) — 경사하강법이 돌아가는 학습 패러다임

## 출처

- Robbins & Monro, "A Stochastic Approximation Method", 1951 (SGD 원조).
- Kingma & Ba, "Adam: A Method for Stochastic Optimization", 2014.
- PwC AI 리터러시 PPTX (Day1/Day2).

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX ingest.
