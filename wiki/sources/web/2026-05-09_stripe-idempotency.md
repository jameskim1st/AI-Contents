---
title: "Idempotent Requests"
authors: ["Stripe Engineering"]
publication: "Stripe API Documentation"
date: "2024 (continuously updated)"
url: "https://docs.stripe.com/api/idempotent_requests"
fetched_at: "2026-05-09"
type: web
license: "Public docs (cite as source)"
used_for:
  - "Part 7 Ch.13 — Cross-cutting concerns 섹션 (Idempotency 카드)"
  - "wiki/entities/idempotency.md — 핵심 근거"
related_entities:
  - idempotency
  - api-integration-taxonomy
  - circuit-breaker
---

## 핵심 요약

Stripe의 idempotency 표준이 업계 사실상의 모범 사례. **금융·결제 시스템에서 검증된 패턴**으로 AI 에이전트 시대에도 그대로 적용됨.

### 핵심 사항

1. **헤더:** `Idempotency-Key: <key>` (POST 요청에만)
2. **키 생성:** V4 UUID 또는 충분한 엔트로피의 random string. 최대 255자
3. **금지:** 민감 정보(이메일·식별자) 사용 금지
4. **저장 기간:** 24시간 자동 보존
5. **검증 로직:** 같은 키로 들어온 요청의 파라미터를 비교 → 다르면 에러
6. **GET·DELETE에는 불필요** (정의상 idempotent)
7. **에지 케이스:** validation 실패·동시성 충돌은 idempotent 결과로 저장 안 됨 → 안전한 재시도 가능

### AI 에이전트 시대의 의미

LLM이 도구를 호출할 때 네트워크 실패·타임아웃이 빈번. **재시도 시 중복 결제·중복 환불·중복 이메일 발송을 막는 유일한 안전장치.** 모든 webhook handler·tool call에 idempotency key 권장.

## 본 사이트에서의 사용

- Part 7 Ch.13 — Cross-cutting concerns 섹션의 핵심 인용
- wiki/entities/idempotency.md — TL;DR 본문

## 관련 wiki entity

- [idempotency.md](../../entities/idempotency.md)
- [circuit-breaker.md](../../entities/circuit-breaker.md)
- [webhook-patterns.md](../../entities/webhook-patterns.md)
