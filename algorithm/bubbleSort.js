// 原始版
function bubbleSort(arr) {
  let i = arr.length - 1;
  while(i > 0) {
		for(let j = 0; j < i; j++) {
			if(arr[j] > arr[j + 1]) {
				[arr[j], arr[j+1]] = [arr[j+1], arr[j]];
			}
    }
    i--
	} 
  return arr
}

// 改进版
function bubbleSort1(arr) {
  let i = arr.length - 1;
  while (i > 0) {
    let pos = 0;
		for(let j = 0; j < i; j++) {
			if(arr[j] > arr[j+1]) {
        pos = j;
				[arr[j], arr[j+1]] = [arr[j+1], arr[j]];
			}
    }
    i = pos;
	} 
  return arr
}

// 生成从l到r的数量为n的随机数组
function randomArr (n, l, r) {
  let arr = [];
  for (let i = 0; i < n; i++) {
      let _random = Math.round(l + Math.random() * (r - l));
      arr.push(_random)
  } 
  return arr;
}

var arr = randomArr(100, 1, 1000)
var a = arr.concat();
var b = arr.concat();

console.time('time1')
console.log(bubbleSort1(a));
console.timeEnd('time1')

console.time('time')
console.log(bubbleSort(b));
console.timeEnd('time')
