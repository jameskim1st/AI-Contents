# Computer Use (Browser & Desktop Agents)

**Category:** 도구 / 패턴
**Status:** stable (2026 프로덕션 단계)
**Last updated:** 2026-04-12

## TL;DR

에이전트가 실제 컴퓨터(브라우저, 데스크톱 앱)를 **사람처럼 직접 조작** 하는 패턴. 스크린샷을 보고, 마우스를 움직이고, 키보드를 친다. Anthropic Claude Computer Use, OpenAI Operator(→ChatGPT Agent), Manus Desktop이 2026년 프로덕션 단계 진입. "데모 비디오"가 아니라 "도구"의 시대.

## 설명

### 왜 등장했나

기존 에이전트의 도구는 모두 API 기반:
- API가 없는 시스템에는 못 들어감
- 레거시 GUI 앱 자동화 불가
- 웹 스크래핑은 깨지기 쉬움

해결: **"사람처럼 화면을 보고 클릭"**

### 동작 원리

```
1. 스크린샷 캡처
2. LLM(Vision)이 화면 분석:
   "화면 중앙에 '확인' 버튼이 있다.
    좌표 (640, 400)"
3. 마우스 이동 + 클릭 명령 발행
4. 새 화면 캡처
5. 반복
```

### 주요 제품 (2026)

| 제품 | 회사 | 출시 | 특징 |
|---|---|---|---|
| **Claude Computer Use** | Anthropic | 2024.10 → 2026.03 정식 | 로컬 데스크톱 직접 조작 |
| **Operator → ChatGPT Agent** | OpenAI | 2025.01 → ChatGPT 통합 | 원격 브라우저, GPT-4o vision + RL |
| **Manus Desktop** | Manus | 2026.03.16 | 종합 에이전트 |
| **Cowork** (Claude) | Anthropic | 2026.03 | 협업 중심 |

### Claude Computer Use vs OpenAI Operator

| | Claude Computer Use | OpenAI Operator |
|---|---|---|
| 환경 | 사용자 로컬 | OpenAI 원격 |
| 제어 | 네이티브 앱 + 웹 | 웹 브라우저만 |
| 보안 | 사용자가 직접 격리 책임 | OpenAI가 sandboxing |
| 권한 | 모든 OS 권한 | 브라우저 내로 제한 |
| 위험 | 높음 (실수 = 실제 파일 손상) | 낮음 (격리됨) |

### 보안 이슈

- **Prompt injection** — 에이전트가 본 화면에 악성 명령이 들어 있으면 실행
- **권한 남용** — 사용자가 깜박하면 위험한 작업 수행
- **사기/오작동** — 잘못된 입력으로 결제·전송 실수
- **감사 추적** — 무엇을 클릭했는지 로그 필수

### 활용 사례

- ✅ 반복적 데이터 입력 (스프레드시트, 폼)
- ✅ 레거시 시스템 자동화 (API 없는 ERP 등)
- ✅ 스크래핑 대안 (로그인이 필요한 사이트)
- ⚠️ 결제·금융 — 사람 승인 필수
- ⚠️ 파일 삭제·이메일 전송 — 사람 승인 필수

### 한계

- 비용 비쌈 (vision + 다단계)
- 느림 (스크린샷 → 분석 → 행동 → 반복)
- UI 변경에 약함
- "사람이라면 하지 않을 실수" 발생

## Reference

- [Part 4 — Ch.08 (사이드 박스) Computer Use](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch8) ⭐

## 연관 entity

- [Augmented LLM](./augmented-llm.md) — 도구의 극단적 형태
- [Claude Code](./claude-code.md) — Anthropic 에이전트 family
- [Prompt Injection](./prompt-injection.md) — 주요 위협

## 출처

- Anthropic Claude Computer Use 공식 발표
- OpenAI Operator 발표 (https://openai.com/index/introducing-operator/)
- "Anthropic's Computer Use vs OpenAI's CUA" (WorkOS)
- 2025-2026 AI Computer-Use Benchmarks (o-mega)

## 업데이트 이력

- 2026-04-12 — 신규 생성. AI Agents 실전 리서치 ingest에서.
