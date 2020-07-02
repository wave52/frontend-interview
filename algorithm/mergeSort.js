const arr1 = [];

// 生成随机整数
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成len长度的随机数组
function generateArr(len) {
  for (var i = 0; i < len; i++) {
    arr1.push(random(1, len));
  }
}

function mergeSort(arr) {
  //采用自上而下的递归方法
  var len = arr.length;
  if (len < 2) {
    return arr;
  }
  var middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  var result = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) result.push(left.shift());

  while (right.length) result.push(right.shift());

  return result;
}

generateArr(100000); // 太大了就不行了？

console.time('standard');
mergeSort(arr1);
console.timeEnd('standard');
