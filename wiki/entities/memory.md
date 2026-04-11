# Memory (Agent)

**Category:** 개념 / 컴포넌트
**Status:** stable
**Last updated:** 2026-04-11

## TL;DR

AI 에이전트가 상태를 유지하는 방법. **단기**(현재 대화 컨텍스트)와 **장기**(외부 저장소·DB·파일) 두 종류. 단기는 LLM의 컨텍스트 윈도우 한계가 있고, 장기는 검색·갱신 전략이 필요하다. [LLM Wiki](./llm-wiki.md)는 장기 메모리의 야심찬 진화형.

## 설명

### 단기 메모리 (Short-term)

- LLM의 컨텍스트 윈도우 자체
- 1M 토큰까지 늘어남(Claude, Gemini)
- 비용 대 성능 트레이드오프
- "1M 컨텍스트면 RAG 필요 없나?"는 오해 — 비용·지연·정밀도 면에서 여전히 필요

### 장기 메모리 (Long-term)

여러 패턴이 존재:

1. **벡터 DB + RAG** — 임베딩 저장, 유사도 검색
2. **구조화 메모리** — 테이블·그래프
3. **markdown 파일 시스템** — [LLM Wiki](./llm-wiki.md) 같은 패턴
4. **요약 메모리** — 과거 대화를 LLM이 요약해 저장

### LLM Wiki vs 벡터 RAG

- 벡터 RAG: 매 질문마다 검색·합성. 누적 없음.
- LLM Wiki: 미리 정리·연결·요약. 누적 있음. 사람도 읽을 수 있음.

자세한 비교는 [LLM Wiki](./llm-wiki.md)의 RAG 비교 표 참고.

## 강의 어디에 나오나

- [Part 1 — Ch.05 Memory](../../src/content/ai-agents.html)
- [Part 3 — Ch.09 LLM Wiki](../../src/content/vibe-master.html) (장기 메모리의 진화형)

## 연관 entity

- [Augmented LLM](./augmented-llm.md)
- [LLM Wiki](./llm-wiki.md) — 메모리 패턴의 야심찬 확장

## 출처

- Part 1 강의 콘텐츠

## 업데이트 이력

- 2026-04-11 — 신규 생성. ai-agents.html ingest에서 등록.
