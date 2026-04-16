---
title: "온톨로지 역사적 계보·비판·부활 서사 (1993-2024)"
author: Gruber · Berners-Lee · Shirky · Singhal · Cagle · Vrandečić 등
date_original: 1993-2024 (복수 자료)
date_ingested: 2026-04-16
source_type: web
url_or_path: 복수 URL — 본문 References 섹션 참조
used_for: wiki/entities/ontology.md (v1 실패·v2 부활 섹션)
---

# 온톨로지 계보·비판·부활

## Context

"LLM 시대에 온톨로지가 왜 *다시* 주목받는가"를 설명하려면, **왜 한 번 시들었는지**의 맥락이 필요하다. 2000s 시맨틱 웹이 실패한 진단과 2024-2025 부활의 조건이 대칭적이라는 것이 이번 서사의 핵심. 본 소스는 `wiki/entities/ontology.md`의 "v1 실패와 v2 부활" 섹션에서 인용문·연도·출전을 뽑아 쓸 수 있도록 **pull-quote 창고** 역할을 한다.

## Key Points — 역사적 타임라인

| 연도 | 사건 | 주인공 |
|---|---|---|
| **1993** | "An ontology is a specification of a conceptualization" 정의 | Tom Gruber (Stanford KSL) |
| **2001** | Semantic Web 비전 *Scientific American* 게재 | Berners-Lee, Hendler, Lassila |
| **2005** | "Ontology is Overrated" 비판 — O'Reilly ETech 기조 | Clay Shirky (NYU) |
| **2012** | Google Knowledge Graph 공식 출시 — "things, not strings" | Amit Singhal (Google SVP Search) |
| **2022-2024** | ChatGPT 이후 LLM 환각·도메인 지식 문제로 KG 재주목 | (집단적) |
| **2024-2025** | GraphRAG · OG-RAG · Palantir 매출 급증으로 "v2" 본격화 | MS Research · Palantir · Neo4j |

## Gruber 1993 — 정확 출전

- **논문:** Thomas R. Gruber, *"A Translation Approach to Portable Ontology Specifications"*, *Knowledge Acquisition* 5(2):199-220, 1993
- **소속 당시:** Stanford Knowledge Systems Laboratory (KSL)
- **핵심 인용:**
  > "An ontology is a formal, explicit specification of a shared conceptualization."
  > — Tom Gruber, 1993
- **의의:** 이 한 문장이 향후 30년 학술 온톨로지 정의의 기본 프레임이 됨. 2024-2025 논문(OG-RAG 포함) 대다수가 여전히 이 정의를 서두에 인용.

## Berners-Lee et al. 2001 — Semantic Web 비전

- **글:** Tim Berners-Lee, James Hendler, Ora Lassila, *"The Semantic Web"*, *Scientific American*, 2001년 5월호
- **핵심 주장:** 웹 콘텐츠를 사람이 아닌 **기계가 의미적으로 이해**할 수 있도록 RDF/OWL로 메타데이터화하자. "지능적 에이전트가 웹을 돌아다니며 예약·검색을 대신한다"는 미래상.
- **결말:** 2000년대 중반까지 학계·W3C 주도로 확산됐으나 프로덕션 성공 사례가 구글 KG를 제외하면 극히 적었음.

## Clay Shirky 2005 — "Ontology is Overrated" (결정적 비판)

- **행사:** O'Reilly Emerging Technology Conference (ETech), 2005-03
- **소속 당시:** NYU Interactive Telecommunications Program
- **대표 인용 (블록 인용용):**
  > "[The Semantic Web is] a throwback to archaic efforts to force the world into hierarchical organizational schema that become out of date almost immediately."
  > — Clay Shirky, NYU, O'Reilly ETech, 2005-03
- **핵심 논지 (재구성):**
  - 하향식 분류 체계(taxonomy/ontology)는 물리 세계(도서관 분류)에선 작동했지만, **링크가 공짜인 디지털 세계**에선 적합하지 않다
  - 태그(tagging) 같은 **상향식·소셜 분류**가 더 강력 — 폴크소노미(folksonomy)의 시대
  - "의미는 스키마가 아니라 사용에서 나온다"
- **영향:** 이 비판이 Web 2.0 사조와 맞물려 시맨틱 웹 열기를 실질적으로 꺾음.

## Amit Singhal 2012 — "things, not strings"

