# DIKW Pyramid (Data-Information-Knowledge-Wisdom)

**Category:** 개념 / 프레임워크
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

1988년 Russell Ackoff가 정식화한, 원시 데이터가 정보·지식·지혜로 상승하는 4단계 계층 모델. "Data → Information → Knowledge → Wisdom"의 피라미드는 **AI 시대에도 여전히 유효한 멘탈 모델**이다. LLM이 아무리 똑똑해도 입력이 쓰레기면 출력도 쓰레기라는 **"Garbage In, Garbage Out"** 원리의 이론적 근거. 2026년 엔터프라이즈 AI 실패 원인 1위가 여전히 "데이터 품질"인 이유다.

## 설명

### 네 단계

1. **Data (데이터)** — 맥락 없는 원시 기록. 예: `37.2`, `2026-04-11`, `서울`. 단독으로는 의미가 없다.
2. **Information (정보)** — 데이터에 맥락·구조가 부여된 것. 예: "2026-04-11 서울의 최고 기온은 37.2도". "Who/What/When/Where"에 답할 수 있는 수준.
3. **Knowledge (지식)** — 정보 간의 관계·패턴·규칙. 예: "37도 이상이면 폭염 경보이고, 이때 전력 수요가 15% 증가한다". "How"에 답한다.
4. **Wisdom (지혜)** — 지식을 기반으로 한 판단·의사결정. 예: "폭염이 예보되니 전력망을 선제적으로 증설해야 한다". "Why"와 "Should"에 답한다.

### AI 시대에 왜 여전히 유효한가

LLM은 **Knowledge 층에서 놀랍게 잘한다**. 그러나 입력되는 Data/Information 층이 오염되면 전체가 붕괴한다:

- 회사 DB에 중복된 고객 레코드 → LLM이 매출을 2배로 잘못 집계
- CRM의 자유 텍스트 필드 80%가 비어있음 → RAG가 답을 못 찾음
- ERP와 재고 시스템의 SKU가 불일치 → 에이전트가 잘못된 발주

**MIT 2024 연구**: 생성형 AI 파일럿 프로젝트의 **95%가 ROI 실패**. 그 원인 1위가 "데이터 품질과 맥락 부족".

### Garbage In, Garbage Out (GIGO)

1957년 IBM 프로그래머들 사이에서 처음 쓰인 격언. **LLM도 예외가 아니다**:

- 잘못된 사실 → 잘못된 답변
- 편향된 학습 데이터 → 편향된 출력
- 오래된 문서 → stale한 지식
- 누락된 맥락 → hallucination

**Claude Code, Copilot 등의 공통 교훈**: 모델이 아니라 `CLAUDE.md`·`AGENTS.md` 같은 **맥락 파일의 품질**이 결과를 결정한다.

### 엔터프라이즈 AI 전략에의 함의

2026년 Gartner Hype Cycle 기준:
- "Data Readiness"가 AI 프로젝트 성공 요인 1위
- 데이터 레이크/웨어하우스보다 **데이터 품질·거버넌스** 투자가 우선
- CDO(Chief Data Officer)의 역할이 CAIO(Chief AI Officer)와 통합되는 추세

## Reference

- [Part 10 — Ch.01 데이터란 무엇인가](https://ai-contents-wine.vercel.app/10-data-basics/)
- [Part 11 — Ch.01 엔터프라이즈 데이터 전략](https://ai-contents-wine.vercel.app/11-data-enterprise/)

## 연관 entity

- [Structured Data](./structured-data.md) — DIKW 피라미드의 밑단 재료
- [Unstructured Data](./unstructured-data.md) — 엔터프라이즈 지식의 80%, DIKW의 원재료
- [Modern Data Stack](./modern-data-stack.md) — DIKW 상승을 자동화하는 도구 체인

## 출처

- Ackoff, R. L. (1989). "From Data to Wisdom". Journal of Applied Systems Analysis.
- MIT Sloan (2024). "The GenAI Divide: State of AI in Business 2025".
- Gartner AI Hype Cycle 2026.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
