---
title: "How we built our multi-agent research system"
authors: ["Jeremy Hadfield", "Barry Zhang", "Kenneth Lien (et al.)"]
publisher: "Anthropic Engineering"
url: "https://www.anthropic.com/engineering/built-multi-agent-research-system"
published: 2025-06-13
ingested: 2026-05-16
type: engineering-blog
status: primary
used_for:
  - "Part 4 Ch.13 — 멀티 에이전트 패턴 완전 분석 (Lead+Sub 패턴, 토큰 비용 통계)"
  - "wiki/entities/multi-agent-topologies.md"
---

## 한 줄 요약

Lead agent (Opus 4) + 병렬 Sub-agent (Sonnet 4) 패턴이 단일 Opus 대비 **+90.2%** 성능. 단 **multi-agent ≈ 15× chat token cost**, **single-agent ≈ 4× chat**. "Each subagent needs an objective, output format, tool guidance, clear boundaries."

## 핵심 사실

### 아키텍처
- **Lead** (Opus 4): query 받아 전략 수립, plan 작성, sub-agent spawn 결정, 결과 종합
- **Sub-agents** (Sonnet 4, 3~5개 병렬): 각자 다른 측면을 탐색 — different search queries / sources / tools
- Context 200k 초과 시 plan을 Memory에 저장
- 결과 Citations agent로 마무리 (출처 추적)

### 성능
- Internal Research Eval (회사 정보 탐색 등): single Opus 4 대비 **+90.2%**
- 병렬 sub-agent로 wall-clock time 단축

### 비용 (2025년 6월 시점)
- "agents typically use about **4× more tokens than chat**"
- "multi-agent systems **15× more tokens than chat**"
- Sub-agent 폭증 (50개) 시 비용 폭발 + 무한 검색 사고

### Sub-agent에 줘야 할 4가지
1. **Objective** — 무엇을 달성?
2. **Output format** — 어떤 형식으로 반환?
3. **Tools/sources guidance** — 어떤 도구·자료 사용?
4. **Clear task boundaries** — 어디까지가 자기 영역?

### 초기 실패 케이스 (논문에서 직접 언급)
- 간단 쿼리에 50개 sub-agent 생성
- 존재하지 않는 source 무한 검색
- Sub-agent끼리 결과 중복

## 콘텐츠 작성 시 활용 포인트

- 토폴로지 SVG의 "Supervisor (Orchestrator-Worker)" 다이어그램의 기본 모델
- 비용 카드: "15× chat / 4× single agent" 수치
- "단일로 시작하라" 권고의 1차 근거

## 관련 출처

- [Anthropic "When to use multi-agent systems"](https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them)
- [Cognition "Don't build multi-agents"](https://cognition.ai/blog/dont-build-multi-agents) — 반대 시각
- [MAST arXiv:2503.13657](https://arxiv.org/abs/2503.13657) — 실패 모드 분석
