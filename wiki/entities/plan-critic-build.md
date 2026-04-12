# Plan-Critic-Build

**Category:** 패턴 (코딩 특화)
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

코딩 에이전트의 실전 패턴: **계획(Plan) → 비판(Critic) → 구현(Build)** 의 3단계 분리. [Reflection](./reflection.md) 패턴의 코딩 특화 버전. 단일 에이전트보다 정확도가 크게 올라감. Vibe Coding의 핵심 워크플로 중 하나.

## 설명

### 동작

```
1. PLAN 에이전트:
   "이 기능을 구현하려면 다음 단계가 필요해..."
   
2. CRITIC 에이전트 (또는 같은 LLM의 다른 페르소나):
   "위 계획에서 누락된 게 있나? 위험은?
    엣지 케이스는?"
   
3. BUILD 에이전트:
   비판된 계획대로 실제 코드 작성
   
4. (선택) 다시 CRITIC: 코드 리뷰
```

### 왜 효과적인가

- LLM은 "코드 작성"과 "코드 비판"을 동시에 잘 못함
- 분리하면 각 단계의 품질 ↑
- 비용은 ~3배지만 정확도는 비대칭으로 ↑
- 사람의 개발 프로세스(설계 → 리뷰 → 구현)와 닮음

### Reflection과의 차이

- [Reflection](./reflection.md) — 일반적 자기 검토
- Plan-Critic-Build — 코딩 특화, 단계가 명시적

### 변형

- **Plan-Critic-Build-Test** — 마지막에 테스트 단계 추가
- **Multi-Critic** — 여러 관점의 비판자 (보안, 성능, 가독성)

## Reference

- [Part 8 — Ch.05 조합하는 패턴 — Plan-Critic-Build, Ralph Loop](https://ai-contents-wine.vercel.app/08-vibe-master/)
- [Part 3 — Ch.02 디자인 패턴 5선](https://ai-contents-wine.vercel.app/03-ai-agents-advanced/) (간접 언급)

## 연관 entity

- [Reflection](./reflection.md) — 일반화된 패턴
- [Vibe Coding](./vibe-coding.md)
- [Claude Code](./claude-code.md) — 이 패턴을 잘 지원

## 출처

- vibe-master.html Ch.05 학습 콘텐츠

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 ingest에서, vibe-master Ch.05 참조.
