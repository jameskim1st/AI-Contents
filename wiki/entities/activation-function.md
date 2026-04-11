# Activation Function

**Category:** 개념 / 신경망 구성 요소
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

**인공 뉴런이 "발화(activate)"할지를 결정하는 비선형 함수**. `y = f(w·x + b)`에서 바로 그 **f**가 활성화함수다. **없다면 아무리 깊은 [신경망](./neural-network.md)도 그냥 선형 변환일 뿐** — 여러 층을 쌓아도 하나의 큰 행렬곱으로 줄어들어버리기 때문에 복잡한 패턴을 학습할 수 없다. 활성화함수가 **비선형성(non-linearity)을 주입**함으로써 깊이가 의미를 갖는다. 역사적으로 **Sigmoid → Tanh → ReLU**가 표준 흐름이며, [Transformer](./transformer.md) 시대에는 **GELU, SwiGLU**가 주류다.

## 설명

### 왜 비선형성이 필수인가

선형 함수끼리 아무리 합성해도 결과는 여전히 선형이다:
```
f(x) = W₂(W₁x + b₁) + b₂ = (W₂W₁)x + (W₂b₁ + b₂) = W'x + b'
```

즉 **활성화 없이** 100층을 쌓아도 1층짜리 선형 회귀와 수학적으로 동치다. 이것이 Minsky가 1969년에 "퍼셉트론은 XOR도 못 푼다"고 지적한 본질이었다. **비선형 활성화함수**를 중간에 끼워넣어야 신경망이 곡선, 계단, 불연속 경계 같은 복잡한 결정 경계를 학습할 수 있다.

### 대표 활성화함수들

**1. Sigmoid**
```
σ(x) = 1 / (1 + e^(-x))
```
- **그래프**: 가운데가 0.5, 양쪽 끝이 0/1로 수렴하는 부드러운 **S자 곡선**. 입력이 0이면 출력도 0.5. 큰 양수면 1에 가까워지고 큰 음수면 0에 가까워진다.
- **범위**: (0, 1) — 확률로 해석 가능.
- **장점**: 미분 가능, 부드러움.
- **단점**: **Vanishing Gradient** — |x|가 크면 기울기가 0에 가까워져 역전파 신호가 죽는다. 깊은 망에서 치명적.
- **용도**: 이진 분류 출력층, LSTM 게이트.

**2. Tanh (Hyperbolic Tangent)**
```
tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))
```
- **그래프**: Sigmoid와 같은 S자 모양이지만 **0을 중심으로 -1과 1 사이**. 원점 대칭.
- **범위**: (-1, 1) — 0 중심이라 Sigmoid보다 학습이 빠름.
- **단점**: 여전히 Vanishing gradient.
- **용도**: RNN, 초기 DNN 시절 은닉층.

**3. ReLU (Rectified Linear Unit) — 가장 흔함**
```
ReLU(x) = max(0, x)
```
- **그래프**: **음수는 전부 0, 양수는 그대로 통과**시키는 꺾인 직선. 원점에서 L자 모양으로 꺾임.
- **장점**:
  - 계산이 **매우 빠르다** (지수함수 없음).
  - 양수 영역에서 기울기가 항상 1이라 **Vanishing gradient 완화**.
  - AlexNet(2012) 이후 사실상 기본값.
- **단점**: **Dying ReLU** — 뉴런이 음수 영역에 갇히면 기울기가 0이라 영원히 업데이트 안 됨.
- **용도**: CNN, 일반 DNN 은닉층.

**4. Leaky ReLU**
```
LeakyReLU(x) = max(0.01x, x)
```
- **그래프**: ReLU와 거의 같지만 **음수 영역에서 기울기 0 대신 0.01** 같은 작은 양수 기울기. 왼쪽 절반이 살짝 기울어진 L자.
- **Dying ReLU 해결**. 파라미터로 기울기를 학습하면 **PReLU**.

**5. GELU (Gaussian Error Linear Unit)**
```
GELU(x) = x · Φ(x)    (Φ는 표준정규분포 CDF)
```
- **그래프**: **ReLU와 Sigmoid의 중간** 느낌. 음수 영역에서 완만히 0으로 내려가지만 **작은 음수 쪽에 살짝 "딥(dip)"**이 있다(음수 영역에서 아주 조금 더 내려갔다가 올라옴).
- **장점**: 부드러운 곡선이라 학습이 안정적.
- **용도**: [Transformer](./transformer.md) 계열 (BERT, GPT-2/3)에서 주류.

