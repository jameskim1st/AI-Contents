# Transformer

**Category:** 모델 / 아키텍처
**Status:** stable
**Last updated:** 2026-04-11

## TL;DR

2017년 Google의 "Attention Is All You Need" 논문에서 제안된 신경망 아키텍처. [Self-Attention](./self-attention.md) 메커니즘을 기반으로 하며, 현재 거의 모든 LLM(GPT, Claude, Gemini)의 기본 구조다. RNN의 순차 처리 한계를 깨고 병렬 처리를 가능하게 했다.

## 설명

### 핵심 혁신: Self-Attention

이전 모델(RNN/LSTM)은 단어를 **순서대로** 처리해서 긴 문장에서 앞 정보를 잊었다. Transformer는 **모든 단어가 모든 단어를 동시에 본다**.

예시: "I saw the bank by the river"
- RNN: "bank"를 볼 때 "river"는 아직 못 봤음 → 금융 기관으로 오해 가능
- Transformer: "bank"가 "river"를 동시에 참조 → 강가의 둑(강둑)으로 정확히 해석

### 구조

- **Encoder** (선택) + **Decoder** (LLM은 보통 decoder-only)
- Multi-Head Attention
- Position Embedding (어순 정보)
- Feed-Forward Network
- Layer Normalization

### 진화

- 2017: 원본 Transformer
- 2018: BERT (encoder-only)
- 2018+: GPT 계열 (decoder-only)
- 2022~: 거대화 (수십~수천억 파라미터)
- 2024~: [MoE](./moe.md) 적용으로 효율화

## Reference

- [Part 0 — Ch.04 Transformer가 혁명적인 이유](https://ai-contents-wine.vercel.app/00-llm/)

## 연관 entity

- [Self-Attention](./self-attention.md) — Transformer의 핵심 메커니즘
- [MoE](./moe.md) — 2026년 거대 Transformer의 효율화 트렌드

## 출처

- "Attention Is All You Need" (Vaswani et al., 2017)
- Part 0 강의 콘텐츠

## 업데이트 이력

- 2026-04-11 — 신규 생성. llm.html ingest에서 등록.
