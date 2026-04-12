# Tokenization

**Category:** 기본 개념 / LLM
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

LLM이 텍스트를 처리하는 **최소 입력 단위**로 쪼개는 과정. "Hello world"가 그대로 들어가는 게 아니라 `["Hello", " world"]` 같은 토큰 시퀀스로 변환된다. 주요 알고리즘은 **BPE(Byte Pair Encoding), WordPiece, SentencePiece, Unigram** — GPT 계열은 BPE 변형(GPT-4의 **cl100k_base**, GPT-4o의 **o200k_base**)을 쓴다. **한국어 토큰 비효율 문제**: 영어 1 단어가 1~2 토큰이라면 한국어는 2~3 토큰이 되기 쉬워 **입력 비용이 2~3배**. OpenAI의 **tiktoken** 라이브러리가 사실상 표준 측정 도구. [Embedding Model](./embedding-model.md)과 혼동되곤 하는데 **Tokenization이 앞 단계**(텍스트 → 정수 ID), Embedding이 뒷 단계(ID → 벡터)다.

## 설명

### 왜 토큰화가 필요한가

컴퓨터는 텍스트를 숫자로만 다룬다. 가장 단순한 방법은:
1. **글자 단위(character)** — 어휘는 작지만 시퀀스가 길어 비효율.
2. **단어 단위(word)** — 어휘 폭발 + OOV(Out-of-Vocabulary) 문제.
3. **서브워드(subword)** — 현대 LLM의 답. 자주 나오는 단위는 통째로, 드문 것은 쪼개기.

### 주요 알고리즘

**1. BPE (Byte Pair Encoding)** — 1994년 데이터 압축 알고리즘이 NLP에 이식된 것.
- 시작: 모든 글자를 독립 토큰.
- 반복: 가장 자주 연속해 나오는 쌍을 합쳐 새 토큰.
- GPT-2, GPT-3, GPT-4, Llama, Mistral 모두 BPE 계열.

**2. WordPiece** — Google BERT. BPE와 유사하나 likelihood 기반 병합.

**3. SentencePiece** — Google 오픈소스, 언어 독립적. 공백을 `▁`로 처리해 한국어·일본어·중국어에도 적용 쉬움. T5, mT5, Llama 3 일부에서 사용.

**4. Unigram** — 확률적 접근. SentencePiece의 옵션.

### GPT 계열 토크나이저 진화

| 토크나이저 | 어휘 크기 | 사용 모델 | 연도 |
|---|---|---|---|
| `gpt2` | 50,257 | GPT-2, GPT-3 | 2019 |
| `p50k_base` | 50,281 | Codex, text-davinci-002 | 2022 |
| **`cl100k_base`** | **100,277** | **GPT-4, GPT-3.5-turbo, text-embedding-3** | 2023 |
| **`o200k_base`** | **200,019** | **GPT-4o, GPT-4.5, o1 계열** | 2024 |

**o200k_base는 한국어·일본어·중국어 효율을 크게 개선**했다. 어휘를 두 배로 늘리면서 CJK 전용 토큰을 대폭 추가.

### 한국어 토큰 비효율 문제 (실제 측정)

"안녕하세요, 오늘 날씨가 좋네요" — 13 글자.

| 토크나이저 | 토큰 수 |
|---|---|
| `cl100k_base` (GPT-4) | 17 토큰 |
| `o200k_base` (GPT-4o) | 10 토큰 |
| Llama 2 | 29 토큰 |
| Llama 3 | 14 토큰 |

비교: 영어 "Hello, the weather is nice today" (31글자)는 `cl100k_base`로 **8 토큰**.

**결과**: 같은 내용을 한국어로 처리하면 **비용이 2~3배**, 컨텍스트 한도도 더 빨리 찬다. 2026년 Upstage·Kakao·LG AI Research는 자체 토크나이저로 한국어 효율을 영어 수준으로 맞춰 **Solar·KoLlama** 계열을 차별화했다.

