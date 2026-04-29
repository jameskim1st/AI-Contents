---
title: "AI 신뢰성 3대 기둥 — Red Team · MITRE ATLAS · XAI 통합 리서치 (2026)"
author: Multiple — Microsoft AI Red Team · MITRE · Anthropic · DeepMind · NIST · KISA 등
date_original: 2024-02 ~ 2026-02 (복수 자료)
date_ingested: 2026-04-30
source_type: web
url_or_path: 복수 URL — 본문 References 섹션 참조
used_for: src/content/ai-dev.html Part 7 Ch.13 신규 통합 챕터, wiki/entities/{ai-red-team,mitre-atlas,xai}.md
---

# AI 신뢰성 — Red Team · MITRE ATLAS · XAI 통합 리서치 (2026-04)

## Context

기존 사이트에 ① AI 레드팀은 단편 산재(ai-dev Ch.08·10 한 줄, Part 4 Ch.11 prompt injection, Part 9 Ch.13 data poisoning), ② MITRE ATLAS는 사실상 미수록(ATT&CK 한 줄 언급만), ③ XAI/SHAP은 추상적 "설명 가능성" 언급 4건뿐 구체 기법 0건이라는 진단 후 통합 정리. **Part 7 Ch.13 "AI 신뢰성 — Red Team · MITRE ATLAS · XAI"** 신규 챕터의 근거 자료. 세 주제는 한 사이클(공격→분류→해석→패치→재공격)을 이루므로 한 챕터에 통합.

## Key Points

### 1. AI 레드팀 (AI Red Team)

#### 정의 (Microsoft 공식, 2025-01-13)
> "AI 레드팀은 생성형 AI 시스템의 안전성과 보안을 탐색(probing)하는 실천이며, 목적은 '기술을 부수어 다시 더 강하게 만드는 것'이다."

#### 전통 vs AI 레드팀 결정적 차이
- **공격 표면**: 네트워크/물리/사회공학 → **모델 가중치, 프롬프트, 학습데이터, 임베딩**
- **결정성**: 결정론적 → **확률적** (같은 공격이 어떤 때는 통하고 어떤 때는 안 통함)
- **위협 모델**: CIA → **CIA + Responsible AI 위해**(편향, 환각, 유해 콘텐츠)
- **그래디언트 불필요**: Microsoft 100개 제품 레드팀 8교훈 #2 — *"AI 시스템을 깨기 위해 그래디언트를 계산할 필요는 없다"*

