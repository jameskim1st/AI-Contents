---
title: "Data Pipeline Research Bundle — Part 3/5 Data 사이클 리서치 모음"
author: (multiple)
date_original: 2026-early
date_ingested: 2026-04-12
source_type: web (bundle)
url_or_path: (여러 URL, 아래 참조)
used_for: Part 3 Data 기초 · Part 7 Data 실전
---

# Data Pipeline Research Bundle

## Context

Part 3 (Data 기초) + Part 7 (Data 실전) 동시 합성 사이클(LLM Wiki 사이클 #2)에서 사용된 WebSearch 결과들. 개별 파일로 쪼개면 관리 부담이 커져 bundle 형태로 통합 기록.

## Sources Used

### 1. Enterprise AI Data Strategy 2026
- **URL**: https://blog.bismart.com/en/data-trends-2026-business-advantage
- **URL**: https://www.alation.com/blog/modern-data-stack-explained/
- **URL**: https://www.tismo.ai/blog/the-enterprise-ai-stack-in-2026-models-agents-and-infrastructure
- **핵심**: "더 많은 데이터"가 아니라 "**decision-ready**, governable, auditable" 데이터가 2026 우선순위. Lakehouse가 사실상 표준. Data-as-a-Product 모델.

### 2. Production RAG 2026
- **URL**: https://blog.premai.io/building-production-rag-architecture-chunking-evaluation-monitoring-2026-guide/
- **URL**: https://blog.premai.io/rag-chunking-strategies-the-2026-benchmark-guide/
- **URL**: https://www.roborhythms.com/how-to-build-production-rag-pipeline-2026/
- **URL**: https://use-apify.com/blog/rag-production-architecture-2026
- **핵심 통계 ⭐**: **"RAG 실패의 80%가 LLM이 아니라 ingestion/chunking 레이어에서"** (Prem AI 2026)
- **2026 chunking 기본값**: Recursive 256-512 토큰, 10-25% overlap
- **2026 임베딩 리더**: Voyage AI `voyage-3-large` — OpenAI text-embedding-3-large 대비 **+9.74%**, Cohere embed-v3 대비 **+20.71%**
- **RAGAS** 4대 메트릭: Faithfulness · Answer Relevance · Context Precision · Context Recall

### 3. GraphRAG 2026
- **URL**: https://medium.com/@tongbing00/graphrag-in-2026-a-practical-buyers-guide-to-knowledge-graph-augmented-rag-43e5e72d522d
- **URL**: https://neo4j.com/blog/genai/advanced-rag-techniques/
- **핵심 사례 ⭐**: **LinkedIn의 GraphRAG 배포 — 고객 지원 해결 시간 28.6% 감소** (표준 RAG 대비, 여러 연결된 엔티티 추론 질의에서)
- Microsoft GraphRAG 3 모드: Global / Local / Drift search

### 4. Data-Centric AI (Andrew Ng)
- **URL**: https://spectrum.ieee.org/andrew-ng-data-centric-ai
- **URL**: https://landing.ai/data-centric-ai
- **핵심**: "ML 업무의 80%는 데이터 작업". **Small clean > Big noisy**. Error analysis 루프. Landing AI 사례.

### 5. EU AI Act & Governance 2026 ⭐
- **URL**: https://artificialintelligenceact.eu/article/10/
- **URL**: https://secureprivacy.ai/blog/eu-ai-act-2026-compliance
- **URL**: https://www.pearlcohen.com/new-privacy-data-protection-and-ai-laws-in-2026/
- **핵심 ⚠️**: **2026년 8월 2일, EU AI Act Article 10 (Data Governance) 정식 발효**
- **과태료**: 고위험 시스템 위반 **EUR 15M 또는 매출 3%**, 범용 모델 위반 **EUR 35M 또는 매출 7%**
- 고위험 카테고리 (Annex III): 채용, 신용평가, 바이오인식, 교육평가, 법집행 등

### 6. Document AI 2026
- **URL**: https://unstract.com/blog/ai-document-processing-with-unstract/
- **URL**: https://www.databricks.com/blog/pdfs-production-announcing-state-art-document-intelligence-databricks
- **URL**: https://www.llamaindex.ai/insights/top-document-extractaction-software
- **핵심 ⭐**: **"엔터프라이즈 지식의 80%가 PDF·레포트·다이어그램에 갇혀 있다"**
- OCR → VLM (Vision Language Model) 전환 패러다임
- 2026 주요 도구: Unstructured.io, Reducto, Databricks `ai_parse_document`, LlamaParse, Informatica Doc AI

## Entities created/updated

Part 3/5 사이클에서 활용된 41개 신규 entity 중 주요:
- [rag](../../entities/rag.md) — "80% 실패" 통계
- [chunking](../../entities/chunking.md) — 256-512 tok, 10-25% overlap
- [embedding-model](../../entities/embedding-model.md) — voyage-3-large 1위
- [graphrag](../../entities/graphrag.md) — LinkedIn 28.6% 감소
- [eu-ai-act](../../entities/eu-ai-act.md) — 2026-08-02 Article 10
- [document-ai](../../entities/document-ai.md) — 80% PDF 통계
- [ragas](../../entities/ragas.md), [hybrid-search](../../entities/hybrid-search.md), [reranking](../../entities/reranking.md)
- [data-lakehouse](../../entities/data-lakehouse.md), [modern-data-stack](../../entities/modern-data-stack.md)

## Chapters created/updated

**Part 3 (Data 기초):**
- Ch.01-12 전반에 걸친 foundational 자료

**Part 7 (Data 실전):**
- Ch.03 Production RAG
- Ch.04 Chunking 전략
- Ch.05 임베딩 모델 선택 2026
- Ch.08 Document AI
- Ch.09 GraphRAG
- Ch.10 EU AI Act
