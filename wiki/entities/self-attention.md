# Self-Attention

**Category:** 개념 / 메커니즘
**Status:** stable
**Last updated:** 2026-04-11

## TL;DR

[Transformer](./transformer.md)의 핵심 메커니즘. 한 단어가 문장 안의 **모든 다른 단어**를 동시에 참조해서 자신의 의미를 결정한다. RNN의 "순차 처리 → 정보 손실" 문제를 깨뜨린 결정적 혁신.

## 설명

### Query, Key, Value

각 단어는 세 가지 벡터로 표현된다:
- **Query (Q)** — "내가 누구를 찾고 있나"
- **Key (K)** — "나는 이런 정보를 갖고 있어"
- **Value (V)** — "내가 갖고 있는 실제 정보"

각 단어의 Q와 다른 단어들의 K를 비교(dot product)해서 attention score를 계산한다. 점수가 높은 단어의 V를 더 많이 가져온다.

### 직관 예시

문장: "I saw the bank by the river"

"bank"의 Q는 다음과 같이 생각한다: "내 주변에 강 관련 단어가 있나?"
- "river"의 K: "나는 강 관련이야" → 매치도 높음 → "bank" = 강둑
- "money"가 있었으면: "나는 금융 관련" → 매치도 높음 → "bank" = 은행

이 모든 비교가 **동시에**, **병렬로** 일어난다.

### 왜 혁명적인가

- RNN: 순차 처리, 긴 문장에서 정보 손실
- Transformer + Self-Attention: 모든 위치를 동시에 보기 → 거리 무관 → 병렬 GPU 활용 가능
- 이 덕분에 모델을 거대화할 수 있게 됨 → LLM 시대의 시작

## Reference

- [Part 0 — Ch.04 Transformer가 혁명적인 이유 (Self-Attention)](https://ai-contents-wine.vercel.app/00-llm/)
- [Part 1 — Ch.03 Transformer 아키텍처](https://ai-contents-wine.vercel.app/01-llm/#llm-ch3)

## 연관 entity

- [Transformer](./transformer.md) — 이 메커니즘을 사용하는 아키텍처

## 출처

- "Attention Is All You Need" (Vaswani et al., 2017)
- Part 0 학습 콘텐츠

## 업데이트 이력

- 2026-04-11 — 신규 생성. llm.html ingest에서 등록.
