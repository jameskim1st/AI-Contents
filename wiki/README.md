# AI Contents Wiki

이 디렉토리는 [Andrej Karpathy의 LLM Wiki 패턴](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)을 적용한 살아있는 지식 저장소입니다.

## 무엇인가

`src/content/*.html` (강의 자료)는 **선형적으로 읽는 강의** 입니다.
이 `wiki/`는 **비선형으로 조회·누적되는 지식층** 입니다.

**3계층 구조:**
1. **Raw sources** — `src/content/*.html`, 외부 PPT/PDF (절대 수정 X)
2. **Wiki** — 이 디렉토리. LLM이 유지하는 markdown 페이지들
3. **Schema** — [`schema.md`](./schema.md) — 위키 운영 규칙

## 어떻게 쓰나

### 사람이 하는 것
- 새 자료(논문, 블로그, 강의 추가)를 `src/content/`나 외부에 올린다
- Claude Code에 `Ingest [파일경로]` 명령을 던진다
- 주기적으로 `Lint` 명령으로 모순/누락 점검

### LLM이 하는 것
- 새 자료를 읽고 관련 entity 페이지 갱신
- [`log.md`](./log.md)에 작업 기록 추가
- [`index.md`](./index.md)에 신규 entity 등록
- 상호 참조 링크 자동 유지

## 메타 — 이 사이트 자체가 예시

이 위키는 PwC AI 교육 사이트(`/03-vibe-master/` Ch.09 "LLM Wiki")의 **살아있는 데모** 입니다. 강의에서 설명하는 패턴을 사이트가 직접 적용해서 자라고 있습니다.

> "강의를 만든다" → "LLM Wiki로 강의를 키운다"

자세한 운영 규칙은 [`schema.md`](./schema.md)를 보세요.

## 디렉토리 구조

```
wiki/
├── README.md       ← 지금 보는 파일
├── schema.md       ← 운영 규칙 (LLM이 따르는 것)
├── index.md        ← 카테고리별 entity 카탈로그
├── log.md          ← 시간순 작업 기록 (append-only)
└── entities/       ← entity 페이지들
    ├── llm-wiki.md
    ├── transformer.md
    ├── claude-md.md
    └── ...
```
