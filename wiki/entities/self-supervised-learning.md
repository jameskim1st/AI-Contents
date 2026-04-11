# Self-Supervised Learning

**Category:** 학습 방법
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

**"라벨이 없는 데이터 자체에서 가짜 라벨(pretext task)을 만들어 [지도학습](./supervised-learning.md)처럼 훈련하는" 방법**. 형식은 지도학습이지만 사람의 라벨링이 필요 없다는 점에서 [비지도학습](./unsupervised-learning.md)의 하위 분야로 분류된다. 두 큰 계열: **(1) Self-Prediction** — 데이터의 일부를 가리고 나머지로 맞추기(GPT의 다음 토큰 예측, BERT의 마스크 채우기), **(2) Contrastive Learning** — 같은 것은 가깝게, 다른 것은 멀게(SimCLR, CLIP). **LLM Pre-training의 핵심 메커니즘**이며, "다음 토큰 예측"이라는 단순한 self-supervised 목표가 GPT-4, Claude, Gemini의 모든 능력의 출발점이다. 2026년 현대 LLM 레시피는 **"학습방법의 연합군"** — Self-Sup(Pre-train) + Supervised(SFT) + RL(RLHF/DPO)의 3단 콤보로 완성된다. Yann LeCun은 이를 **"지능 케이크의 스폰지"**에 비유하며 AI의 미래라고 주장해왔다.

## 설명

### 정의 — "라벨을 데이터가 스스로 만든다"

지도학습은 `(x, y)`가 필요하지만 사람이 y를 달아줘야 했다. 비지도학습은 y 없이 패턴만 찾지만 성능이 약했다. Self-Supervised Learning(SSL)은 제3의 길을 낸다:

> **"원본 데이터 x에서 일부를 가리거나 변형해서, 그것을 복원하는 것 자체를 학습 목표로 삼자."**

라벨은 데이터 자체에 있다. 사람의 수작업이 없다.

### 두 큰 계열

**(1) Self-Prediction (또는 Masked/Auto-regressive Modeling)**

데이터의 일부를 숨기고, 나머지로 그 부분을 맞춘다. 이 pretext task를 풀면서 모델이 깊은 표현을 학습한다.

- **Autoregressive (GPT 계열)** — "다음 토큰 예측"
  - 입력: `"나는 오늘 아침에"`
  - 라벨: `"커피를"` (다음 단어)
  - 학습 데이터: **인터넷 전체의 텍스트**. 모든 문장이 자동으로 수조 개 (x, y) 쌍이 된다.
  
- **Masked (BERT 계열)** — "마스크 채우기"
  - 입력: `"나는 오늘 [MASK]에 커피를 마셨다"`
  - 라벨: `"아침"`
  - 양방향 문맥을 본다는 점이 GPT와 다름.

- **이미지 계열** — MAE (Masked Autoencoder), BEiT. 이미지 패치 일부를 가리고 복원.
- **음성 계열** — wav2vec 2.0, HuBERT.

**(2) Contrastive Learning**

"같은 것끼리는 가깝게, 다른 것끼리는 멀게"라는 표현 공간의 기하학을 직접 학습한다.

- **SimCLR** (Google, 2020) — 이미지에 두 가지 augmentation을 적용한 두 버전은 가까워야 하고, 다른 이미지와는 멀어야 한다.
- **MoCo** (Facebook) — Memory bank로 음성 샘플 확장.
- **CLIP** (OpenAI, 2021) — 이미지와 그 캡션 텍스트를 같은 임베딩 공간에서 가깝게. 4억 쌍의 (이미지, 텍스트) 학습. 이것이 DALL·E, Stable Diffusion의 기반이 됨.
- **BYOL, SwAV** — Negative pair 없이도 학습 가능한 변종들.

### 왜 이게 혁명적인가 — LLM의 탄생

**"다음 토큰 예측"**이라는 단순하기 짝이 없는 목표로 인터넷 15조 토큰을 학습시키면, 놀랍게도 다음이 **같이** 학습된다:
- 문법
- 어휘·의미
- 상식
- 수학
- 코딩
- 번역
- 추론
- 세계 지식

왜? "2 + 3 = ___"의 빈칸을 맞추려면 덧셈을 알아야 하고, "파리는 ___의 수도다"의 빈칸을 맞추려면 프랑스를 알아야 하며, "Python에서 for loop는 `for x in ___`"의 빈칸을 맞추려면 파이썬 문법을 알아야 한다. **인류 지식의 암묵적 라벨이 텍스트 속에 녹아 있다**는 게 SSL의 핵심 통찰이다.

이것을 규모의 힘으로 극한까지 밀어붙인 게 GPT-3(2020)이고, 이후 LLM 전부가 이 레시피를 따른다. [Pre-training Data](./pre-training-data.md) entity에서 다룬 대로 2026년 최신 모델은 20조 토큰 이상으로 학습되고 있다.

### "학습방법의 연합군" — 현대 LLM 레시피

하나의 방법만 쓰는 모델은 없다. 2026년 표준 레시피:

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  [Stage 1] Pre-training (Self-Supervised)                   │
│    ─ 인터넷 15~20T 토큰, 다음 토큰 예측                      │
│    ─ 수개월, 수천억 원, 수만 GPU                             │
│    ─ 결과: 기초 모델 (base model)                            │
│                                                              │
│  [Stage 2] SFT (Supervised Fine-Tuning)                     │
│    ─ 5k~50k 고품질 (지시, 답) 쌍                            │
│    ─ "말귀 알아듣기" 학습                                    │
│    ─ 결과: Instruct 모델                                     │
│                                                              │
│  [Stage 3] RLHF / DPO (Reinforcement Learning)              │
│    ─ Preference 데이터 (A vs B 중 어느 게 더 좋은가)        │
│    ─ 안전·스타일·일관성 강화                                 │
│    ─ 결과: Chat 모델 (ChatGPT, Claude)                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

