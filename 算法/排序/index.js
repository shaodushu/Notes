/**
 * @author        shaodushu <shaodushu@gmail.com>
 * @date          2023-02-16 16:16:03
 * Copyright © YourCompanyName All rights reserved
 */

const data = [3, 1, 2, 5, 4]

/**
 * 冒泡排序
 */
function bubbleSort(nums) {
    const len = nums.length
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (nums[j] > nums[j + 1])
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
        }

    }
    return nums
}

function betterBubbleSort(nums) {
    const len = nums.length
    for (let i = 0; i < len; i++) {
        let flag = false
        for (let j = 0; j < len - 1 - i; j++) {
            if (nums[j] > nums[j + 1])
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
            flag = true
        }
        if (flag === false) return nums

    }
    return nums
}

console.log(bubbleSort(data));
console.log(betterBubbleSort(data));

/**
 * 选择排序
 * @param {*} arr 
 */
function selectSort(arr) {
    const len = arr.length
    for (let i = 0; i < len - 1; i++) {
        const minIndex = i
        for (let j = i; j < len - 1; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        // 最小值发生变化
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        }
    }
    return arr
}

console.log(selectSort(data));

/**
 * 插入排序
 * @param {*} arr 
 */
function insertSort(arr) {
    const len = arr.length
    // 保存要插入的元素
    let temp
    for (let i = 1; i < len; i++) {
        // 用于定位temp要插入的位置
        let j = i
        // 初始化temp值，默认为数组第二个值开始
        temp = arr[i]

        // j>0  j从一开始
        // while (j > i && arr[j - 1] > temp) {
        while (j > 0 && arr[j - 1] > temp) {
            // if (arr[j] < arr[j - 1]) {
            //     temp = arr[j - 1]
            //     j--
            // }
            // 这里面i>j,因为要从索引i前面找大值。前面的值比temp还大，当然大的往后移动
            arr[j] = arr[j - 1]
            j--
        }
        // 此处的j正是要插入索引值
        // 循环让位，最后得到的 j 就是 temp 的正确索引
        arr[j] = temp
    }
    // arr.push(temp)
    return arr
}

console.log(insertSort(data));

/**
 * 归并排序  先分再合
 * @param {*} arr 
 * @returns 
 */
function mergeSort(arr) {
    // console.log(arr)
    const len = arr.length
    // 边界情况要包括1
    // if (len < 1) return arr
    if (len <= 1) return arr

    const mid = Math.floor(len / 2)
    const leftArr = mergeSort(arr.slice(0, mid))
    const rightArr = mergeSort(arr.slice(mid, len))
    return mergeArr(leftArr, rightArr)
}

function mergeArr(arr1, arr2) {
    let i = 0, j = 0;
    const res = []
    const len1 = arr1.length
    const len2 = arr2.length
    while (i < len1 && j < len2) {
        // 注意排序顺序
        // if (arr1[i] > arr2[j]) {
        //     res.push(arr1[i])
        //     i++
        // } else {
        //     res.push(arr2[j])
        //     j++
        // }
        if (arr1[i] < arr2[j]) {
            res.push(arr1[i])
            i++
        } else {
            res.push(arr2[j])
            j++
        }
    }
    // i 小于len1说明数组1还有剩余，直接将数组1剩余压入
    if (i < len1) {
        // 数组做连接，而不是压入
        // res.push(arr1.slice(i))
        // 连接产生的是新数组，所以要将其返回
        return res.concat(arr1.slice(i))
    } else {
        return res.concat(arr2.slice(j))
    }
    // return res
}

console.log(mergeSort(data))

