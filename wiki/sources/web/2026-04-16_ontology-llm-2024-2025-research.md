---
title: "LLM × 온톨로지 / 지식 그래프 학술·오픈소스 연구 (2024-2025)"
author: Multiple (Microsoft Research, arXiv 등)
date_original: 2024-02 ~ 2025-10 (복수 자료)
date_ingested: 2026-04-16
source_type: web
url_or_path: 복수 URL — 본문 References 섹션 참조
used_for: wiki/entities/ontology.md · wiki/entities/graphrag.md
---

# LLM × 온톨로지 연구 (2024-2025)

## Context

기존 `wiki/entities/ontology.md`(2026-04-12 생성)가 Gruber 1993 정의·W3C 표준·Schema.org/SNOMED 사례까지는 다루지만 **2024-2025 LLM×KG 재결합의 실질적 증거(정량 벤치·주요 논문·프로덕션 패턴)**를 싣고 있지 않음. 본 소스는 그 공백을 메우기 위해 수집된 **학술·오픈소스 계열** 자료 묶음이다(엔터프라이즈 동향은 `2026-04-16_ontology-palantir-enterprise.md`, 비판·부활 서사는 `2026-04-16_ontology-critique-revival.md`에 분리 기록).

## Key Points

### Microsoft GraphRAG — 재부상의 방아쇠

- **블로그:** Jonathan Larson & Steven Truitt (Microsoft Research), "GraphRAG: Unlocking LLM discovery on narrative private data", 2024-02-13
- **논문:** Edge et al., *"From Local to Global: A Graph RAG Approach to Query-Focused Summarization"*, arXiv:2404.16130, 2024-04 (PrePrint)
- **오픈소스:** https://github.com/microsoft/graphrag (MIT 라이선스)
- **핵심 주장:** 벡터 RAG가 "여러 문서에 걸친 요약·추론"에 약한 것을 **LLM이 만든 지식 그래프 + Leiden 커뮤니티 탐지 + 커뮤니티 요약**으로 보완
- **Pipeline:** Indexing(1회) — LLM이 entity·relation 추출 → Leiden 클러스터링 → community summary / Query — Global search(폭넓은 요약) vs Local search(특정 entity 이웃)

### OG-RAG — 온톨로지 그라운드 RAG (정량 증거의 핵심)

- **논문:** Kartik Sharma, Peeyush Kumar, Yunqing Li (Microsoft Research), *"OG-RAG: Ontology-Grounded Retrieval-Augmented Generation for Large Language Models"*, arXiv:2412.15235, 2024-12 (EMNLP 2025 accepted)
- **핵심 주장:** GraphRAG가 "LLM이 문서에서 즉석으로 만든 그래프"를 쓴다면, OG-RAG는 **사전 정의된 도메인 온톨로지에 검색을 그라운딩**함. 규제 산업(의료·법률·금융)에서 훨씬 예측 가능한 답변.
- **벤치마크 (4개 LLM에 대한 ablation):**
  - **+55% fact recall** (사실 회수율)
  - **+40% correctness** (정답률)
  - **+27% reasoning accuracy** (추론 정확도)
- **의의:** LLM×온톨로지 결합이 "그냥 좋다"가 아니라 **수치로 입증**된 최초 대규모 벤치마크 중 하나.

### Ontology-grounded KG under Wikidata schema

- **논문:** arXiv:2412.20942, 2024-12
- **패턴:** "LLM as guardrailed ontologist" — LLM이 Wikidata 스키마를 온톨로지 가드레일로 사용해 KG를 구축
- **의의:** 대규모 공개 온톨로지(Wikidata)를 "LLM의 외부 참조 프레임"으로 활용하는 패턴의 정형화

### 자동 KG 구축 프레임워크 (2025)

- **AutoSchemaKG** — Bai et al., 2025 — 멀티에이전트가 스키마를 자동 설계·확장
- **KARMA** — Lu & Wang, 2025 — 지식 획득·정제를 에이전트 협업으로 수행
- **공통 방향:** 사람이 수작업 모델링하던 영역을 LLM 에이전트 집단이 대체 → v1(2000s) 실패의 주요 원인(메타데이터 수공 비용)을 정면으로 해결

### 서베이 한 편

- **논문:** arXiv:2510.20345, *"LLM-empowered knowledge graph construction: A survey"*, 2025
- **역할:** 본 소스 파일의 "전체 지형을 한 번에 보기" 레퍼런스. 향후 재조사 시 시작점.

## Quotes

> "ontology is a specification of a conceptualization"
> — Tom Gruber, 1993 (OG-RAG 등 2024-2025 논문 대부분이 여전히 이 정의를 기본 프레임으로 차용)

(현장 실적 인용문은 Source B — Palantir/Neo4j/Stardog 계열에 수록)

## References (URL 일람)

- MS Research Blog 2024-02-13: https://www.microsoft.com/en-us/research/blog/graphrag-unlocking-llm-discovery-on-narrative-private-data/
- GraphRAG arXiv 2024-04: https://arxiv.org/abs/2404.16130
- GraphRAG GitHub: https://github.com/microsoft/graphrag
- OG-RAG arXiv 2024-12: https://arxiv.org/abs/2412.15235
- Ontology-grounded KG (Wikidata) arXiv 2024-12: https://arxiv.org/abs/2412.20942
- LLM-empowered KG construction survey 2025: https://arxiv.org/abs/2510.20345

## Entities created/updated

- [ontology](../../entities/ontology.md) — "2024-2025 핵심 발전" 섹션에 GraphRAG·OG-RAG 편입
- [graphrag](../../entities/graphrag.md) — OG-RAG 변형 단락 추가

## Chapters created/updated

- (이번 ingest는 사이트 HTML은 갱신하지 않음 — wiki 계층 한정)

## Meta

본 자료는 2026-04-16 Claude Code 세션 중 WebSearch·WebFetch를 통해 수집. 원본 링크는 외부에 존재하므로 **휘발 방지**를 위해 본 파일에 핵심 수치와 인용을 보존함. 수치(+55%/+40%/+27%)는 OG-RAG 논문 Table 2·3 요약본 기준 — 원문 재확인 시 arXiv:2412.15235 참조.
