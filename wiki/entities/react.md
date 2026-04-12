# ReAct (Reasoning + Acting)

**Category:** 아키텍처 / 패턴
**Status:** stable
**Last updated:** 2026-04-12

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

## 출처

- "ReAct: Synergizing Reasoning and Acting in Language Models" (Yao et al., 2022)
- LangChain ReAct agent 문서
- 5 AI Agent Design Patterns (n1n.ai, 2026)

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
