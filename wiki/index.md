# Index

`wiki/entities/` 카탈로그 + `wiki/sources/` 링크. 카테고리별 분류.
**Last updated:** 2026-04-16

## Raw Sources (Layer 1)

Karpathy LLM Wiki 3계층 중 Layer 1. 원본 자료의 메타+요약. 자세히는 [`sources/README.md`](./sources/README.md).

- **`sources/external/`** — 사내·로컬 자료 (PwC AI 리터러시 Day1/Day2/Day3 등)
- **`sources/web/`** — WebSearch 결과·블로그·gist
  - [Karpathy LLM Wiki gist (2026-04-11)](./sources/web/2026-04-11_karpathy-llm-wiki-gist.md) — 본 repo 운영 모델의 출처
  - [LangChain State of Agent Engineering 2026](./sources/web/2026-04-12_langchain-state-of-agent-engineering.md)
  - [AI Agents 실전 Research Bundle](./sources/web/2026-04-11_ai-agents-research-bundle.md) — Part 4
  - [Data Pipeline Research Bundle](./sources/web/2026-04-12_data-pipeline-research-bundle.md) — Part 8/9
  - [Ontology × LLM 2024-2025 Research](./sources/web/2026-04-16_ontology-llm-2024-2025-research.md) — GraphRAG·OG-RAG·자동 KG 구축
  - [Ontology — Palantir & Enterprise KG](./sources/web/2026-04-16_ontology-palantir-enterprise.md) — Palantir AIP·Neo4j·Stardog·Ontotext
  - [Ontology — Critique & Revival](./sources/web/2026-04-16_ontology-critique-revival.md) — Gruber·Shirky·Singhal 계보
- **`sources/papers/`** — 학술 논문
  - [Attention Is All You Need (2017)](./sources/papers/2017_attention-is-all-you-need.md)

---

---

## 모델 (Models)

- [Transformer](./entities/transformer.md)
- [DeepSeek R1](./entities/deepseek-r1.md) — RL-only 오픈소스 추론 LLM, o3 대비 1/100 비용
- [Multimodal LLM](./entities/multimodal-llm.md) — GPT-4o, Claude 4.6, Gemini 2.5
- [SLM (Small Language Model)](./entities/slm.md) — 1B-7B, 에지 디바이스 온디바이스 추론

## 아키텍처 / 패턴

- [LLM Wiki](./entities/llm-wiki.md) — Karpathy의 지식 누적 패턴 ⭐
- [MoE (Mixture of Experts)](./entities/moe.md)
- [Harness Engineering](./entities/harness-engineering.md)
- [ReAct](./entities/react.md)
- [Reflection / Reflexion](./entities/reflection.md)
- [Plan-and-Execute](./entities/plan-and-execute.md)
- [Plan-Critic-Build](./entities/plan-critic-build.md)
- [Orchestrator-Worker](./entities/orchestrator-worker.md)
- [Multi-Agent](./entities/multi-agent.md)
- [Narrow Scope](./entities/narrow-scope.md)
- [Human-in-the-Loop](./entities/human-in-the-loop.md)
- [RAG](./entities/rag.md)
- [GraphRAG](./entities/graphrag.md)
- [Diffusion Models](./entities/diffusion-models.md) — DDPM → Stable Diffusion → Flux, DiT

## 프로토콜 / 표준

- [MCP (Model Context Protocol)](./entities/mcp.md)
- [A2A (Agent-to-Agent)](./entities/a2a.md)
- [Data Contracts](./entities/data-contracts.md) ⭐ NEW
- [Medallion Architecture](./entities/medallion-architecture.md) ⭐ NEW

## 저장 계층 (Storage Layers) ⭐ NEW 카테고리

- [RDBMS](./entities/rdbms.md) — 관계형 DB (PostgreSQL, MySQL, Oracle)
- [Data Warehouse](./entities/data-warehouse.md) — OLAP (Snowflake, BigQuery, Redshift)
- [Data Mart](./entities/data-mart.md) — 도메인 특화 DW 부분집합
- [Data Lake](./entities/data-lake.md) — 원본 데이터 (S3, ADLS)
- [Data Lakehouse](./entities/data-lakehouse.md) — Lake + DW, 2026 표준 ⭐
- [NoSQL](./entities/nosql.md) — 비관계형 DB 카테고리
- [Graph DB](./entities/graph-db.md) — Neo4j, Neptune
- [Vector DB](./entities/vector-db.md) — Pinecone, Weaviate, Qdrant, pgvector
- [Feature Store](./entities/feature-store.md) — Feast, Tecton

