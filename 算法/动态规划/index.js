/**
 * @author        shaodushu <shaodushu@gmail.com>
 * @date          2023-02-17 10:15:46
 * Copyright © YourCompanyName All rights reserved
 */

/**
 * 动态规划-硬币
 */
const coinChange = function (coins, amount) {
    const f = []
    f[0] = 0
    // 遍历 [1, amount] 这个区间的硬币总额 包含总金额
    // for (let i = 1; i < amount; i++) {
    for (let i = 1; i <= amount; i++) {
        // 求的是最小值，因此我们预设为无穷大，确保它一定会被更小的数更新
        f[i] = Infinity
        for (let j = 0; j < coins.length; j++) {
            // 若硬币面额小于等于目标总额
            // if (i - coins[j] > 0) {
            if (i >= coins[j]) {
                f[i] = Math.min(f[i], f[i - coins[j]] + 1)
            }

        }
    }
    if (f[amount] > Infinity) {
        return -1
    }
    return f[amount]
}

console.log(coinChange([1, 2, 5], 11));