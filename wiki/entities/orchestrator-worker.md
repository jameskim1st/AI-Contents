# Orchestrator-Worker (Puppeteer Pattern)

**Category:** 아키텍처 / 패턴
**Status:** stable
**Last updated:** 2026-04-17

## TL;DR

상위 "오케스트레이터" 에이전트가 전체를 지휘하고, 하위 "워커" 에이전트들이 각자 전문 작업을 담당하는 멀티 에이전트 패턴. 2026년 프로덕션 멀티 에이전트의 사실상 표준. "Puppeteer 패턴"이라고도 불림. [A2A](./a2a.md) 프로토콜의 주요 사용 사례.

## 설명

### 구조

```
              ┌─────────────────┐
              │  Orchestrator   │
              │ (작업 분배·합성) │
              └───────┬─────────┘
                      │
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
    ┌────────┐    ┌────────┐    ┌────────┐
    │Worker 1│    │Worker 2│    │Worker 3│
    │검색    │    │분석    │    │작성    │
    └────────┘    └────────┘    └────────┘
```

### 왜 단일 에이전트보다 나은가

- **전문화** — 각 워커가 자기 도메인만 잘하면 됨 → 더 좋은 프롬프트, 더 작은 모델 가능
- **병렬화** — 독립 작업은 동시에 진행 → 지연시간 ↓
- **격리** — 한 워커의 실패가 전체에 전파되지 않음
- **비용 최적화** — 작은 모델 + 작은 컨텍스트 워커 다수 > 거대 모델 단일

### "Narrow Scope"와의 관계

[Narrow Scope](./narrow-scope.md) 원칙의 직접 구현. "만능 에이전트 1개"보다 "단일 작업 전문가 N개"가 프로덕션에서 압도적.

### 예시

- **OpenAI Codex 팀** — 3명이 5개월간 에이전트만으로 100만 줄 프로덕션 코드 (Part 4 Ch.04에 인용). 사실상 orchestrator-worker 구조였다.
- **Deep Research** (OpenAI/Perplexity) — 오케스트레이터가 검색·요약·합성 워커를 지휘
- **Customer Support** — 라우터 → 분류·답변·escalation 워커들

### 한계

- 오케스트레이터가 병목
- 워커 간 통신 비용 (이 때문에 [A2A](./a2a.md) 프로토콜 등장)
- "오케스트레이터가 워커를 잘못 부르면" 디버깅 어려움

## Reference

- [Part 3 — Ch.07 Multi-Agent 협업](https://ai-contents-wine.vercel.app/03-ai-agents/) (기초)
- [Part 4 — Ch.02 에이전트 디자인 패턴 5선](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/)
- [Part 4 — Ch.05 A2A 프로토콜](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/)
- [Part 6 — Ch.07 멀티 에이전트 활용](https://ai-contents-wine.vercel.app/06-vibe-master/)

## 연관 entity

- [Multi-Agent](./multi-agent.md) — 상위 카테고리
- [A2A](./a2a.md) — 워커 간 통신 표준
- [Narrow Scope](./narrow-scope.md) — 이 패턴의 철학적 기반
- [Plan-and-Execute](./plan-and-execute.md) — 단일 에이전트에서의 유사 사고

## 2025-2026 핵심 사례 — Anthropic Multi-Agent Research System

Anthropic 공식 (anthropic.com/engineering/multi-agent-research-system, 2025-06):

- **구조:** Claude Opus 4 lead + Claude Sonnet 4 subagents
- **성과:** 단일 Opus 4 대비 내부 research 평가 **+90.2%**
- **비용:** token 소비 **~15× chat, ~4× single-agent**
- **핵심 발견:** *"Token usage가 browsing eval 분산의 80%를 설명"* → 비용 정당화의 정량 근거
- **Scaling rule (명시적 임베딩):** simple fact-finding = 1 agent / 3-10 tool calls; comparison = 2-4 subagents / 10-15 calls each

## 2025-2026 표준 프레임워크

- **LangGraph Supervisor** — 그래프 기반 supervisor 패턴이 표준. Klarna · Uber 프로덕션.
- **CrewAI Flows** (2025 후반) — **44,600+ GitHub stars, 월 4.5억 워크플로우, MCP·A2A native 지원**.
- **OpenAI Agents SDK** (2025-03 GA, Swarm 후속) — handoffs + guardrails + tracing. 2025-10 DevDay AgentKit 발표.
- **Microsoft Agent Framework** (2025-10 발표, AutoGen + Semantic Kernel 통합) — GA Q1 2026, multi-language (C#·Python·Java).
- **Databricks Supervisor Agent** (2025) — enterprise blueprint로 정착.

## A2A (Agent-to-Agent)

MCP와 함께 **Linux Foundation 표준**으로 합류 (2025-12 AAIF). 에이전트 간 통신 프로토콜.

## 출처

- Anthropic Engineering, "How we built our multi-agent research system", anthropic.com, 2025-06
- LangGraph Supervisor 공식 문서 (2025)
- Databricks Multi-Agent Supervisor Architecture 블로그 (2025)
- OpenAI Agents SDK 공식 문서 (2025)
- Deloitte 2026 TMT Predictions

본 엔티티의 2025-2026 자료는 `wiki/sources/web/2026-04-17_agent-design-patterns-2025-2026.md`에 상세 보존.

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
- 2026-04-17 — Anthropic 사례(+90.2%/15×), 2025 프레임워크 4종, A2A Linux Foundation 표준화 추가.
