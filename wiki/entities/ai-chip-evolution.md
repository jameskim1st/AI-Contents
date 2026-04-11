# AI Chip Evolution

**Category:** 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

AI 컴퓨팅 하드웨어는 **CPU → GPU → ASIC → 뉴로모픽**의 세대 진화를 거치고 있다. 2010년대에 NVIDIA GPU의 병렬 처리 능력이 딥러닝을 가능케 한 것이 결정적 변곡점. 2026년 현재는 **ASIC(TPU, Trainium, Cerebras)** 이 효율성 경쟁을 주도하고, **뉴로모픽(Loihi, TrueNorth)** 은 여전히 연구 단계. LLM 시대의 하드웨어 병목을 이해하는 것은 전략 의사결정의 핵심.

## 설명

### 세대별 분류

| 세대 | 아키텍처 | 설계 목표 | 대표 칩 | 전력 효율 |
|---|---|---|---|---|
| **1세대** | **CPU** | 복잡한 연산 순차 처리 | Intel Xeon, AMD EPYC | ★ (매우 낮음) |
| **1세대** | **GPU** | 단순 연산 대량 병렬 | NVIDIA H100/H200/B200, AMD MI300 | ★★ |
| **2세대** | **ASIC** | AI 전용 고정 회로 | Google TPU, AWS Trainium·Inferentia, Cerebras WSE | ★★★★ |
| **3세대** | **뉴로모픽** | 뇌의 뉴런·시냅스 모방 | Intel Loihi 2, IBM TrueNorth, BrainChip Akida | ★★★★★ (이론) |

### CPU (1세대) — 만능이지만 AI엔 부족

- **설계 철학**: 복잡한 분기·순차 명령을 **빠르게** 처리
- 코어 수: 수~수십 개
- 각 코어가 똑똑 → 운영체제·데이터베이스엔 최적
- 문제: 딥러닝은 **단순 연산 수십억 번**. CPU는 한 번에 몇 개만 처리 → 학습에 수개월 걸림
- 2010년대 초 연구자들이 느낀 한계: "GTX 580 한 장이 서버 랙보다 빠르다"

### GPU (1세대) — 딥러닝 혁명의 주역

- **설계 철학**: 원래는 그래픽(픽셀)을 동시에 수천 개 계산하기 위함 → 단순 연산 **대량 병렬**
- 코어 수: 수천~수만 개 (H100 = 16,896 CUDA cores + 528 Tensor cores)
- 신경망의 **행렬 곱(matrix multiplication)** 과 완벽히 맞음
- **2012년 AlexNet**이 GPU 2장으로 ImageNet 우승 → 업계 전환의 분기점
- **2017년 Transformer** 등장 이후 GPU 수요 폭발 → NVIDIA 시가총액 10년간 100배

**2026년 NVIDIA 라인업**:
- **H100**: 2022 출시, LLM 1차 붐의 주역, FP8 지원
- **H200**: 2024, HBM3e 메모리 141GB
- **B200 (Blackwell)**: 2025, 학습 4배·추론 30배 (FP4)
- **GB200 NVL72**: 72 GPU 랙 단위, 2025~ 하이퍼스케일러 대량 구매

**왜 GPU가 LLM을 가능케 했나**:
- Transformer = "모든 토큰 × 모든 토큰"의 Attention 행렬 → 대규모 병렬 행렬곱
- CPU로 GPT-3 학습 시 추정 수백 년, GPU 클러스터로 수개월
- HBM(High Bandwidth Memory) 덕분에 메모리 대역폭 병목도 완화

### ASIC (2세대) — AI 전용 맞춤칩

**ASIC = Application-Specific Integrated Circuit**. "이 작업 하나만 잘하게" 설계된 칩.

- GPU는 여전히 "범용 병렬". ASIC은 **한 종류의 연산만** 극도로 빠르게.
- 장점: **전력 효율 수배~수십 배**, 단위 가격 하락 (대량 생산 시)
- 단점: 유연성 없음. 아키텍처가 바뀌면 다시 설계

**주요 ASIC (2026)**:

