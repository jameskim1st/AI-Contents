# Multi-Agent Topologies

**Category:** AI Agents / 아키텍처 패턴
**Status:** stable (2026-05)
**Last updated:** 2026-05-16

## TL;DR

멀티 에이전트 시스템의 6가지 표준 토폴로지 — **Supervisor · Network · Hierarchical · Sequential · Swarm · Group Chat**. 각각 라우팅 의사결정·통신 방식·종료 조건이 다름. Anthropic·LangChain·Cognition 합의: **단일 에이전트로 시작하라**. 멀티는 비용 4~15× chat, 디버깅 지옥. 도입한다면 Supervisor 또는 Hierarchical이 사실상 표준.

## 6가지 토폴로지

### 1. Supervisor (Orchestrator-Worker) ⭐

```
       ┌──────────────┐
       │  Supervisor  │  ← 라우팅 결정 LLM
       └──┬───┬───┬───┘
          │   │   │
       W1  W2  W3   ← 전문 worker (양방향)
```

- **누가 결정?** Supervisor LLM이 구조화 출력(`RouteResponse(next=...)`)으로 다음 worker 선택
- **통신:** Shared state (LangGraph `MessagesState`)
- **종료:** Supervisor가 `"FINISH"` 토큰 출력 → END
- **장점:** 명확한 책임, 디버깅 쉬움, 가장 안정적
- **단점:** Supervisor가 병목 (단일 진입점)
- **대표:** LangGraph Supervisor, Anthropic Multi-Agent Research (Lead+Sub)

### 2. Network (Peer-to-peer)

```
   A1 ↔ A2
    ↕  ╳ ↕
   A3 ↔ A4   ← 모두-모두 연결 (K4 그래프)
```

- **누가 결정?** 현재 활성 agent가 `Command(goto="A2")`로 다음 지명
- **통신:** Shared state + Command
- **장점:** 자유로운 협업
- **단점:** **디버깅 지옥**, 무한 핑퐁 위험, MAST "Step repetition" 17%가 여기서 빈발
- **대표:** LangGraph custom

### 3. Hierarchical (Team of Teams)

```
              Top-Supervisor
              /            \
       Team-A-Sup         Team-B-Sup
       /     \             /     \
      A1      A2          B1      B2
```

- **누가 결정?** 각 supervisor가 자기 팀 routing. Sibling team 호출 시 `Command(goto="...", graph=Command.PARENT)`
- **통신:** 팀별 sub-state + 부모 state
- **장점:** 대규모 시스템 확장 가능
- **단점:** 깊이 ≥3 시 latency 폭증, 결정 chain 길어짐
- **대표:** LangGraph hierarchical, CrewAI

### 4. Sequential (Pipeline)

```
   Input → A1 → A2 → A3 → Output
                          (1방향 DAG)
```

- **누가 결정?** 코드 (정해진 순서)
- **통신:** A1의 output = A2의 input
- **장점:** 가장 예측 가능, 디버깅 쉬움
- **단점:** 분기 없음, 동적 분배 불가
- **대표:** CrewAI sequential process, MetaGPT (PM → Architect → Engineer)

### 5. Swarm (Handoff)

```
   A1 ─[transfer_to_A2]→ A2 ─[transfer_to_A3]→ A3
   (중앙 조정자 없음, 각 agent가 다음 지명)
```

- **누가 결정?** 현재 agent의 handoff function (예: `def transfer_to_A2(): return agent_A2`)
- **통신:** Handoff 시 conversation 전체 전달
- **장점:** 가볍고 빠른 prototyping
- **단점:** 누가 끝낼지 불명확, MAST "Unaware of termination" 9.82% 빈발
- **대표:** OpenAI Swarm / Agents SDK

### 6. Group Chat (Broadcast)

```
              Manager (LLM speaker selector)
              ↕ pub/sub on shared topic
        ┌─────┴─────┐
       A1    A2    A3   ← 모두가 같은 채널 구독
```

- **누가 결정?** Manager LLM이 4 모드 (`round_robin`, `random`, `manual`, `auto`)
- **통신:** Pub/sub event bus (shared topic + individual topics)
- **장점:** 자유로운 토론, 동적 참여
- **단점:** Context bloat 가속, speaker selection이 LLM이라 비용·지연 추가
- **대표:** AutoGen GroupChat, Microsoft Magentic-One

## 통신 메커니즘 (5종)

