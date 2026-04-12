# Pre-training Data

**Category:** 기본 개념 / 저장소
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

LLM 기반 모델을 처음부터 학습시키기 위한 **대규모 텍스트 코퍼스**. 주 출처는 **Common Crawl(웹 스크랩), Wikipedia, GitHub(코드), arXiv(논문), Books3(책)**. 규모는 매 세대마다 10배씩 커졌다 — **GPT-3 ~500B 토큰, GPT-4 추정 ~13T, Llama 3 15T, 2026 최신 모델은 20T 이상**. 2024~2025년의 두 가지 빅 이슈: (1) **저작권 소송 폭풍**(NYT vs OpenAI, Sarah Silverman 집단소송, Getty vs Stability AI), (2) **합성 데이터 비중 급증**(Phi-3, Nemotron, Llama 3이 모두 수 조 토큰 합성 사용). **Data contamination**(벤치마크 유출)이 평가 신뢰의 핵심 문제가 됨. 공개 재현 데이터셋: **RedPajama, The Pile, DataComp, FineWeb**.

## 설명

### 주요 데이터 출처

| 출처 | 설명 | 대표 규모 |
|---|---|---|
| **Common Crawl** | 2008~ 웹 전체 주기적 스크랩 | 월 ~3B 페이지, PB 규모 |
| **Wikipedia** | 다국어 백과 | 수십 GB |
| **Books3** (논란) | 저작권 소송의 뇌관 | ~196k 책 |
| **GitHub** | 코드 (라이선스 이슈 있음) | TB 규모 |
| **arXiv** | 과학 논문 | ~2M 편 |
| **Stack Exchange** | Q&A | 수백 GB |
| **Reddit** | 대화·링크 | 대규모 |

### 규모의 진화 (토큰 기준)

| 모델 | 학습 토큰 | 파라미터 | 연도 |
|---|---|---|---|
| GPT-2 | ~40 GB 텍스트 | 1.5B | 2019 |
| **GPT-3** | **~500B 토큰** | 175B | 2020 |
| Chinchilla | 1.4T | 70B | 2022 |
| Llama 1 | 1.4T | 65B | 2023-02 |
| Llama 2 | 2T | 70B | 2023-07 |
| **GPT-4 (추정)** | **~13T** | ~1.8T (MoE) | 2023 |
| **Llama 3** | **15T** | 405B | 2024 |
| Llama 3.3 / DeepSeek V3 | 15~18T | ~600B MoE | 2024~2025 |
| **GPT-5 추정 (2025)** | **~20T+** | 비공개 | 2025 |

**Chinchilla scaling law (2022)**가 중요한 전환점이었다 — "동일 연산량이라면 더 큰 모델보다 **더 많은 데이터**가 낫다". 이후 모델 크기 증가는 둔화되고 **데이터 양**이 승부가 됐다.

### 저작권 대소송 시대 (2023~)

2023년 말부터 터진 대규모 소송들:

| 소송 | 쟁점 | 상태(2026-04) |
|---|---|---|
| **NYT v. OpenAI/Microsoft** (2023-12) | 수백만 기사 무단 학습, 축어 재생산 | 증거 제출 단계, 2026년 핵심 판례 예정 |
| **Sarah Silverman et al. v. Meta/OpenAI** | Books3 포함 저작권 침해 | 일부 기각, 직접 침해 주장만 진행 |
| **Getty Images v. Stability AI** | Stable Diffusion 학습 | 영국 2025 판결, Stability 일부 패소 |
| **한국 뉴스통신사 v. Naver/Kakao** (2025) | 뉴스 크롤링 | 조정 중 |
| **Dow Jones, Intercept v. OpenAI** | 2024 합류 | 진행 중 |

**결과**: OpenAI·Google·Meta 모두 **라이선스 계약**으로 선회. Axel Springer, AP, FT, Reddit과 각각 수십~수백억 원 규모 계약. [EU AI Act](./eu-ai-act.md) GPAI 조항은 **학습 데이터 요약 공개**를 의무화해 이 흐름을 강제.

### Data Contamination (벤치마크 유출)

모델이 테스트 벤치마크를 학습 데이터에서 "본 적 있는" 문제. 평가 점수를 믿을 수 없게 만든다.
- **MMLU, GSM8K, HumanEval** 같은 벤치마크가 웹에 퍼지면서 자연스럽게 크롤링됨.
- **해결책**: 
  - Contamination 검사(학습 토큰 중 벤치마크 n-gram 존재 확인).
  - **LiveBench, SimpleBench** 같은 **동적 갱신 벤치마크**.
  - 사적 평가(private eval set).