| 칩 | 제조 | 특징 |
|---|---|---|
| **Google TPU v5p / v6 Trillium** | Google + Broadcom | Google 내부 Gemini 학습의 주력 |
| **AWS Trainium2 / Inferentia2** | AWS + Annapurna | Bedrock 인프라 |
| **Cerebras WSE-3** | Cerebras | **한 장 웨이퍼 전체가 칩** (900,000 코어) |
| **Groq LPU** | Groq | 초저지연 추론(토큰/초) 특화 |
| **Tesla Dojo** | Tesla | 자율주행용 자체 학습 칩 |
| **Meta MTIA** | Meta | 내부 추천·생성 워크로드 |

**2026년 트렌드**: 하이퍼스케일러(Google, AWS, Meta, Microsoft)가 **자체 ASIC 수직 통합**으로 NVIDIA 의존 낮추는 중. NVIDIA 독점의 첫 균열.

### 뉴로모픽 (3세대) — 뇌를 모방한다

**Neuromorphic = 뉴런·시냅스를 하드웨어로 모방**. 이전 세대와 근본적으로 다른 발상.

- **Spiking Neural Network (SNN)** 기반 — 뉴런이 "필요할 때만" 스파이크 신호 방출
- 연속 연산이 아니라 **이벤트 기반** → 평시 전력 거의 0
- 이론적으로 뇌처럼 **밀리와트** 단위로 지능 구현 가능

**주요 칩**:
- **Intel Loihi 2** (2021) — 100만 개 뉴런. 연구용
- **IBM TrueNorth** (2014) / **NorthPole** (2023)
- **BrainChip Akida** — 상용 진입 시도
- **SpiNNaker** (University of Manchester)

**2026년 현실**:
- 여전히 **연구 단계**. 프로덕션 LLM 학습엔 미사용
- 소프트웨어 스택이 GPU/CUDA 생태계를 따라가지 못함
- 유망 영역: **엣지 AI**(배터리 센서·웨어러블), **뇌-컴퓨터 인터페이스**
- "AGI 시대의 결정적 하드웨어가 될지, 니치로 남을지" 갈림길

### 왜 이 흐름을 알아야 하나

- **2025년 이후 AI 지출의 70%가 하드웨어** (Gartner). 모델보다 칩이 더 비싸다.
- 한 기업의 AI 전략은 **어느 하드웨어에 얼마나 의존할 것인가**의 문제로 수렴.
- **공급망 리스크**: NVIDIA → TSMC → ASML의 단일 경로에 지정학적 위험
- **전력**: 2026년 데이터센터 전력 소비가 전 세계 전력의 4%에 육박. 하드웨어 효율 혁신이 지속가능성 이슈와 직결.

### 속도 vs 유연성 스펙트럼

```
       유연성 ↑                              효율 ↑
        ┌──────────────────────────────────────┐
        │ CPU   GPU   TPU  Cerebras  Loihi     │
        │  ←─────────────────────────────→     │
        │ 범용        전용             초전용    │
        └──────────────────────────────────────┘
```

실무 교훈: 초기 연구는 GPU에서, 안정화된 대규모 프로덕션은 ASIC으로 이전. 이 "경로 의존성"을 이해하면 투자·채용 결정이 쉬워진다.

## Reference

- [Part 0 — Ch.12 AI 칩의 진화: CPU에서 뉴로모픽까지](https://ai-contents-wine.vercel.app/00-ai-ml-basics/#ai-chip-evolution)

## 연관 entity

- [Deep Learning](./deep-learning.md) — GPU 덕분에 가능해진 패러다임
- [Transformer](./transformer.md) — 현재 하드웨어 수요를 폭발시킨 아키텍처

## 출처

- NVIDIA Blackwell Architecture Whitepaper, 2024.
- Google Cloud, "Introducing Trillium, sixth-generation TPUs", 2024.
- IBM Research, "NorthPole", 2023.
- Intel Labs, "Loihi 2: A New Generation of Neuromorphic Computing", 2021.
- Gartner, "Forecast: AI Semiconductors, Worldwide", 2026 Q1.
- SemiAnalysis reports, 2024~2026.
- PwC AI 리터러시 PPTX (Day1/Day2).

## 업데이트 이력

- 2026-04-12 — 신규 생성. PwC AI 리터러시 PPTX ingest.
