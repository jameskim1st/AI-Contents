---
title: "AI 에이전트 디자인 패턴 — 2025-2026 SOTA & 산업 표준 리서치"
author: Multiple — Anthropic · LangChain · OpenAI · Microsoft · arXiv 등
date_original: 2024-12 ~ 2026-04 (복수 자료)
date_ingested: 2026-04-17
source_type: web
url_or_path: 복수 URL — 본문 References 섹션 참조
used_for: src/content/ai-agents-advanced.html Ch.02 · wiki/entities/{react,reflection,plan-and-execute,orchestrator-worker,mcp}.md
---

# AI 에이전트 디자인 패턴 2025-2026

## Context

본 사이트의 Part 4 Ch.02 "에이전트 디자인 패턴 5선 — 2026년 표준"을 2025-2026 시점 사실 기반으로 보강하기 위한 리서치. 기존 챕터는 패턴별 개요만 있고, **2025년의 Pre-Act/MAR/Deep Agents/MCP 표준화/Anthropic 5패턴 분류 정착** 등 *최근 1년의 결정적 변화*를 반영하지 못했음. 본 소스에 모든 정량 데이터·인용·논문·블로그 URL을 보존해 추후 Lint·재사용 근거가 됨.

## Key Points

### 0. 메타 — 2025-2026 산업 합의

**Anthropic "Building Effective Agents"** (Schluntz & Zhang, 2024-12-20)이 2025년 사실상 표준 분류로 정착:
- Workflows 5종: **Prompt Chaining · Routing · Parallelization · Orchestrator-Workers · Evaluator-Optimizer**
- Agents: 자율적 ReAct 루프

본 사이트 Ch.02의 5패턴(ReAct·Reflection·Plan-and-Execute·Tool Use·Orchestrator-Worker)은 Anthropic 분류와 다른 축이지만 상호 보완. ReAct/Reflection은 "에이전트 루프", Plan-and-Execute/Orchestrator-Worker는 "워크플로", Tool Use는 "기본 빌딩 블록".

### 1. ReAct (Reasoning + Acting)

**원조:** Yao et al., arXiv:2210.03629, 2022 (Princeton + Google Brain, ICLR 2023)

**2025-2026 변화:**
- **LangGraph 1.0 GA (2025-10)** — `create_react_agent`가 `langchain.agents` 표준 진입. Uber·LinkedIn·Klarna 프로덕션. zero breaking changes.
- **Pre-Act** (Sapkota et al., arXiv:2505.09970, 2025-05) — multi-step plan을 미리 만든 뒤 매 step refine. ReAct 대비 **Action Recall +70%**, fine-tuned 70B 모델 action accuracy +69.5%, goal completion +28%. ReAct 단순 루프의 long-horizon 한계를 정면 비판.
- **Autono** (arXiv:2504.04650, 2025-04) — robust 자율 에이전트, hallucination 감소.
- **모델 다운사이징 추세:** 2025 초 70B 필요 → 2026 초 32B에서 동작, 14B로 75%+ 신뢰도.
- **Smolagents (HuggingFace, 2025)** — 동일 ReAct가 LangGraph 120 lines vs Smolagents 40 lines. 프로토타이핑 vs 프로덕션 분업 정착.

**합의 vs 논쟁:**
- 합의: ReAct = "에이전트 입문 패턴 표준"
- 논쟁: 순수 ReAct의 long-horizon 깨짐 → Pre-Act/Deep Agents로 진화

### 2. Reflection / Reflexion

**원조:** Shinn et al., arXiv:2303.11366, NeurIPS 2023 — HumanEval pass@1 91% (GPT-4 baseline 80% 대비 +11점).

**2025-2026 변화:**
- **MAR (Multi-Agent Reflexion)** (arXiv:2512.20845, 2025-12) — 핵심 발견: *"단일 에이전트 self-reflection은 같은 모델이 행동·평가·반성을 모두 수행하면 동일 추론 오류가 반복되는 **degeneration-of-thought** 현상이 발생"*. 액팅·진단·비평·종합을 분리한 멀티에이전트 변형. **HumanEval pass@1 76.4 → 82.6 (+6.2점)** vs 단일 Reflexion.
- **Anthropic 5패턴 분류의 "Evaluator-Optimizer"가 사실상 Reflection의 산업 명칭**으로 정착 (2024-12 → 2025).

**프레임워크 표준화:**
- LangGraph: Reflection은 별도 모듈 없이 conditional edge로 표현 (generator → critic → loop).
- CrewAI 1.1.0 (2025-12): EventListener에 평가 hook 통합.

