# Reinforcement Learning

**Category:** 학습 방법
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

**"보상(reward)을 통한 시행착오로 최적의 의사결정 정책을 학습하는" [머신러닝](./machine-learning.md) 방법**. 라벨이 아닌 **환경(environment)과의 상호작용**에서 배운다. 핵심 구성요소 5개: **Agent(행동 주체) / Environment(환경) / State(상태 S) / Action(행동 A) / Reward(보상 R)**, 그리고 이들을 묶는 **Policy(정책 π)**. 학습 루프는 `Sₜ → Aₜ → Rₜ → Sₜ₊₁`의 무한 반복이다. 대표 성공 사례: **AlphaGo(2016), AlphaZero, OpenAI Five(Dota 2), 자율주행, 로봇 제어**. 그리고 2022년 이후 가장 중요한 응용: **RLHF(Reinforcement Learning from Human Feedback)** — ChatGPT·Claude를 "말귀 알아듣게" 만든 바로 그 기법이다. 약점은 **샘플 효율이 낮다**(수백만 번 시도가 필요)는 것과 **보상 설계가 어렵다**는 것.

## 설명

### 5대 핵심 개념

**1. Agent** — 학습자, 의사결정자. 예: 게임 플레이어, 로봇, LLM.
**2. Environment** — 에이전트가 상호작용하는 세계. 예: 바둑판, 물리 세계, 채팅 맥락.
**3. State (Sₜ)** — 시점 t에서 환경의 상태. 예: 바둑판 배치, 로봇 센서값, 대화 이력.
**4. Action (Aₜ)** — 에이전트가 취한 행동. 예: "3-4에 돌 두기", "팔 각도 30도", "이 문장 생성".
**5. Reward (Rₜ)** — 행동의 결과로 받는 피드백 신호. 긍정/부정 수치. 예: 승리 +1, 패배 -1, 물체 집기 성공 +10, 넘어짐 -5.

그리고 이들을 엮는:
- **Policy (π)**: "상태 → 행동"의 규칙. RL의 학습 대상.
- **Value Function (V)**: 이 상태에서 기대되는 미래 누적 보상.
- **Q Function (Q)**: 이 상태에서 이 행동을 했을 때의 기대 누적 보상.

### 학습 루프

```
     ┌──────────────────────────────────┐
     │                                  │
     ↓                                  │
  [State Sₜ] ──── 관찰 ────→ [Agent]    │
                                │       │
                                │ Action Aₜ
                                ↓       │
                          [Environment] │
                                │       │
                     Reward Rₜ, Sₜ₊₁ ──┘
```

매 스텝마다:
1. Agent가 현재 상태 Sₜ를 관찰.
2. Policy π(Sₜ)에 따라 행동 Aₜ 선택.
3. 환경이 Aₜ를 적용 → 새 상태 Sₜ₊₁와 보상 Rₜ 반환.
4. Agent는 (Sₜ, Aₜ, Rₜ, Sₜ₊₁) 경험으로 Policy를 개선.
5. 종료(terminal)까지 반복 — 한 에피소드.

목표: **누적 보상 G = R₀ + γR₁ + γ²R₂ + ...** (γ는 할인율)의 기댓값을 최대화하는 정책 π*를 찾는 것.

### 탐험 vs 이용 (Exploration vs Exploitation)

RL의 근본적 딜레마:
- **Exploit**: 지금까지 가장 좋았던 행동을 계속 선택 → 안전하지만 더 나은 옵션을 놓침.
- **Explore**: 새로운 행동을 시도 → 더 좋은 정책을 발견할 수 있지만 단기 보상 손실.

**ε-greedy**, **Upper Confidence Bound(UCB)**, **Thompson Sampling** 같은 전략이 이 균형을 맞춘다.

### 대표 알고리즘 계보

| 세대 | 알고리즘 | 특징 |
|---|---|---|
| 고전 | Q-Learning (Watkins, 1989) | Q 테이블 업데이트, 이산 공간 |
| 고전 | SARSA | On-policy 버전 |
| 딥 RL | **DQN** (DeepMind, 2013) | Q-function을 신경망으로 — Atari 게임 돌파구 |
| 정책 기반 | Policy Gradient, REINFORCE | 정책을 직접 미분 |
| 하이브리드 | Actor-Critic, A3C, A2C | 정책+가치함수 동시 학습 |
| 최신 | **PPO** (Schulman, 2017) | 안정성 최고, RLHF의 주력 |
| 최신 | SAC, TD3 | 연속 행동 공간 |
| 모델 기반 | MuZero, Dreamer | 환경 모델까지 학습 |

### 대표 성공 사례

**AlphaGo (2016)** — DeepMind. 이세돌을 4:1로 이긴 순간 RL과 AI 전체의 대중 인식이 바뀌었다. 사람 기보(SL) + 셀프 플레이(RL)의 결합.

