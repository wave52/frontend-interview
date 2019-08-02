## what output is

# 1

```javascript
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```

结果：[,,1,2], length 为 4

# 2

```javascript
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x)
console.log(b.x)
```

结果:

undefined

{n:2}

# 3

```javascript
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
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

```javascript
function Foo() {
    Foo.a = function() {
        console.log(1)
    }
    this.a = function() {
        console.log(2)
    }
}
Foo.prototype.a = function() {
    console.log(3)
}
Foo.a = function() {
    console.log(4)
}
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
```

结果:

4, 2, 1


```javascript

String('11') == new String('11');
String('11') === new String('11');

```

结果:

true

false
