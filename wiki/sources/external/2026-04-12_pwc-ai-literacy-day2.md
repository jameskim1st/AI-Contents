---
title: "[공통 모듈_AI 리터러시] Day2 — 머신러닝·딥러닝 본격 이론"
author: PwC Korea
date_original: 2025-04-04
date_ingested: 2026-04-12
source_type: pptx
url_or_path: c:/Users/user/OneDrive/Documents/PwC/AI 교육/[공통 모듈_AI 리터러시] Day2_250404_v1.0.pptx
used_for: Part 0 Ch.06-11
---

# PwC AI 리터러시 Day 2 (36 slides)

## Context

PwC Korea의 공통 모듈 2차시. Day 1에서 "AI가 무엇인가"를 다뤘다면 Day 2는 "어떻게 작동하는가" — 머신러닝 본격 이론과 딥러닝 기초. 본 사이트의 **Part 0 Ch.06~11** 작성의 주 source.

> ⚠️ **Strictly Private and Confidential** — 추상 개념·구조만 추출.

## Key Points

### Feature와 Label (Slide 4)
- **Feature (x)**: 입력 변수
- **Label (y)**: 출력/정답
- Label 형태 두 가지: ① 수치형 (회귀) ② 범주형 (분류)

### Labeled vs Unlabeled (Slide 5)
- 데이터에 정답이 달려 있느냐 없느냐의 차이
- 지도학습은 Labeled 필수, 비지도는 Unlabeled

### 머신러닝 3가지 학습 방법 (Slide 6) ⭐
- **지도학습 (Supervised)** — 문제와 정답을 모두 알려주고 학습. 실무 최다 활용. 라벨링 비용 많음.
- **비지도학습 (Unsupervised)** — 정답 없이 학습. 분류 결과를 의미 있는 값으로 변환하는 작업 필요.
- **강화학습 (Reinforcement)** — 보상을 통해 상은 최대화, 벌은 최소화하는 방향으로 행위 강화.

### 지도학습 수학적 정의 (Slide 7)
- "입력변수 X와 출력변수 Y 간의 관계를 나타내는 알고리즘 f를 학습하는 것"

### Population vs Sample (Slide 8) ⭐
- 전체 데이터(Population)를 알 때 → 완벽한 f 가능
- 전체 데이터를 모를 때 → **학습 데이터(Sample)로 근사** → 오차 발생 → **손실함수** 등장

### 손실함수와 경사하강법 (Slide 9) ⭐
- `Error = 실제 출력값 - 모델의 출력값`
- **손실함수의 값을 최소화** 하기 위해 **경사하강법(Gradient Descent)** 사용
- 비유: "산에서 조금씩 내려가듯이 학습을 통해 점차적으로 Error를 최소화하는 함수를 찾아가야 함"

### 회귀 vs 분류 (Slide 10)
- 숫자값 출력 → 회귀 (Regression)
- 범주값 출력 → 분류 (Classification)
- 예측된 출력 → 손실함수 → update 루프

### 선형회귀 (Slides 12-13) ⭐
- 예시: 연봉 vs 만족도
- 손실함수 = 각 점과 선 사이 거리의 **제곱의 합**
- 학습을 통해 손실함수가 최소가 되는 회귀선 도출
- **Overfitting 문제**: 학습 데이터에 지나치게 적합 → 일반화 실패
- 로그함수를 씌운 회귀선이 선형회귀보다 더 적합할 수 있음

### Overfitting 방지 — 데이터 분할 (Slides 14-15) ⭐
- **Train / Validation / Test Data Set**으로 분할
- 고성능 모형 선택을 위한 모형 학습 & 성능 평가의 반복
- 손실(Loss) 곡선:
  - 모델 복잡도 ↑ → 학습 Loss ↓
  - 검증 Loss는 어느 지점에서 다시 ↑ (과적합 시작)
  - 이 **꺾이는 지점**이 적절 복잡도

### KNN (K-Nearest Neighborhood) (Slide 16)
- 회귀·분류 모두 가능한 가장 단순한 알고리즘

