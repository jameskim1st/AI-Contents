# Fine-tuning Data

**Category:** 기본 개념 / 방법론
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

사전학습된 기초 모델을 **특정 작업·스타일·도메인에 맞추기 위한** 데이터셋. 3유형으로 나뉜다: **SFT(Supervised Fine-Tuning — instruction pairs), RLHF(Reinforcement Learning from Human Feedback — preference rankings), DPO(Direct Preference Optimization — RLHF의 단순화 대안)**. 핵심 교훈은 **Quality > Quantity** — Meta의 **LIMA 논문(2023)**은 단 **1000개**의 고품질 instruction만으로도 충분히 alignment가 가능함을 보였다. 실전 공개 데이터셋: **Alpaca(Stanford, GPT-3 생성), Dolly(Databricks, 인간 작성), OpenAssistant(커뮤니티), UltraChat, WildChat**. 2026년의 강한 흐름은 **synthetic preference data** — GPT-4·Claude로 선호 데이터를 자동 생성해 RLHF/DPO에 투입.

## 설명

### 왜 Fine-tuning이 필요한가

기초 모델([Pre-training Data](./pre-training-data.md) 학습 완료)은 "다음 단어 예측기"에 가깝다. 질문에 답하지 않고 이어 쓰거나, 위험한 내용을 뱉거나, 포맷을 안 지킨다. Fine-tuning은 이를 **"도움이 되고, 해롭지 않고, 정직한(Helpful, Harmless, Honest)"** 어시스턴트로 만드는 과정.

### 3대 유형

**1. SFT (Supervised Fine-Tuning)**
가장 단순하고 강력. `(instruction, response)` 쌍으로 학습.
```json
{
  "instruction": "파이썬으로 피보나치 수열 함수를 작성해줘",
  "response": "def fib(n):\n    if n <= 1: return n\n    ..."
}
```
- Alpaca, Dolly, LIMA, WizardLM 모두 SFT.
- 일반적으로 **수천~수십만 쌍** 규모.
- LoRA/QLoRA 같은 PEFT로 저비용 가능.

**2. RLHF (Reinforcement Learning from Human Feedback)**
InstructGPT(2022), ChatGPT의 기반 기법. 3단계:
1. SFT로 초기 정책 학습.
2. **Reward Model** 학습 — 두 응답 중 인간이 선호한 쪽을 예측하는 모델.
3. **PPO(Proximal Policy Optimization)**로 정책 모델이 reward를 높이도록 강화학습.
- 데이터: `(prompt, chosen_response, rejected_response)` 쌍.
- 비싸고 불안정하지만 품질이 압도적.

**3. DPO (Direct Preference Optimization)** — Rafailov et al. 2023
RLHF의 단순화. Reward Model 없이 직접 preference로 정책 업데이트. 동일한 preference 데이터 사용.
- **훨씬 안정적, 구현 쉬움**.
- 2024년 이후 오픈소스 모델의 사실상 표준 (Llama 3, Mistral, Qwen 등).
- 변종: **IPO, KTO, ORPO, SimPO** 줄줄이 등장.

### LIMA: Less Is More for Alignment

2023년 Meta의 LIMA 논문은 커뮤니티를 충격에 빠뜨렸다:
- **단 1000개**의 정성껏 큐레이션된 instruction 쌍.
- LLaMA-65B를 SFT (RLHF 없음).
- 블라인드 비교에서 **GPT-4와 43%, Bard와 58% 동등 이상** 평가.

결론: **Alignment는 거의 배우는 게 아니라 "드러내는"(surface) 작업**. 모델은 이미 사전학습에서 대부분을 알고 있고, fine-tuning은 "이 스타일로 말해"를 알려줄 뿐이다. → **Quality > Quantity**가 지배 원리가 됨.

### 주요 공개 데이터셋

| 데이터셋 | 크기 | 출처 | 특징 |
|---|---|---|---|
| **Alpaca** (2023) | 52k | Stanford, GPT-3 생성 | 최초 대중화, self-instruct 방식 |
| **Dolly** (2023) | 15k | Databricks 직원 수작업 | 100% 인간 작성 |
| **OpenAssistant (OASST1)** | 161k | 크라우드 커뮤니티 | 대화 트리 구조 |
| **LIMA** (2023) | 1k | Meta 큐레이션 | "Less is more" 증명 |
| **UltraChat** (2023) | 1.5M | GPT-3.5 생성 | 대화 다양성 |
| **WildChat** (2024) | 1M+ | 실제 ChatGPT 로그 | 실사용 분포 |
| **Tulu 3** (2024) | 1M+ | AllenAI 종합 | 2024 최고 수준 레시피 |
| **ShareGPT** | ~90k | ChatGPT 공유 데이터 | 초기 Vicuna 기반 |
| **Orca** (Microsoft, 2023) | 5M | GPT-4 explanation | "왜"를 포함해 학습 |

