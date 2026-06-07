# 双语术语表（Glossary）

> 策略:中文建立理解,英文锚定术语。很多英文术语是大白话、自带解释,
> 而且论文/文档/报错/Kaggle 讨论全是英文 —— 记英文原词,查得到、用得上、练了英文。

## 基础 · Foundations
| English | 中文 | 一句话 |
|---|---|---|
| function | 函数 | 输入到输出的确定映射(不一定是公式) |
| mapping | 映射 | 把输入"指向"输出的规则 |
| slope | 斜率 | 走一步升多高 |
| derivative | 导数/求导 | 某一点的斜率 |
| gradient | 梯度 | 多维版的斜率,指向上升最快方向 |
| gradient descent | 梯度下降 | 沿斜率反方向(下坡)找最低点 |
| learning rate (lr) | 学习率 | 每步迈多大 |
| chain rule | 链式法则 | 逐级斜率连乘 |
| backpropagation | 反向传播 | 对复合函数(神经网络)求导 |
| loss function | 损失函数 | 衡量模型好不好,越小越好 |
| MSE (mean squared error) | 均方误差 | 误差平方求平均 |
| convergence / diverge | 收敛 / 发散 | 趋于稳定 / 爆炸跑飞 |

## 树模型 · Tree Models
| English | 中文 | 一句话 |
|---|---|---|
| decision tree | 决策树 | 一连串 if-else 提问 |
| split | 分裂/切一刀 | 在某特征上把数据切开 |
| root node | 根节点 | 树的第一刀 |
| tree ensemble | 树集成 | 建很多树投票 |
| random forest | 随机森林 | 最常用的树集成 |
| bagging | 装袋法 | Bootstrap Aggregating |
| sampling with replacement | 有放回抽样 | 抽完放回,会重复+缺席 |
| bootstrap sample | 自助样本 | 一份有放回抽出的数据 |
| out-of-bag (OOB) | 袋外样本 | 没被抽中的~37%,可当测试 |

## 核心概念 · Core Concepts
| English | 中文 | 一句话 |
|---|---|---|
| overfitting | 过拟合 | 把噪声也学成规律,训练好测试崩 |
| underfitting | 欠拟合 | 太简单,训练测试都差 |
| generalization | 泛化 | 在没见过的数据上也表现好(ML终极目标) |
| variance (high variance) | 方差(高方差) | 对数据微变敏感、飘 |
| bias | 偏差 | 系统性偏离 |
| robust / sensitive | 稳健 / 敏感 | 抗干扰 / 易受干扰 |
| class imbalance | 类别不平衡 | 某类样本太少 |
| distribution shift | 分布偏移 | 训练数据≠真实数据 |
| classification | 分类 | 预测类别(离散) |
| regression | 回归 | 预测数值(连续) |
| parametric / non-parametric | 参数/非参数模型 | 要不要预先定义函数形状 |
