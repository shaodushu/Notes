/**
 * @author        shaodushu <shaodushu@gmail.com>
 * @date          2023-02-14 19:45:09
 * Copyright © YourCompanyName All rights reserved
 */

function TreeNode(val) {
    this.val = val
    this.left = this.right = null
}

const root = {
    val: "A",
    left: {
        val: "B",
        left: {
            val: "D"
        },
        right: {
            val: "E"
        }
    },
    right: {
        val: "C",
        right: {
            val: "F"
        }
    }
};

/**
 * 广度遍历二叉树
 * @param {*} root 
 */
function BFS(root) {
    const queue = []
    if (!root) return queue
    queue.push(root)
    while (queue.length) {
        // 取出头部元素并队头元素出队
        const top = queue.shift()
        console.log(top.val, '..........结点.......');
        if (top.left) {
            queue.push(top.left)
        }
        if (top.right) {
            queue.push(top.right)
            // }
            // // 访问完毕，队头元素出队
            // queue.shift()
        }
    }
}

console.log(JSON.stringify(BFS(root)))

/**
 * 树-全排列
 * @param {number[]} nums
 * @return {number[][]}
 */
// 入参是一个数组
const permute = function (nums) {
    // 缓存数组的长度
    const len = nums.length
    // curr 变量用来记录当前的排列内容
    const curr = []
    // res 用来记录所有的排列顺序
    const res = []
    // visited 用来避免重复使用同一个数字
    const visited = {}
    function dfs(n) {
        if (n === len) {
            res.push(curr.slice())
            return
        }
        for (let i = 0; i < len; i++) {
            if (!visited[nums[i]]) {
                // 标记该数字已被使用
                visited[nums[i]] = 1
                curr.push(nums[i])
                dfs(n + 1)
                // 弹出已被使用的值，并且标记已使用
                curr.pop()
                visited[nums[i]] = 0
            }
        }
    }
    dfs(0)
    return res
}

console.log(JSON.stringify(permute([1, 2, 3])));


/**
 * 通过栈实现先序遍历
 * stack 先进后出
 * @param {TreeNode} root
 * @return {number[]}
 */
const preorderTraversal = function (root) {
    const res = []
    if (!root) return res
    const stack = []
    stack.push(root)
    while (stack.length) {
        const top = stack.pop()
        res.push(top.val)
        if (top.right) {
            // 右结点先进
            stack.push(top.right)
        }
        if (top.left) {
            stack.push(top.left)
        }

    }
    return res
}

console.log(JSON.stringify(preorderTraversal(root)));

/**
 * 通过栈实现后序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
const postorderTraversal = function (root) {
    const res = []
    if (!root) return res
    const stack = []
    stack.push(root)
    while (stack.length) {
        const top = stack.pop()
        res.unshift(top.val)
        if (top.left) {
            stack.push(top.left)
        }
        if (top.right) {
            stack.push(top.right)
        }
    }
    return res
}

console.log(JSON.stringify(postorderTraversal(root)));

/**
 * 用栈实现中序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = function (root) {
    const res = []
    const stack = []
    if (!root) return res
    // 用一个cur结点充当游标
    let cur = root
    while (cur || stack.length) {
        while (cur) {
            // 将途径的结点存放在栈
            stack.push(cur)
            cur = cur.left
        }
        // 要把栈顶元素赋给游标
        cur = stack.pop()
        res.push(cur.val)
        // if (top.right) {
        //     stack.push(top.right)
        // }
        cur = cur.right
    }
    return res
}

console.log(JSON.stringify(inorderTraversal(root)));

/**
 * 层序遍历+BFS+队列（理解程度低）
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = function (root) {
    // 初始化结果数组
    const res = []
    // 处理边界条件
    if (!root) {
        return res
    }
    // 初始化队列
    const queue = []
    // 队列第一个元素是根结点
    queue.push(root)
    // 当队列不为空时，反复执行以下逻辑
    while (queue.length) {
        // level 用来存储当前层的结点
        const level = []
        // 缓存刚进入循环时的队列长度，这一步很关键，因为队列长度后面会发生改变
        const len = queue.length
        // 循环遍历当前层级的结点
        for (let i = 0; i < len; i++) {
            // 取出队列的头部元素
            const top = queue.shift()
            // 将头部元素的值推入 level 数组
            level.push(top.val)
            // 如果当前结点有左孩子，则推入下一层级
            if (top.left) {
                queue.push(top.left)
            }
            // 如果当前结点有右孩子，则推入下一层级
            if (top.right) {
                queue.push(top.right)
            }
        }
        // 将 level 推入结果数组
        res.push(level)
    }
    // 返回结果数组
    return res
};


/**
 * 反转二叉树
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const invertTree = function (root) {
    if (!root) return root
    let right = invertTree(root.right)
    let left = invertTree(root.left)
    root.right = left
    root.left = right
    return root
}

/**
 * 二叉搜索树
 * @param {*} root 
 * @param {*} n 
 */