| 메커니즘 | 데이터 흐름 | 대표 |
|---|---|---|
| Shared state (dict + reducer) | 모든 agent가 같은 state 읽고 reducer로 merge | LangGraph |
| Message passing | 명시적 message가 다음 agent input | AutoGen, CrewAI |
| Handoff w/ context | 함수 return으로 제어권 + history 전달 | OpenAI Swarm |
| Pub/sub event bus | topic 구독, broadcast | AutoGen GroupChat, A2A |
| Agent-as-tool | sub-agent를 일반 tool처럼 호출, 결과는 string return | OpenAI SDK, Anthropic 권장 |

## 라우팅 결정 방식 (6종)

| 방식 | 누가 결정 | 구현 | 프레임워크 |
|---|---|---|---|
| Function calling 구조화 출력 | Supervisor LLM | `RouteResponse(Pydantic)` | LangGraph supervisor |
| Handoff function | 현재 agent | `def transfer_to_X(): return agent_X` | OpenAI Swarm |
| Speaker selector | Manager LLM | prompt에 참여자 목록 + history → LLM이 이름 출력 | AutoGen |
| Hard-coded order | 코드 | Sequential pipeline | CrewAI sequential |
| Ledger 기반 | Orchestrator | Progress Ledger의 "Q4: 다음 화자는?" | Magentic-One |
| DAG dependency | 코드 | task graph compiler | LLMCompiler |

## 종료 조건 4단 방어

1. **`recursion_limit` / `max_iterations`** — LangGraph 기본 25, 초과 시 강제 종료
2. **Termination function** — `"FINISH"` 토큰, `"approve"` 키워드, `max_consecutive_auto_reply`
3. **Stall counter** — Magentic-One: 2회 진전 없으면 inner→outer 복귀 + 재계획
4. **Cost guard** — 토큰/달러 예산 초과 시 hard stop. MAST "Unaware of termination" 9.82% 단독 비중 → 필수

## 언제 도입하는가 (3가지 조건)

Anthropic·Cognition 합의 — 다음 중 **하나라도** 명확할 때만:

1. **Context pollution** — 단일 agent에 모든 정보 주면 핵심 흐름 흐려짐
2. **진짜 병렬 가능** — 독립적 sub-task가 동시 진행 가능 (예: 5개 회사 동시 리서치)
3. **Tool 폭증** — 50+ tool 시 단일 agent의 선택 정확도 ↓ → 영역별 분리

위 조건 없으면 단일 agent가 거의 항상 우월. "Start with a single agent."

## 비용 현실 (Anthropic 2025-06 보고)

| 시스템 | 토큰 비용 (chat 대비) |
|---|---|
| 일반 chat | 1× |
| Single-agent (tool 사용) | 4× |
| Multi-agent (3~5 sub-agent) | **15×** |

병렬 sub-agent로 wall-clock time은 단축되나 토큰 비용은 늘어남.

## 안티패턴

- **Network 토폴로지 첫 도입** → 디버깅 불가능, 무한 핑퐁
- **Sub-agent 5개+** → 라우팅 혼란, MultiAgentBench도 diminishing return 확인
- **Termination 없음** → 무한 루프 + 비용 폭발
- **모든 agent가 모든 state 보기** → Context bloat, 한 agent의 noise가 전체 오염
- **Sub-agent 간 명확한 boundary 없음** → 같은 일 중복 수행

## Reference

- [Anthropic — How we built our multi-agent research system](https://www.anthropic.com/engineering/built-multi-agent-research-system)
- [Cognition — Don't Build Multi-Agents](https://cognition.ai/blog/dont-build-multi-agents)
- [LangGraph Multi-Agent docs](https://langchain-ai.github.io/langgraph/concepts/multi_agent/)
- [Part 4 Ch.13 — 멀티 에이전트 패턴 완전 분석](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch13)

## 연관 entity

- [multi-agent-failure-modes.md](./multi-agent-failure-modes.md)
- [mcp.md](./mcp.md)
- [a2a.md](./a2a.md)

## 출처

- Anthropic Engineering blog (2025-06-13)
- LangChain LangGraph docs (2026-Q1)
- Cognition AI blog (2025)
- MAST arXiv:2503.13657 (2025-03)
- LangChain Korea wikidocs

## 업데이트 이력

- 2026-05-16: 신규 작성. 6 토폴로지 + 5 통신 + 6 라우팅 + 4단 종료 + 비용 현실 종합.
