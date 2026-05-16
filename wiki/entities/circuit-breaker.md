# Circuit Breaker (서킷 브레이커)

**Category:** 통합 / 패턴 / Resilience
**Status:** stable
**Last updated:** 2026-05-09

## TL;DR

**전기 차단기 비유.** 외부 서비스가 연속 실패하면 일정 시간 호출 자체를 차단해 cascading failure를 막는 패턴. **Netflix Hystrix(2012)가 대중화**, 2026년 모든 마이크로서비스/AI 에이전트의 표준. AI 에이전트 시대에는 **LLM API + Tool API + Vector DB API** 모두에 적용 — 한 외부 서비스 장애가 전체 에이전트 워크플로를 멈추는 것 방지.

## 왜 필요한가

장애 시나리오:
- 외부 LLM API가 느려짐 (5초 → 30초)
- 에이전트가 계속 호출 시도 → 모든 워커 thread가 대기 → 자체 시스템 마비
- 결국 사용자 요청 모두 timeout

서킷 브레이커가 있으면:
- 5번 연속 실패 감지 → 회로 OPEN
- 다음 30초간 호출 자체를 즉시 실패 (외부 서비스 안 두드림)
- 30초 후 1번만 시도 (HALF-OPEN) → 성공하면 CLOSED, 실패하면 다시 OPEN

## 3가지 상태

| 상태 | 동작 | 전이 조건 |
|---|---|---|
| **CLOSED** | 정상 호출 | N번 연속 실패 → OPEN |
| **OPEN** | 즉시 fail (외부 서비스 안 호출) | 일정 시간(예: 30초) 경과 → HALF-OPEN |
| **HALF-OPEN** | 1번만 시도 | 성공 → CLOSED, 실패 → OPEN |

## 파라미터

- **Failure threshold** — 연속 실패 N회 (예: 5)
- **Reset timeout** — OPEN 유지 시간 (예: 30초)
- **Success threshold** — HALF-OPEN에서 성공 확인 횟수 (보통 1)

## AI 에이전트에서의 적용

| 외부 서비스 | 서킷 브레이커 적용 시 |
|---|---|
| LLM Provider (OpenAI/Anthropic) | API 장애 시 즉시 fallback 모델 사용 |
| Vector DB | 검색 실패 시 캐시된 결과 또는 기본 응답 |
| Tool API (Search, Browser) | 도구 일시 비활성화 + 사용자에게 안내 |
| Internal API (CRM/ERP) | 데이터 없이 진행 또는 사람 검토로 라우팅 |

## 구현 라이브러리

- **Python:** `pybreaker`, `tenacity` (retry + circuit breaker)
- **JavaScript:** `opossum`, `cockatiel`
- **Java:** Netflix Hystrix(레거시), Resilience4j(현 표준)
- **Go:** `sony/gobreaker`, `afex/hystrix-go`
- **Service Mesh:** Istio·Linkerd가 자동 제공

## 관련 패턴

- **Bulkhead** — 같은 자원 풀을 격리해 한 영역 장애가 다른 영역 마비 안 시킴
- **Timeout** — 항상 함께 (서킷 브레이커는 timeout 후 발동)
- **Retry** — 서킷 브레이커 OPEN 상태에서는 재시도 의미 없음
- **Fallback** — 서킷 OPEN 시 대체 동작 (캐시·기본값·사람)

## 안티패턴

- 서킷 브레이커 없이 단순 retry 무한 루프 → "Retry Storm" 발생, 외부 서비스 더 망함
- 모든 호출에 동일 파라미터 → 서비스마다 특성 다름 (LLM은 1초도 정상, DB는 1초면 비정상)
- HALF-OPEN 무시 → 회복 감지 안 됨 → 영원히 차단

## Reference

- Netflix Tech Blog: "Fault Tolerance in a High Volume, Distributed System" (Hystrix 원조)
- Microsoft Azure Architecture: Circuit Breaker pattern
- [Part 9 Ch.13 — Cross-cutting concerns](https://ai-contents-wine.vercel.app/09-ai-dev/#ad-ch13)
- "AI Agent Circuit Breaker Pattern" (Cordum 2026)

## 연관 entity

- [api-integration-taxonomy.md](./api-integration-taxonomy.md)
- [idempotency.md](./idempotency.md)
- [observability.md](./observability.md) — 서킷 상태도 metric으로 expose

## 출처

- Michael Nygard, "Release It!" (2007) — 패턴의 원조 책
- Netflix Hystrix (2012)
- Resilience4j docs
- Microsoft "API resilience and reliability patterns for AI apps" (2026)

## 업데이트 이력

- 2026-05-09: 신규 작성. AI 에이전트 시대의 필수 패턴.
