# Harness Engineering

**Category:** 방법론 / 패턴
**Status:** stable
**Last updated:** 2026-04-11

## TL;DR

AI 코딩 에이전트의 성패를 결정하는 **컨텍스트·도구·승인·피드백 시스템 설계**. 단순한 프롬프트 엔지니어링의 확장. "에이전트 한 번 잘 돌리는 법"이 아니라 "에이전트가 안정적으로 일할 수 있는 환경을 만드는 법".

## 설명

### 5계층 구조

1. **Prompt** — 한 번의 지시
2. **Context** — Prompt + 관련 자료 + 메모리
3. **Tools** — Read, Write, Bash, Web 등 에이전트가 호출할 수 있는 능력
4. **Approval** — 위험한 행동에 사람의 게이트
5. **Feedback Loop** — 결과 → 평가 → 다음 지시로 연결

> **포함 관계:** Prompt ⊂ Context ⊂ Harness

### 단일 에이전트 vs Harness

- 단일 에이전트: 매번 컨텍스트 다시 구축, 일관성 없음, 위험 행동 차단 어려움
- Harness: [`CLAUDE.md`](./claude-md.md)·승인 게이트·피드백 시스템이 일관성과 안전성을 만든다

### LLM Wiki와의 관계

- Harness Engineering — **1회 작업의 컨텍스트** 를 잘 관리하는 것
- [LLM Wiki](./llm-wiki.md) — **프로젝트 전체의 지식** 을 잘 누적하는 것

같은 사고방식의 두 다른 시간 척도. Harness가 "이번 task"라면, LLM Wiki는 "이 프로젝트가 살아있는 동안 전부".

## Reference

- [Part 6 — Ch.04 하네스 엔지니어링 ⭐](https://ai-contents-wine.vercel.app/06-vibe-master/)

## 연관 entity

- [CLAUDE.md](./claude-md.md) — Harness의 핵심 산출물
- [Claude Code](./claude-code.md) — Harness를 적용하는 대표 도구
- [LLM Wiki](./llm-wiki.md) — Harness의 시간적 확장
- [Vibe Coding](./vibe-coding.md) — Harness가 잘 갖춰진 환경에서의 실제 작업 방식
- [Human-in-the-Loop](./human-in-the-loop.md) — Harness의 Approval Gate 계층
- [ReAct](./react.md), [Reflection](./reflection.md) — Harness 안에서 동작하는 패턴

## 출처

- Part 3 학습 콘텐츠 Ch.04
- 참조 이미지: 5계층 구조, 단일 vs harness 비교, 승인 게이트, 피드백 루프

## 업데이트 이력

- 2026-04-11 — 신규 생성. vibe-master.html ingest에서 등록.
- 2026-04-12 — Human-in-the-Loop, ReAct, Reflection cross-ref 추가.
