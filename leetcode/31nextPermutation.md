## 题意
下一个仅比现在字典序大的排序，如果是降序排列，则改为升序排列。
## 解
从末尾看起，找到升序转为降序的转折点j - 1（如果j等于0，代表没有转折点，全为升序排列，跳过转折点和仅仅大于它的数字交换）。进行转折点交换，与仅仅大于此点的数字进行交换，交换后此点后的排列依然为降序（从末尾看是升序），将其转为升序，则reverse，可等到目的数组。
```python
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        if not nums and len(nums) == 1: return
        length = len(nums)
        j = length - 1
        while j > 0 and nums[j] <= nums[j - 1]:
            j -= 1
#         末尾往前看的升序转折点j - 1
        i = j - 1
        if j > 0:
            while j < length and nums[i] < nums[j]:
                j += 1
            self.swap(nums, i, j - 1)
        while i + 1 < length:
            i += 1
            length -= 1
            self.swap(nums, i, length)
            
    def swap(self, nums: List[int], i: int, j: int) -> None:
        temp = nums[j]
        nums[j] = nums[i]
        nums[i] = temp
```