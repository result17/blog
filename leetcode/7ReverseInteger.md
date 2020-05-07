### 实现
```java
class Solution {
    public int reverse(int x) {
        int result = 0;
        while (x != 0) {
            if (Math.abs(result) > Integer.MAX_VALUE / 10) return 0;
            result = result * 10 + x % 10;
            x /= 10;
        }
        return result;
    }
}
```
https://my.oschina.net/u/4300980/blog/4165085

### 反思
由于平常使用动态类型语言，对于基本类型理解太差。