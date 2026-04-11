# Backpropagation (역전파)

**Category:** 알고리즘
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

신경망 학습의 핵심 알고리즘. 출력층의 오차를 **역방향**으로 전파하며 각 가중치가 오차에 얼마나 기여했는지 계산(chain rule)하고, [Gradient Descent](./gradient-descent.md)가 그 기울기를 써서 가중치를 갱신한다. 1986년 Rumelhart·Hinton·Williams 논문으로 대중화, 2012년 이후 모든 딥러닝의 표준이 됐다.

## 설명

### 왜 "역"전파인가

순전파(forward): 입력 → 은닉층 → 출력 → 손실 계산
역전파(backward): **손실 → 출력층 → 은닉층 → 입력층 방향으로 기울기 전파**

각 층의 가중치 `w`가 최종 손실 `L`에 얼마나 영향을 주는지, 미분의 연쇄법칙(chain rule)으로 계산한다:

```
∂L/∂w = ∂L/∂y · ∂y/∂z · ∂z/∂w
```

### Gradient Descent와의 분업

| 단계 | 역할 |
|---|---|
| Backpropagation | **기울기(gradient)를 계산** |
| [Gradient Descent](./gradient-descent.md) | 그 기울기로 **가중치를 갱신** |

두 알고리즘이 쌍을 이뤄 모든 신경망 학습을 굴린다.

### 역사

- 1974 — Werbos 박사논문에 첫 아이디어
- **1986 — Rumelhart · Hinton · Williams, "Learning representations by back-propagating errors"** (Nature) — 대중화 분기점
- 1989~2011 — Vanishing gradient로 깊은 네트워크 학습 어려움
- 2012 — AlexNet + ReLU + GPU → 실전화
- 현재 — PyTorch/TensorFlow의 autograd가 자동 계산

### 자동 미분 (Autograd)

현대 딥러닝 프레임워크는 backprop을 수동 구현하지 않음. **자동 미분(automatic differentiation)** 라이브러리가 연산 그래프를 추적해 backprop을 자동 생성:

- PyTorch: `loss.backward()`
- TensorFlow: `tape.gradient(loss, weights)`
- JAX: `jax.grad(loss_fn)`

## Reference

- [Part 0 — Ch.11 딥러닝 — ANN에서 DNN까지](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#p0-ch11)

## 연관 entity

- [Gradient Descent](./gradient-descent.md) — 계산된 기울기로 가중치 갱신
- [Neural Network](./neural-network.md) — backprop이 학습시키는 대상
- [Deep Learning](./deep-learning.md)
- [Loss Function](./loss-function.md)

## 출처

- Rumelhart, Hinton, Williams (1986) "Learning representations by back-propagating errors", Nature
- Werbos (1974) 박사논문
- PyTorch / TensorFlow 공식 문서

## 업데이트 이력

- 2026-04-12 — 신규 생성. ML 기초 entity 간 broken link 해결.