#### 4단계 표준 프로세스
1. **Recon (정찰)** — 시스템 가능 범위·시스템 프롬프트·연결 도구 매핑
2. **Attack (공격)** — 카탈로그 기반 + 신규 합성. PyRIT/Garak 자동화 + 인간 창의성
3. **Measure (측정)** — 안전 벤치마킹과 다름. 위협 모델당 성공률·재현성·심각도
4. **Mitigate (완화)** — 모델 패치만으로 끝나지 않음. *"AI 시스템 보안 작업은 절대 완성되지 않는다"* (8교훈 #8)

#### 공격 카탈로그
- **Direct Prompt Injection** (AML.T0051.000) — OWASP LLM01:2025 1순위
- **Indirect Prompt Injection** (AML.T0051.001):
  - Perplexity Comet (2024) — Reddit 비가시 텍스트로 OTP 유출
  - ChatGPT Memory "spAIware" (2024-09) — 장기 메모리 영구 주입
  - Slack AI Data Exfiltration (2024-08) — RAG poisoning + 사회공학
  - 단일 독성 이메일이 GPT-4o로 SSH 키 유출 80% 성공 (Lakera)
- **Jailbreak 2024-2025**:
  - **DAN** — 페르소나 부여, 가장 문화적으로 유명
  - **Skeleton Key** (Microsoft, 2024-06-26 공개, Mark Russinovich 명명) — 안전 경고를 "차단" 대신 "부착"하라고 in-context로 재정의
  - **Many-shot Jailbreaking** (Anthropic, 2024-04) — 긴 컨텍스트에 수십~수백 개의 가짜 "성공한 우회" 예시
  - 2025 후속 연구 (arXiv:2505.04806): 53개 모델 67.3%가 극도로 취약, Skeleton Key/DAN이 일부 모델에 100% 성공
- **Model Extraction** — 추론 API 쿼리로 모델 가중치/기능 복제
- **Membership Inference Attack (MIA)** — 특정 데이터의 학습셋 포함 여부 추론. 2024 Privacy Backdoor 연구가 fine-tuning 누출률 증폭 (NeurIPS 2024, arXiv:2404.01231)
- **Data Poisoning** — 학습/RAG 데이터 악성 샘플. 소수 문서로 LLM 응답 90%+ 조작 (Promptfoo 2024). RAG DB에서 80~99.8% 추출, Claude 3.7 Sonnet 35% 추출 첫 사례
- **Backdoor (training-time)** — 트리거에만 발동. PoisonGPT (Mithril Security, 2023) HuggingFace 위장 업로드
- **Adversarial Examples**:
  - 비전: Adversarial Neon Beam, 자연광 표지판 공격 (IEEE TPAMI 2024)
  - 오디오: ALIF — 언어 특징 기반 저비용 블랙박스 음성 공격 (2024)

#### 2025-2026 자동화 도구

| 도구 | 만든 곳 | 라이선스 | 핵심 |
|---|---|---|---|
| **PyRIT** (Python Risk Identification Toolkit) | Microsoft AI Red Team | MIT (오픈소스) | 2024-02 공개, 2025-04 Azure AI Foundry "AI Red Teaming Agent" 통합 |
| **Garak** | Leon Derczynski → NVIDIA 인수·유지 | Apache 2.0 | ~100개 공격 벡터, 회당 최대 20K 프롬프트, 37+ probe, 23개 generator backend |
| **NeMo Guardrails** | NVIDIA | Apache 2.0 | 입출력 가드레일 — 레드팀의 방어측 |
| **Lakera Red / Guard** | Lakera (스위스, Gandalf 게임으로 유명) | 상용 SaaS | PyRIT가 데모에서 Gandalf 자동 jailbreak 사용 |
| **Robust Intelligence** | 2024-10 **Cisco가 ~$400M 인수** → Cisco AI Defense | 상용 | 업계 최초 AI Firewall, 2024 Gartner Cool Vendor |
| **Mindgard** | 영국, 누적 $11.6M ($8M 2024-12) | 상용 | DAST-AI. ATLAS·OWASP LLM Top 10 매핑. 2025 Cybersecurity Excellence Award |
| **HiddenLayer** | 미국, 누적 $56M | 상용 | ML 모델 보호. 원본 데이터·알고리즘 접근 없이 보호 |

#### 실전 사례
- **Anthropic Constitutional Classifiers** (2025-02) — HackerOne 챌린지 339명·30만+ 시도·**누적 ~3,700시간** 검증
- **Anthropic Frontier Red Team** (2025) — Claude의 Cybench CTF 1년 만에 5%→33%, ASL-3 임계 근접 경고
- **OpenAI Preparedness Framework v2** (2025-04-15) — High/Critical capability 두 임계, 생화학·사이버·자기개선 카테고리. 학계 비판 — MIT AI Risk Repository 24 카테고리 중 3개만 체계 평가 (arXiv:2509.24394)
- **Microsoft AI Red Team — 100+ 제품** (2018~2024-09 73개 작전·108개 제품, arXiv:2501.07238)
- **DEF CON GRT Challenge** (2023-08-11~13, Las Vegas, 백악관 OSTP 후원) — 2,200명·17,469 대화·164,208 메시지. 8개사 모델, 21개 챌린지. 결과 백악관·미 의회 AI Caucus 전달
- **한국**: 과기정통부·KISA 「인공지능(AI) 보안 안내서」 2025-12-10 배포, 「생성형 AI 개인정보 처리 안내서」 2025-08

### 2. MITRE ATLAS

**ATLAS** = Adversarial Threat Landscape for Artificial-Intelligence Systems. MITRE 운영, 2020년 출범. ATT&CK 매트릭스 모델 상속(13 tactics) + AI 고유 tactic(ML Attack Staging). 운영: Dr. Christina Liaghati (ATLAS Lead, NIST 2025-09 발표).

**최신 버전 (2026-04 시점):**
- v5.1.0 (2025-11): 16 tactics, 84 techniques, 56 sub-techniques, 32 mitigations, **42 case studies**
- v5.4.0 (2026-02): 에이전트 중심 — "Publish Poisoned AI Agent Tool", "Escape to Host"

**16 Tactics:**
Reconnaissance / Resource Development / Initial Access / ML Model Access / Execution / Persistence / Privilege Escalation / Defense Evasion / Credential Access / Discovery / Collection / **ML Attack Staging (ATLAS 고유)** / Command and Control / Exfiltration / Impact / Cost Harvesting

**대표 Techniques:**
- AML.T0000 Search for Victim's Publicly Available Research Materials
- AML.T0040 ML Model Inference API Access
- AML.T0051 LLM Prompt Injection (.000 Direct, .001 Indirect)
- AML.T0018 Backdoor ML Model
- AML.T0024 Exfiltration via ML Inference API
- AML.T0048 External Harms

**대표 Case Studies (42건 중):**
- AML.CS0001 Microsoft Tay (2016-03) — 16시간 만에 종료, "Repeat after me" + 적응형 학습 오염. Online Data Poisoning + Erode Integrity
- Microsoft Tay-Repurposing (2017)
- GPT-2 Misuse (2019) — 단계적 출시 결정 배경
- PoisonGPT (2023, Mithril Security) — HuggingFace 변조 업로드 공급망
- ChatGPT Plugin Privacy Leak — 간접 인젝션
- AML.CS0031 Deepfake KYC Attack (2025-11 등록) — 은행/암호화폐 KYC liveness 우회 (얼굴 스왑 + OBS 가상 카메라)
- 한국: 공식 케이스 스터디 미확인 (2026-04 시점)

### 3. Explainable AI (XAI)

#### 왜 필요한가 — 규제·산업

- **EU AI Act Article 13** (2024-08-01 발효, 2026-08 전면) — 고위험 AI 투명성 + instructions for use
- **EU AI Act Article 86** — 자동 결정의 주요 요소 설명 권리
- **GDPR Article 22 + 15(1)(h)** — 자동 결정 거부 + "의미 있는 정보" 권리
- **CJEU SCHUFA 판결 C-634/21** (2023-12-07) — 신용국 점수 의존 자동 결정 GDPR 위반. 2025-01 후속 판결로 "설명권" 명문화
- **FDA AI/ML 의료기기 가이드** (2024 업데이트), **Fed SR 11-7**, **ECOA Adverse Action Notice**
- **한국 AI 기본법 (2026-01-22 시행)** — 고영향 AI·생성형 AI 투명성 의무

#### 분류 4분면

| | Global (전체 모델) | Local (개별 예측) |
|---|---|---|
| **Intrinsic** | Linear, Tree, GAM, **SAE** | (해당 모델의 단일 결정) |
| **Post-hoc** | Permutation Importance, SHAP global | LIME, SHAP local, Integrated Gradients, Grad-CAM, Counterfactuals |

#### 4대 핵심 기법

**1) SHAP (SHapley Additive exPlanations)**
- 이론: Lloyd Shapley 1953 게임이론 (Shapley value)
- ML 적용: Lundberg & Lee, NeurIPS 2017 (UW). Local accuracy + missingness + consistency 세 공리를 모두 만족하는 유일한 additive feature attribution이 Shapley value임을 증명
- 변종: TreeSHAP (다항식), KernelSHAP (model-agnostic), DeepSHAP
- 점유: 의료·금융 사실상 표준. FICO xAI 툴킷 채택

