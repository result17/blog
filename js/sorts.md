## 排序稳定性
稳定性是指相等的元素经过排序之后相对顺序是否发生了改变。
基数排序、计数排序、插入排序、冒泡排序、归并排序是稳定排序。
选择排序、堆排序、快速排序不是稳定排序。

## 比较排序的下限
算法第四版 归并排序章节讨论
基于比较的排序算法是不能突破O(NlogN)的。简单证明如下：

N个数有N!个可能的排列情况，也就是说基于比较的排序算法的判定树有N!个叶子结点，比较次数至少为log(N!)=O(NlogN)(斯特林公式)。

## 选择排序
```cpp
void selection_sort(int *a, int n) {
  for (int i = 0; i < n; ++i) {
    int ith = i;
    for (int j = i + 1; j < n; ++j) {
      if (a[j] < a[ith]) {
        ith = j;
      }
    }
    int temp = a[ith];
    a[ith] = a[i];
    a[i] = temp;
  }
}
```
```java
public class Selection
{
  public static void sort(Comparable[] a)
  {
    int N = a.length;
    for (int i = 0; i < N; ++i) {
      int ith =  i;
      for (int j = i + 1; j < N; ++j) {
        if (a[j] < a[ith]) {
          ith = j;
        }
        int temp = a[ith];
        a[ith] = a[j];
        a[j] = temp;
      }
    }
  }
}
```
- 优点：数据移动最少
- 缺点：不稳定排序，比较次数固定（即是元素全部相等或者已经有序）

## 冒泡排序
```cpp
void bubble_sort(int *a, int n) {
  bool flag = true;
  while (flag) {
    flag = false;
    for (int i = 0; i < n; ++i) {
      if (a[i + 1] < a[i]) {
        flag = true;
        int t = a[i];
        a[i] = a[i + 1];
        a[i + 1] = a[i];
      }
    }
  }
}
```
```java
public class Bubble
{
  public static void sort(Comparable[] a)
  {
    boolean flag = true;
    int N = a.length;
    while (flag) {
      flag = false;
      for (int i = 0; i < N; ++i) {
        if (a[i + 1] < a[i]) {
          flag = true;
          int t = a[i];
          a[i] = a[i + 1];
          a[i + 1] = a[i];
        }
      }
    }
  }
}
```
以升序为例，冒泡排序每次检查相邻两个元素，如果前面的元素大于后面的元素，就将相邻两个元素交换。当没有相邻的元素需要交换时，排序就完成了。
在序列完全有序时，该算法只需遍历一遍数组，不用执行任何交换操作，时间复杂度为o(n)。
- 优点：稳定排序，对于有序数组一次遍历即可
- 缺点：元素移动次数多，时间复杂度为o(n ** 2)

### 插入排序
```js
const insert_sort = ary => {
  for (let i  = 1; i < ary.length; ++i) {
    let j = i
    let key = ary[j]
    while (j > 0 && ary[j - 1] > key) {
      ary[j] = ary[j - 1]
      --j
    }
    ary[j] = key
  }
}
```
```java 
public class Insertion
{
  public static void sort(Comparable[] a) {
    int N = a.length;
    for (int i = 1; i < N; ++i) {
      int j = i;
      int key = ary[j];
      while (j > 0 && ary[j - 1] > key) {
        ary[j] = ary[j - 1];
        --j;
      }
      ary[j] = key;
    }
  }
}
```
```cpp
void insert_sort(int* a, int n) {
  for (int i = 1; i < n; ++i) {
    int j = i;
    int key = a[j];
    while (j > 0 && a[j - 1] > key) {
      a[j - 1] = a[j];
      --j
    }
    a[j] = key;
  }
}
```
- 优点：稳定排序，对于基本有序的数组移动次数少
- 缺点：时间复杂度为o(n ** 2)

### 归并排序
```js
function merge_sort(ary) {
//  分为sort和merge两个部分
// 合并两个有序数组array[start, ...mid]和array[mid + 1, ...ebd]
  function merge(array, start, mid, end) {
    let i = start, j = mid + 1
    // end + 1
    for (let k = start; k < end + 1; ++k) {
      aux[k] = array[k]
    }
    for (let k = start; k < end + 1; ++k) {
      if (i > mid) {
        array[k] = aux[j++]
      } else if (j > end) {
        array[k] = aux[i++]
      } else if (aux[i] < aux[j]) {
        array[k] = aux[i++]
      } else {
        array[k] = aux[j++]
      }
    }
  }
  function sort(array, start, end) {
    if (start >= end) return
    const mid = start + Math.floor((end - start) / 2)
    sort(array, start, mid)
    sort(array, mid + 1, end)
    merge(array, start, mid, end)
  }
  const aux = new Array(ary.length).fill(0)
  sort(ary, 0, ary.length - 1)
}
```
- 缺点：需要额外空间o(N)
- 优点：稳定排序，时间复杂度为o(nlogn)

### 快速排序
```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray = nums => {
  quicksort(nums, 0, nums.length - 1)
  return nums
}
//  原地快排
const quicksort = (nums, left, right) => {
  if (left >= right) return
  // 基准值
  const pivot = nums[ Math.floor(left + (right - left) / 2) ]
  const index = partition(nums, left, right, pivot)
  quicksort(nums, left, index - 1)
  quicksort(nums, index, right)
}

// 分治（双指针）
const partition = (nums, left, right, pivot) => {
  while (left <= right) {
    while (nums[left] < pivot) left++
    while (nums[right] > pivot) right--
    if (left <= right) {
      [ nums[left], nums[right] ] = [ nums[right], nums[left] ]
      left++
      right--
    }
  }
  return left
}
```
```java
class Solution {
    public int[] sortArray(int[] nums) {
        quickSort(nums, 0, nums.length - 1);
        return nums;
    }
    public static void quickSort(int[] nums, int left, int right) {
        if (left >= right) return;
        int pivot = nums[left + (right - left) / 2];
        int index = patition(nums, pivot, left, right);
        quickSort(nums, left, index - 1);
        quickSort(nums, index, right);
    }
    public static int patition(int[] nums, int pivot, int left, int right) {
        while (left <= right) {
            while (nums[left] < pivot) left++;
            while (nums[right] > pivot) right--;
            if (left <= right) {
                int temp = nums[left];
                nums[left] = nums[right];
                nums[right] = temp;
                left++;
                right--;
            }
        }
        return left;
    }
}
```
快速排序的核心思想是讲数组划分为小于pivot的左边部分，还有大于等于pivot的右边部分。 最好情况出现在每次都将数组对半分。
- 优点：短小的内循环，比较次数少
- 缺点：不是稳定排序，错误的基准值会使算法时间复杂度变为o(n ** 2)