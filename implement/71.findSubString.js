// 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。
const find = (S, T) => {
  if (S.length < T.length) return -1;
  for (let i = 0; i < S.length - T.length; i++) {
    if (S.substr(i, T.length) === T) return i;
  }
  return -1;
};

const find2 = function(s, t) {
  let n = s.length;
  let m = t.length;
  if (!n || !m || n < m) return -1;
  for (let i = 0; i < n; i++) {
    let j = 0;
    let k = i;
    if (s[k] === t[j]) {
      k++;
      j++;
      while (k < n && j < m) {
        if (s[k] !== t[j]) break;
        else {
          k++;
          j++;
        }
      }
      if (j === m) return i;
    }
  }
  return -1;
};

console.log(find('fjiuehgjifjdjfl', 'ueh'));
console.log(find2('fjiuehgjifjdjfl', 'ueh'));
