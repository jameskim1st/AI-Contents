---
type: web_research
date: 2026-04-30
topic: AI 거버넌스 종합 — 원칙·프레임워크·조직·라이프사이클·사고·운영
used_for: Part 9 Ch.08 통합 재구성
---

# AI 거버넌스 종합 리서치

리서치 에이전트(40 tool uses, ~410초) 결과 보존. 한국 비기술 직군(PM·임원·현업) 대상 콘텐츠 작성용 팩트 베이스.

## 1. 10대 원칙 — 2026 컨센서스 분류

기존 4대 원칙(Fairness/Transparency/Accountability/Privacy) → **10대 원칙 확장** (OECD AI Principles 2024 update + EU AI Act + NIST AI RMF GenAI Profile 2024-07-26 통합).

| # | 원칙 | 정의 | 실패 사례 | 운영 형태 |
|---|---|---|---|---|
| 1 | Fairness / Inclusion | 보호변수에 따른 결과·오류율 차이 | Amazon 채용(2018) — 여성 패널티 | Fairlearn, demographic parity |
| 2 | Transparency / Explainability | 결정의 근거 공개 | COMPAS — 판사·피고에 비공개 | Model Card, Datasheet, LIME/SHAP |
| 3 | Accountability | 책임 지는 자연인·법인 명시 | Air Canada(2024-02 BCCRT) | RACI, AI Risk Officer, audit log |
| 4 | Privacy / Data Protection | 학습·추론 양 단계 보호 | Italy Garante ChatGPT(€15M, 2024), DeepSeek(2025-01) | DPIA, K-익명화, federated learning |
| 5 | Safety / Reliability | 의도된 범위 내 일관 작동 | IBM Watson Oncology(2018-07 STAT News) | red teaming, eval harness |
| 6 | Robustness / Security | 적대적 공격·분포 변화 견디기 | 프롬프트 인젝션 | adversarial testing, KISA 안내서 |
| 7 | Human Oversight (EU AI Act Art.14) | 사람이 멈추거나 뒤집을 수 있어야 | 자율 채용·신용 결정 | HITL/HOTL, kill switch |
| 8 | Societal & Environmental Impact | 노동·민주주의·생태계 (2024 OECD 추가) | Replika 정서 의존(€5M, 2025) | AIA, energy/CO2 reporting |
| 9 | **Capability Control** ⭐ NEW (frontier-only) | 수준별 안전 조치 차등 | (Mythos가 첫 사례) | RSP, Preparedness, FSF |
| 10 | **Information Integrity / Provenance** ⭐ NEW (2024 OECD 추가) | AI 생성물 식별 | 정치 광고 딥페이크 | C2PA, SynthID, 한국 AI 기본법 워터마크 의무 |

## 2. 글로벌 프레임워크

### EU AI Act (Regulation 2024/1689)
- 2024-07-12 OJEU, 2024-08-01 발효
- 2025-02-02 Prohibited AI 적용
- 2025-08-02 GPAI 의무
- **2026-08-02** ⭐ Article 10 데이터 거버넌스 + 고위험 AI 본체 의무
- 2027-08-02 Annex I (제품 안전 통합형)
- **위험 4단계** (Unacceptable / High-risk / Limited / Minimal)
- **Annex III 8개 분야**: 생체인식, 핵심 인프라, 교육, 채용·노동, 필수 공공서비스, 법 집행, 이민·국경, 사법·민주
- **Article 13** 투명성, **Article 14** 인간 감독, **Article 73** 사고 보고(15일/2일/10일), **Article 86** 설명권
- **GPAI 의무**: 학습 데이터 요약, 저작권 정책, FLOPs 10^25 이상 모델은 적대적 평가·사고 보고
- **벌금**: 금지 위반 €35M 또는 매출 7% / 고위험 €15M·3% / GPAI €15M·3%

### NIST AI RMF 1.0 (2023-01) + GenAI Profile (NIST AI 600-1, 2024-07-26)
- **자발적이지만 미국 사실상 표준**
- 4 함수: GOVERN / MAP / MEASURE / MANAGE
- GenAI Profile: Executive Order 14110 후속, **12개 GenAI 고유 위험 + 200+ 권장 액션**

### ISO/IEC 42001 (2023-12)
- **세계 최초 AI 경영 시스템(AIMS) 국제 표준 — 인증 가능**
- ISO 9001/27001과 같은 PDCA 구조
- ANAB 2024-01 인정 프로그램 시작
- EU AI Act "presumption of conformity" 경로로 활용 가능

