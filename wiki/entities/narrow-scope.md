# Narrow Scope (Single-Purpose Agent)

**Category:** 패턴 / 원칙
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

"하나의 잘 정의된 작업만 잘하는 에이전트"가 "만능 에이전트"보다 프로덕션에서 압도적으로 성공한다는 원칙. 2026년 LangChain State of Agent Engineering의 핵심 인사이트. **만능을 추구하는 PoC는 화려하지만 프로덕션에서 모두 실패한다.**

## 설명

### 핵심 통찰

> "프로덕션에 도달한 에이전트의 공통점: 좁은 범위, 사람 fallback, 기존 자동화 활용"
> — LangChain State of Agent Engineering 2026

PoC와 프로덕션의 가장 큰 격차는 **scope 욕심** 에서 온다. 데모에서는 만능 에이전트가 멋져 보이지만, 실전에서는:

- 작업이 모호할수록 LLM의 hallucination 확률 ↑
- 도구가 많을수록 잘못된 도구 선택 확률 ↑
- 단계가 길수록 중간 실패 확률 ↑ (지수적)
- 디버깅·관찰·평가가 모두 어려워짐

### 3가지 프로덕션 패턴 (모두 narrow scope에서 출발)

1. **단일 작업 전문화** — 하나만 잘함 (예: "PR 리뷰만", "고객 분류만")
2. **Human-in-the-loop fallback** — 불확실하면 사람에게 (90% 자동 + 10% 사람)
3. **기존 자동화를 액션 레이어로** — Zapier/n8n이 행동, 에이전트는 의사결정만

### 실전 예시

- ❌ 실패한 PoC: "회사 모든 업무를 다 하는 만능 어시스턴트"
- ✅ 프로덕션 성공: "회의록에서 액션 아이템만 추출하는 에이전트"
- ✅ 프로덕션 성공: "고객 문의를 5개 카테고리로 분류만 하는 에이전트"

### Orchestrator-Worker와의 관계

[Orchestrator-Worker](./orchestrator-worker.md) 패턴은 narrow scope의 자연스러운 결과. 만능 에이전트 1개 대신 narrow 워커 N개를 오케스트레이터가 묶는다.

### 적용 가이드

새 에이전트를 만들 때 자문할 것:
1. "한 문장으로 이 에이전트가 뭘 하는지 설명할 수 있나?"
2. "사람이 1분 안에 결과를 검증할 수 있나?"
3. "실패해도 사람이 백업할 수 있나?"

3개 모두 YES가 아니면 scope를 더 좁혀라.

## Reference

- [Part 4 — Ch.03 Narrow Scope 원칙](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/) ⭐
- [Part 4 — Ch.01 왜 PoC는 잘 되는데 프로덕션은 안 되나](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/)

## 연관 entity

- [Orchestrator-Worker](./orchestrator-worker.md) — narrow scope의 직접 구현
- [Production Gap](./production-gap.md)
- [Human-in-the-Loop](./human-in-the-loop.md)

## 출처

- LangChain State of Agent Engineering 2026
- 5 Production Scaling Challenges (MachineLearningMastery, 2026)
- 7 Agentic AI Trends to Watch in 2026

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
