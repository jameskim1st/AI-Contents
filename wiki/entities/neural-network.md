# Neural Network

**Category:** 개념 / 모델 아키텍처
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

**인공신경망(Artificial Neural Network, ANN)은 뉴런(perceptron)이라는 단순한 수학적 단위를 층(layer)으로 쌓아 만든 함수 근사기**. 기본 구조는 **입력층 → 은닉층(여러 개) → 출력층**이며, 각 연결에는 **가중치(weight)**, 각 뉴런에는 **편향(bias)**과 **[활성화함수](./activation-function.md)**가 붙는다. 핵심 직관은 *"은닉층의 뉴런들이 입력 데이터의 새로운 표현(representation)을 자동으로 학습한다"*는 것 — 개 이미지를 줬을 때 1층은 경계선, 2층은 귀·눈 같은 파트, 3층은 얼굴 전체 등 점점 추상적인 특징을 배운다. 역사는 **1957 Rosenblatt Perceptron → 1969 Minsky "XOR 불가" → 1986 Backpropagation (Rumelhart, Hinton, Williams) → 2006 Deep Belief Net → 2012 AlexNet**으로 흐른다.

## 설명

### 기본 단위: 인공 뉴런 (Perceptron)

하나의 뉴런은 다음 식으로 표현된다:

```
y = f(w₁x₁ + w₂x₂ + ... + wₙxₙ + b)
  = f(w·x + b)
```

- **x**: 입력 벡터 (e.g., 이미지 픽셀, 단어 임베딩)
- **w**: 가중치 벡터 (학습 대상)
- **b**: 편향 (bias, 학습 대상)
- **f**: [활성화함수](./activation-function.md) (ReLU, Sigmoid, Tanh 등)
- **y**: 출력

이 한 줄이 "신호의 가중합을 비선형 변환"하는 가장 작은 지능 단위다. **수십억 개를 묶으면 GPT-4**가 된다.

### 층 구조 — 입력·은닉·출력

```
  입력층          은닉층 1         은닉층 2          출력층
  [x₁]─┐    ┌─[h₁]─┐        ┌─[h₁']─┐         
  [x₂]─┼─W₁→├─[h₂]─┼──W₂──→├─[h₂']─┼──W₃──→  [y₁]
  [x₃]─┘    └─[h₃]─┘        └─[h₃']─┘         [y₂]
                                                (softmax)
```

- **입력층(Input layer)**: 데이터가 그대로 들어간다. 차원 = feature 수.
- **은닉층(Hidden layer)**: 입력의 새로운 표현을 학습. "깊다"는 말은 이 층이 여러 개라는 뜻.
- **출력층(Output layer)**: 최종 예측. 분류라면 softmax, 회귀라면 linear.

각 층 사이의 **가중치 행렬 W**가 "학습되는 파라미터"다. 개 vs 고양이 분류기라면 1000만 개, GPT-4는 약 1조 8천억 개의 W가 있다.

### 학습의 핵심: Backpropagation

신경망 학습은 **"출력의 오차를 입력 방향으로 거꾸로 흘려보내 각 가중치의 기여도를 계산하고, 그 반대 방향으로 가중치를 조금씩 조정"**하는 과정이다.

1. **Forward pass** — 입력을 넣고 예측값 ŷ 계산.
2. **Loss 계산** — 정답 y와 예측 ŷ의 차이 (e.g., Cross-Entropy).
3. **Backward pass** — 체인룰로 각 가중치의 기울기 ∂L/∂w 계산.
4. **Update** — `w ← w - η·∂L/∂w` (η: 학습률).
5. 반복.

이 알고리즘을 **1986년 Rumelhart, Hinton, Williams**가 *Nature*에 발표하면서 첫 번째 신경망 겨울이 끝났다. (Werbos가 1974년 박사논문에서 이미 제안했지만 주목받지 못했다.)

### 표현 학습 (Representation Learning)

전통 ML은 사람이 feature를 설계해야 했다 — "얼굴 인식을 하려면 눈 사이 거리, 코 높이, 피부톤을..." 같은 수작업. 신경망의 진짜 혁명은 **feature 자체를 학습한다**는 점이다.