### OECD AI Principles (2019, 2024-05 업데이트)
- 47개국 채택
- 2024-05 추가: 환경 지속가능성, 허위정보 대응, 공급망 책임·IP·노동시장

### UNESCO Recommendation on Ethics of AI (2021-11-23)
- 194개 회원국 — **첫 글로벌 AI 윤리 표준**
- 4 가치 + 10대 원칙 + 11 정책 영역

### G7 Hiroshima AI Process (2023-05~)
- International Code of Conduct (11 행동 강령)
- Voluntary Reporting Framework

### AI Safety Summit 시리즈
- Bletchley Declaration (2023-11): 28+EU 서명
- Seoul Summit (2024-05): Frontier AI Safety Commitments — 16개사
- Paris AI Action Summit (2025-02): 안전 → "행동" 강조점 이동

### 한국 AI 기본법 (법률 제20676호)
- 2024-12-26 국회 통과 → 2025-01-21 공포 → **2026-01-22 시행**
- 2025-11-12 시행령 입법예고
- **고영향 AI**: 의료·채용·금융신용·사법·공공서비스
- **5대 의무**: 투명성·안전성·고영향 AI 사업자 책무·AI 영향평가·국내 대리인
- **워터마크**: 사람·기계 인식 가능 표시 둘 다 가능. **딥페이크는 사람 인식 표시만 인정**
- **사고 보고**: **24시간 최초 보고 + 15일 결과 보고** (EU 대비 first-notice 빠름)
- **유예**: 시행 후 최소 1년 이상 유예 → 실질 강제 2027 초

### 한국 KISA 가이드라인
- 「생성형 AI 개발·활용을 위한 개인정보 처리 안내서」 (2025-08, PIPC)
- 「AI 보안 안내서」 (2025-12-10, KISA)

## 3. 조직 구조

### 3 Lines of Defense
- **1선(빌더)**: ML/Data 엔지니어 — 자체 QA·편향 탐지
- **2선(거버넌스)**: AI Risk Officer, Compliance, Privacy Officer — 정책·독립 검토
- **3선(감사)**: Internal Audit + 외부 인증(ISO 42001) — 이사회 보고

### 신규 직군
- **CAIO** (Chief AI Officer) — 2024 Fortune 500의 1/3 신설
- 미 연방정부 OMB M-24-10에 따라 모든 부처가 CAIO 지정
- AI Lead, AI Risk Officer, Responsible AI Engineer, Red Team Lead

### Microsoft 3-body 모델
1. **Senior Leadership Team** — 최종 의사결정
2. **Office of Responsible AI (ORA)** — 4개 기능 (Internal policy / Enablement / Case management / Public policy)
3. **AETHER Committee** — Eric Horvitz 주도, 6개 워킹그룹
- **RAISE (Responsible AI Strategy in Engineering)** — Hub-and-spoke 모델

### Salesforce
- **Office of Ethical and Humane Use (OEHU)** — 2018-08 신설, Paula Goldman 초대
- **Ethical Use Advisory Council** — 외부 학계·시민사회 + 사내 + 고객 응대 직원

### 윤리 위원회 권장 구성
- 5-9명, 외부인 30%+ (ethics washing 방지)
- 법무·기술·UX·영업·외부 전문가 + 윤리 전공자 1인

## 4. 거버넌스 라이프사이클 9단계

```
Define → Risk Class → Data Gov → Model Dev → Pre-deploy → Deploy → Monitor → Incident → Decommission
```

| 단계 | 검토 | 산출물 | Stage Gate |
|---|---|---|---|
| 1. Use case | 비즈니스 가치, 영향 범위 | Use case canvas | 영향평가 트리거? |
| 2. 위험 분류 | EU 4단계, 한국 고영향? | Risk classification report | 고위험→Ethics Board |
| 3. 데이터 거버넌스 | 출처·라이선스·편향, PII | **Datasheet for Datasets**, DPIA | 합법 처리 근거 |
| 4. 모델 개발 | 학습 분포, 평가 메트릭 | **Model Card**, eval report | bias/fairness 통과 |
| 5. 배포 전 검토 | red team, 적대적 테스트 | **System Card**, **AIA**, **AIBOM** | Ethics Board 승인 |
| 6. 배포 | canary, 사용자 고지 | UI 문구, watermark | 모니터링 SLA |
| 7. 모니터링 | drift, 사고율, 피드백 | Observability 대시보드 | 자동 롤백 |
| 8. 사고 대응 | 영향 범위, 근본 원인 | Incident report (15일 EU / 24h 한국) | 보고 의무 |
| 9. 폐기 | 데이터·weights 삭제 | Decommissioning log | GDPR 잊혀질 권리 |

