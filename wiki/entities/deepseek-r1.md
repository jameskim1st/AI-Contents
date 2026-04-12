# DeepSeek R1

**Category:** 모델
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

2025년 1월 중국 AI 스타트업 DeepSeek이 공개한 오픈소스 reasoning LLM. OpenAI o1과 직접 경쟁하면서도 **가중치를 완전 공개**했다. 가장 큰 돌파구는 전신 모델 **R1-Zero**에서 SFT(지도 미세조정) 없이 **강화학습(RL)만으로** reasoning 능력을 학습시킨 것이다. 훈련 비용은 약 $5.5M으로 추정되어 o3 대비 1/100 수준이며, "reasoning의 민주화"를 상징하는 모델로 평가된다.

## 설명

### 배경 — DeepSeek은 어떤 회사인가

DeepSeek은 중국 헤지펀드 High-Flyer(환방량화)가 설립한 AI 연구소다. 량원펑(Liang Wenfeng)이 창업자이며, 기존 양적 트레이딩에서 축적한 GPU 인프라와 연구 인력을 활용한다. 2024년 DeepSeek-V2(MoE 아키텍처)로 주목받았고, 2025년 1월 R1 공개로 세계적 화제가 되었다.

### R1-Zero — SFT 없는 순수 RL Reasoning

DeepSeek R1의 학술적 핵심은 **R1-Zero** 실험이다. 이전까지 reasoning 모델(예: OpenAI o1)은 대량의 CoT(Chain-of-Thought) 데이터로 먼저 SFT를 수행한 뒤 RL로 강화하는 것이 정석이었다.

R1-Zero는 이 상식을 뒤집었다:

**설정:**
- Base 모델: DeepSeek-V3 (671B MoE)
- SFT: **없음** — zero supervised fine-tuning
- 유일한 지시: `<think>` 태그 안에 reasoning을 작성하라는 포맷 지시만 제공
- reasoning **과정의 내용**은 일절 지정하지 않음

**보상 설계 (Reward):**
- **Accuracy Reward**: 정답이면 +1, 오답이면 0. 수학/코딩은 정답 검증이 자동화 가능
- **Format Reward**: `<think>...</think>` 형식을 따랐는지 여부

이 두 가지 신호만으로, 모델이 **자발적으로** 다음을 학습했다:

1. **Self-reflection**: "잠깐, 이게 맞나?" 식으로 자기 답변을 되돌아봄
2. **Self-verification**: 중간 단계의 결과를 스스로 검증
3. **경로 수정**: 잘못된 추론 경로를 발견하면 "다시 처음부터" 전환
4. **긴 사고 체인**: RL 학습이 진행될수록 thinking 시퀀스가 자연스럽게 길어짐

**시퀀스 길이와 정답률의 관계:**
RL 학습 에피소드가 누적될수록 모델이 생성하는 thinking 토큰의 평균 길이가 증가했고, 이와 비례하여 정답률도 상승했다. 이는 **[test-time compute](./test-time-compute.md) scaling의 직접적 실험 증거**다.

### RL 알고리즘 — GRPO (Group Relative Policy Optimization)

DeepSeek은 PPO(Proximal Policy Optimization) 대신 자체 개발한 **GRPO** 알고리즘을 사용했다:

- PPO는 별도의 critic(가치 함수) 모델이 필요 → 671B 모델의 critic을 유지하는 것은 메모리 부담
- GRPO는 **그룹 내 상대 비교**로 critic을 대체:
  1. 같은 문제에 대해 N개의 답변을 샘플링
  2. 그룹 내에서 보상의 평균/표준편차를 계산
  3. 평균보다 좋은 답변은 확률 증가, 나쁜 답변은 확률 감소
- Critic 모델 없이도 안정적인 RL 학습 가능

### R1-Zero의 한계

R1-Zero는 놀라운 결과를 냈지만 한계도 있었다:
- **가독성 저하**: thinking 과정이 사람이 읽기 어려운 형태로 출력
- **언어 혼합**: 영어와 중국어가 뒤섞인 reasoning
- **반복 루프**: 같은 추론을 반복하는 패턴

이 한계를 해결하기 위해 최종 R1은 5단계 파이프라인을 거쳤다.

