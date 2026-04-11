# Data Bias

**Category:** 품질 / 윤리 / 거버넌스
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

AI가 편향을 학습하는 메커니즘. 3대 유형은 **Selection bias(학습 데이터가 일부 집단만 대표), Historical bias(과거 차별이 데이터에 이미 새겨져 있음), Measurement bias(측정 자체가 특정 집단에 불리)**. 악명 높은 사례: **Amazon 채용 AI(2014~2018)**가 여성 이력서에 불리하게 작동, **COMPAS**가 흑인 피고의 재범 확률을 과대평가, **Joy Buolamwini의 Gender Shades**가 상용 얼굴 인식의 어두운 피부색 오차율 34%를 폭로. 완화는 **diverse sampling, re-weighting, counterfactual fairness, adversarial debiasing** 등이 있지만 "완전 제거"는 불가능하고 **거버넌스 관점의 지속 모니터링**이 현실적 답. [EU AI Act](./eu-ai-act.md) Article 10은 편향 분석 문서화를 법적 의무로 명시.

## 설명

### 3대 유형

**1. Selection Bias (선택 편향)**
학습 데이터가 모집단의 일부만 담고 있을 때. 스마트폰 음성 인식 초기 버전이 남성 백인 영어 화자에서 훨씬 잘 작동한 이유.
- 예: ImageNet의 지리적 편향 — 45%가 미국, 1%가 중국·인도 각각.
- 완화: 다양성 확보, 데이터 증강, stratified sampling.

**2. Historical Bias (역사적 편향)**
데이터는 정확하지만 **세상 자체**가 편향되어 있을 때. 모델이 "현실을 학습"하면 편향을 증폭.
- 예: **Amazon 채용 AI** — 10년치 이력서로 학습했더니 "women's chess club" 같은 단어에 감점. 기술직 채용이 과거에 남성 편중이었기 때문.
- 완화: 민감 속성 차단, 공정성 제약 조건 추가.

**3. Measurement Bias (측정 편향)**
데이터 수집·라벨링 과정 자체가 왜곡.
- 예: **COMPAS** — 재범 예측에 "체포 기록"을 사용했으나 체포율 자체가 인종별로 다름. 결과적으로 흑인 피고의 위험 점수를 과대평가.
- 완화: 프록시 변수 검증, 라벨러 다양성.

### 악명 높은 사례들

| 사건 | 연도 | 핵심 |
|---|---|---|
| **Amazon 채용 AI** | 2014~2018 | 여성에 불리 → 프로젝트 폐기 |
| **COMPAS (ProPublica)** | 2016 | 흑인 재범 위험 과대평가 |
| **Gender Shades (Buolamwini)** | 2018 | 상용 얼굴 인식이 어두운 피부 여성에 오차 34% |
| **Apple Card** | 2019 | 여성에게 낮은 신용 한도, Goldman Sachs 조사 |
| **Google Photos** | 2015 | 흑인을 "gorilla"로 태그 → 긴급 패치 |
| **ChatGPT 초기** | 2023 | 직업 연상에 젠더 스테레오타입 |
| **Stable Diffusion** | 2023 | "CEO" 프롬프트에서 남성 97% 생성 (Washington Post 분석) |
| **Llama 3 지역 편향** | 2025 | 비영어권 문화 질의에 영미 시각으로 답변 |

### 완화 기법

**1. Pre-processing (데이터 단계)**
- **Re-sampling** — 소수 집단 오버샘플, 다수 집단 언더샘플.
- **Re-weighting** — 손실 함수에서 가중치 조정.
- **Diverse data collection** — 의도적으로 균형 잡힌 데이터 구축.

**2. In-processing (학습 단계)**
- **Adversarial debiasing** — 민감 속성을 예측하지 못하도록 adversarial loss.
- **Fairness constraints** — demographic parity, equal opportunity 같은 제약.
- **Counterfactual fairness** — "이 사람의 성별이 달랐다면 결과가 같은가".

**3. Post-processing (예측 단계)**
- **Threshold adjustment** — 집단별로 결정 임계값 조정.
- **Equalized odds** — False positive / false negative 균형.

### 공정성의 수학적 불가능성

Kleinberg et al. 2016, Chouldechova 2017 논문은 **"calibration + equal false positive rate + equal false negative rate"가 동시에 만족될 수 없음**을 증명했다. 즉 "공정"의 정의 자체가 여러 개이고 상호 모순. 조직은 **어떤 공정성을 우선할지 결정**해야 한다 — 기술 문제가 아닌 가치 판단.

### 거버넌스·규제 연결

- **[EU AI Act](./eu-ai-act.md) Article 10** — 고위험 AI 시스템은 학습 데이터의 **편향 분석 문서화 + 완화 조치** 의무.
- **NYC Local Law 144 (2023)** — 채용 AI의 **bias audit 연 1회 공개** 의무.
- **US EEOC 가이던스 (2023)** — 채용 알고리즘은 Title VII 적용.
- **한국 AI 기본법(2026 시행)** — 고영향 AI 편향 평가 의무.

### 2026 도구

- **IBM AI Fairness 360** — 오픈소스, 70+ 메트릭, 10+ 완화 알고리즘.
- **Microsoft Fairlearn** — scikit-learn 통합.
- **Google What-If Tool** — 시각적 탐색.
- **Aequitas** — 감사 리포트 자동화.
- **Credo AI Lens** — 상용, 거버넌스 워크플로우.

## Reference

- [Part 1 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/01-data-basics/)
- [Part 4 — Ch.09 AI 거버넌스와 EU AI Act](https://ai-contents-wine.vercel.app/04-data-enterprise/)

## 연관 entity

- [EU AI Act](./eu-ai-act.md) — Article 10 편향 문서화 의무
- [Data Quality](./data-quality.md) — 품질의 윤리적 축
- [Pre-training Data](./pre-training-data.md) — 기초 모델의 편향 원천
- [Data Centric AI](./data-centric-ai.md) — 데이터 개선으로 편향 완화
- [Human-in-the-Loop](./human-in-the-loop.md) — 편향 검출 마지막 방어선
- [Evaluation](./evaluation.md) — 공정성 메트릭

## 출처

- Buolamwini & Gebru, "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification", FAT* 2018.
- Angwin et al., "Machine Bias", ProPublica, 2016.
- Dastin, "Amazon scraps secret AI recruiting tool that showed bias against women", Reuters, 2018.
- Kleinberg et al., "Inherent Trade-Offs in the Fair Determination of Risk Scores", 2016.
- EU AI Act, Regulation 2024/1689, Article 10.
- Washington Post, "AI-generated images of CEOs", 2023.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