## 5. 거버넌스를 형성한 11개 사고 연표

| 날짜 | 사건 | 핵심 | 교훈 |
|---|---|---|---|
| 2016-03-23 | Microsoft Tay | 16시간 만에 종료, 96,000 트윗, "repeat after me" 취약점 | Anti-adversarial 설계 |
| 2016-05-23 | ProPublica COMPAS | 흑인 false positive 약 2배. 통제변수 후 77% 더 높은 violent 분류 위험 | Fairness 정의 동시 만족 불가 (Kleinberg-Mullainathan-Raghavan 2017) |
| 2018-07-25 | IBM Watson Oncology (STAT News) | MSK 합성 데이터·소수 의사로 학습. 출혈 환자에 출혈 risk drug 권고 | Real-world data + multi-site validation |
| 2018-10-10 | Amazon 채용 폐기 | 5점 시스템, 10년 이력서 남성 위주 → 여성 대학교명 패널티 | History bias 자체 |
| 2019-11-09 | Apple Card 차별 논란 | DHH "본인이 아내의 20배 신용한도". NY DFS 2021-03-23 차별 증거 없음 결론. 그러나 투명성 부족 지적 | Black box → 신뢰 손실이 별도 거버넌스 실패 |
| 2023-02-03~2025-05 | Replika — Italy Garante | 정서 의존 유도, 미성년 보호 미흡 → 2025-05 €5M 벌금 확정 | 정서적 dark pattern도 거버넌스 대상 |
| 2023-03-31 | Italy ChatGPT 차단 | GDPR 위반, 약 1개월 후 해제, 2024 €15M 벌금 | EU 시장 = GDPR 1순위 |
| 2024-01-19 | DPD 챗봇 | 욕설·DPD 비난 시(詩). 1.3M 트윗 | 프롬프트 인젝션 가드레일 |
| **2024-02-14** | **Moffatt v. Air Canada (BCCRT 2024 BCCRT 149)** | 모친상 항공권 챗봇 잘못 안내, "챗봇은 별도 인격" 항변 BC 민사조정원 기각, **CAD $650 + 이자·비용 배상** | 회사는 챗봇 발언에 대해 negligent misrepresentation 책임 — 챗봇 법적 인격 부인 |
| 2025-01-30 | Italy Garante DeepSeek | Hangzhou·Beijing DeepSeek에 대한 definitive limitation. GDPR 적용 부인 부적절 판단 | 중국 AI EU 시장 봉쇄 사례 |
| 2025-05 | Anthropic ASL-3 활성화 | Claude Opus 4 출시와 함께 ASL-3 Deployment + Security Standard 발효. weights 도난 방지 + CBRN 차단 | Frontier 자발적 capability gating 첫 작동 사례 |
| **2026-04** | **Claude Mythos** | 별도 자료 — `2026-04-30_claude-mythos-research.md` | ASL-4 첫 실전, Project Glasswing, 샌드박스 탈옥 |

## 6. 성숙도 모델

### Gartner 5 레벨
1. Awareness → 2. Active → 3. Operational → 4. Systemic → 5. Transformational
- 고성숙 조직 45%가 AI 3년+ 운영. 점수 4.2-4.5 vs 저성숙 1.6-2.2

### BCG AI Maturity Matrix (2024-11)
- Exposure × Readiness 두 축, 73개국
- Pacesetters / Contenders / Practitioners / Emerging
- 한국·미국·중국·UK·싱가포르 = Pacesetters

### CMM 차용 일반화
- Initial → Repeatable → Defined → Managed → Optimizing
- Defined부터 Model Card·Datasheet 표준화, Managed부터 자동 모니터링, Optimizing은 사고 학습 루프

## 7. 운영 도구·아티팩트

