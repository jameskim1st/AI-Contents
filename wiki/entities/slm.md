# SLM (Small Language Model)

**Category:** 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

1B~7B 파라미터 규모로 스마트폰·노트북·IoT 등 edge 디바이스에서 직접 돌아가는 언어 모델. 2024~2026년 "AI PC" 물결과 함께 폭발적으로 성장했다. 클라우드 없이 개인 데이터 프라이버시를 지키면서 오프라인·저지연·저비용 추론을 가능하게 한다. 큰 모델에서 [증류(Distillation)](./distillation.md)해 만드는 것이 2026년 표준 레시피다.

## 설명

### 정의

SLM은 보통 **1B~7B 파라미터**의 언어 모델을 가리킨다. 클라우드 GPU 클러스터가 아니라 NPU(Neural Processing Unit)·CPU·모바일 GPU 등 **로컬 하드웨어에서 추론**하는 것이 핵심 설계 목표다.

### 주요 모델 (2024~2026)

| 모델 | 개발사 | 파라미터 | 특징 |
|---|---|---|---|
| **Phi-4 / Phi Silica** | Microsoft | 3.8B~14B | Copilot+ PC NPU 최적화. Phi Silica는 Windows에 내장 |
| **OpenELM** | Apple | 270M~3B | Apple Intelligence 온디바이스 추론 |
| **Gemma 3** | Google | 1B~27B | 오픈 웨이트, 멀티모달 지원 |
| **Llama 3.2** | Meta | 1B / 3B | 모바일·edge 특화 경량 버전 |
| **Qwen 3 4B** | Alibaba | 4B | 다국어 강점, thinking/non-thinking 모드 전환 |

### 2026: "AI PC" 물결

- **Copilot+ PC** — Microsoft가 NPU 40 TOPS 이상을 요구하는 새 PC 카테고리를 정의. Phi Silica가 Windows에 탑재되어 로컬에서 요약·검색·생성을 처리한다.
- **Apple Intelligence** — iPhone 15 Pro / M-series Mac에서 OpenELM 기반 모델이 온디바이스로 동작. 개인 데이터는 절대 클라우드에 올리지 않는 "Private Cloud Compute" 아키텍처.
- **Galaxy AI** — Samsung이 Qualcomm NPU + Google Gemma/자체 모델로 번역·요약·사진 편집을 디바이스에서 처리.

### NPU (Neural Processing Unit)

CPU나 GPU가 아닌 **AI 추론 전용 프로세서**. 행렬 곱셈과 저정밀(INT4/INT8) 연산에 최적화되어 SLM을 와트당 최고 효율로 실행한다. Qualcomm Hexagon, Intel NPU, Apple Neural Engine이 대표적.

### 왜 SLM이 필요한가

- **프라이버시** — 개인 이메일·사진·건강 데이터를 클라우드에 보내지 않아도 됨.
- **오프라인** — 비행기·지하철·오지에서도 동작.
- **지연시간** — 네트워크 왕복 없이 밀리초 단위 응답.
- **비용** — API 호출 비용 제로. 디바이스 구매 비용만 발생.

### 로컬 추론 생태계

- **Ollama** — 원클릭으로 SLM을 로컬에서 실행하는 CLI 도구. `ollama run phi4`로 즉시 시작.
- **llama.cpp** — C/C++ 기반 추론 엔진. GGUF 양자화 포맷의 사실상 표준.
- **MLX** — Apple이 만든 Apple Silicon 최적화 ML 프레임워크. M-series에서 llama.cpp보다 빠른 경우가 많음.

## Reference

- [Part 1 — Ch.11 SLM — 작지만 강한 모델](https://ai-contents-wine.vercel.app/01-llm/#llm-ch11)
- [Part 2 — Ch.05 딥러닝과 트랜스포머](https://ai-contents-wine.vercel.app/02-ai-basics/)
- [Part 3 — Ch.07 LLM의 진화](https://ai-contents-wine.vercel.app/03-llm-landscape/)

## 연관 entity

- [Deep Learning](./deep-learning.md) — SLM의 이론적 기반
- [Transformer](./transformer.md) — SLM의 핵심 아키텍처
- [AI Chip Evolution](./ai-chip-evolution.md) — NPU·모바일 칩 진화
- [PII](./pii.md) — SLM이 보호하려는 개인정보
- [Distillation](./distillation.md) — 큰 모델에서 SLM을 만드는 핵심 기법
- [Long Context](./long-context.md) — SLM에서는 컨텍스트 길이가 제한적

## 출처

- Microsoft, "Phi-4 Technical Report", 2024.
- Apple, "OpenELM: An Efficient Language Model Family with Open Training and Inference Framework", 2024.
- Google, "Gemma 3 Technical Report", 2025.
- Qualcomm, "AI Engine Direct — NPU SDK", 2025.
- Meta, "Llama 3.2 Lightweight Models", 2024.

## 업데이트 이력

- 2026-04-12 — 신규 생성.
