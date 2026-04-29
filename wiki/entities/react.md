# ReAct (Reasoning + Acting)

**Category:** 아키텍처 / 패턴
**Status:** stable
**Last updated:** 2026-04-17

## TL;DR

LLM이 **Thought → Action → Observation** 사이클을 반복하며 문제를 푸는 가장 기본적인 에이전트 디자인 패턴. "생각한 다음 행동하고, 결과를 보고 다시 생각한다." 2022년 Yao et al. 논문에서 제안되었으며, 현재 거의 모든 에이전트 프레임워크의 기본형.

## 설명

### 동작 사이클

```
Question
   ↓
Thought: "이 질문에 답하려면 X가 필요해"
Action: search("X")
Observation: "결과: ..."
   ↓
Thought: "이 결과로는 부족해, Y도 필요해"
Action: search("Y")
Observation: "결과: ..."
   ↓
Thought: "이제 충분해. 답은..."
Final Answer: ...
```

### 왜 효과적인가

- **Thought** 단계가 LLM의 [Chain-of-Thought](./self-attention.md) 추론을 활용
- **Action** 단계가 [Tools](./augmented-llm.md)와 외부 세계 연결
- **Observation** 단계가 LLM이 자기 행동의 결과를 반영하게 함

### 한계

- 무한 루프 가능 (같은 Thought 반복)
- Thought가 너무 많으면 비용 폭증
- Observation을 잘못 해석하면 오류 누적
- 복잡한 작업은 [Plan-and-Execute](./plan-and-execute.md)가 더 적합

### 변형

- [Reflection](./reflection.md) — ReAct에 자기 검증 단계 추가
- [Plan-and-Execute](./plan-and-execute.md) — 먼저 전체 계획, 그다음 실행
- ReWOO — Reasoning Without Observation (계획 단계에서 도구 호출 분리)

## Reference

- [Part 4 — Ch.02 에이전트 디자인 패턴 5선](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/)
- [Part 3 — Ch.06 Planning](https://ai-contents-wine.vercel.app/03-ai-agents/) (간접 언급)

## 연관 entity

- [Reflection](./reflection.md) — ReAct의 자기 수정 변형
- [Plan-and-Execute](./plan-and-execute.md) — 복잡한 작업을 위한 대안
- [Augmented LLM](./augmented-llm.md) — Tools가 있어야 ReAct가 가능
- [Memory](./memory.md) — Observation이 단기 메모리에 누적됨

## 2025-2026 진화

- **LangGraph 1.0 GA (2025-10)** — `create_react_agent`가 `langchain.agents`로 이동, 표준 기본 에이전트로 정착. Klarna · Uber · LinkedIn 프로덕션. zero breaking changes.
- **Pre-Act** (Sapkota et al., arXiv:2505.09970, 2025-05) — multi-step plan을 미리 만든 뒤 매 step refine. ReAct 대비 **Action Recall +70%**, fine-tuned 70B 모델 action accuracy +69.5%, goal completion +28%. ReAct 단순 루프의 long-horizon 한계를 정면 비판.
- **Autono** (arXiv:2504.04650, 2025-04) — robust 자율 에이전트, hallucination 감소.
- **모델 다운사이징** — 2025 초 70B 필요 → 2026 초 32B 동작, 14B로 75%+ 신뢰도 예측.
- **Smolagents (HuggingFace)** vs **LangGraph** — 같은 ReAct가 40 lines vs 120 lines. 프로토타이핑 vs 프로덕션 분업 정착.

## 출처

- Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models", arXiv:2210.03629, ICLR 2023
- Sapkota et al., "Pre-Act: Multi-Step Planning and Reasoning Improves Acting in LLM Agents", arXiv:2505.09970, 2025-05
- LangGraph 1.0 GA 블로그, blog.langchain.com/langchain-langgraph-1dot0/, 2025-10
- LangChain ReAct agent 문서

본 엔티티의 2025-2026 자료는 `wiki/sources/web/2026-04-17_agent-design-patterns-2025-2026.md`에 상세 보존.

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
- 2026-04-17 — 2025-2026 진화 섹션 추가 (Pre-Act +70%, LangGraph 1.0, 모델 다운사이징).
