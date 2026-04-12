# Production Gap

**Category:** 개념 / 통계
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

2026년 AI 에이전트의 가장 큰 문제. **"60% 이상이 실험 중인데 25% 미만만 프로덕션 도달"**. PoC는 잘 되지만 프로덕션에서는 실패하는 패턴. 비결정성, 평가 도구 부재, scope 욕심이 주요 원인. Gartner는 2026년 말까지 40% 기업 앱이 에이전트를 내장할 거라고 예측하지만 출발점은 5% 미만.

## 설명

### 핵심 통계 (2026)

- **60% 이상** 의 조직이 AI 에이전트 실험 중
- **25% 미만** 만 프로덕션 도달
- **32%** 가 "Quality is the production killer" 응답
- **89%** 가 observability 도입, **52%** 만 evaluation 도입 → 큰 갭
- Gartner: 2025년 5% → 2026년 말 **40%** 기업 앱에 에이전트 내장 예상

### 왜 이런 갭이 생기나

1. **비결정성** — 같은 입력이 다른 결과 → 전통적 테스트 무력화
2. **Scope 욕심** — 만능 에이전트는 데모만 멋지고 프로덕션은 실패 → [Narrow Scope](./narrow-scope.md) 원칙 등장
3. **Evaluation 부재** — 89% obs vs 52% eval 갭. 보는데 평가는 못 함
4. **Observability 미성숙** — 트레이싱 인프라 미흡, "LangSmith + 커스텀 로깅 + 희망"으로 운영
5. **비용 예측 불가** — 에이전트가 도구를 몇 번 부를지 예측 어려움
6. **보안** — Prompt injection, tool exploit 공격면 큼
7. **Hallucination 누적** — 다단계에서 작은 오류가 지수적으로 커짐

### 격차를 줄이는 패턴

[Narrow Scope](./narrow-scope.md) + [Human-in-the-Loop](./human-in-the-loop.md) + [Observability](./observability.md) + [Evaluation](./evaluation.md) — 이 4가지가 프로덕션 도달 에이전트의 공통점.

## Reference

- [Part 4 — Ch.01 왜 PoC는 잘 되는데 프로덕션은 안 되나](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/) ⭐ 핵심 챕터

## 연관 entity

- [Narrow Scope](./narrow-scope.md)
- [Human-in-the-Loop](./human-in-the-loop.md)
- [Observability](./observability.md)
- [Evaluation](./evaluation.md)

## 출처

- 5 Production Scaling Challenges for Agentic AI in 2026 (MachineLearningMastery)
- LangChain State of Agent Engineering 2026
- Gartner AI Agent Predictions 2026
- IBM AI Tech Trends 2026

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