### 비지도학습 K-Means Clustering (Slides 17-20) ⭐
- Step 1: K 개수 지정 (예: 2개)
- Step 2: K 중심과 연결된 원들 간 거리 계산
- Step 3: 각 점을 가장 가까운 중심에 할당
- Step 4: 중심 재계산 → 반복
- **Elbow 지점**: K 개수 vs 거리합 그래프에서 꺾이는 지점이 적정 K

### 지도·비지도의 대안 — 자기지도학습/반지도학습 (Slides 21-22)
- **반지도학습 (Semi-Supervised)**: Label 있는 소량 + Label 없는 대량 → 반복 학습
- **자기지도학습 (Self-Supervised)**: 라벨 일일이 달 수 없는 방대한 데이터(이미지, 웹 텍스트)에서 잠재 특징 학습

### 자기지도학습 — Self-Prediction vs Contrastive (Slides 23-28) ⭐
- **Self-Prediction ("Intra-sample" 예측)**:
  - 하나의 데이터 샘플 내에서 특정 문맥으로 다른 문맥 예측
  - 예: "머리부터 발끝까지 다 사랑스러워"에서 앞 문맥으로 다음 단어 예측
  - **→ GPT의 학습 방식**
  - 주위 문맥 기반 중간 단어 예측 → **BERT의 학습 방식**
- **Contrastive Learning ("Inter-sample" 예측)**:
  - 배치 내 샘플들 사이 관계 예측
  - 유사한 건 가깝게, 상이한 건 멀게
  - → SimCLR, CLIP

### ⭐ 학습방법의 연합군 (Slide 32) — 가장 중요
- Low-quality 데이터 (Label X) → **자기지도학습** → Pre-trained 모델
- High-quality 데이터 (Label O) → **지도학습** → Fine-tuned 모델
- Low-quality + 사람 Feedback → **강화학습** → Reward 모델
- 이 **3단 조합이 곧 LLM의 정체** (GPT, ChatGPT의 학습 파이프라인)

### 강화학습 (Slides 29-31)
- 에이전트 · 환경 · 액션 At · 상태 St · 보상 Rt
- St → At → Rt → St+1 → At+1 순환

### 딥러닝 (Slides 33-35)
- **인공 신경망(ANN)** 기반 머신러닝 분야
- 여러 층의 인공신경망을 쌓은 **DNN (Deep Neural Network)**
- 뉴런에는 **활성화함수(activation function)**가 있어 입력 정보 조합이 임곗값 넘으면 "발화"
- 예시: 입력 4개(학점·학년·전공·인턴 횟수) → 은닉층 → 면접 대상 여부(Yes/No)
- 은닉층의 뉴런이 입력 데이터의 "**새롭고 다른 표현**"을 학습하는 것이 핵심 아이디어

## Entities created/updated

- [machine-learning](../../entities/machine-learning.md)
- [supervised-learning](../../entities/supervised-learning.md)
- [unsupervised-learning](../../entities/unsupervised-learning.md)
- [reinforcement-learning](../../entities/reinforcement-learning.md)
- [self-supervised-learning](../../entities/self-supervised-learning.md)
- [loss-function](../../entities/loss-function.md)
- [gradient-descent](../../entities/gradient-descent.md)
- [backpropagation](../../entities/backpropagation.md)
- [overfitting](../../entities/overfitting.md)
- [linear-regression](../../entities/linear-regression.md)
- [knn](../../entities/knn.md)
- [k-means-clustering](../../entities/k-means-clustering.md)
- [neural-network](../../entities/neural-network.md)
- [activation-function](../../entities/activation-function.md)
- [deep-learning](../../entities/deep-learning.md)

## Chapters created/updated

- Part 0 Ch.06 — 머신러닝 3대 학습법
- Part 0 Ch.07 — 손실함수·경사하강법
- Part 0 Ch.08 — 회귀·분류·Overfitting
- Part 0 Ch.09 — 비지도학습: K-Means
- Part 0 Ch.10 — 학습방법의 연합군 (Self-Sup + SFT + RLHF)
- Part 0 Ch.11 — 딥러닝 (ANN→DNN)