이 3단 구성은 각각 [self-supervised](./self-supervised-learning.md) → [supervised](./supervised-learning.md) → [reinforcement](./reinforcement-learning.md) learning이다. **ML의 3대 패러다임이 하나의 모델 파이프라인 안에 다 들어 있다**는 점이 현대 AI의 아름다움이자 복잡성이다.

### 대표 사례

| 모델 | SSL 방식 | 출시 | 특이점 |
|---|---|---|---|
| **word2vec** (2013) | CBOW / Skip-gram | 2013 | 원조. 단어 임베딩 혁명 |
| **ELMo** (2018) | Bi-LSTM 언어 모델 | 2018 | 문맥 임베딩 |
| **BERT** (2018) | Masked LM | 2018 | NLP 판도 변화 |
| **GPT-2/3/4** | Autoregressive LM | 2019~ | 범용 LLM |
| **CLIP** (2021) | 이미지-텍스트 contrastive | 2021 | 멀티모달 기반 |
| **MAE** (2021) | Masked image | 2021 | 비전 SSL |
| **wav2vec 2.0** | Masked audio | 2020 | 음성 SSL |
| **DINOv2** (2023) | Self-distillation | 2023 | 비전 기초 모델 |

### Yann LeCun의 "케이크 비유"

LeCun(2016, NeurIPS)의 유명한 비유:
> *"만약 지능이 케이크라면, 비지도학습(=self-supervised)이 스폰지이고, 지도학습이 케이크 위의 아이싱이고, 강화학습이 체리 하나다."*

사람이 살면서 배우는 정보 중 99%는 라벨 없이 세상을 관찰하면서 얻는다. 갓난아기는 누가 라벨을 붙여주지 않아도 "물체는 중력에 끌린다"를 학습한다. 이 직관을 AI에 이식하는 것이 self-supervised learning의 궁극적 목표다. LeCun은 이 철학을 일관되게 밀어붙여 **JEPA (Joint-Embedding Predictive Architecture)** 같은 세대 아키텍처를 제안하고 있다.

### 장점과 한계

**장점**
- **라벨링 비용 제로** — 데이터만 모으면 됨.
- **대규모 학습 가능** — 수조 토큰 스케일이 실현됨.
- **범용성** — 한 번 학습해서 수많은 downstream task에 fine-tuning.
- **emergent abilities** — 큰 모델에서 예기치 못한 능력이 튀어나옴.

**한계**
- **연산 비용 폭발** — 대신 GPU 비용이 수천억 원.
- **데이터 품질·편향 문제** — 인터넷의 독성을 그대로 학습.
- **환각** — "다음 토큰 예측" 목표 자체가 진실성을 보장하지 않음.
- **저작권·프라이버시** — [Pre-training Data](./pre-training-data.md)의 소송 폭풍.

### 왜 "다음 토큰 예측"만으로 추론까지 되는가

이 질문은 2023~2026년 AI 연구의 핵심 논쟁이다. 주요 가설:
1. **Compression ≈ Intelligence** (Ilya Sutskever) — 다음 토큰 예측을 잘하려면 세상을 압축해서 이해해야 한다.
2. **World Model Hypothesis** — 모델이 암묵적으로 세계 모델을 구축한다.
3. **Surface Statistics** (회의론) — 그냥 통계적 앵무새다. 진짜 이해는 없다.

2025~2026년의 reasoning 모델(o1, o3, Claude Sonnet 4.5 thinking, DeepSeek-R1)이 수학·코딩에서 보인 성과는 이 논쟁의 새 장을 열었다.

## Reference

- [Part 0 — Ch.07 자기지도학습과 LLM Pre-training](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#self-supervised-learning)

## 연관 entity

- [Machine Learning](./machine-learning.md) — 상위 카테고리
- [Supervised Learning](./supervised-learning.md) — SFT 단계에서 결합
- [Reinforcement Learning](./reinforcement-learning.md) — RLHF 단계에서 결합
- [Unsupervised Learning](./unsupervised-learning.md) — 상위 분류
- [Pre-training Data](./pre-training-data.md) — SSL이 적용되는 데이터
- [Fine-tuning Data](./fine-tuning-data.md) — SSL 이후 SFT/RLHF 단계
- [Transformer](./transformer.md) — SSL이 돌아가는 기본 아키텍처

## 출처

- Devlin et al., "BERT: Pre-training of Deep Bidirectional Transformers", 2018.
- Brown et al., "Language Models are Few-Shot Learners" (GPT-3), 2020.
- Chen et al., "A Simple Framework for Contrastive Learning" (SimCLR), 2020.
- Radford et al., "Learning Transferable Visual Models From Natural Language Supervision" (CLIP), OpenAI, 2021.
- He et al., "Masked Autoencoders Are Scalable Vision Learners" (MAE), 2021.
- LeCun, "A Path Towards Autonomous Machine Intelligence" (JEPA), 2022.
- PwC AI 리터러시 Day1/Day2 교육자료.

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX (Day1/Day2) ingest.
