function insertSort(arr) {
    let len = arr.length
    let temp
    for (let i = 1; i < len; i++) {
        let j = i
        temp = arr[i]
        while (j > 0 && arr[j - 1] > temp) {
            // if (arr[j] < arr[j - 1]) {
            //     temp = arr[j - 1]
            //     j--
            // }
            // 大的往后移动
            arr[j] = arr[j - 1]
            j--
        }
        arr[j] = temp
    }
    return arr
}

console.log(insertSort([3, 2, 1, 5, 2]));