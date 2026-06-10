# ml-from-scratch

> 从零手写机器学习 —— 一个工程师的 ML 学习记录
> 不调包、先把每个概念手写跑通、能讲明白,再上框架。

## 脊柱:一句话理解机器学习

**机器学习 = 从数据里找一个函数。**

```
模型      = 函数
训练      = 找这个函数的参数
损失      = 衡量函数好不好
梯度下降  = 沿斜率往谷底走 (w -= lr*g)
反向传播  = 复合函数求导(链式法则)
```

## 学习路线(按顺序)

| 章节 | 主题 | 状态 |
|---|---|---|
| [00 · Foundations](00-foundations/) | 函数→斜率→梯度下降→反向传播 | ✅ |
| [01 · Tree Models](01-tree-models/) | 决策树→随机森林、参数vs非参数 | ✅ |
| [02 · Core Concepts](02-core-concepts/) | 过拟合/泛化、模型诊断 | ✅ |
| 03 · Neural Networks | 多层网络、激活函数 | 🔜 |

每章是一个自包含单元:讲解 + 代码 + 可视化放在一起。

## 怎么用这个仓库

- **学习者**:从 00 章按顺序读,每篇配"验收三问",过不了就回炉
- **复习**:看 [glossary.md](glossary.md) 双语术语表快速捡回
- **跑代码**:`pip install numpy torch pandas scikit-learn`,进各章 code/ 目录运行
- **看可视化**:各章 viz/ 里的 .html 双击即可在浏览器打开

## 资源

- [resources/roadmap.md](resources/roadmap.md) — 4-6周动手计划
- [resources/courses.md](resources/courses.md) — Coursera/Kaggle链接 + 老课新课辨析
- [resources/python-for-java-devs.md](resources/python-for-java-devs.md) — Java转Python速查
- [glossary.md](glossary.md) — 双语术语表

## 实践经验沉淀（notes/）

学习线之外的另一条线：行业洞察、决策框架、团队管理。

- [notes/industry/](notes/industry/) — 行业场景拆解（如 AI 视频分析的业务+技术双视角）
- [notes/decision/](notes/decision/) — 项目"该不该做"的判断方法论
- [notes/management/](notes/management/) — 团队管理（含非专家如何管算法团队）

## 学习心法

1. **能讲、能写代码、能教别人** —— 三关过不了就没真懂
2. **先动手再求理论** —— 概念先用代码跑通,数学推导等有手感再回看
3. **中文理解 + 英文术语** —— 概念用中文想透,术语锚定英文原词
4. **会诊断比会用更重要** —— 分清过拟合/欠拟合/数据偏差,对症下药

---

*学习中,持续更新。GitHub: [@bob798](https://github.com/bob798)*
