# AGI Levels

**Category:** 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

AGI(Artificial General Intelligence, 범용 인공지능)의 발전 단계를 정의하려는 분류 체계. **OpenAI는 5단계**(Chatbots → Reasoners → Agents → Innovators → Organizations)로, **Google DeepMind는 매트릭스**(Performance × Generality)로 제안했다. 2026년 현재, 업계는 대체로 **Reasoners 단계(Level 2)** 진입을 인정하고 있다 — o1, o3, Claude Reasoning 등의 등장 이후. Sam Altman은 "AGI를 가리키는 시스템이 눈앞에", Demis Hassabis는 "3~5년 안에 AGI 가능"이라 공언한 상태.

## 설명

### 왜 단계가 필요한가

"AGI가 왔다/안 왔다"는 논쟁은 정의가 모호해서 끝이 없다. 그래서 2023~2024년부터 주요 AI 랩들이 **측정 가능한 단계**를 제시하기 시작했다. 목적은 두 가지:

1. 진척도를 객관적으로 말하기
2. 안전·규제 논의의 공통 언어 제공

### OpenAI 5-Level 분류 (2024.07 공개)

| Level | 명칭 | 의미 | 2026년 현재 |
|---|---|---|---|
| **1** | **Chatbots** | 대화형 언어 사용 AI | 2020~2023 (GPT-3.5, 초기 GPT-4) |
| **2** | **Reasoners** | 사람 수준의 문제 해결 추론 | **현재 위치** (o1, o3, Claude Reasoning) |
| **3** | **Agents** | 장시간 자율 행동 가능 | 부분 도달 (Claude Code, Devin류) |
| **4** | **Innovators** | 새로운 발명·발견을 스스로 | 미도달 |
| **5** | **Organizations** | 조직 전체를 대체할 수준 | 미도달 |

핵심 포인트: 각 단계는 **누적적**이 아니라 **능력의 질적 전환**이다. Reasoner는 단순히 "큰 챗봇"이 아니라 **내부 사고 시간(thinking tokens)** 을 쓰는 새로운 종류.

### Google DeepMind 매트릭스 (Morris et al., 2023)

DeepMind는 "단일 직선 척도"를 거부하고 **2차원 매트릭스**를 제안:

- **Performance**: 태스크 수행 수준 (사람 대비)
- **Generality**: 다룰 수 있는 태스크 폭 (좁음 vs 넓음)

| Performance | Narrow AI | General AI |
|---|---|---|
| **Level 0: No AI** | 계산기 | 아마존 Mechanical Turk |
| **Level 1: Emerging** | GOFAI 규칙 기반 | ChatGPT, Llama 2, Gemini |
| **Level 2: Competent** | Siri 2025, Alexa | **미도달** (2026년 논쟁 중) |
| **Level 3: Expert** | Grammarly, Stable Diffusion | 미도달 |
| **Level 4: Virtuoso** | Deep Blue, AlphaGo | 미도달 |
| **Level 5: Superhuman** | AlphaFold, AlphaZero | 미도달 (ASI) |

DeepMind의 관점은 "AlphaGo는 Narrow에서 Virtuoso지만, ChatGPT는 General에서 Emerging" — 즉 **넓이와 깊이를 따로 본다**.

### 2026년 현재 위치

- 업계 컨센서스: OpenAI 기준 **Level 2 Reasoners 진입**, Level 3 Agents **부분 도달**.
- 근거: o1·o3·Claude 3.7 Reasoning의 수학·과학 벤치마크가 박사급 도달, Claude Code 같은 에이전트가 실제 코드베이스에서 몇 시간 자율 작업 가능.
- 미도달: **장기 기억**, **물리 세계 상호작용**, **지속 학습**, **자기 개선**.

### 주요 인사의 2024~2026 발언

- **Sam Altman (2025~2026)**: "AGI를 가리키는 시스템이 눈앞에 있다" / "우리는 AGI가 어떻게 만들어지는지 이제 확실히 안다"
- **Demis Hassabis (2026)**: "진정한 AGI는 앞으로 3~5년 안에 가능" / "단, 아직 1~2가지 돌파가 필요"
- **Dario Amodei (Anthropic, 2025)**: "강력한 AI(Powerful AI)는 2026~2027년" — AGI라는 용어 대신 선호
- **Yann LeCun (Meta, 2025)**: "현 LLM 경로로는 AGI 불가, 세계모델(World Model) 필요" — 반대 진영

### 전통 분류 ANI → AGI → ASI와의 관계

```
ANI (Artificial Narrow Intelligence)
  └─ 특정 태스크만 잘함. 알파고, Siri.
     ↓
AGI (Artificial General Intelligence)
  └─ 사람 수준으로 "대부분의" 지적 작업 가능.
     ↓
ASI (Artificial Super Intelligence)
  └─ 사람을 모든 면에서 초월.
```

OpenAI 5단계를 이 분류에 매핑하면:
- Level 1 Chatbots ≈ ANI 끝 / AGI 초입
- Level 2~3 ≈ Proto-AGI ~ AGI
- Level 4~5 ≈ AGI 성숙 / ASI 초입

### 비판·한계

- **벤치마크 해킹 우려** — 단계 경계가 명확하지 않고, 특정 평가지표에 최적화되면 가짜 도약 가능
- **"이해"의 정의 부재** — Searle의 중국어 방 논쟁이 아직 살아있음
- **경제/사회적 지표 누락** — 기술 능력만으로 정의하면 "AGI가 왔는데 실업·GDP에 충격이 없는" 이상 현상 발생 가능

### 왜 이 논의가 중요한가 (기업 관점)

2026년 기준, AI 전략은 "**Level 2~3의 능력을 어떻게 내재화할 것인가**"에 집중되어 있다. Reasoner와 Agent 사이의 **경계에서** 대부분의 엔터프라이즈 기회가 열리고 있기 때문. 이 wiki의 Part 0이 **ML 기초 → LLM → AGI**의 순서를 취하는 이유이기도 하다.

## Reference

- [Part 0 — Ch.11 AGI로 가는 길: 단계별 지도](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#agi-levels)

## 연관 entity

- [Machine Learning](./machine-learning.md) — AGI 논의의 기술적 토대
- [Deep Learning](./deep-learning.md) — 2024~2026 AGI 가속의 주 엔진
- [Transformer](./transformer.md) — 현재 Reasoner·Agent의 구조적 기반

## 출처

- OpenAI 내부 공유 자료 (Bloomberg, "OpenAI Sets Levels to Track Progress Toward Superintelligent AI", 2024.07).
- Morris et al. (Google DeepMind), "Levels of AGI: Operationalizing Progress on the Path to AGI", arXiv 2311.02462, 2023.
- Sam Altman, "Reflections", blog post, 2025.01.
- Demis Hassabis 인터뷰 (Time, Wired), 2025~2026.
- Dario Amodei, "Machines of Loving Grace", 2024.10.
- PwC AI 리터러시 PPTX (Day1/Day2).

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX ingest.
