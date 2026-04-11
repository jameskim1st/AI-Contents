# Log

위키 작업 기록. **Append-only.** 절대 기존 라인 수정·삭제 금지.
형식: `[YYYY-MM-DD type] 요약`

---

[2026-04-11 init] LLM Wiki 인프라 생성. README.md, schema.md, index.md, log.md, entities/ 디렉토리.
[2026-04-11 ingest] src/content/llm.html → entities/transformer.md, entities/self-attention.md, entities/moe.md 생성
[2026-04-11 ingest] src/content/ai-agents.html → entities/augmented-llm.md, entities/memory.md 생성
[2026-04-11 ingest] src/content/vibe-master.html → entities/claude-md.md, entities/claude-code.md, entities/harness-engineering.md, entities/vibe-coding.md 생성
[2026-04-11 ingest] Karpathy gist (https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) → entities/llm-wiki.md, entities/karpathy.md 생성. 이 패턴이 위키 자체의 운영 모델이 되었으므로 schema.md 신설.
[2026-04-11 meta] 위키 자체가 src/content/vibe-master.html Ch.09 "LLM Wiki" 강의의 살아있는 데모로 등록됨.
[2026-04-12 ingest] AI Agents 실전 리서치 12개 자료 (LangChain SoAE 2026 / Gartner / MCP 2026 roadmap / arXiv 2603.13417 / Anthropic Computer Use / OpenAI Operator / Claude Computer Use 비교 / 5 design patterns / Iain Harper security / Towards AI obs guide / 120+ tools landscape / IBM tech trends 2026) → 신규 entity 13개 (react, reflection, plan-and-execute, orchestrator-worker, narrow-scope, production-gap, human-in-the-loop, mcp, a2a, computer-use, observability, evaluation, prompt-injection, agent-frameworks, langgraph, multi-agent, plan-critic-build), 기존 entity 5개 갱신 (memory, augmented-llm, harness-engineering, claude-code, claude-md), 신규 카테고리 2개 ("프로토콜/표준", "운영/신뢰성"), index.md·schema.md 갱신.
[2026-04-12 meta] AI Agents 실전 리서치가 wiki에 모두 컴파일됨. 다음 단계: Part 2 (AI Agents 실전) 챕터 10개를 wiki에서 query하여 합성 예정.
[2026-04-12 lint] entity 28개 점검 — 고아 페이지 0, 죽은 링크 0, 모순 0, 고립(cross-ref<2) 1건 발견 → moe.md에 self-attention cross-ref 추가하여 해결. 통과.
[2026-04-12 query] Part 2 (AI Agents 실전) 챕터 10개를 wiki entity에서 query하여 합성. 사용된 entity: react, reflection, plan-and-execute, orchestrator-worker, narrow-scope, production-gap, human-in-the-loop, mcp, a2a, computer-use, observability, evaluation, prompt-injection, agent-frameworks, langgraph, multi-agent, plan-critic-build, claude-code, harness-engineering, augmented-llm, memory. 21개 entity 활용.
[2026-04-12 ingest-back] Part 2 챕터 ai-agents-advanced.html이 신규 raw source가 됨 → entity 페이지의 "강의 어디에 나오나" 섹션이 forward reference에서 actual reference로 굳음 (이미 작성 시 미리 anchored). Part 1 ai-agents.html prev/next 링크가 새 Part 2를 가리키도록 갱신됨.
[2026-04-12 meta] LLM Wiki 패턴의 5단계 워크플로 (Sources → Ingest → Lint → Query → Ingest-back) 1회 완전 사이클 완료. 사이트가 진짜 살아있는 LLM Wiki로 동작 검증.
[2026-04-12 ingest] Data 파트 리서치 5개 WebSearch (enterprise AI data strategy / RAG production / data-centric AI / privacy & EU AI Act / document AI) → 신규 entity 41개 (rdbms, data-warehouse, data-mart, data-lake, data-lakehouse, delta-lake, apache-iceberg, medallion-architecture, nosql, graph-db, vector-db, dikw-pyramid, structured-data, unstructured-data, semi-structured-data, etl, elt, dbt, modern-data-stack, cdc, streaming-data, rag, chunking, embedding-model, hybrid-search, reranking, ragas, graphrag, document-ai, eu-ai-act, synthetic-data, data-quality, data-bias, data-centric-ai, feature-store, pii, tokenization, pre-training-data, fine-tuning-data, data-mesh, data-contracts). Parallel 4개 agent 배치로 생성. entity 총 28 → 69개 (+41).
[2026-04-12 lint] entity 69개 점검 — 고아 0, 죽은 링크 0 (data-contracts.md lint에서 2건 검출 → 즉시 entity 생성하여 해결), 모순 0. 통과.
[2026-04-12 meta] 신설 카테고리 4개 (저장 계층, Open Table Formats, 데이터 파이프라인, 데이터 품질·윤리). 총 카테고리 9 → 13개. Data 파트 Ingest 단계 완료, Query(챕터 합성) 대기.
[2026-04-12 query] Part 1 (Data 기초) 12챕터 + Part 4 (Data 실전) 12챕터 합성. Parallel 4개 agent 배치 (ch01-06, ch07-12 × 2 파트). Part 1: 2706줄, Part 4: 2789줄. 총 Data 파트 5495줄. 활용 entity: dikw-pyramid, structured/semi/unstructured-data, rdbms, data-warehouse, data-mart, data-lake, data-lakehouse, delta-lake, apache-iceberg, medallion-architecture, nosql, graph-db, vector-db, feature-store, etl, elt, dbt, modern-data-stack, cdc, streaming-data, rag, chunking, embedding-model, hybrid-search, reranking, ragas, graphrag, document-ai, eu-ai-act, synthetic-data, data-quality, data-bias, data-centric-ai, pii, tokenization, pre-training-data, fine-tuning-data, data-mesh, data-contracts. 45개 entity 활용.
[2026-04-12 ingest-back] Part 1 + Part 4 신규 파일이 raw source로 등록됨. entity 페이지의 "강의 어디에 나오나" 섹션이 작성 시 미리 anchored 되어 곧바로 자동 연결. 8-part 구조로 사이트 재정렬 완료 (Batch B renumber).
[2026-04-12 meta] LLM Wiki 5단계 워크플로 완전 사이클 #2 완료. 이번엔 Part 1 + Part 4를 동시에 같은 wiki에서 합성 — 위키의 compound effect 최초 증명. 다음 파트 추가 시 재사용률이 더 높아질 것.
