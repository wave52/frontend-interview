// 编程题，找出字符串中连续出现最多的字符和个数（蘑菇街）
// 'abcaakjbb' => {'a':2,'b':2}
// 'abbkejsbcccwqaa' => {'c':3}
function findLongChar(str) {
  var arr = str.split('');
  var map = {};
  var max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (map[arr[i]]) {
      if (i === 0 || arr[i - 1] !== arr[i]) {
        map[arr[i]] = 1;
      } else {
        map[arr[i]] += 1;
      }
    } else {
      map[arr[i]] = 1;
    }
    if (map[arr[i]] > max) {
      max = map[arr[i]];
    }
  }
  var result = {};
  for (let k in map) {
    if (map[k] === max) {
      result[k] = map[k];
    }
  }
  return result;
}

console.log(findLongChar('abcaakjbb'));
console.log(findLongChar('abbkejsbcccwqaa'));

// 网上的一些方法
const arr = 'abcaakjbb'.match(/(\w)\1*/g);
const arr2 = 'aaasdofjaopfjopaiiisjssfopiasdfffff'.match(/(.)\1+/g);
const maxLen = Math.max(...arr.map(s => s.length));
const result = arr.reduce((pre, curr) => {
  if (curr.length === maxLen) {
    pre[curr[0]] = curr.length;
  }
  return pre;
}, {});

console.log(arr, arr2);
console.log('23123132'[2]);
