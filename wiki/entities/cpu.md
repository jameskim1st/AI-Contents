# CPU (Central Processing Unit)

**Category:** IT 기초 / 하드웨어
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

CPU는 컴퓨터 시스템을 통제하고 프로그램의 **모든 계산을 수행하는 핵심 칩**이다. 클럭 속도와 코어 수가 성능을 결정하며, 복잡한 순차 처리에 최적화되어 있다. AI 시대에는 대량 병렬 연산에 특화된 **GPU**가 학습·추론을 담당하면서, CPU vs GPU의 역할 분담이 핵심 개념이 되었다.

## 설명

### CPU가 하는 일

- 프로그램이 실행된다 = **CPU가 명령어를 하나씩 읽어 계산하고 있다**는 뜻
- 연산(산술·논리), 제어(명령어 해석·실행 순서 결정), 데이터 이동을 모두 담당
- 모든 소프트웨어(OS, 앱, 게임)는 궁극적으로 CPU 위에서 돌아간다

### 클럭 속도 (Clock Speed)

- CPU가 1초에 명령어를 처리하는 **박자 수** (단위: GHz)
- 예: 3.5 GHz = 초당 35억 박자
- 클럭이 높을수록 단일 작업 처리 속도가 빠르다

### 코어 (Core)

- 하나의 CPU 칩 안에 들어있는 **독립된 처리 장치** 수
- 4코어 = 동시에 4가지 작업 병렬 처리 가능
- 2026년 기준 데스크톱 CPU는 8~24코어, 서버용은 64~128코어까지 존재

### CPU vs GPU — AI 관점에서의 차이

| 항목 | CPU | GPU |
|---|---|---|
| **설계 철학** | 복잡한 순차 명령을 **빠르게** | 단순 연산을 **대량 병렬로** |
| **코어 수** | 수~수십 개 (각 코어가 "똑똑") | 수천~수만 개 (각 코어가 "단순") |
| **강점** | OS, DB, 분기 로직 | 행렬 곱셈, 딥러닝 학습·추론 |
| **약점** | 대량 병렬 연산에 비효율 | 복잡한 분기·순차 처리에 부적합 |
| **비유** | 수학 교수 1명이 어려운 문제 풀기 | 초등학생 1만 명이 구구단 동시에 풀기 |

> 2012년 AlexNet이 GPU 2장(GTX 580)으로 ImageNet 우승하면서, "GPU가 서버 랙 가득 채운 CPU보다 AI에 빠르다"는 사실이 증명되었다. 이후 AI 칩은 GPU → ASIC → 뉴로모픽으로 진화 중.

### 일상에서 만나는 CPU

- Intel Core i7, AMD Ryzen 9 — 데스크톱·노트북용
- Apple M4 — Mac 전용 ARM 칩 (CPU+GPU+NPU 통합)
- Intel Xeon, AMD EPYC — 서버·데이터센터용

## Reference

- [Part 6 — Ch.01 IT 기초 개념](https://ai-contents-wine.vercel.app/06-it-basics/#it-ch1)

## 연관 entity

- [Operating System](./operating-system.md) — CPU 위에서 프로그램 실행을 관리하는 메인 소프트웨어
- [Memory (하드웨어)](./memory-hardware.md) — CPU 계산 결과를 임시 저장하는 휘발성 공간
- [AI Chip Evolution](./ai-chip-evolution.md) — CPU → GPU → ASIC → 뉴로모픽 세대 진화사

## 출처

- 그랩, "개발 배경지식들 빠르게 격파하기", Notion.

## 업데이트 이력

- 2026-04-12 — 신규 생성.
