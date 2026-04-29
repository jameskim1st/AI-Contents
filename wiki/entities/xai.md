# XAI (Explainable AI · 설명 가능한 인공지능)

**Category:** 방법론 / 해석성
**Status:** stable (2024-2026 mechanistic interpretability로 진화 중)
**Last updated:** 2026-04-30

## TL;DR

AI 모델의 결정을 사람이 이해할 수 있게 만드는 기법 군. **SHAP·LIME·Integrated Gradients·Attention/Probing 4대 고전 기법**과, 2024-2026 **Mechanistic Interpretability 신흥 방법**(Anthropic Sparse Autoencoder, DeepMind Gemma Scope) 모두 포함. **EU AI Act Article 13** + **CJEU SCHUFA 판결(2023-12, 2025-01 후속)** + **GDPR Article 22** + **한국 AI 기본법(2026-01 시행)**이 법적 의무로 요구. 의료·금융이 가장 광범위 채택. **Cynthia Rudin(Duke, 2022 Squirrel AI Award)**: "고위험 결정에 블랙박스를 쓰지 말고 처음부터 해석 가능한 모델을 쓰라."

## 설명

### 왜 필요한가

**규제 압력:**
- **EU AI Act Article 13** (2024-08-01 발효, 2026-08 전면) — 고위험 AI 투명성 + instructions for use
- **EU AI Act Article 86** — 자동 결정의 주요 요소 설명 권리
- **GDPR Article 22 + 15(1)(h)** — 자동 결정 거부 + "의미 있는 정보" 권리
- **CJEU SCHUFA 판결 C-634/21** (2023-12-07) — 신용국 점수 의존 자동 결정 GDPR 위반. 2025-01 후속 판결로 "설명권" 명문화
- **한국 AI 기본법** (2026-01-22 시행) — 고영향 AI·생성형 AI 투명성 의무

**산업 압력:**
- FDA AI/ML 의료기기 가이드 (2024 업데이트)
- Fed SR 11-7 모델 검증
- Equal Credit Opportunity Act "Adverse Action Notice"

### 분류 4분면

| | Global (전체 모델) | Local (개별 예측) |
|---|---|---|
| **Intrinsic** (자체 해석 가능) | Linear Regression, Decision Tree, GAM, Sparse Autoencoder | (해당 모델의 단일 결정) |
| **Post-hoc** (사후 설명) | Permutation Importance, SHAP global | LIME, SHAP local, Integrated Gradients, Grad-CAM, Counterfactuals |

### 4대 핵심 기법

#### 1) SHAP (SHapley Additive exPlanations)

- **이론적 뿌리**: Lloyd Shapley **1953년** 협력 게임이론. Shapley value = 각 player의 평균 한계 기여
- **ML 적용**: Scott Lundberg & Su-In Lee, "A Unified Approach to Interpreting Model Predictions", **NeurIPS 2017** (UW). Local accuracy + missingness + consistency 세 공리를 모두 만족하는 유일한 additive feature attribution이 Shapley value임을 증명
- **변종**: **TreeSHAP**(트리 모델, 다항식 시간), **KernelSHAP**(model-agnostic, 가중 선형회귀), **DeepSHAP**(딥러닝)
- **현장 점유**: 의료·금융 사실상 표준. **FICO xAI 툴킷** 채택

```python
import shap
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X)
shap.summary_plot(shap_values, X)              # global
shap.force_plot(explainer.expected_value, shap_values[0], X.iloc[0])  # local
```

#### 2) LIME (Local Interpretable Model-agnostic Explanations)

- **출처**: Ribeiro/Singh/Guestrin, "Why Should I Trust You?", KDD 2016
- **동작**: 설명할 인스턴스 주변 perturbation 샘플링 → 가중 선형/희소 surrogate 적합
- **장단점**: SHAP보다 빠름, 텍스트·이미지·표 데이터 모두 적용. 일관성(consistency) 미보장 — 같은 예측에 다른 설명 가능

#### 3) Integrated Gradients

- **출처**: Sundararajan/Taly/Yan, "Axiomatic Attribution for Deep Networks", **ICML 2017** (Google)
- **동작**: baseline(예: 검은 이미지)에서 입력까지 직선 경로의 그래디언트 적분
- **공리**: Sensitivity + Implementation Invariance 만족
- **구현체**: **Captum** (Meta/PyTorch), tf-explain, Alibi

#### 4) Attention / Probing

- **Attention 시각화 한계**: **Jain & Wallace 2019** *"Attention is not Explanation"* — attention weight ≠ 진짜 인과 기여
- **Probing classifier**: 중간층 표현으로 작은 분류기를 학습해 "이 층에 X 정보가 인코딩됐는가" 검사. **Tenney 2019 BERTology** 표준

### LLM 시대의 해석성 — Mechanistic Interpretability (2024-2026)

