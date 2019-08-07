// 不用加减乘除运算符，求整数的7倍
function seven(num) {
  let arr = Array(num);
  let resultArr = [...arr, ...arr, ...arr, ...arr, ...arr, ...arr, ...arr];
  return resultArr.length;
}

function seven2(num) {
  return parseInt(`${num.toString(7)}0`, 7);
}

function seven2(num) {
  return parseInt(`${num.toString(7)}0`, 7);
}

// 位运算
// 左移3位 相当于乘8 然后再减去自己 不就是7倍了吗
// 减法：-n = ~(n - 1) = ~n+1
// 乘法：n * 7 = n<<3 - n = n<<3 + ~n + 1
// 实现加法
// 递归实现
function add(m, n) {
  return n ? add(m ^ n, (m & n) << 1) : m;
}

// 迭代实现
function add2(m, n) {
  while (m) {
    // 直到没有进位
    [m, n] = [(m & n) << 1, m ^ n];
  }
  return n;
}

function seven3(num) {
  return add2(n << 3, add2(~n, 1));
}

console.log(seven(10));
console.log(seven2(11));
console.log(seven2(12));

// 扩展：整数n的m倍
function multi(n, m) {
  var i = 0;
  var res = 0;
  while (m != 0) {
    // 乘数为0则结束
    // 处理乘数当前位
    if ((m & 1) === 1) {
      res = add(res, n << i);
      m = m >> 1;
      i = add(1, i); // i记录当前位是第几位
    } else {
      m = m >> 1;
      i = add(1, i);
    }
  }
  return res;
}

console.log(multi(11, 9));
