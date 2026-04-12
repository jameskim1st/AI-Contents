---
title: "[공통 모듈_AI 리터러시] Day1 — AI 리터러시 교육 개요"
author: PwC Korea
date_original: 2025-03-25
date_ingested: 2026-04-12
source_type: pptx
url_or_path: c:/Users/user/OneDrive/Documents/PwC/AI 교육/[공통 모듈_AI 리터러시] Day1_250325_v1.0.pptx
used_for: Part 0 Ch.01-05 · Ch.12
---

# PwC AI 리터러시 Day 1 (20 slides)

## Context

PwC Korea의 전사 AI 역량 강화 교육 공통 모듈 1차시. "AI란 무엇이고 어떻게 작동하는가"에 대한 기본 개념을 컨설턴트 전체에게 전달하기 위한 입문 자료. 본 사이트의 **Part 0 (AI & ML 기초)** 작성을 위한 핵심 raw source로 사용됨.

> ⚠️ **Strictly Private and Confidential** 표기 자료 — 핵심 개념·구조만 추출해 공개 wiki 수준으로 추상화. 장문 인용·원본 슬라이드 이미지 재사용 금지.

## Key Points

### AI의 정의 (Slide 4)
- **Human Intelligence**: 시각·촉각·후각 등 감각으로 "실제 꽃임을 인지"
- **Artificial Intelligence**: 충분한 데이터가 공급되면 → 알고리즘을 통해 데이터 패턴 도출 → 꽃 여부 판단
- 핵심: AI는 감각이 아니라 **데이터+알고리즘**으로 지능을 재현

### AI 발전 3단계 (Slide 5)
- **ANI** (Artificial Narrow Intelligence, 약한 AI): 현재 모든 AI의 상태
- **AGI** (Artificial General Intelligence, 강한 AI): 범용 지능, 다가오는 중
- **ASI** (Artificial Super Intelligence): 초지능, 가설 단계

### AGI 분류 체계 (Slide 6) ⭐
- **OpenAI/Google의 5단계 분류**:
  - Chatbots → Reasoners → Agents → Innovators → Organizations
  - 각 단계 × Emerging/Competent/Expert/Virtuoso/Superhuman 매트릭스
- 인용:
  - **Sam Altman (OpenAI CEO):** "AGI를 가리키는 시스템이 눈앞에..."
  - **Demis Hassabis (Google DeepMind CEO):** "AGI, 아마도 3-5년 안에 실현될 것"

### AI 기술 피라미드 (Slide 7) ⭐
- **AI** (인공지능) — 인간 지적 능력을 컴퓨터로 구현하는 모든 기술
- **ML** (머신러닝) — 데이터 기반 학습·예측
- **DL** (딥러닝) — 인공 신경망으로 복잡한 패턴 처리
- **Generative AI** — 최상단, 새 콘텐츠 생성

### 전통 프로그래밍 vs 머신러닝 (Slide 8) ⭐
- 전통: `Rules + Data → Output`
- ML: `Data + Output → Rules`
- 핵심 대조: 사람이 규칙을 만드느냐 vs 기계가 규칙을 배우느냐

### AI의 3요소 (Slide 9)
- **AI = Algorithm × Computing × Data**
- 알고리즘 공유 문화 · AI 반도체 발전 · 양질 데이터 폭증 3박자가 맞아 현재 폭발

### 알고리즘 vs 모델 (Slides 10-13)
- **알고리즘**: `y = f(x)` — 입력 변수에서 출력 변수로 가는 규칙
- **모델**: 알고리즘 + 학습된 파라미터
- **학습(training) vs 추론(inference)** 구분
- 파라미터 수 진화 비교

### 데이터 저장소 구성 (Slide 18)
- Sources → ETL → 운영 DB → 데이터 웨어하우스 → 데이터 마트 → AI/BI
- (본 사이트에서는 Part 2 Data 기초 Ch.03이 이미 더 상세히 다루고 있어 Part 0에서는 제외)

### AI 반도체 진화 (Slide 19) ⭐
- **CPU (1세대)** — 복잡 계산 순차 처리, 매우 높은 전력 소비
- **GPU (1세대 AI)** — 단순 계산 병렬 처리, 높은 전력 소비
- **ASIC (2세대)** — AI 특화 전용 칩, 고효율
- **뉴로모픽 (3세대)** — 뉴런·시냅스 구조 모방
- 출처: 한국전자통신연구원 재구성

## Entities created/updated

이 자료로부터 생성된 wiki entity:
- [machine-learning](../../entities/machine-learning.md)
- [deep-learning](../../entities/deep-learning.md)
- [agi-levels](../../entities/agi-levels.md)
- [ai-chip-evolution](../../entities/ai-chip-evolution.md)

## Chapters created/updated

- Part 0 Ch.01 — AI란 무엇인가 (꽃 예시, ANI→AGI→ASI)
- Part 0 Ch.02 — AGI 분류 체계 (OpenAI 5 Levels)
- Part 0 Ch.03 — AI 기술 피라미드 (전통 프로그래밍 vs ML)
- Part 0 Ch.04 — AI의 3요소
- Part 0 Ch.05 — 알고리즘 vs 모델
- Part 0 Ch.12 — AI 반도체의 진화
