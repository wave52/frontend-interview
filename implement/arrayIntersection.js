// 给定两个数组，写一个方法来计算它们的交集。
// var a = [1, 2, 2, 1]; var b = [2, 2]; result = [2, 2];
// var a = [1, 2, 2, 1]; var b = [2]; result = [2];
// var a = [1, 2, 2, 1]; var b = [3, 2, 4, 4]
// 与 lodash 的 intersection 有所不同，它第一个例子result = [2]
const intersect = (nums1, nums2) => {
  const map = {};
  const res = [];
  for (let n of nums1) {
    if (map[n]) {
      map[n]++;
    } else {
      map[n] = 1;
    }
  }
  for (let n of nums2) {
    if (map[n] > 0) {
      res.push(n);
      map[n]--;
    }
  }
  return res;
};

console.log(intersect([1, 2, 2, 1], [2, 2]));
console.log(intersect([1, 2, 2, 1], [2]));
console.log(intersect([3, 2, 4, 4], [1, 2, 2, 1]));
console.log(intersect([1, 1], [1]));
console.log(intersect([1], [1, 1]));
