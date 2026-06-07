"""
============================================================
 W3 · Kaggle Titanic 基线(第一个真实提交)
============================================================
 任务:根据乘客信息,预测有没有在沉船中幸存(1=活, 0=死),属于"二分类"
 目标:跑通"数据→处理→训练→生成提交文件"完整流程,先求通再求好

 新东西:
   - pandas:处理表格数据的库,核心对象 DataFrame = "代码版 Excel 表"
   - sklearn:现成的机器学习算法库,不用自己手写模型了
============================================================
"""
import pandas as pd
# pandas 专门处理表格(有列名、有文字、有缺失值),起别名 pd

from sklearn.ensemble import RandomForestClassifier
# 随机森林:一个现成的分类模型。先把它当黑盒用,原理以后讲

# ---- 1. 读数据 ----
train = pd.read_csv("train.csv")   # 读成 DataFrame(表格)
test  = pd.read_csv("test.csv")
# 在 Kaggle Notebook 里路径是 "/kaggle/input/titanic/train.csv"

print("训练表形状:", train.shape)   # (行数, 列数)
print(train.head(3))                # .head(n) 看前 n 行,熟悉数据长什么样
print("\n各列缺失值数量:")
print(train.isnull().sum())         # 看哪些列有缺失(真实数据一定有缺失,必须处理)

# ---- 2. 处理数据(特征工程的最简版) ----
def prep(df):
    df = df.copy()
    # 文字转数字:模型只吃数字,Sex 的 male/female 要变成 0/1
    df["Sex"] = df["Sex"].map({"male": 0, "female": 1})
    # 填补缺失:Age 用中位数填,Fare 用中位数填,Embarked 用最常见值填
    df["Age"]  = df["Age"].fillna(df["Age"].median())
    df["Fare"] = df["Fare"].fillna(df["Fare"].median())
    df["Embarked"] = df["Embarked"].fillna("S").map({"S": 0, "C": 1, "Q": 2})
    return df

train = prep(train)
test  = prep(test)

# ---- 3. 选特征(用哪些列来预测) ----
features = ["Pclass", "Sex", "Age", "SibSp", "Parch", "Fare", "Embarked"]
X = train[features]        # 输入:这些列
y = train["Survived"]      # 答案:是否幸存
X_test = test[features]

# ---- 4. 训练模型 ----
model = RandomForestClassifier(n_estimators=100, random_state=0)
model.fit(X, y)            # .fit() = 训练,sklearn 把梯度下降那套全包了
print("\n训练完成。训练集准确率:", round(model.score(X, y), 3))

# ---- 5. 预测 + 生成提交文件 ----
pred = model.predict(X_test)   # 对测试集预测每个人是否幸存
submission = pd.DataFrame({
    "PassengerId": test["PassengerId"],
    "Survived": pred
})
submission.to_csv("submission.csv", index=False)   # 这就是要上传 Kaggle 的文件
print("\n已生成 submission.csv,前3行:")
print(submission.head(3))
print("\n→ 把 submission.csv 上传到 Kaggle 比赛页的 'Submit Predictions',就能看到你的分数!")
