# Augmented LLM

**Category:** 개념 / 아키텍처
**Status:** stable
**Last updated:** 2026-04-11

## TL;DR

순수 LLM(다음 토큰 예측만 하는 모델)에 **외부 능력**(도구 호출, 메모리, 검색, 계산기 등)을 붙인 형태. AI 에이전트의 전 단계. "LLM이 자기 한계를 외부로 위임"하는 패턴.

## 설명

### 왜 필요한가

순수 LLM의 한계:
- 계산 못함 (next-token 예측이라 산술 오류)
- 최신 정보 모름 (학습 시점에 멈춤)
- 상태 유지 못함 (대화 끝나면 잊음)
- 외부 시스템 못 건드림

### 무엇을 붙이나

- **Tools** — 계산기, 검색, API, 코드 실행 등
- **Memory** — 단기(컨텍스트), 장기(외부 저장소)
- **Retrieval** — RAG, 벡터 DB, [LLM Wiki](./llm-wiki.md)
- **Planning** — 다단계 추론, ReAct 등

### Agent와의 차이 (회색 지대)

- Augmented LLM: 사람이 도구 호출 시점을 지정/제안
- Agent: LLM이 **스스로** 도구 호출 시점·순서·횟수 결정
- 실제로는 스펙트럼이며 명확한 경계 없음

## Reference

- [Part 2 — Ch.02 Augmented LLM](https://ai-contents-wine.vercel.app/02-ai-agents/)
- [Part 2 — Ch.03 Agent와의 회색 지대](https://ai-contents-wine.vercel.app/02-ai-agents/)

## 연관 entity

- [Memory (Agent)](./memory.md)
- [LLM Wiki](./llm-wiki.md) — 메모리/검색의 진화형
- [MCP](./mcp.md) — 도구 통합의 표준화 (이 entity의 진화형)
- [ReAct](./react.md) — Augmented LLM이 사용하는 가장 기본 패턴

## 출처

- Part 1 학습 콘텐츠

## 업데이트 이력

- 2026-04-11 — 신규 생성. ai-agents.html ingest에서 등록.
- 2026-04-12 — MCP·ReAct cross-ref 추가. Tools 챕터의 진화형으로 MCP 등장.
