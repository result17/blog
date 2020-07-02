```cpp
class Solution {
public:
    int subarraysDivByK(vector<int>& A, int K) {
        vector<int> count(K, 0);
        count[0] = 1;
        int prefixDiv = 0, ans = 0;
        for (int a : A) {
            prefixDiv = (prefixDiv + (a % K + K)) % K;
            ans += count[prefixDiv]++;
        }
        return ans;
    }
};
```
此题虽然代码简单但里面可以说的点不少。首先题目要求子数组之和能被k整除的数量。这类求连续子数组的问题，都可以考虑使用前缀和方法解答。即任意连续子数组都可以用一个大的前缀数组和一个小的前缀数组的差集表示。此题主要利用的是同余的两个前缀数组差集必为连续子数组且之和必为k的整数倍。例如。5 % 3和8 % 3，5和8同余，所以(8 - 5) % 3 = 0。
所以现在有结论是两个同余的前缀和数组必然会组合成一个能被k整除的连续子数组，n个同余的前缀和取当中的两个可以转换为数组的组合问题cn2，等价于0-(n-1)之和。
还应注意一个问题是能够被k整除的前缀和数组（即是余数为0）单个就能组成，所以<code>count[0] = 1</code>。