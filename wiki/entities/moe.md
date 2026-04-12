# MoE (Mixture of Experts)

**Category:** 아키텍처 / 패턴
**Status:** stable (2026년 표준화 진행 중)
**Last updated:** 2026-04-11

## TL;DR

거대 LLM을 효율적으로 만드는 아키텍처. 모델의 파라미터를 여러 "전문가(expert)"로 나누고, **각 토큰마다 라우터가 일부 전문가만 활성화** 한다. 총 파라미터는 수조 단위지만, 추론 시 활성화는 일부분 → 비용 ↓ 성능 ↑.

## 설명

### 동기

- 모델이 커질수록 성능 향상 (Scaling Law)
- 그러나 dense 모델은 모든 파라미터를 매번 사용 → 비용 폭증
- 해결: "필요한 전문가만 부르기"

### 동작 방식

1. 입력 토큰이 MoE 레이어에 도착
2. **Router** (작은 네트워크)가 어떤 전문가에게 보낼지 결정
3. 보통 Top-2 또는 Top-4 전문가만 활성화
4. 선택된 전문가들의 출력을 가중 합산

### 예시: GPT-4 (추정)

- 총 ~1.8조 파라미터 (Epoch AI 분석, ±30% 신뢰구간)
- 8명의 전문가, 토큰당 2명만 활성화
- 추론 시 실제 활성: ~280B 파라미터

### 2026년 트렌드

- 거의 모든 frontier 모델이 MoE 채택 (GPT-4, Mixtral, DeepSeek 등)
- 라우팅 알고리즘 개선이 핵심 연구 주제
- "Sparse activation"이 표준이 되어가는 중

## Reference

- [Part 0 — Ch.06 MoE — 2026의 새 아키텍처 트렌드](https://ai-contents-wine.vercel.app/00-llm/)
- [Part 1 — Ch.03 Transformer 아키텍처](https://ai-contents-wine.vercel.app/01-llm/#llm-ch3)

## 연관 entity

- [Transformer](./transformer.md) — MoE는 Transformer의 효율화 변형
- [Self-Attention](./self-attention.md) — MoE는 Self-Attention 레이어 사이에 들어가는 FFN 부분을 sparse하게 만든 형태

## 출처

- Epoch AI 분석 (GPT-4 reverse engineering)
- "Outrageously Large Neural Networks" (Shazeer et al., 2017) — 원조 MoE 논문
- Part 0 학습 콘텐츠

## 업데이트 이력

- 2026-04-11 — 신규 생성. llm.html ingest에서 등록.
- 2026-04-12 — Self-Attention cross-ref 추가 (lint에서 고립 entity로 검출됨).
