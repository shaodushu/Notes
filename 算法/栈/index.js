/**
 * @author        shaodushu <shaodushu@gmail.com>
 * @date          2023-02-15 10:23:29
 * Copyright © YourCompanyName All rights reserved
 */

/**
 * 栈-有效括号（理解程度-中等）
 */
// 用一个 map 来维护左括号和右括号的对应关系
const leftToRight = {
    "(": ")",
    "[": "]",
    "{": "}"
};

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
    // 结合题意，空字符串无条件判断为 true
    if (!s) {
        return true;
    }
    // 初始化 stack 数组
    const stack = [];
    // 缓存字符串长度
    const len = s.length;
    // 遍历字符串
    for (let i = 0; i < len; i++) {
        // 缓存单个字符
        const ch = s[i];
        // 判断是否是左括号，这里我为了实现加速，没有用数组的 includes 方法，直接手写判断逻辑
        if (ch === "(" || ch === "{" || ch === "[") stack.push(leftToRight[ch]);
        // 若不是左括号，则必须是和栈顶的左括号相配对的右括号
        else {
            // 若栈不为空，且栈顶的左括号没有和当前字符匹配上，那么判为无效
            if (!stack.length || stack.pop() !== ch) {
                return false;
            }
        }
    }
    // 若所有的括号都能配对成功，那么最后栈应该是空的
    return !stack.length;
};


/**
* 栈温度差值（理解程度低） 
* 递减栈
* @param {number[]} T
* @return {number[]}
*/
// 入参是温度数组
const dailyTemperatures = function (T) {
    const len = T.length // 缓存数组的长度 
    const stack = [] // 初始化一个栈   
    const res = (new Array(len)).fill(0) //  初始化结果数组，注意数组定长，占位为0
    for (let i = 0; i < len; i++) {
        // 若栈不为0，且存在打破递减趋势的温度值
        while (stack.length && T[i] > T[stack[stack.length - 1]]) {
            // 将栈顶温度值对应的索引出栈
            const top = stack.pop()
            // 计算 当前栈顶温度值与第一个高于它的温度值 的索引差值
            res[top] = i - top
        }
        // 注意栈里存的不是温度值，而是索引值，这是为了后面方便计算
        stack.push(i)
    }
    // 返回结果数组
    return res
};

/*********** 最小栈 *************/
/**
 * 初始化你的栈结构
 */
const MinStack = function () {
    this.stack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
// 栈的入栈操作，其实就是数组的 push 方法
MinStack.prototype.push = function (x) {
    this.stack.push(x)
};

/**
 * @return {void}
 */
// 栈的入栈操作，其实就是数组的 pop 方法
MinStack.prototype.pop = function () {
    this.stack.pop()
};

/**
 * @return {number}
 */
// 取栈顶元素，咱们教过的哈，这里我本能地给它一个边界条件判断（其实不给也能通过，但是多做不错哈）
MinStack.prototype.top = function () {
    if (!this.stack || !this.stack.length) {
        return
    }
    return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
// 按照一次遍历的思路取最小值
MinStack.prototype.getMin = function () {
    let minValue = Infinity
    const { stack } = this
    for (let i = 0; i < stack.length; i++) {
        // 遍历栈时替换存储最小值
        if (stack[i] < minValue) {
            minValue = stack[i]
        }
    }
    return minValue
};
/*********** 最小栈 *************/

/*********** 递减最小栈 *************/
const MinStack2 = function () {
    this.stack = [];
    // 定义辅助栈
    this.stack2 = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack2.prototype.push = function (x) {
    this.stack.push(x);
    // 若入栈的值小于当前最小值，则推入辅助栈栈顶
    if (this.stack2.length == 0 || this.stack2[this.stack2.length - 1] >= x) {
        this.stack2.push(x);
    }
};

/**
 * @return {void}
 */
MinStack2.prototype.pop = function () {
    // 若出栈的值和当前最小值相等，那么辅助栈也要对栈顶元素进行出栈，确保最小值的有效性
    if (this.stack.pop() == this.stack2[this.stack2.length - 1]) {
        this.stack2.pop();
    }
};

/**
 * @return {number}
 */
MinStack2.prototype.top = function () {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack2.prototype.getMin = function () {
    // 辅助栈的栈顶，存的就是目标中的最小值
    return this.stack2[this.stack2.length - 1];
};

/*********** 递减最小栈 *************/