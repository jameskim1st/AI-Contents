# API Integration Taxonomy (엔터프라이즈 AI)

**Category:** 통합 / 시스템 아키텍처
**Status:** stable
**Last updated:** 2026-05-09

## TL;DR

엔터프라이즈 AI 시스템을 만들 때 마주하는 **API 통합 작업의 10가지 분류**. 각 종류마다 인증·지연·실패·비용 패턴이 달라, "한 종류만 잘 다뤄도 시스템이 죽을 수 있음". 평균 엔터프라이즈 AI 프로젝트는 5~15개의 다른 종류 API를 동시에 다룸. 본 사이트의 [Part 9 Ch.13](https://ai-contents-wine.vercel.app/09-ai-dev/#ad-ch13)이 이 entity의 본격적 풀어쓰기.

## 10가지 분류

| # | 카테고리 | 예시 도구 | 핵심 작업 |
|---|---|---|---|
| 1 | **LLM Provider APIs** | OpenAI, Anthropic, Gemini, Bedrock, Azure OpenAI, NCP HyperCLOVA X | 모델 호출, 스트리밍, function calling, 비용·토큰 모니터링 |
| 2 | **Tool/Action APIs** | Tavily/Brave Search, E2B/Modal Sandbox, Browserbase | 에이전트 도구로 노출, 인증, 결과 normalize |
| 3 | **Data Source APIs** | Pinecone/Weaviate/Qdrant, Notion/Confluence/SharePoint | 임베딩 저장·검색, 권한 매핑, 동기화 |
| 4 | **Internal Service APIs** | SAP, Salesforce, Workday, 카카오워크 | 사내 ERP/CRM/HR 연동, 스키마 변환, 권한 위임 |
| 5 | **Agent Protocol APIs** | MCP, A2A | 에이전트↔도구·에이전트↔에이전트 표준 통신 |
| 6 | **External SaaS APIs** | Slack/Teams/카카오워크, Stripe/PG, Google Calendar | 알림·결제·일정, OAuth 사용자별 토큰 |
| 7 | **Streaming/Real-time APIs** | SSE, WebSocket, Webhook | 실시간 토큰 스트리밍, 이벤트 push, 양방향 통신 |
| 8 | **Observability APIs** | LangSmith, Datadog, OpenTelemetry, AWS X-Ray | trace/metric/log 수집, 비용 attribution, 경보 |
| 9 | **Auth/Security APIs** | OAuth 2.0, JWT, mTLS, API Gateway, HashiCorp Vault | 인증·인가, 토큰 갱신, secrets 관리 |
| 10 | **Compliance/Governance APIs** | PII 마스킹, 콘텐츠 모더레이션, 감사 로그 | 민감정보 검출·제거, 콘텐츠 검증, 규제 대응 |

## 시나리오별 통합 매트릭스

| 시나리오 | LLM | Tool | Data | Internal | Agent Proto | SaaS | Stream | Obs | Auth | Compliance |
|---|---|---|---|---|---|---|---|---|---|---|
| 고객 지원 AI | ✓ | ✓ | ✓ | ✓ (CRM) | ◐ | ✓ (Slack) | ✓ | ✓ | ✓ | ✓ |
| 사내 분석 봇 | ✓ | ◐ | ✓ (Snowflake) | ✓ (DW) | — | ✓ | ◐ | ✓ | ✓ | ✓ |
| 코딩 에이전트 | ✓ | ✓ (Sandbox) | ✓ (코드) | ✓ (GitHub) | ✓ (MCP) | — | ✓ (스트리밍) | ✓ | ✓ | — |
| 사내 RAG 챗봇 | ✓ | ◐ | ✓ (Vector) | ✓ (문서) | — | ✓ | ✓ | ✓ | ✓ | ✓ |

## Cross-cutting Concerns (모든 통합에 공통)

1. **Auth** — OAuth(사용자), JWT(서버 간), API Key(간단), mTLS(엔터프라이즈)
2. **Rate Limiting / Quota** — 429 처리, 토큰 버킷, 우회 큐
3. **Observability** — OpenTelemetry trace + LLM 특화 (LangSmith)
4. **Cost Control** — 토큰 attribution, 캐싱, 모델 fallback
5. **Error Handling** — Retry (exponential backoff + jitter) + [Circuit Breaker](./circuit-breaker.md) + Bulkhead
6. **Versioning** — backward compat, deprecation policy
7. **[Idempotency](./idempotency.md)** — 재시도 안전성, 특히 결제·환불·이메일 발송

## 한국 엔터프라이즈 특수 사례

- **망분리 환경:** 금융·공공은 인터넷-내부망 분리. 외부 LLM API 직접 호출 불가 → 온프레미스 LLM(Brity, MI:DM) 또는 NeuroCloud(고객 IDC 내 hybrid)
- **사내 SSO:** 삼성 모바일ID, 카카오워크 SSO, PASS, 공동인증서 — 글로벌 OAuth와 매핑 필수
- **국산 LLM API:** HyperCLOVA X, KT MI:DM, Brity Copilot, Solar, Exaone
- **한국 클라우드 인증:** CSAP (공공), G-Cloud (정부)
- **규제:** 개인정보보호법 (PIPA), 전자금융감독규정, AI 기본법(2026-01-22 시행)

자세한 내용은 [Part 9 Ch.13 한국 엔터프라이즈 섹션](https://ai-contents-wine.vercel.app/09-ai-dev/#ad-ch13) 또는 [source meta](../sources/web/2026-05-09_korea-enterprise-ai.md) 참고.

## 통합 우선순위 (성장 단계별)

| 시점 | 추가할 통합 종류 |
|---|---|
| Day 1 | LLM Provider + 기본 인증 (API Key) |
| Week 1 | 1-2개 Internal/SaaS API |
| Month 1 | Observability + Rate Limiting + Auth Gateway |
| Quarter 1 | Multi-system orchestration + Compliance + 보안 강화 |
| Year 1 | A2A + Multi-region + 감사 audit |

## 안티패턴 (실패 케이스)

| 안티패턴 | 권장 대안 |
|---|---|
| API 키 하드코딩 | Vault / Secrets Manager (AWS Secrets, GCP Secret Manager) |
| 동기 호출만 사용 | 비동기 + Job Queue (Celery, BullMQ, SQS) |
| 무한 재시도 | Exponential backoff + jitter + [Circuit breaker](./circuit-breaker.md) |
| Per-call 인증 | 토큰 캐싱 + 만료 갱신 |
| 의존성 폭발 | [API Gateway](./api-gateway.md) / BFF (Backend for Frontend) |
| 모니터링 없음 | OpenTelemetry 표준 + LangSmith |
| Idempotency key 없음 | 모든 mutating 호출에 [Idempotency key](./idempotency.md) |

## Reference

- [Part 9 Ch.11 — LLM API 마스터](https://ai-contents-wine.vercel.app/09-ai-dev/#ad-ch11)
- [Part 9 Ch.12 — 시스템 통합 API](https://ai-contents-wine.vercel.app/09-ai-dev/#ad-ch12)
- [Part 9 Ch.13 — 엔터프라이즈 API 통합 분류](https://ai-contents-wine.vercel.app/09-ai-dev/#ad-ch13) ⭐
- [Part 4 Ch.07 — MCP](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#p4-ch7)
- [Part 11 — Feature Store](https://ai-contents-wine.vercel.app/11-data-enterprise/)

## 연관 entity

- [mcp.md](./mcp.md) — Model Context Protocol
- [a2a.md](./a2a.md) — Agent-to-Agent
- [idempotency.md](./idempotency.md) — Idempotent 설계
- [circuit-breaker.md](./circuit-breaker.md) — 장애 격리
- [api-gateway.md](./api-gateway.md) — API gateway / BFF
- [webhook-patterns.md](./webhook-patterns.md) — Webhook 설계
- [feature-store.md](./feature-store.md) — Feature serving API
- [observability.md](./observability.md) — LLM observability
- [evaluation.md](./evaluation.md) — eval harness

## 출처

- Anthropic, "Building Effective Agents" (2024-12). [source meta](../sources/web/2026-05-09_anthropic-building-effective-agents.md)
- Composio, "APIs for AI Agents: 5 Integration Patterns" (2026-01-23). [source meta](../sources/web/2026-05-09_composio-ai-agent-api-patterns.md)
- Stripe, "Idempotent Requests" docs. [source meta](../sources/web/2026-05-09_stripe-idempotency.md)
- Model Context Protocol introduction. [source meta](../sources/web/2026-05-09_mcp-introduction.md)
- 한국 엔터프라이즈 AI 종합 자료. [source meta](../sources/web/2026-05-09_korea-enterprise-ai.md)
- LangChain "State of Agent Engineering 2026"
- AWS Well-Architected Framework — Generative AI Lens
- Microsoft, "API resilience and reliability patterns for AI apps and agents" (2026)

## 업데이트 이력

- 2026-05-09: 신규 작성. Part 9 Ch.13의 핵심 entity로 자리잡음.
