// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

// 自己版本
function deepFlatten(arr, result = []) {
  for (let item in arr) {
    if (Array.isArray(arr[item])) {
      deepFlatten(arr[item], result)
    } else {
      result.push(arr[item])
    }
  }
  return [...new Set(result)].sort((a, b) => a - b);
}
console.log(deepFlatten(arr))

// 网上版本
Array.prototype.flat = function() {
  return [].concat(...this.map(item => (Array.isArray(item) ? item.flat() : [item])));
}
Array.prototype.unique = function() {
  return [...new Set(this)]
}
const sort = (a, b) => a - b;
console.log(arr.flat().unique().sort(sort));

// 其实有 flat 方法， flat兼容性 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
console.log(Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b}))
