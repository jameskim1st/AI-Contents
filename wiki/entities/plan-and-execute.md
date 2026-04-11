# Plan-and-Execute

**Category:** 아키텍처 / 패턴
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

[ReAct](./react.md)와 달리 **먼저 전체 계획을 세우고, 그다음 단계별로 실행** 하는 패턴. ReAct는 매 단계 계획+실행을 섞지만, Plan-and-Execute는 분리한다. 복잡한 다단계 작업에 적합. LangGraph, AutoGen 등의 기본 패턴.

## 설명

### 동작

```
1. Plan (계획):
   "이 작업을 풀려면 다음 5단계가 필요해:
    Step 1. X 검색
    Step 2. Y 분석
    Step 3. Z 계산
    Step 4. 결과 합성
    Step 5. 보고서 작성"

2. Execute (실행):
   각 step을 순차 또는 병렬로 수행
   step 결과를 다음 step에 전달

3. (선택) Replan:
   중간에 예상과 다르면 계획 수정
```

### ReAct vs Plan-and-Execute

| | ReAct | Plan-and-Execute |
|---|---|---|
| 계획 시점 | 매 단계 | 처음 한 번 (또는 가끔) |
| LLM 호출 | 많음 | 적음 (계획 1번 + 실행 N번) |
| 비용 | 비쌈 | 저렴 |
| 유연성 | 높음 (실시간 적응) | 낮음 (계획 변경 비용) |
| 적합 작업 | 짧은 탐색형 | 긴 다단계 작업 |

### 왜 효과적인가

- "한 번에 큰 그림을 보고 계획"이 LLM의 강점
- 실행 단계는 각 step이 단순해서 작은 모델로도 가능 → **비용 절감**
- 인간의 검토 게이트 끼우기 좋음 (계획 단계에서 사람이 승인)

### 한계

- 처음 계획이 틀리면 전체가 망함
- 계획에 없던 상황에 약함 → Replan 필요
- 단순 작업에는 ReAct보다 무거움

## 강의 어디에 나오나

- [Part 2 — Ch.02 에이전트 디자인 패턴 5선](../../src/content/ai-agents-advanced.html)
- [Part 1 — Ch.06 Planning](../../src/content/ai-agents.html)

## 연관 entity

- [ReAct](./react.md) — 대조 패턴
- [Reflection](./reflection.md) — Plan 검증에 적용 가능
- [Orchestrator-Worker](./orchestrator-worker.md) — Plan-and-Execute의 멀티 에이전트 형태

## 출처

- "Plan-and-Solve Prompting" (Wang et al., 2023)
- LangGraph 공식 문서
- 5 AI Agent Design Patterns (n1n.ai, 2026)

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
