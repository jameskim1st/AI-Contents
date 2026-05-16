# LLM Wiki

**Category:** 아키텍처 / 패턴
**Status:** stable (제안 단계, 빠르게 확산 중)
**Last updated:** 2026-04-11

## TL;DR

[Andrej Karpathy](./karpathy.md)가 2026년 4월에 GitHub gist로 공개한 지식 관리 패턴. **LLM이 markdown 위키를 점진적으로 빌드·유지하게** 함으로써, RAG처럼 매 질문마다 재검색하는 대신 **지식이 누적되도록** 한다. "검색"이 아니라 **"기억의 운영"** 이다.

## 설명

### 3계층 아키텍처

1. **Raw sources** — 원본 문서. LLM이 읽기만 하고 절대 수정하지 않는다.
2. **Wiki** — LLM이 만들고 유지하는 markdown 페이지. 요약, entity, 상호참조로 구성.
3. **Schema** — `CLAUDE.md`처럼 위키 구조와 워크플로를 정의하는 설정 파일. 우리 프로젝트에서는 [`schema.md`](../schema.md).

### 3가지 핵심 운영

- **Ingest** — 새 자료를 읽고 관련 wiki 페이지 10~15개 갱신, log에 기록
- **Query** — wiki에서 답변하고, 가치 있는 답변은 다시 wiki에 편입
- **Lint** — 모순·고아 페이지·죽은 링크·누락 점검

### RAG와의 차이

| | RAG | LLM Wiki |
|---|---|---|
| 지식 처리 | 매 질문마다 재검색 | 한 번 컴파일, 계속 유지 |
| 누적 | 없음 (매번 새로 발견) | 있음 (지식 자산화) |
| 상호참조 | 매번 새로 발견 | 이미 연결되어 있음 |
| 모순 | 그때그때 처리 | 추적·플래그 |
| 사람이 읽기 | 어렵다 (벡터) | 쉽다 (markdown) |

### 핵심 통찰

> "LLM이 매 질문마다 처음부터 지식을 재발견하고 있다. 누적이 없다."
> — Karpathy

RAG는 검색 시점에 모든 작업을 한다. LLM Wiki는 **컴파일 시점** 에 모든 작업을 미리 해두고, 검색은 단순화한다. "프로그래밍 언어의 인터프리터 vs 컴파일러" 비유와 같다.

### 한계

- 사람의 검토 없이 LLM이 만든 요약이 "공식 지식"으로 굳을 위험
- Lint를 안 하면 모순이 누적
- 대상 자료가 너무 자주 바뀌면 wiki 갱신 비용 > 재검색 비용

## Reference

- [Part 7 — Ch.09 LLM Wiki — 지식의 컴파일](https://ai-contents-wine.vercel.app/07-vibe-master/)
- [Part 3 — Ch.05 Memory](https://ai-contents-wine.vercel.app/03-ai-agents/) (cross-reference)

## 연관 entity

- [Andrej Karpathy](./karpathy.md) — 패턴 제안자
- [CLAUDE.md](./claude-md.md) — Schema 계층의 직접적 조상
- [Harness Engineering](./harness-engineering.md) — 1회 작업의 컨텍스트 관리 (LLM Wiki는 프로젝트 전체의 지식 관리)
- [Memory (Agent)](./memory.md) — 에이전트 메모리 패턴의 야심찬 진화형
- [Claude Code](./claude-code.md) — LLM Wiki를 운영하기 가장 적합한 도구

## 출처

- 원본 gist: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- 한국어 해설 (Dreamwalker, Medium): https://medium.com/@aristojeff/llm-wiki%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%B4%EA%B3%A0-%EC%99%9C-%EC%A7%80%EA%B8%88-%EC%A3%BC%EB%AA%A9%EB%B0%9B%EB%8A%94%EA%B0%80-5c274bdf70ce
- 영문 분석 (Analytics Vidhya, 2026.04): https://www.analyticsvidhya.com/blog/2026/04/llm-wiki-by-andrej-karpathy/
- Personal Knowledge 관점 (evoailabs, Medium): https://evoailabs.medium.com/why-andrej-karpathys-llm-wiki-is-the-future-of-personal-knowledge-7ac398383772

## 업데이트 이력

- 2026-04-11 — 신규 생성. Karpathy gist 공개(2026-04 초)에 이어 등록.
