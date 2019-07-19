// 请把俩个数组 [A1, A2, B1, B2, C1, C2, D1, D2] 和 [A, B, C, D]，合并为 [A1, A2, A, B1, B2, B, C1, C2, C, D1, D2, D]
var arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
var arr2 = ['A', 'B', 'C', 'D'];
function merge(arr1, arr2) {
  var arr3 = arr1.concat();
  var i = 0;
  while(i < arr2.length) {
    for(var j = 0; j <= arr3.length - 1; j++) {
      if (
        arr2[i].charAt(0) === arr3[j].charAt(0)
        && (j + 1 === arr3.length || arr2[i].charAt(0) !== arr3[j + 1].charAt(0))
      ) {
        arr3.splice(j + 1, 0, arr2[i])
        break;
      }
    }
    i++;
  }
  return arr3;
}

var arr3 = merge(arr1, arr2);

console.log(arr3);
