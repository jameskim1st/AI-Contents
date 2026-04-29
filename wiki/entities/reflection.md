# Reflection / Reflexion

**Category:** 아키텍처 / 패턴
**Status:** stable
**Last updated:** 2026-04-17

## TL;DR

에이전트가 자기 출력을 **다시 검토하고 비판하고 수정** 하는 패턴. [ReAct](./react.md)에 "자기 검증" 단계를 추가한 형태. 단순 ReAct보다 복잡한 작업에서 정확도가 크게 올라감. "Reflexion"은 학습까지 포함한 발전된 변형.

## 설명

### 동작

```
1. Generate: 첫 답변 생성
2. Reflect: "이 답변에 문제가 있나?" 자기 비판
3. Refine: 문제 발견 시 수정
4. (반복) — 만족스러울 때까지
```

### 두 가지 형태

- **Reflection (단순)** — 같은 LLM이 자기 답변 검토. 비용 ↑, 품질 ↑
- **Critic 분리** — 별도 모델/프롬프트가 검토. [Multi-Agent](./multi-agent.md)의 한 형태
- **Reflexion (논문)** — 실수에서 "교훈"을 추출해 다음 시도에 활용 (장기 메모리 변형)

### 왜 효과적인가

- LLM은 "자기가 만든 답을 평가하는 것"을 "처음부터 답을 만드는 것"보다 잘함
- 단순 검증이 hallucination 비율을 크게 줄임
- 코딩 에이전트에서 특히 강력 ([Plan-Critic-Build](./plan-critic-build.md))

### 한계

- 비용 2~3배
- 자기 비판의 무한 루프 가능
- "자신감 있게 틀린 답"은 못 잡음 (LLM이 자기 오류 패턴을 모름)

## Reference

- [Part 4 — Ch.03 에이전트 디자인 패턴 5선](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch3)
- [Part 6 — Ch.05 조합하는 패턴 — Plan-Critic-Build](https://ai-contents-wine.vercel.app/06-vibe-master/) (vibe-master Ch.05)

## 연관 entity

- [ReAct](./react.md) — 기반 패턴
- [Plan-Critic-Build](./plan-critic-build.md) — 코딩에서의 적용
- [Multi-Agent](./multi-agent.md) — Critic이 별도 에이전트일 때

## 2025-2026 진화

- **Anthropic 5-패턴 분류 (2024-12)** — Reflection이 산업 표준 어휘로 **"Evaluator-Optimizer"**로 명명됨 (Schluntz &amp; Zhang, "Building Effective Agents").
- **MAR (Multi-Agent Reflexion)** (arXiv:2512.20845, 2025-12) — 핵심 발견: *"단일 에이전트 self-reflection은 같은 모델이 행동·평가·반성을 모두 수행하면 동일 추론 오류가 반복되는 degeneration-of-thought 현상이 발생"*. 액팅·진단·비평·종합을 서로 다른 에이전트로 분리. **HumanEval pass@1 76.4 → 82.6 (+6.2점)** vs 단일 Reflexion. 비용은 5-7× baseline.
- **LangGraph 표현법** — 별도 모듈 없이 conditional edge로 generator → critic → loop.
- **CrewAI 1.1.0 (2025-12)** — EventListener에 평가 hook 통합.

## 출처

- Shinn et al., "Reflexion: Language Agents with Verbal Reinforcement Learning", arXiv:2303.11366, NeurIPS 2023
- "MAR: Multi-Agent Reflexion", arXiv:2512.20845, 2025-12
- Schluntz &amp; Zhang (Anthropic), "Building Effective Agents", 2024-12-20

본 엔티티의 2025-2026 자료는 `wiki/sources/web/2026-04-17_agent-design-patterns-2025-2026.md`에 상세 보존.

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
- 2026-04-17 — MAR 2025-12 섹션 추가 (degeneration-of-thought 비판, +6.2pt). Anthropic Evaluator-Optimizer 명칭화.