| 도구 | 출처 | 무엇 |
|---|---|---|
| **Model Cards** | Mitchell et al. Google 2018 (arXiv:1810.03993) | 학습 데이터, 의도된 사용, 그룹별 성능, 한계 |
| **Datasheets for Datasets** | Gebru et al. 2018 CACM | Motivation/Composition/Collection/Preprocessing/Uses/Distribution/Maintenance |
| **FactSheets** | Arnold et al. IBM 2019 | API 형태 conformity 선언서 |
| **System Cards** | OpenAI 2023-03~ | Preparedness 평가, red team 결과 (GPT-4o 2024-08, o1 2024-12) |
| **AIA (Algorithmic Impact Assessment)** | Canada Treasury Board 2020-04부터 mandatory | 65개 위험 + 41개 완화 질문, 4단계 영향 |
| **Responsible AI Toolbox** | Microsoft 오픈소스 | Fairlearn, InterpretML, Error Analysis, Counterfactual |
| **AIBOM** | NIST CSRC 2024, OWASP AIBOM 2025 | dataset/model/dependencies/deployment env JSON. **IBM Granite 4.0 첫 공개 사례** |
| **Audit Logs** | EU AI Act Article 12 의무 | 결정 이력 |
| **SynthID** | DeepMind 2023~ | 픽셀/토큰 invisible watermark. 2024-05 텍스트·비디오 확장, 2024-10 SynthID Text 오픈소스. **누적 200억 이미지** |
| **C2PA Content Credentials 2.1** | Adobe·MS·Sony·Intel | 암호 서명된 메타데이터 envelope |

## 8. Capability Control — Frontier 거버넌스

### Anthropic RSP
- 2023-09 v1 → 2024-10-15 v3 → 2025 update
- ASL: 1 / 2 (현재) / 3 (2025-05 활성, Claude Opus 4) / 4 (정의 미완성) / 5 (catastrophic)
- 2025 update: CBRN development capability threshold, AI R&D 두 단계 분리

### OpenAI Preparedness Framework v2 (2025-04-15)
- v1 4단계 → **v2 High/Critical 두 단계**
- 위험 영역 3: Biological/Chemical, Cybersecurity, AI Self-improvement
- High: 배포 전 safeguard. Critical: 개발 단계 safeguard

### Google DeepMind Frontier Safety Framework
- v1 2024-05 → v2 2025 → v3 2025-09 → 2026-04-17
- **CCLs (Critical Capability Levels)**: autonomy, biosecurity, cybersecurity, ML R&D
- 2025: harmful manipulation CCL 신설
- 2026-04: TCLs (조기 감지) 추가
- Gemini 3 Pro FSF Report (2025-11) — 첫 공개 모델별 보고서

### 정부·국제기구
- UK AISI: 2025-02 AI Safety Institute → AI Security Institute 개명. 2024년 30+ 모델 평가
- US AISI: NIST 산하, EO 14110 hub
- EU AI Office: GPAI 감독, 2025 Code of Practice

### 자발적 약속
- 2023-07 White House: 7개사 8 commitment
- 2023-09 +8개사 → 2024-07 +Apple = **16개사**
- MIT Tech Review: 외부 검증 메커니즘 부재가 한계

### 산업 컨소시엄
- **Frontier Model Forum** (2023-07-26): Anthropic, Google, Microsoft, OpenAI 공동. AI Safety Fund $10M+
- Partnership on AI: AI Incident Database
- MLCommons AI Safety Working Group

### METR
- Time Horizon = AI가 50% 성공률로 완료 가능한 인간 작업 시간
- **Doubling time: 2019-2025 7개월 → 2024-2025 4개월 가속**
- Claude 3.7 Sonnet ≈ 1시간 horizon (2025-03)
- AI 능력 진전 정량 추적 사실상 표준

## 9. 사고 보고 인프라

- **AIID** (Partnership on AI 2020~): 누적 1,200+ 사고. 2025-11~2026-01 +108 신규
- **OECD AIM**: Event Registry, 일 150,000+ 뉴스 모니터링. 2025-02 OECD "Common Reporting Framework" 보고서
- **EU AI Act Article 73**: 15일/2일/10일, 당국 7일 내 조치. 2025-10 가이드라인 초안
- **한국 AI 기본법**: 24h 최초 + 15일 결과 (EU 대비 first-notice 빠름)

## 10. 거버넌스 실패 패턴 6가지

### Ethics Washing
- 100여 개 비강제 코드 발표 → 실무 미미
- 신호: 윤리위 거부권 없음, 외부 위원 NDA, 연 1회 형식 회의

### Fairness Theater
- Formalism trap — 통계적 fairness 정의 충족 ≠ 실질 공정
- COMPAS 기본 불가능 정리 (Kleinberg-Mullainathan-Raghavan 2017)
- 회피: 여러 metric 동시 보고, 우선순위 명시

