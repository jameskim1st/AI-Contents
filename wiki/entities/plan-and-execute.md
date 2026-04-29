# Plan-and-Execute

**Category:** 아키텍처 / 패턴
**Status:** stable
**Last updated:** 2026-04-17

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

## Reference

- [Part 4 — Ch.04 에이전트 디자인 패턴 5선](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch4)
- [Part 3 — Ch.06 Planning](https://ai-contents-wine.vercel.app/03-ai-agents/)

## 연관 entity

- [ReAct](./react.md) — 대조 패턴
- [Reflection](./reflection.md) — Plan 검증에 적용 가능
- [Orchestrator-Worker](./orchestrator-worker.md) — Plan-and-Execute의 멀티 에이전트 형태

## 출처

- Wang et al., "Plan-and-Solve Prompting", ACL 2023, arXiv:2305.04091
- Kim et al., "LLMCompiler", 2024
- LangChain Deep Agents 블로그 (2025), blog.langchain.com/deep-agents/
- LangGraph 공식 LLMCompiler 튜토리얼

## 2025-2026 진화

- **LLMCompiler (Kim et al., 2024)** — Planner / Task Fetching Unit / Joiner 3-component DAG. ReAct·plan-and-execute·ReWOO보다 빠르고 OpenAI parallel tool calling보다도 우위. 2025-2026 LangGraph 공식 튜토리얼 내장.
- **Deep Agents (LangChain, 2025)** — *"long-horizon work에서 ReAct 단순 루프가 깨지는 작업"*을 위한 표준. 4개 미들웨어: Planning tool + 가상 filesystem + subagent spawning + context compression. NVIDIA AI-Q와 결합한 enterprise search 사례. **"Framework가 아닌 harness"**로 평가됨.
- **사라진 변형:** AutoGPT, BabyAGI (2023)는 사실상 시장에서 사라짐. ReWOO는 LLMCompiler에 흡수.
- **비용 우위:** LLMCompiler는 *"DAG eager execution + LLM 호출 횟수 감소"*로 token 비용 절감. Plan-and-Execute가 ReAct보다 작은 모델 사용 가능 (planner만 큰 모델, executor는 작은 모델).

본 엔티티의 2025-2026 자료는 `wiki/sources/web/2026-04-17_agent-design-patterns-2025-2026.md`에 상세 보존.

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
- 2026-04-17 — LLMCompiler 흡수, Deep Agents 2025 진화, AutoGPT/BabyAGI 사라짐 반영.
