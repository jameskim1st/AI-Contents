# World Models (월드 모델)

**Category:** 개념 / 연구
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

물리 법칙, 공간 구조, 인과 관계를 내재적으로 이해하여 가상 세계를 시뮬레이션하는 AI 모델. OpenAI는 Sora를 "world simulator"로 정의했고, Google은 Genie 2로 플레이 가능한 가상 세계를 시연했다. 아직 연구 단계이지만, 영상 생성 AI의 다음 세대이자 AGI로 향하는 핵심 경로로 주목받고 있다.

## 설명

### 영상 생성 그 너머

현재의 [영상 생성 AI](./video-generation.md)는 "그럴듯해 보이는 영상"을 만든다. 월드 모델은 한 단계 더 나아가 **세계의 규칙 자체를 이해**하려 한다:

- 공이 떨어지면 튀어 오른다 (물리)
- 문을 열면 그 뒤에 방이 있다 (공간 영속성)
- 불을 켜면 그림자가 바뀐다 (인과 관계)

### 주요 연구

#### OpenAI Sora — "World Simulator"

OpenAI는 Sora 기술 보고서에서 이 모델을 단순한 영상 생성기가 아닌 **"세계 시뮬레이터(world simulator)"** 로 정의했다. 대규모 비디오 데이터에서 물리·공간 법칙을 암묵적으로 학습했다는 주장이다. 실제로 Sora 2는 중력, 유체 역학, 충돌 등을 비교적 자연스럽게 재현하지만, 여전히 복잡한 물리 상호작용에서는 오류가 발생한다.

#### Google Genie 2 (2024)

Google DeepMind의 Genie 2는 단일 이미지에서 **플레이 가능한 3D 가상 세계**를 생성한다. 사용자가 키보드로 이동하면 세계가 실시간으로 렌더링된다. 게임 개발, 로봇 학습 환경 시뮬레이션에 활용 가능성이 크다.

### 현재 한계

- 복잡한 물리 상호작용 (다체 충돌, 유체 + 고체 상호작용) 에서 비현실적 결과
- 장시간 일관성 유지 어려움
- 계산 비용이 매우 높음
- 아직 범용 "월드 모델"보다는 **도메인별 시뮬레이터**에 가까움

### 왜 중요한가

월드 모델은 단순 콘텐츠 생성을 넘어, AI가 **세상을 이해하는 방식**의 전환을 의미한다. 자율주행, 로봇공학, 과학 시뮬레이션 등에서 "현실 세계를 먼저 가상으로 시뮬레이션하고 행동을 결정"하는 패러다임의 기초가 된다.

## Reference

- [Part 9 — Ch.05 월드 모델과 미래](https://ai-contents-wine.vercel.app/09-multimodal/#월드-모델)

## 연관 entity

- [Video Generation](./video-generation.md) — 월드 모델의 현재 형태이자 전 단계
- [Diffusion Models](./diffusion-models.md) — 월드 모델의 기반 생성 아키텍처

## 출처

- "Video generation models as world simulators" (OpenAI Sora 기술 보고서, 2024)
- "Genie 2: A Large-Scale Foundation World Model" (Google DeepMind, 2024)
- Part 9 학습 콘텐츠

## 업데이트 이력

- 2026-04-12 — 신규 생성.
