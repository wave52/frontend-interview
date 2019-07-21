// 递归
function recurFib(n) {
  if (n < 2) {
    return n;
  } else {
    return recurFib(n-1) + recurFib(n-2);
  } 
}

console.log(recurFib(1))

// 动态规划
function dynFib(n) {
  var val = [];
  for (var i = 0; i <= n + 1; ++i) {
    val[i] = 0;
  }
  val[1] = 1;
  val[2] = 1;
  for (var i = 2; i <= n + 1; ++i) {
    val[i] = val[i-1] + val[i-2]
  }
  return val[n]
}

console.log(dynFib(1))

// 迭代
function iterFib(n) {
  if (n < 2) {
    return n;
  } else {
    var last = 1;
    var nextLast = 1;
    var result = 1;
    for (var i = 2; i < n; ++i) {
      result = last + nextLast;
      nextLast = last;
      last = result;
    }
    return result;
  }
}

console.log(iterFib(1))
