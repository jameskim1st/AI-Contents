# Test-time Compute

**Category:** 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

학습(training)이 아닌 **추론(inference) 시점에 더 많은 연산을 투입**하여 모델의 답변 품질을 높이는 패러다임. 핵심 아이디어는 "더 오래 생각하기" — thinking 과정에서 더 많은 토큰을 생성하고, 여러 경로를 탐색하며, 중간 결과를 검증하는 것이다. OpenAI는 "test-time compute도 train-time scaling과 유사한 power law를 따른다"고 발표했다. 2024년 후반부터 [reasoning models](./reasoning-models.md)의 이론적 기반이 되었다.

## 설명

### Train-time vs Test-time Compute

**Train-time compute**는 모델을 학습시킬 때 투입하는 연산이다:

```
Train-time Compute = Model Parameters x Training Data x FLOPs
```

Chinchilla 논문(Hoffmann et al., 2022)의 scaling law에 따르면, 모델 크기와 데이터 양을 동시에 키우면 예측 가능하게 성능이 향상된다. 2020~2024년 LLM 경쟁은 이 공식을 따라 모델을 키우는 군비 경쟁이었다.

**Test-time compute**는 이미 학습된 모델이 **추론할 때** 투입하는 연산이다:

```
Test-time Compute = 생성 토큰 수 x 탐색 경로 수 x 검증 연산
```

같은 모델이라도 추론 시점에 더 많은 연산을 쓰면 더 나은 답을 낼 수 있다.

### "더 오래 생각하기"의 원리

사람이 어려운 문제를 만나면 더 오래 생각한다. Reasoning 모델도 마찬가지다:

1. 문제를 작은 단계로 분해
2. 각 단계의 중간 결과를 thinking 토큰으로 생성
3. 잘못된 경로를 발견하면 되돌아가서 수정 (self-correction)
4. 최종 답변 출력

이 과정에서 생성되는 thinking 토큰이 많을수록(= test-time compute가 클수록) 정답률이 올라간다. [DeepSeek R1](./deepseek-r1.md)에서 이 현상이 명확히 관찰되었다 — 시퀀스 길이가 길어질수록 정답률이 비례하여 상승했다.

### "Scaling Scaling Laws with Board Games" 논문

Andy L. Jones(2021)의 이 논문은 **AlphaZero**(DeepMind의 바둑/체스 AI)를 활용하여 train-time compute와 test-time compute의 관계를 체계적으로 분석했다:

- 학습을 적게 한 모델도 추론 시 충분한 탐색(MCTS)을 하면 학습을 많이 한 모델을 이길 수 있음
- **두 종류의 compute 사이에 교환 관계**(trade-off)가 존재
- 일정 수준 이상에서는 test-time compute가 train-time compute보다 **비용 효율적**

이 발견이 2024년 OpenAI o1의 이론적 토대가 되었다.

### OpenAI의 Power Law 주장

OpenAI는 2024년 o1 공개와 함께:

> "Test-time compute scaling은 train-time compute scaling과 유사한 power law를 따른다. 추론에 투입하는 연산을 10배 늘리면 예측 가능한 비율로 성능이 향상된다."

이는 단순히 "더 생각하면 좋다"가 아니라, **수학적으로 예측 가능한 scaling**이라는 점에서 혁명적이다.

### Test-time Compute의 2가지 카테고리

Snell et al.(2024)의 분류에 따르면:

#### (1) Search against Verifiers (Output-focused)

모델이 **여러 답변 후보를 생성**하고, 검증기(verifier)가 **최적의 답을 선택**한다. 출력 쪽에서 compute를 투입하는 방식.

**Verifier의 종류:**

- **ORM (Outcome Reward Model)**: 최종 답변만 평가. "정답인가 오답인가?"
  - 장점: 학습 데이터 확보 쉬움 (정답/오답 판별)
  - 단점: 중간 과정의 오류를 잡지 못함

- **PRM (Process Reward Model)**: 풀이의 **각 단계**를 평가. "이 단계의 추론은 올바른가?"
  - 장점: 잘못된 경로를 조기에 차단. 더 정확한 평가
  - 단점: 단계별 라벨링에 비용이 많이 듦
  - OpenAI의 **"Let's Verify Step by Step"** 논문(2023)에서 PRM이 ORM보다 수학 문제에서 유의미하게 우수함을 입증

**주요 기법:**

| 기법 | 설명 | Verifier |
|---|---|---|
| **Majority Voting** | N개 답 생성 후 가장 많이 나온 답 선택 | 없음 (다수결) |
| **Best-of-N** | N개 답 생성 후 verifier가 최고점 답 선택 | ORM 또는 PRM |
| **Beam Search + PRM** | 각 추론 단계에서 PRM 점수가 높은 경로만 유지하며 탐색 | PRM |
| **MCTS (Monte Carlo Tree Search)** | 게임 AI처럼 트리 탐색. 가능한 추론 경로를 체계적으로 탐색 | PRM |

#### (2) Modifying Proposal Distribution (Input-focused)

모델이 답을 생성하는 **방식 자체를 바꾸는** 접근. 입력 쪽에서 compute를 투입.

**주요 기법:**

- **STaR (Self-Taught Reasoner)**: 모델이 자신의 reasoning을 생성 → 정답이 나온 reasoning만 모아 fine-tuning → 반복. "스스로 가르치기"
- **Chain-of-Thought Prompting**: 프롬프트에 "단계별로 생각하세요"를 추가하는 가장 단순한 형태
- **Self-Consistency**: 다양한 reasoning 경로를 샘플링하고 일관된 답 선택

### DeepSeek R1에서의 구현

[DeepSeek R1](./deepseek-r1.md)은 test-time compute scaling의 직접적 증거를 제공했다:

- RL 학습 중 모델이 **자발적으로** 더 긴 thinking 시퀀스를 생성하기 시작
- 시퀀스 길이와 정답률 사이에 **양의 상관관계** 확인
- Verifier 없이 RL + [GRPO](./reinforcement-learning.md) 알고리즘만으로 이 scaling을 달성

### 실용적 시사점

1. **비용 효율**: 더 큰 모델을 훈련하는 대신, 작은 모델에 test-time compute를 추가하는 것이 더 저렴할 수 있다
2. **적응적 연산**: 쉬운 질문에는 짧은 thinking, 어려운 질문에는 긴 thinking — 연산 자원의 동적 배분
3. **민주화**: 학습에 수천억 원이 드는 거대 모델 대신, 상대적으로 작은 모델 + 충분한 추론 연산으로 유사한 성능 달성 가능성

## Reference

- [Part 1 — Ch.07 Reasoning Models](https://ai-contents-wine.vercel.app/01-llm/#anchor)

## 연관 entity

- [Reasoning Models](./reasoning-models.md) — test-time compute를 활용하는 모델 패러다임
- [DeepSeek R1](./deepseek-r1.md) — test-time compute scaling의 직접적 구현 사례
- [Loss Function](./loss-function.md) — verifier 학습에 사용되는 손실 함수
- [Reinforcement Learning](./reinforcement-learning.md) — reasoning 능력의 학습 기법

## 출처

- Notion "Reasoning LLMs에 관한 비주얼 가이드" (Maarten Grootendorst 원저 / 신종훈 번역)
- Snell et al., "Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters" (2024)
- Jones, "Scaling Scaling Laws with Board Games" (2021)
- Lightman et al., "Let's Verify Step by Step" (OpenAI, 2023)
- OpenAI "Learning to Reason with LLMs" blog (2024.09)

## 업데이트 이력

- 2026-04-12 — 신규 생성.
