# Raw Sources

Karpathy LLM Wiki 패턴의 **3계층 중 Layer 1**: "LLM이 읽지만 절대 수정하지 않는" 원본 자료 계층.

```
Layer 1  Raw Sources   ← 이 디렉토리 (immutable · read-only)
Layer 2  The Wiki      → wiki/entities/
Layer 3  Schema        → wiki/schema.md · /CLAUDE.md
```

## 무엇이 들어가나

**원본 바이너리는 저장하지 않는다.** 저작권·용량·검색성 문제 때문. 대신 각 raw source마다 **"메타 + 핵심 내용 요약" markdown 파일**을 기록한다.

목적:
- 재현성 — "Part X가 어느 자료를 기반으로 만들어졌는지" 추적 가능
- 휘발 방지 — WebSearch 결과가 세션 종료 후 사라지지 않게
- Lint 근거 — "원본과 entity 괴리"를 점검할 수 있는 기준점
- Ingest 투명성 — 어떤 지식이 언제 어디서 흘러들어왔나

## 서브 디렉토리

```
wiki/sources/
├── README.md     ← 지금 보는 파일
├── external/     ← OneDrive·로컬 드라이브·사내 자료 (PPTX·PDF·docx 등)
│                   실제 파일은 외부에 있음. 여기엔 메타만.
├── papers/       ← 논문 (arXiv, ACL, NeurIPS 등)
│                   제목·저자·연도·핵심 주장·인용 문구
└── web/          ← WebSearch 결과·블로그·gist·문서
                    URL·발행일·핵심 요약·인용문
```

## 파일 이름 규약

```
{YYYY-MM-DD}_{slug}.md
```

- 날짜: **ingest한 날짜** (원본 발행일이 아님)
- slug: 영문 소문자 + 하이픈, 간결하게

**예시:**
- `2026-04-12_karpathy-llm-wiki-gist.md`
- `2026-04-12_pwc-ai-literacy-day1.md`
- `2026-04-12_langchain-state-of-agent-engineering-2026.md`
- `2017_attention-is-all-you-need.md` (고전 논문은 연도만)

## 파일 템플릿

```markdown
---
title: {원본 제목}
author: {저자/기관}
date_original: {원본 발행일 YYYY-MM-DD, 없으면 N/A}
date_ingested: {ingest 날짜 YYYY-MM-DD}
source_type: {web / paper / pptx / pdf / docx / gist / other}
url_or_path: {URL 또는 로컬 경로}
used_for: {어느 Part/Ch에 활용되었나}
---

# {제목}

## Context
왜 이 자료를 수집했나, 어떤 Part 작성의 일환인가.

## Key Points
- 자료에서 추출한 **핵심 인사이트·통계·인용문 5~15개**
- 이 요약이 곧 재현성의 근거
- WebSearch 결과의 경우 원문 인용문 풍부하게

## Quotes (optional)
> "인상적인 문구"
> — 저자, 연도

## Entities created/updated
이 자료로부터 생성·갱신된 wiki entity 목록.
- [entity-name](../entities/entity-name.md)

## Chapters created/updated
이 자료가 활용된 실제 콘텐츠 위치.
- Part X Ch.YY — 제목
```

## Ingest 워크플로에서의 역할

Karpathy gist + 우리 확장:

1. **Sources 기록** ⭐ NEW — 이 디렉토리에 파일 생성 (원본 URL/경로 + 핵심 요약)
2. Ingest — wiki/entities/* 생성·갱신
3. Lint — 고아·죽은 링크·모순 점검
4. Query — 챕터 합성
5. Ingest-back — 새 콘텐츠를 sources의 `used_for`에 역기록

자세히는 `wiki/schema.md` 참조.

## 주의 사항

- **저작권:** PwC 사내 자료·비공개 문서는 요약만, 원문 장문 인용 금지. "Strictly Private and Confidential" 표기 자료는 핵심 개념·구조만 추출해 공개 wiki 수준으로 추상화.
- **휘발 방지:** WebSearch를 쓸 때마다 중요한 결과는 이 디렉토리에 기록. URL만 남겨두면 링크 로트(link rot)로 몇 달 후 사라짐.
- **바이너리 금지:** PPTX/PDF/DOCX 자체를 커밋하지 말 것. 외부 경로만 기록.
