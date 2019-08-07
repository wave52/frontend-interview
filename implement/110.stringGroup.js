// 编程题，请写一个函数，完成以下功能
// 输入 '1, 2, 3, 5, 7, 8, 10' 输出 '1~3, 5, 7~8, 10'
// 我的
function transform(numStr) {
  var arr = numStr.split(', ');
  var result = arr
    .reduce((total, current) => {
      var tl = total.length;
      if (tl === 0 || !total[tl - 1].includes(`${+current - 1}`)) {
        total.push([current]);
      } else {
        total[tl - 1].push(current);
      }
      return total;
    }, [])
    .map(a => {
      if (a.length > 1) {
        return `${a[0]}~${a[a.length - 1]}`;
      } else {
        return `${a[0]}`;
      }
    })
    .join(', ');
  return result;
}

console.log(transform('1, 2, 3, 5, 7, 8, 10'));
