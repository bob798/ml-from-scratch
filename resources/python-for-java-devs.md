# 05 · Java 转 Python 语法速查

> 给有 Java 经验、初学 Python 的人。配套代码：[code/02_linreg_java_notes.py](../code/02_linreg_java_notes.py)

## 5 个核心差异

### 1. 缩进代替 `{}`
Java 靠大括号划分代码块，Python 靠**对齐的空格**。同一层代码缩进必须一致。

```python
def f(x):          # 冒号开始
    return w*x + b # 缩进 = 函数体
                   # 缩进结束 = 函数结束(没有右大括号)
```

### 2. 不声明类型
```python
w = 0.0     # 不是 double w = 0.0;  Python 自己推断类型
```

### 3. `def` 定义函数
```python
def add(a, b):     # ≈ Java 方法,但不写返回类型/public,结尾冒号
    return a + b
```

### 4. 数组自动逐元素运算（向量化，numpy 精华）
和 Java 差最大的地方：
```python
2 * x      # x 是数组,自动对每个元素乘2,不用 for 循环
f(x) - y   # 数组逐元素相减
```
Java 要写 `for(int i...) arr[i]*2`，numpy 一行完事。

### 5. f-string 格式化
```python
print(f"w={w:.3f}")   # f 开头,{}插变量,:.3f 保留3位小数
                      # ≈ Java 的 String.format("%.3f", w)
```

## Python 文件由什么构成

**核心：Python 没有「必须放进类」这条规矩。**

Java 一切必须包在类里 + 要有 main 入口：
```java
public class Main {
    static int add(int a, int b) { return a + b; }
    public static void main(String[] args) { System.out.println(add(1,2)); }
}
```

Python 同样的事：
```python
def add(a, b):      # 函数裸在文件里,不用类
    return a + b
print(add(1, 2))    # 主代码裸在文件里,不用 main
```

### 文件就是「从上往下执行的脚本」

- **Java**：JVM 找 main 开始跑，方法定义顺序无所谓
- **Python**：解释器从第一行到最后一行顺序执行。遇到 `def` 就「记住函数」（不执行函数体），遇到 `print(...)` 当场执行

⚠️ 后果：**函数必须先定义、后调用**
```python
print(add(1,2))   # ❌ 报错:此时 add 还没被记住
def add(a,b): return a+b
```
惯例：import 在最上 → 函数/类定义在中间 → 执行代码在最下。

### 关于「常量」
Python **没有** `final`。约定：**全大写命名 = 当常量，请别改**，但语言不强制（写 `PI = 99` 照样能改）。

### `if __name__ == "__main__":`
```python
if __name__ == "__main__":   # 只有"直接运行此文件"时才执行
    print(add(1, 2))         # 被别的文件 import 时不执行
```
不是必须的。用途：让文件既能直接运行，又能被 import 当工具库。代码多了拆模块时再用。

## 对照速记表

| | Java | Python |
|---|---|---|
| 函数要放类里吗 | 必须 | 不用，可裸在文件里 |
| 需要 main 入口吗 | 必须 | 不用，文件从上往下执行 |
| 执行顺序 | JVM 找 main | 第一行到最后一行 |
| 函数定义顺序 | 无所谓 | 调用前必须已定义 |
| 真常量 | `final` 强制 | 无，靠全大写约定 |
| 类 | 必须有 | 可有可无 |
| 类型声明 | 必须 | 不用 |
| 代码块 | `{}` | 缩进 |

**一句话**：Java 是「一切皆类」，Python 是「文件即脚本」。