- **출처:** Google Official Blog, *"Introducing the Knowledge Graph: things, not strings"*, 2012-05-16
- **저자:** Amit Singhal, SVP Search, Google
- **핵심 문구:**
  > "things, not strings"
  > — Amit Singhal, Google, 2012-05-16
- **의의:** 학계 용어였던 "Knowledge Graph"가 **산업 일반어**로 넘어오는 결정적 순간. Google은 실제로 RDF/OWL 스택을 쓰지 않았지만 "KG"라는 이름을 대중화.

## v1 (2000s 시맨틱 웹) 실패 원인 — 집단적 진단

Kurt Cagle, Philippe Fournier-Viger, 기타 현장 베테랑들의 합의:

1. **OWL의 지나친 학술성** — 표현력은 높지만 실무자에겐 진입 장벽이 지나치게 높음
2. **저자 인센티브 부재** — 웹 페이지 작성자가 RDFa를 손으로 달 이유가 거의 없었음
3. **수공 메타데이터의 비현실성** — 한 평가: *"inaccurate, insufficient, subjective, shoddy"*
4. **Reasoning 확장 한계** — 대규모 데이터에서 OWL DL reasoner가 실용 속도를 내지 못함
5. **killer app 부재** — 구글 검색 외에 "일반인이 체감하는 시맨틱 웹" 제품이 없었음

## v2 (2024-2025 LLM×KG) 부활의 논리

**대칭적 진단:** v1 실패 원인 중 1·2·3번이 LLM으로 해결 가능해졌다.

- **LLM이 80% drudgery 자동화** — entity 추출·스키마 초안 작성·태깅을 사람이 손으로 안 해도 됨
- **온톨로지 편집기가 아닌 자연어 인터페이스** — Stardog Voicebox, Text2Cypher 등
- **killer app 등장** — LLM 환각 억제용 "사실 근거 계층"으로서의 KG. 규제 산업 수요 명확.

### Denny Vrandečić (Wikidata 공동창업자) 프레이밍

- **소속:** Wikimedia Foundation / Wikidata 공동창업자
- **관점 (인용 가능한 요약):**
  - KG의 약점: **brittleness** (모델링 안 된 것은 못 답함)
  - LLM의 약점: **hallucination** (없는 것도 있다고 우김)
  - 두 약점이 **서로 상쇄되는 합성**이 LLM×KG 결합의 본질
- **의의:** 학계·개발자 양쪽에서 존중받는 "both-and" 서술. 벤더 발언보다 인용 신뢰도 높음.

### Kurt Cagle — 블런트 스켑틱 목소리

- **매체:** LinkedIn에서 "Why the Semantic Web Has Failed" 같은 연작
- **포지셔닝:** 시맨틱 웹 현장에서 오래 일한 실무자가 "v1이 왜 실패했는지" 솔직히 진단 — 동일 저자가 v2 가능성도 신중하게 점검
- **의의:** "온톨로지가 다시 뜬다!"식 하이프에 대한 균형추. 엔티티 기록 시 **비판적 관점 인용**이 필요하면 Cagle가 가장 쓰기 좋음.

## References (URL 일람)

- Gruber 1993 논문 (저자 사이트 사본): http://tomgruber.org/writing/ontolingua-kaj-1993.pdf
- Berners-Lee et al. 2001 *Scientific American*: https://www.scientificamerican.com/article/the-semantic-web/
- Clay Shirky "Ontology is Overrated" (2005): https://gwern.net/doc/cs/2005-shirky-ontologyisoverrated.html
- Google Knowledge Graph 2012-05-16 블로그: https://blog.google/products/search/introducing-knowledge-graph-things-not/
- Kurt Cagle LinkedIn 연작 (검색): "Kurt Cagle Semantic Web"
- Wikidata (Vrandečić 프로젝트): https://www.wikidata.org/

## Entities created/updated

- [ontology](../../entities/ontology.md) — "v1 실패와 v2 부활 — 역사적 계보" 섹션

## Chapters created/updated

- (이번 ingest는 사이트 HTML은 갱신하지 않음 — wiki 계층 한정)

## Meta

본 소스는 인용문 품질이 생명이므로 **발화자 + 연도 + 매체**를 모든 항목에 붙였음. 2000s 원문 링크는 링크 로트(link rot)가 잦으므로 가능하면 gwern.net 같은 아카이브 사본을 우선 기재. Shirky 원문은 여러 미러가 있지만 gwern.net 사본이 현재(2026-04) 가장 안정적.
