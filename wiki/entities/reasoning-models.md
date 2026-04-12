# Reasoning Models

**Category:** 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

답변을 생성하기 전에 문제를 작은 단계로 분해하여 "사고 과정"을 거치는 LLM. 기존 LLM이 **"무엇을 답할지"**에 집중했다면, reasoning 모델은 **"어떻게 답할지"**를 먼저 설계한다. 2024년 후반 OpenAI o1을 시작으로, 2025~2026년에 DeepSeek R1, Claude Extended Thinking, Gemini Flash Thinking, Qwen QwQ 등이 등장하며 LLM의 새로운 패러다임이 되었다. 핵심 전환은 **train-time compute scaling**에서 **[test-time compute scaling](./test-time-compute.md)**으로의 이동이다.

## 설명

### 정의 — "생각하는 LLM"

일반 LLM은 프롬프트를 받으면 즉시 토큰을 생성한다. Reasoning 모델은 답변 전에 `<think>` 블록 안에서 문제를 분해하고, 중간 단계를 검증하며, 필요하면 경로를 수정한 뒤 최종 답을 출력한다. 사람이 어려운 수학 문제를 풀 때 연습장에 풀이 과정을 적는 것과 같은 원리다.

### 패러다임 전환: Train-time → Test-time Compute

2020~2024년까지 LLM 성능 향상의 공식은 명확했다:

> **더 큰 모델 + 더 많은 데이터 + 더 많은 학습 연산 = 더 나은 성능**

이것이 **train-time compute scaling**이다. GPT-3(175B) → GPT-4(추정 1.8T MoE) → Llama 3(405B)로 모델 크기가 커지고, 학습 데이터는 수조 토큰으로 확대되었다.

그러나 2024년 중반, 업계는 **diminishing returns**(수확 체감)에 직면했다. 모델 크기를 2배로 키워도 벤치마크 점수 향상은 미미해졌다. "여기까지인가?"라는 회의론이 퍼졌다.

돌파구가 된 것이 **[test-time compute scaling](./test-time-compute.md)**이다. 학습 시점이 아닌 **추론 시점에 더 많은 연산을 투입**하면 성능이 올라간다는 발견이다. OpenAI는 2024년 9월 o1을 공개하며 이 패러다임을 실증했다.

### 2026년 주요 Reasoning 모델

| 모델 | 개발사 | 공개 시점 | 특징 |
|---|---|---|---|
| **o1** | OpenAI | 2024.09 | 최초의 상용 reasoning LLM. Chain-of-Thought를 내부적으로 수행 |
| **o3** | OpenAI | 2025.01 | o1 후속. AIME **96.7%** (o1 대비 +13.4%p), ARC-AGI 기록 경신 |
| **DeepSeek R1** | DeepSeek | 2025.01 | 가중치 오픈소스. RL만으로 reasoning 학습에 성공한 돌파구 |
| **Claude Extended Thinking** | Anthropic | 2025.02 | Claude 3.5/4 계열에 thinking 블록 추가. 긴 추론 체인 지원 |
| **Gemini Flash Thinking** | Google | 2025.03 | 빠른 추론과 reasoning의 균형. 경량 모델에서도 사고 가능 |
| **Qwen QwQ** | Alibaba | 2025.03 | 중국 오픈소스 생태계. Qwen 2.5 기반 reasoning 특화 |

### 벤치마크 성과

Reasoning 모델의 등장은 기존 벤치마크 천장을 뚫었다:

- **AIME (미국 수학 올림피아드 예선)**: o1 83.3% → o3 **96.7%** — 미국 상위 1% 고등학생 수준
- **ARC-AGI**: o3가 기록 경신 — 추상적 추론 능력의 새로운 기준
- **GPQA Diamond (대학원 수준 과학 문제)**: o1이 PhD 전문가 수준을 첫 돌파
- **SWE-bench Verified (코딩)**: reasoning 모델이 비reasoning 대비 +15~25%p 향상

### Reasoning Tax — 비용과 속도의 대가

"생각"에는 비용이 든다. Reasoning 모델은 thinking 토큰을 추가로 생성하므로:

- **2025년 초**: 일반 LLM 대비 **5~20배** 비용/지연 (reasoning tax)
- **2026년 현재**: 모델 효율화와 [prompt caching](./prompt-caching.md), distillation 기법으로 **2~5배**까지 축소

DeepSeek R1의 distillation(Qwen-1.5B~32B로 reasoning 능력 증류)과 Gemini Flash Thinking의 경량화가 reasoning tax 절감에 기여했다.

### 한계론 — "진짜 추론인가?"

2024년 10월, Apple 연구팀은 논문 **"GSM-Symbolic: Understanding the Limitations of Mathematical Reasoning in Large Language Models"**을 발표했다. 이 논문은 reasoning 모델이 진정한 논리적 추론을 하는 것이 아니라 **패턴 매칭의 정교한 확장**일 수 있다는 의문을 제기했다. 주요 발견:

- 문제의 숫자만 바꿔도 정답률이 크게 변동
- 무관한 정보를 추가하면 성능 급락
- "reasoning"이 아니라 "sophisticated pattern matching"일 가능성

이에 대해 OpenAI, Anthropic 등은 o3와 Claude의 수학/코딩 벤치마크 성과가 단순 패턴 매칭으로는 설명 불가능하다고 반박하고 있으며, 2026년 현재 이 논쟁은 진행 중이다.

### Reasoning의 미래 — 2026년 이후

1. **Reasoning + Agent**: reasoning 능력을 갖춘 모델이 도구를 사용하고 환경과 상호작용하는 에이전트로 진화
2. **Multimodal Reasoning**: 텍스트뿐 아니라 이미지, 코드, 수식을 동시에 reasoning
3. **Always-on Thinking**: 모든 쿼리에 적응적으로 thinking 깊이를 조절하는 모델 (쉬운 질문은 짧게, 어려운 질문은 길게)
4. **Reasoning 민주화**: DeepSeek R1의 오픈소스 공개와 distillation으로 소규모 모델에서도 reasoning 가능

## Reference

- [Part 1 — Ch.07 Reasoning Models](https://ai-contents-wine.vercel.app/01-llm/#anchor)

## 연관 entity

- [Test-time Compute](./test-time-compute.md) — reasoning 모델의 핵심 메커니즘
- [DeepSeek R1](./deepseek-r1.md) — 오픈소스 reasoning 모델의 대표 사례
- [Self-Supervised Learning](./self-supervised-learning.md) — pre-training 단계의 학습 방법
- [Transformer](./transformer.md) — reasoning 모델의 기본 아키텍처
- [Reinforcement Learning](./reinforcement-learning.md) — reasoning 능력을 학습시키는 핵심 기법

## 출처

- Notion "Reasoning LLMs에 관한 비주얼 가이드" (Maarten Grootendorst 원저 / 신종훈 번역)
- WorkOS "How well are reasoning LLMs performing?" (2025)
- HumAI "DeepSeek R1 vs OpenAI o3" (2025)
- Deepfounder "AI Reasoning Models 2026"
- Apple "GSM-Symbolic: Understanding the Limitations of Mathematical Reasoning in Large Language Models" (2024)
- OpenAI "Learning to Reason with LLMs" blog (2024.09)

## 업데이트 이력

- 2026-04-12 — 신규 생성.
