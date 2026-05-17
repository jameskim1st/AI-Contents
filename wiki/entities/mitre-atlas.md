# MITRE ATLAS

**Category:** 프로토콜 / 표준
**Status:** stable (v5.4.0, 2026-02 — 활발히 업데이트)
**Last updated:** 2026-04-30

## TL;DR

**ATLAS** = Adversarial Threat Landscape for Artificial-Intelligence Systems. MITRE가 운영하는 AI/ML 시스템 대상 공격자 TTP(Tactics·Techniques·Procedures) 지식 베이스. **ATT&CK 매트릭스 모델을 따라 13개 tactic을 상속**, AI 고유 tactic(예: ML Attack Staging) 보완. **2020년 출범**, 2026-04 시점 v5.4.0 — **16 tactics, 84 techniques, 56 sub-techniques, 32 mitigations, 42 case studies**. AI 레드팀 결과물의 분류·기록 표준이며, KISA·NIST·OWASP가 참조하는 사실상 산업 어휘.

## 설명

### ATT&CK과의 관계

| | MITRE ATT&CK (2013~) | MITRE ATLAS (2020~) |
|---|---|---|
| 대상 | 일반 IT 시스템 | AI/ML 시스템 |
| 구조 | 14 tactics × 600+ techniques | 16 tactics × 84+ techniques |
| 매핑 | 사이버 공격 표준 어휘 | AI 공격 표준 어휘 |
| 운영 | MITRE Corporation | MITRE Corporation, Christina Liaghati (ATLAS Lead) |

ATLAS는 ATT&CK의 13 tactic을 그대로 상속하고, **ML Attack Staging** 같은 AI 고유 tactic을 추가. 같은 분류 체계라 보안 팀 간 학습 곡선이 낮음.

### 16 Tactics (2026-04 시점)

| # | 영어 | 한국어 | 한 줄 |
|---|---|---|---|
| 1 | Reconnaissance | 정찰 | 시스템 프롬프트·정책·아키텍처 단서 추출 |
| 2 | Resource Development | 자원 개발 | 공격용 모델·데이터·도구 준비 |
| 3 | Initial Access | 초기 접근 | 프롬프트 인젝션·노출 API 진입 |
| 4 | ML Model Access | ML 모델 접근 | 추론 API/모델 아티팩트 직접 접근 |
| 5 | Execution | 실행 | 악성 프롬프트·도구 호출 |
| 6 | Persistence | 지속 | 메모리·파인튜닝·플러그인 영속성 |
| 7 | Privilege Escalation | 권한 상승 | 시스템 권한 우회 (Skeleton Key) |
| 8 | Defense Evasion | 방어 회피 | 가드레일·필터 우회 |
| 9 | Credential Access | 자격증명 접근 | API 키·시스템 프롬프트 탈취 |
| 10 | Discovery | 발견 | 학습 데이터·내부 구조 탐색 |
| 11 | Collection | 수집 | 사용자 입력·중간 결과 수집 |
| 12 | **ML Attack Staging** | ML 공격 준비 | 적대적 예제·백도어·프록시 모델 (**ATLAS 고유**) |
| 13 | Command and Control | 명령·통제 | 에이전트 통한 외부 통신 |
| 14 | Exfiltration | 유출 | 학습 데이터·모델·사용자 데이터 추출 |
| 15 | Impact | 영향 | 무결성·가용성·신뢰 훼손 |
| 16 | Cost Harvesting / Harm | 자원 남용·피해 | 토큰·GPU 비용 부담, 사회적 피해 |

### 대표 Techniques

- **AML.T0000** Search for Victim's Publicly Available Research Materials — 학술 논문·GitHub에서 모델 구조 단서
- **AML.T0040** ML Model Inference API Access — 추론 API 통한 모델 쿼리
- **AML.T0051** LLM Prompt Injection (.000 Direct, .001 Indirect) — OWASP LLM01과 매핑
- **AML.T0018** Backdoor ML Model — 학습 시 트리거형 백도어 삽입
- **AML.T0024** Exfiltration via ML Inference API — API 응답으로 학습 데이터 누출
- **AML.T0048** External Harms — 자동 결정으로 인한 차별·금전적 손해