- 2026년 Meta는 Llama 4 출시 시 contamination 분석 리포트를 함께 공개하는 것이 표준이 됨.

### Synthetic Data의 부상

2024 이후 합성 데이터 비중이 급격히 증가:
- **Phi-3** (Microsoft) — 교과서 스타일 합성 데이터가 핵심.
- **Nemotron-4 340B** (NVIDIA) — 합성 데이터 생성 전용 모델로 공개.
- **Llama 3** — 수조 토큰 규모의 필터링된 합성 데이터.
- **DeepSeek V3** — 코드·수학 합성 생성으로 고점 달성.

걱정거리: **Model collapse** — 합성 데이터로만 학습하면 모델이 평균에 수렴. Shumailov et al. 2024 *Nature* 논문이 경고. 해결은 **합성+원본의 균형**.

### 공개 재현 데이터셋

연구자가 기업 모델을 재현하기 위한 공개 코퍼스:

| 데이터셋 | 출처 | 규모 |
|---|---|---|
| **The Pile** (EleutherAI, 2020) | 22개 출처 모음 | 825 GB |
| **C4** (Google, 2019) | Common Crawl 정제 | 750 GB |
| **RedPajama** (Together AI, 2023) | Llama 1 학습 데이터 재현 | 1.2T 토큰 |
| **SlimPajama** | RedPajama 중복 제거 | 627B |
| **DataComp-LM** (2024) | 3.8T 토큰 필터링 연구 | 대규모 |
| **FineWeb** (HuggingFace, 2024) | 고품질 웹 필터링 | 15T |
| **FineWeb-Edu** (2024) | 교육용 필터링 | 1.3T |

### 데이터 큐레이션의 핵심 작업

1. **Quality filtering** — classifier, perplexity, heuristic 규칙. Wikipedia 유사도로 "좋은 웹 페이지" 선별.
2. **Deduplication** — 중복은 과적합·편향의 주 원인. MinHash, suffix array 사용.
3. **PII removal** — [PII](./pii.md) 스캔으로 개인정보 제거.
4. **Toxic filtering** — perspective API 등으로 혐오·성적 콘텐츠 제거 (단 과도하면 편향 증가 역효과).
5. **Domain mixing** — 코드·수학·자연어 비율 튜닝 (Doremi 2023).

### [Data-Centric AI](./data-centric-ai.md)와의 교차

LLM 시대에 [Data-Centric AI](./data-centric-ai.md) 운동이 부활한 이유가 여기 있다 — **"모델은 다 비슷, 데이터가 승부"**. 2024~2026년의 돌파구(Phi-3, Llama 3, DeepSeek)는 모두 **데이터 큐레이션 노하우**에서 나왔다.

## Reference

- [Part 1 — Ch.05 LLM 학습 파이프라인](https://ai-contents-wine.vercel.app/01-llm/#llm-ch5)
- [Part 1 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/01-data-basics/)
- [Part 4 — Ch.02 LLM 학습 데이터의 정치학](https://ai-contents-wine.vercel.app/04-data-enterprise/)

## 연관 entity

- [Fine-tuning Data](./fine-tuning-data.md) — 상보 단계
- [Synthetic Data](./synthetic-data.md) — 합성 데이터 비중 증가
- [Data-Centric AI](./data-centric-ai.md) — 큐레이션 중심 사고
- [Tokenization](./tokenization.md) — 학습 데이터 처리 선행 단계
- [EU AI Act](./eu-ai-act.md) — GPAI 학습 데이터 공개 의무
- [Data Bias](./data-bias.md) — 학습 데이터 편향의 원천
- [PII](./pii.md) — 학습 데이터 PII 제거

## 출처

- Brown et al., "Language Models are Few-Shot Learners" (GPT-3), NeurIPS 2020.
- Hoffmann et al., "Training Compute-Optimal Large Language Models" (Chinchilla), 2022.
- Meta, "The Llama 3 Herd of Models", 2024.
- Gunasekar et al., "Textbooks Are All You Need" (Phi), Microsoft, 2023.
- Shumailov et al., "The Curse of Recursion", Nature, 2024.
- HuggingFace, "FineWeb: decanting the web", 2024.
- NYT v. OpenAI complaint, 2023-12-27.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
