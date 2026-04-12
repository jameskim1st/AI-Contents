# PII (Personally Identifiable Information)

**Category:** 보안 / 거버넌스
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

**개인을 식별할 수 있는 정보.** 법적으로는 **GDPR(EU), 개인정보보호법(한국), HIPAA(미 의료), CCPA(캘리포니아)** 등이 각기 정의한다. 단순 분류는 **Direct PII**(이름·주민번호·이메일·전화번호)와 **Indirect/Quasi PII**(생년월일+우편번호+성별 조합으로 87%의 미국인 식별 — Sweeney 2000 연구). 처리 기법은 **Redaction(삭제), Tokenization(가역 치환), Masking(비가역 가림), k-anonymity(최소 k명이 동일), Differential Privacy(수학적 프라이버시 보장)**. 2026년 LLM 파이프라인에선 **Microsoft Presidio(오픈소스), Google DLP API, Nightfall, AWS Comprehend**가 사실상 표준 도구. [EU AI Act](./eu-ai-act.md)와 [Prompt Injection](./prompt-injection.md) 방어의 교차점.

## 설명

### 법적 정의

| 법 | 지역 | 핵심 |
|---|---|---|
| **GDPR** | EU | Article 4(1): "식별된 또는 식별 가능한 자연인". 위반 최대 **EUR 20M 또는 매출 4%** |
| **개인정보보호법 (PIPA)** | 한국 | 2023 개정, 가명처리 도입. 최대 매출 3% 과징금 |
| **HIPAA** | 미 의료 | PHI(Protected Health Information) 18종 식별자 |
| **CCPA/CPRA** | 캘리포니아 | 소비자의 삭제·열람·opt-out 권리 |
| **LGPD** | 브라질 | GDPR과 유사 구조 |

### Direct PII vs Quasi PII

**Direct PII (단독 식별)**
- 이름, 주민등록번호, 여권번호, 이메일, 전화번호, 얼굴 사진, 지문, IP 주소(일부 관할권).

**Quasi PII (조합 식별)**
Latanya Sweeney의 2000년 논문이 충격을 줬다 — **(ZIP code, 생년월일, 성별) 조합만으로 미국인의 87%를 고유하게 식별 가능**. Massachusetts 주지사의 "익명화된" 의료 데이터에서 그의 레코드를 찾아냈다. 현대에는 더 정교해졌다:
- 브라우저 fingerprint
- 이동 패턴 (4개 위치로 95% 재식별 — Science 2013)
- 구매 이력
- 작성 스타일 (stylometry)

### 처리 기법 비교

| 기법 | 가역성 | 유틸리티 | 사용처 |
|---|---|---|---|
| **Redaction** | ✗ | 낮음 | 공개 문서 ("[REDACTED]") |
| **Tokenization** | ✓ (비밀 키) | 높음 | 결제 카드(PCI DSS) |
| **Masking** | ✗ | 중간 | 로그 (`john@****.com`) |
| **Hashing** | △ (사전 공격 취약) | 낮음 | 주의 필요 |
| **k-anonymity** | ✗ | 중간 | 공개 데이터셋 (최소 k명 동일 그룹) |
| **l-diversity** | ✗ | 중간 | k-anonymity 강화 |
| **Differential Privacy** | ✗ | 통계 | Apple, Google, 미 인구조사 |

### Differential Privacy (DP) 왜 주목받나

**수학적으로 보장**되는 유일한 방법. 쿼리 결과에 **calibrated noise**를 추가해 "한 개인이 데이터셋에 있든 없든 결과가 구별 불가"하게 만든다. Epsilon(ε)이 작을수록 프라이버시 강함.
- Apple iOS는 사용자 이모지 사용 통계를 DP로 수집.
- **미국 2020 인구조사**가 최초로 전면 DP 적용.
- **OpenAI**는 2024년부터 일부 모델 학습에 DP-SGD 실험.
- **Google DP 라이브러리** 오픈소스.

단점: utility-privacy trade-off가 가파름. 머신러닝에선 정확도 손실이 종종 큼.

### LLM 파이프라인의 PII 위험

1. **학습 데이터 유출** — Carlini et al. 2021 "Extracting Training Data from LLMs" 논문은 GPT-2에서 개인 전화번호·이메일이 그대로 재출력되는 사례를 제시.
2. **프롬프트 누수** — 사용자가 이력서를 붙여넣으면 PII가 로그·학습 데이터로 흘러들어감.
3. **RAG 컨텍스트** — 내부 HR 문서를 벡터 DB에 넣었는데 권한 없는 사용자가 검색.
4. **Prompt Injection** — 공격자가 "이전 대화의 PII를 요약해라" 같은 지시 주입 → [Prompt Injection](./prompt-injection.md).

### 2026 도구 생태계

| 도구 | 특징 |
|---|---|
| **Microsoft Presidio** | 오픈소스, 50+ PII 유형, spaCy 기반 NER + 룰, 한국어 커스터마이징 가능 |
| **Google Cloud DLP API** | 120+ infoType, 컨텍스트 기반, 가장 포괄적 |
| **AWS Comprehend PII** | AWS 생태계 통합 |
| **Nightfall** | LLM 특화, Slack·GitHub·OpenAI API 스캔 |
| **Private AI** | 오픈소스 대안, 다국어 강점 |

### LLM 프로덕션 패턴

```
User Input
    ↓
[Presidio] → Redact/Tokenize PII
    ↓ (토큰화된 텍스트만)
LLM API Call
    ↓
Response
    ↓
[Presidio] → Restore tokens (필요 시)
    ↓
User
```

이 패턴은 **EU AI Act Article 10(데이터 거버넌스) + GDPR purpose limitation**을 동시에 만족하는 사실상 표준.

### 한계

- **Named Entity Recognition은 틀린다** — 한국 이름이 영어 단어와 겹치면 놓침.
- **Context-dependent** — "Park"는 성씨일 수도, 공원일 수도.
- **Overzealous redaction** — LLM이 원문을 이해하지 못해 품질 저하.
- **Re-identification 공격** — 익명화도 결합 공격에 취약.

## Reference

- [Part 8 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/08-data-basics/)
- [Part 9 — Ch.08 보안과 프라이버시](https://ai-contents-wine.vercel.app/09-data-enterprise/)

## 연관 entity

- [EU AI Act](./eu-ai-act.md) — GDPR과 교차
- [Prompt Injection](./prompt-injection.md) — PII 유출 공격 벡터
- [Data Quality](./data-quality.md) — PII 탐지 자체가 품질 이슈
- [Synthetic Data](./synthetic-data.md) — PII 우회용 합성
- [RAG](./rag.md) — 권한 관리와 결합 필요
- [Human-in-the-Loop](./human-in-the-loop.md) — 민감 데이터 검토

## 출처

- Sweeney, "Simple Demographics Often Identify People Uniquely", Carnegie Mellon, 2000.
- de Montjoye et al., "Unique in the Crowd: The privacy bounds of human mobility", Scientific Reports, 2013.
- Carlini et al., "Extracting Training Data from Large Language Models", USENIX Security 2021.
- EU GDPR, Regulation 2016/679.
- Microsoft Presidio documentation, 2026.
- Dwork, "Differential Privacy", ICALP 2006.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
