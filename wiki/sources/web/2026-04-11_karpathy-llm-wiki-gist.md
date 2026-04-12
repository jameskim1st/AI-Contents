---
title: "LLM Wiki — Karpathy's Knowledge Compilation Pattern"
author: Andrej Karpathy
date_original: 2026-04-07
date_ingested: 2026-04-11
source_type: gist
url_or_path: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
used_for: Part 8 Ch.09 LLM Wiki · 본 repo의 wiki/ 전체 운영 모델
---

# Karpathy LLM Wiki Gist

## Context

본 repo **전체의 운영 모델** 을 정의한 핵심 source. Andrej Karpathy가 2026년 4월 초 GitHub gist로 공개한 지식 컴파일 패턴으로, AI 커뮤니티에서 며칠 만에 화제가 됨. 본 사이트는 이를 채택해 `wiki/` 디렉토리 자체를 살아있는 데모로 운영.

## Key Points

### Core Concept

> "the LLM **incrementally builds and maintains a persistent wiki** — a structured, interlinked collection of markdown files"

지식을 매 질문마다 재발견(RAG)하는 대신, **LLM이 markdown 위키를 점진적으로 빌드·유지**하게 한다.

### Three-Layer Architecture

1. **Raw Sources** (immutable) — LLM이 읽지만 절대 수정하지 않는 원본 문서
2. **The Wiki** (mutable) — LLM이 생성하는 markdown 파일 (요약, entity, cross-reference)
3. **Schema** (configuration) — `CLAUDE.md` 같은 파일로 wiki 구조·워크플로 정의

### Key Problem It Solves

전통 RAG는 매 질문마다 처음부터 지식을 재발견:
> "the LLM is rediscovering knowledge from scratch on every question. There's no accumulation."

반면 LLM Wiki는 **지식을 누적**한다 — 모순이 한 번에 플래그되고, 상호 참조가 유지되고, 합성이 모든 재료를 반영.

### RAG vs LLM Wiki

| 관점 | RAG | LLM Wiki |
|---|---|---|
| Knowledge Processing | Retrieved at query time | Compiled once, kept current |
| Effort | Re-derives answers each query | Maintains persistent artifact |
| Cross-references | Discovered per query | Already established |
| Contradictions | Handled ad-hoc | Flagged and tracked |

### Core Operations

- **Ingest** — 새 source 처리, wiki 페이지 10~15개 갱신, log 기록
- **Query** — 관련 페이지 검색, 답변 합성, 가치 있는 결과를 다시 wiki로 편입
- **Lint** — 모순·고아·죽은 링크·결손 데이터 점검

### Navigation Files

- `index.md` — 카테고리별 콘텐츠 카탈로그
- `log.md` — 시간순 기록, append-only

### 인간 vs LLM 분담

> "The human curates sources and asks questions; the LLM handles all maintenance bookkeeping."

## Quotes

> "the LLM is rediscovering knowledge from scratch on every question. There's no accumulation."
> — Andrej Karpathy, 2026-04

> "incrementally builds and maintains a persistent wiki — a structured, interlinked collection of markdown files"
> — Karpathy, ibid.

## Entities created/updated

- [llm-wiki](../../entities/llm-wiki.md) ⭐ 이 자료의 직접적 요약
- [karpathy](../../entities/karpathy.md)

## Chapters created/updated

- Part 8 Ch.09 — LLM Wiki: 지식의 컴파일

## Meta

본 파일 자체가 Karpathy 패턴의 살아있는 증거: Raw Source 계층(wiki/sources/)에 원본 gist의 핵심 요약을 기록하고, Wiki 계층(wiki/entities/)에 llm-wiki entity로 추상화, Schema 계층(wiki/schema.md, /CLAUDE.md)에서 운영 규칙을 명시한다.
