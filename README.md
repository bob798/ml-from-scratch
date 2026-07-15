# ml-from-scratch

> Machine learning implemented from first principles — no libraries doing the thinking for you.
> Write every concept by hand until you can run it, draw it, and explain it. Frameworks come after.

An engineer's working notes on ML fundamentals. Each concept is hand-implemented in plain
NumPy/PyTorch, paired with a visualization and a "can you actually explain this?" check.

## The spine: ML in one sentence

**Machine learning is finding a function from data.**

```
model            = the function
training         = finding its parameters
loss             = how wrong the function is
gradient descent = walk downhill along the slope (w -= lr*g)
backpropagation  = the chain rule, applied to composed functions
```

## Path (in order)

| Chapter | Topic | Status |
|---|---|---|
| [00 · Foundations](00-foundations/) | functions → slopes → gradient descent → backprop | ✅ |
| [01 · Tree Models](01-tree-models/) | decision trees → random forests; parametric vs non-parametric | ✅ |
| [02 · Core Concepts](02-core-concepts/) | overfitting/generalization, model diagnosis | ✅ |
| 03 · Neural Networks | multi-layer networks, activation functions | 🔜 |

Each chapter is self-contained: explanation, code, and visualization in one place.

## How to use this repo

- **Learning it**: read 00 onward in order. Each piece ends with three verification questions —
  if you can't answer them, go back rather than forward.
- **Reference**: [glossary.md](glossary.md) — bilingual (EN/CN) term table.
- **Running the code**: `pip install numpy torch pandas scikit-learn`, then run from each chapter's `code/`.
- **Visualizations**: open the `.html` files under each chapter's `viz/` in a browser.

## Resources

- [resources/roadmap.md](resources/roadmap.md) — a 4–6 week hands-on plan
- [resources/courses.md](resources/courses.md) — Coursera/Kaggle links, and which classic courses are now outdated
- [resources/python-for-java-devs.md](resources/python-for-java-devs.md) — Python quick-reference for Java developers
- [glossary.md](glossary.md) — bilingual term table

## Field notes (`notes/`)

A second track alongside the fundamentals: industry teardowns and decision frameworks
from shipping AI systems in production. *(Written in Chinese.)*

- [notes/industry/](notes/industry/) — domain teardowns (e.g. AI video analytics: business + technical view)
- [notes/decision/](notes/decision/) — how to judge whether an AI project should be built at all

## Principles

1. **Explain it, code it, teach it** — fail any of the three and you don't understand it yet.
2. **Hands before theory** — get the concept running first; derive the math once you have intuition.
3. **Think in your native language, anchor terms in English** — concepts in CN, terminology in EN.
4. **Diagnosis beats usage** — telling overfitting from underfitting from bad data is the real skill.

---

*Actively extended. GitHub: [@bob798](https://github.com/bob798)*