function search(root, n) {
    if (!root) return root
    if (root.val === n) {
        console.log(root, '搜索目标值');
    } else if (root.val < n) {
        search(root.left, n)
    } else {
        search(root.right, n)
    }
}

/**
 * 二叉搜索树进行插入
 * @param {*} root 
 * @param {*} n 
 */
function insertIntoBST(root, n) {
    if (!root) {
        root = new TreeNode(n)
        return root
    }

    // if (root.val < 0) {
    if (root.val < n) {
        // 当前结点值小于n，继续向右查找。
        root.right = insertIntoBST(root.right, n)
    } else {
        root.left = insertIntoBST(root.left, n)
    }
    return root
}

/**
 * 二叉搜索树删除节点
 * @param {*} root 
 * @param {*} n 
 */
function deleteNode(root, n) {
    if (!root) return root
    // 删除结点，第一步定位结点
    if (root.val === n) {
        //找到结点后做进一步删除操作
        if (!root.left && !root.right) {
            root = null
        } else if (root.left) {
            const maxLeft = findMax(root)
            root.val = maxLeft.val
            // root.left = deleteNode(root, n)
            // 将当前结点最大值放入
            root.left = deleteNode(root, maxLeft.val)
        } else {
            const minRight = findMin(root)
            root.right = deleteNode(root, minRight.val)
        }
        // 没有找到结点根据找寻值从对应分支去查找 
    } else if (root.val < n) {
        // root.right = deleteNode(root, n)
        // 当前结点没找到，要从其对应的子树去查询
        root.right = deleteNode(root.right, n)
    } else {
        root.left = deleteNode(root.left, n)
    }
    return root
}

/**
 * 寻找左树最大节点
 * @param {*} root 
 * @returns 
 */
function findMax(root) {
    while (root.right) {
        root = root.right
    }
    return root
}

/**
 * 寻找右树最小节点
 * @param {*} root 
 * @returns 
 */
function findMin(root) {
    while (root.left) {
        root = root.left
    }
    return root
}

/**
 * 判断是否有效搜索二叉树
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function (root) {
    function dfs(root, minValue, maxValue) {
        if (!root) return true
        // 若右孩子不大于根结点值，或者左孩子不小于根结点值，则不合法
        if (root.val <= minValue || root.val >= maxValue) return false
        // 左右子树【必须】都符合二叉搜索树的数据域大小关系
        return dfs(root.left, minValue, root.val) && dfs(root.right, root.val, maxValue)
    }
    return dfs(root, -Infinity, Infinity)
}

/**
 * 排序数组转换为平衡二叉树
 * @param {number[]} nums
 * @return {TreeNode}
 */
const sortedArrayToBST = function (nums) {
    if (!nums.length) return null
    // 存放索引长度
    // 为什么存放的是索引，而不是具体值。因为取具体值后，中值无法锁定
    const root = buildBST(0, nums.length - 1)

    function buildBST(min, max) {
        if (min > max) return null
        // 注意中值一定要取值准确
        // const mid = Math.floor(min, (max - min) / 2)
        const mid = Math.floor(min + (max - min) / 2)
        // 需要当前值作为根节点，而不是索引
        // const cur = new TreeNode(mid)
        const cur = new TreeNode(nums[mid])
        // 注意索引值范围,不包含mid
        // cur.left = buildBST(min, mid)
        cur.left = buildBST(min, mid - 1)

        // cur.right = buildBST(mid, right)
        cur.right = buildBST(mid + 1, max)

        return cur
    }
    // return buildBST(nums[0], nums[nums.length - 1])
    return root
}

console.log(JSON.stringify(sortedArrayToBST([-10, -3, 0, 5, 9])));

/**
 * 是否为平衡二叉搜索树
 * @param {*} root 
 */
const isBalanced = function (root) {
    let flag = true

    function dfs(root) {
        if (!root || !flag) {
            return 0
        }
        const right = dfs(root.right)
        const left = dfs(root.left)
        console.log(right, left)
        // 注意取绝对值
        if (Math.abs(left - right) > 1) {
            flag = false
            return 0
        }
        return Math.max(left, right) + 1
    }

    // return dfs(root)
    // 注意返回的是是否为平衡树
    dfs(root)
    return flag
}

const root1 = {
    val: 1,
    left: {
        val: 0,
        left: {
            val: -1,
            left: null
        }
    }
}
console.log(isBalanced(root1));

/**
 * 将一颗二叉树构建成平衡二叉树
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const balanceBST = function (root) {
    const nums = []

    function inorder(root) {
        if (!root) return
        inorder(root.left)
        nums.push(root.val)
        inorder(root.right)
    }

    inorder(root)
    // 平衡
    function buildAVL(low, high) {
        if (low > high) return null
        const mid = Math.floor(low + (high - low) / 2)
        const cur = new TreeNode(nums[mid])
        cur.left = buildAVL(low, mid - 1)
        cur.right = buildAVL(mid + 1, high)
        return cur
    }

    return buildAVL(0, nums.length - 1)
}

console.log(JSON.stringify(balanceBST(root1)));