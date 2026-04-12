# Video Generation (영상 생성 AI)

**Category:** 도구 / 모델 카탈로그
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

텍스트·이미지·오디오 입력으로 영상을 생성하는 AI 기술. 2024년 Sora 데모로 폭발적 관심을 모은 뒤, 2025~2026년에는 Sora 2, Veo 3.1, Seedance 2.0 등이 "프로덕션 도구" 수준에 도달했다. 마케팅 팀의 영상 제작 시간을 최대 70% 단축하는 사례가 보고되고 있으며, 할리우드와 광고 업계의 워크플로우를 근본적으로 바꾸고 있다.

## 설명

### 2025~2026: 데모에서 프로덕션으로

2024년 초 OpenAI Sora 데모는 "AI가 영상을 만든다"는 가능성을 보여주었지만 실제 프로덕션 사용은 제한적이었다. 2025년 하반기부터 해상도, 일관성, 물리 시뮬레이션, 오디오 동기화가 급격히 개선되며 실무 도구로 전환되었다.

### 주요 모델 비교 (2026년 기준)

| 모델 | 개발사 | 강점 | 비용 |
|------|--------|------|------|
| **Sora 2** | OpenAI | 복잡 씬의 물리 시뮬레이션, 카메라 제어 | ~$0.15/sec |
| **Veo 3.1** | Google DeepMind | 립싱크 1위, 오디오 동시 생성 | ~$0.12/sec |
| **Seedance 2.0** | ByteDance | 12파일 멀티모달 입력, unified audio-video 생성 | ~$0.08/sec |
| **Gen-4** | Runway | 크리에이티브 컨트롤, 스타일 전이 | ~$0.10/sec |
| **Kling 3.0** | Kuaishou (快手) | 가성비, 긴 영상(~2분) 생성 | ~$0.05/sec |
| **Dream Machine** | Luma AI | 3D 인식 영상, 빠른 생성 속도 | ~$0.07/sec |

### 모델별 상세

**Sora 2** (OpenAI, 2025) — DiT(Diffusion Transformer) 기반. 원래 "세계 시뮬레이터"로 포지셔닝했으며, 중력·충돌·유체 등 물리 법칙을 가장 자연스럽게 재현한다. 최대 1080p, 60초 영상 생성.

**Veo 3.1** (Google DeepMind, 2026) — 립싱크(입 모양과 음성 동기화) 정확도 업계 1위. 영상과 함께 배경음악·효과음·내레이션을 동시에 생성하는 오디오 통합이 핵심 차별점이다.

**Seedance 2.0** (ByteDance, 2025) — 텍스트, 이미지, 오디오, 비디오 등 최대 12개 파일을 동시 입력으로 받아 통합 영상을 생성한다. Unified audio-video 아키텍처로 립싱크와 사운드 디자인을 한 번에 처리한다.

### 실무 임팩트

- **마케팅 팀**: 광고 영상 제작 시간 평균 **70% 감축** (제품 목업 → 30초 영상, 기존 2주 → 2일)
- **교육**: 설명 영상, 시뮬레이션 자동 생성
- **이커머스**: 상품 소개 영상 대량 생산
- **영화·광고**: 프리비즈, VFX 프로토타이핑

### 기술 기반

대부분의 최신 영상 생성 모델은 [Diffusion Models](./diffusion-models.md) 기반이며, 특히 DiT(Diffusion Transformer) 아키텍처를 채택한다. 시간축(temporal dimension)을 추가하여 프레임 간 일관성을 유지하는 것이 핵심 과제다.

## Reference

- [Part 2 — Ch.10 영상·음성·월드 모델](https://ai-contents-wine.vercel.app/02-llm/#llm-ch10)
- [Part 10 — Ch.02 비디오 생성 AI](https://ai-contents-wine.vercel.app/09-multimodal/#비디오-생성-ai)

## 연관 entity

- [Diffusion Models](./diffusion-models.md) — 영상 생성의 기반 아키텍처
- [Image Generation](./image-generation.md) — 영상 생성의 전 단계, 프레임 단위 기술 공유
- [Voice AI](./voice-ai.md) — 오디오 동시 생성 (Veo 3.1, Seedance 2.0)
- [World Models](./world-models.md) — 영상 생성의 다음 세대

## 출처

- 각 모델 공식 발표 및 벤치마크 (2025~2026)
- Part 10 학습 콘텐츠

## 업데이트 이력

- 2026-04-12 — 신규 생성.
