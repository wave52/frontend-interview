// 修改以下 print 函数，使之输出 0 到 99，或者 99 到 0
// function print(n) {
//   setTimeout(() => {
//     console.log(n);
//   }, Math.floor(Math.random() * 1000));
// }
// for (var i = 0; i < 100; i++) {
//   print(i);
// }

// 1
// function print(n) {
//   setTimeout((() => {
//     console.log(n);
//     return () => {}
//   })(), Math.floor(Math.random() * 1000));
// }
// for (var i = 0; i < 100; i++) {
//   print(i);
// }

function print(n) {
  setTimeout(
    (() => {
      console.log(n);
    }).apply(n),
    Math.floor(Math.random() * 1000)
  );
}
for (var i = 0; i < 100; i++) {
  print(i);
}