## Open Table Formats ⭐ NEW 서브카테고리

- [Delta Lake](./entities/delta-lake.md) — Databricks 주도
- [Apache Iceberg](./entities/apache-iceberg.md) — Netflix 주도, 멀티 엔진

## 데이터 유형 (Data Types)

- [Structured Data](./entities/structured-data.md) — 정형
- [Semi-Structured Data](./entities/semi-structured-data.md) — 반정형 (JSON, XML)
- [Unstructured Data](./entities/unstructured-data.md) — 비정형, 엔터프라이즈 80%
- [DIKW Pyramid](./entities/dikw-pyramid.md) — Data/Info/Knowledge/Wisdom

## 데이터 파이프라인 / 처리

- [ETL](./entities/etl.md) — 전통 Extract-Transform-Load
- [ELT](./entities/elt.md) — 현대 cloud-first
- [dbt](./entities/dbt.md) — Modern stack의 transformation 표준
- [Modern Data Stack](./entities/modern-data-stack.md) — 2026 스택 구조
- [CDC (Change Data Capture)](./entities/cdc.md) — Debezium
- [Streaming Data](./entities/streaming-data.md) — Kafka, Flink, Pulsar

## RAG 관련 (세부)

- [Chunking](./entities/chunking.md) — "RAG 실패의 80%가 여기서"
- [Embedding Model](./entities/embedding-model.md) — Voyage voyage-3-large 리더
- [Hybrid Search](./entities/hybrid-search.md) — BM25 + vector
- [Reranking](./entities/reranking.md) — Cross-encoder
- [RAGAS](./entities/ragas.md) — RAG 평가 프레임워크
- [Document AI](./entities/document-ai.md) — 비정형 추출

## LLM 학습 데이터

- [Tokenization](./entities/tokenization.md) — BPE, cl100k_base
- [Pre-training Data](./entities/pre-training-data.md) — Common Crawl, Wikipedia
- [Fine-tuning Data](./entities/fine-tuning-data.md) — SFT, RLHF, DPO
- [Synthetic Data](./entities/synthetic-data.md) — LLM이 생성하는 훈련 데이터

## 데이터 품질 · 윤리

- [Data Quality](./entities/data-quality.md) — 5대 차원
- [Data Bias](./entities/data-bias.md) — Selection/Historical/Measurement
- [Data-Centric AI](./entities/data-centric-ai.md) — Andrew Ng 운동
- [Data Mesh](./entities/data-mesh.md) — 분산 데이터 아키텍처

## 거버넌스 · 보안 · 규제

- [EU AI Act](./entities/eu-ai-act.md) — 2026.08.02 Article 10 발효 ⚠️
- [PII](./entities/pii.md) — 개인정보
- [Prompt Injection](./entities/prompt-injection.md)
- [Production Gap](./entities/production-gap.md)
- [Observability](./entities/observability.md)
- [Evaluation](./entities/evaluation.md)

## 도구 / 프레임워크

- [Claude Code](./entities/claude-code.md)
- [CLAUDE.md](./entities/claude-md.md)
- [Computer Use](./entities/computer-use.md)
- [Agent Frameworks (2026)](./entities/agent-frameworks.md)
- [LangGraph](./entities/langgraph.md)
- [n8n](./entities/n8n.md) — 오픈소스 비주얼 워크플로 자동화 + AI Agent 빌더
- [AI 코딩 IDE](./entities/ai-ide.md) — Cursor, Windsurf, Zed, Copilot Workspace
- [AI 검색](./entities/ai-search.md) — Perplexity, ChatGPT Search, AI Overviews

## 추론 · 추론 확장 (Reasoning) ⭐ NEW 카테고리

- [Reasoning Models](./entities/reasoning-models.md) — o1→o3, R1, Extended Thinking
- [Test-time Compute](./entities/test-time-compute.md) — ORM/PRM, Majority Vote, MCTS, STaR
- [Prompt Caching](./entities/prompt-caching.md) — 90% 비용 절감 (Anthropic/OpenAI)
- [Structured Output](./entities/structured-output.md) — JSON mode, tool_use, Pydantic/Zod
- [Context Engineering](./entities/context-engineering.md) — "프롬프트 엔지니어링은 죽었다" (Karpathy)
- [Long Context](./entities/long-context.md) — 1M+ tokens, RAG 논쟁, Lost in Middle
- [Distillation](./entities/distillation.md) — Teacher→Student, R1→Qwen/Llama

## 멀티모달 (Multimodal) ⭐ NEW 카테고리

