/**
 * @author        shaodushu <shaodushu@gmail.com>
 * @date          2023-02-14 19:42:45
 * Copyright © YourCompanyName All rights reserved
 */

function ListNode(val) {
    this.val = val
    this.next = null
}

function mergeTowList(l1, l2) {
    let head = new ListNode()
    // 针
    let cur = head
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            cur.next = l1
            // l1移动
            l1 = l1.next
        } else {
            cur.next = l2
            l2 = l2.next
        }
        // 当都移动完时，cur也向前移动
        cur = cur.next
    }
    // 处理不等长
    cur.next = l1 !== null ? l1 : l2
    return head.next
}

const d1 = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 4,
            next: null
        }
    }
}

const d2 = {
    val: 1,
    next: {
        val: 3,
        next: {
            val: 4,
            next: null
        }
    }
}

console.log(JSON.stringify(mergeTowList(d1, d2)))

// // 链表结点删除
// 删除重复结点 
// function deleteDuplicates(head) {
//     let cur = head
//     while (cur != null && cur.next !== null) {
//         if (cur.val === cur.next.val) {
//             cur.next = cur.next.next
//         } else {
//             // 针向后移动
//             cur = cur.next
//         }
//     }
//     return head
// }

/**
 * 删除重复两个结点
 * @param {*} head 
 * @returns 
 */
function deleteDuplicates(head) {
    if (!head || !head.next) {
        return head
    }
    let dummy = new ListNode()
    // 更改头结点
    dummy.next = head
    cur = dummy
    // cur后面至少要有结点才进行循环
    while (cur.next && cur.next.next) {
        if (cur.next.val === cur.next.next.val) {
            // 记住这个重复值
            let val = cur.next.val
            while (cur.next && cur.next.val === val) {
                cur.next = cur.next.next
            }
        } else {
            cur = cur.next
        }
    }
    return dummy.next
}

const d3 = {
    val: 1,
    next: {
        val: 1,
        next: {
            val: 2,
            next: {
                val: 3,
                next: {
                    val: 3,
                    next: null
                }
            }
        }

    }
}

console.log(JSON.stringify(deleteDuplicates(d3)))

/**
 * 快慢指针
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function (head, n) {
    const dummy = new ListNode()
    dummy.next = head

    let fast = dummy
    let slow = dummy

    while (n !== 0) {
        fast = fast.next
        n--
    }

    while (fast.next) {
        fast = fast.next
        slow = slow.next
    }
    // 删除慢指针后继结点
    slow.next = slow.next.next
    return dummy.next
}

/**
 * 链表反转
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
    let pre = null
    // 初始化为头结点
    let cur = head
    while (cur !== null) {
        // 每次都记住后置结点
        let next = cur.next
        // 进行反转
        cur.next = pre
        // pre和next向前移动
        pre = cur
        cur = next
    }
    return pre
}

/**
 * 局部反转一个链表（未理解充分）
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
// 入参是头结点、m、n
const reverseBetween = function (head, m, n) {
    // 定义pre、cur，用leftHead来承接整个区间的前驱结点
    let pre, cur, leftHead
    // 别忘了用 dummy 嗷
    const dummy = new ListNode()
    // dummy后继结点是头结点
    dummy.next = head
    // p是一个游标，用于遍历，最初指向 dummy
    let p = dummy
    // p往前走 m-1 步，走到整个区间的前驱结点处
    for (let i = 0; i < m - 1; i++) {
        p = p.next
    }
    // 缓存这个前驱结点到 leftHead 里
    leftHead = p

    /*************** 反转开始*************/
    // start 是反转区间的第一个结点
    let start = leftHead.next
    // pre 指向start
    pre = start
    // cur 指向 start 的下一个结点
    cur = pre.next
    // 开始重复反转动作
    for (let i = m; i < n; i++) {
        let next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    /*************** 反转结束*************/

    //  leftHead 的后继结点此时为反转后的区间的第一个结点
    leftHead.next = pre
    // 将区间内反转后的最后一个结点 next 指向 cur
    start.next = cur
    // dummy.next 永远指向链表头结点
    return dummy.next
};

const d5 = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4,
                next: {
                    val: 5,
                    next: null
                }
            }
        }

    }
}

console.log(JSON.stringify(reverseBetween(d5, 2, 4)));


/**
 * 是否存环
 * @param {*} head 
 * @returns 
 */
function hasCycle(head) {
    while (head) {
        if (head.flag) {
            return true
        } else {
            head.flag = true
            head = head.next
        }
    }
    return false
}

/**
 * 定位环起点
 * @param {ListNode} head
 * @return {ListNode}
 */
const detectCycle = function (head) {
    while (head) {
        if (head.flag) {
            return head
        } else {
            head.flag = true;
            head = head.next
        }
    }
    return null
}