### 3. Plan-and-Execute / LLMCompiler / Deep Agents

**원조:** Wang et al. "Plan-and-Solve Prompting", ACL 2023, arXiv:2305.04091. LangChain "Plan-and-Execute" 패턴 (2023).

**2025-2026 변화:**
- **LLMCompiler** (Kim et al., 2024) — Planner / Task Fetching Unit / Joiner 3-component DAG. ReAct·plan-and-execute·ReWOO보다 빠르고 OpenAI parallel tool calling보다도 우위. 2025-2026 LangGraph 공식 튜토리얼 내장.
- **Deep Agents** (LangChain, 2025) — *"long-horizon work에서 ReAct 단순 루프가 깨지는 작업"*을 위한 표준. Planning tool + 가상 filesystem + subagent spawning. NVIDIA AI-Q와 결합한 enterprise search 사례.
- **AutoGPT, BabyAGI (2023)**: 사실상 시장에서 사라짐. "1년만 쓰여진 패턴"으로 회고.
- **ReWOO**: LLMCompiler에 흡수.

**비용 우위:**
LLMCompiler는 *"DAG eager execution + LLM 호출 횟수 감소"*로 token 비용 절감. Plan-and-Execute가 ReAct보다 작은 모델 사용 가능 (planner만 큰 모델, executor는 작은 모델).

### 4. Tool Use / Function Calling / MCP

**MCP 1년사 (2024-11 → 2025-12):**
- 2024-11 Anthropic 발표
- 2025-03 OpenAI 공식 채택 (ChatGPT desktop)
- 2025-04 Google DeepMind Gemini 지원 (Demis Hassabis 발표)
- 2025-12 **Linux Foundation 산하 Agentic AI Foundation (AAIF)에 기증**, 공동창립 6사: OpenAI · Anthropic · Google · Microsoft · AWS · Block

**규모 (2025-12 기준):**
- MCP server 다운로드: 2024-11 ~10만 → 2025-04 800만+ → 2025-12 Python+TS SDK 월 9,700만 다운로드
- 5,800+ MCP servers · 300+ clients
- 별명: **"AI의 USB-C"**

**2025-2026 벤치마크:**
- **Berkeley Function Calling Leaderboard (BFCL) v3/v4**: Claude Sonnet 4 = **70.29% (3위)**, GPT-5 = 59.22% (7위)
- **τ²-Bench** (Sierra Research, arXiv:2506.07982, 2025-06): dual-control conversational. Claude Sonnet 4.5 multi-turn tool use 선두.
- **MCP-Bench / MCPVerse** (Accenture Labs, arXiv:2508.16260, 2025-08): 28개 live MCP server, 250 tool 통합 멀티홉 평가
- 2025년 합의: **"단일 벤치 무용, BFCL+τ²+MCP-Bench triangulation 필수"**

**2025-10 Anthropic Skills:**
- `name + description`만 system prompt 미리 로딩, 필요할 때 progressive disclosure로 instructions/scripts/resources 동적 로딩
- 2025-12 open standard 전환 — MCP 다음 표준화 시도

### 5. Orchestrator-Worker / Multi-Agent Supervisor

**Anthropic Multi-Agent Research System** (anthropic.com/engineering/multi-agent-research-system, 2025-06):
- Claude Opus 4 lead + Claude Sonnet 4 subagents
- 단일 Opus 4 대비 내부 research 평가 **+90.2%**
- 비용: **token 소비 ~15× chat, ~4× single-agent**
- **"Token usage가 browsing eval 분산의 80%를 설명"** → 비용 정당화
- 명시적 scaling rule: simple fact-finding = 1 agent / 3-10 tool calls; comparison = 2-4 subagents / 10-15 calls each

**프레임워크 표준 (2025):**
- **LangGraph Supervisor** — 그래프 기반, Klarna·Uber 프로덕션
- **CrewAI Flows** (2025 후반) — 44,600+ stars, 월 4.5억 워크플로, MCP·A2A native
- **OpenAI Agents SDK** (2025-03 GA, Swarm 후속) — handoffs + guardrails + tracing. 2025-10 DevDay AgentKit 발표
- **Microsoft Agent Framework** (2025-10 발표, AutoGen + Semantic Kernel 통합) — GA Q1 2026, multi-language

**A2A (Agent-to-Agent):**
MCP와 함께 Linux Foundation 표준 합류 (2025-12). 에이전트 간 통신 프로토콜.

