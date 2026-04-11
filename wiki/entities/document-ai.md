# Document AI

**Category:** 도구 / 전처리
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

PDF·스캔 이미지·표·차트 같은 **비정형(unstructured) 문서**를 구조화된 데이터로 변환하는 영역. 2026년 산업 전반의 합의: **"엔터프라이즈 지식의 80%가 PDF에 갇혀 있다"** (Unstructured.io·Informatica·Gartner 공통 인용). 전통적 OCR만으로는 실패하고, **VLM(Vision Language Model) 기반 파싱**으로 전환 중. [RAG](./rag.md) 파이프라인의 실제 성패는 여기서 판가름 난다.

## 설명

### 왜 갑자기 뜨는가

- 기업 데이터의 80~90%가 비정형, 그 중 다수가 PDF (IDC 2026).
- 계약서·보고서·연구논문·보험 청구·명세서 — 전부 "LLM에 그냥 밀어넣기" 실패.
- 표·차트·각주·다단 레이아웃·손글씨·도장이 혼재.
- 기존 OCR(Tesseract 등)은 글자를 읽지만 **구조를 모른다**.

### 2026년 전환: OCR → VLM → Agentic

| 세대 | 대표 도구 | 방식 |
|---|---|---|
| **1세대: Pure OCR** | Tesseract, Abbyy | 이미지 → 텍스트. 표·레이아웃 소실 |
| **2세대: Layout-aware** | LayoutLM, Donut | OCR + 레이아웃 임베딩 |
| **3세대: VLM 파싱** | GPT-4o, Claude 3.5/4, Gemini 2.5 | 이미지를 직접 이해, 표·차트를 JSON으로 |
| **4세대: Agentic Document Processing** (2026) | Reducto, Unstructured, LlamaParse | VLM + 자체 reasoning loop, 실패 시 재시도·다른 전략 |

### 2026 주요 제품

| 도구 | 제공 | 포지션 |
|---|---|---|
| **Unstructured.io** | Unstructured | 오픈소스 + 상용, 400+ 파일 타입, LangChain 기본 통합 |
| **Reducto** | Reducto (YC) | VLM 파싱 전문, 복잡한 표·차트 특화, 엔터프라이즈 |
| **Databricks `ai_parse_document`** | Databricks | 2025-11 GA, SQL에서 바로 호출 |
| **LlamaParse** | LlamaIndex | Agentic mode, premium tier로 GPT-4o 파싱 |
| **Informatica CLAIRE Doc AI** | Informatica | IDP 전통 강자 + GenAI, 보험·금융 |
| **AWS Textract + Bedrock** | AWS | 서버리스, 규제 환경 |
| **Google Document AI** | Google Cloud | 양식(Form) 처리 강점 |
| **Azure AI Document Intelligence** | Microsoft | 전 Form Recognizer, 사전 빌드된 모델 많음 |

### 핵심 과제

1. **표(Table)** — RAG 품질의 숨은 킬러. HTML·Markdown·JSON 중 Markdown이 LLM 친화적.
2. **차트·그림** — 캡션만 추출할지, 전체 이미지를 VLM으로 설명할지 선택.
3. **다단(multi-column) 레이아웃** — 읽기 순서가 깨지면 의미 붕괴.
4. **수식·화학식** — LaTeX 또는 MathML 보존.
5. **손글씨·스탬프·서명** — 금융·법률에서 치명적.
6. **버전 다른 문서 간 일관성** — 같은 양식인데 레이아웃이 조금씩 다름.

### 2026 트렌드: Agentic Document Processing

"한 번 파싱하고 끝"이 아니라:
1. VLM이 문서를 1차 파싱.
2. 결과를 스스로 검증 (숫자 합계, 필수 필드 존재 여부).
3. 실패 시 다른 전략으로 재시도 (다른 prompt, 다른 모델, 영역만 크롭).
4. 최종 결과에 confidence score 부여.

→ Reducto, LlamaParse Premium, Unstructured Platform이 대표.

### 실전 조언

- 단일 도구에 종속되지 말고 **파이프라인의 추상화**를 두자 (예: `DocumentParser` 인터페이스).
- 평가 데이터셋을 먼저 만들자 — "내 문서 50개에서 표·숫자 추출 정확도"가 모든 벤더 선택의 기준.
- 긴 PDF는 **page-level [Chunking](./chunking.md)**과 결합.
- **2026 현실** — 가장 비싼 최신 VLM 파싱으로도 복잡한 금융 10-K에서는 여전히 표 정확도 90% 미만. 사람 검토가 남는다.

## Reference

- [Part 1 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/01-data-basics/)
- [Part 4 — Ch.05 Document AI와 전처리](https://ai-contents-wine.vercel.app/04-data-enterprise/)

## 연관 entity

- [RAG](./rag.md) — 이 전처리가 RAG의 천장을 결정
- [Chunking](./chunking.md) — Document AI 결과를 청크로 쪼갬
- [Embedding Model](./embedding-model.md)
- [GraphRAG](./graphrag.md) — entity·relation 추출의 전처리
- [Unstructured Data](./rag.md) (rag.md에서 다룸)
- [Synthetic Data](./synthetic-data.md) — 문서 파싱 평가 데이터 생성

## 출처

- Unstructured.io, "State of Unstructured Data 2026".
- Informatica, "CLAIRE Doc AI Launch", 2025.
- IDC, "Worldwide Unstructured Data Forecast 2026".
- Databricks Blog, "ai_parse_document GA", 2025-11.
- Reducto Technical Report, 2026.
- LlamaIndex, "LlamaParse Premium Release", 2025.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
