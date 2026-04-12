# EU AI Act

**Category:** 거버넌스 / 규제
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

EU가 2024년 공식 채택한 세계 최초의 포괄적 AI 규제 법. 위험 기반(risk-based) 접근 — AI 시스템을 **Unacceptable / High-risk / Limited risk / Minimal risk** 네 단계로 분류. **2026년 8월 2일 Article 10 (데이터 거버넌스) 조항과 고위험 시스템 의무가 정식 발효**하며 이 날짜가 글로벌 AI 컴플라이언스의 마감선이 됨. 과태료는 **고위험 시스템 위반 시 최대 EUR 15M 또는 글로벌 매출 3%**, 범용 AI 모델(GPAI) 위반 시 **최대 EUR 35M 또는 7%**. NIST AI RMF, ISO/IEC 42001과 연동해 기업 거버넌스 프레임워크로 굳어지는 중.

## 설명

### 시행 타임라인

| 날짜 | 효력 |
|---|---|
| **2024-08-01** | 공식 발효 (entry into force) |
| **2025-02-02** | Prohibited AI 조항 (사회적 점수 등 금지) |
| **2025-08-02** | 범용 AI 모델(GPAI) 제공자 의무 |
| **2026-08-02** ⭐ | **Article 10 (Data governance), 고위험 AI 시스템 본체 의무** |
| **2027-08-02** | Annex I (제품 안전 법률 통합형 고위험) |

→ **2026-08-02가 현업의 진짜 마감**. 이 날짜 이후 고위험 시스템을 EU에서 출시·운영하려면 full compliance.

### 위험 4단계

1. **Unacceptable risk (금지)**
   - 사회적 점수(social scoring).
   - 실시간 원격 생체 인식 (예외 있음).
   - Subliminal manipulation.
   - 감정 인식 (직장·학교).
2. **High-risk (대부분의 의무 집중)**
   - 채용·인사 (이력서 스크리닝, 승진 결정).
   - 신용 평가, 보험 가격.
   - 교육 평가(시험 채점, 입학).
   - 법 집행(증거 평가, 범죄 예측).
   - 이민·국경·망명.
   - 필수 공공 서비스 접근.
   - 바이오인식 신원 확인.
   - 제품 안전 관련 AI (의료기기, 차량 등 — Annex I).
3. **Limited risk**
   - 챗봇, 감정 인식, 딥페이크 → **투명성 의무** (AI임을 공개).
4. **Minimal risk**
   - 스팸 필터, 추천 → 자율 규제.

### 고위험 시스템의 핵심 의무 (2026-08-02 시작)

- **Article 10: Data Governance** — 학습·검증·테스트 데이터의 품질·대표성·편향 문서화, 출처 추적.
- **Risk management system** — 전 수명주기.
- **Technical documentation & logging** — 감사 가능성.
- **Human oversight** — [Human-in-the-Loop](./human-in-the-loop.md) 보장.
- **Accuracy, robustness, cybersecurity**.
- **Post-market monitoring** — 배포 후 지속 모니터링.
- **Conformity assessment** — CE 마킹.
- **EU database 등록**.

### GPAI (General-purpose AI) 의무 — 2025-08-02 시작

- 학습 데이터 요약 공개 (저작권 포함).
- 기술 문서 (평가, 한계, intended use).
- EU 저작권법 준수 정책.
- **Systemic risk** (FLOPs 10^25 이상) 모델은 추가 의무 — 적대적 평가, 사고 보고, 사이버보안.
  - 2026 기준 GPT-4/4.5, Claude Opus 4, Gemini Ultra, Llama 3 405B급이 해당.

### 과태료

- **Prohibited 위반**: 최대 **EUR 35M 또는 글로벌 매출 7%** (높은 쪽).
- **고위험 의무 위반**: 최대 **EUR 15M 또는 3%**.
- **부정확한 정보 제공**: 최대 **EUR 7.5M 또는 1%**.
- GPAI 의무 위반은 별도 체계 — 최대 EUR 15M 또는 3%.

### NIST AI RMF·ISO/IEC 42001과의 관계

- **NIST AI RMF (2023)** — 미국판 자발적 프레임워크. Govern/Map/Measure/Manage 4 함수.
- **ISO/IEC 42001 (2023)** — AI 경영 시스템(AIMS) 국제 표준, 인증 가능.
- **EU AI Act ↔ NIST/ISO** — 법적 구속력은 EU AI Act뿐이지만, **NIST RMF 도입이 EU Act 준수의 기술적 기반**으로 간주. 2026년 다국적 기업은 세 개를 매핑한 **통합 거버넌스 프레임워크**를 운영.

### 기업이 실제로 해야 하는 것

1. AI 시스템 인벤토리 작성.
2. 위험 등급 분류 (대부분의 챗봇·RAG는 Limited risk이지만, 채용·신용 관련은 High-risk).
3. High-risk면 Data Governance 문서화 시작 — 학습 데이터 출처, 편향 분석, [Synthetic Data](./synthetic-data.md) 비중 기록.
4. [Human-in-the-Loop](./human-in-the-loop.md) 설계.
5. [Evaluation](./evaluation.md) + [Observability](./observability.md) 체계 구축 (post-market monitoring 근거).
6. CE 마킹 준비.

### 2026 업계 동향

- **AI Office (EU Commission)**가 GPAI 감독 주관.
- **Code of Practice**가 2025년 공개 — 자발적이지만 사실상 표준.
- Meta·X는 유럽 출시 지연 또는 축소, OpenAI·Anthropic·Google은 내부 거버넌스팀 확대.
- 한국·일본·영국은 EU Act를 벤치마크로 자체 프레임워크 조율.

## Reference

- [Part 9 — Ch.09 AI 거버넌스와 EU AI Act](https://ai-contents-wine.vercel.app/09-data-enterprise/) ⭐
- [Part 8 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/08-data-basics/)

## 연관 entity

- [Human-in-the-Loop](./human-in-the-loop.md) — 고위험 시스템의 필수 요구
- [Evaluation](./evaluation.md) — Post-market monitoring 근거
- [Observability](./observability.md)
- [Synthetic Data](./synthetic-data.md) — 데이터 거버넌스 문서화 대상
- [RAG](./rag.md) — Citation이 투명성 의무 충족에 유리
- [Prompt Injection](./prompt-injection.md) — 사이버보안 의무와 연결

## 출처

- Regulation (EU) 2024/1689 — Artificial Intelligence Act, Official Journal of the EU, 2024-07-12.
- European Commission, "AI Act Implementation Timeline", 2025~2026.
- EU AI Office, "General-Purpose AI Code of Practice", 2025.
- NIST, "AI Risk Management Framework 1.0", 2023.
- ISO/IEC 42001:2023, "AI Management System".

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
