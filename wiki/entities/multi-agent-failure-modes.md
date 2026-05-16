# Multi-Agent Failure Modes (MAST)

**Category:** AI Agents / 실패 분석
**Status:** stable (2026-05)
**Last updated:** 2026-05-16

## TL;DR

UC Berkeley + MultiOn의 **MAST 연구** (arXiv:2503.13657, 2025-03): 1,600+ trace 분석으로 **14가지 멀티 에이전트 실패 모드**를 3 카테고리로 분류. 핵심 발견: **실패는 개별 LLM 능력 부족이 아니라 조직 설계 문제**. 가장 빈번한 5개가 전체의 63%.

## 14개 실패 모드 (3 카테고리)

### FC1 — Specification & System Design (41.77%)
| 코드 | 모드 | 빈도 | 설명 |
|---|---|---|---|
| 1.1 | Disobey task spec | 10.98% | 처음 지시 어김 |
| 1.2 | Disobey role spec | 0.50% | 자기 역할 벗어남 |
| 1.3 | **Step repetition** | **17.14%** | 같은 step 무한 반복 (1위) |
| 1.4 | Loss of conversation history | 3.33% | 이전 대화 잊음 |
| 1.5 | **Unaware of termination** | **9.82%** | 끝낼 때를 모름 (5위) |

### FC2 — Inter-Agent Misalignment (36.94%)
| 코드 | 모드 | 빈도 | 설명 |
|---|---|---|---|
| 2.1 | Conversation reset | 2.33% | 갑자기 처음으로 |
| 2.2 | **Fail to ask for clarification** | **11.65%** | 모호한 지시에 그냥 진행 (3위) |
| 2.3 | Task derailment | 7.15% | 옆길로 샘 |
| 2.4 | Information withholding | 1.66% | 다른 agent에게 정보 안 줌 |
| 2.5 | Ignored other's input | 0.17% | 다른 agent 무시 |
| 2.6 | **Reasoning-action mismatch** | **13.98%** | 추론은 X, 행동은 Y (2위) |

### FC3 — Task Verification & Termination (21.30%)
| 코드 | 모드 | 빈도 | 설명 |
|---|---|---|---|
| 3.1 | Premature termination | 7.82% | 너무 일찍 종료 |
| 3.2 | No/incomplete verification | 6.82% | 결과 검증 안 함 |
| 3.3 | Incorrect verification | 6.66% | 검증 자체가 틀림 |

## TOP 5 (전체 실패의 63%)

1. **Step repetition (17.14%)** — 같은 step을 무한 반복
2. **Reasoning-action mismatch (13.98%)** — 추론과 행동 따로
3. **Fail to ask clarification (11.65%)** — 모호한 지시에 그냥 진행
4. **Disobey task spec (10.98%)** — 처음 지시 어김
5. **Unaware of termination (9.82%)** — 끝낼 때 모름

## 방어 가이드

### Step repetition (1위) 대책
- Conditional edge에 "이미 본 결과는 skip" 로직
- Stall counter (Magentic-One ≤2)
- max_iterations / recursion_limit

### Reasoning-action mismatch (2위) 대책
- ReAct 프롬프트로 reasoning과 action 명시 분리
- Action 직전에 "이게 reasoning과 일치하는가?" self-check
- Critic agent 추가 (MAR 패턴)

### Fail to ask clarification (3위) 대책
- Prompt에 "모호하면 무조건 사용자에게 질문" 명시
- input-required state 활용 (A2A protocol)
- LangGraph `interrupt()` 노드

### Unaware of termination (5위) 대책
- **4단 방어**: max_iterations + termination function + stall counter + cost guard
- Termination condition을 prompt에 명시
- Supervisor가 매 turn "FINISH인가?" 자체 평가

## Cognition의 추가 관찰 (Flappy Bird 사례)

- Sub-agent들이 서로의 **implicit decision** 모름
- 결과가 충돌해 통합 불가능
- 대책: "Share full traces, not just messages"

## 실무 적용

신규 멀티 에이전트 시스템 출시 전 체크리스트:
- [ ] max_iterations 설정 (LangGraph 기본 25)
- [ ] Termination function 명시
- [ ] Stall counter 또는 동등한 무한루프 방어
- [ ] 비용 일일 한도 알람
- [ ] 모호 지시 시 "사용자에게 질문" 프롬프트
- [ ] Reasoning + Action 분리 (ReAct)
- [ ] 결과 verification 단계 (Generator-Verifier)
- [ ] 전체 trace 로깅 (LangSmith·Langfuse)

## Reference

- [MAST arXiv:2503.13657](https://arxiv.org/abs/2503.13657)
- [Anthropic Multi-Agent Research](https://www.anthropic.com/engineering/built-multi-agent-research-system) — 초기 실패 케이스 (50 sub-agent 폭증)
- [Cognition — Don't Build Multi-Agents](https://cognition.ai/blog/dont-build-multi-agents) — Flappy Bird 사례
- [Part 4 Ch.13 — 멀티 에이전트 실패 모드](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch13)

## 연관 entity

- [multi-agent-topologies.md](./multi-agent-topologies.md)
- [circuit-breaker.md](./circuit-breaker.md)

## 출처

- arXiv:2503.13657 — "Why Do Multi-Agent LLM Systems Fail?" (Berkeley + MultiOn, 2025-03)
- Anthropic Engineering (2025-06)
- Cognition AI blog (2025)

## 업데이트 이력

- 2026-05-16: 신규 작성. MAST 14 모드 + TOP5 방어 가이드 + 출시 전 체크리스트.
