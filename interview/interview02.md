## 求两个字符串的公共子串
### 完成情况：未完成
### 不足
没有想起字符串的dp，不能迁移到已经学习的算法知识。
### 解析
此题与leetcode 1143最长子序列非常相似，字串是子序列一个特列。此类问题都应该由dp解决，dp为两个字符串（从0开始）矩阵。空间复杂度可以优化为字符串中较小的一个。返回一个substr，还应注意substr为左闭右开的区间。
```js
function lcs(s1, s2) {
  let dp = new Array(s1.length + 1).fill(0).map(it =>new Array(s2.length + 1).fill(0))
  let len = 0
  let start = 0, end = 0
  for (let i = 0; i < s1.length; ++i) {
    for (let j = 0; j < s2.length; ++j) {
      if (s1[i] === s2[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1
        // len = Math.max(len, dp[i + 1][j + 1])
        if (len < dp[i + 1][j + 1]) {
          len = dp[i + 1][j + 1]
          end = i + 1
          start = end -len
        }
      } else {
        dp[i + 1][j + 1] = 0
      }
    }
  }
  return s1.slice(start, end)
}

console.log(lcs('abcdefghil', 'xyabcdefghkjgah'))
lcs('我喜欢听音乐和看电影', '你知不知道我喜欢听音乐')
```

## 倒水问题
### 描述
现有两个8斤装满水的水桶和一个三斤的空水桶，请将水分4份，每份四斤倒进水池
### 不足
未曾做过此逻辑题，完全不会
### 解析
https://zhidao.baidu.com/question/421027861.html?qbl=relate_question_0
可能存在唯一窍门，尽快量出一斤水。

## 博弈问题
### 描述
小明，小刚和小强两两PK，输了就换人。小明玩了15盘，小刚完了21盘，小强休息5盘。那第三盘是哪两个人PK?
### 不足
未曾做过此逻辑题，完全不会