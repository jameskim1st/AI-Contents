# Distillation (모델 증류)

**Category:** 개념
**Status:** stable
**Last updated:** 2026-04-12

## TL;DR

큰 모델(teacher)의 지식을 작은 모델(student)에게 전달하는 기법. Geoffrey Hinton et al. (2015)이 제안한 원조 논문 이후, 2024~2026년 LLM 시대에 **재폭발**했다. GPT-4→Phi-4, DeepSeek-R1→Qwen/Llama 등 대형 모델의 추론 능력까지 증류하는 것이 2026년의 핵심 트렌드다. [SLM](./slm.md)을 만드는 가장 효과적인 방법이자, AI 민주화의 기술적 기반.

## 설명

### 정의

Knowledge Distillation(지식 증류)은 **이미 학습된 큰 모델(teacher)**의 출력 분포(soft labels)를 **작은 모델(student)**이 학습하도록 하는 기법이다. student는 teacher의 "dark knowledge"(정답뿐 아니라 오답 간의 상대적 확률 분포)를 흡수하여, 자신의 크기 대비 놀라운 성능을 발휘한다.

### 원리 (Hinton et al. 2015)

```
Teacher Model (큰 모델)
    │
    ▼ soft labels (temperature-scaled logits)
    │
Student Model (작은 모델)
    │
    ▼ Loss = α·KL(soft_teacher ‖ soft_student) + (1-α)·CE(hard_label, student)
```

- **Temperature scaling** — teacher의 출력에 높은 temperature를 적용해 soft probability distribution을 만든다. 이것이 "dark knowledge"를 담고 있다.
- **Loss 함수** — teacher의 soft label과 student의 soft output 간 KL divergence + 실제 정답과의 cross-entropy를 결합.

### LLM 시대의 Distillation (2024~2026)

#### GPT-4 → Phi-4 증류

Microsoft의 Phi 시리즈는 대형 모델이 생성한 **합성 데이터(synthetic data)**로 소형 모델을 학습시키는 전략을 사용. GPT-4 수준의 데이터 품질을 3.8B 파라미터 모델에 압축했다.

#### DeepSeek-R1 → 오픈소스 증류

DeepSeek-R1(671B MoE)의 **reasoning 능력**을 Qwen-2.5(7B/14B/32B), Llama-3.1(8B/70B) 등에 증류. R1의 핵심 기여는 **추론(reasoning) 능력도 distill 가능하다**는 것을 실증한 점이다. 증류된 모델들이 원래 크기 대비 월등한 수학·코딩 성능을 보였다.

#### Synthetic Data Generation → SFT 패턴

1. Teacher가 문제를 풀면서 **추론 과정(chain-of-thought)**까지 포함한 합성 데이터 생성
2. 이 데이터로 student를 **SFT(Supervised Fine-Tuning)**
3. 필요시 DPO/RLHF로 추가 정렬

이것이 **STaR(Self-Taught Reasoner) 패턴**의 변형이며, 2025~2026년 SLM 학습의 사실상 표준 레시피다.

### 왜 Distillation이 중요한가

- **비용** — 수천만 달러로 학습한 teacher의 능력을 $10K 이하 비용으로 student에 전달.
- **배포** — student는 작아서 edge/모바일에서 실행 가능 → [SLM](./slm.md) 생태계의 기반.
- **민주화** — 대기업만 학습할 수 있는 대형 모델의 능력을 오픈소스 커뮤니티가 활용 가능.
- **속도** — student는 추론 속도가 빨라 실시간 서비스에 적합.

### 한계와 논쟁

- **천장 효과** — student는 teacher를 넘을 수 없다 (일반적으로). teacher의 약점도 함께 전달됨.
- **라이선스 논쟁** — GPT-4의 출력으로 학습한 모델이 OpenAI ToS를 위반하는가? 2025~2026년에도 법적으로 미해결.
- **Reasoning distillation의 한계** — 표면적 패턴만 학습하고 진짜 추론은 못 하는 "imitation" 문제 제기 (Gudibande et al. 2023).

## Reference

- [Part 2 — Ch.06 학습과 최적화](https://ai-contents-wine.vercel.app/02-ai-basics/)
- [Part 3 — Ch.07 LLM의 진화](https://ai-contents-wine.vercel.app/03-llm-landscape/)

## 연관 entity

- [SLM](./slm.md) — distillation의 주요 결과물
- [Reasoning Models](./reasoning-models.md) — reasoning distillation의 대상
- [Synthetic Data](./synthetic-data.md) — distillation의 핵심 데이터 생성 기법
- [Fine-Tuning Data](./fine-tuning-data.md) — student 학습에 사용되는 데이터
- [Deep Learning](./deep-learning.md) — distillation의 이론적 기반

## 출처

- Hinton et al., "Distilling the Knowledge in a Neural Network", NeurIPS Workshop 2015.
- Microsoft, "Phi-4 Technical Report", 2024.
- DeepSeek, "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", 2025.
- Gudibande et al., "The False Promise of Imitating Proprietary LLMs", 2023.

## 업데이트 이력

- 2026-04-12 — 신규 생성.
