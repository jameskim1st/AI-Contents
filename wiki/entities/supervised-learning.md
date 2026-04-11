# Supervised Learning

**Category:** 학습 방법
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

**"정답(label)이 달린 데이터로 학습하는" [머신러닝](./machine-learning.md)의 가장 기본적이고 실무에서 가장 많이 쓰이는 방법**. 목적은 입력 X와 출력 Y 사이의 관계 함수 **y = f(x)**를 찾는 것이다. 두 가지 주요 태스크로 나뉜다: **회귀(Regression)** — 연속값 예측(집값, 매출), **분류(Classification)** — 범주값 예측(스팸/햄, 개/고양이). 강점은 **성능이 명확하고 평가가 쉽다**는 것, 약점은 **라벨링 비용**이다. 이미지 10만 장에 라벨을 다는 데 사람 수천 시간이 필요하다. 이 라벨 부족 문제를 풀려는 노력이 [비지도학습](./unsupervised-learning.md)과 [자기지도학습](./self-supervised-learning.md)을 낳았다.

## 설명

### 정의 — y = f(x)를 찾는 게임

지도학습은 `(x₁, y₁), (x₂, y₂), ..., (xₙ, yₙ)` 형태의 **라벨링된 데이터셋**을 받아서, 새로운 x가 들어왔을 때 올바른 y를 예측하는 함수 f를 찾는 것이다.

- **x**: 입력(features) — 이메일 본문, 이미지 픽셀, 환자 검사 수치
- **y**: 출력(label, target) — "스팸/햄", "개/고양이", "암/정상"
- **f**: 모델(파라미터 θ로 표현) — 학습을 통해 찾는다

학습은 **손실 함수(Loss)** L(y, f(x; θ))을 최소화하는 θ를 찾는 최적화 문제로 환원된다.

### 두 가지 태스크

**1. 회귀 (Regression) — 연속값 예측**
- **예시**: 집값, 기온, 내일 주가, 환자 입원 기간
- **출력**: 실수 (e.g., 1234만 원)
- **대표 모델**: 선형 회귀, 릿지/라쏘 회귀, Random Forest Regressor, XGBoost, 신경망
- **손실**: MSE(Mean Squared Error), MAE(Mean Absolute Error)
- **평가**: R², RMSE, MAE

**2. 분류 (Classification) — 범주값 예측**
- **예시**: 이메일 스팸 판별, 이미지 인식, 질병 진단
- **출력**: 카테고리 (e.g., "고양이")
- **이진 vs 다중**: 스팸/햄 = 이진, 10개 품종 개 분류 = 다중
- **대표 모델**: 로지스틱 회귀, SVM, 의사결정 트리, Random Forest, [KNN](./knn.md), 신경망
- **손실**: Cross-Entropy
- **평가**: Accuracy, Precision, Recall, F1-Score, AUC-ROC

### 구체 사례

| 도메인 | 입력 X | 출력 Y | 태스크 |
|---|---|---|---|
| 이메일 | 본문 + 제목 + 발신자 | 스팸/햄 | 이진 분류 |
| 부동산 | 평수, 위치, 건축연도, 층수 | 가격(원) | 회귀 |
| 의료 | X-ray 이미지 | 암 유/무 | 이진 분류 |
| 커머스 | 상품 설명, 가격, 카테고리 | 판매량 | 회귀 |
| 자율주행 | 카메라 프레임 | 차량/보행자/신호등 위치 | 객체 탐지(분류+회귀) |
| 금융 | 거래 패턴 | 사기 여부 | 이진 분류 |

### 대표 알고리즘 계보

**전통 ML (비신경망)**
- [선형 회귀](./linear-regression.md) — 가장 단순, 해석 가능성 최고
- 로지스틱 회귀 — 선형 회귀의 분류 버전
- 의사결정 트리 / Random Forest
- [KNN](./knn.md) — 거리 기반, 학습 없이 "이웃 투표"
- SVM (Support Vector Machine) — 마진 최대화
- **XGBoost / LightGBM** — 정형 데이터 최강자, Kaggle 왕
- Naive Bayes — 스팸 필터의 고전

**딥러닝 기반**
- CNN — 이미지 분류
- RNN/LSTM — 텍스트 분류
- [Transformer](./transformer.md) — 현대 NLP 분류

