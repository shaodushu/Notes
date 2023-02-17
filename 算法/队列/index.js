/**
 * @author        shaodushu <shaodushu@gmail.com>
 * @date          2023-02-15 11:17:47
 * Copyright © YourCompanyName All rights reserved
 */

/*** 用栈实现队列 */
const MyQueue = function () {
    this.stack1 = [];
    this.stack2 = [];
}

MyQueue.prototype.push = function (x) {
    this.stack1.push(x)
}

MyQueue.prototype.pop = function () {
    if (this.stack2.length <= 0) {
        while (this.stack1.length !== 0) {
            this.stack2.push(this.stack2.pop())
        }
    }
    return this.stack2.pop()
}

MyQueue.prototype.peek = function () {
    // 如果stack2栈都没有了，我们从栈2去取就没意义。所以仍然要将栈一弹出压栈到栈二
    if (this.stack2.length <= 0) {
        while (this.stack1.length !== 0) {
            this.stack2.push(this.stack2.pop())
        }
    }
    // 缓存 stack2 的长度
    const stack2Len = this.stack2.length;
    return this.stack2[stack2Len - 1]
}

MyQueue.prototype.empty = function () {
    return !this.stack1.length && !this.stack2.length
}

/**
 * 队列-滑动窗口(双指针+遍历)
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow = function (nums, k) {
    const len = nums.length
    const res = []
    let left = 0;
    let right = k - 1;
    while (right < len) {
        const max = calMax(nums, left, right)
        res.push(max)
        right++;
        left++
    }
    return res
}

function calMax(nums, left, right) {
    // 处理数组为空的边界情况
    if (!nums || !nums.length) {
        return;
    }
    let max = nums[left];
    for (let i = left; i <= right; i++) {
        if (max < nums[i]) {
            max = nums[i]
        }
    }
    return max
}

console.log(JSON.stringify(maxSlidingWindow([1, 3, -1, 5, 3, 6, 7], 3)));


/**
 * 队列-双端队列（理解程度低）
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow1 = function (nums, k) {
    // 缓存数组的长度
    const len = nums.length;
    // 初始化结果数组
    const res = [];
    // 初始化双端队列
    const deque = [];
    // 开始遍历数组
    for (let i = 0; i < len; i++) {
        // 当队尾元素小于当前元素时
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            // 将队尾元素（索引）不断出队，直至队尾元素大于等于当前元素
            deque.pop();
        }
        // 入队当前元素索引（注意是索引）
        deque.push(i);
        // 当队头元素的索引已经被排除在滑动窗口之外时
        while (deque.length && deque[0] <= i - k) {
            // 将队头元素索引出队
            deque.shift();
        }
        // 判断滑动窗口的状态，只有在被遍历的元素个数大于 k 的时候，才更新结果数组
        if (i >= k - 1) {
            res.push(nums[deque[0]]);
        }
    }
    // 返回结果数组
    return res;
};