핵심 합의: **Chris Olah** (Anthropic 공동창업자, **TIME100 AI 2024** 선정, mechanistic interpretability 명명자) — *"이 시스템들을 정말로 이해할 수 있다면 — 많은 진전이 필요하지만 — 모델이 실제로 안전한 시점을 말할 수 있게 될지도 모른다."*

**Anthropic SAE (Sparse Autoencoder) 연구:**
- **"Scaling Monosemanticity"** (2024-05) — Claude 3 Sonnet에 SAE 학습, 다국어·멀티모달 일반화 추상 feature 발견
- **Golden Gate Claude 데모** (2024-05) — Golden Gate Bridge feature 강제 활성화 → 모델이 자기를 다리라고 착각. **SAE가 행동을 인과적으로 조작 가능**함을 증명
- **Constitutional Classifiers** (2025-02) — 보편적 jailbreak 방어 프로토타입

**DeepMind:**
- **Gemma Scope** (2024-08, arXiv:2408.05147) — Gemma 2 2B/9B 전 layer JumpReLU SAE 학습, **400+개 SAE, 3천만+ feature** 공개. Gemma 2 9B 학습 컴퓨트의 ~15%
- **Gemma Scope 2** (2025-12) — Gemma 3 풀스택 해석성 suite
- **Tracr** (2023) — RASP → transformer 가중치 컴파일, ground-truth circuit으로 도구 검증

**핵심 도구:** Neel Nanda(DeepMind)의 **TransformerLens** 라이브러리, **MATS** 프로그램으로 mech interp 커뮤니티 확산.

### 산업 사례

- **신용 거절 사유**: FICO xAI 툴킷이 SHAP/LIME 기반 reason code 생성 → ECOA "Adverse Action Notice" + GDPR Article 22 동시 충족
- **의료**: SHAP 기반 알츠하이머 조기진단 (2024 systematic review)
- **채용 AI 편향 진단**: SHAP이 protected attribute 누출 탐지 표준

### Pull-quote

> "고위험 결정에 블랙박스 머신러닝 모델을 설명하려 하지 말고, 처음부터 해석 가능한 모델을 사용하라. 범죄·의료·컴퓨터 비전·전력망 신뢰성 어디에서도 정확도를 해석성과 맞바꿔야 하는 문제는 없었다."
> — **Cynthia Rudin**, Duke 교수, Prediction Analysis Lab 디렉터, 2022 Squirrel AI Award 수상, *Nature Machine Intelligence* 2019 (arXiv:1811.10154)

## Reference

- [Part 7 — Ch.08 AI 거버넌스](https://ai-contents-wine.vercel.app/07-ai-dev/#ad-ch8) ⭐ 핵심 챕터 (ACT 6 운영 사이클로 통합 흡수)
- [Part 9 — Ch.11 EU AI Act](https://ai-contents-wine.vercel.app/09-data-enterprise/#p9-ch11) — Article 13 설명 가능성 의무
- [Part 9 — Ch.10 온톨로지·KG](https://ai-contents-wine.vercel.app/09-data-enterprise/#p9-ch10) — 규제 산업 설명 가능성과 연결

## 연관 entity

- [AI Red Team](./ai-red-team.md) — XAI는 공격 원인 분석에 활용
- [MITRE ATLAS](./mitre-atlas.md) — Technique 원인 회로 분석
- [EU AI Act](./eu-ai-act.md) — Article 13 법적 근거
- [Evaluation](./evaluation.md) — 평가의 한 축

## 출처

- Lundberg & Lee, "A Unified Approach to Interpreting Model Predictions", NeurIPS 2017
- Ribeiro et al., "Why Should I Trust You?", KDD 2016 (LIME)
- Sundararajan et al., "Axiomatic Attribution for Deep Networks", ICML 2017 (IG)
- Rudin, "Stop Explaining Black Box Machine Learning Models", *Nature Machine Intelligence* 2019, arXiv:1811.10154
- Anthropic, "Scaling Monosemanticity", transformer-circuits.pub, 2024-05
- Anthropic, "Constitutional Classifiers", 2025-02
- DeepMind, "Gemma Scope", arXiv:2408.05147, 2024-08
- EU AI Act Article 13 — https://artificialintelligenceact.eu/article/13/
- CJEU SCHUFA 판결 C-634/21, 2023-12-07
- 한국 AI 기본법 (법률 제20676호), 시행 2026-01-22

본 엔티티의 전체 자료는 `wiki/sources/web/2026-04-30_ai-redteam-atlas-xai-research.md`에 보존.

## 업데이트 이력

- 2026-04-30 — 신규 생성. Part 7 Ch.13 AI 신뢰성 통합 챕터 작성과 함께 ingest. 4대 고전 기법(SHAP·LIME·IG·Attention) + Mechanistic Interpretability(SAE·Gemma Scope) 통합 정리.