### Box-checking Compliance
- 체크리스트 통과 vs 시스템적 위험
- Colorado AI Act (2024-05) 우려 사례

### Tradeoff Blind Spot
- Privacy ↔ Explainability (DP는 개별 설명 어려움)
- Fairness ↔ Accuracy
- Safety ↔ Accessibility (over-refusal)
- Transparency ↔ Security (모델 카드 디테일 = attack vector)

### Responsibility Gap
- Air Canada "AI 별도 인격" 항변
- Springer 2024 "persistent agency gap"

### Velocity Mismatch
- 모델: METR 4개월 doubling
- 거버넌스: EU AI Act 4년 입법 + 2년 implement
- 결과: 거버넌스 2-3 generation 뒤처짐

## 핵심 메시지 (한국 청중 강조점)

1. **2026-01-22 한국 AI 기본법 + 2026-08-02 EU AI Act 고위험 의무** = 한국 기업의 두 마감선
2. **Air Canada 판결**: PM에게 가장 직관적인 책임 사례
3. **Microsoft 3-body + 3 Lines of Defense** 매핑이 임원진에게 그릴 수 있는 그림
4. **METR 4개월 doubling vs EU 4년 입법** = velocity gap, 마무리 메시지

## 출처 (요약)

핵심 1차 자료(완전 목록은 리서치 에이전트 결과 참조):
- 한국 AI 기본법: https://www.law.go.kr/lsInfoP.do?lsiSeq=268543
- KISA AI 보안 안내서: https://www.etnews.com/20251210000140
- EU AI Act Article 73: https://artificialintelligenceact.eu/article/73/
- NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework
- NIST AI 600-1: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
- ISO/IEC 42001: https://www.iso.org/standard/42001
- OECD AI Principles 2024: https://www.oecd.org/en/about/news/press-releases/2024/05/oecd-updates-ai-principles-to-stay-abreast-of-rapid-technological-developments.html
- UNESCO: https://www.unesco.org/en/articles/recommendation-ethics-artificial-intelligence
- Anthropic RSP: https://www.anthropic.com/responsible-scaling-policy
- ASL-3 활성: https://www.anthropic.com/news/activating-asl3-protections
- OpenAI Preparedness v2: https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf
- DeepMind FSF v3: https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/strengthening-our-frontier-safety-framework/frontier-safety-framework_3.pdf
- Frontier Model Forum: https://www.frontiermodelforum.org/updates/year-in-review/
- Microsoft AETHER: https://erichorvitz.com/Aether_Committee_Microsoft.htm
- Salesforce OEHU: https://www.salesforce.com/company/ethical-and-humane-use/
- 3 Lines of Defense: https://cdn.governance.ai/Three_Lines_of_Defense_Against_Risks_From_AI.pdf
- METR: https://metr.org/time-horizons/
- Model Cards: https://arxiv.org/abs/1810.03993
- Datasheets for Datasets: https://cacm.acm.org/research/datasheets-for-datasets/
- AIA Canada: https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/algorithmic-impact-assessment.html
- AI Incident Database: https://incidentdatabase.ai/
- OECD AIM: https://oecd.ai/en/incidents
- Tay: https://en.wikipedia.org/wiki/Tay_(chatbot)
- COMPAS ProPublica: https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing
- IBM Watson STAT: https://www.statnews.com/2018/07/25/ibm-watson-recommended-unsafe-incorrect-treatments/
- Amazon hiring MIT TR: https://www.technologyreview.com/2018/10/10/139858/amazon-ditched-ai-recruitment-software-because-it-was-biased-against-women/
- NY DFS Apple Card: https://www.dfs.ny.gov/reports_and_publications/press_releases/pr202103231
- Air Canada CanLII: https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html
- Italy Replika €5M: https://www.edpb.europa.eu/news/national-news/2025/ai-italian-supervisory-authority-fines-company-behind-chatbot-replika_en
- Italy DeepSeek: https://www.twobirds.com/en/insights/2025/the-garante-imposes-a-definitive-limitation-on-the-processing-of-italian-users%E2%80%99-personal-data
- DPD chatbot: https://www.theregister.com/2024/01/23/dpd_chatbot_goes_rogue/
- Italy ChatGPT €15M: https://www.crossborderdataforum.org/generative-ai-and-gdpr-enforcement-in-europe-a-lot-of-noise-one-fine-zero-survivors/
