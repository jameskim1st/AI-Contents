# Unstructured Data (비정형 데이터)

**Category:** 개념 / 데이터 유형
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

스키마가 고정되지 않은 데이터. 텍스트 문서, 이메일, PDF, 이미지, 음성, 비디오, 채팅 로그, 센서 스트림이 여기 속한다. **IDC·Gartner 공통 추산으로 엔터프라이즈 데이터의 약 80%**가 비정형이다. 과거에는 "저장만 해두고 못 써먹던 쓰레기"였으나, LLM과 Multimodal 모델의 등장으로 **돌연 가장 가치 있는 자산**이 됐다. Document AI·Vision AI·Speech AI의 원재료.

## 설명

### 정의

사전 정의된 스키마 없이 저장되는 데이터. 행·열 구조가 없거나, 있더라도 내부 내용 자체는 자유 형식.

**예시:**
- Word·PDF·한글(.hwp) 문서 — 계약서, 제안서, 규정
- 이미지 — 설계도, 제품 사진, 의료 영상, CCTV
- 음성 — 콜센터 녹취, 회의록
- 비디오 — 교육 영상, 제품 시연
- 자유 텍스트 — CRM 메모, 이메일, Slack 채팅, 고객 리뷰
- 로그 — 서버 로그, 애플리케이션 이벤트

### "80%" 통계의 출처

- **IDC (2011)**: "엔터프라이즈 데이터의 80%가 비정형".
- **Gartner (2019, 재확인 2024)**: "80~90%".
- **MIT Sloan (2024)**: 실제 기업 감사 결과 평균 **83%**.

이 80%는 지난 15년간 거의 사용되지 않았다. 이유:
- 검색이 안 됨 (Ctrl+F 수준)
- 분류가 안 됨
- 의미 추출에 사람 손이 필요

### AI 시대의 폭발

2022년 이후 LLM·Multimodal 모델로 **비정형 → 정형 변환**이 가능해졌다:

| 입력 (비정형) | 모델 | 출력 (정형) |
|---|---|---|
| PDF 계약서 | Claude 4.6, GPT-4o | 조항 JSON |
| 콜센터 녹취 | Whisper, Gemini | 요약·감정·의도 |
| 의료 영상 | Gemini Vision, Med-PaLM | 진단 코드 |
| 이메일 스레드 | LLM | 요청 티켓 |

이게 [Document AI](./document-ai.md)·RAG·[Augmented LLM](./augmented-llm.md)의 본질이다.

### 대표 도구·제품 (2026)

- **Document AI**: Google Document AI, Amazon Textract, Azure AI Document Intelligence, Upstage Document Parse
- **Vector DB**: Pinecone, Weaviate, Qdrant, Chroma — 임베딩 저장·검색
- **Data Lake**: S3, Azure Data Lake Storage, Databricks Delta Lake — 원본 저장
- **Multimodal 파이프라인**: LlamaIndex, Unstructured.io

### 엔터프라이즈 함의

2026년 기준, 기업 AI 전략의 승부처는 "**80% 비정형 데이터를 얼마나 잘 RAG/에이전트에 연결하느냐**"로 옮겨갔다. LLM 선택보다 중요한 건:
1. 어디에 흩어져 있나 (SharePoint, NAS, Confluence, Notion, Slack...)
2. 어떻게 파싱·청킹·임베딩하나
3. 어떻게 권한·PII를 거르나

## 강의 어디에 나오나

- [Part 1 — Ch.02 정형 vs 비정형 vs 반정형](../../src/content/data-basics.html)
- [Part 1 — Ch.03 왜 비정형 데이터가 AI의 핵심인가](../../src/content/data-basics.html)
- [Part 4 — Ch.05 엔터프라이즈 문서 AI](../../src/content/data-enterprise.html)

## 연관 entity

- [Structured Data](./structured-data.md) — 반대 개념, 20%의 비중
- [Semi-Structured Data](./semi-structured-data.md) — 중간 형태
- [DIKW Pyramid](./dikw-pyramid.md) — Data → Information 변환의 대상
- [Augmented LLM](./augmented-llm.md) — RAG로 비정형 데이터 활용

## 출처

- IDC "Digital Universe" Study (2011, 2014 업데이트).
- Gartner "Unstructured Data Strategy" (2024).
- MIT Sloan "State of AI in Business 2025".
- Upstage "Document AI Benchmark 2026".

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
