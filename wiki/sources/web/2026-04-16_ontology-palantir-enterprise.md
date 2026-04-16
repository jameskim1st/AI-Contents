---
title: "엔터프라이즈 KG 동향 2024-2025 — Palantir Ontology, Neo4j, Stardog, Ontotext"
author: Multiple vendors · Palantir 실적 공시 · Neo4j CTO 블로그 등
date_original: 2024-07 ~ 2025-05 (복수 자료)
date_ingested: 2026-04-16
source_type: web
url_or_path: 복수 URL — 본문 References 섹션 참조
used_for: wiki/entities/ontology.md · wiki/entities/graphrag.md
---

# 엔터프라이즈 KG 2024-2025

## Context

학술 온톨로지 연구(Source A)와 별개로, **상용 온톨로지/지식그래프 벤더가 LLM과 결합하며 실제 매출·도입 사례를 만들어내는** 국면이 2024-2025에 뚜렷해짐. 특히 Palantir는 "Ontology"라는 단어를 쓰되 학술 온톨로지(OWL/Protégé)와 질적으로 다른 **운영 온톨로지** 개념으로 쓰고 있어, wiki entity에 별도 섹션으로 정리가 필요. Neo4j는 GraphRAG Manifesto로 벤더 입장을 명문화했고, Stardog는 EKG+LLM 어시스턴트를 상용화, Ontotext+TopQuadrant는 legacy 시맨틱 웹 진영 통합에 나섬.

## Key Points

### Palantir Ontology — "운영 온톨로지"라는 다른 계보

- **정체:** Palantir Foundry/AIP의 핵심 개념. 객체(Objects) + 액션(Actions) + 정책(Policies) + 운영 write-back을 하나로 묶은 "살아있는 디지털 트윈".
- **학술 온톨로지와의 질적 차이:**
  - 학술 OWL: *descriptive · inferential* (도메인을 서술하고 추론)
  - Palantir: *operational · kinetic* (운영을 집행하고 상태를 변경) — Domain-Driven Design + Data Fabric에 가까움
- **2024-2025 기능 출시:** Interfaces, derived properties, Ontology-Backed Objects (Palantir 공식 문서·블로그 기반)
- **재무 증거 (Palantir 실적 공시 기준):**
  - **Q1 2025 커머셜 매출 +71% YoY** (전년 동기 대비)
  - **Q4 2024 커머셜 매출 +64% YoY**
  - 성장 동력 대부분이 AIP(AI Platform) — "Ontology 기반 운영 AI"를 상품화한 것
- **대표 고객 사례 숫자:**
  - **Airbus Skywise** — 연간 >$850M 매출 기회 (2017년부터 운영)
  - **BP** — ~$1B 절감 (공급망 + 운영 최적화)
  - **Fortune-100 CPG** — 7개 ERP 통합 5일, year-one $100M 효과
  - **Lowe's + NVIDIA** — 지속형 공급망 그래프

### Stardog Voicebox — EKG + LLM 어시스턴트 상용화

- **포지셔닝:** "The first EKG + LLM data assistant" (Stardog 공식)
- **메시지:** *"Enterprise AI Requires the Fusion of LLM and Knowledge Graph"* (Stardog 마케팅 슬로건)
- **기술 스택:** RDF/OWL 기반 EKG + LLM 자연어 인터페이스 — 사용자가 자연어로 묻고 KG가 사실 근거를 제공

### Neo4j — GraphRAG Manifesto와 벤더 포지셔닝

- **저자:** Philip Rathle, CTO Neo4j
- **글:** "The GraphRAG Manifesto: Adding Knowledge to GenAI"
- **발행:** 2024-07-11, Neo4j 공식 블로그
- **핵심 주장(벤더 발언이므로 주의):**
  - LinkedIn 고객 지원: GraphRAG 도입 후 **평균 해결 시간 -28.6%**
  - Writer (벤더 내부 벤치): 86% vs 기존 RAG 33-76%
- **인용 가능한 문장:**
  > "You can't depend only on autoregressive LLMs to make your decisions. And the secret to making GenAI projects work is knowledge graphs."
  > — Philip Rathle, CTO Neo4j, 2024-07-11

### Neo4j + LangGraph — 에이전트 표준 스택

- **역할 분담:** Neo4j = 에이전트 메모리(knowledge graph), LangGraph = 오케스트레이션, Text2Cypher = 자연어→쿼리 도구
- **Google Gen AI Toolbox for Databases (2025):** Neo4j 포함. LangChain·LangGraph와 함께 "DB 바로 붙이는" 에이전트 툴킷으로 출시
- **현실 체크:** 튜토리얼 수준의 블로그가 대부분. 프로덕션 사례는 Palantir 밖에선 아직 많지 않음

### Ontotext + TopQuadrant 2025 파트너십

- legacy 시맨틱 웹 진영(Ontotext GraphDB + TopQuadrant TopBraid)의 **벤더 통합**
- 플래그십 제품: LLM-populated **시맨틱 데이터 카탈로그**
- 배경: 2000s 시맨틱 웹 벤더들이 개별 고사 위기에서 "LLM 파도 타기"로 재포지셔닝 중

## Quotes

> "You can't depend only on autoregressive LLMs to make your decisions. And the secret to making GenAI projects work is knowledge graphs."
> — Philip Rathle, CTO Neo4j, 2024-07-11 (GraphRAG Manifesto)

> "Enterprise AI Requires the Fusion of LLM and Knowledge Graph."
> — Stardog 공식 메시징, 2024-2025

## References (URL 일람)

- Neo4j GraphRAG Manifesto (2024-07-11): https://neo4j.com/blog/genai/graphrag-manifesto/
- Stardog Voicebox: https://www.stardog.com/
- Palantir IR (실적 자료): https://investors.palantir.com/
- Palantir Ontology 공식 소개: https://www.palantir.com/docs/foundry/ontology/overview/
- Ontotext: https://www.ontotext.com/
- TopQuadrant: https://www.topquadrant.com/
- Google Gen AI Toolbox for Databases: https://cloud.google.com/blog/products/databases/introducing-ai-toolbox-for-databases

## Entities created/updated

- [ontology](../../entities/ontology.md) — "변종 — Palantir Ontology" 섹션 + "2024-2025 핵심 발전"에 Stardog/Neo4j 스택 편입
- [graphrag](../../entities/graphrag.md) — (기존에 LinkedIn 수치는 반영됨)

## Chapters created/updated

- (이번 ingest는 사이트 HTML은 갱신하지 않음 — wiki 계층 한정)

## Meta

벤더 발표 수치는 **벤더 측 벤치**라는 한계가 있음을 명시. 재현 가능한 학술 수치는 Source A(OG-RAG)에 분리 수록. Palantir 재무 수치는 공개 실적 공시 기반이므로 신뢰도가 높음. Airbus/BP/Fortune-100 CPG 사례 숫자는 Palantir 고객 자료 기반으로, 고객 동의 범위 안에서 공개된 값.
