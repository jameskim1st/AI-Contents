# CLAUDE.md — AI Contents 사이트 작성 규칙

Claude Code가 본 프로젝트에서 콘텐츠를 작성·편집할 때 따라야 할 규칙입니다.
**메타:** 이 파일 자체가 Part 6 Ch.05 "Harness Engineering"과 Ch.09 "LLM Wiki"에서
가르치는 패턴의 살아있는 적용입니다.

---

## 1. 프로젝트 개요

- **무엇:** AI 지식 콘텐츠 사이트 (강의가 아닌 비선형 학습 자료 모음)
- **스택:** Astro 정적 생성 + GitHub + Vercel 자동 배포
- **배포 URL:** https://ai-contents-wine.vercel.app/
- **GitHub:** https://github.com/jameskim1st/AI-Contents
- **9 Part 구조:**

| Part | URL | 색상 | 주제 |
|---|---|---|---|
| 0 | `/00-ai-ml-basics` | **pink** | AI & ML 기초 (LLM 이전의 모든 것) |
| 1 | `/01-llm` | violet | LLM 이해 |
| 2 | `/02-data-basics` | amber | Data 기초 |
| 3 | `/03-ai-agents` | teal | AI Agents 기초 |
| 4 | `/04-ai-agents-advanced` | violet | AI Agents 실전 |
| 5 | `/05-data-enterprise` | amber | Data 실전 |
| 6 | `/06-vibe-basic` | accent (orange) | 바이브코딩 입문 |
| 7 | `/07-vibe-master` | accent (orange) | 바이브코딩 심화 |
| 8 | `/08-power-platform` | blue | Power Platform |

---

## 2. 콘텐츠 작성 규칙

### 인용·인물 ⭐
**본문에 사람 이름이 등장할 때는 반드시 짧은 한 줄 소개(역할·소속·대표작)를 함께 적는다.**

- ✓ Good: `— Simon Willison, 2025 (Django 공동 창시자, Datasette 메이커, AI 코딩 분야의 가장 영향력 있는 1인 블로거)`
- ✗ Bad: `— Simon Willison, 2025`

예외:
- 같은 챕터에서 이미 충분히 맥락이 명시된 경우는 생략 가능
- 인물 자체가 그 챕터의 중심 주제인 경우 (이미 본문에서 다룸) 생략 가능

### 언어·표현
- **"강의" 사용 금지** — 사이트는 강의가 아니라 콘텐츠 사이트
  - "이 강의" → "이 콘텐츠" / "이 사이트"
  - "강의 자료" → "학습 자료"
  - "강의 챕터" → "챕터"
- 한국어, 간결, **구체적 숫자·제품·사례** 포함
- 연도·통계·인용은 가능한 출처 함께

### 시각 요소
- 모든 챕터는 풍부한 시각 요소 사용 (다이어그램, 비교표, 카드 그리드, UI 목업)
- 큰 개념을 다룰 때는 **통합 투어 패턴**:
  `개념 설명 + 미니 다이어그램 + 적합/한계 + 대표 제품 + UI 투어`
- `.reveal` 클래스로 스크롤 애니메이션 적용
- 큰 블록을 만들 때는 `.reveal` 애니메이션의 IntersectionObserver fail-safe가 이미 처리됨 (Layout.astro)

### Part별 색상 변수 (절대 섞지 말 것)
- Part 0 (AI/ML 기초): `var(--pink)` / `--pink-bg` / `--pink-border`
- Part 1 (LLM): `var(--violet)` / `--violet-bg` / `--violet-border` / `--violet-dim`
- Part 2·5 (Data): `var(--amber)` / `--amber-bg` / `--amber-border`
- Part 3 (AI Agents 기초): `var(--teal)` / `--teal-bg` / `--teal-border`
- Part 4 (AI Agents 실전): `var(--violet)` 계열
- Part 6·7 (Vibe): `var(--accent)` / `--accent-bg` / `--accent-border`
- Part 8 (Power Platform): `var(--blue)` / `--blue-bg` / `--blue-border`

---

## 3. Wiki 운영 규칙

`wiki/schema.md`가 본진. 핵심 요약:

- **Reference 섹션 필수** — 헤더는 `## Reference` (구 `## 강의 어디에 나오나` 금지)
- **링크는 Vercel 배포 URL** 사용:
  ```
  ✓ https://ai-contents-wine.vercel.app/01-data-basics/#anchor
  ✗ ../../src/content/data-basics.html#anchor   (GitHub에서 깨짐)
  ```
- **Part 번호 == URL slug prefix** — label의 "Part X"와 URL의 `0X-`는 항상 일치
- **외부 링크는 `target="_blank" rel="noopener"`**
- 새 entity 만들면 `wiki/index.md`에 등록 + `wiki/log.md`에 한 줄 추가

### Wiki 디렉토리는 Astro가 서빙하지 않음
- `wiki/` 폴더는 GitHub에서만 직접 노출 (markdown 자동 렌더링)
- 콘텐츠 HTML에서 wiki entity를 참조할 때는 GitHub URL:
  ```
  https://github.com/jameskim1st/AI-Contents/blob/main/wiki/entities/{slug}.md
  ```

---

## 4. 코드 스타일

- HTML 콘텐츠는 inline style 사용 (Astro가 inline-import이므로)
- 색상은 반드시 `var(--xxx)` CSS 변수 (직접 hex 코드 금지, SVG 안에서만 예외)
- 코드 블록 / 다이어그램 안에서 emoji 자유롭게 사용
- 한국어 본문 + 영어 키워드 / 제품명 혼용 OK

---

## 5. 빌드·배포

```bash
npm run build           # 빌드 검증
git add -A && git commit -m "..."
git push                # main 푸시 → Vercel 자동 배포
```

- 빌드 실패하면 절대 푸시하지 말 것
- 9페이지 모두 정상 생성 확인 (Overview + 8 parts)

---

## 6. LLM Wiki 패턴 (5단계 워크플로)

큰 새 콘텐츠 작성 시:

1. **Sources** — WebSearch / 외부 자료 수집 (사람이 큐레이션)
2. **Ingest** — 자료를 wiki entity로 변환 (`wiki/entities/*.md` 생성/갱신)
3. **Lint** — 고아 페이지 / 죽은 링크 / 모순 점검
4. **Query** — 챕터를 wiki에서 합성 (HTML 콘텐츠 작성)
5. **Ingest-back** — 새 챕터를 raw source로 등록, log.md 기록

자세히는 `wiki/schema.md`와 [Part 6 Ch.09 LLM Wiki](https://ai-contents-wine.vercel.app/06-vibe-master/#vm-ch9).

---

## 참고

- **Karpathy LLM Wiki gist:** https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- **본 사이트가 LLM Wiki를 직접 운영하는 살아있는 데모:** [Part 6 Ch.09](https://ai-contents-wine.vercel.app/06-vibe-master/#vm-ch9)
