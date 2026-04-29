# MCP (Model Context Protocol)

**Category:** 프로토콜 / 표준
**Status:** stable (2026년 사실상 표준)
**Last updated:** 2026-04-17

## TL;DR

Anthropic이 2024년 말 제안한, 에이전트가 외부 도구와 데이터에 접근하는 방식의 **개방형 표준**. **2026년 2월 기준 월 97M SDK 다운로드**, Anthropic·OpenAI·Google·Microsoft·Amazon이 모두 채택. "에이전트 생태계의 USB-C". 10,000개 이상의 active MCP 서버 운영 중.

## 설명

### 무엇을 표준화하나

에이전트가 외부 시스템(DB, API, 파일, 도구)에 접근하는 방식을:
- **언어·프레임워크 무관**
- **재사용 가능**
- **권한 관리 가능**
- **검증 가능**

한 형태로 통일.

### 동작 방식

```
[에이전트 (LLM + 클라이언트)]
        ↕  MCP 프로토콜
[MCP 서버 1]  [MCP 서버 2]  [MCP 서버 3]
   GitHub      Slack         Database
```

각 MCP 서버는:
- 어떤 도구·리소스·프롬프트를 제공하는지 선언
- 클라이언트가 호출할 수 있는 함수 노출
- 인증·권한 처리

### 왜 중요한가 (vertical integration)

**Without MCP:**
```
GitHub 도구 — Cursor용, Claude Code용, 자체 구현... (중복 N개)
Slack 도구 — Cursor용, Claude Code용, 자체 구현... (중복 N개)
```

**With MCP:**
```
GitHub MCP 서버 — 1개. 모든 에이전트가 동일 인터페이스로 사용
Slack MCP 서버 — 1개. 동일.
```

### 2026 채택 현황

| 회사 | 지원 |
|---|---|
| Anthropic | 원조 ✓ Claude Desktop·Claude Code 기본 |
| OpenAI | ChatGPT, Agents SDK 통합 |
| Google | Gemini, ADK 통합 |
| Microsoft | Copilot, AutoGen 통합 |
| Amazon | Bedrock 통합 |

### 한계 — "MCP의 빠진 3가지"

2026년 기준 MCP가 표준화하지 못한 것:

1. **Identity propagation** — 사용자 권한이 에이전트→도구로 전달되는 방식
2. **Adaptive tool budgeting** — 도구 호출 횟수·비용 제한
3. **Structured error semantics** — 에러를 에이전트가 이해 가능한 형태로

이게 해결되어야 진정한 enterprise 표준이 됨. → 2026 MCP Roadmap의 우선순위.

### A2A와의 차이

| | MCP | A2A |
|---|---|---|
| 방향 | Agent ↔ System (수직) | Agent ↔ Agent (수평) |
| 목적 | 도구·데이터 접근 | 에이전트 협업 |
| 비유 | USB-C | TCP/IP |

자세히는 [A2A](./a2a.md) 참조. 둘은 보완 관계.

### 3계층 합의 아키텍처 (2026)

```
┌──────────────────┐
│      WebMCP      │  ← 웹 액세스
├──────────────────┤
│       A2A        │  ← 에이전트 ↔ 에이전트
├──────────────────┤
│       MCP        │  ← 에이전트 ↔ 시스템
└──────────────────┘
```

## Reference

- [Part 4 — Ch.04 MCP — 도구 통합의 표준](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/) ⭐ 핵심 챕터
- [Part 3 — Ch.05 Tools](https://ai-contents-wine.vercel.app/03-ai-agents/) (간접 언급, 진화형)

## 연관 entity

- [A2A](./a2a.md) — 보완 프로토콜
- [Augmented LLM](./augmented-llm.md) — Tools의 진화형
- [Claude Code](./claude-code.md) — MCP 클라이언트의 모범 사례

## 출처

- Model Context Protocol 공식 (https://modelcontextprotocol.io)
- 2026 MCP Roadmap (https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/)
- "Bridging Protocol and Production: Design Patterns for Deploying AI Agents with MCP" (arXiv:2603.13417)
- MCP vs A2A: Complete Guide 2026 (DEV Community)
- Enterprise AI Stack 2026 (Dextra Labs)

## 2025-2026 1년사 — 내부 프로토콜에서 산업 표준까지

- **2024-11**: Anthropic 발표
- **2025-03**: OpenAI 공식 채택 (ChatGPT desktop)
- **2025-04**: Google DeepMind Gemini 지원 (Demis Hassabis 발표). 이 시점 다운로드 800만+
- **2025-11**: 1주년 — 5,800+ MCP servers · 300+ clients
- **2025-12 ⭐**: **Linux Foundation 산하 Agentic AI Foundation (AAIF)에 기증**. 공동창립 6사: OpenAI · Anthropic · Google · Microsoft · AWS · Block. **A2A 프로토콜과 함께** 표준화.
- **2025-12 기준**: Python+TS SDK 월 9,700만 다운로드

## 2025-2026 벤치마크 동향

"단일 벤치 무용, 3종 triangulation 필수"가 2025년의 합의:
- **BFCL v3/v4** (Berkeley): single-call precision. Claude Sonnet 4 = **70.29% (3위)**, GPT-5 = 59.22% (7위)
- **τ²-Bench** (Sierra Research, arXiv:2506.07982, 2025-06): dual-control conversational. Claude Sonnet 4.5 multi-turn 선두
- **MCP-Bench / MCPVerse** (Accenture Labs, arXiv:2508.16260): 28 live MCP server, 250 tool 통합 멀티홉

## 2025-10 — Anthropic Skills (MCP 다음 표준 시도)

`name + description`만 system prompt 미리 로딩, 필요할 때 instructions/scripts/resources 동적 로딩. **2025-12 open standard 전환**. MCP 다음 Anthropic의 표준화 시도.

## 출처 (추가)

- modelcontextprotocol.io 공식 1주년 회고, 2025-11-25
- Sierra Research, "τ²-Bench", arXiv:2506.07982, 2025-06
- Accenture Labs, "MCPVerse", arXiv:2508.16260, 2025-08
- Berkeley Function Calling Leaderboard, gorilla.cs.berkeley.edu/leaderboard.html

본 엔티티의 2025-2026 자료는 `wiki/sources/web/2026-04-17_agent-design-patterns-2025-2026.md`에 상세 보존.

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
- 2026-04-17 — 1주년 사실, Linux Foundation AAIF 기증, BFCL/τ²/MCP-Bench 벤치마크, Anthropic Skills 추가.
