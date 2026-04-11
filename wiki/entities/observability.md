# Observability (Agent)

**Category:** 도구 / 운영
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

에이전트의 매 단계(LLM 호출, 도구 호출, 결과)를 trace로 기록·검색·분석하는 시스템. **89%의 조직이 도입** (LangChain SoAE 2026). 비결정 시스템 디버깅의 유일한 길. LangSmith·Braintrust·Maxim·Latitude·Splunk 등이 주요 도구.

## 설명

### 왜 필요한가

전통적 로깅으로는 부족한 이유:
- 같은 입력이 다른 결과 → "재현 불가"
- 다단계에서 어디서 망가졌는지 추적 어려움
- LLM 응답 품질 자체를 측정해야 함
- 비용·지연시간이 변동적

### 무엇을 trace하나

```
[Trace ID: abc123]
├── User input: "..."
├── Plan step: 
│   ├── LLM call (GPT-4, 1.2s, 234 tokens, $0.012)
│   └── Plan: ["search", "analyze", "summarize"]
├── Execute step 1: search
│   ├── Tool call: web_search("...")
│   └── Result: [...]
├── Execute step 2: analyze  
│   ├── LLM call (Claude, 2.1s, 1.4k tokens, $0.034)
│   └── Result: "..."
└── Final answer: "..."
```

각 단계마다:
- 입력 / 출력
- 토큰 수 / 비용 / 지연시간
- 메타데이터 (사용자, 세션, 모델 버전)
- 에러·재시도

### 주요 도구 (2026)

| 도구 | 회사 | 강점 |
|---|---|---|
| **LangSmith** | LangChain | LangChain·LangGraph 생태계 통합 |
| **Braintrust** | Braintrust | Eval과 트레이싱 통합 |
| **Maxim** | Maxim AI | 멀티 에이전트 시각화 |
| **Latitude** | Latitude | 오픈소스, prompt versioning |
| **Splunk Obs** | Splunk | 엔터프라이즈 통합 |

### 89% vs 52% 갭

| 영역 | 도입률 |
|---|---|
| Observability | **89%** |
| Evaluation | **52%** |

→ "보고는 있는데 평가는 못 한다"는 이상한 상태. 개선 우선순위 1순위. [Evaluation](./evaluation.md) 참조.

### 한계

- "트레이스 인프라가 미성숙" — LangSmith + 커스텀 + 희망의 조합
- 비용 (모든 호출 저장 = 데이터 폭증)
- "환경 차이로 같은 trace 재현 불가" 문제
- 멀티 에이전트에서는 트레이스가 복잡해서 사람이 못 따라감

## 강의 어디에 나오나

- [Part 2 — Ch.07 Observability — 비결정 시스템 디버깅](../../src/content/ai-agents-advanced.html) ⭐

## 연관 entity

- [Evaluation](./evaluation.md) — 보완 영역, 갭의 다른 한쪽
- [Production Gap](./production-gap.md)
- [Multi-Agent](./multi-agent.md) — 트레이스가 복잡해지는 영역

## 출처

- LangChain State of Agent Engineering 2026
- Agent Observability and Evaluation Guide (Towards AI 2026)
- Top 5 AI Agent Observability Platforms 2026 (Maxim)
- Braintrust 5 best AI agent observability tools 2026
- Splunk Observability Q1 2026 update

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