**6. Swish / SiLU**
```
Swish(x) = x · σ(x)
```
- **그래프**: GELU와 매우 유사. Google Brain이 자동 탐색으로 찾아냄.
- **용도**: EfficientNet, 일부 Transformer 변종.

**7. SwiGLU (Gated Linear Unit with Swish)**
```
SwiGLU(x) = (Swish(xW) ⊙ (xV))
```
- **그래프**: 그래프화 불가(두 입력 조합) — 게이팅 메커니즘.
- **용도**: **Llama, PaLM, GPT-4** 등 현대 대형 LLM의 FFN 내부 표준.

### 정리 표

| 함수 | 범위 | 미분 | Vanishing? | 계산 비용 | 주 용도 |
|---|---|---|---|---|---|
| Sigmoid | (0, 1) | σ(1-σ) | 심각 | 중 | 출력층(이진) |
| Tanh | (-1, 1) | 1-tanh² | 심각 | 중 | RNN |
| **ReLU** | [0, ∞) | 0 or 1 | 없음(양수) | **저** | **DNN/CNN 기본값** |
| Leaky ReLU | (-∞, ∞) | 0.01 or 1 | 없음 | 저 | Dying ReLU 회피 |
| **GELU** | (-∞, ∞) | 복잡 | 없음 | 중 | **Transformer** |
| Swish | (-∞, ∞) | 복잡 | 없음 | 중 | 현대 CNN |
| **SwiGLU** | — | — | 없음 | 중 | **LLM (Llama, GPT-4)** |

### 역사적 전환점

1. **Sigmoid 시대 (1986~2010)** — 부드럽고 미분 가능해 backprop에 적합해 보였다. 하지만 깊은 망에선 gradient가 죽었다.
2. **ReLU 혁명 (2011~2012)** — Glorot et al.과 Krizhevsky(AlexNet)가 ReLU로 깊은 CNN이 실제로 학습됨을 증명. 속도와 vanishing 문제를 한 번에 해결.
3. **GELU 시대 (2018~)** — BERT가 GELU를 채택하면서 Transformer의 표준이 됐다. 더 부드러운 곡선이 LayerNorm과 잘 맞았다.
4. **SwiGLU 시대 (2022~)** — Llama가 SwiGLU로 FFN을 재설계. 약간의 성능 이득이 거대 모델에서는 누적돼 큰 차이를 만들었다.

### 출력층은 다르다

은닉층과 달리 **출력층의 활성화함수**는 태스크에 따라 결정된다:

| 태스크 | 출력층 활성화 |
|---|---|
| 회귀 | **Linear** (없음) |
| 이진 분류 | **Sigmoid** |
| 다중 분류 | **Softmax** |
| 다중 라벨 | **Sigmoid** (각 클래스 독립) |

### 실무 선택 가이드 (2026)

- **일반 CNN/MLP**: ReLU로 시작. 문제 있으면 Leaky ReLU.
- **Transformer**: GELU (기본) 또는 SwiGLU (FFN).
- **RNN**: Tanh + Sigmoid 게이트 (LSTM/GRU).
- **출력층**: 태스크에 맞춰.

## Reference

- [Part 0 — Ch.03 신경망의 구조와 역사](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#activation-function)

## 연관 entity

- [Neural Network](./neural-network.md) — 활성화함수가 사용되는 맥락
- [Deep Learning](./deep-learning.md) — ReLU 혁명이 가능하게 한 분야
- [Transformer](./transformer.md) — GELU/SwiGLU 사용처

## 출처

- Glorot, Bordes, Bengio, "Deep Sparse Rectifier Neural Networks" (ReLU), AISTATS 2011.
- Hendrycks, Gimpel, "Gaussian Error Linear Units (GELUs)", 2016.
- Ramachandran, Zoph, Le, "Searching for Activation Functions" (Swish), 2017.
- Shazeer, "GLU Variants Improve Transformer" (SwiGLU), 2020.
- PwC AI 리터러시 Day1/Day2 교육자료.

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX (Day1/Day2) ingest.