### Tokenization의 악명 높은 함정

**1. Leading space의 중요성** — `"hello"`와 `" hello"`는 다른 토큰. 프롬프트 엔지니어링 시 무심코 공백을 빼면 결과가 달라진다.

**2. Glitch tokens** — 학습 데이터 특성상 거의 안 쓰였지만 어휘에 포함된 토큰들. GPT에서 `" SolidGoldMagikarp"` 같은 토큰이 입력되면 모델이 이상하게 반응하는 현상이 2023년 보고됨 (Rumbelow & Watkins).

**3. 숫자 처리** — `"1234"`가 `["123", "4"]`로 쪼개지기도. 자릿수 처리에서 수학 성능 저하 원인. Llama 3은 숫자를 각 자리 단위로 강제 분리해 개선.

**4. 코드 토큰화** — 들여쓰기(4 스페이스)가 단일 토큰으로 인코딩 → 코드 전용 모델은 공백 효율이 훨씬 좋다.

### tiktoken 라이브러리

OpenAI가 공개한 공식 파이썬 라이브러리. 2026년 LLM 비용 계산의 de facto 도구.

```python
import tiktoken
enc = tiktoken.encoding_for_model("gpt-4o")
tokens = enc.encode("안녕하세요")
print(len(tokens))  # 비용 ≈ token 수 × $0.xx
```

다른 표준 라이브러리:
- **SentencePiece** (Google) — Llama, T5 등.
- **Hugging Face Tokenizers** (Rust 기반, 빠름) — 모든 HF 모델.
- **transformers.AutoTokenizer** — Python 편의 API.

### Tokenization vs Embedding

혼동 금지. 파이프라인은:
```
"안녕" → [토큰화] → [234, 12345] → [임베딩] → [[0.12, -0.5, ...], [0.3, 0.8, ...]]
         tokenization            embedding (벡터화)
```

- **Tokenization**: 텍스트 → 정수 ID (사전 기반, 학습 없음 혹은 BPE 학습).
- **Embedding**: 정수 ID → 고차원 벡터 (학습된 임베딩 층).

[Embedding Model](./embedding-model.md)이 고차원 벡터를 다루는 반면 tokenization은 **어휘 인덱스**만 다룬다.

### 2026 트렌드

- **o200k_base** 도입으로 CJK 언어 비용 격차 감소.
- **Byte-level 토큰화** 연구 부활 — Meta BLT, Google MegaByte.
- **Vision-language 모델**은 이미지 패치도 "토큰"으로 통합 (ViT-style).
- 한국 연구자들은 **한국어 토큰 효율 벤치마크** (KoEffi) 발표, 모델 선택의 지표로 자리잡음.

## Reference

- [Part 2 — Ch.04 토큰과 임베딩](https://ai-contents-wine.vercel.app/02-llm/#llm-ch4)
- [Part 8 — Ch.03 LLM의 기본 단위](https://ai-contents-wine.vercel.app/08-data-basics/)
- [Part 9 — Ch.04 한국어 LLM 비용 구조](https://ai-contents-wine.vercel.app/09-data-enterprise/)

## 연관 entity

- [Embedding Model](./embedding-model.md) — 토큰화 이후 단계
- [Pre-training Data](./pre-training-data.md) — 토크나이저 학습의 기반
- [RAG](./rag.md) — 컨텍스트 토큰 한도 관리
- [Chunking](./chunking.md) — 토큰 기준으로 chunk 크기 결정

## 출처

- Sennrich et al., "Neural Machine Translation of Rare Words with Subword Units" (BPE for NMT), 2016.
- Kudo & Richardson, "SentencePiece: A simple and language independent subword tokenizer", EMNLP 2018.
- OpenAI tiktoken repository, 2023~2026.
- Rumbelow & Watkins, "SolidGoldMagikarp (plus, prompt generation)", LessWrong, 2023.
- Pagnoni et al., "Byte Latent Transformer", Meta, 2024.

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
