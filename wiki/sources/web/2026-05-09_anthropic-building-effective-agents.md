---
title: "Building Effective Agents"
authors: ["Erik Schluntz", "Barry Zhang"]
publication: "Anthropic Engineering Blog"
date: "2024-12-19"
url: "https://www.anthropic.com/engineering/building-effective-agents"
fetched_at: "2026-05-09"
type: web
license: "Public engineering blog (cite as source)"
used_for:
  - "Part 9 Ch.13 — 엔터프라이즈 AI API 통합 작업 분류 (workflow vs agent 패턴 5종 + Augmented LLM)"
  - "Part 4 Ch.04 디자인 패턴 5선 (이미 인용됨)"
  - "wiki/entities/api-integration-taxonomy.md — Agent Protocol APIs 카테고리 근거"
related_entities:
  - api-integration-taxonomy
  - mcp
  - react
  - reflection
---

## 핵심 요약

Anthropic의 Erik Schluntz·Barry Zhang이 정리한 **에이전트 통합 패턴의 표준 분류**. 2025-2026 업계의 패턴 어휘(prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer, agents)가 이 글에서 굳어졌음.

### 핵심 분류

**기초 빌딩 블록:**
- **Augmented LLM** — 검색·도구·메모리로 강화된 LLM. 모든 에이전트의 출발점

**Workflow 패턴 (예측 가능한 코드 경로):**
1. **Prompt Chaining** — 순차 분해, 각 단계에 프로그래매틱 게이트
2. **Routing** — 입력 분류 → 전문 다운스트림 태스크
3. **Parallelization** — sectioning(독립 서브태스크) 또는 voting(다중 시도)
4. **Orchestrator-Workers** — 중앙 LLM이 동적으로 분해 + 워커에 위임
5. **Evaluator-Optimizer** — 한 LLM이 생성, 다른 LLM이 피드백 (루프)

**Agent 패턴 (모델이 실행 흐름 결정):**
- **Autonomous Agents** — 도구 접근권을 가진 LLM이 환경 피드백 기반 루프

### 주요 인용

- "Success in the LLM space isn't about building the most sophisticated system. It's about building the right system for your needs."
- "Start with simple prompts, optimize them with comprehensive evaluation, and add multi-step agentic systems only when simpler solutions fall short."
- 도구 인터페이스 설계 원칙: **Poka-Yoke** — "Modify arguments to make mistakes harder. Example: requiring absolute filepaths instead of relative ones eliminated model errors in their SWE-bench implementation."
- ACI(Agent-Computer Interface)에 HCI만큼 투자하라.

### 프로토타입 → 프로덕션 전환

| 프로토타입 | 프로덕션 |
|---|---|
| 단일 LLM call + retrieval + in-context examples | Sandboxed 테스트 + 가드레일 + 비용/오류 누적 관리 |
| 프레임워크로 빠르게 시작 | 추상화 레이어 줄이고 직접 API 호출 |

### 통합 관점에서의 핵심

Anthropic는 **MCP(Model Context Protocol)을 third-party 도구 통합의 권장 방식**으로 명시. 프레임워크는 디버깅을 어렵게 한다고 경고하며 직접 API + MCP 조합을 권장.

## 본 사이트에서의 사용

- Part 4 Ch.04 — 디자인 패턴 5선 (기존 인용)
- Part 9 Ch.13 — 엔터프라이즈 API 통합 분류 (Agent Protocol APIs · Tool/Action APIs 섹션의 이론적 근거)

## 관련 wiki entity

- [api-integration-taxonomy.md](../../entities/api-integration-taxonomy.md)
- [react.md](../../entities/react.md)
- [reflection.md](../../entities/reflection.md)
- [orchestrator-worker.md](../../entities/orchestrator-worker.md)
- [mcp.md](../../entities/mcp.md)
