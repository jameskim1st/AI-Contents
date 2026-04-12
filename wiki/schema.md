# Wiki Schema

이 문서는 `wiki/` 디렉토리를 유지하는 LLM(Claude Code 등)이 따라야 할 운영 규칙입니다.
Karpathy의 LLM Wiki gist를 우리 프로젝트(AI 교육 콘텐츠)에 맞게 구체화한 것입니다.

`CLAUDE.md`가 "프로젝트 작업 규칙"이라면, 이 문서는 "지식 유지 규칙"입니다.

---

## 1. 디렉토리 규칙

- `wiki/README.md` — 사람이 읽는 소개. LLM은 수정 금지.
- `wiki/schema.md` — 이 파일. 사람이 명시적으로 갱신.
- `wiki/index.md` — 카테고리별 entity 목록. **매 ingest마다 갱신**.
- `wiki/log.md` — 시간순 작업 기록. **append-only**. 절대 기존 라인 수정·삭제 금지.
- `wiki/entities/*.md` — 개별 entity 페이지.

---

## 2. Entity 페이지 형식

모든 entity 파일은 다음 구조를 따른다:

```markdown
# {Entity Name}

**Category:** {모델 / 패턴 / 도구 / 개념 / 인물}
**Status:** {stable / draft / contested}
**Last updated:** {YYYY-MM-DD}

## TL;DR
한 문단 요약 (3~5줄).

## 설명
본문. 필요한 만큼 길게 써도 되지만, 다른 entity와 겹치는 내용은
링크로 위임한다 (`[Transformer](./transformer.md)` 형식).

## Reference
- [Part X — Ch.YY 챕터제목](https://ai-contents-wine.vercel.app/0X-{slug}/#anchor)

(배포된 Vercel URL을 사용. 사이트가 GitHub에 호스팅되어 wiki 파일도 GitHub에서 렌더링되므로, 콘텐츠 링크는 배포 사이트로 보내야 작동한다. `Part X` 숫자는 URL slug의 prefix 숫자와 반드시 일치시킬 것.)

## 연관 entity
- [{name}](./{name}.md) — 한 줄 관계 설명

## 출처
- 원본 자료 링크
- 인용된 논문/블로그/gist

## 업데이트 이력
- YYYY-MM-DD — 무엇이 변경되었나 (한 줄)
```

---

## 3. Ingest 워크플로

새 자료(`SOURCE`)가 들어왔을 때 LLM이 수행하는 절차:

0. **Record Source** ⭐ — `wiki/sources/{web|papers|external}/{YYYY-MM-DD}_{slug}.md` 파일을 먼저 생성한다. 원본의 URL·발행일·저자·핵심 내용 요약·인용문을 기록. **이게 Raw Sources 계층이다** — 원본이 외부에 있거나 휘발성이라도, 추후 재현성과 lint의 근거가 됨. 자세히는 `wiki/sources/README.md` 참조.
1. **Read** — `SOURCE` 전체를 읽는다.
2. **Extract** — 등장하는 entity 후보를 모두 뽑는다 (인물·모델·패턴·도구·개념·논문).
3. **Match** — `wiki/entities/`를 확인하여 기존 entity와 매칭한다.
4. **Update** — 매칭된 entity는 `## 업데이트 이력`에 한 줄 추가하고 본문을 보강한다.
5. **Create** — 매칭되지 않은 새 entity는 `entities/{slug}.md`로 생성.
6. **Index** — `index.md`에 신규 entity를 카테고리별로 등록.
7. **Log** — `log.md`에 ingest 한 줄 기록 (`[YYYY-MM-DD ingest] {SOURCE} → {N}개 페이지 갱신, {M}개 신규`).

**중요:** 1회 ingest로 갱신되는 entity는 **최대 15개** 로 제한. 그 이상이면 자료를 분할해야 한다.

### Sources 파일 형식

`wiki/sources/*/*.md`는 다음 frontmatter를 갖는다:

```markdown
---
title: {원본 제목}
author: {저자/기관}
date_original: {원본 발행일 YYYY-MM-DD 또는 N/A}
date_ingested: {ingest 날짜 YYYY-MM-DD}
source_type: {web / paper / pptx / pdf / docx / gist / other}
url_or_path: {URL 또는 로컬 경로}
used_for: {어느 Part/Ch에 활용되었나}
---
```

본문에는 **Context · Key Points · Quotes · Entities created/updated · Chapters created/updated** 섹션을 포함한다. 자세한 템플릿은 `wiki/sources/README.md` 참조.

**저작권:** 비공개·사내 자료는 요약만 기록. "Strictly Private and Confidential" 표기 자료는 핵심 개념·구조만 추상화. 원본 바이너리(PPTX/PDF/DOCX)는 repo에 커밋하지 않는다 — 메타데이터만.

---

## 4. Query 워크플로

사용자가 위키에 질문할 때:

1. `index.md`에서 관련 카테고리 먼저 훑는다.
2. 후보 entity 페이지 2~5개를 읽는다.
3. 답변을 합성한다.
4. **답변이 새 통찰을 만들었다면**, 관련 entity의 `## 업데이트 이력`에 한 줄 추가한다.
5. 매번 새로 만들지 말고, **이미 누적된 위키를 활용** 한다 (이게 RAG와의 차이).

---

## 5. Lint 워크플로 (주기적 점검)

- **고아 페이지** — `index.md`에 등록되지 않은 entity 파일?
- **죽은 링크** — 다른 entity로의 링크가 깨졌나?
- **모순** — 같은 사실에 대해 entity 페이지마다 다른 설명을 하고 있나?
- **고립 entity** — `## 연관 entity`가 비어있는 페이지?
- **stale** — 6개월 이상 갱신 없는 entity는 `Status: stale` 표시.

발견된 문제는 `log.md`에 `[YYYY-MM-DD lint] {요약}`으로 기록.

---

## 6. 사람의 책임

LLM이 자동으로 못 하거나 해서는 안 되는 것:

- 새 카테고리 신설 (사람이 결정)
- 모순 해결 (사람이 어느 쪽이 맞는지 판단)
- entity 삭제 (사람이 명시적으로 승인)
- 외부 출처의 신뢰도 평가 (사람이 검증)

LLM은 **수집·연결·정리** 만 한다. **판단과 삭제** 는 사람이 한다.

---

## 7. 카테고리 (현재)

- **모델** — Transformer, GPT-4, Claude 4.6, Gemini 2.5 등
- **아키텍처 / 패턴** — MoE, RAG, LLM Wiki, Plan-Critic-Build, ReAct 등
- **도구** — Claude Code, Cursor, Aider, Copilot Studio 등
- **개념** — Self-Attention, Logit, Temperature, Memory, Tools, Planning 등
- **인물** — Andrej Karpathy, Simon Willison 등
- **방법론** — TDD, SDD, Harness Engineering, Vibe Coding 등

새 카테고리 추가는 사람이 명시적으로 승인.

---

## 참고

- Karpathy의 원본 LLM Wiki gist: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- 우리 사이트의 챕터: `src/content/vibe-master.html` Ch.09 "LLM Wiki"