**2) LIME (Local Interpretable Model-agnostic Explanations)**
- Ribeiro/Singh/Guestrin, KDD 2016
- 동작: 인스턴스 주변 perturbation 샘플링 → 가중 선형 surrogate 적합
- 한계: 일관성(consistency) 미보장 — 같은 예측에 다른 설명 가능

**3) Integrated Gradients**
- Sundararajan/Taly/Yan, ICML 2017 (Google)
- 동작: baseline에서 입력까지 직선 경로의 그래디언트 적분. Sensitivity·Implementation Invariance 공리 만족
- 구현체: **Captum** (Meta/PyTorch), tf-explain, Alibi

**4) Attention / Probing**
- Jain & Wallace 2019 *"Attention is not Explanation"* — attention weight ≠ 진짜 인과 기여
- Probing classifier (Tenney 2019 BERTology)

#### LLM 시대 해석성 (2024-2026) — Mechanistic Interpretability

- **Anthropic "Scaling Monosemanticity"** (2024-05) — Claude 3 Sonnet에 SAE 학습, 다국어·멀티모달 일반화 추상 feature 발견
- **Anthropic "Golden Gate Claude"** (2024-05 데모) — Golden Gate Bridge feature 강제 활성화 → 모델이 자기를 다리라고 착각. **SAE가 행동을 인과적으로 조작 가능함 증명**
- **Anthropic Constitutional Classifiers** (2025-02) — 보편적 jailbreak 방어 프로토타입
- **DeepMind Gemma Scope** (2024-08, arXiv:2408.05147) — Gemma 2 2B/9B 전 layer JumpReLU SAE 학습. **400+개 SAE, 3천만+ feature** 공개. Gemma 2 9B 학습 컴퓨트의 ~15%
- **Gemma Scope 2** (2025-12) — Gemma 3 풀스택 해석성 suite
- **DeepMind Tracr** (2023) — RASP → transformer 가중치 컴파일, 정답 알려진 ground-truth circuit
- **Neel Nanda** (DeepMind) — TransformerLens 라이브러리, MATS 프로그램
- **Chris Olah** (Anthropic 공동창업자, TIME100 AI 2024) — mechanistic interpretability 명명자

