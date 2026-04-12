# LangGraph

**Category:** 도구 / 프레임워크
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

LangChain이 만든 그래프 기반 에이전트 프레임워크. 에이전트의 흐름을 명시적 **노드와 엣지** 로 정의해서 ReAct·Plan-and-Execute·Multi-Agent 등 모든 패턴을 표현 가능. LangSmith와 통합되어 [Observability](./observability.md)가 강력. 2026년 가장 유연한 에이전트 프레임워크 중 하나.

## 설명

### Core Architecture: StateGraph

LangGraph의 핵심은 **StateGraph** — 상태를 가진 방향 그래프로, 4가지 구성요소로 이루어진다:

| 구성요소 | 역할 | 설명 |
|---|---|---|
| **State** | 공유 데이터 | TypedDict로 정의, 노드 간 전달되는 상태 객체 |
| **Node** | 작업 단위 | Python/TS 함수, 상태를 입력받아 수정된 상태를 반환 |
| **Edge** | 전이 | 노드 간 연결, 실행 순서 결정 |
| **Conditional Edge** | 조건부 전이 | 라우팅 함수의 반환값에 따라 다음 노드 분기 |

### State 관리

에이전트의 상태를 TypedDict로 명시적으로 정의하고, 노드 간 전달한다:

```python
# 1. State 정의
class AgentState(TypedDict):
    messages: list[BaseMessage]
    next_step: str

# 2. 노드 함수
def call_model(state: AgentState) -> dict:
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

def use_tool(state: AgentState) -> dict:
    return {"messages": [execute_tool(state["messages"][-1])]}

# 3. 라우팅 함수
def should_use_tool(state) -> Literal["tool", "end"]:
    return "tool" if state["messages"][-1].tool_calls else "end"

# 4. 그래프 구성
graph = StateGraph(AgentState)
graph.add_node("model", call_model)
graph.add_node("tool", use_tool)
graph.add_edge(START, "model")
graph.add_conditional_edges("model", should_use_tool, {"tool": "tool", "end": END})
graph.add_edge("tool", "model")
app = graph.compile()
```

State가 명시적이므로 각 단계에서 정확히 어떤 데이터가 흐르는지 추적 가능 — LangGraph의 디버깅·재현성 강점의 핵심이다.

### Conditional Routing

라우팅 함수는 `Literal` 타입으로 가능한 경로를 명시한다 — 도구 사용 여부 분기(ReAct), 에이전트 선택 분기(Multi-Agent Supervisor), 종료 조건 판단(Plan-and-Execute), 에러 핸들링 분기(재시도/폴백/종료) 등.

### Checkpointing

매 노드 실행 후 중간 상태를 자동 저장(SQLite/PostgreSQL)하여 [Human-in-the-Loop](./human-in-the-loop.md)과 장시간 작업을 지원한다:

- **Human-in-the-Loop** — 특정 노드에서 실행을 멈추고 사람 승인 후 재개
- **장시간 작업** — 서버 재시작 후에도 체크포인트에서 이어서 실행
- **타임 트래블** — 이전 체크포인트로 되돌아가 다른 경로로 재실행

### LangSmith 통합

