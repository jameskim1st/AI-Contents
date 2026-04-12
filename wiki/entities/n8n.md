# n8n

**Category:** 도구 / 플랫폼
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

n8n은 오픈소스 비주얼 워크플로 자동화 플랫폼으로, 셀프호스팅이 가능하고 500개 이상의 통합 노드를 제공한다. 2024년부터 AI Agent Node(LangChain JS 기반)를 도입하여, 코드를 작성하지 않고도 reasoning/branching/acting이 가능한 AI 에이전트 워크플로를 비주얼로 구성할 수 있다. Zapier/Make 대비 코드 자유도와 가격 경쟁력이 강점.

## 설명

### 핵심 개념

n8n(발음: "nodemation")은 노드 기반 비주얼 에디터로 워크플로를 구성하는 자동화 플랫폼이다. 각 노드는 하나의 작업(API 호출, 데이터 변환, 조건 분기 등)을 담당하며, 노드를 연결해 복잡한 자동화 파이프라인을 만든다.

- **오픈소스** — fair-code 라이선스, GitHub에서 소스 공개
- **셀프호스팅** — Docker/Kubernetes로 자체 인프라에 배포 가능 (데이터 주권 확보)
- **500+ 통합 노드** — Slack, PostgreSQL, OpenAI, S3, Google Sheets, Airtable, Notion 등
- **클라우드 옵션** — n8n Cloud로 관리형 서비스도 제공

### AI Agent Node

2024년 도입된 AI Agent Node는 LangChain JS를 기반으로 하며, n8n을 단순 자동화 도구에서 AI 에이전트 빌더로 전환시킨 핵심 기능이다.

**4대 구성요소:**

| 구성요소 | 역할 | 예시 |
|---|---|---|
| **Trigger** | 워크플로 시작 이벤트 | Webhook, Schedule, Chat 메시지 |
| **AI Agent Node** | 추론·판단·행동의 중심 | ReAct 패턴으로 도구 호출 결정 |
| **Sub-nodes** | Agent가 사용하는 리소스 | LLM (OpenAI/Claude), Memory (Redis/Postgres), Tools (HTTP/Code/DB) |
| **Output** | 결과 전달 | Slack 메시지, DB 저장, 이메일 발송 |

**지원 LLM:** OpenAI GPT-4o/o3, Anthropic Claude 4/4.6, Google Gemini 2.5, HuggingFace 모델, Ollama (로컬 LLM)

### Sub-agent 패턴 (멀티 에이전트)

n8n에서 복잡한 작업을 분할하는 패턴:

```
Manager Agent (오케스트레이터)
  ├── Email Agent — 이메일 분류·답변 초안
  ├── Data Agent — DB 조회·분석·리포트
  └── Customer Agent — 고객 지원 티켓 처리
```

각 Sub-agent는 독립 워크플로로 구현되어 Manager가 "Execute Workflow" 노드로 위임한다. 이는 [Orchestrator-Worker](./orchestrator-worker.md) 패턴의 비주얼 구현이다.

### 커뮤니티와 템플릿

- **6,274+ AI 자동화 템플릿** (2026년 기준, 커뮤니티 기여)
- 대표 템플릿: AI 챗봇, 문서 요약 파이프라인, 이메일 자동 분류, RAG 챗봇, 다국어 번역
- 템플릿을 복제 → 커스터마이즈하는 방식으로 빠른 프로토타이핑 가능

### n8n vs Zapier / Make

| | n8n | Zapier | Make |
|---|---|---|---|
| **셀프호스팅** | O (Docker/K8s) | X | X |
| **코드 자유도** | JavaScript/Python 노드 자유 삽입 | 제한적 | 제한적 |
| **AI Agent** | LangChain JS 네이티브 | AI Actions (제한적) | AI 모듈 (제한적) |
| **가격 (2025.08~)** | 실행 기반 과금, 셀프호스트 무료 | 태스크 기반 (고가) | 오퍼레이션 기반 |
| **오픈소스** | O (fair-code) | X | X |
| **적합** | 개발자/기술팀, AI 에이전트 | 비개발자, 간단 자동화 | 중간 복잡도 |

### n8n vs LangGraph

n8n과 [LangGraph](./langgraph.md)는 경쟁이 아니라 **상호보완적**이다:

- **n8n** — 비주얼 빌더, 빠른 프로토타이핑, 500+ 외부 통합, 비개발자 접근 가능
- **LangGraph** — 코드 기반, 세밀한 상태 관리, 체크포인팅, 복잡한 분기 로직
- 실무에서는 LangGraph로 핵심 에이전트 로직을 구현하고, n8n으로 트리거·통합·오케스트레이션을 처리하는 조합이 많다

### 활용 사례

1. **고객 지원 자동화** — 티켓 분류 → AI 답변 초안 → 사람 승인 → 발송
2. **데이터 파이프라인** — API 수집 → AI 정제 → DB 적재 → 대시보드 갱신
3. **멀티 에이전트 오케스트레이션** — Manager Agent가 전문 Sub-agent에 위임
4. **RAG 챗봇** — 문서 임베딩 → 벡터 DB 저장 → 질문 응답
5. **콘텐츠 생성** — RSS 수집 → AI 요약 → SNS 자동 포스팅

## Reference

- [Part 4 — Ch.12 n8n: 비주얼 AI 에이전트 빌더](https://ai-contents-wine.vercel.app/04-ai-agents-advanced/#aa-ch12)

## 연관 entity

- [LangGraph](./langgraph.md) — 코드 기반 에이전트 프레임워크 (상호보완)
- [Agent Frameworks](./agent-frameworks.md) — 2026 프레임워크 카탈로그
- [MCP](./mcp.md) — 모델-도구 연결 프로토콜
- [Observability](./observability.md) — 워크플로 모니터링
- [Orchestrator-Worker](./orchestrator-worker.md) — Sub-agent 패턴의 이론적 기반
- [Multi-Agent](./multi-agent.md) — 멀티 에이전트 패턴

## 출처

- n8n 공식 문서 (docs.n8n.io)
- n8n AI Agent Node 릴리즈 블로그
- n8n 커뮤니티 템플릿 라이브러리

## 업데이트 이력

- 2026-04-12 — 신규 생성. Part 4 AI Agents 실전 확장에서.
