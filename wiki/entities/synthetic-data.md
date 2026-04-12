# Synthetic Data

**Category:** 개념 / 데이터
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

사람·현실 세계가 아닌 **AI(주로 LLM)가 생성한 훈련·평가·테스트 데이터**. 2020년대 초 개인정보(PII) 우회 수단으로 시작해 2026년에는 **프론티어 LLM 훈련의 기본 재료**가 됐다. Anthropic·OpenAI·Google DeepMind 모두 사내 합성 데이터 파이프라인을 주요 경쟁력으로 공개. 활용 축 3가지: ① 프라이버시 우회, ② 희귀 케이스(엣지 케이스) 증강, ③ 모델 훈련·평가셋 생성. 가장 큰 위험은 **Model Autophagy Disorder (MAD)** — 합성 데이터로 훈련된 모델이 자기 출력을 다시 먹으며 품질이 붕괴하는 현상.

## 설명

### 왜 합성 데이터가 필수가 됐나

- **실 데이터 고갈** — 2024년 Epoch AI 연구: 고품질 인터넷 텍스트는 2026~2028년 사이 고갈 예상.
- **프라이버시** — 의료·금융 실 데이터 사용 제약(GDPR, HIPAA, [EU AI Act](./eu-ai-act.md) Article 10).
- **라벨 비용** — 사람 라벨러 비용 폭등, RLHF 병목.
- **희귀 사건** — 실 세계에서 1000건 중 1건 일어나는 엣지 케이스를 수천 배 증강.
- **Fine-tuning 연료** — 특정 도메인 QA, 함수 호출, 코드, 다국어 confident answer.

### 3대 용도

1. **훈련(Pre-training + Fine-tuning)**
   - Anthropic의 [Constitutional AI](./prompt-injection.md) — AI가 스스로 critique하며 SFT 데이터를 만든다.
   - Microsoft Phi 시리즈 — "Textbooks Are All You Need" 접근, 대부분 합성 데이터.
   - Meta Llama 3/4 — 합성 데이터로 long-context·reasoning·코드 강화.
2. **평가(Evaluation)**
   - [RAGAS](./ragas.md)의 `TestsetGenerator` — 내 문서에서 질문·정답 자동 생성.
   - Red-team 데이터 — 적대적 프롬프트를 LLM이 대량 생성.
3. **프라이버시 보존 대체 데이터**
   - Gretel, Mostly AI, Tonic.ai — 원본 통계 구조는 유지하되 PII 제거.
   - 금융 거래, EHR(전자의무기록) 공유에 활용.

### 2026 실전 파이프라인 예시 (LLM 훈련용)

```
seed prompts (사람이 소량)
   ↓
LLM이 대량 확장 (instruction generation)
   ↓
LLM-as-critique: 품질·다양성·독성 필터링
   ↓
중복 제거 (near-dup detection)
   ↓
Difficulty grading (쉬움·중간·어려움)
   ↓
Human review sample (1~5%)
   ↓
Training set
```

### 위험 1: Mode Collapse

- 합성 데이터는 LLM이 "잘하는 것"에 편향됨 → 다양성이 줄어듦.
- 해결: seed 다양화, 온도 조절, reject sampling, 사람 검토.

### 위험 2: Model Autophagy Disorder (MAD)

- Shumailov et al., "The Curse of Recursion" (Nature, 2024) — 합성 데이터로만 훈련된 모델은 세대를 거듭할수록 분포의 꼬리(희귀 케이스)를 잃고 결국 붕괴.
- Rice University 팀의 "MAD" 논문(2024)이 이 현상을 이름 붙임.
- 2026 대응: **실 데이터 앵커** — 매 세대 실 데이터를 일정 비율(보통 10~30%) 섞는 것이 표준.

### 위험 3: 라이선스·저작권 세탁 오염

- 합성 데이터가 저작권 있는 원본 LLM 출력을 포함하면 재배포 시 법적 문제.
- 2026년 OpenAI·Anthropic 이용약관: 타사 모델 훈련에 자사 API 출력 사용 금지 — 대부분 팀이 오픈 모델(Llama, Mistral)로 synthetic pipeline 재구성.

### 2026 주요 도구/프레임워크

| 이름 | 용도 |
|---|---|
| **Distilabel** (Argilla) | 오픈소스, synthetic SFT/DPO 데이터 생성 |
| **Nemotron-Synth** (NVIDIA) | Nemotron-4 340B 기반, 라이선스 관대 |
| **Gretel.ai** | 프라이버시 보존 테이블/시계열 |
| **Mostly AI** | EU 기반, 금융·의료 특화 |
| **Tonic.ai** | DevOps에서 테스트 DB 합성 |
| **RAGAS TestsetGenerator** | RAG 평가용 |
| **promptfoo synth** | 평가셋 자동 확장 |

### Anthropic / OpenAI 내부 전략 (공개된 범위)

- **Anthropic** — Constitutional AI, "self-play reinforcement" 루프. Claude 4 Sonnet/Opus는 합성 추론 궤적(thinking traces)을 RL 연료로 사용.
- **OpenAI** — GPT-4.5 이후 "synthetic reasoning chains"를 훈련 단계에 통합. 2025 블로그: "대부분의 reasoning 능력 개선은 합성 데이터에서 왔다".
- **Google DeepMind** — Gemini 2.5 Pro thinking 모드 훈련에 AlphaProof/AlphaGeometry 스타일 synthetic math 사용.

### 거버넌스 관점

[EU AI Act](./eu-ai-act.md) Article 10은 **데이터 출처와 대표성**을 문서화할 것을 요구. 합성 데이터 비중, 생성 방법, seed 분포, 편향 검증을 명시적으로 기록해야 함 — 2026년 이후 AI 모델 카드(Model Card)의 필수 섹션이 됨.

## Reference

- [Part 1 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/01-data-basics/)
- [Part 8 — Ch.09 AI 거버넌스와 데이터 생애주기](https://ai-contents-wine.vercel.app/08-data-enterprise/)

## 연관 entity

- [RAG](./rag.md) — 합성 Q&A로 RAG 평가 데이터셋 구축
- [RAGAS](./ragas.md) — TestsetGenerator
- [Evaluation](./evaluation.md)
- [EU AI Act](./eu-ai-act.md) — 데이터 거버넌스 문서화 의무
- [Document AI](./document-ai.md) — 파싱 평가 데이터 합성
- [Human-in-the-Loop](./human-in-the-loop.md) — 합성 데이터의 품질 게이트

## 출처

- Shumailov et al., "The Curse of Recursion: Training on Generated Data Makes Models Forget", Nature, 2024.
- Alemohammad et al., "Self-Consuming Generative Models Go MAD", Rice University, 2024.
- Microsoft Research, "Textbooks Are All You Need" (Phi series), 2023~2025.
- Epoch AI, "Will We Run Out of Data?", 2024.
- Anthropic, "Constitutional AI", 2022 + 2025 updates.
- NVIDIA, "Nemotron-4 340B Technical Report", 2024.
- Argilla, "Distilabel Docs", 2025~2026.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