### 주요 Case Studies (42건 중)

- **AML.CS0001 Microsoft Tay** (2016-03) — Twitter 봇 16시간 만에 종료. "Repeat after me" + 적응형 학습이 trolling으로 오염 → 인종차별·반유대 트윗. **Online Data Poisoning + Erode Integrity**
- **Microsoft Tay-Repurposing** (2017) — 폐기 모델 재활용 시도
- **GPT-2 Misuse** (2019) — 단계적 출시 결정 배경
- **PoisonGPT** (2023, Mithril Security) — HuggingFace 허브에 거짓 사실 응답하는 변조 LLM 업로드, **공급망 위협** 시연
- **ChatGPT Plugin Privacy Leak** — 간접 프롬프트 인젝션 통한 대화 이력 유출
- **AML.CS0031 Deepfake KYC Attack** (2025-11 등록) — 은행·암호화폐 KYC liveness detection 우회 (사회공학 + 얼굴 스왑 AI + OBS 가상 카메라)
- **한국 등록 사례 0건** (2026-04 시점) — 다만 KISA 「AI 보안 안내서」(2025-12)가 ATLAS 매핑을 참고 표준으로 명시

### 한국·국제 표준 매핑

- **KISA 「인공지능(AI) 보안 안내서」 2025-12-10** — ATLAS·NIST·ISO 매핑
- **NIST AI RMF 1.0** (2023-01) — 자발적, 2024-07 GenAI 프로파일 추가, **공식 "2.0"은 2026-04 미발표**(프로파일·크로스워크로 진화)
- **ISO/IEC 42001** (2023-12) — AI 경영 시스템 인증 표준, NIST AI RMF와 상보적
- **한국 AI 기본법** (2025-01-21 공포, 2026-01-22 시행) — 5대 의무

### 버전 이력

- v5.1.0 (2025-11) — 16 tactics, 84 techniques, 32 mitigations, 42 case studies
- v5.4.0 (2026-02) — 에이전트 중심 — "Publish Poisoned AI Agent Tool", "Escape to Host"

## Reference

- [Part 12 Ch.09 운영 사이클](https://ai-contents-wine.vercel.app/12-ai-governance/#gov-ch9) ⭐ 핵심 챕터 (ACT 6 운영 사이클로 통합 흡수)
- [Part 4 — Ch.11 보안과 비용](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch11) — 런타임 공격 매핑
- [Part 11 — Ch.13 Synthetic + Security](https://ai-contents-wine.vercel.app/11-data-enterprise/#p9-ch13) — 데이터 측면

## 연관 entity

- [AI Red Team](./ai-red-team.md) — ATLAS의 입력 (공격 결과)
- [XAI](./xai.md) — ATLAS Technique의 원인 분석
- [Prompt Injection](./prompt-injection.md) — AML.T0051
- [EU AI Act](./eu-ai-act.md) — 거버넌스 매핑

## 출처

- MITRE ATLAS 공식 — https://atlas.mitre.org/
- atlas-data GitHub — https://github.com/mitre-atlas/atlas-data
- Christina Liaghati (MITRE ATLAS Lead), NIST 컨퍼런스 발표, 2025-09
- Vectra AI 정리 — https://www.vectra.ai/topics/mitre-atlas
- KISA 「AI 보안 안내서」, 2025-12-10
- NIST AI RMF — https://www.nist.gov/itl/ai-risk-management-framework
- ISO/IEC 42001 ↔ NIST AI RMF Crosswalk — https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf

본 엔티티의 전체 자료는 `wiki/sources/web/2026-04-30_ai-redteam-atlas-xai-research.md`에 보존.

## 업데이트 이력

- 2026-04-30 — 신규 생성. Part 9 Ch.13 AI 신뢰성 통합 챕터 작성과 함께 ingest.