[LangSmith](https://smith.langchain.com)와 네이티브 통합되어 [Observability](./observability.md)를 제공한다. 트레이싱(노드·LLM·도구 호출 자동 기록), 평가(데이터셋 기반 벤치마크), 디버깅(입출력·지연시간·토큰 사용량 시각화), 프롬프트 버전 관리 및 A/B 테스트를 지원.

### LangGraph Platform

프로덕션 배포 인프라: **LangGraph Cloud**(관리형, API 엔드포인트 자동 생성), **Self-hosted**(Docker), **Studio**(그래프 시각화·디버깅 IDE), **Cron/Webhook**(예약 실행·이벤트 트리거).

### 실제 활용 패턴

LangGraph로 구현되는 대표 에이전트 패턴:

| 패턴 | 설명 | 노드 구성 |
|---|---|---|
| **[ReAct](./react.md)** | 추론→행동 루프 | Model ↔ Tool (반복) |
| **[Plan-and-Execute](./plan-and-execute.md)** | 계획 수립 후 실행 | Planner → Executor → Replanner |
| **Multi-Agent Supervisor** | 감독자가 전문 에이전트에 위임 | Supervisor → Agent A / Agent B |
| **RAG Agent** | 검색 보강 생성 | Query → Retrieve → Grade → Generate |
| **Reflection** | 자기 평가 후 개선 | Generate → Critique → Revise (반복) |

### 다른 프레임워크와의 상세 비교

| | LangGraph | CrewAI | AutoGen | [n8n](./n8n.md) |
|---|---|---|---|---|
| **추상화** | 그래프 (저수준) | 역할 (고수준) | 대화 (중수준) | 비주얼 (노코드) |
| **언어** | Python + TypeScript | Python | Python + C# | JavaScript (LangChain JS) |
| **학습 곡선** | 가파름 | 완만 | 중간 | 낮음 |
| **표현력** | 매우 높음 | 제한적 | 높음 | 중간 |
| **상태 관리** | TypedDict 명시적 | 자동 (내부) | 메시지 기반 | 노드 데이터 패싱 |
| **체크포인팅** | 네이티브 지원 | X | 제한적 | X |
| **Human-in-the-Loop** | 네이티브 지원 | X | 제한적 | 수동 구현 |
| **셀프호스팅** | O (Platform) | O | O | O (Docker/K8s) |
| **적합** | 복잡한 프로덕션 워크플로 | 빠른 PoC | 연구·실험 | 비주얼 자동화, 빠른 통합 |

### 2026 현황

- **v1.0** 정식 릴리즈 (2025.10) — API 안정화
- **Python + TypeScript** 이중 지원
- npm 42K+ weekly downloads (TypeScript SDK)
- LangChain State of Agent Engineering 2026 기준 가장 많이 사용되는 에이전트 프레임워크
- LangGraph Platform으로 프로덕션 배포 간소화

### 강점 vs 한계

| 강점 | 한계 |
|---|---|
| 어떤 에이전트 패턴도 표현 가능 | 학습 곡선 가파름 — 간단한 에이전트도 그래프 정의 필요 |
| 체크포인트 → Human-in-the-Loop + 장시간 작업 | LangChain 생태계 의존 |
| LangSmith 통합 (디버깅·평가·트레이싱) | 비주얼 에디터 없음 (구성은 코드로) |
| State 명시적 → 테스트·재현 용이 | 다른 [Agent Frameworks](./agent-frameworks.md) 비교 참조 |

## Reference

- [Part 4 — Ch.11 LangGraph 딥다이브](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch11)
- [Part 4 — Ch.10 2026 프레임워크 카탈로그](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/)

## 연관 entity

- [Agent Frameworks](./agent-frameworks.md) — 카탈로그
- [Observability](./observability.md) — LangSmith 통합
- [Plan-and-Execute](./plan-and-execute.md) — 잘 표현되는 패턴
- [ReAct](./react.md) — 기본 에이전트 패턴
- [Multi-Agent](./multi-agent.md) — Supervisor 패턴
- [Human-in-the-Loop](./human-in-the-loop.md) — 체크포인팅 기반 구현
- [n8n](./n8n.md) — 비주얼 워크플로 자동화 (상호보완)

## 출처

- LangGraph 공식 문서 (langchain-ai.github.io/langgraph)
- LangChain State of Agent Engineering 2026
- LangGraph v1.0 릴리즈 블로그

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
- 2026-04-12 — 대폭 확장. Core Architecture, State 관리, 코드 패턴, Checkpointing, LangSmith, Platform, 활용 패턴, 상세 비교표 추가. 60줄 → 140줄.
