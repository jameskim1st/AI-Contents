# Multi-Agent

**Category:** 패턴 / 카테고리
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

여러 에이전트가 협업해서 작업을 수행하는 모든 형태. 단일 만능 에이전트의 한계를 극복하는 2026년의 표준 접근. 가장 흔한 형태는 [Orchestrator-Worker](./orchestrator-worker.md). [A2A](./a2a.md) 프로토콜이 통신 표준으로 자리잡는 중. 단순 추가가 아니라 **조정 비용**이 핵심 challenge.

## 설명

### 주요 형태

1. **Orchestrator-Worker** — 상위가 하위에 위임. 가장 흔함. → [상세](./orchestrator-worker.md)
2. **Peer-to-peer** — 동등한 에이전트들이 합의로 진행. 드뭄.
3. **Pipeline** — 순차 위임 (A → B → C). 단순.
4. **Debate** — 여러 에이전트가 토론으로 답 도출. 학술 연구 중심.
5. **Hierarchical** — 다층 위임. 복잡한 조직 모방.

### 왜 단일보다 나은가

- **전문화** — 각자 narrow scope ([Narrow Scope](./narrow-scope.md))
- **병렬화** — 독립 작업은 동시 실행
- **격리** — 한 에이전트 실패 ≠ 전체 실패
- **모델 다양화** — 작업별로 작은/큰 모델 혼용

### 핵심 challenge — 조정 비용

> "Multi-agent architectures where agents delegate to other agents create orchestration complexity that grows almost exponentially"
> — LangChain SoAE 2026

- 에이전트 N개 → 통신 경로 O(N²) 가능
- 각 통신은 LLM 호출 → 비용·지연시간 누적
- 디버깅이 단일 에이전트보다 어려움

### 해결 — 표준화

[A2A](./a2a.md) 프로토콜이 이 문제를 해결하려는 시도. 통신 형식 표준화 → 점대점 통합 폭발 방지.

### 본 콘텐츠에서

- Part 3 Ch.07 — **개념** ("에이전트가 서로 협업한다")
- Part 4 Ch.06 — **운영** (A2A로 어떻게 표준화하나)

같은 주제의 두 시점.

## Reference

- [Part 3 — Ch.07 Multi-Agent 협업](https://ai-contents-wine.vercel.app/03-ai-agents/) (기초)
- [Part 4 — Ch.03 디자인 패턴 5선](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch3)
- [Part 4 — Ch.06 A2A 프로토콜](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch6) (운영)
- [Part 6 — Ch.07 멀티 에이전트 활용](https://ai-contents-wine.vercel.app/06-vibe-master/)

## 연관 entity

- [Orchestrator-Worker](./orchestrator-worker.md)
- [A2A](./a2a.md)
- [Narrow Scope](./narrow-scope.md)
- [Reflection](./reflection.md) — Critic이 별도 에이전트일 때

## 출처

- LangChain State of Agent Engineering 2026
- 5 AI Agent Design Patterns (n1n.ai 2026)

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
