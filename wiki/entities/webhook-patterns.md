# Webhook Patterns

**Category:** 통합 / 패턴
**Status:** stable
**Last updated:** 2026-05-09

## TL;DR

**서버가 클라이언트의 URL로 이벤트를 push.** Polling의 정반대. AI 시대에는 **에이전트 → Zapier/n8n webhook 호출**이 표준 액션 위임 패턴이 됨. 또한 Slack·Stripe·GitHub 등 주요 SaaS의 이벤트 수신 표준. 잘못 설계하면 **중복 전달·재시도 폭주·secret 유출** 사고 발생 → idempotency·서명 검증·재시도 정책이 필수.

## Webhook vs Polling

| 패턴 | 설명 | 비용 | 지연 |
|---|---|---|---|
| **Polling** | 클라이언트가 주기적으로 GET | 높음 (대부분 빈 응답) | 폴링 주기만큼 |
| **Webhook** | 서버가 이벤트 시 클라이언트 URL로 POST | 낮음 (이벤트 시만) | 즉시 |

## 두 방향

### 1. Outgoing (내가 서버 — 이벤트 발생자)

내 시스템에서 이벤트 발생 → 클라이언트 등록 URL로 POST.
- 예: Stripe가 결제 성공 시 우리 endpoint로 webhook
- 예: GitHub가 push 시 CI/CD endpoint로 webhook

### 2. Incoming (내가 클라이언트 — 이벤트 수신자)

외부 서비스가 내 endpoint로 webhook 보냄. 가장 흔함.
- 예: Slack 슬래시 명령 → 우리 봇 endpoint
- 예: Zapier가 trigger 시 우리 webhook
- 예: AI 에이전트가 Zapier로 액션 위임 (역방향)

## 핵심 설계 원칙

### 1. Idempotency

같은 webhook이 여러 번 도착할 수 있음 (네트워크 재시도, 서버 retry):
- 모든 webhook payload에 **고유 event ID** 포함
- 서버 측에서 event ID 저장 (Redis, DB)
- 같은 ID 도착 시 noop
- → [Idempotency entity](./idempotency.md) 참고

### 2. 서명 검증 (HMAC)

```python
expected = hmac.new(secret, request.body, sha256).hexdigest()
if expected != request.headers['X-Signature']:
    return 401  # 위조된 webhook 차단
```

- Stripe: `Stripe-Signature` 헤더
- GitHub: `X-Hub-Signature-256`
- Slack: `X-Slack-Signature`

### 3. 빠른 응답 (200 OK 즉시)

- Webhook 수신 → **즉시 200 응답** (3초 이내 권장)
- 실제 처리는 큐에 넣고 비동기로
- 응답 늦으면 발신자가 재시도 → 폭주

```python
@app.post("/webhook")
def handler(req):
    # 1. 서명 검증
    verify_signature(req)
    # 2. 큐에 넣기 (즉시)
    queue.publish(req.body)
    # 3. 200 OK 즉시 반환
    return 200
```

### 4. 재시도 정책

발신자 측:
- Exponential backoff (1s → 2s → 4s → 8s ...)
- 최대 N회 (보통 5-10회)
- 최종 실패 시 dead letter queue

수신자 측:
- 5xx는 발신자가 재시도, 4xx는 안 함
- 의도된 무시는 200 반환 + 내부 로그

### 5. 검증 / Replay 방지

- Timestamp 헤더 + 5분 이내만 수락 (replay 공격 방지)
- Event ID 중복 차단 (위 idempotency)

## AI 에이전트에서의 활용

### 패턴 A: 에이전트 → Zapier Webhook

에이전트가 결정 → Zapier webhook URL로 POST → Zapier가 5,000+ 앱 호출.
- 에이전트는 Slack/Stripe/Gmail 코드 직접 작성 안 함
- Zapier가 인증·재시도·rate limit 처리

### 패턴 B: 외부 → 에이전트 webhook

Slack 메시지 → 우리 에이전트 webhook → LLM 처리 → 응답.
- 빠른 200 응답 후 비동기 처리 필수 (LLM 호출은 5-30초)
- 서명 검증으로 위조 차단

### 패턴 C: 에이전트 ↔ 에이전트 webhook

[A2A](./a2a.md) 표준의 일부. 한 에이전트가 다른 에이전트로 작업 위임 시 webhook 사용.

## 안티패턴

- 서명 검증 없음 → 누구나 webhook 위조 가능
- 동기 처리 (LLM 호출까지) → 발신자 timeout → 무한 재시도 폭주
- Idempotency key 무시 → 중복 처리
- 5xx 응답 + 재시도 폭주 → DDoS 자기-셀프
- secret을 GitHub에 커밋 → 즉시 rotate
- 로깅 없음 → 디버깅 불가

## 대표 도구

- **Hookdeck** — webhook proxy + retry + replay
- **Svix** — outgoing webhook 인프라 (Slack 같은 서비스 만들 때)
- **ngrok / Cloudflare Tunnel** — 로컬 개발용
- **Stripe CLI** — Stripe webhook 로컬 테스트

## Reference

- Stripe webhooks docs
- GitHub webhooks docs
- [Part 9 Ch.13 — Streaming/Real-time APIs](https://ai-contents-wine.vercel.app/09-ai-dev/#ad-ch13)
- [Part 4 Ch.09 — Zapier 위임 패턴](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch9)

## 연관 entity

- [api-integration-taxonomy.md](./api-integration-taxonomy.md)
- [idempotency.md](./idempotency.md)
- [a2a.md](./a2a.md)

## 출처

- Stripe webhook 모범 사례
- Hookdeck blog
- Composio "5 Integration Patterns" (2026-01)

## 업데이트 이력

- 2026-05-09: 신규 작성. AI 에이전트의 Zapier 위임 패턴과 결합.
