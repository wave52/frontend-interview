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

// [2,4,6,5,1,7,3] ->
//
//      2
//    /   \
//   4     6
//  / \   / \
// 5   1 7   3
//
// 1.len=7,i=3,heapify(arr, 3)
// left = 7(5的左子树), right = 8(5的右子树), largest = 3(5)
// 2.len=7,i=2,heapify(arr, 2)
// left = 5(7), right = 6(3), largest = 2(6)
// largest = 5 -> swap(arr, 2, 5) -> 交换后子树有可能不符合条件了，需要重新heapify

function buildMaxHeap(arr, n) {
  //建立大顶堆
  for (var i = Math.floor(n / 2); i >= 0; i--) {
    heapify(arr, n, i);
  }
}

function heapify(arr, n, i) {
  //堆调整
  var left = 2 * i + 1,
    right = 2 * i + 2,
    largest = i;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest != i) {
    swap(arr, i, largest);
    heapify(arr, n, largest);
  }
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function heapSort(arr) {
  var len = arr.length;
  buildMaxHeap(arr, len);

  for (var i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);

    len--;
    heapify(arr, len, 0); // 在最后输出大顶堆时只用调整最顶层堆就行
  }
  return arr;
}

generateArr(1000000);
console.log(arr);
console.time('standard');
heapSort(arr);
console.log(arr);

console.timeEnd('standard');
