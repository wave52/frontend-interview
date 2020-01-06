## what output is

# 1

```javascript
['1', '2', '3'].map(parseInt);
```

结果 [1, NaN, NaN]

# 2

```javascript
var obj = {
  '2': 3,
  '3': 4,
  length: 2,
  splice: Array.prototype.splice,
  push: Array.prototype.push,
};
obj.push(1);
obj.push(2);
console.log(obj);
```

结果：[,,1,2], length 为 4

# 3

```javascript
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

console.log(a.x);
console.log(b.x);
```

结果:

undefined

{n:2}

<!-- a.x 其实是 { n: 1 }.x，但 a 重新复制以后，{ n: 1 } 不在了 -->

# 4

```javascript
function changeObjProperty(o) {
  o.siteUrl = 'http://www.baidu.com';
  o = new Object();
  o.siteUrl = 'http://www.google.com';
}
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
```

结果:

"http://www.baidu.com"

<!--
形参就像o1
var o = {}

var o1 = o
o.name = "张三"
o1 = {}
o1.name = "李四"

console.log(o.name)

 -->

# 5

```javascript
function Foo() {
  Foo.a = function() {
    console.log(1);
  };
  this.a = function() {
    console.log(2);
  };
}
Foo.prototype.a = function() {
  console.log(3);
};
Foo.a = function() {
  console.log(4);
};
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
```

结果:

4, 2, 1

# 6

```javascript
String('11') == new String('11');
String('11') === new String('11');
```

结果:

true

false

# 7

```javascript
1 + '1';

2 * '2';

[1, 2] + [2, 1];

'a' + +'b';
```

结果:

11

4

1,22,1

aNaN

# 8

```javascript
[3, 15, 8, 29, 102, 22].sort();
```

结果: [102, 15, 22, 29, 3, 8]
