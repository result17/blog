属于链表比较简单的题目，双指针法即可解决。链表较难的题目，还是得学习归并排序合并k个有序链表。
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  if (!head) return null
  let lHead = left = right = new ListNode(), m = n + 1
  lHead.next = head
  while (m > 0 && right) {
    right = right.next
    m--
  }
  while (right) {
    right = right.next
    left = left.next
  }
  let temp = left.next
  left.next = left.next.next
  temp.next = null
  return lHead.next
}
```