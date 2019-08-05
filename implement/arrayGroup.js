// 随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。
function arrayGroup(arr) {
  var result = [];
  var i = 0;
  while (i < arr.length) {
    let n = parseInt(arr[i] / 10, 10);
    if (!result[n]) {
      result.push([arr[i]]);
    } else if (!result[n].includes(arr[i])) {
      result[n].push(arr[i]);
    }
    i++;
  }
  return result;
}

console.log(arrayGroup([2, 10, 3, 4, 5, 11, 10, 11, 20]));
