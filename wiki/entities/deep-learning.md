# Deep Learning

**Category:** 개념 / 학습 패러다임
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

**인공 신경망(Artificial Neural Network)을 기반으로 "여러 층(layer)의 뉴런을 깊게 쌓아" 복잡한 패턴을 학습하는 [Machine Learning](./machine-learning.md)의 한 분야**. 인간 뇌의 신경망에서 영감을 받았지만, 실제 구현은 거대한 행렬 곱셈의 연쇄다. **2012년 ImageNet 대회에서 AlexNet**이 전통 ML을 10%p 이상 격차로 압도하면서 딥러닝 시대가 시작됐고, 그 중심에는 **GPU**(NVIDIA CUDA)가 있었다. 진화 흐름은 **DNN(Fully-Connected) → CNN(이미지) → RNN/LSTM(순차) → [Transformer](./transformer.md)(2017~)** 로 요약되며, Transformer 이후 모든 SOTA(State-of-the-Art)는 사실상 Transformer 변종이다.

## 설명

### "Deep"이 뜻하는 것

단일 레이어 [Neural Network](./neural-network.md)(Perceptron, 1958)는 XOR조차 풀지 못했다. 은닉층을 **여러 개 쌓으면**(=깊게) 복잡한 비선형 함수도 근사할 수 있다는 것이 **Universal Approximation Theorem**(1989)의 메시지였지만, 실제로 깊은 네트워크를 학습시키는 것은 20년간 불가능해 보였다. 문제는:
- **Vanishing Gradient** — 역전파 시 기울기가 층을 거칠수록 0으로 소멸.
- **데이터 부족** — 수만 개 이미지로는 수백만 파라미터를 못 채움.
- **연산력 부족** — CPU로는 한 에폭에 며칠.

### 분기점: 2012 ImageNet / AlexNet

2012년 ILSVRC(ImageNet Large Scale Visual Recognition Challenge)에서 **Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton**이 발표한 **AlexNet**이 top-5 에러율을 **26.2% → 15.3%**로 끌어내렸다. 핵심 혁신:
- **ReLU 활성화함수** — Vanishing gradient 완화 (Sigmoid/Tanh 대체).
- **Dropout** — 과적합 방지.
- **Data Augmentation** — 데이터 증강으로 부족분 보완.
- **GPU 2장 병렬학습** — NVIDIA GTX 580, 5~6일 학습.

이 순간 이후 비전 논문은 전부 DL로 바뀌었다. 2015 **ResNet**(152층)이 top-5 에러 3.57%에 도달하며 인간(~5%)을 넘었다.

### GPU의 역할

딥러닝은 수많은 **행렬 곱셈**(Matrix Multiplication)의 연쇄다. CPU는 복잡한 직렬 연산에 최적화되어 있고, GPU는 단순한 병렬 연산(원래는 그래픽 픽셀 셰이딩용)에 최적화되어 있다. 이 특성이 neural network의 "같은 연산을 수백만 번" 구조와 완벽히 맞아떨어졌다. 2007년 NVIDIA가 **CUDA**를 공개하면서 연구자들이 GPU를 범용 연산에 쓰기 시작했고, 이것이 DL 폭발의 기폭제가 됐다.

2026년 기준 DL 학습 하드웨어:
- NVIDIA **H100 / H200 / B200 (Blackwell)** — 데이터센터 표준
- **TPU v5p** (Google) — Gemini 학습
- **Trainium2** (AWS) — 비용 우위

### 진화 흐름 — DNN → CNN → RNN → Transformer

| 시대 | 아키텍처 | 대표 작업 | 한계 |
|---|---|---|---|
| **1986~** | DNN (MLP) | 숫자 인식 (MNIST) | 이미지 구조 무시 |
| **1998, 2012** | **CNN** (LeNet, AlexNet) | 이미지 인식, 객체 탐지 | 시퀀스 처리 약함 |
| **1997~2014** | RNN / **LSTM** / GRU | 번역, 음성, 시계열 | 긴 의존성 망각, 병렬화 불가 |
| **2017~** | **[Transformer](./transformer.md)** | NLP, 이미지(ViT), 음성, 멀티모달 | 연산량 O(n²) |
| **2022~** | LLM (GPT, Claude, Gemini) | 범용 | 환각, 비용 |
| **2024~** | [MoE](./moe.md), Mamba, Diffusion-LM | 효율화 | — |

**CNN** (Convolutional Neural Network)은 이미지의 "국소 패턴"을 학습하는 필터(커널)를 공유해 파라미터 수를 크게 줄였다. **RNN/LSTM**은 순차 데이터를 처리하지만 긴 문장에서 앞 정보를 잊었다. **Transformer**는 [Self-Attention](./self-attention.md)으로 "모든 단어가 모든 단어를 본다"를 구현해 두 문제를 동시에 해결했다.

### 왜 "뇌에서 영감을 받았다"를 주의해서 말해야 하는가

딥러닝의 기본 단위는 "뉴런"이라 불리지만, 실제 생물학적 뉴런과는 매우 다르다:
- 생물 뉴런: 이온 채널, 스파이크, 화학적 신호, 시냅스 가소성.
- 인공 뉴런: `y = activation(W·x + b)` — 단순한 가중합.

"뇌에서 영감"은 역사적 동기일 뿐, 오늘날의 딥러닝은 생물학보다 **최적화 이론과 선형대수학**에 훨씬 가깝다. Hinton 본인도 "뇌에서 배울 것은 많지만 모방할 필요는 없다"고 말한다.

### 딥러닝의 재료

1. **Architecture** — 어떤 층을 어떻게 쌓을지 (CNN, Transformer, etc.).
2. **[Activation Function](./activation-function.md)** — 비선형성 주입 (ReLU, GELU).
3. **Loss Function** — 목표 함수 (Cross-Entropy, MSE).
4. **Optimizer** — 파라미터 업데이트 규칙 (SGD, Adam, AdamW).
5. **Regularization** — 과적합 방지 (Dropout, Weight Decay).
6. **Normalization** — 학습 안정화 (BatchNorm, LayerNorm).

### 한계와 현재 고민

- **데이터 탐욕** — 수백만~수조 샘플 필요. [Self-Supervised Learning](./self-supervised-learning.md)이 대안.
- **해석 불가능성** — 왜 그렇게 예측했는지 설명 어려움 (블랙박스).
- **환경 비용** — GPT-4 학습에 수천억 원대 전력·GPU.
- **편향 증폭** — 학습 데이터의 편향을 그대로 학습.
- **환각(Hallucination)** — LLM 특유 문제.

## Reference

- [Part 0 — Ch.02 딥러닝의 부상](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#deep-learning)

## 연관 entity

- [Machine Learning](./machine-learning.md) — 딥러닝의 상위 분야
- [Neural Network](./neural-network.md) — 딥러닝의 기본 구성 단위
- [Activation Function](./activation-function.md) — 비선형성 주입
- [Transformer](./transformer.md) — 현대 DL의 표준 아키텍처
- [Self-Supervised Learning](./self-supervised-learning.md) — 대규모 DL 학습의 주력 방법

## 출처

- Krizhevsky, Sutskever, Hinton, "ImageNet Classification with Deep Convolutional Neural Networks" (AlexNet), NeurIPS 2012.
- He et al., "Deep Residual Learning for Image Recognition" (ResNet), CVPR 2016.
- LeCun, Bengio, Hinton, "Deep Learning", Nature, 2015.
- Goodfellow, Bengio, Courville, *Deep Learning*, MIT Press, 2016.
- PwC AI 리터러시 Day1/Day2 교육자료.

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX (Day1/Day2) ingest.
