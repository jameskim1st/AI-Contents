# A2A (Agent-to-Agent Protocol)

**Category:** 프로토콜 / 표준
**Status:** stable (2026 표준화 진행 중)
**Last updated:** 2026-04-12

## TL;DR

Google이 주도하는 **에이전트 간 통신 표준** 프로토콜. [MCP](./mcp.md)가 "에이전트 ↔ 시스템"이라면, A2A는 "에이전트 ↔ 에이전트". 멀티 에이전트 시스템에서 워커들이 서로 작업을 위임·조율하는 방식을 표준화. 2026년 2월 기준 100개 이상의 기업이 지지 선언.

## 설명

### 무엇을 표준화하나

에이전트들이 서로:
- 작업 위임 (delegate)
- 결과 공유
- 상태 동기화
- 에러 핸들링
- 권한 협상

### 동작 방식

```
[Orchestrator Agent]
      ↕  A2A
[Worker Agent 1] ↔ [Worker Agent 2]
                A2A
```

### MCP vs A2A 비교

| | MCP | A2A |
|---|---|---|
| 누구와 누구 | Agent ↔ System | Agent ↔ Agent |
| 통합 방향 | 수직 (vertical) | 수평 (horizontal) |
| 주도 기업 | Anthropic | Google |
| 비유 | USB-C / API | TCP/IP / HTTP |
| 사용 예 | "GitHub에서 PR 가져와" | "다른 에이전트에게 코드 리뷰 부탁해" |

### 왜 필요한가

[Orchestrator-Worker](./orchestrator-worker.md) 패턴이 표준화되면서, 에이전트 간 통신을 매번 ad-hoc으로 만들면:
- 표준 부재 → 점대점 통합 폭발
- 권한 모델 부재 → 보안 취약
- 디버깅 불가 → 운영 어려움

A2A는 이 문제를 해결.

### 3계층 합의 아키텍처

A2A는 다음 스택의 중간 계층:

```
┌──────────────────┐
│      WebMCP      │  ← 웹 액세스 표준
├──────────────────┤
│       A2A        │  ← 에이전트 협업 표준 (← 이거)
├──────────────────┤
│       MCP        │  ← 도구 접근 표준
└──────────────────┘
```

자세히는 [MCP](./mcp.md) 참조.

### 한계

- MCP보다 채택 진행 속도 느림 (Google 주도 → 일부 회사 망설임)
- 명세가 아직 진화 중
- 인증·권한 모델이 미완성

### 강의에서 강조점

[Part 1 Ch.07 Multi-Agent](https://ai-contents-wine.vercel.app/02-ai-agents/)는 "에이전트가 서로 협업한다"는 개념만. A2A는 그 협업이 **어떻게 표준 방식으로 구현되는가** 를 다룬다. 개념의 운영적 진화.

## Reference

- [Part 3 — Ch.05 A2A — 멀티 에이전트 통신 표준](https://ai-contents-wine.vercel.app/03-ai-agents-advanced/) ⭐
- [Part 2 — Ch.07 Multi-Agent](https://ai-contents-wine.vercel.app/02-ai-agents/) (전제)

## 연관 entity

- [MCP](./mcp.md) — 보완 프로토콜
- [Orchestrator-Worker](./orchestrator-worker.md) — 주요 사용 패턴
- [Multi-Agent](./multi-agent.md)

## 출처

- Google A2A 공식 발표
- "A Survey of Agent Interoperability Protocols" (arXiv:2505.02279)
- MCP vs A2A 가이드 (DEV Community 2026)
- Enterprise AI Stack 2026

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
