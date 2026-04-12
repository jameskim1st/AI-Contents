# Vibe Coding

**Category:** 방법론
**Status:** stable
**Last updated:** 2026-04-11

## TL;DR

자연어로 의도를 설명하고 AI 에이전트가 코드를 작성·실행·수정하는 방식의 코딩. "직접 한 줄씩 타이핑" 대신 "AI에게 무엇을 만들지 말로 설명". 단순 자동완성을 넘어 **에이전트가 다단계로 작업** 한다는 점이 핵심.

## 설명

### 단계별 발전

1. **자동완성** (GitHub Copilot 초기) — 다음 줄 추천
2. **대화형 코딩** (ChatGPT 코드 블록 복사) — 인간이 중개
3. **에이전트 코딩** (Claude Code, Cursor Agent, Codex) — AI가 직접 파일 수정·실행·테스트

3단계가 진정한 vibe coding.

### 잘하는 사람의 특징

- "원하는 것을 글로 먼저" — 명세를 분명히
- **규칙을 문서로 고정** — [CLAUDE.md](./claude-md.md) 활용
- 결과를 사람이 검증

### 패러독스

- "AI가 코드를 짜준다 → 기초가 덜 중요해진다" → **틀렸다**
- 오히려 AI 출력을 검증·설계·방향잡기 위해 **기초가 더 중요해졌다**

### 관련 패턴

- [Harness Engineering](./harness-engineering.md) — vibe coding이 안정적으로 돌아가는 환경 만들기
- [LLM Wiki](./llm-wiki.md) — 프로젝트 지식을 사람과 AI가 함께 누적

## Reference

- [Part 7 — 바이브코딩 (전반)](https://ai-contents-wine.vercel.app/07-vibe-basic/)
- [Part 8 — 바이브코딩 심화 (전반)](https://ai-contents-wine.vercel.app/08-vibe-master/)

## 연관 entity

- [Claude Code](./claude-code.md)
- [Harness Engineering](./harness-engineering.md)
- [CLAUDE.md](./claude-md.md)

## 출처

- Part 2, Part 3 학습 콘텐츠

## 업데이트 이력

- 2026-04-11 — 신규 생성. vibe-master.html ingest에서 등록.
