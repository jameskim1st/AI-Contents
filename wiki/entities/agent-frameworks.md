# Agent Frameworks (2026 카탈로그)

**Category:** 도구 / 카탈로그
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

2026년 현재 거의 모든 frontier AI 랩이 자체 에이전트 프레임워크를 보유. **OpenAI Agents SDK**, **Google ADK**, **Anthropic Agent SDK**, **Microsoft AutoGen 0.4 / Semantic Kernel**, **HuggingFace Smolagents**, **LangGraph**, **CrewAI**가 주요 7개. 선택은 "어느 LLM을 쓰나"보다 "어떤 패턴을 쓰나"에 달림.

## 설명

### 주요 프레임워크 비교 (2026)

| 프레임워크 | 회사 | 강점 | 약점 | 적합 |
|---|---|---|---|---|
| **OpenAI Agents SDK** | OpenAI | GPT 통합, 빠른 시작 | OpenAI 의존 | OpenAI 생태계 |
| **Google ADK** | Google | A2A 표준, Gemini 통합 | 신생 | 멀티 에이전트 |
| **Anthropic Agent SDK** | Anthropic | Claude·MCP 통합 | 신생 | Computer Use, Claude 생태계 |
| **AutoGen 0.4** | Microsoft | 멀티 에이전트 성숙 | 학습 곡선 | 연구·실험 |
| **Semantic Kernel** | Microsoft | .NET·엔터프라이즈 | LLM 추상화 비용 | 마이크로소프트 스택 |
| **LangGraph** | LangChain | 그래프 기반 워크플로 | 복잡도 | 복잡한 다단계 |
| **CrewAI** | CrewAI | 역할 기반 멀티 에이전트 | 단순함의 한계 | 빠른 PoC |
| **Smolagents** | HuggingFace | 가볍고 오픈 | 기능 적음 | 학습·실험 |

### 선택 기준

#### 1. 어떤 패턴이 필요한가?
- 단순 ReAct → CrewAI, Smolagents
- 복잡한 그래프 → LangGraph
- 멀티 에이전트 → AutoGen, CrewAI, Google ADK
- Computer Use → Anthropic Agent SDK

#### 2. 어떤 LLM 생태계?
- OpenAI 중심 → OpenAI Agents SDK
- Claude 중심 → Anthropic Agent SDK
- Gemini 중심 → Google ADK
- 멀티 모델 → LangGraph (벤더 중립)

#### 3. 엔터프라이즈 요구사항?
- .NET → Semantic Kernel
- 옵저버빌리티 통합 → LangGraph (LangSmith)
- 강한 권한 모델 → 자체 구축 + MCP

#### 4. 표준 지원?
- MCP 지원 — 거의 모두
- A2A 지원 — Google ADK 우선, 점차 확산

### 5계층 합의 (2026)

```
Application
    ↓
Framework (위 7개 중 하나)
    ↓
Protocols ([MCP](./mcp.md), [A2A](./a2a.md), WebMCP)
    ↓
LLM API (OpenAI, Anthropic, Google, ...)
    ↓
Infrastructure (vector DB, tool servers, observability)
```

### 트렌드: 프레임워크보다 프로토콜

2025년: "어떤 프레임워크 쓸까?"
2026년: "**어떤 프로토콜 따를까?**" (MCP/A2A)

이유: 프레임워크는 갈아끼울 수 있지만, 프로토콜은 생태계가 결정. 프로토콜에 베팅하는 게 장기적으로 안전.

## Reference

- [Part 4 — Ch.10 2026 프레임워크 카탈로그](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/) ⭐

## 연관 entity

- [MCP](./mcp.md) — 표준 1
- [A2A](./a2a.md) — 표준 2
- [LangGraph](./langgraph.md) — 가장 유연한 프레임워크
- [Claude Code](./claude-code.md) — Anthropic SDK 모범

## 출처

- 120+ Agentic AI Tools Mapped (StackOne 2026)
- LangChain State of Agent Engineering 2026
- 7 Agentic AI Trends to Watch in 2026 (MachineLearningMastery)

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
