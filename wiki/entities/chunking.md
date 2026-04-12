# Chunking

**Category:** 개념 / 패턴
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

문서를 검색 가능한 작은 조각(chunk)으로 분할하는 작업. [RAG](./rag.md) 파이프라인의 첫 단계이자 **실패의 80%가 발생하는 지점**. 2026년 기본값은 **Recursive Character 256~512 토큰 + 10~25% overlap**이지만, 진짜 답은 "도메인마다 다르다". Prem AI 벤치마크(2026)에 따르면 chunking 전략만 바꿔도 Recall@10이 15~40% 출렁인다.

## 설명

### 왜 중요한가

청크가 너무 크면:
- 임베딩 벡터가 여러 주제를 섞어 검색 정확도 하락.
- Context window 낭비, LLM의 "lost in the middle" 현상 유발.

청크가 너무 작으면:
- 맥락 부족 → LLM이 엉뚱하게 답변.
- Chunk 개수 폭증 → 검색 비용 증가.

### 주요 전략 (2026)

| 전략 | 방식 | 언제 쓰나 |
|---|---|---|
| **Fixed-size** | N 토큰마다 자름 | 빠르고 싸다. 품질은 최저 |
| **Recursive Character** | 문단 → 문장 → 단어 순으로 계층적 분할 | 2026 기본값. LangChain의 `RecursiveCharacterTextSplitter` |
| **Semantic** | 임베딩 유사도가 급변하는 지점에서 분할 | 고품질, 비용 높음 (LlamaIndex SemanticSplitter) |
| **Page-level / Layout-aware** | PDF 페이지·섹션 단위 | 법률·재무 문서 |
| **Proposition-based** | LLM이 "명제" 단위로 분해 | 학술 논문, QA 데이터셋 구축 |
| **Agentic chunking** | LLM이 청크 경계와 메타데이터를 결정 | 2026 신규 트렌드, 비싸지만 최고 품질 |

### 2026 기본값 (Prem AI & LangChain 권장)

- **Recursive Character**
- **chunk_size: 256~512 토큰** (임베딩 모델의 컨텍스트에 맞춤)
- **overlap: 10~25%** (경계 손실 방지)
- **separators: ["\n\n", "\n", ". ", " "]**

도메인별 조정:
- **코드** — 함수/클래스 단위 (tree-sitter).
- **법률** — 조·항 단위 + 페이지 메타데이터.
- **재무** — 표는 별도 추출 후 [Document AI](./document-ai.md).
- **대화 로그** — 턴 단위.

### Parent-Child 패턴

검색은 작은 child chunk로 하되, LLM에는 그것을 포함한 큰 parent chunk를 넘김. 2026년 엔터프라이즈 RAG의 **표준 레시피**.

### 흔한 실수

- 표(table)를 텍스트로 밀어넣기 → 의미 완전 파괴.
- 헤더·푸터·페이지 번호를 청크에 포함.
- PDF OCR 결과를 그대로 split → `ﬁ` 같은 ligature·줄바꿈 오염.
- 언어 무시 (한·중·일은 공백 기반 splitter가 실패).

## Reference

- [Part 8 — Ch.04 데이터의 두 세계](https://ai-contents-wine.vercel.app/08-data-basics/)
- [Part 9 — Ch.06 엔터프라이즈 RAG 설계](https://ai-contents-wine.vercel.app/09-data-enterprise/)

## 연관 entity

- [RAG](./rag.md) — 이 단계의 품질이 파이프라인 전체를 결정
- [Embedding Model](./embedding-model.md) — chunk_size는 임베딩 모델 컨텍스트에 맞춰야 함
- [Document AI](./document-ai.md) — 청킹 전 전처리
- [Hybrid Search](./hybrid-search.md)
- [RAGAS](./ragas.md) — chunking 품질을 Context Precision으로 측정

## 출처

- Prem AI, "Chunking Strategies Benchmark 2026".
- LangChain Docs, "Text Splitters", 2026.
- LlamaIndex, "Advanced Chunking Patterns", 2026.
- Unstructured.io, "State of Unstructured Data 2026".

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
