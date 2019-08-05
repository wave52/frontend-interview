// 编程题，根据以下要求，写一个数组去重函数（蘑菇街）
// 1.如传入的数组元素为[123, "meili", "123", "mogu", 123]，则输出：[123, "meili", "123", "mogu"]
// 2.如传入的数组元素为[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]，则输出：[123, [1, 2, 3], [1, "2", 3], "meili"]
// 3.如传入的数组元素为[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]，则输出：[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]

// 对象键可能顺序不同 TODO:
function deepFilter(arr) {
  var a = [];
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'object') {
      let aStr = JSON.stringify(arr[i]);
      if (!a.includes(aStr)) {
        a.push(aStr);
        result.push(arr[i]);
      }
    } else {
      if (!a.includes(arr[i])) {
        a.push(arr[i]);
        result.push(arr[i]);
      }
    }
  }
  return result;
}

console.log(deepFilter([123, 'meili', '123', 'mogu', 123]));
console.log(deepFilter([123, [1, 2, 3], [1, '2', 3], [1, 2, 3], 'meili']));
console.log(
  deepFilter([
    123,
    { a: 1 },
    { a: { b: 1 } },
    { a: '1' },
    { a: { b: 1 } },
    'meili',
  ])
);