**Databricks Supervisor Agent (2025):**
"중앙 orchestrator → subtask 분해 → specialized agent 위임 → 진척 모니터 → 출력 검증 → 통합 응답"이 enterprise blueprint로 정착.

### 6. 2026 메타 변화

**새 패턴 (2024년에는 없었음):**
1. **Anthropic Skills** (2025-10 → 2025-12 open standard) — progressive disclosure 추상화
2. **Memory layer** — Zep (Graphiti temporal KG) **LongMemEval 63.8%** vs Mem0 49.0% (15점 차). 2025-09 Mem0가 Kuzu graph backend 추가
3. **Deep Agents harness pattern** — framework가 아닌 harness: planning + virtual fs + subagent + context compression
4. **Managed Agents / Agent-as-a-Service** — Anthropic Claude Platform Managed Agents, OpenAI AgentKit, Databricks Agent Bricks
5. **Anthropic 5 workflow 패턴** (Schluntz & Zhang, 2024-12-20) — 2025년 산업 표준 분류

**사라지거나 합쳐진 것:**
- AutoGPT, BabyAGI: 사실상 사라짐
- OpenAI Swarm: educational로 격하 → Agents SDK (2025-03)
- AutoGen 0.4 (2025-01) → Microsoft Agent Framework (2025-10) 통합. AutoGen 단독 종료
- Zep Community Edition: deprecated (2025-04)
- claude-code-sdk → claude-agent-sdk: 2025년 통합 명칭 변경

### 7. 한국 자료
- **arXiv:2509.19369** — *"SLM-BASED AGENTIC AI WITH P–C–G: OPTIMIZED FOR KOREAN TOOL USE"* (2025-09)
- **LG AI Research Exaone 4.0** (2025-07, 30B)
- **Seoul Metropolitan Government Chatbot 2.0** (2025) — 자체 LLM + 행정 시스템 연동 AI agent
- **과기정통부 240억원 sovereign LLM 컨소시엄 5사**: Naver Cloud · SKT · Upstage · LG AI Research · NC AI

## Quotes

> "Claude Code is the first convincing demonstration of what an LLM Agent looks like — something that in a loopy way strings together tool use and reasoning for extended problem solving."
> — **Andrej Karpathy**, 전 Tesla AI Director · OpenAI 창립멤버 · Eureka Labs 창립자, "2025 LLM Year in Review", karpathy.bearblog.dev, 2025-12

> "When agents mess up, they mess up because they don't have the right context; when they succeed, they succeed because they have the right context."
> — **Harrison Chase**, LangChain CEO, Sequoia Capital "Training Data" 팟캐스트, 2025

> "+1 for 'context engineering' over 'prompt engineering'. context engineering is the delicate art and science of filling the context window."
> — **Andrej Karpathy**, X(Twitter), 2025-06

> "The single agent design of Reflexion leads to systematic shortcomings where the same model generates actions, evaluates its own behavior, and produces reflections, which often results in repeated reasoning errors, confirmation bias, and limited corrective feedback."
> — **MAR 논문 저자들**, arXiv:2512.20845, 2025-12

> "Token usage explains 80% of performance variance in browsing evaluations."
> — **Anthropic Engineering**, "How we built our multi-agent research system", 2025-06

> "MCP has become the de facto standard for how AI agents use tools, taking less than a year to go from internal Anthropic protocol to industry standard."
> — **modelcontextprotocol.io 공식 1주년 회고**, 2025-11-25

> "The companies succeeding with multi-agent AI in 2026 aren't always the ones with the fanciest agent architectures. They are the ones who realized early on that orchestration is what turns agent capability into real business reliability."
> — **Deloitte 2026 TMT Predictions**, deloitte.com/insights, 2026

## References (URL 일람)

### Anthropic 공식
- https://www.anthropic.com/research/building-effective-agents (Schluntz & Zhang, 2024-12-20)
- https://www.anthropic.com/engineering/multi-agent-research-system (2025-06)
- https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills (2025-10)
- https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- https://platform.claude.com/docs/en/agent-sdk/overview
- https://github.com/anthropics/skills

### LangChain / LangGraph
- https://blog.langchain.com/langchain-langgraph-1dot0/ (1.0 GA, 2025-10)
- https://docs.langchain.com/oss/python/releases/langgraph-v1
- https://blog.langchain.com/deep-agents/
- https://github.com/langchain-ai/deepagents
- https://blog.langchain.com/planning-agents/
- https://langchain-ai.github.io/langgraph/tutorials/llm-compiler/LLMCompiler/
- https://blog.langchain.com/three-years-langchain/
- https://sequoiacap.com/podcast/training-data-harrison-chase/

