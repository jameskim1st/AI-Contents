# Voice AI (AI 음성 기술)

**Category:** 도구 / 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

AI 기반 음성 합성(TTS), 음성 인식(STT), 실시간 음성 대화를 아우르는 기술 영역. 2024~2025년에 세 가지 전환이 동시에 일어났다 — 감정 표현이 가능한 TTS, 200ms 지연의 실시간 음성 대화, 감정 인식 AI. ElevenLabs, OpenAI Realtime API, Hume AI 등이 선두에 있으며, 콜센터·교육·접근성 분야의 UX를 근본적으로 바꾸고 있다.

## 설명

### 2024~2025 세 가지 전환

#### 1. Text-to-Speech (TTS): 기계음에서 감정 표현으로

- **ElevenLabs v3** (2025) — 감정(기쁨, 슬픔, 분노, 속삭임)을 프롬프트로 지정 가능. 25개 언어, 클론 음성 지원. 성우 업계에 큰 파장.
- **OpenAI TTS** — GPT-4o 통합. "alloy", "echo" 등 프리셋 음성 제공. API로 대규모 서비스 구축 가능.
- 한국어 TTS도 자연스러움이 크게 향상 — 억양, 띄어읽기, 감정 반영.

#### 2. Realtime 음성 대화: 타이핑 없는 AI

- **OpenAI Realtime API** (2024.10) — 음성 입력 → AI 응답까지 **200ms 지연**. 전화 수준의 실시간 대화 가능.
- **Gemini Live** (Google) — 대화 중 카메라로 실세계를 보여주며 멀티모달 음성 대화.
- **Claude Voice Mode** (Anthropic) — Claude와의 음성 기반 대화 인터페이스.
- 핵심 변화: 기존 TTS/STT 파이프라인(음성→텍스트→LLM→텍스트→음성)에서 **end-to-end 음성 모델**로 전환. 중간 텍스트 변환 없이 음성을 직접 이해하고 생성한다.

#### 3. 감정 인식: AI가 목소리의 감정을 읽다

- **Hume AI** — 음성의 tone, 피치, 속도 등에서 **감정을 인식**한 뒤 그에 맞게 대응. 예: 사용자가 좌절한 어조면 더 천천히, 공감적으로 응답.
- 콜센터, 상담, 교육 등에서 활용 가능성 큼.

### 오픈소스

- **Kyutai Moshi** — 프랑스 Kyutai 연구소의 오픈소스 **full-duplex** 음성 대화 모델. Full-duplex란 말하는 동시에 듣는 것이 가능하다는 의미로, 사람 간 대화와 동일한 자연스러움을 목표로 한다.

### 실무 활용

- **콜센터**: AI 상담원 — 대기 시간 제거, 24시간 운영
- **접근성**: 시각 장애인용 콘텐츠 읽기, 실시간 통역
- **교육**: AI 튜터와 음성 대화, 발음 교정
- **콘텐츠**: 팟캐스트·오디오북 자동 생성

## Reference

- [Part 2 — Ch.10 영상·음성·월드 모델](https://ai-contents-wine.vercel.app/02-llm/#llm-ch10)
- [Part 5 — Ch.03 음성 AI](https://ai-contents-wine.vercel.app/09-multimodal/#음성-ai)

## 연관 entity

- [Transformer](./transformer.md) — TTS/STT 모델의 기반 아키텍처
- [Multimodal LLM](./multimodal-llm.md) — GPT-4o 등 음성을 네이티브로 처리하는 LLM
- [Video Generation](./video-generation.md) — Veo 3.1, Seedance 2.0의 오디오 통합 생성

## 출처

- OpenAI Realtime API 공식 문서 (2024)
- ElevenLabs v3 발표 (2025)
- Hume AI 기술 문서
- Part 5 학습 콘텐츠

## 업데이트 이력

- 2026-04-12 — 신규 생성.
