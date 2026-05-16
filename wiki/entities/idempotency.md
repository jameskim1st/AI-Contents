# Idempotency (멱등성)

**Category:** 통합 / 패턴
**Status:** stable
**Last updated:** 2026-05-09

## TL;DR

**같은 요청을 N번 보내도 결과가 1번 보낸 것과 같음을 보장하는 설계.** 네트워크 실패·타임아웃에서 안전한 재시도를 가능하게 함. **Stripe가 도입한 `Idempotency-Key` 헤더가 업계 표준**. AI 에이전트 시대에는 더 중요해짐 — LLM이 도구를 호출할 때 네트워크 오류가 빈번해, 중복 결제·중복 환불·중복 이메일 발송을 막는 유일한 안전장치.

## 왜 필요한가

- LLM/에이전트가 외부 API 호출 → 네트워크 오류 → 응답 못 받음 → 재시도
- **재시도 시 작업이 진짜 새로 시작되면 중복 발생** (이중 결제 등)
- 멱등성 키가 있으면 서버가 "이 요청 이미 처리했음"을 인지 → 캐시된 결과 반환

## 패턴

### Stripe 표준

```http
POST /v1/charges
Idempotency-Key: 6f6e3f4a-7c2e-4b9b-a3e9-1f0d8c5b8e7f
Content-Type: application/json

{ "amount": 5000, "currency": "krw", ... }
```

규칙:
- **POST 요청에만** (GET·DELETE는 원래 idempotent)
- 키는 **V4 UUID** 또는 충분한 엔트로피의 random string. 최대 255자
- **민감정보 사용 금지** (이메일·식별자 X)
- 24시간 자동 보존
- 동일 키 + 다른 파라미터 → 에러

### 분산 시스템 적용

- **클라이언트:** 요청 전 UUID 생성, 재시도 시 같은 UUID 재사용
- **서버:** 키-결과 저장 (Redis 권장, TTL 24시간)
- **에지 케이스:** validation 실패·동시성 충돌은 idempotent 결과로 저장 안 됨 → 안전한 재시도

### 자연스럽게 idempotent한 연산

- 사용자 ID로 upsert (이미 있으면 update, 없으면 insert)
- "주문 #42 환불" (특정 주문에 대한 액션 → 이미 환불됐으면 noop)
- 전체 상태 교체 (PUT 시멘틱)

### Idempotent하지 않은 연산 (특히 주의)

- "고객에게 환불 진행" (고객 ID만 알고 주문 ID 없음)
- "이메일 발송" (메시지 ID 없으면 매번 새 메시지)
- "추가 주문" (POST /orders without client-side ID)

## AI 에이전트에서 더 중요한 이유

- LLM은 비결정적 → 같은 입력에서도 약간 다른 결과 → 재시도 시 다른 파라미터로 호출 위험
- 에이전트 도구 호출은 네트워크 오류가 빈번 (외부 서비스 의존)
- 멀티-step workflow에서 한 step 실패 후 전체 재실행 시 중복 가능
- → **모든 mutating 도구 호출에 idempotency key 필수**

## 안티패턴

- 매번 새 UUID 생성 (재시도 시 다른 키 → 멱등 무력)
- 키에 timestamp 포함 (재시도 시 다른 키)
- 사용자 입력을 키로 (충돌·보안 위험)
- 키 없이 "atomic" 가정 (네트워크 분할 시 깨짐)

## Reference

- Stripe 공식 docs: https://docs.stripe.com/api/idempotent_requests
- [Part 9 Ch.13 — Cross-cutting concerns](https://ai-contents-wine.vercel.app/09-ai-dev/#ad-ch13)
- source meta: [2026-05-09_stripe-idempotency.md](../sources/web/2026-05-09_stripe-idempotency.md)

## 연관 entity

- [api-integration-taxonomy.md](./api-integration-taxonomy.md)
- [circuit-breaker.md](./circuit-breaker.md)
- [webhook-patterns.md](./webhook-patterns.md)

## 출처

- Stripe API documentation
- IETF RFC 7231 (HTTP idempotent methods)
- Composio "5 Integration Patterns" (2026-01)

## 업데이트 이력

- 2026-05-09: 신규 작성. Part 9 Ch.13의 핵심 개념.
