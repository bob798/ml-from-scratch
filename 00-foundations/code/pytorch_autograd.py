"""
============================================================
 W2 · 从"手写梯度"到 PyTorch 自动求导
============================================================
 同一个线性回归,看 PyTorch 的 loss.backward() 替你做了什么。
 重点只有一句:你手写的 grad_w = mean(2*err*x),被 backward() 一行自动化了。
============================================================
"""
import torch

# ---- 造数据(和之前一样,真相 y=2x+5) ----
torch.manual_seed(0)
x = torch.linspace(-3, 3, 50)
y = 2 * x + 5 + torch.randn(50) * 0.5

# ---- 参数:注意 requires_grad=True ----
# 这是关键!它告诉 PyTorch:"请帮我盯着这个变量,记录怎么对它求导"
w = torch.tensor(0.0, requires_grad=True)
b = torch.tensor(0.0, requires_grad=True)
LR = 0.05

print("开始训练(PyTorch 自动求导版)\n")
for step in range(1, 201):
    # --- 前向:算预测和 loss(写法和数学公式几乎一样) ---
    pred = w * x + b
    loss = torch.mean((pred - y) ** 2)

    # --- 反向:这一行就是全部魔法 ---
    loss.backward()
    # ↑ 它自动算出了 loss 对 w、对 b 的梯度,存进 w.grad 和 b.grad
    #   这正是你手写的 grad_w = mean(2*err*x) 和 grad_b = mean(2*err)
    #   你不用再自己推链式法则,PyTorch 顺着前向的计算过程倒推回来了

    # --- 下坡:还是那个 w -= lr*g,只是 g 改成读 w.grad ---
    with torch.no_grad():          # 这步只是更新参数,不需要被求导,先关掉记录
        w -= LR * w.grad
        b -= LR * b.grad
        w.grad.zero_()             # 清空梯度!不清的话下次会累加(PyTorch 的坑)
        b.grad.zero_()

    if step % 20 == 0 or step == 1:
        print(f"第{step:>3}步: w={w.item():.3f}  b={b.item():.3f}  loss={loss.item():.4f}")

print(f"\n学完: w={w.item():.3f}  b={b.item():.3f}")
print(f"真相: w=2.000  b=5.000")
print(f"\n对比手写版:结果一样,但你没写一行求导公式 —— backward() 全包了")
