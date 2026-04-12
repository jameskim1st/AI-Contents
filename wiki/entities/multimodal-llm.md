# Multimodal LLM (멀티모달 대규모 언어 모델)

**Category:** 모델 / 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

텍스트뿐 아니라 이미지, 오디오, 비디오 등 여러 모달리티를 동시에 이해하고 생성하는 LLM. 2024년 GPT-4o를 기점으로 "LLM = 텍스트 모델"이라는 공식이 깨졌다. 2026년 현재 Claude 4.5/4.6, Gemini 2.5, GPT-4o 등 주요 모델 모두가 멀티모달을 기본 탑재하며, 별도 모달 모델을 조합하는 방식에서 하나의 통합(Omni) 모델로 수렴하고 있다.

## 설명

### "LLM"이 텍스트만의 영역이 아니게 되다

2023년까지 LLM은 텍스트 입출력이 기본이었고, 이미지를 이해하려면 별도 비전 모델(CLIP 등)을 파이프라인으로 연결했다. 2024년부터 모달리티를 **네이티브로** 통합한 모델이 표준이 되었다.

### 주요 모델

#### GPT-4o (OpenAI, 2024.05)

"Omni"의 의미 그대로, 텍스트 + 비전 + 오디오를 단일 모델에서 네이티브 처리. 이미지를 보고 설명하거나, 음성을 직접 이해하고 음성으로 응답한다. 중간에 별도 STT/TTS를 거치지 않는 end-to-end 구조가 핵심 혁신이었다.

#### Claude 4.5 / 4.6 (Anthropic, 2025~2026)

Vision(이미지·스크린샷 이해) + PDF 문서 분석을 네이티브로 지원. 특히 PDF 내 표, 차트, 다이어그램을 정확히 해석하는 능력이 강점이다. 1M context window(Claude 4.6)로 수백 페이지 문서를 한 번에 처리한다.

#### Gemini 2.0 / 2.5 (Google, 2025~2026)

**2M token context window** — 업계 최대. 텍스트, 이미지, 비디오, 오디오를 모두 네이티브로 처리한다. Gemini Live를 통해 카메라 영상을 실시간으로 보면서 음성 대화하는 멀티모달 경험을 제공한다.

### Omni 모델 vs 별도 모달 모델

| 방식 | 구조 | 장점 | 단점 |
|------|------|------|------|
| **Omni (통합)** | 하나의 모델이 모든 모달리티 처리 | 모달 간 상호 이해, 지연 최소화 | 학습 비용 막대, 각 모달 전문성 희석 가능 |
| **파이프라인 (별도)** | 각 모달별 전문 모델 연결 | 각 모달 최고 성능, 교체 유연 | 모달 간 정보 손실, 지연 누적 |

2026년 트렌드는 **Omni 방향 수렴**이다. 다만 최고 품질이 필요한 경우(예: 스튜디오급 이미지 생성) 전문 모델을 별도로 쓰는 하이브리드 접근도 여전히 유효하다.

### 실무 활용

- **문서 분석**: PDF/이미지 속 표·차트 해석 → 보고서 자동 생성
- **고객 지원**: 사용자가 제품 사진을 보내면 문제 진단
- **교육**: 수식·다이어그램을 보고 설명
- **접근성**: 이미지 설명, 음성 안내

## Reference

- [Part 1 — Ch.09 멀티모달 LLM](https://ai-contents-wine.vercel.app/01-llm/#llm-ch9)
- [Part 9 — Ch.04 멀티모달 LLM](https://ai-contents-wine.vercel.app/09-multimodal/#멀티모달-llm)

## 연관 entity

- [Transformer](./transformer.md) — 멀티모달 LLM의 기반 아키텍처
- [Image Generation](./image-generation.md) — LLM 통합 이미지 생성 (DALL-E 3, Gemini)
- [Voice AI](./voice-ai.md) — 음성 모달리티 통합 (GPT-4o, Gemini Live)
- [Video Generation](./video-generation.md) — 영상 이해·생성과의 연결

## 출처

- GPT-4o 발표 (OpenAI, 2024.05)
- Claude 4.5 발표 (Anthropic, 2025)
- Gemini 2.0 / 2.5 발표 (Google, 2025~2026)
- Part 9 학습 콘텐츠

## 업데이트 이력

- 2026-04-12 — 신규 생성.
