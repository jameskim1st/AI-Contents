---
title: "AI Agents 실전 Research Bundle — Part 4 사이클 리서치 모음"
author: (multiple)
date_original: 2026-early
date_ingested: 2026-04-11
source_type: web (bundle)
url_or_path: (여러 URL, 아래 참조)
used_for: Part 5 AI Agents 실전 (Ch.01-10 전반)
---

# AI Agents 실전 Research Bundle

## Context

Part 5 AI Agents 실전 합성 사이클(LLM Wiki 사이클 #1)에서 사용된 WebSearch 결과 bundle. **LangChain State of Agent Engineering 2026**는 중요성이 커서 별도 파일로도 기록 ([여기](./2026-04-12_langchain-state-of-agent-engineering.md)).

## Sources Used

### 1. MCP (Model Context Protocol)
- **URL**: https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/
- **URL**: https://dev.to/pockit_tools/mcp-vs-a2a-the-complete-guide-to-ai-agent-protocols-in-2026-30li
- **URL**: https://dextralabs.com/blog/enterprise-ai-stack-2026-mcp-a2a-domain-models/
- **arXiv**: 2603.13417 — "Bridging Protocol and Production: Design Patterns for Deploying AI Agents with MCP"
- **핵심 통계 ⭐**: 2026년 2월 기준 **월 97M SDK 다운로드** (Python + TypeScript)
- 모든 frontier 랩이 채택: Anthropic · OpenAI · Google · Microsoft · Amazon
- **10,000개 이상의 active MCP 서버**
- **빠진 3가지 primitive**: Identity propagation, Tool budgeting, Structured error semantics

### 2. A2A (Agent-to-Agent Protocol)
- Google 주도
- **3계층 합의 스택**: MCP (tools) + A2A (agents) + WebMCP (web)
- 2026.02 기준 100+ 엔터프라이즈 지지

### 3. Computer Use Agents
- **URL**: https://openai.com/index/introducing-operator/
- **URL**: https://workos.com/blog/anthropics-computer-use-versus-openais-computer-using-agent-cua
- **URL**: https://www.cnbc.com/2026/03/24/anthropic-claude-ai-agent-use-computer-finish-tasks.html
- **핵심 ⭐**:
  - **Anthropic Claude Computer Use** (2026.03 정식)
  - **OpenAI Operator → ChatGPT Agent로 통합**
  - **Manus Desktop** (2026.03.16 출시)

### 4. Production Failures, Eval, Observability
- **URL**: https://machinelearningmastery.com/5-production-scaling-challenges-for-agentic-ai-in-2026/
- **URL**: https://machinelearningmastery.com/7-agentic-ai-trends-to-watch-in-2026/
- **URL**: https://towardsai.net/p/machine-learning/agent-observability-and-evaluation-a-2026-developers-guide-to-building-reliable-ai-agents
- **URL**: https://latitude.so/blog/top-5-ai-agent-evaluation-tools-2026
- **URL**: https://www.braintrust.dev/articles/best-ai-agent-observability-tools-2026
- **핵심**: 비결정성 → 전통 테스트 무력화. "Web agent benchmarks are broken". LangSmith + 커스텀 로깅 + 희망.

### 5. Security for Agents
- **URL**: https://iain.so/security-for-production-ai-agents-in-2026
- **핵심**: Prompt injection이 에이전트 시대의 SQL injection. Computer Use 에이전트 = 가장 큰 공격면.

### 6. 5 Design Patterns 2026
- **URL**: https://explore.n1n.ai/blog/5-ai-agent-design-patterns-master-2026-2026-03-21
- **5 패턴**: ReAct · Reflection · Plan-and-Execute · Tool Use · Multi-Agent Collaboration

### 7. Framework Landscape
- **URL**: https://www.stackone.com/blog/ai-agent-tools-landscape-2026/
- OpenAI Agents SDK, Google ADK, Anthropic SDK, Microsoft AutoGen/Semantic Kernel, HuggingFace Smolagents, LangGraph, CrewAI

## Entities created/updated

Part 4 사이클 17개 신규 entity 중 주요:
- [mcp](../../entities/mcp.md) · [a2a](../../entities/a2a.md) · [computer-use](../../entities/computer-use.md)
- [react](../../entities/react.md) · [reflection](../../entities/reflection.md) · [plan-and-execute](../../entities/plan-and-execute.md)
- [orchestrator-worker](../../entities/orchestrator-worker.md) · [agent-frameworks](../../entities/agent-frameworks.md)
- [prompt-injection](../../entities/prompt-injection.md) · [langgraph](../../entities/langgraph.md)

## Chapters created/updated

Part 5 전 10 챕터 (Ch.01 Production Gap부터 Ch.10 프레임워크 카탈로그까지).