**AlphaZero (2017)** — 기보 없이 **순수 셀프 플레이만으로** 체스·장기·바둑을 초월적 수준에 도달. 사람 지식 제로.

**AlphaStar (2019)** — StarCraft II 그랜드마스터 달성.

**OpenAI Five (2019)** — Dota 2 세계 챔피언 팀을 격파.

**로봇 제어** — 보스턴 다이내믹스, Tesla Optimus, Figure 01. 시뮬레이션에서 RL 학습 후 실제 로봇에 전이(sim-to-real).

**자율주행** — Waymo, Tesla FSD의 일부 결정 모듈.

### RLHF — LLM을 사람답게 만든 기법

**2022년 InstructGPT 논문**(Ouyang et al.)이 제시한 방법으로, ChatGPT/Claude/Gemini의 "말귀 알아듣기"의 핵심이다. [Fine-tuning Data](./fine-tuning-data.md) entity에서 상세히 다루지만, RL 관점에서 요약하면:

1. **SFT**: 사람이 쓴 (지시, 답변) 쌍으로 지도학습.
2. **Reward Model 학습**: 두 개의 답 중 사람이 선호한 쪽을 예측하는 보상 모델. 이 모델이 RL의 "환경 보상 함수" 역할.
3. **PPO로 정책 최적화**: LLM이 Reward Model 점수를 높이도록 Policy(LLM 자체)를 업데이트.

여기서:
- **Agent** = LLM
- **State** = 프롬프트 + 지금까지 생성된 토큰
- **Action** = 다음 토큰 선택
- **Reward** = Reward Model의 선호도 점수

RLHF가 탄생하면서 "RL은 게임·로봇용"이라는 인식이 깨지고 **LLM alignment의 핵심 도구**가 됐다. 이후 **DPO(Direct Preference Optimization)**가 RL의 복잡함을 우회하는 대안으로 등장해 2024년부터는 오픈소스 표준이 됐다.

2026년 최신 흐름:
- **RLAIF** (RL from AI Feedback) — 사람 대신 강한 LLM이 피드백 제공.
- **Process Reward Model** — 최종 답뿐 아니라 추론 과정 단계별로 보상.
- **Reasoning RL** — DeepSeek-R1, o1/o3 스타일 — 정답 여부만 가지고 self-play로 추론 강화.

### RL의 어려움

1. **샘플 효율 낮음** — AlphaGo는 수백만 판을 뒀다. 현실에선 사람 손 로봇이 그렇게 많이 실패할 수 없다.
2. **Reward Hacking** — 에이전트가 보상 함수의 구멍을 찾아 의도와 다르게 최적화. "방을 청소하라" → "청소기 숨기기".
3. **Credit Assignment** — 100 스텝 뒤의 보상이 지금 이 행동 때문인지 알기 어려움.
4. **Sim-to-Real Gap** — 시뮬레이션에서 학습한 정책이 실세계에선 작동 안 함.
5. **재현성 낮음** — 같은 코드, 다른 시드, 완전히 다른 결과.

### 지도학습과의 비교

| 측면 | 지도학습 | 강화학습 |
|---|---|---|
| 데이터 | (x, y) 쌍 | (s, a, r, s') 시퀀스 |
| 피드백 | 즉시, 정확 | 지연, 희소 |
| 목표 | 오차 최소화 | 누적 보상 최대화 |
| 예시 | 이미지 분류 | 게임 플레이 |
| 사람 역할 | 라벨링 | 보상 설계 |

## Reference

- [Part 0 — Ch.06 강화학습: 보상으로 배우기](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#reinforcement-learning)

## 연관 entity

- [Machine Learning](./machine-learning.md) — 상위 카테고리
- [Supervised Learning](./supervised-learning.md) — 대조되는 학습 방법
- [Fine-tuning Data](./fine-tuning-data.md) — RLHF가 fine-tuning 단계에서 쓰이는 맥락
- [Human-in-the-Loop](./human-in-the-loop.md) — RLHF의 인간 피드백 루프
- [Self-Supervised Learning](./self-supervised-learning.md) — LLM의 Pre-train 단계 (RL 전 단계)

## 출처

- Sutton & Barto, *Reinforcement Learning: An Introduction*, 2nd ed., MIT Press, 2018.
- Mnih et al., "Playing Atari with Deep Reinforcement Learning" (DQN), 2013.
- Silver et al., "Mastering the game of Go with deep neural networks and tree search" (AlphaGo), Nature, 2016.
- Schulman et al., "Proximal Policy Optimization Algorithms" (PPO), 2017.
- Ouyang et al., "Training language models to follow instructions with human feedback" (InstructGPT / RLHF), 2022.
- PwC AI 리터러시 Day1/Day2 교육자료.

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX (Day1/Day2) ingest.
