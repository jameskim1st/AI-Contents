---
title: "Why Do Multi-Agent LLM Systems Fail?"
authors: ["Mert Cemri", "Melissa Z. Pan", "Shuyi Yang", "et al."]
publisher: "UC Berkeley + MultiOn"
url: "https://arxiv.org/abs/2503.13657"
published: 2025-03-17
ingested: 2026-05-16
type: paper
status: primary
used_for:
  - "Part 4 Ch.13 — 멀티 에이전트 실패 모드 14가지 (정량 분석)"
  - "wiki/entities/multi-agent-failure-modes.md"
---

## 한 줄 요약

1,600+ trace 분석 → **14개 failure mode를 3 카테고리로 분류**. 핵심 발견: "실패는 개별 LLM 능력 부족이 아니라 **조직 설계·코디네이션** 문제에서 발생". Inter-annotator κ=0.88.

## 14개 Failure Mode (3 카테고리)

### FC1 — Specification & System Design (41.77%)
| 코드 | 모드 | 빈도 |
|---|---|---|
| 1.1 | Disobey task specification | 10.98% |
| 1.2 | Disobey role specification | 0.50% |
| 1.3 | **Step repetition** | **17.14%** |
| 1.4 | Loss of conversation history | 3.33% |
| 1.5 | **Unaware of termination conditions** | **9.82%** |

### FC2 — Inter-Agent Misalignment (36.94%)
| 코드 | 모드 | 빈도 |
|---|---|---|
| 2.1 | Conversation reset | 2.33% |
| 2.2 | **Fail to ask for clarification** | **11.65%** |
| 2.3 | Task derailment | 7.15% |
| 2.4 | Information withholding | 1.66% |
| 2.5 | Ignored other agent's input | 0.17% |
| 2.6 | **Reasoning-action mismatch** | **13.98%** |

### FC3 — Task Verification & Termination (21.30%)
| 코드 | 모드 | 빈도 |
|---|---|---|
| 3.1 | Premature termination | 7.82% |
| 3.2 | No or incomplete verification | 6.82% |
| 3.3 | Incorrect verification | 6.66% |

## 가장 큰 5개 (위험도 순)
1. **Step repetition (17.14%)** — 같은 step을 무한 반복
2. **Reasoning-action mismatch (13.98%)** — 추론은 X인데 행동은 Y
3. **Fail to ask for clarification (11.65%)** — 모호한 지시에 그냥 진행
4. **Disobey task specification (10.98%)** — 처음 지시 어김
5. **Unaware of termination (9.82%)** — 끝낼 때를 모름

## 콘텐츠 작성 활용

- "실패 모드" 섹션의 모든 통계 backbone
- Bar chart SVG: 14개 모드 빈도
- 방어 가이드라인 도출:
  - 빈번한 5개에 집중 (다른 9개는 합쳐도 36%)
  - Termination condition 명시 (9.82% 단독으로 큰 비중)
  - Clarification ask를 prompt에 강제

## 관련 출처

- [Anthropic Multi-Agent Research](https://www.anthropic.com/engineering/built-multi-agent-research-system)
- [Cognition "Don't Build Multi-Agents"](https://cognition.ai/blog/dont-build-multi-agents)
