# Context Engineering

**Category:** 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

"Prompt engineering의 상위 개념"으로, 프롬프트 한 줄이 아니라 **에이전트가 받는 전체 컨텍스트**(system prompt + user message + tool results + memory + file content + examples)를 설계하는 방법론. Andrej Karpathy가 2025년 중반 "prompt engineering은 죽었다, context engineering이다"라고 발언하면서 용어가 확산되었다. 2026년 AI 에이전트 시대에 가장 중요한 실무 스킬 중 하나다.

## 설명

### 정의

Context engineering은 LLM이 작업을 수행할 때 **입력으로 받는 모든 정보의 구조와 내용을 의도적으로 설계하는 행위**다. 단순히 "좋은 프롬프트를 쓰는 것"을 넘어, 시스템이 자동으로 조합하는 컨텍스트 전체를 아키텍처 수준에서 통제한다.

### 구성 요소

```
┌─────────────────────────────────────────────┐
│              LLM 입력 컨텍스트               │
├─────────────────────────────────────────────┤
│  1. System Prompt (역할, 규칙, 제약)         │
│  2. User Message (현재 요청)                 │
│  3. Tool Results (검색·API 호출 결과)        │
│  4. Memory (이전 대화 요약, 장기 기억)       │
│  5. File Content (코드, 문서, 데이터)        │
│  6. Examples (few-shot 예시)                 │
│  7. Retrieved Context (RAG 결과)             │
└─────────────────────────────────────────────┘
```

각 요소는 **순서·분량·형식** 모두가 결과 품질에 영향을 미친다.

### Prompt Engineering vs Context Engineering

| 항목 | Prompt Engineering | Context Engineering |
|---|---|---|
| **범위** | 사용자가 쓰는 프롬프트 1개 | 에이전트가 받는 전체 입력 |
| **주체** | 사람이 직접 작성 | 시스템(코드)이 자동 조합 + 사람이 설계 |
| **시대** | ChatGPT (2022~2024) | AI Agent (2025~) |
| **핵심 기술** | 프롬프트 템플릿, few-shot | RAG, memory, tool orchestration, CLAUDE.md |

### Andrej Karpathy의 발언 (2025 중반)

> "I think prompt engineering is dead. The real skill is context engineering — figuring out all the information that needs to go into the context window to make the model do its best work."

이 발언은 에이전트 개발자 커뮤니티에서 빠르게 확산되어, 2025년 하반기부터 "context engineering"이 공식 용어로 자리잡았다.

### 실전 예시

- **[CLAUDE.md](./claude-md.md)** — Claude Code가 프로젝트 디렉토리에서 자동 로드하는 파일. 프로젝트 규칙·아키텍처·코딩 스타일을 컨텍스트에 주입. context engineering의 대표적 구현.
- **[Harness Engineering](./harness-engineering.md)** — AI 에이전트의 입출력 전체를 설계하는 상위 패턴. context engineering은 그 중 "입력" 쪽에 해당.
- **RAG 파이프라인** — 검색 결과를 어떤 순서·형식으로 컨텍스트에 넣을지 설계하는 것 자체가 context engineering.
- **Part 8 (바이브코딩 심화)** — 이미 이 개념을 실천적으로 다루지만, 당시에는 "context engineering"이라는 이름이 없었다.

## Reference

- [Part 1 — Ch.07 Context Engineering](https://ai-contents-wine.vercel.app/01-llm/#llm-ch7)
- [Part 8 — Ch.04 하네스 엔지니어링](https://ai-contents-wine.vercel.app/08-vibe-master/)
- [Part 7 — Ch.02 컨텍스트 설계](https://ai-contents-wine.vercel.app/07-vibe-beyond/)

## 연관 entity

- [Harness Engineering](./harness-engineering.md) — context engineering을 포함하는 상위 패턴
- [CLAUDE.md](./claude-md.md) — context engineering의 대표적 구현체
- [LLM Wiki](./llm-wiki.md) — 컨텍스트를 누적·구조화하는 시스템
- [MCP](./mcp.md) — tool results를 표준화하여 컨텍스트에 주입하는 프로토콜
- [RAG](./rag.md) — retrieved context를 주입하는 핵심 기법
- [Long Context](./long-context.md) — 컨텍스트 창이 커질수록 context engineering의 중요성 증가
- [Memory](./memory.md) — 컨텍스트의 장기 기억 구성 요소

## 출처

- Andrej Karpathy, X(Twitter) 발언, 2025.
- Anthropic, "Claude Code: Best Practices", 2025.
- LangChain, "Context Engineering for AI Agents", 2025.

## 업데이트 이력

- 2026-04-12 — 신규 생성.
