## tips
根据题意分析，0000和1111都算递增序列。我们可以得出一个结论，对于字符串某一位char来说，前面都为0是不会影响此char的递增关系，也即是000001xxxx等价于1xxxx。因此我们期待此char尽可能的出现0。因此，我们要统计数字1的个数（它要变为0），还有第一个数字1出现后的0的个数（它要变为1），当后者大于前者时，我们优先选择前者，原因同上，因为它对于后面任何种情况都没影响。
```java
class Solution {
    public int minFlipsMonoIncr(String s) {
        if (s == null || s.length() == 0) return 0;
        int ones = 0;
        int filps = 0;
        for (char c : s.toCharArray()) {
            if (c == '1') {
                ones++;
            } else {
                if (ones != 0) {
                    filps++;
                }
            }
            filps = Math.min(ones, filps);
        }
        return filps;
    }
}
```