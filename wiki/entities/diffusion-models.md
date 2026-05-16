# Diffusion Models (확산 모델)

**Category:** 모델 / 아키텍처
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

노이즈를 점진적으로 제거(denoising)하여 이미지를 생성하는 생성 모델 계열. 2020년 DDPM 논문으로 기초가 놓였고, 2022년 Stable Diffusion으로 대중화되었다. 2024년부터는 Transformer와 결합한 DiT(Diffusion Transformer) 구조가 Sora, Flux 등 차세대 모델의 표준이 되고 있다. 현재 이미지·비디오·오디오 생성의 핵심 기반 기술이다.

## 설명

### 원리: Forward → Reverse

1. **Forward Process** — 원본 이미지에 가우시안 노이즈를 수백~수천 단계에 걸쳐 추가하여 순수 노이즈로 만든다.
2. **Reverse Process** — 신경망이 각 단계에서 노이즈를 예측·제거하며 원본과 유사한 이미지를 복원한다.

학습은 "노이즈를 얼마나 정확히 예측하는가"로 이루어진다. 추론 시에는 순수 랜덤 노이즈에서 출발하여 단계적으로 깨끗한 이미지를 만들어낸다.

### Transformer와의 핵심 차이

| 구분 | Transformer (GPT 등) | Diffusion |
|------|----------------------|-----------|
| 생성 방식 | Autoregressive — 토큰을 순차적으로 생성 | 전체 이미지를 동시에 denoising |
| 강점 | 텍스트, 코드 등 순차 데이터 | 고해상도 이미지·비디오의 공간적 일관성 |
| 병렬성 | 추론 시 순차(느림) | 전체 픽셀 동시 처리(빠름) |

### Latent Diffusion

원본 해상도 픽셀 공간에서 직접 작업하면 계산량이 폭발한다. **Latent Diffusion Model(LDM)** 은 이미지를 VAE(Variational Autoencoder)로 저해상도 latent space에 압축한 뒤 그 공간에서 diffusion을 수행한다. Stable Diffusion이 이 구조를 채택하여 소비자 GPU에서도 이미지 생성이 가능해졌다.

### 주요 진화 타임라인

- **2020**: DDPM (Ho et al.) — 이론적 기반 확립
- **2021**: CLIP + Diffusion 결합 (GLIDE, DALL-E 2) — 텍스트 → 이미지 가능
- **2022**: **Stable Diffusion** (Stability AI / CompVis) — 오픈소스, Latent Diffusion 기반
- **2023**: SDXL — 1024×1024 기본 해상도, 이중 텍스트 인코더
- **2024**: **DiT(Diffusion Transformer)** — U-Net 대신 Transformer를 백본으로 사용. Sora(OpenAI), Flux(Black Forest Labs) 등이 채택
- **2025**: Flux 1.1 Pro — prompt adherence 업계 최고, DiT 기반

### 제어·미세조정 기법

- **ControlNet** (Lvmin Zhang, 2023) — 엣지맵, 포즈, 깊이맵 등 조건을 추가하여 구도·형태 제어
- **LoRA** (Low-Rank Adaptation) — 전체 모델 재학습 없이 수 MB 어댑터로 스타일·캐릭터 미세조정
- **IP-Adapter** — 참조 이미지의 스타일을 전이

## Reference

- [Part 2 — Ch.09 멀티모달 LLM](https://ai-contents-wine.vercel.app/02-llm/#llm-ch9)
- [Part 5 — Ch.01 이미지 생성 AI](https://ai-contents-wine.vercel.app/09-multimodal/#이미지-생성-ai)

## 연관 entity

- [Transformer](./transformer.md) — DiT의 백본 아키텍처
- [Deep Learning](./deep-learning.md) — 확산 모델의 학습 기반
- [Neural Network](./neural-network.md) — 노이즈 예측 네트워크
- [Image Generation](./image-generation.md) — 확산 모델 기반 이미지 생성 도구
- [Video Generation](./video-generation.md) — 확산 모델을 영상으로 확장

## 출처

- "Denoising Diffusion Probabilistic Models" (Ho et al., 2020)
- "High-Resolution Image Synthesis with Latent Diffusion Models" (Rombach et al., 2022)
- "Scalable Diffusion Models with Transformers" (Peebles & Xie, 2023) — DiT 논문
- Part 5 학습 콘텐츠

## 업데이트 이력

- 2026-04-12 — 신규 생성.
