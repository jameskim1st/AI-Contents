# CLAUDE.md

**Category:** 도구 / 설정 파일
**Status:** stable
**Last updated:** 2026-04-11

## TL;DR

Claude Code가 프로젝트 디렉토리에서 자동으로 읽어 들이는 작업 규칙 파일. "프로젝트 헌법" 역할. [LLM Wiki](./llm-wiki.md)의 Schema 계층의 직접적 조상이며, 본질적으로 같은 아이디어 — **사람이 LLM에게 지속적인 컨텍스트를 미리 제공한다.**

## 설명

### 3부 구조 (권장)

1. **프로젝트 개요** — 이 코드가 뭐 하는 것인지 한 문단
2. **작업 규칙** — 코딩 컨벤션, 금지 사항, 선호 패턴, 테스트 방식
3. **명령어 / 워크플로** — 자주 쓰는 빌드·배포·테스트 커맨드

### 왜 이게 효과적인가

- LLM이 매번 **프로젝트 구조를 다시 추측할 필요가 없다** (= 컨텍스트 절약)
- 사람이 한 번 작성하면 모든 후속 대화에서 자동 반영
- "지시 → 실행"의 루프를 반복할 때 일관성이 유지된다

[Harness Engineering](./harness-engineering.md)의 핵심 산출물 중 하나.

### LLM Wiki Schema와의 차이

| | CLAUDE.md | LLM Wiki Schema |
|---|---|---|
| 대상 | 작업 (한 번의 task) | 지식 (장기 누적) |
| 갱신 | 가끔 (사람이 수동) | 자주 (LLM이 자동) |
| 범위 | 프로젝트 전반 | 위키 운영 |
| 결과물 | 코드 변경 | wiki 페이지 갱신 |

LLM Wiki Schema는 CLAUDE.md를 **지식 관리 영역으로 확장한 형태** 라고 볼 수 있다.

## Reference

- [Part 6 — Ch.05 (Harness Engineering 내)](https://ai-contents-wine.vercel.app/06-vibe-master/)
- [Part 6 — Ch.09 LLM Wiki](https://ai-contents-wine.vercel.app/06-vibe-master/) (Schema와 비교)

## 연관 entity

- [Claude Code](./claude-code.md) — 이 파일을 읽어 들이는 도구
- [Harness Engineering](./harness-engineering.md) — CLAUDE.md를 핵심 산출물로 다룬다
- [LLM Wiki](./llm-wiki.md) — Schema 계층의 진화형

## 출처

- Anthropic Claude Code 공식 문서
- Part 4 학습 콘텐츠

## 업데이트 이력

- 2026-04-11 — 신규 생성. vibe-master.html ingest에서 등록.