#### 산업 사례
- 신용 거절 사유: FICO xAI 툴킷 SHAP/LIME → ECOA Adverse Action Notice + GDPR Article 22 동시
- 의료: SHAP 기반 알츠하이머 조기진단 (2024 systematic review)
- 채용 AI 편향 진단: SHAP이 protected attribute 누출 탐지 표준

### 4. 통합 — AI 신뢰성 사이클

```
Red Team (PyRIT, Garak, Mindgard)
  ↓ 공격 결과 분류·기록
MITRE ATLAS (Tactic·Technique·Case Study)
  ↓ 위협 분류
XAI (SHAP, SAE, Activation Patching)
  ↓ 원인·feature 분석
Mitigation (Guardrails, RLHF, Constitutional Classifier)
  ↑ 패치 후 재공격
```

**한 그림 케이스 — Skeleton Key:**
1. Recon/Attack — Microsoft AI Red Team이 발견 (2024-06)
2. ATLAS — AML.T0051 LLM Prompt Injection (Direct), Defense Evasion
3. XAI — SAE로 "안전 거부" feature가 in-context redefinition으로 어떻게 억제되는지 회로 분석
4. Mitigation — Constitutional Classifier + 시스템 프롬프트 강화 + 가드레일
5. 재공격 — HackerOne 339명·30만 시도·3,700시간

이 사이클이 OpenAI Preparedness · Anthropic RSP · EU AI Act Article 15 모두에서 명시 요구.

### 5. 한국 자료

- **한국 AI 기본법** (법률 제20676호, 공포 2025-01-21, 시행 2026-01-22) — 5대 의무: 투명성·안전성·고영향 AI 사업자 책무·AI 영향평가·국내 대리인. 1년+ 계도기간
- **KISA 「AI 보안 안내서」** 2025-12-10 — ATLAS·NIST·ISO 매핑
- **KISA 「생성형 AI 개인정보 처리 안내서」** 2025-08
- **NIA** — AI 윤리·신뢰성 국가 거버넌스
- **KISDI** 2025-09 No.2 — OECD AI 원칙 중심 한국 AI 정책
- **ITIF** 2025 — 한국 AI 기본법 전략·진흥·규제 분석 (한글 번역본)

## Quotes

