// utils
function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

function isFunction(obj) {
  return typeof obj === 'function';
}

// 深度优先
// ❌ 没考虑循环引用
function DfsDeepClone(obj) {
  var newObj;
  if (isObject(obj)) {
    newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      newObj[key] = DfsDeepClone(obj[key]);
    }
  } else if (isFunction(obj)) {
    newObj = eval('(' + obj.toString() + ')');
  } else {
    newObj = obj;
  }
  return newObj;
}
// ✅ 使用一个数组记录循环引用
function DfsDeepClone(obj, visitedArr = []) {
  var newObj;
  if (isObject(obj)) {
    // 我一般不用 indexOf 判断数组中某个对象存不存在，但这里引用相同所以可以判断，可总觉得别扭
    let index = visitedArr.indexOf(obj);
    newObj = Array.isArray(obj) ? [] : {};
    if (~index) {
      newObj = visitedArr[index];
    } else {
      visitedArr.push(obj);
      for (let key in obj) {
        newObj[key] = DfsDeepClone(obj[key], visitedArr);
      }
    }
  } else if (isFunction(obj)) {
    newObj = eval('(' + obj.toString() + ')');
  } else {
    newObj = obj;
  }
  return newObj;
}

// ✅ 使用一个WeakMap记录循环引用
function DfsDeepClone(obj, wm = new WeakMap()) {
  var newObj;
  if (isObject(obj)) {
    newObj = Array.isArray(obj) ? [] : {};
    if (wm.has(obj)) {
      newObj = wm.get(obj);
    } else {
      wm.set(obj);
      for (let key in obj) {
        newObj[key] = DfsDeepClone(obj[key], wm);
      }
    }
  } else if (isFunction(obj)) {
    newObj = eval('(' + obj.toString() + ')');
  } else {
    newObj = obj;
  }
  return newObj;
}

// 广度优先
// ❌ 没考虑循环引用
function BfsDeepClone(obj) {
  const queue = [];
  const newObjQueue = [];
  var newObj = {};
  queue.push(obj);
  newObjQueue.push(newObj);
  while (queue.length > 0) {
    var item = queue.shift();
    var newItem = newObjQueue.shift();
    if (isObject(item)) {
      for (let key in item) {
        if (isObject(item[key])) {
          newItem[key] = Array.isArray(item[key]) ? [] : {};
          queue.push(item[key]);
          newObjQueue.push(newItem[key]);
        } else if (isFunction(item[key])) {
          newItem[key] = eval('(' + item[key].toString() + ')');
        } else {
          newItem[key] = item[key];
        }
      }
    } else if (isFunction(item)) {
      newObj = eval('(' + item.toString() + ')');
    } else {
      newObj = item;
    }
  }
  return newObj;
}

// ✅ 使用一个WeakMap记录循环引用
function BfsDeepClone(obj) {
  const queue = [];
  const newObjQueue = [];
  var newObj = {};
  queue.push(obj);
  newObjQueue.push(newObj);
  var wm = new WeakMap();
  var newWm = new WeakMap();
  while (queue.length > 0) {
    var item = queue.shift();
    var newItem = newObjQueue.shift();
    wm.set(item);
    if (isObject(item)) {
      for (let key in item) {
        var temp = item[key];
        if (isObject(temp)) {
          newItem[key] = Array.isArray(temp) ? [] : {};
          if (wm.has(temp)) {
            newItem[key] = newWm.get(temp);
            wm.set(newItem);
          } else {
            queue.push(temp);
            newObjQueue.push(newItem[key]);
          }
        } else if (isFunction(temp)) {
          newItem[key] = eval('(' + temp.toString() + ')');
        } else {
          newItem[key] = temp;
        }
      }
      // 将已经处理过的对象放入WeakMap
      newWm.set(newItem);
    } else if (isFunction(item)) {
      newObj = eval('(' + item.toString() + ')');
    } else {
      newObj = item;
    }
  }
  return newObj;
}

let circleObj = {
  a: 1,
  b: () => console.log(1),
  c: {
    d: 3,
    e: 4,
  },
  f: [1, 2],
  und: undefined,
  nul: null,
  foo: {
    name: function() {
      console.log(1);
    },
    bar: {
      name: 'bar',
      baz: {
        name: 'baz',
        aChild: null, // 待会让它指向obj.foo
      },
    },
  },
};

// 循环引用
circleObj.foo.bar.baz.aChild = circleObj.foo;

var circleObjCopy = DfsDeepClone(circleObj);
var circleObjCopy1 = BfsDeepClone(circleObj);

// 测试深拷贝
circleObj.c.d = 9999;
console.log(circleObjCopy, circleObjCopy1);
