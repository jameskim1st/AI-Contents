# Machine Learning

**Category:** 개념 / 학습 패러다임
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

**데이터로부터 패턴을 학습하는 알고리즘의 총칭**. 전통 프로그래밍이 "규칙(Rules) + 데이터(Data) → 결과(Output)"라면, ML은 **"데이터 + 결과 → 규칙"**을 뒤집는 패러다임이다. Arthur Samuel(1959): *"명시적으로 프로그래밍하지 않아도 컴퓨터가 학습하는 능력을 연구하는 분야"*. **AI ⊃ ML ⊃ DL ⊃ Generative AI**의 포함 관계에서 ML은 AI의 하위 집합이자 DL/생성 AI의 상위 집합이다. 학습 방법은 크게 **지도학습(Supervised), 비지도학습(Unsupervised), 강화학습(Reinforcement)** 세 가지로 나뉘며, 최근에는 [Self-Supervised Learning](./self-supervised-learning.md)이 LLM Pre-training의 주력이 되면서 제4의 축으로 부상했다.

## 설명

### 전통 프로그래밍 vs 머신러닝

같은 문제("이메일이 스팸인가?")를 풀 때 두 접근법의 구조가 근본적으로 다르다.

| 접근 | 입력 | 출력 | 예시 |
|---|---|---|---|
| **전통 프로그래밍** | 규칙(Rules) + 데이터(Data) | 결과(Output) | `if "광고" in subject: return "spam"` — 개발자가 조건을 직접 짠다 |
| **머신러닝** | 데이터(Data) + 결과(Labels) | 규칙(Model) | 10만 개 스팸/햄 이메일을 주면 모델이 "스팸 판별 함수" 자체를 학습 |

전통 방식은 도메인 전문가의 규칙을 코드로 옮기는 **Explicit Rule Engineering**이다. 문제는 현실이 복잡하다는 것 — "광고"라는 단어 하나로 스팸을 잡을 수 없고, 규칙은 수백 수천 개로 늘어나며 서로 충돌한다. ML은 이 한계를 *데이터가 규칙을 대신 만들게 함*으로써 돌파한다.

### AI ⊃ ML ⊃ DL ⊃ Generative AI 피라미드

```
┌─────────────────────────────────────────┐
│            Artificial Intelligence       │  ← 1956 Dartmouth
│  ┌───────────────────────────────────┐  │
│  │        Machine Learning           │  │  ← 1959 Samuel
│  │  ┌─────────────────────────────┐  │  │
│  │  │      Deep Learning          │  │  │  ← 2012 AlexNet
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │   Generative AI       │  │  │  │  ← 2022 ChatGPT
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

- **AI**: "인간의 지능을 기계가 흉내내는 모든 시도" — 규칙 기반 전문가 시스템(MYCIN), 탐색(A*), 논리 추론도 포함.
- **ML**: AI의 한 방법론 — 데이터로 배운다.
- **DL**: ML의 한 방법론 — 여러 층의 [Neural Network](./neural-network.md)를 사용.
- **Generative AI**: DL 중 "새로운 데이터를 생성"하는 분야 — LLM, Diffusion, GAN.

### 3대 학습 방법

| 방법 | 데이터 조건 | 대표 태스크 | 상세 |
|---|---|---|---|
| [**지도학습**](./supervised-learning.md) | 입력 X + 정답 라벨 Y | 분류, 회귀 | 이메일 스팸 판별, 집값 예측 |
| [**비지도학습**](./unsupervised-learning.md) | 라벨 없음 | 클러스터링, 차원 축소 | 고객 세분화, 이상 탐지 |
| [**강화학습**](./reinforcement-learning.md) | 환경과의 상호작용, 보상 | 의사결정 | AlphaGo, 로봇 제어, RLHF |

추가로 **[자기지도학습](./self-supervised-learning.md)**은 "라벨 없는 데이터에서 스스로 가짜 라벨을 만드는" 방법으로, GPT의 "다음 토큰 예측"이 바로 이것이다.

### ML의 기본 루프

1. **데이터 수집** — 문제에 맞는 데이터를 모은다 (학습셋/검증셋/테스트셋으로 분리).
2. **특징(feature) 공학** — 입력을 모델이 이해할 수 있는 숫자 벡터로 변환.
3. **모델 선택** — 선형 회귀? 의사결정 트리? 신경망?
4. **학습(training)** — 손실 함수를 최소화하는 방향으로 파라미터를 조정 (보통 경사 하강법).
5. **평가(evaluation)** — 테스트셋에서 성능 측정, 과적합(overfitting) 확인.
6. **배포 & 모니터링** — 실제 환경에서 데이터 분포 변화(drift) 감시.

### 왜 지금 ML인가 — 3대 연료

2010년대 ML 폭발은 **3요소의 동시 도래** 덕분이다:
1. **데이터**: 인터넷·스마트폰으로 디지털 데이터가 지수 증가.
2. **연산**: GPU 발달로 행렬 연산이 1000배 빨라짐.
3. **알고리즘**: Backprop 재발견, CNN, Transformer 등.

이 세 축이 맞물려 2012년 ImageNet에서 [Deep Learning](./deep-learning.md)이 전통 ML을 압도하면서 AI의 새 시대가 열렸다.

### 실무에서의 ML

- **회귀**: 매출 예측, 집값 산정, 수요 예측.
- **분류**: 이미지 인식, 스팸 탐지, 신용 평가.
- **클러스터링**: 고객 세분화, 이상 거래 탐지.
- **추천**: Netflix, YouTube, 쿠팡.
- **생성**: ChatGPT, Midjourney, GitHub Copilot.

## Reference

- [Part 0 — Ch.01 머신러닝이란 무엇인가](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#machine-learning)

## 연관 entity

- [Deep Learning](./deep-learning.md) — ML의 하위 분야, 신경망 기반
- [Neural Network](./neural-network.md) — DL의 기본 구성 요소
- [Supervised Learning](./supervised-learning.md) — 정답 라벨로 학습하는 방법
- [Unsupervised Learning](./unsupervised-learning.md) — 라벨 없이 구조 발견
- [Reinforcement Learning](./reinforcement-learning.md) — 보상으로 학습
- [Self-Supervised Learning](./self-supervised-learning.md) — LLM Pre-training의 핵심

## 출처

- Arthur Samuel, "Some Studies in Machine Learning Using the Game of Checkers", IBM Journal, 1959.
- Tom Mitchell, *Machine Learning*, McGraw-Hill, 1997.
- Ian Goodfellow et al., *Deep Learning*, MIT Press, 2016.
- PwC AI 리터러시 Day1/Day2 교육자료.

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX (Day1/Day2) ingest.
