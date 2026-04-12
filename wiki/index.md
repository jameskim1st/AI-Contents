# Index

`wiki/entities/` 카탈로그. 카테고리별 분류.
**Last updated:** 2026-04-12

---

## 모델 (Models)

- [Transformer](./entities/transformer.md)

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
- [RAG](./entities/rag.md) ⭐ NEW
- [GraphRAG](./entities/graphrag.md) ⭐ NEW

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

## 개념 / 메커니즘

- [Self-Attention](./entities/self-attention.md)
- [Augmented LLM](./entities/augmented-llm.md)
- [Memory (Agent)](./entities/memory.md)
- [Ontology](./entities/ontology.md) — Graph DB의 의미론적 사촌, LLM 시대 부활

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

## 인물

- [Andrej Karpathy](./entities/karpathy.md)

## 방법론

- [Vibe Coding](./entities/vibe-coding.md)

---

## 통계

- entity 페이지: **87개** (28 → 87, +59)
- 카테고리: 13개 (9 → 13, 신설: 저장 계층 · Open Table Formats · 데이터 파이프라인 · 데이터 품질·윤리)
- Last ingest: 2026-04-12 (Data 파트 — 41개 신규 entity)
- Last query: 2026-04-12 (Part 1 + Part 4 동시 합성, 45 entity 활용, 5495줄)
- **완료 사이클 #1**: Part 4 AI Agents 실전 — Sources → Ingest → Lint → Query → Ingest-back
- **완료 사이클 #2**: Part 2/5 Data 동시 합성 — 완전한 5단계 사이클
- **완료 사이클 #3**: Part 0 AI/ML 기초 (PwC PPTX source) — 2890줄
- Wiki compound effect 확인: 같은 위키로 여러 파트 동시 합성
