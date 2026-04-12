---
title: "Attention Is All You Need"
author: Vaswani et al. (Google Brain / Google Research)
date_original: 2017-06-12
date_ingested: 2026-04-11
source_type: paper
url_or_path: https://arxiv.org/abs/1706.03762
used_for: Part 1 Ch.04 (Self-Attention) · Part 0 Ch.11 (딥러닝 역사)
---

# Attention Is All You Need (Transformer 논문)

## Context

현대 LLM의 **모든 기반** 이 되는 단 하나의 논문. 2017년 발표된 이 논문이 없었다면 GPT, BERT, Claude, Gemini 모두 존재하지 않았을 것. Part 1 (LLM 이해)의 Transformer 챕터와 Part 0 (AI/ML 기초)의 딥러닝 역사에서 모두 참조.

## Key Points

### 핵심 주장
RNN의 순차 처리를 완전히 버리고 **"Attention만"** 으로 sequence transduction이 가능하다.

### Self-Attention의 혁명
- **기존 RNN/LSTM**: 단어를 순서대로 하나씩 처리 → 긴 문장에서 앞 정보 손실, GPU 병렬화 어려움
- **Transformer**: 모든 단어가 모든 단어를 **동시에** 참조 가능 → 거리 무관, 병렬화 가능

### 수식 핵심
- **Query (Q) / Key (K) / Value (V)** 벡터 3종
- Attention(Q, K, V) = softmax(QK^T / √d_k) V
- **Multi-Head Attention**: 서로 다른 관점의 attention을 병렬로 여러 개

### 아키텍처
- Encoder 6층 + Decoder 6층
- Positional Encoding (어순 정보 주입)
- Feed-Forward Network
- Layer Normalization + Residual Connections

### 성능
- WMT 2014 영↔독 번역 BLEU 28.4 (기존 최고 대비 +2.0)
- 훈련 시간이 기존 모델의 일부분

## Quotes

> "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely."
> — Vaswani et al., 2017, Abstract

## 역사적 파급 효과

- **2018**: BERT (Google) — encoder-only Transformer
- **2018**: GPT-1 (OpenAI) — decoder-only Transformer
- **2020**: GPT-3 — 175B 파라미터로 scale의 중요성 증명
- **2022**: ChatGPT — 대중에게 LLM의 존재를 각인
- **2024~**: Claude, Gemini, Llama 3/4 등 모두 Transformer 기반

## Entities created/updated

- [transformer](../../entities/transformer.md)
- [self-attention](../../entities/self-attention.md)
- [neural-network](../../entities/neural-network.md)
- [deep-learning](../../entities/deep-learning.md)

## Chapters created/updated

- Part 1 Ch.04 — Transformer가 혁명적인 이유 (Self-Attention)
- Part 0 Ch.11 — 딥러닝 (역사 타임라인에서 언급)
