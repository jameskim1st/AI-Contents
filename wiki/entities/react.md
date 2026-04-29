# ReAct (Reasoning + Acting)

**Category:** 아키텍처 / 패턴
**Status:** stable
**Last updated:** 2026-04-17

## TL;DR

LLM이 **Thought → Action → Observation** 사이클을 반복하며 문제를 푸는 가장 기본적인 에이전트 디자인 패턴. "생각한 다음 행동하고, 결과를 보고 다시 생각한다." 2022년 Yao et al. 논문에서 제안되었으며, 현재 거의 모든 에이전트 프레임워크의 기본형.

## 설명

### 동작 사이클

```
Question
   ↓
Thought: "이 질문에 답하려면 X가 필요해"
Action: search("X")
Observation: "결과: ..."
   ↓
Thought: "이 결과로는 부족해, Y도 필요해"
Action: search("Y")
Observation: "결과: ..."
   ↓
Thought: "이제 충분해. 답은..."
Final Answer: ...
```

### 왜 효과적인가

- **Thought** 단계가 LLM의 [Chain-of-Thought](./self-attention.md) 추론을 활용
- **Action** 단계가 [Tools](./augmented-llm.md)와 외부 세계 연결
- **Observation** 단계가 LLM이 자기 행동의 결과를 반영하게 함

### 한계

- 무한 루프 가능 (같은 Thought 반복)
- Thought가 너무 많으면 비용 폭증
- Observation을 잘못 해석하면 오류 누적
- 복잡한 작업은 [Plan-and-Execute](./plan-and-execute.md)가 더 적합

### 변형

- [Reflection](./reflection.md) — ReAct에 자기 검증 단계 추가
- [Plan-and-Execute](./plan-and-execute.md) — 먼저 전체 계획, 그다음 실행
- ReWOO — Reasoning Without Observation (계획 단계에서 도구 호출 분리)

## Reference

- [Part 4 — Ch.03 에이전트 디자인 패턴 5선](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch3)
- [Part 3 — Ch.06 Planning](https://ai-contents-wine.vercel.app/03-ai-agents/) (간접 언급)

## 연관 entity

- [Reflection](./reflection.md) — ReAct의 자기 수정 변형
- [Plan-and-Execute](./plan-and-execute.md) — 복잡한 작업을 위한 대안
- [Augmented LLM](./augmented-llm.md) — Tools가 있어야 ReAct가 가능
- [Memory](./memory.md) — Observation이 단기 메모리에 누적됨

## Princeton + Google Brain 평가 (Yao et al., 2022)

ReAct 논문은 4개 벤치마크에서 평가:
- **HotpotQA** (질의응답) — Wikipedia API 활용 multi-hop QA
- **FEVER** (팩트 검증) — CoT의 환각 직접 극복
- **ALFWorld** (텍스트 게임) — **+34% 성공률**, 모방학습/강화학습 능가 (단 1-2 shot 예시로)
- **WebShop** (웹 탐색) — **+10% 성공률**

핵심 통찰: **ReAct + CoT 하이브리드가 최고 성능** — 모델 내부 지식(CoT) + 외부 환경 정보(ReAct) 결합.

## ReAct vs CoT vs Function Calling

- **CoT**: 순수 추론. 외부 상호작용 ❌. 환각 위험.
- **ReAct**: 추론 + 행동(도구). 외부 정보로 환각 검증·수정.
- **Function Calling**: ReAct의 "어떻게 함수를 호출할지" 형식 표준. 패턴이 아닌 구현 도구. 현대 ReAct 대부분 Function Calling 활용.

**중요:** LLM이 직접 함수를 실행하지 않음. LLM은 "이 함수를 이 인자로 호출해 달라"는 요청을 응답으로 생성하고, 에이전트(코드)가 실제 호출을 수행 → 결과를 다시 LLM에 전달.

## 아키텍처 (이미지 참조)

```
Task → [Agent: LLM ↔ Tools] → Environment
                 ↑               (Action / Result)
              Reasoning
```

LLM은 Environment를 직접 만지지 않고 **항상 Tools를 거침**. Reasoning은 LLM 내부 자기 루프.

## 2025-2026 진화

- **LangGraph 1.0 GA (2025-10)** — `create_react_agent`가 `langchain.agents`로 이동, 표준 기본 에이전트로 정착. Klarna · Uber · LinkedIn 프로덕션. zero breaking changes.
- **Pre-Act** (Sapkota et al., arXiv:2505.09970, 2025-05) — multi-step plan을 미리 만든 뒤 매 step refine. ReAct 대비 **Action Recall +70%**, fine-tuned 70B 모델 action accuracy +69.5%, goal completion +28%. ReAct 단순 루프의 long-horizon 한계를 정면 비판.
- **Autono** (arXiv:2504.04650, 2025-04) — robust 자율 에이전트, hallucination 감소.
- **모델 다운사이징** — 2025 초 70B 필요 → 2026 초 32B 동작, 14B로 75%+ 신뢰도 예측.
- **Smolagents (HuggingFace)** vs **LangGraph** — 같은 ReAct가 40 lines vs 120 lines. 프로토타이핑 vs 프로덕션 분업 정착.

## 출처

- Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models", arXiv:2210.03629, ICLR 2023
- Sapkota et al., "Pre-Act: Multi-Step Planning and Reasoning Improves Acting in LLM Agents", arXiv:2505.09970, 2025-05
- LangGraph 1.0 GA 블로그, blog.langchain.com/langchain-langgraph-1dot0/, 2025-10
- LangChain ReAct agent 문서

본 엔티티의 2025-2026 자료는 `wiki/sources/web/2026-04-17_agent-design-patterns-2025-2026.md`에 상세 보존.

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
- 2026-04-17 — 2025-2026 진화 섹션 추가 (Pre-Act +70%, LangGraph 1.0, 모델 다운사이징).
- 2026-04-17 — Princeton 4 벤치마크 결과(HotpotQA/FEVER/ALFWorld +34%/WebShop +10%), CoT/Function Calling 비교, 아키텍처 다이어그램(Task→Agent[LLM↔Tools]→Environment) 추가. brunch.co.kr/@aideveloper/122 + leewayhertz.com 한국어 해설 참고.
