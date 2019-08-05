// 下面代码中 a 在什么情况下会打印 1？
// var a = ?;
if (a == 1 && a == 2 && a == 3) {
  console.log(1);
}

var a = {
  i: 1,
  toString() {
    return a.i++;
  },
};

// 有点像add那道题
