```java
class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        if (nums.length < 1) return res;
        Arrays.sort(nums);
        traverse(res, new ArrayList<>(), 0, nums);
        return res;
    }
    private void traverse(List<List<Integer>> res, List<Integer> cur, int begin, int[] nums) {
        if (begin == nums.length) {
            res.add(new ArrayList<>(cur));
            return;
        }
        cur.add(nums[begin]);
        traverse(res, cur, begin + 1, nums);
        cur.remove(cur.size() - 1);
        while (begin < nums.length - 1 && nums[begin] == nums[begin + 1]) {
          begin++;
        }
        traverse(res, cur, begin + 1, nums);
    }
}
```
列表种有可能相同的元素，返回的全子集。跟不同的元素组成的列表，返回的全子集区别是，相同元素可以添加到cur（产生子集相同的情况）进行DFS，但因为舍去相同的元素（产生子集相同的情况），所以递归条件要进行调整，由最后一个想通过元素进行舍去即可（begin++).