/**
 * 堆的整体理解偏低
 * @author        shaodushu <shaodushu@gmail.com>
 * @date          2023-02-16 15:54:44
 * Copyright © YourCompanyName All rights reserved
 */

// 入参是堆元素在数组里的索引范围，low表示下界，high表示上界
function downHeap(low, high) {
    // 初始化 i 为当前结点，j 为当前结点的左孩子
    let i = low, j = i * 2 + 1
    // 当 j 不超过上界时，重复向下对比+交换的操作
    while (j <= high) {
        // 如果右孩子比左孩子更大，则用右孩子和根结点比较
        if (j + 1 <= high && heap[j + 1] > heap[j]) {
            j = j + 1
        }

        // 若当前结点比孩子结点小，则交换两者的位置，把较大的结点“拱上去”
        if (heap[i] < heap[j]) {
            // 交换位置
            const temp = heap[j]
            heap[j] = heap[i]
            heap[i] = temp

            // i 更新为被交换的孩子结点的索引
            i = j
            // j 更新为孩子结点的左孩子的索引
            j = j * 2 + 1
        } else {
            break
        }
    }
}

// 入参是堆元素在数组里的索引范围，low表示下界，high表示上界
function upHeap(low, high) {
    // 初始化 i（当前结点索引）为上界
    let i = high
    // 初始化 j 为 i 的父结点
    let j = Math.floor((i - 1) / 2)
    // 当 j 不逾越下界时，重复向上对比+交换的过程
    while (j >= low) {
        // 若当前结点比父结点大
        if (heap[j] < heap[i]) {
            // 交换当前结点与父结点，保持父结点是较大的一个
            const temp = heap[j]
            heap[j] = heap[i]
            heap[i] = temp

            // i更新为被交换父结点的位置
            i = j
            // j更新为父结点的父结点
            j = Math.floor((i - 1) / 2)
        } else {
            break
        }
    }
}


/**
* @param {number[]} nums
* @param {number} k
* @return {number}
*/
const findKthLargest = function (nums, k) {
    const sorted = nums.sort((a, b) => (b - a))
    return sorted[k - 1]
}