### R1 — 5단계 파이프라인

```
[Stage 1] Cold Start Data
  ─ R1-Zero의 출력에서 가독성 좋은 CoT 수천 개를 수집
  ─ 소량의 고품질 SFT 데이터로 base 모델 워밍업

[Stage 2] Reasoning-oriented RL
  ─ 수학/코딩/과학 등 정답 검증이 가능한 도메인에서 RL
  ─ R1-Zero와 동일한 Accuracy + Format 보상

[Stage 3] Rejection Sampling
  ─ Stage 2 모델로 대량의 reasoning 데이터 생성
  ─ 정답인 것만 선별(rejection sampling) → 약 80만 개 reasoning 샘플 확보
  ─ 추가로 일반 대화/글쓰기/번역 등 20만 개 SFT 데이터 혼합

[Stage 4] SFT (Supervised Fine-Tuning)
  ─ Stage 3에서 확보한 데이터로 전면 SFT
  ─ Reasoning 능력 + 일반 대화 능력 동시 확보

[Stage 5] RL for All Scenarios
  ─ Reasoning 도메인 + 일반 도메인 모두에서 최종 RL
  ─ 안전성/유용성 보상 추가
```

### Verifier 없는 접근

주목할 점은 R1이 별도의 **Process Reward Model(PRM)**이나 **Outcome Reward Model(ORM)**을 사용하지 않았다는 것이다. 수학/코딩 문제의 **자동 정답 검증**과 **GRPO의 그룹 상대 비교**만으로 충분했다. 이는 verifier 기반 접근(OpenAI의 추정 방식)과 대비되는 설계 철학이다.

### 비용 — "Reasoning의 민주화"

- DeepSeek R1 훈련 비용: 약 **$5.5M** (공식 논문 기준)
- OpenAI o3 훈련 비용: 비공개이나 **$500M~$1B** 추정
- 비율: 약 **1/100**

이 극적인 비용 차이는 두 가지 의미를 갖는다:
1. **기술적**: SFT 데이터 구축 비용 절감 + 효율적 RL 알고리즘(GRPO)의 위력
2. **생태계적**: 가중치 공개로 누구나 reasoning 모델을 연구/활용 가능 → reasoning 기술의 민주화

### Distillation — 작은 모델로 전이

DeepSeek은 R1의 reasoning 능력을 작은 모델로 증류(distillation)했다:

| 모델 | 기반 | 파라미터 | 성능 (AIME 2024) |
|---|---|---|---|
| R1-Distill-Qwen-1.5B | Qwen 2.5 | 1.5B | 28.9% |
| R1-Distill-Qwen-7B | Qwen 2.5 | 7B | 55.5% |
| R1-Distill-Qwen-14B | Qwen 2.5 | 14B | 69.7% |
| R1-Distill-Qwen-32B | Qwen 2.5 | 32B | 72.6% |
| R1-Distill-Llama-70B | Llama 3.3 | 70B | 70.0% |

**14B distill 모델이 GPT-4o(추정 1T+)보다 수학에서 높은 성능**을 보인 것은 test-time compute + distillation의 잠재력을 극적으로 보여주었다.

## Reference

- [Part 2 — Ch.08 추론 모델 혁명](https://ai-contents-wine.vercel.app/02-llm/#llm-ch8)

## 연관 entity

- [Test-time Compute](./test-time-compute.md) — R1이 실증한 핵심 패러다임
- [Reasoning Models](./reasoning-models.md) — R1이 속하는 모델 카테고리
- [Reinforcement Learning](./reinforcement-learning.md) — R1의 핵심 학습 기법 (GRPO)
- [Self-Supervised Learning](./self-supervised-learning.md) — base 모델(DeepSeek-V3) pre-training 단계

## 출처

- DeepSeek-AI, "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning" (2025.01)
- Notion "Reasoning LLMs에 관한 비주얼 가이드" (Maarten Grootendorst 원저 / 신종훈 번역)
- HumAI "DeepSeek R1 vs OpenAI o3" (2025)
- Deepfounder "AI Reasoning Models 2026"

## 업데이트 이력

- 2026-04-12 — 신규 생성.
