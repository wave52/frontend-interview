// 背包问题

// 部分背包问题
// 部分背包问题的物品是连续的,比如豆子,粉末,布匹
// 物品   A    B    C    D
// 价格   50   140  60   60
// 重量   5    20   10   12
// 比率   10   7    6    5
// 假设背包可容纳 30 ,问最多能得到多少价值的物品
// 贪心算法,将物品按比率降序排,依次尽可能多的放入
function ksack(values, weights, capacity) {
  var load = 0;
  var i = 0;
  var w = 0;

  while (load < capacity && i < 4) {
    if (weights[i] <= capacity - load) {
      w += values[i];
      load += weights[i];
    } else {
      var r = (capacity - load) / weights[i];
      w += r * values[i];
      load += weights[i];
    }
    ++i;
  }
  return w;
}

var values = [50, 140, 60, 60];
var weights = [5, 20, 10, 12];
var capacity = 30;
console.log(ksack(values, weights, capacity));

// 0-1 背包问题
// 0-1 背包问题属于离散背包问题,物品是不能拆分的,每种物品只有一件,非 0 即 1
// 保险箱中有5件物品,它们的尺寸分别是3, 4, 7, 8, 9,而它们的价值分别是4, 5, 10, 11, 13,且背包的容积为 16,问最多可放多少价值的物品
// utils
function max(a, b) {
  return a > b ? a : b;
}

// 递归
function knapsack(values, sizes, capacity, n) {
  if (n === 0 || capacity === 0) {
    return 0;
  }
  if (sizes[n - 1] > capacity) {
    return knapsack(values, sizes, capacity, n - 1);
  } else {
    return max(
      values[n - 1] + knapsack(values, sizes, capacity - sizes[n - 1], n - 1),
      knapsack(values, sizes, capacity, n - 1)
    );
  }
}

var values = [4, 5, 10, 11, 13];
var sizes = [3, 4, 7, 8, 9];
var capacity = 16;
var n = 5;
console.log(knapsack(values, sizes, capacity, n));

// 动态规划
function dKnapsack(values, sizes, capacity, n) {
  var k = [];
  for (var i = 0; i <= n + 1; i++) {
    k[i] = [];
  }
  for (var i = 0; i <= n; i++) {
    for (var w = 0; w <= capacity; w++) {
      if (i == 0 || w == 0) {
        k[i][w] = 0;
      } else if (sizes[i - 1] > w) {
        k[i][w] = k[i - 1][w];
      } else {
        k[i][w] = max(values[i - 1] + k[i - 1][w - sizes[i - 1]], k[i - 1][w]);
      }
    }
  }
  console.log('状态表:\n', k);
  return k[n][capacity];
}

// 数据同上
console.log(dKnapsack(values, sizes, capacity, n));

// 空间压缩优化
// TODO

// 完全背包问题
// 每种物品都有无限件
// TODO

// 多重背包问题
// 每种物品可能有几件
// 把相同物品看成不同物品,转化为0-1背包问题
// TODO
