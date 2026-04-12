# Orchestrator-Worker (Puppeteer Pattern)

**Category:** 아키텍처 / 패턴
**Status:** stable
**Last updated:** 2026-04-12

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

- [Part 2 — Ch.07 Multi-Agent 협업](https://ai-contents-wine.vercel.app/02-ai-agents/) (기초)
- [Part 3 — Ch.02 에이전트 디자인 패턴 5선](https://ai-contents-wine.vercel.app/03-ai-agents-advanced/)
- [Part 3 — Ch.05 A2A 프로토콜](https://ai-contents-wine.vercel.app/03-ai-agents-advanced/)
- [Part 8 — Ch.07 멀티 에이전트 활용](https://ai-contents-wine.vercel.app/08-vibe-master/)

## 연관 entity

- [Multi-Agent](./multi-agent.md) — 상위 카테고리
- [A2A](./a2a.md) — 워커 간 통신 표준
- [Narrow Scope](./narrow-scope.md) — 이 패턴의 철학적 기반
- [Plan-and-Execute](./plan-and-execute.md) — 단일 에이전트에서의 유사 사고

## 출처

- 7 Agentic AI Trends to Watch in 2026 (MachineLearningMastery)
- LangChain State of Agent Engineering 2026

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
