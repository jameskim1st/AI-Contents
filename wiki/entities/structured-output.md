# Structured Output

**Category:** 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

LLM이 자유 텍스트 대신 **JSON, enum, 특정 schema에 맞는 검증 가능한 형식**으로 출력을 생성하는 기능. 2024년 8월 OpenAI가 Structured Outputs를 공식 도입하면서 함수 호출(function calling)의 **schema 준수율을 100%**로 끌어올렸다. Anthropic은 tool_use를, Google은 Gemini의 JSON mode를 제공한다. 에이전트가 외부 시스템과 안정적으로 상호작용하려면 출력이 기계가 파싱할 수 있는 형식이어야 하므로, structured output은 **에이전트 안정성의 기반**이다.

## 설명

### 문제 — LLM 출력의 불확실성

LLM은 본질적으로 자유 텍스트 생성기다. "사용자의 이름과 나이를 JSON으로 출력해줘"라고 요청해도:

```
가끔 이렇게 나옴:    { "name": "홍길동", "age": 30 }
가끔 이렇게 나옴:    ```json\n{"name": "홍길동", "age": "30"}\n```
가끔 이렇게 나옴:    네, 여기 결과입니다: {"name": "홍길동", "age": 30}
가끔 이렇게 나옴:    {"이름": "홍길동", "나이": 30}
```

키 이름, 타입, 래핑 텍스트가 일관되지 않으면 다운스트림 코드가 파싱에 실패한다. 에이전트가 도구를 호출할 때 파라미터 형식이 틀리면 도구 실행 자체가 불가능하다.

### Constrained Decoding 원리

Structured output의 핵심 기술은 **constrained decoding**(제약 디코딩)이다:

1. 개발자가 JSON Schema를 정의하여 API에 전달
2. 모델이 토큰을 생성할 때, 다음 토큰 후보 중 **schema를 위반하는 토큰의 확률을 0으로 마스킹**
3. 남은 후보 중에서만 샘플링

예를 들어, schema에 `"age": integer`로 정의되어 있으면 `"age":` 다음에 문자열 따옴표(`"`)가 나올 확률은 0으로 강제된다. 이를 통해 **100% schema 준수**가 보장된다.

### OpenAI Structured Outputs (2024년 8월)

OpenAI가 업계 최초로 공식 도입한 방식:

```python
from openai import OpenAI
from pydantic import BaseModel

class UserInfo(BaseModel):
    name: str
    age: int
    email: str | None = None

client = OpenAI()
response = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[{"role": "user", "content": "홍길동, 30세 정보를 정리해줘"}],
    response_format=UserInfo
)

user = response.choices[0].message.parsed
# UserInfo(name='홍길동', age=30, email=None) ← 타입 보장
```

특징:
- **Pydantic 모델을 직접 전달** → SDK가 자동으로 JSON Schema 변환
- **100% schema 준수율** — 구조 오류 zero
- Function calling에도 `strict: true` 옵션으로 적용 가능
- 지원 타입: string, number, integer, boolean, array, object, enum, anyOf

### Anthropic tool_use

Anthropic은 Claude의 tool_use(도구 사용) 기능을 통해 structured output을 구현한다:

```python
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    tools=[{
        "name": "extract_user_info",
        "description": "사용자 정보를 추출합니다",
        "input_schema": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "age": {"type": "integer"}
            },
            "required": ["name", "age"]
        }
    }],
    tool_choice={"type": "tool", "name": "extract_user_info"},
    messages=[{"role": "user", "content": "홍길동, 30세"}]
)
```

- `tool_choice`로 특정 도구를 강제하여 structured output 확보
- JSON Schema 기반 input_schema 정의

### Google Gemini

- **JSON mode**: `response_mime_type="application/json"` + `response_schema` 지정
- Gemini 1.5 Pro/Flash에서 지원
- enum 타입 직접 지원으로 분류 태스크에 강점

### 에이전트 안정성의 기반

Structured output이 에이전트 아키텍처에서 결정적인 이유:

1. **도구 호출 신뢰도**: [MCP](./mcp.md) 프로토콜을 통해 에이전트가 외부 도구를 호출할 때, 파라미터가 정확한 형식이어야 함. Structured output 없이는 파싱 실패 → 도구 실행 불가 → 에이전트 중단
2. **멀티 에이전트 통신**: [다중 에이전트](./multi-agent.md) 시스템에서 에이전트 간 메시지 형식이 일관되어야 협업 가능
3. **오류 전파 차단**: 한 단계의 출력 오류가 다음 단계로 전파되는 것을 schema 검증으로 차단
4. **재시도 비용 절감**: 형식 오류로 인한 재시도가 사라지므로 비용과 지연 감소

### "Hallucination을 구조로 억제"

Structured output의 철학적 의미:

> **"LLM이 무엇을 말할지는 제어할 수 없지만, 어떤 형식으로 말할지는 100% 제어할 수 있다."**

내용의 hallucination(환각)은 여전히 가능하지만, **형식의 hallucination은 완전히 제거**된다. 이는 LLM을 소프트웨어 시스템의 구성 요소로 안정적으로 통합하기 위한 핵심 전제 조건이다:

- `"age": 30` → 숫자 30이 사실인지는 모르지만, 적어도 integer 타입은 보장
- 도구 호출 파라미터가 schema를 따르는 것은 보장 → 실행 자체는 항상 가능

### Schema Validation 라이브러리와의 결합

실무에서는 LLM 출력을 schema validation 라이브러리로 검증하는 파이프라인이 표준이다:

| 언어 | 라이브러리 | 역할 |
|---|---|---|
| Python | **Pydantic** | JSON Schema 생성 + 타입 검증 + 파싱 |
| TypeScript | **Zod** | 런타임 타입 검증 + TypeScript 타입 추론 |
| Python | **Instructor** | Pydantic + LLM API를 연결하는 래퍼 (자동 재시도 포함) |
| TypeScript | **AI SDK (Vercel)** | Zod schema → LLM structured output 자동 변환 |

```python
# Instructor 예시 — 자동 재시도 포함
import instructor
from openai import OpenAI

client = instructor.from_openai(OpenAI())

user = client.chat.completions.create(
    model="gpt-4o",
    response_model=UserInfo,
    messages=[{"role": "user", "content": "홍길동, 30세"}],
    max_retries=3  # schema 불일치 시 자동 재시도
)
```

### 한계

- **지연 증가**: constrained decoding이 약간의 추가 지연 발생
- **복잡한 schema의 한계**: 재귀적 구조, 조건부 필드 등 일부 고급 JSON Schema 패턴은 미지원
- **창의성 제약**: 자유 텍스트 영역에서도 schema가 표현의 다양성을 제한할 수 있음
- **내용 정확성은 별개**: 형식이 완벽해도 내용이 틀릴 수 있음 — hallucination 문제는 그대로

## Reference

- [Part 2 — Ch.06 문장 생성 원리](https://ai-contents-wine.vercel.app/02-llm/#llm-ch6)

## 연관 entity

- [MCP](./mcp.md) — 도구 호출 시 structured output으로 파라미터 전달
- [Agent Frameworks](./agent-frameworks.md) — 에이전트 안정성의 기반 기술
- [Augmented LLM](./augmented-llm.md) — LLM + 도구 연동의 핵심 인터페이스

## 출처

- OpenAI "Introducing Structured Outputs in the API" (2024.08)
- Anthropic "Tool use (function calling)" documentation
- Google "Gemini API: Generate structured output" documentation
- Instructor library documentation (https://python.useinstructor.com)

## 업데이트 이력

- 2026-04-12 — 신규 생성.