> "AI 시스템을 깨기 위해 그래디언트를 계산할 필요는 없다."
> — **Microsoft AI Red Team**, "Lessons From Red Teaming 100 Generative AI Products" (8교훈 #2), arXiv:2501.07238, 2025-01

> "AI 시스템을 안전하게 만드는 일은 결코 완성되지 않는다."
> — **Microsoft AI Red Team**, 8교훈 #8, 2025-01

> "Skeleton Key는 모델의 가드레일을 부수는 것이 아니라, 가드레일에게 자기 자신을 무시하라고 설득한다."
> — **Mark Russinovich**, Microsoft Azure CTO, Microsoft Security Blog, 2024-06-26

> "고위험 결정에 블랙박스 머신러닝 모델을 설명하려 하지 말고, 처음부터 해석 가능한 모델을 사용하라. 범죄·의료·컴퓨터 비전·전력망 신뢰성 어디에서도 정확도를 해석성과 맞바꿔야 하는 문제는 없었다."
> — **Cynthia Rudin**, Duke Prediction Analysis Lab 디렉터, 2022 Squirrel AI Award 수상, *Nature Machine Intelligence* 2019 / arXiv:1811.10154

> "이 시스템들을 정말로 이해할 수 있다면 — 많은 진전이 필요하지만 — 모델이 실제로 안전한 시점을 말할 수 있게 될지도 모른다."
> — **Chris Olah**, Anthropic 공동창업자, mechanistic interpretability 명명자, TIME100 AI 2024

## References (URL 일람)

### Microsoft / 산업
- https://www.microsoft.com/en-us/security/blog/2025/01/13/3-takeaways-from-red-teaming-100-generative-ai-products/
- https://arxiv.org/abs/2501.07238 (Bullwinkel et al., 2025-01)
- https://www.microsoft.com/en-us/security/blog/2024/06/26/mitigating-skeleton-key-a-new-type-of-generative-ai-jailbreak-technique/
- https://www.microsoft.com/en-us/security/blog/2024/02/22/ (PyRIT 공개)

### MITRE ATLAS
- https://atlas.mitre.org/
- https://github.com/mitre-atlas/atlas-data
- https://csrc.nist.gov/csrc/media/Presentations/2025/mitre-atlas/TuePM2.1-MITRE%20ATLAS%20Overview%20Sept%202025.pdf
- https://www.vectra.ai/topics/mitre-atlas

### Anthropic
- https://transformer-circuits.pub/2024/scaling-monosemanticity/
- https://www.anthropic.com/news/constitutional-classifiers (2025-02)
- https://www.anthropic.com/news/strategic-warning-for-ai-risk-progress-and-insights-from-our-frontier-red-team
- https://time.com/collections/time100-ai-2024/7012873/chris-olah/

### DeepMind
- https://arxiv.org/abs/2408.05147 (Gemma Scope, 2024-08)
- https://deepmind.google/discover/blog/gemma-scope-helping-the-safety-community-shed-light-on-the-inner-workings-of-language-models/

### XAI 논문
- https://proceedings.neurips.cc/paper_files/paper/2017/file/8a20a8621978632d76c43dfd28b67767-Paper.pdf (SHAP)
- https://www.nature.com/articles/s42256-019-0048-x (Rudin)
- arXiv:1811.10154 (Rudin "Stop Explaining Black Box")

### OpenAI / 정책
- https://openai.com/index/updating-our-preparedness-framework/ (2025-04-15)
- https://artificialintelligenceact.eu/article/13/
- https://www.fico.com/blogs/cjeu-ruling-highlights-need-explainability-analytics
- https://www.nist.gov/itl/ai-risk-management-framework
- https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf

### 보안 도구
- https://www.cisco.com/site/us/en/products/security/ai-defense/robust-intelligence-is-part-of-cisco/index.html
- https://mindgard.ai/
- https://aminrj.com/posts/attack-patterns-red-teaming/ (Garak)
- https://www.lakera.ai/blog/indirect-prompt-injection
- https://genai.owasp.org/llmrisk/llm01-prompt-injection/

### 한국
- https://www.law.go.kr/lsInfoP.do?lsiSeq=268543 (한국 AI 기본법)
- https://www.kisa.or.kr/2060204/form?postSeq=19 (KISA AI 보안 안내서)
- https://www.kisa.or.kr/2060301/form?postSeq=41 (KISA 생성형 AI 개인정보)
- https://www2.itif.org/2025-korea-ai-act-ko.pdf

### 추가
- https://en.wikipedia.org/wiki/Tay_(chatbot)
- https://blogs.microsoft.com/blog/2016/03/25/learning-tays-introduction/
- https://arxiv.org/html/2505.04806v1 (53개 모델 jailbreak 분석, 2025)
- https://arxiv.org/html/2404.01231v1 (Privacy Backdoor)

## Entities created/updated
- [ai-red-team](../../entities/ai-red-team.md) — 신규
- [mitre-atlas](../../entities/mitre-atlas.md) — 신규
- [xai](../../entities/xai.md) — 신규
- [prompt-injection](../../entities/prompt-injection.md) — cross-ref 추가
- [evaluation](../../entities/evaluation.md) — cross-ref 추가

## Chapters created/updated
- src/content/ai-dev.html — Part 7 Ch.13 신규 "AI 신뢰성 — Red Team · MITRE ATLAS · XAI"
- 기존 cross-ref 추가 (5곳): ai-dev Ch.08·10, Part 4 Ch.11, Part 9 Ch.11·13, Part 8 data-basics

## Meta

본 자료는 ① Microsoft AI Red Team 공식 백서(2025-01) ② MITRE ATLAS v5.1.0 (2025-11) ③ Anthropic Scaling Monosemanticity (2024-05) ④ DeepMind Gemma Scope (2024-08) ⑤ EU AI Act Article 13/86 + CJEU SCHUFA 판결 ⑥ 한국 AI 기본법 (2026-01 시행) — 6개 1차 출처 기반. 모든 통계·인용에 발화자·소속·날짜 명시. NIST AI RMF "2.0"은 2026-04 시점 미발표(프로파일·크로스워크로 진화 중)임 표기, 한국 ATLAS 공식 케이스는 미확인으로 명시.
