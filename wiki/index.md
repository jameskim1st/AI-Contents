# Index

`wiki/entities/` 카탈로그. 카테고리별로 분류.
**Last updated:** 2026-04-12

---

## 모델 (Models)

- [Transformer](./entities/transformer.md) — Attention 기반 LLM의 기본 아키텍처

## 아키텍처 / 패턴

- [LLM Wiki](./entities/llm-wiki.md) — Karpathy의 지식 누적 패턴 ⭐
- [MoE (Mixture of Experts)](./entities/moe.md) — 2026 LLM 효율화 핵심
- [Harness Engineering](./entities/harness-engineering.md) — AI 에이전트 컨텍스트 관리
- [ReAct](./entities/react.md) — Thought·Action·Observation 사이클 ⭐ NEW
- [Reflection / Reflexion](./entities/reflection.md) — 자기 검증 패턴 ⭐ NEW
- [Plan-and-Execute](./entities/plan-and-execute.md) — 계획·실행 분리 패턴 ⭐ NEW
- [Plan-Critic-Build](./entities/plan-critic-build.md) — 코딩 특화 Reflection ⭐ NEW
- [Orchestrator-Worker](./entities/orchestrator-worker.md) — 멀티 에이전트 표준형 ⭐ NEW
- [Multi-Agent](./entities/multi-agent.md) — 협업 패턴 카테고리 ⭐ NEW
- [Narrow Scope](./entities/narrow-scope.md) — "만능 ❌, 단일 ⭕" 원칙 ⭐ NEW
- [Human-in-the-Loop](./entities/human-in-the-loop.md) — 사람 fallback 패턴 ⭐ NEW

## 프로토콜 / 표준 ⭐ NEW 카테고리

- [MCP (Model Context Protocol)](./entities/mcp.md) — 에이전트↔시스템 표준 ⭐ NEW
- [A2A (Agent-to-Agent)](./entities/a2a.md) — 에이전트↔에이전트 표준 ⭐ NEW

## 도구 / 프레임워크

- [Claude Code](./entities/claude-code.md) — Anthropic의 CLI 코딩 에이전트
- [CLAUDE.md](./entities/claude-md.md) — 프로젝트 작업 규칙 파일
- [Computer Use](./entities/computer-use.md) — 컴퓨터 직접 조작 에이전트 ⭐ NEW
- [Agent Frameworks (2026 카탈로그)](./entities/agent-frameworks.md) — OpenAI/Google/MS/HF 비교 ⭐ NEW
- [LangGraph](./entities/langgraph.md) — 그래프 기반 에이전트 프레임워크 ⭐ NEW

## 운영 / 신뢰성 ⭐ NEW 카테고리

- [Production Gap](./entities/production-gap.md) — PoC와 프로덕션 사이의 격차 ⭐ NEW
- [Observability](./entities/observability.md) — 비결정 시스템 디버깅 ⭐ NEW
- [Evaluation](./entities/evaluation.md) — 비결정 시스템 평가 ⭐ NEW
- [Prompt Injection](./entities/prompt-injection.md) — 에이전트 시대의 SQL injection ⭐ NEW

## 개념 / 메커니즘

- [Self-Attention](./entities/self-attention.md) — Transformer의 핵심 메커니즘
- [Augmented LLM](./entities/augmented-llm.md) — 도구·메모리·검색이 붙은 LLM
- [Memory (Agent)](./entities/memory.md) — 에이전트의 단기/장기 기억

## 인물

- [Andrej Karpathy](./entities/karpathy.md) — LLM Wiki 패턴 제안자

## 방법론

- [Vibe Coding](./entities/vibe-coding.md) — 자연어로 지시하고 AI가 구현하는 코딩 방식

---

## 미수집 (Backlog)

다음 ingest 우선순위:

- GPT-4 / GPT-5 / Claude 4.6 / Gemini 2.5 (모델 카탈로그)
- RAG (Retrieval-Augmented Generation) — LLM Wiki와 대조 필요
- Tools entity (현재 ai-agents.html Ch.05 미수집)
- Planning entity (현재 ai-agents.html Ch.06 미수집)
- WebMCP (3계층 스택의 최상층)
- AutoGen 0.4 (개별 framework entity)
- Smolagents
- CrewAI
- LLM-as-judge (Evaluation 하위 패턴)
- Sandboxing (보안 패턴)
- Tool budget / Identity propagation (MCP의 빠진 primitive들)

---

## 통계

- entity 페이지: 28개 (11 → 28, +17)
- 카테고리: 9개 (7 → 9, "프로토콜/표준"·"운영/신뢰성" 신설)
- Last ingest: 2026-04-12 (AI Agents 실전 리서치)
- Last query: 2026-04-12 (Part 2 챕터 10개 합성, 21개 entity 활용)
- 완료 사이클: Sources → Ingest → Lint → Query → Ingest-back (5단계 1회)