예: 고양이 vs 개 분류 CNN이 학습 후 살펴보면
- **1층 필터**: 가로선, 세로선, 대각선 감지기 (edge)
- **2층 필터**: 모서리, 원, 질감 감지기
- **3층 필터**: 귀 모양, 눈 모양, 코 모양
- **4층 필터**: 고양이 얼굴, 개 얼굴

이 계층적 표현은 인간이 설계하지 않았다 — 역전파가 데이터로부터 발견한 것이다. 이것이 딥러닝의 본질적 마법이며, LLM의 "문맥 이해"도 같은 원리의 확장이다.

### 역사 연대기

| 연도 | 사건 | 의의 |
|---|---|---|
| 1943 | McCulloch & Pitts "A Logical Calculus of the Ideas Immanent in Nervous Activity" | 최초의 수학적 뉴런 모델 |
| 1957 | **Rosenblatt Perceptron** | 최초의 학습 가능 신경망 |
| 1969 | Minsky & Papert *Perceptrons* — "XOR 불가" | **첫 번째 AI 겨울** 촉발 |
| 1980 | Fukushima Neocognitron | CNN의 원형 |
| 1986 | **Backpropagation** (Rumelhart, Hinton, Williams) | 깊은 학습의 문 열림 |
| 1989 | LeCun LeNet (손글씨 숫자) | CNN 실용화 |
| 1997 | LSTM (Hochreiter, Schmidhuber) | 장기 의존성 |
| 2006 | Hinton Deep Belief Network | "깊어도 학습 가능" 재증명 |
| **2012** | **AlexNet ImageNet 우승** | **딥러닝 대폭발** |
| 2014 | GAN (Goodfellow), VAE | 생성 모델 |
| 2015 | ResNet (152층), BatchNorm | 초심층 네트워크 |
| 2017 | [Transformer](./transformer.md) "Attention is All You Need" | NLP 혁명 |
| 2022 | ChatGPT 공개 | 대중화 |

### 왜 깊어야 하는가 — 계층적 추상화

이론상 2층짜리 신경망(Universal Approximation Theorem, 1989)도 어떤 연속 함수든 근사할 수 있다. 그런데 왜 100층을 쌓는가?

**답: 계층적으로 학습하면 훨씬 적은 파라미터로 같은 함수를 표현할 수 있기 때문**. 얕은 망은 지수적으로 많은 뉴런이 필요하지만, 깊은 망은 층마다 추상화 레벨을 올려가며 선형적으로 효율화된다.

### 신경망의 난점

- **Vanishing/Exploding Gradient** — 층이 깊어지면 역전파 기울기가 0이나 무한으로 간다. 해결: **ReLU**, **BatchNorm**, **Residual Connection (ResNet)**.
- **과적합(Overfitting)** — 학습 데이터는 외우지만 새 데이터엔 약함. 해결: **Dropout**, **Data Augmentation**, **Weight Decay**.
- **로컬 미니마** — 손실함수가 울퉁불퉁해서 최적점을 놓침. 실무에서는 큰 문제가 아님이 밝혀짐.
- **해석 불가능성** — 블랙박스.

## Reference

- [Part 0 — Ch.03 신경망의 구조와 역사](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#neural-network)

## 연관 entity

- [Deep Learning](./deep-learning.md) — 여러 층 신경망을 깊게 쌓은 학습 방법
- [Activation Function](./activation-function.md) — 각 뉴런의 비선형성
- [Machine Learning](./machine-learning.md) — 신경망의 상위 카테고리
- [Transformer](./transformer.md) — 현대 SOTA 신경망 아키텍처

## 출처

- Rosenblatt, "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain", 1958.
- Rumelhart, Hinton, Williams, "Learning representations by back-propagating errors", Nature, 1986.
- LeCun, Bengio, Hinton, "Deep Learning", Nature, 2015.
- Goodfellow, Bengio, Courville, *Deep Learning*, MIT Press, 2016 — Ch. 6.
- PwC AI 리터러시 Day1/Day2 교육자료.

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX (Day1/Day2) ingest.
