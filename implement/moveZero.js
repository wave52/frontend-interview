// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
// 示例
// 输入: [0,1,0,3,12]
// 输出: [1,3,12,0,0]
// 我的
function moveZero(arr) {
  let i = 0;
  let j = 0; // 记录0个数
  while (i < arr.length) {
    if (arr[i] === 0) {
      j++;
      arr.splice(i, 1);
      if (arr[i] === 0) {
        // 解决连续0
        i = i;
        continue;
      }
    }
    i++;
  }
  arr.push(...new Array(j).fill(0));
  return arr;
}

console.log(moveZero([0, 1, 0, 3, 12]));
console.log(moveZero([0, 0, 1, 3, 12]));

// 网上比较好的
// 设定一个慢指针一个快指针，快指针每次+1， 当慢指针的值不等于0的时候也往后移动，当慢指针等于0并且快指针不等于0的时候，交换快慢指针的值，慢指针再+1
function moveZero2(arr) {
  let i = 0;
  let j = 0;
  while (j < arr.length) {
    if (arr[i] !== 0) {
      i++;
    } else if (arr[j] !== 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
    j++;
  }
  return arr;
}

console.log(moveZero2([0, 1, 0, 3, 12]));
console.log(moveZero2([0, 0, 1, 3, 12]));