### OpenAI
- https://openai.github.io/openai-agents-python/
- https://openai.github.io/openai-agents-python/handoffs/
- https://github.com/openai/swarm
- https://cookbook.openai.com/examples/orchestrating_agents

### Microsoft / Databricks
- https://www.databricks.com/blog/multi-agent-supervisor-architecture-orchestrating-enterprise-ai-scale

### CrewAI
- https://docs.crewai.com/en/changelog
- https://community.crewai.com/t/new-release-crewai-1-1-0-is-out/7142

### MCP
- https://modelcontextprotocol.io/specification/2025-11-25
- https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/
- https://en.wikipedia.org/wiki/Model_Context_Protocol

### 논문
- https://arxiv.org/abs/2210.03629 (ReAct, 2022)
- https://arxiv.org/abs/2303.11366 (Reflexion, NeurIPS 2023)
- https://arxiv.org/abs/2305.04091 (Plan-and-Solve, ACL 2023)
- https://arxiv.org/abs/2505.09970 (Pre-Act, 2025-05)
- https://arxiv.org/abs/2504.04650 (Autono, 2025-04)
- https://arxiv.org/abs/2512.20845 (MAR Multi-Agent Reflexion, 2025-12)
- https://arxiv.org/abs/2506.07982 (τ²-Bench, 2025-06)
- https://arxiv.org/abs/2406.12045 (τ-Bench, 2024-06)
- https://arxiv.org/html/2508.16260v2 (MCPVerse, Accenture Labs)
- https://arxiv.org/pdf/2509.19369 (Korean SLM P-C-G, 2025-09)
- https://arxiv.org/html/2504.19413v1 (Mem0, 2025-04)

### 벤치마크
- https://gorilla.cs.berkeley.edu/leaderboard.html (BFCL)
- https://taubench.com/
- https://github.com/sierra-research/tau2-bench
- https://artificialanalysis.ai/evaluations/tau2-bench

### 인용·산업 분석
- https://karpathy.bearblog.dev/year-in-review-2025/ (Karpathy 2025 회고)
- https://x.com/karpathy/status/1937902205765607626 (context engineering 트윗)
- https://opendatascience.com/harrison-chase-on-deep-agents-the-next-evolution-in-autonomous-ai/
- https://venturebeat.com/orchestration/langchains-ceo-argues-that-better-models-alone-wont-get-your-ai-agent-to
- https://simonwillison.net/2024/Dec/20/building-effective-agents/
- https://nanothoughts.substack.com/p/reflecting-on-reflexion
- https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/ai-agent-orchestration.html
- https://thenewstack.io/agent-skills-anthropics-next-bid-to-define-ai-standards/
- https://siliconangle.com/2025/12/18/anthropic-makes-agent-skills-open-standard/

### 메모리
- https://atlan.com/know/best-ai-agent-memory-frameworks-2026/
- https://mem0.ai/blog/state-of-ai-agent-memory-2026

### 한국
- https://www.marktechpost.com/2025/08/21/meet-south-koreas-llm-powerhouses-hyperclova-ax-solar-pro-and-more/
- https://english.seoul.go.kr/seoul-to-adopt-its-own-llm-for-administrative-affairs-taking-step-toward-world-class-ai-administration/

## Entities created/updated
- [react](../../entities/react.md) — Pre-Act 2025-05, LangGraph 1.0 통합 추가
- [reflection](../../entities/reflection.md) — MAR 2025-12 multi-agent variant, Anthropic Evaluator-Optimizer 명칭화
- [plan-and-execute](../../entities/plan-and-execute.md) — LLMCompiler 흡수, Deep Agents 진화, AutoGPT 사라짐
- [orchestrator-worker](../../entities/orchestrator-worker.md) — Anthropic 사례 +90.2%/15×, A2A 표준화
- [mcp](../../entities/mcp.md) — 1주년 사실, Linux Foundation AAIF 기증

## Chapters created/updated
- src/content/ai-agents-advanced.html — Part 4 Ch.02 "에이전트 디자인 패턴 5선" 전면 보강

## Meta

본 소스의 가치: 2025-2026 변화의 핵심 수치(MAR +6.2pt, Pre-Act +70%, Anthropic 다중 +90.2%/15×, MCP 5,800+ servers)와 인용(Karpathy/Chase/Anthropic/Deloitte)을 한 곳에 보존. 향후 각 패턴 entity의 정량 근거 또는 다른 챕터(예: Part 7 AI 개발 실전)에서 재사용 가능.
