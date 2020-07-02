function bsearch(a, n, value) {
  var low = 0;
  var high = n - 1;
  while (low <= high) {
    var mid = low + Math.floor((high - low) / 2);
    if (a[mid] > value) {
      high = mid - 1;
    } else if (a[mid] < value) {
      low = mid + 1;
    } else {
      if (mid == 0 || a[mid - 1] != value) return mid;
      else high = mid - 1;
    }
  }
  return -1;
}

console.log(bsearch([1, 4, 3, 1, 3, 5, 6, 2, 1], 9, 3)); // 例子不对，二分查找适合有序的！！！
