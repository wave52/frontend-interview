// 111. 编程题，写个程序把 entry 转换成如下对象
var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd',
      },
    },
    d: {
      xx: 'adxx',
    },
    e: 'ae',
  },
};

// 要求转换成如下对象
var output = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae',
};

function transform(entry) {
  var output = {};
  function traversal(obj, name) {
    var temp = name;
    for (let k in obj) {
      name = (temp ? temp + '.' : '') + k;
      if (typeof obj[k] === 'string') {
        output[name] = obj[k];
      } else {
        traversal(obj[k], name);
      }
    }
  }
  traversal(entry, '');
  return output;
}

// console.log(transform(entry));

// 112.与111相反
function transform2(obj) {
  var result = {};
  for (let k in obj) {
    var ks = k.split('.');
    var temp = result; // 引用
    for (let i = 0; i < ks.length; i++) {
      if (i === ks.length - 1) {
        temp[ks[i]] = obj[k];
      } else {
        if (temp[ks[i]]) {
          // 存在的话维持对象引用
          temp[ks[i]] = temp[ks[i]];
        } else {
          // 不存在则新建一个对象
          temp[ks[i]] = {};
        }
      }
      temp = temp[ks[i]];
    }
  }
  return result;
}

console.log(transform2(output));
