# Claude Code

**Category:** 도구
**Status:** stable
**Last updated:** 2026-04-11

## TL;DR

Anthropic이 만든 터미널 기반 AI 코딩 에이전트. [CLAUDE.md](./claude-md.md) 파일로 프로젝트 컨텍스트를 자동 주입받고, [Harness Engineering](./harness-engineering.md) 패턴을 모범적으로 구현. [LLM Wiki](./llm-wiki.md) 패턴을 운영하기 가장 적합한 도구.

## 설명

### 핵심 특징

- 터미널 네이티브 (CLI)
- 프로젝트 디렉토리에서 `CLAUDE.md` 자동 인식
- 도구: Read, Write, Edit, Bash, Glob, Grep, Web 등
- 승인 게이트: 위험 명령에 사람 확인
- 백그라운드 작업, 서브 에이전트
- VSCode/JetBrains 통합

### 다른 도구와의 비교

- **Cursor** — IDE 통합 중심, GUI 강점
- **GitHub Copilot** — 자동완성 중심
- **Aider** — git 워크플로 강점
- **Codex CLI** — OpenAI 버전, Claude Code와 유사

### LLM Wiki 운영에 적합한 이유

- 파일 시스템 직접 조작 가능 → wiki 파일 갱신
- `CLAUDE.md`로 [Schema](../schema.md) 같은 규칙 주입 가능
- Bash 도구로 lint·검증 자동화 가능
- 사람의 승인 게이트가 자연스럽게 lint 단계에 들어맞음

## Reference

- [Part 6 — 전체](https://ai-contents-wine.vercel.app/06-vibe-master/)
- [Part 6 — Ch.02 왜 Claude Code인가](https://ai-contents-wine.vercel.app/06-vibe-master/)
- [Part 6 — Ch.04 하네스 엔지니어링](https://ai-contents-wine.vercel.app/06-vibe-master/)
- [Part 6 — Ch.09 LLM Wiki](https://ai-contents-wine.vercel.app/06-vibe-master/)

## 연관 entity

- [CLAUDE.md](./claude-md.md)
- [Harness Engineering](./harness-engineering.md)
- [LLM Wiki](./llm-wiki.md)
- [Vibe Coding](./vibe-coding.md)
- [MCP](./mcp.md) — Claude Code는 MCP 클라이언트의 모범 사례
- [Computer Use](./computer-use.md) — Anthropic 에이전트 family
- [Agent Frameworks](./agent-frameworks.md) — Anthropic Agent SDK 카탈로그

## 출처

- Anthropic 공식 문서
- Part 3 학습 콘텐츠

## 업데이트 이력

- 2026-04-11 — 신규 생성. vibe-master.html ingest에서 등록.
- 2026-04-12 — MCP, Computer Use, Agent Frameworks cross-ref 추가.
