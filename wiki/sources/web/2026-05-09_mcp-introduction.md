---
title: "What is the Model Context Protocol (MCP)?"
authors: ["Model Context Protocol Project (Anthropic + community)"]
publication: "modelcontextprotocol.io"
date: "2024-11 (initial release), 2026 (continuously updated)"
url: "https://modelcontextprotocol.io/introduction"
fetched_at: "2026-05-09"
type: web
license: "Open standard (cite as source)"
used_for:
  - "Part 7 Ch.13 — Agent Protocol APIs 카테고리"
  - "wiki/entities/mcp.md — 핵심 근거"
  - "Part 4 Ch.07 MCP (이미 인용됨)"
related_entities:
  - mcp
  - api-integration-taxonomy
  - a2a
---

## 핵심 요약

**MCP = AI 애플리케이션의 USB-C.** 외부 시스템(데이터·도구·워크플로)을 AI 앱에 표준화된 방식으로 연결하는 오픈 프로토콜. Anthropic이 2024-11 발표, 2025년 OpenAI/Google/Microsoft 모두 채택, 2026년 사실상 표준.

### 무엇을 가능하게 하나

- 에이전트가 사용자 Google Calendar/Notion 접근 → 개인화 비서
- Claude Code가 Figma 디자인으로 전체 웹앱 생성
- 엔터프라이즈 챗봇이 여러 DB를 가로질러 데이터 분석
- AI가 Blender로 3D 디자인 → 3D 프린터 출력

### 광범위한 생태계 지원 (2026)

**클라이언트:**
- Claude (Desktop, Code)
- ChatGPT (OpenAI Agents SDK)
- Visual Studio Code (Copilot)
- Cursor
- 그 외 다수

**서버:**
- 공식 reference 서버 + 수천 개 커뮤니티 서버
- Zapier MCP (5,000+ 앱 통합)
- GitHub, Slack, Linear, Sentry 등 주요 SaaS 공식 서버 보유

### 핵심 아키텍처

- **Hosts** — 사용자가 상호작용하는 앱 (Claude Desktop)
- **Clients** — Host 안에서 MCP 서버에 연결하는 모듈
- **Servers** — 도구·리소스·프롬프트를 노출

### 3 Primitives

1. **Tools** — 모델이 호출할 수 있는 함수 (외부 액션)
2. **Resources** — 모델이 읽을 수 있는 데이터 (파일·DB row)
3. **Prompts** — 사용자가 호출할 수 있는 템플릿

### Transport

- **stdio** — 로컬 프로세스 (가장 흔함)
- **SSE / Streamable HTTP** — 원격 서버

### 왜 중요한가

- **Developer**: AI 앱 통합 시간·복잡도 ↓
- **AI 앱/에이전트**: 도구 생태계 즉시 확대
- **End-user**: 더 똑똑한 AI 비서

## 본 사이트에서의 사용

- Part 4 Ch.07 — MCP 챕터 (기존)
- Part 7 Ch.13 — Agent Protocol APIs 카테고리

## 관련 wiki entity

- [mcp.md](../../entities/mcp.md)
- [a2a.md](../../entities/a2a.md)
- [api-integration-taxonomy.md](../../entities/api-integration-taxonomy.md)
