# 前缀和解法
- 前缀和老套路map[0] = 1
- 除了节点的左右节点及其后代节点此前缀和不能再被方法，所以应该在当前map[prefixSum]--
```cpp
class Solution {
public:
    int pathSum(TreeNode* root, int sum) {
        ans = 0;
        m[0]++;
        travse(root, 0, sum);
        return ans;
    }
private:
    int ans;
    unordered_map<int, int> m;
    void travse(TreeNode* root, int ps, int sum) {
        if (!root) return;
        ps += root->val;
        if (m.count(ps - sum) != 0) {
            ans += m[ps - sum];
        }
        m[ps]++;
        travse(root->left, ps, sum);
        travse(root->right, ps, sum);
        // 除了左右子树及其后代节点访问不了此节点
        m[ps]--;
    }
};
```
```java
class Solution {
    Map<Integer, Integer> map;
    int res = 0;
    public int pathSum(TreeNode root, int targetSum) {
        Map<Integer, Integer> map = new HashMap<>();
        this.map = map;
//         prefix sum tradition
        this.map.put(0, 1);
        pathTraverse(root, 0, targetSum);
        return res;
    }
    public void pathTraverse(TreeNode root, int prefixSum, int targetSum) {
        if (root == null) return;
        prefixSum += root.val;
        res += map.getOrDefault(prefixSum - targetSum, 0);
        map.merge(prefixSum, 1, Integer::sum);
        pathTraverse(root.left, prefixSum, targetSum);
        pathTraverse(root.right, prefixSum, targetSum);
        map.merge(prefixSum, -1, Integer::sum);
    }
}
```