### 학습의 수학적 뼈대

1. **가설 공간 정의** — 어떤 형태의 함수 f를 쓸지 선택 (선형? 트리? 신경망?).
2. **손실 함수 정의** — 오차를 어떻게 측정할지.
3. **최적화** — [경사 하강법](./gradient-descent.md) 등으로 θ를 업데이트.
4. **일반화 검증** — 학습 데이터가 아닌 검증셋(validation set)에서 성능 확인.

### 데이터 분할 — Train / Validation / Test

절대 섞으면 안 되는 3종 데이터:
- **Train (60-70%)**: 모델 파라미터 학습.
- **Validation (15-20%)**: 하이퍼파라미터 튜닝, early stopping.
- **Test (15-20%)**: 최종 성능 보고. **한 번만** 사용.

Validation을 과도하게 튜닝하면 validation에 과적합된다. 진짜 일반화 성능은 test에서만 신뢰할 수 있다.

### [Overfitting](./overfitting.md) — 가장 큰 적

학습 데이터는 외우지만 새 데이터에선 약한 현상. 징후: train 정확도는 99%, test 정확도는 70%.

**원인**: 모델이 너무 복잡, 데이터가 너무 적음, 학습을 너무 오래.
**해결**: 더 많은 데이터, Regularization (L1/L2), Dropout, Early stopping, Data augmentation, 모델 크기 줄이기.

### 지도학습의 치명적 한계: 라벨링 비용

**라벨 하나에 원화 100원~10,000원**.
- ImageNet (1400만 이미지 × 수작업) — 수십억 원 프로젝트.
- 의료 영상: 전문의가 암 경계를 그려야 함 → 장당 수만 원.
- 자율주행: 프레임마다 박스 수십 개 → 업계 전체가 annotation 외주 산업.

이 비용이 **라벨 없이 쓸 수 있는 [비지도학습](./unsupervised-learning.md)**과 **데이터 자체에서 라벨을 만드는 [자기지도학습](./self-supervised-learning.md)**의 발전 동기가 됐다. 2020년 이후 LLM들은 **인터넷 전체의 라벨 없는 텍스트**를 self-supervised 방식으로 학습한 뒤, 마지막에 **소량의 지도학습(SFT)**으로 마무리하는 레시피를 쓴다.

### 실무 팁

1. **단순한 모델부터** — 선형 회귀/로지스틱 회귀가 놀랄 만큼 강력하다.
2. **Feature engineering이 승부** — 정형 데이터는 특히.
3. **Baseline을 반드시 만들어라** — 항상 "가장 많은 클래스 예측"을 넘어야 의미 있음.
4. **Class imbalance 경계** — 사기 탐지처럼 1:1000 비율이면 정확도가 무의미.
5. **Confusion matrix를 항상 봐라** — Accuracy 한 숫자는 거짓말한다.

## Reference

- [Part 0 — Ch.04 지도학습: 정답을 주고 가르치기](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#supervised-learning)

## 연관 entity

- [Machine Learning](./machine-learning.md) — 상위 카테고리
- [Unsupervised Learning](./unsupervised-learning.md) — 대조되는 학습 방법
- [Reinforcement Learning](./reinforcement-learning.md) — 또 다른 학습 패러다임
- [Self-Supervised Learning](./self-supervised-learning.md) — 라벨 부족 문제의 돌파구
- [Loss Function](./loss-function.md) — 지도학습의 최적화 대상
- [Gradient Descent](./gradient-descent.md) — 최적화 기본 알고리즘
- [Overfitting](./overfitting.md) — 가장 큰 실무 적
- [Linear Regression](./linear-regression.md) — 대표 회귀 알고리즘
- [KNN](./knn.md) — 대표 분류 알고리즘

## 출처

- Tom Mitchell, *Machine Learning*, McGraw-Hill, 1997.
- Hastie, Tibshirani, Friedman, *The Elements of Statistical Learning*, Springer, 2009.
- Bishop, *Pattern Recognition and Machine Learning*, Springer, 2006.
- Géron, *Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow*, O'Reilly, 2022.
- PwC AI 리터러시 Day1/Day2 교육자료.

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX (Day1/Day2) ingest.
