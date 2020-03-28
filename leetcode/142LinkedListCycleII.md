```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null) return null;
        ListNode fast = head;
        ListNode slow = head;
        while (true) {
            if (fast.next == null || fast.next.next == null) return null;
            fast = fast.next.next;
            slow = slow.next;
            if (slow == fast) break;
        }
        slow = head;
        while (fast != slow) {
            fast = fast.next;
            slow = slow.next;
        }
        return slow;
    }
}
```
快慢指针法，两指针相遇后，将慢指针移到head，快指针和慢指针每次都移动一次，相遇的节点为环开始的地方。原谅我笨，详细证明在下列的视频处。
https://www.bilibili.com/video/av61003568
https://www.bilibili.com/video/BV1kb411g7DZ