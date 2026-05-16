# Image Generation (이미지 생성 AI)

**Category:** 도구 / 모델 카탈로그
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

텍스트 프롬프트로 이미지를 생성하는 AI 도구·모델군. 2022년 Stable Diffusion과 Midjourney의 등장으로 대중화되었고, 2025~2026년에는 Flux 1.1 Pro, Imagen 4, Midjourney v7 등이 포토리얼리즘과 프롬프트 정합성에서 프로덕션 수준에 도달했다. 마케팅, 디자인, 게임, 광고 등에서 실무 도구로 자리 잡았다.

## 설명

### 2026년 주요 모델 비교

| 모델 | 개발사 | 강점 | 약점 | 비용 ($/image) |
|------|--------|------|------|----------------|
| **Midjourney v7** | Midjourney | 미적 감각, 아트 디렉션 | 웹 UI 전용, API 제한적 | ~$0.02 |
| **DALL-E 3** | OpenAI | ChatGPT 통합, 텍스트 렌더링 | 포토리얼리즘 약함 | ~$0.04 |
| **Flux 1.1 Pro** | Black Forest Labs | prompt adherence 1위, DiT 기반 | 아트 스타일 다양성 | ~$0.04 |
| **Imagen 4** | Google | 포토리얼리즘, 텍스트 렌더링 최강 | Gemini 생태계 종속 | ~$0.03 |
| **Ideogram 3** | Ideogram | 텍스트 in 이미지, 로고 | 복잡한 씬 구성 | ~$0.03 |
| **Stable Diffusion 3.5** | Stability AI | 오픈소스, 로컬 실행 | 상용 모델 대비 품질 격차 | 무료 (로컬) |

### 모델별 상세

**Flux 1.1 Pro** (Black Forest Labs, 2025) — Stable Diffusion의 핵심 연구자들이 설립한 Black Forest Labs에서 개발. DiT(Diffusion Transformer) 아키텍처 기반으로, 텍스트 프롬프트를 가장 정확하게 따르는 것으로 벤치마크에서 반복 검증되었다. API와 Replicate에서 사용 가능.

**Imagen 4** (Google, 2025) — Google DeepMind의 이미지 생성 모델. 포토리얼리즘에서 업계 최고 수준이며, 이미지 내 텍스트 렌더링이 정확하다. Vertex AI와 Gemini 앱에서 접근 가능.

**Midjourney v7** (2025) — David Holz가 창업한 Midjourney의 최신 버전. 독보적인 미적 감각으로 디자이너·아티스트 커뮤니티에서 압도적 선호. Discord 기반에서 웹 에디터로 전환 중.

### 실무 활용 사례

- **마케팅**: 광고 배너, SNS 이미지 — 외주 대비 제작 시간 80% 단축
- **이커머스**: 상품 목업, 배경 교체
- **게임/엔터**: 컨셉 아트, 스토리보드
- **교육**: 학습 자료 삽화

## Reference

- [Part 2 — Ch.09 멀티모달 LLM](https://ai-contents-wine.vercel.app/02-llm/#llm-ch9)
- [Part 5 — Ch.01 이미지 생성 AI](https://ai-contents-wine.vercel.app/09-multimodal/#이미지-생성-ai)

## 연관 entity

- [Diffusion Models](./diffusion-models.md) — 대부분의 이미지 생성 모델의 기반 아키텍처
- [Video Generation](./video-generation.md) — 이미지 생성의 시간축 확장
- [Multimodal LLM](./multimodal-llm.md) — DALL-E 3 등 LLM 통합 이미지 생성

## 출처

- 각 모델 공식 발표 및 벤치마크 (2025~2026)
- Part 5 학습 콘텐츠

## 업데이트 이력

- 2026-04-12 — 신규 생성.
