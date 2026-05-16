---
title: "Don't Build Multi-Agents"
authors: ["Walden Yan"]
publisher: "Cognition AI (Devin maker)"
url: "https://cognition.ai/blog/dont-build-multi-agents"
published: 2025
ingested: 2026-05-16
type: engineering-blog
status: primary
used_for:
  - "Part 4 Ch.13 — 멀티 에이전트 패턴 (반대 시각, 단일 에이전트 옹호)"
  - "wiki/entities/multi-agent-failure-modes.md"
---

## 한 줄 요약

Devin 메이커의 반대 시각: **"Sub-agent가 만든 결과물은 통합 불가능하다"**. 멀티에이전트 대신 **single-threaded linear agent + context 압축**을 권고. 2개 원칙: (1) Share full traces (메시지가 아니라 trace 전체), (2) Actions carry implicit decisions, 충돌하면 결과 망가짐.

## 핵심 사실

### Flappy Bird 비유 (가장 유명한 사례)
- 작업: "Flappy Bird 클론 만들어"
- Parent agent가 sub-agent 2개에 분배:
  - Sub-agent 1: "Super Mario 풍 배경" 만듦
  - Sub-agent 2: 새 캐릭터를 "Star Wars 풍" 디자인
- Parent가 통합 불가 — 두 결과의 미적·기술적 가정이 충돌
- "Sub-agent들이 서로의 implicit decisions를 모름"

### 2 원칙
1. **Share context, share full agent traces** (단순 message 요약이 아닌 full trace)
2. **Actions carry implicit decisions, conflicting decisions carry bad results**

### Devin의 설계 선택
- **Single-threaded linear agent**
- **Context 압축** — 길어진 context를 LLM이 직접 요약하여 다음 turn에 사용
- 멀티에이전트 회피

### 후속 글 ("Multi-Agents: What's actually working")
- **절충안**: "writes stay single-threaded, reads can be multi-agent"
- 검색·분석(read) 같이 결과가 독립적인 일만 parallel 가능
- 쓰기(write)는 단일 thread로 통합 책임자가 작성

## 콘텐츠 작성 시 활용

- "언제 멀티가 아닌가" 섹션의 핵심 인용
- Flappy Bird 비유는 직관적 시각화 소재
- Read parallel / Write single 가이드라인

## 관련 출처

- [Anthropic Multi-Agent Research](https://www.anthropic.com/engineering/built-multi-agent-research-system) — 반대 시각
- [MAST arXiv:2503.13657](https://arxiv.org/abs/2503.13657) — 실패 모드 41% 가 specification 문제
