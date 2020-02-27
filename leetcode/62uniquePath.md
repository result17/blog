```java
class Solution {
    public int uniquePaths(int m, int n) {
        if (m <= 1 || n <= 1) return 1;
        m--;
        n--;
        long res = 1;
//         make sure m > n
        if (m < n) {
            int temp = n;
            n = m;
            m = temp;
        }
//         m + n可能溢出，所以用long
        int j = 1;
        for (long i = m + 1; j < n + 1; ++j, ++i) {
            res *= i;
            res /= j;
        }
        return (int)res;
    }
}
```
对于此题，起点是(1, 1)，对于m * n的地图来说，要在x方向走m - 1步，同理，在y方向走n - 1步。是数学上组合问题，所有path = (m - 1 + n - 1)! / (m - 1)! * (n -  1)! 