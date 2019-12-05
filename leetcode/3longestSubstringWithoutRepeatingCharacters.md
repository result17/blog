## 题目
来源于leetode的第三题，思路是用hash table来保存字串和用左右指针标记子串的起始，但遇到相同字符时，则遍历子串直到遇到相同字符。
由于子串是连续的，所以适合运用滑动窗口法。

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let left = right = max = 0, window = new Set(), len = s.length
  while (right < len) {
    let rightChar = s[right++]
    while (window.has(rightChar)) {
      let leftChar = s[left++]
      window.delete(leftChar)
    }
    window.add(rightChar)
    max = Math.max(max, right - left)
  }
  return max
};
````