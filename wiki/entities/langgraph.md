# LangGraph

**Category:** 도구 / 프레임워크
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

LangChain이 만든 그래프 기반 에이전트 프레임워크. 에이전트의 흐름을 명시적 **노드와 엣지** 로 정의해서 ReAct·Plan-and-Execute·Multi-Agent 등 모든 패턴을 표현 가능. LangSmith와 통합되어 [Observability](./observability.md)가 강력. 2026년 가장 유연한 에이전트 프레임워크 중 하나.

## 설명

### 특징

- **그래프 기반** — 노드(작업) + 엣지(전이) 정의
- **State 명시** — 에이전트 상태를 데이터 구조로 관리
- **체크포인트** — 중간 상태 저장 → 재개 가능
- **벤더 중립** — OpenAI, Claude, Gemini 모두 지원
- **LangSmith 통합** — 트레이싱·평가 자동

### 다른 프레임워크와의 차이

| | LangGraph | CrewAI | AutoGen |
|---|---|---|---|
| 추상화 | 그래프 (저수준) | 역할 (고수준) | 대화 (중수준) |
| 학습 곡선 | 가파름 | 완만 | 중간 |
| 표현력 | 매우 높음 | 제한적 | 높음 |
| 적합 | 복잡한 워크플로 | 빠른 PoC | 연구·실험 |

### 강점

- 어떤 에이전트 패턴도 표현 가능
- 체크포인트로 장시간 작업 지원
- LangSmith로 디버깅·평가 통합
- 프로덕션 사례 많음

### 한계

- 학습 곡선 가파름 — 간단한 에이전트도 그래프 정의 필요
- 다른 [Agent Frameworks](./agent-frameworks.md) 비교 표 참조

## Reference

- [Part 3 — Ch.10 2026 프레임워크 카탈로그](https://ai-contents-wine.vercel.app/03-ai-agents-advanced/)

## 연관 entity

- [Agent Frameworks](./agent-frameworks.md) — 카탈로그
- [Observability](./observability.md) — LangSmith 통합
- [Plan-and-Execute](./plan-and-execute.md) — 잘 표현되는 패턴

## 출처

- LangGraph 공식 문서
- LangChain State of Agent Engineering 2026

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
