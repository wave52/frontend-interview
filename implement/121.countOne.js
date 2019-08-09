/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 09:52:21
 * @LastEditTime: 2019-08-09 14:01:33
 * @LastEditors: Please set LastEditors
 */
function countOne(n) {
  var factor = 1;
  let count = 0;
  let next = parseInt(n / factor);
  while (next !== 0) {
    var lower = n - next * factor;
    var curr = next % 10;
    var high = parseInt(n / (10 * factor));

    if (curr === 0) {
      count += high * factor;
    } else if (curr === 1) {
      count += high * factor + lower + 1;
    } else {
      count += (high + 1) * factor;
    }

    factor *= 10;
    next = parseInt(n / factor);
  }
  return count;
}

console.time('count');
console.log(countOne(4000000));
console.timeEnd('count');
