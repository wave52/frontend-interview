const arr = [];

// 生成随机整数
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成len长度的随机数组
function generateArr(len) {
  for (var i = 0; i < len; i++) {
    arr.push(random(1, len));
  }
}

const sort = (function () {
  // 默认状态下的比较函数
  function compare(a, b) {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }
  // 原地交换函数，而非用临时数组
  function swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]];
  }

  // 0  1  2  3  4
  // 30 20 40 10 50
  // => array = [30,20,40,10,50], i=0, j=4, pivot=20
  // => i:0, j:3 => 10 20 40 30 50 => return i=2
  // => left: 10 20, right: 40 30 50
  // => 分析right, array = [10,20,40,30,50], i:2, j:4, privot=10
  // => i:2, j:3 => 10 20 30 40 50 => return i=3

  // 分治函数
  function partition(array, left, right) {
    // 用index取中间值而非splice
    const pivot = array[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
      while (compare(array[i], pivot) === -1) {
        i++;
      }
      while (compare(array[j], pivot) === 1) {
        j--;
      }
      if (i <= j) {
        swap(array, i, j);
        i++;
        j--;
      }
    }
    return i;
  }
  // 快排函数
  function quick(array, left, right) {
    let index;
    if (array.length > 1) {
      index = partition(array, left, right);
      if (left < index - 1) {
        quick(array, left, index - 1);
      }
      if (index < right) {
        quick(array, index, right);
      }
    }
    return array;
  }
  return function quickSort(array) {
    return quick(array, 0, array.length - 1);
  };
})();

// 阮一峰版快排
var quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }

  var pivotIndex = Math.floor(arr.length / 2);

  var pivot = arr.splice(pivotIndex, 1)[0];

  var left = [];

  var right = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat([pivot], quickSort(right));
};

generateArr(1000000);

console.time('ryf');
quickSort(arr);
console.timeEnd('ryf');

console.time('standard');
sort(arr);
console.log(arr);
console.timeEnd('standard');
