---
title: "Reasoning LLMs에 관한 비주얼 가이드 (번역)"
author: Maarten Grootendorst (원저) / 신종훈 (번역)
date_original: 2025-01
date_ingested: 2026-04-12
source_type: web (notion)
url_or_path: https://tulip-phalange-a1e.notion.site/Reasoning-LLMs-190c32470be2806d834ee0ad98aaa0b6
used_for: Part 2 Ch.07 Reasoning Models (작성 예정)
---

# Reasoning LLMs에 관한 비주얼 가이드

## Context

사용자가 직접 제공한 참고 자료. 40개 이상의 시각 자료로 reasoning LLMs, test-time compute, DeepSeek-R1을 설명하는 한국어 번역 글. Part 2 Ch.07 "Reasoning Models" 작성의 핵심 source.

## Key Points (구조 순서대로)

### 1. Reasoning LLMs란?
- 일반 LLM은 답만 출력, reasoning LLM은 "문제를 더 작은 단계로 분해"
- "무엇을" 답할지가 아니라 "어떻게" 답할지를 학습

### 2. Train-time Compute
- 2024 중반까지의 패러다임: Model params × Dataset tokens × FLOPs 스케일
- Kaplan Scaling Law (모델 크기 우선) vs Chinchilla Scaling Law (데이터·모델 균형)
- Power law → **diminishing returns** (수확 체감) → "여기까지인가?"

### 3. Test-time Compute ⭐ 핵심 전환
- 사전 학습 예산을 키우는 대신, **추론 시점에 "더 오래 생각"하도록**
- 비-reasoning 모델: 답만 출력
- Reasoning 모델: thinking 과정에 더 많은 토큰 생성 → 최종 답에 더 많은 compute 소비
- OpenAI: test-time compute도 train-time compute의 scaling 추세와 유사
- "Scaling Scaling Laws with Board Games" 논문 — AlphaZero로 두 compute 간 상관관계 증명
- **시퀀스 길이 측면에서도 확장 가능** — DeepSeek-R1에서 구현

### 4. Test-time Compute 기법 2가지 ⭐
#### A. Search against Verifiers (output-focused)
- Verifier 종류:
  - **ORM (Outcome Reward Model)** — 결과만 평가
  - **PRM (Process Reward Model)** — reasoning 과정도 평가 (각 단계에 점수)
- 기법들:
  1. **Majority Voting (Self-consistency)** — N개 답 생성, 다수결
  2. **Best-of-N samples** — ORM으로 각 답 평가, 최고 점수 선택
  3. **Beam search with PRM** — 여러 reasoning 경로 탐색, 낮은 점수 경로 조기 중단 (Tree-of-Thought 유사)
  4. **Monte Carlo Tree Search (MCTS)** — 4단계 (Selection → Expand → Rollouts → Backprop), exploration vs exploitation 균형

#### B. Modifying Proposal Distribution (input-focused)
- 토큰 확률 분포 자체를 수정하여 "reasoning 토큰"이 더 자주 선택되게
- 방법:
  1. **Prompting** — "Let's think step-by-step" 같은 CoT 프롬프트. 단점: 고정·선형적, 잘못 시작하면 수정 불가
  2. **STaR (Self-Taught Reasoner)** — LLM이 자체 reasoning 데이터 생성 → SFT. 맞으면 그대로 사용, 틀리면 힌트(정답) 제공 후 reasoning 재생성 → distillation의 강력한 방법

### 5. DeepSeek-R1 ⭐⭐ 상세
#### DeepSeek-R1 Zero (실험적 모델)
- DeepSeek-V3-Base에서 시작
- **SFT 없이 RL만으로** reasoning 행동 학습
- <think> 태그만 지시, reasoning 과정 내용은 지정 안 함
- **보상 2가지: Accuracy rewards (정답 여부) + Format rewards (<think>/<answer> 태그 사용)**
- RL 알고리즘: **GRPO (Group Relative Policy Optimization)**
  - 정답으로 이끈 토큰 세트의 확률을 높이고, 오답의 확률을 낮춤
- **자발적 행동 학습**: 모델이 스스로 self-reflection, self-verification 등 고도화된 CoT 학습
- 시퀀스가 길어질수록 정답 확률 ↑ → test-time compute 확장의 직접 증거
- 단점: 가독성 낮음, 여러 언어 혼합

#### DeepSeek-R1 (5단계 파이프라인)
1. **Cold Start** — 소량 고품질 reasoning 데이터(~5,000 토큰)로 SFT, 가독성 확보
2. **Reasoning-oriented RL** — 수학·코딩 등 검증 가능한 태스크 중심 RL
3. **Rejection Sampling** — 2단계 모델로 다양한 reasoning 생성, 고품질만 필터
4. **SFT** — 3단계에서 수집한 고품질 reasoning 데이터 + 일반 데이터로 지도 학습
5. **RL for all Scenarios** — 모든 태스크에 대해 최종 RL (accuracy + helpfulness + safety 보상)

### 6. 핵심 인사이트
- Verifier 없이 RL만으로도 reasoning 행동 유도 가능 (R1-Zero 돌파구)
- reasoning 과정의 길이(시퀀스) ∝ 정확도 → test-time compute scaling law 증거
- STaR → R1 파이프라인은 "합성 데이터 + distillation"의 표준 패턴이 됨
- CoT는 "프롬프팅"에서 "학습된 행동"으로 진화

## Quotes
> "LLM이 '무엇을' 답해야 하는지를 배우는 대신, '어떻게' 답해야 하는지를 배우게 됩니다!"
> — 원문

> "여기까지인가?" (train-time compute의 diminishing returns에 대해)
> — 원문

## Entities to create/update
- test-time-compute (신규)
- reasoning-models (신규)
- deepseek-r1 (신규)
- grpo (신규 or reasoning-models 안에)
- orm-prm (신규 or reasoning-models 안에)

## Chapters to create
- Part 2 Ch.07 — Reasoning Models: 생각하는 LLM의 등장