- [Image Generation](./entities/image-generation.md) — Midjourney, DALL-E, Flux, Imagen
- [Video Generation](./entities/video-generation.md) — Sora 2, Veo 3.1, Kling 3.0
- [Voice AI](./entities/voice-ai.md) — Realtime API, ElevenLabs, Hume
- [World Models](./entities/world-models.md) — Sora as simulator, Genie 2

## 개념 / 메커니즘

- [Self-Attention](./entities/self-attention.md)
- [Augmented LLM](./entities/augmented-llm.md)
- [Memory (Agent)](./entities/memory.md)
- [Ontology](./entities/ontology.md) — Graph DB의 의미론적 사촌 · v1 실패와 v2 부활 · Palantir 운영 온톨로지 · OG-RAG 정량 벤치 포함

## AI/ML 기초 (Part 0) ⭐ NEW 카테고리

- [Machine Learning](./entities/machine-learning.md) — AI ⊃ ML ⊃ DL ⊃ GenAI 피라미드
- [Deep Learning](./entities/deep-learning.md) — ANN 기반 ML
- [Neural Network](./entities/neural-network.md) — 뉴런·은닉층·가중치
- [Activation Function](./entities/activation-function.md) — ReLU, GELU, Sigmoid
- [Supervised Learning](./entities/supervised-learning.md) — 지도학습
- [Unsupervised Learning](./entities/unsupervised-learning.md) — 비지도학습
- [Reinforcement Learning](./entities/reinforcement-learning.md) — 강화학습, RLHF의 기반
- [Self-Supervised Learning](./entities/self-supervised-learning.md) — LLM Pre-training의 핵심
- [Loss Function](./entities/loss-function.md) — MSE, Cross-Entropy
- [Gradient Descent](./entities/gradient-descent.md) — 경사하강법, Adam
- [Backpropagation](./entities/backpropagation.md) — 역전파 (1986)
- [Overfitting](./entities/overfitting.md) — Train/Val/Test 분할
- [Linear Regression](./entities/linear-regression.md) — y=wx+b
- [KNN](./entities/knn.md) — K-Nearest Neighbors
- [K-Means Clustering](./entities/k-means-clustering.md) — Elbow method
- [AGI Levels](./entities/agi-levels.md) — OpenAI 5단계 분류
- [AI Chip Evolution](./entities/ai-chip-evolution.md) — CPU→GPU→ASIC→뉴로모픽

## IT 개발 기초 (Part 10)

- [운영체제](./entities/operating-system.md) — OS, 커널, Linux 서버 표준
- [CPU](./entities/cpu.md) — 컴퓨터 시스템 통제, 모든 계산 수행
- [메모리 (하드웨어)](./entities/memory-hardware.md) — RAM, 프로그램 실행 공간
- [프로그램과 프로세스](./entities/program-process.md) — 코드→컴파일→빌드→실행, IDE
- [네트워크 기초](./entities/network-basics.md) — 클라이언트/서버, 3대 요소
- [프로토콜과 HTTP](./entities/protocol-http.md) — HTTP/HTTPS, SSH, OSI 7계층
- [IP, PORT, 도메인](./entities/ip-port-domain.md) — IPv4/v6, DNS, 방화벽
- [라이브러리와 프레임워크](./entities/library-framework.md) — React, Django, npm/pip
- [API](./entities/api-basics.md) — 프로그램 간 중개자, REST API
- [Git과 GitHub](./entities/git-github.md) — 버전 관리, 브랜치, PR, Actions

## 인물

- [Andrej Karpathy](./entities/karpathy.md)

## 경제 · 산업 ⭐ NEW 카테고리

- [AI 경제적 영향](./entities/ai-economic-impact.md) — Goldman zero GDP, McKinsey 1%, $67B capex

## 방법론

- [Vibe Coding](./entities/vibe-coding.md)

---

## 통계

- entity 페이지: **116개** (115 → 116, +1 n8n)
- 카테고리: 17개
- Last ingest: 2026-04-16 (Ontology 2024-2025 리서치 — GraphRAG/OG-RAG/Palantir/Shirky 계보)
- Last query: 2026-04-12 (Part 2 + Part 9 동시 합성, 45 entity 활용, 5495줄)
- **완료 사이클 #1**: Part 4 AI Agents 실전 — Sources → Ingest → Lint → Query → Ingest-back
- **완료 사이클 #2**: Part 8/9 Data 동시 합성 — 완전한 5단계 사이클
- **완료 사이클 #3**: Part 0 AI/ML 기초 (PwC PPTX source) — 2890줄
- Wiki compound effect 확인: 같은 위키로 여러 파트 동시 합성
