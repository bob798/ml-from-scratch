# Resources · 实战与课程链接

## Kaggle · Getting Started 系列（按顺序打）

无奖金、无积分、有大量教程，专为新人设计。注册后用自带 Notebook（云端，每周最多 30 小时免费 GPU），**不用配本地环境**。

1. **Titanic（生存预测·分类）** — 第一个提交
   https://www.kaggle.com/competitions/titanic

2. **House Prices（房价预测·回归）** — 接「面积→房价」锚点
   https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques

3. **Digit Recognizer（手写数字·进入深度学习）** — 经典 MNIST 数据集
   https://www.kaggle.com/competitions/digit-recognizer

可选（做完 Titanic 换个新鲜的，科幻版，需更多特征工程）：
- **Spaceship Titanic** — https://www.kaggle.com/competitions/spaceship-titanic

Getting Started 总入口：https://www.kaggle.com/competitions?hostSegmentIdFilter=5

## Coursera · 吴恩达 Machine Learning Specialization

入门金标准（Stanford + DeepLearning.AI），难度 2.5/5，约 2–3 个月、100 小时。

- 课程页（报名、拿证）：https://www.coursera.org/specializations/machine-learning-introduction
- 官方介绍页（看大纲）：https://www.deeplearning.ai/courses/machine-learning-specialization/

进阶（同系列）：Deep Learning Specialization — https://www.coursera.org/specializations/deep-learning

**省钱提示**：可先「免费旁听（Audit）」，视频和练习全能看，只是不给证书。要证书申美硕时再付费订阅。

## 工具

- **VS Code** + Python 扩展（Microsoft 官方）
- Python 3.12（安装勾选 Add to PATH）
- `pip install numpy`（运行本仓库代码）
- React 可视化需 Vite：`npm create vite@latest -- --template react`

## 使用建议

- 证书对**求职/做内容**几乎不加分，对**申美硕**有用——别为拿证而学，用课当字典查
- Kaggle 的价值不在排名，在逼你把一个项目从数据到提交跑完整。一个有真实提交的 profile + GitHub repo，比证书硬

---

## ⚠️ 重要:别买错课(老课 vs 新专项)

市面上有两套容易撞名的"吴恩达 ML":

| | 老课(2012) | 新专项(2022至今) |
|---|---|---|
| 名字 | Machine Learning | Machine Learning Specialization |
| 链接 | /learn/machine-learning/ | /specializations/machine-learning-introduction |
| 结构 | 1门课11周 | 3门课 |
| 有随机森林吗 | ❌ 没有 | ✅ 有(在课2) |
| 语言 | Octave/MATLAB(过时) | Python(主流) |

**别碰老课**(无随机森林、语言过时)。**报新专项**,它有3门课:
1. Supervised ML(回归/分类) — 你已自学过
2. **Advanced Learning Algorithms** — 神经网络+决策树+随机森林(随机森林在 Week 4)
   - 链接: https://www.coursera.org/learn/advanced-learning-algorithms
3. Unsupervised, Recommenders, RL

建议报整个 Specialization(专项证书申硕更有分量),先 Audit 免费旁听确认再付费。