### Preference 데이터셋 (RLHF/DPO 용)

| 데이터셋 | 크기 |
|---|---|
| **Anthropic HH-RLHF** (2022) | 161k |
| **UltraFeedback** (2023) | 64k (GPT-4 판정) |
| **PKU-SafeRLHF** | 300k |
| **Nectar** | 182k |

### Synthetic Preference Data — 2026 흐름

Human feedback은 **느리고 비싸고 주관적**이다. 2024년부터 **"AI feedback"(RLAIF)**이 주류가 되고 있다:
- **Constitutional AI** (Anthropic, 2022) — Claude가 스스로의 답을 규칙에 따라 비판·개선.
- **Self-Rewarding LM** (Meta, 2024) — 모델이 자기 답에 점수 매김.
- **UltraFeedback** — GPT-4가 판정자 역할.
- **Magpie** (2024) — instruction 자체도 합성.

2026년 대부분의 오픈 모델은 **90%+ synthetic preference data**로 학습된다. 우려는 [Data-Centric AI](./data-centric-ai.md)의 "model collapse" 경고와 같다 — 다양성 손실.

### Instruction Tuning의 발견

**Wei et al. 2022 "Finetuned Language Models Are Zero-Shot Learners"(FLAN)**가 결정적이었다. 다양한 NLP 태스크를 instruction 포맷으로 변환해 학습하면 **zero-shot 일반화**가 극적으로 향상됨을 증명. 이후 **T0, FLAN-T5, InstructGPT**가 쏟아졌다.

### 실무 레시피 (2026)

1. **SFT** — 5~10k 고품질 instruction으로 시작. LoRA로 충분.
2. **DPO** — 5~20k preference 쌍으로 alignment. RLHF보다 10배 저렴.
3. **Evaluation** — MT-Bench, AlpacaEval, Arena-Hard.
4. **Iterate** — [Data-Centric AI](./data-centric-ai.md) 루프로 error case 보강.

### 법적·윤리적 주의

- GPT-4 출력으로 만든 데이터셋은 **OpenAI ToS 위반** 소지 (경쟁 모델 학습 금지 조항). Alpaca, Vicuna가 회색 지대에 놓임.
- 한국어·일본어처럼 preference data가 부족한 언어는 여전히 **영어 번역 + 로컬화** 패턴이 흔함.
- [EU AI Act](./eu-ai-act.md) Article 10은 fine-tuning 데이터도 출처·편향 문서화 대상으로 본다.

## Reference

- [Part 1 — Ch.05 LLM 학습 파이프라인](https://ai-contents-wine.vercel.app/01-llm/#llm-ch5)
- [Part 1 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/01-data-basics/)
- [Part 8 — Ch.02 LLM 학습 데이터의 정치학](https://ai-contents-wine.vercel.app/08-data-enterprise/)

## 연관 entity

- [Pre-training Data](./pre-training-data.md) — 상보 단계
- [Data-Centric AI](./data-centric-ai.md) — LIMA "quality > quantity"
- [Synthetic Data](./synthetic-data.md) — 합성 preference 트렌드
- [Human-in-the-Loop](./human-in-the-loop.md) — RLHF의 인간 피드백 루프
- [Evaluation](./evaluation.md) — MT-Bench / AlpacaEval
- [EU AI Act](./eu-ai-act.md) — 데이터 거버넌스 의무

## 출처

- Ouyang et al., "Training language models to follow instructions with human feedback" (InstructGPT), 2022.
- Rafailov et al., "Direct Preference Optimization", NeurIPS 2023.
- Zhou et al., "LIMA: Less Is More for Alignment", Meta, 2023.
- Wei et al., "Finetuned Language Models Are Zero-Shot Learners" (FLAN), ICLR 2022.
- Bai et al., "Constitutional AI", Anthropic, 2022.
- Tunstall et al., "Zephyr: Direct Distillation of LM Alignment", HuggingFace, 2023.
- AllenAI, "Tulu 3: Pushing Frontiers in Open Language Model Post-Training", 2024.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
