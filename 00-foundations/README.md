# 00 · Foundations（基础:从函数到反向传播）

机器学习的数学地基。一句话脊柱:**ML = 从数据里找一个函数。**

## 阅读顺序
1. [函数与映射](01-函数与映射.md) — 函数是映射不是公式,所以神经网络是函数
2. [斜率与求导](02-斜率与求导.md) — 某点多陡,放大镜逼近法
3. [梯度下降与链式法则](03-梯度下降与链式法则.md) — w -= lr*g,负号定方向
4. [损失函数MSE](04-损失函数MSE.md) — 误差平方求平均

## 代码
- `code/linreg_newbie.py` — 纯手写梯度下降(改LR看收敛/爆炸)
- `code/pytorch_autograd.py` — 同一问题换PyTorch,看 backward() 替你做了什么

## 可视化
- `viz/functions-mapping.html` — 切换函数/关系看「输出唯一」,拖 x 看复合生产线(直接浏览器打开)
- `viz/gradient-descent.jsx` — 拖小球感受斜率与下坡(需Vite,或看HTML版)
