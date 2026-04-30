# AI Red Team (AI 레드팀)

**Category:** 방법론 / 보안
**Status:** stable (2025-2026 표준화 진행 중)
**Last updated:** 2026-04-30

## TL;DR

생성형 AI 시스템의 안전성과 보안을 적대적으로 탐색해 약점을 찾아 강화하는 실천. **Microsoft 100개 제품 평가(2018~)**, **Anthropic Constitutional Classifiers HackerOne 챌린지(2025-02, 339명·30만 시도·3,700시간)**, **OpenAI Preparedness Framework v2(2025-04)**가 산업 표준. 전통 보안 레드팀과 다른 결정적 특징은 ① 공격 표면이 모델 가중치·프롬프트·학습 데이터 ② 결정성이 확률적(같은 공격이 어떤 때만 통함) ③ "그래디언트 없이도 깨진다" — Microsoft AI Red Team 8교훈 #2.

## 설명

### 정의 — Microsoft 공식 (2025-01-13)

> "AI 레드팀은 생성형 AI 시스템의 안전성과 보안을 탐색(probing)하는 실천이며, 목적은 '기술을 부수어 다시 더 강하게 만드는 것'이다."

### 전통 보안 레드팀과의 결정적 차이

| 구분 | 전통 레드팀 | AI 레드팀 |
|---|---|---|
| 공격 표면 | 네트워크·물리·사회공학 | 모델 가중치·프롬프트·학습 데이터·임베딩 |
| 결정성 | 결정론적 (성공/실패 명확) | **확률적** (같은 공격이 어떤 때만 통함) |
| 위협 모델 | CIA (기밀성·무결성·가용성) | CIA + **Responsible AI 위해** (편향·환각·유해 콘텐츠) |
| 그래디언트 필요? | N/A | **불필요** (Microsoft 8교훈 #2) |

### 4단계 표준 프로세스

1. **Recon (정찰)** — 시스템 가능 범위·시스템 프롬프트·연결 도구 매핑
2. **Attack (공격)** — 카탈로그 기반 + 신규 합성 (PyRIT/Garak 자동화 + 인간 창의성)
3. **Measure (측정)** — 안전 벤치마킹과 다름. 위협 모델당 성공률·재현성·심각도
4. **Mitigate (완화)** — 모델 패치만으로 끝나지 않음. *"AI 시스템 보안 작업은 절대 완성되지 않는다"* (8교훈 #8)

### 공격 카탈로그 (2024-2026)

- **Direct Prompt Injection** (AML.T0051.000) — OWASP LLM01:2025 1순위
- **Indirect Prompt Injection** — 외부 데이터(웹페이지·PDF·이메일) 숨긴 명령
  - Perplexity Comet (2024) — Reddit 비가시 텍스트로 OTP 유출
  - ChatGPT Memory "spAIware" (2024-09) — 장기 메모리 영구 주입
- **Jailbreak**:
  - **Skeleton Key** (Microsoft, 2024-06-26 공개) — 가드레일에 자기 자신을 무시하라고 설득
  - **Many-shot Jailbreaking** (Anthropic, 2024-04) — 긴 컨텍스트 가짜 우회 예시
  - **DAN** (Do Anything Now) — 페르소나 부여
- **Model Extraction** — 추론 API로 모델 가중치 복제
- **Membership Inference** (MIA) — 학습셋 포함 여부 추론
- **Data Poisoning** — 학습/RAG 데이터 악성 샘플. 소수 문서로 LLM 응답 90%+ 조작
- **Backdoor (training-time)** — PoisonGPT (Mithril Security, 2023) HuggingFace 공급망

### 2025-2026 자동화 도구

| 도구 | 만든 곳 | 라이선스 | 핵심 |
|---|---|---|---|
| **PyRIT** | Microsoft AI Red Team | MIT | 2024-02 공개, 2025-04 Azure AI Foundry "AI Red Teaming Agent" 통합 |
| **Garak** | Leon Derczynski → NVIDIA | Apache 2.0 | ~100 공격 벡터, 37+ probe |
| **NeMo Guardrails** | NVIDIA | Apache 2.0 | 입출력 가드레일 (방어측) |
| **Lakera Red / Guard** | Lakera (스위스) | 상용 | Gandalf 게임으로 유명 |
| **Robust Intelligence** | 2024-10 **Cisco가 ~$400M 인수** | 상용 | 업계 최초 AI Firewall |
| **Mindgard** | 영국 ($11.6M) | 상용 | DAST-AI, ATLAS 매핑 |
| **HiddenLayer** | 미국 ($56M) | 상용 | ML 모델 보호 |

### 실전 사례

- **Anthropic Constitutional Classifiers** (2025-02) — HackerOne 339명·30만 시도·**누적 3,700시간** 검증
- **Anthropic Frontier Red Team** (2025) — Claude의 Cybench CTF 1년 만에 5%→33%, ASL-3 임계 근접
- **OpenAI Preparedness Framework v2** (2025-04-15) — High/Critical capability 두 임계
- **Microsoft AI Red Team** — 2018~2024-09 73개 작전·**108개 제품**
- **DEF CON GRT Challenge** (2023-08, 백악관 OSTP 후원) — 2,200명·17,469 대화·164,208 메시지. 8개사 모델, 21개 챌린지
- **한국**: KISA 「AI 보안 안내서」(2025-12-10), 「생성형 AI 개인정보 처리 안내서」(2025-08)

## Reference

- [Part 12 Ch.07 운영 사이클](https://ai-contents-wine.vercel.app/12-ai-governance/#gov-ch7) ⭐ 핵심 챕터 (ACT 6 운영 사이클로 통합 흡수)
- [Part 4 — Ch.11 보안과 비용](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch11) — 런타임 공격 (prompt injection·jailbreak)
- [Part 9 — Ch.13 Synthetic + Security](https://ai-contents-wine.vercel.app/09-data-enterprise/#p9-ch13) — 학습 시점 데이터 공격

## 연관 entity

- [MITRE ATLAS](./mitre-atlas.md) — 위협 분류 표준 (공격 후 분류·기록)
- [XAI](./xai.md) — 설명 기법 (공격 원인 분석)
- [Prompt Injection](./prompt-injection.md) — 핵심 공격
- [Evaluation](./evaluation.md) — Red Team과 다른 평가 — Microsoft 8교훈 #3

## 출처

- Microsoft AI Red Team, "3 takeaways from red teaming 100 generative AI products", 2025-01-13
- Bullwinkel et al., "Lessons From Red Teaming 100 Generative AI Products", arXiv:2501.07238, 2025-01
- Microsoft, "Mitigating Skeleton Key", 2024-06-26 (Mark Russinovich 명명)
- Anthropic, "Constitutional Classifiers", 2025-02
- OpenAI, "Updated Preparedness Framework v2", 2025-04-15
- KISA 「인공지능(AI) 보안 안내서」, 2025-12-10

본 엔티티의 전체 자료는 `wiki/sources/web/2026-04-30_ai-redteam-atlas-xai-research.md`에 보존.

## 업데이트 이력

- 2026-04-30 — 신규 생성. Part 7 Ch.13 AI 신뢰성 통합 챕터 작성과 함께 ingest.
