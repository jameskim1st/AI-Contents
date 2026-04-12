# Semi-Structured Data (반정형 데이터)

**Category:** 개념 / 데이터 유형
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

스키마가 고정되지 않았으나 태그·키로 내부 구조를 가지는 데이터. **JSON, XML, YAML, HTML, Protocol Buffers**가 대표. RDBMS의 엄격함과 비정형의 자유로움 사이에 있다. 웹 API의 사실상 표준(JSON)이자 NoSQL DB(MongoDB, DynamoDB)의 저장 단위. AI 시대에는 LLM 출력의 표준 포맷(JSON mode, Structured Output)으로 부상했다.

## 설명

### 정의

- 사전 정의된 관계형 스키마는 **없다** (schema-on-read).
- 하지만 데이터 자체에 태그·키·중첩 구조가 **있다**.
- 따라서 파서가 타입과 구조를 추출할 수 있다.

### 대표 포맷

**JSON** — 웹의 표준
```json
{
  "customer": {
    "id": 42,
    "name": "김철수",
    "orders": [
      {"sku": "ABC", "qty": 2},
      {"sku": "XYZ", "qty": 1}
    ]
  }
}
```

**XML** — B2B EDI·SOAP·설정 파일
**YAML** — Kubernetes·CI/CD 설정
**HTML** — 웹 페이지 (DOM 구조)
**Protobuf·Avro** — gRPC·Kafka 바이너리 직렬화

### NoSQL과의 관계

반정형 데이터는 NoSQL DB의 자연스러운 저장 단위:

| DB | 저장 단위 | 대표 제품 |
|---|---|---|
| Document DB | JSON 문서 | MongoDB, CouchDB, Firestore |
| Key-Value | 임의 값 | Redis, DynamoDB |
| Wide Column | 가변 컬럼 | Cassandra, HBase |
| Graph | 노드+엣지 | Neo4j, Amazon Neptune |

PostgreSQL·MySQL 같은 전통 RDBMS도 `JSONB` 타입을 지원하면서 경계가 흐려졌다. Snowflake·BigQuery는 `VARIANT` 타입으로 JSON을 네이티브 쿼리한다.

### 장점

1. **스키마 진화 용이** — 새 필드 추가가 `ALTER TABLE` 없이 가능.
2. **객체 지향 매핑** — 프로그래밍 언어의 객체와 1:1.
3. **중첩 구조 자연** — 1:N 관계를 조인 없이 표현.

### 한계

1. **검증 부족** — 스키마가 강제되지 않아 데이터 품질 관리 난이도 상승. JSON Schema, Pydantic, Zod로 보완.
2. **쿼리 최적화** — 중첩된 JSON의 `WHERE` 절은 인덱스 활용이 제한적.
3. **저장 오버헤드** — 키 이름이 매 레코드에 반복.

### AI 시대의 부상

LLM의 **구조화된 출력(Structured Output)**이 사실상 JSON으로 통일됐다:
- OpenAI `response_format={"type": "json_object"}` / `json_schema`
- Anthropic Claude의 tool use 입출력이 JSON Schema 기반
- Google Gemini의 controlled generation

**에이전트의 도구 호출(tool_use), MCP 프로토콜의 메시지**도 전부 JSON. 즉 반정형은 **AI-시스템 간 통신의 공용어**가 됐다.

## Reference

- [Part 8 — Ch.02 정형 vs 비정형 vs 반정형](https://ai-contents-wine.vercel.app/08-data-basics/)
- [Part 9 — Ch.04 API와 데이터 교환](https://ai-contents-wine.vercel.app/09-data-enterprise/)

## 연관 entity

- [Structured Data](./structured-data.md) — 엄격한 버전
- [Unstructured Data](./unstructured-data.md) — 자유로운 버전
- [MCP](./mcp.md) — JSON 기반 에이전트-도구 프로토콜

## 출처

- ECMA-404 "The JSON Data Interchange Syntax".
- MongoDB "What is Semi-Structured Data" (2026).
- OpenAI Structured Outputs docs (2024-08).

## 업데이트 이력

- 2026-04-12 — 신규 생성. Data 파트 ingest.
