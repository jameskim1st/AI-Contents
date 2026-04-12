# Human-in-the-Loop (HITL)

**Category:** 패턴 / 원칙
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

에이전트가 확신 없는 케이스를 자동으로 사람에게 넘기는 패턴. **"100% 자동"이 아니라 "90% 자동 + 10% 사람"** 이 프로덕션 정답. [Production Gap](./production-gap.md)을 줄이는 핵심 메커니즘.

## 설명

### 동작

```
에이전트 작업
    ↓
신뢰도 평가
    ↓
  신뢰도 ≥ 임계값?
   ┌────────┴────────┐
   YES               NO
    ↓                 ↓
자동 처리      → 사람에게 routing
                + 컨텍스트 첨부
```

### 신뢰도 측정 방법

- **LLM-as-judge** — 다른 LLM이 첫 답변을 평가
- **Logprob 임계값** — 토큰 확률이 낮으면 불확실
- **Self-consistency** — 같은 질문 N번 던져서 답이 갈리면 불확실
- **명시적 룰** — "이 카테고리는 무조건 사람" (예: 환불 요청)

### 왜 효과적인가

- **위험한 케이스만 사람** — 사람 비용 절감
- **사람의 판단이 학습 데이터** — 다음 모델 fine-tune에 활용
- **신뢰성 보장** — 100% 자동의 5% 실패 vs 90% 자동의 0.1% 실패. 후자가 안전
- **법적 책임** — 의료·금융 등에서 "사람이 최종 결정"이 법적 요건

### Vibe Coding과의 연결

[Claude Code](./claude-code.md)의 승인 게이트가 정확히 이 패턴. 위험한 명령(rm, force push)에 사람 확인을 받음. [Harness Engineering](./harness-engineering.md)의 "Approval Gate" 계층.

### 예시

- ✅ 고객 지원: 단순 FAQ는 자동, 환불·이상 케이스는 사람
- ✅ 콘텐츠 모더레이션: 명백한 케이스는 자동, 회색지대는 사람
- ✅ 코딩: 문법 수정은 자동, 아키텍처 변경은 사람 승인
- ✅ 의료 진단: 1차 분류는 AI, 최종 진단은 의사

## Reference

- [Part 4 — Ch.03 Narrow Scope 원칙](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/)
- [Part 6 — Ch.04 하네스 엔지니어링 (승인 게이트)](https://ai-contents-wine.vercel.app/06-vibe-master/)

## 연관 entity

- [Narrow Scope](./narrow-scope.md)
- [Harness Engineering](./harness-engineering.md)
- [Production Gap](./production-gap.md)
- [Evaluation](./evaluation.md)

## 출처

- LangChain State of Agent Engineering 2026
- 7 Agentic AI Trends to Watch in 2026

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
