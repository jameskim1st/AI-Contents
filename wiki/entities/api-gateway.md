# API Gateway / BFF

**Category:** 통합 / 아키텍처
**Status:** stable
**Last updated:** 2026-05-09

## TL;DR

**API들 앞에 두는 단일 진입점.** 인증·rate limiting·로깅·rewriting·routing을 중앙화. AI 에이전트 시대에는 더 중요해짐 — 에이전트가 수많은 외부 API를 호출하는데, 게이트웨이가 없으면 인증 정보·rate limit·관측이 사방에 흩어짐. **BFF (Backend for Frontend)**는 게이트웨이의 변형으로, 클라이언트 종류별 (모바일·웹·에이전트)로 별도 게이트웨이를 둠.

## 핵심 책임

| 기능 | 설명 |
|---|---|
| **Auth** | OAuth/JWT/API Key 검증 한 곳에서 |
| **Rate limiting** | per-tenant, per-endpoint quota 관리 |
| **Routing** | URL → 백엔드 서비스 매핑 |
| **Rewriting** | 요청·응답 변환 (legacy adapter) |
| **Logging / Tracing** | 모든 요청 한 곳에서 trace 시작 |
| **Caching** | 응답 캐싱 (특히 정적/idempotent 응답) |
| **Compression / Encryption** | TLS 종료, gzip |
| **Validation** | 스키마 검증, 입력 sanitization |

## 패턴

### 1. Gateway 단일

모든 클라이언트(웹·모바일·에이전트)가 한 게이트웨이로. 단순하지만 client-specific 요구를 모두 한 곳에 담아 복잡도 ↑.

### 2. BFF (Backend for Frontend)

```
[모바일 앱] → [모바일 BFF] ┐
[웹 앱]    → [웹 BFF]   ├→ 백엔드 마이크로서비스들
[AI 에이전트] → [Agent BFF] ┘
```

각 클라이언트 종류별로 최적화된 게이트웨이. **AI 에이전트는 별도 BFF 추천** — 다른 클라이언트와 요구사항이 다름 (LLM 호출 비용 attribution, MCP 통합, 더 긴 timeout).

### 3. 마이크로 게이트웨이 (Service Mesh)

게이트웨이 책임을 service mesh(Istio·Linkerd)가 sidecar로 분산 처리.

## AI 에이전트에서의 활용

- **Tool API 통합 게이트웨이** — 에이전트가 100+ 외부 도구 호출 → 게이트웨이가 인증·rate limit·로깅 처리. 에이전트 코드는 단순 webhook 호출만.
- **LLM Gateway** — 여러 LLM provider를 한 endpoint로. fallback·load balancing·비용 추적
  - 예: Portkey, Helicone Gateway, LiteLLM Proxy, OpenRouter
- **MCP Gateway** — 여러 MCP 서버를 단일 endpoint로 노출 (Composio, Pica)

## 대표 도구 (2026)

| 카테고리 | 제품 |
|---|---|
| **클라우드 관리형** | AWS API Gateway, Google Cloud API Gateway, Azure API Management, Cloudflare API Gateway |
| **오픈소스** | Kong, Tyk, KrakenD, Apache APISIX |
| **개발자 친화** | Zuplo, Hookdeck, Kong Konnect |
| **LLM 특화** | Portkey, Helicone, LiteLLM Proxy, OpenRouter |
| **MCP 특화** | Composio, Pica |

## 안티패턴

- **God Gateway** — 비즈니스 로직까지 게이트웨이에 넣음 → 결합도 폭발
- **No Gateway** — 클라이언트가 백엔드 직접 호출 → 인증·rate limit이 사방에 흩어짐
- **Single point of failure** — 게이트웨이 이중화 안 함
- **Gateway 우회** — 일부 호출은 게이트웨이 거치고 일부는 안 거치고 → 일관성 ↓

## Reference

- Microsoft Azure Architecture: Gateway routing pattern
- Sam Newman, "Backends for Frontends Pattern" (2015)
- [Part 9 Ch.13 — Cross-cutting concerns](https://ai-contents-wine.vercel.app/09-ai-dev/#ad-ch13)
- Zuplo "Best API Management Platforms 2026"

## 연관 entity

- [api-integration-taxonomy.md](./api-integration-taxonomy.md)
- [mcp.md](./mcp.md) — MCP gateway 패턴
- [circuit-breaker.md](./circuit-breaker.md) — 게이트웨이가 흔히 함께 제공
- [observability.md](./observability.md) — 게이트웨이가 trace 시작점

## 출처

- Microsoft API Management docs
- Kong / KrakenD 공식 문서
- Composio / Portkey blog

## 업데이트 이력

- 2026-05-09: 신규 작성. AI 에이전트 시대 게이트웨이 책임 강조.
