# AI 검색 (AI Search)

**Category:** 도구
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

2025~2026년에 "10개의 파란 링크"로 대표되는 기존 검색이 AI 기반 답변 생성 검색으로 빠르게 대체되고 있다. Perplexity가 인용 기반 AI-first 검색으로 월 1억 쿼리를 돌파했고, ChatGPT Search·Google AI Overviews·Phind·Gemini Grounding 등이 각자의 방식으로 시장에 진입했다. 핵심 기술은 [RAG](./rag.md)이며, 에이전트와 결합하면 검색 자체가 도구가 된다.

## 설명

### 주요 AI 검색 서비스

#### Perplexity

"AI-first 검색 엔진"을 표방. 사용자 질문에 대해 웹을 실시간 검색한 뒤, 결과를 종합해 **인용(citation) 기반 답변**을 생성한다. 2025년 월간 쿼리 1억 건 돌파, 기업가치 $9B (2025.12). Pro 버전은 Claude·GPT-4o 등 모델 선택 가능.

#### ChatGPT Search

OpenAI가 2024년 10월 출시한 ChatGPT 내장 검색. 2025년 무료 사용자에게 확대. 대화 흐름 안에서 실시간 웹 검색 결과를 통합하며, Bing 인덱스를 활용한다.

#### Google AI Overviews

2024년 5월 Google I/O에서 발표. 기존 검색 결과 위에 AI가 생성한 요약("AI Overview")을 표시한다. 기존 검색 트래픽에 미치는 영향이 커서 SEO 업계에 큰 파장을 일으켰다.

#### Phind

개발자 특화 AI 검색. 코드 질문에 최적화되어 있으며, 검색 결과에서 코드 스니펫을 자동 추출·합성한다. Stack Overflow의 대안으로 개발자 사이에서 빠르게 성장.

#### Exa

AI 에이전트를 위한 **검색 API**. 사람이 아니라 LLM이 호출하는 것을 전제로 설계되었다. semantic search + keyword search 하이브리드. [MCP](./mcp.md) 서버로도 제공된다.

#### Gemini + Google Search (Grounding)

Google의 Gemini API에서 **Grounding with Google Search** 기능을 활성화하면, 모델이 답변 생성 시 실시간 Google 검색 결과를 참조한다. API 레벨에서 RAG를 구현하지 않아도 최신 정보를 얻을 수 있다.

### 기존 검색의 종말?

- **긍정론** — 단순 정보 검색(날씨·환율·사실 확인)은 AI 답변이 더 빠르고 정확. 10 blue links를 클릭할 이유가 사라진다.
- **반론** — 쇼핑·탐색형 검색·신뢰 검증이 필요한 영역에서는 여전히 링크 기반 검색이 유효. AI 답변의 환각(hallucination)이 신뢰 문제를 야기.
- **2026 현실** — Google 검색 점유율은 여전히 90%+ 이지만, AI Overviews 도입 후 **CTR(클릭률)이 30~40% 감소**했다는 보고가 나오고 있다 (Gartner 2026).

## Reference

- [Part 11 — Ch.06 엔터프라이즈 RAG 설계](https://ai-contents-wine.vercel.app/11-data-enterprise/)
- [Part 7 — Ch.04 Augmented LLM](https://ai-contents-wine.vercel.app/05-agent-master/)

## 연관 entity

- [RAG](./rag.md) — AI 검색의 핵심 기술 패턴
- [Augmented LLM](./augmented-llm.md) — 도구 사용하는 LLM의 일반 프레임
- [MCP](./mcp.md) — Exa 등 검색 서비스를 에이전트에 연결하는 프로토콜
- [Long Context](./long-context.md) — 검색 결과를 더 많이 주입할 수 있는 기반
- [Context Engineering](./context-engineering.md) — 검색 결과를 컨텍스트로 설계하는 방법론

## 출처

- Perplexity 공식 블로그, "100M Monthly Queries", 2025.
- OpenAI, "ChatGPT Search", 2024.10.
- Google, "AI Overviews", Google I/O 2024.
- Gartner, "Search and AI: The New Landscape", 2026 Q1.
- Exa 공식 문서 (exa.ai).

## 업데이트 이력

- 2026-04-12 — 신규 생성.
