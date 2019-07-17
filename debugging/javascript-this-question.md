# javascript this question

## 1

```javascript
var foo = 123;
function print() {
  this.foo = 234;
  console.log(foo);
}

print();
new print();
```

## 2

```javascript
var a = 10;
var foo = {
  a: 20,
  bar: function() {
    var a = 30;
    return this.a;
  },
};
foo.bar()(foo.bar)()((foo.bar = foo.bar))()(foo.bar, foo.bar)();
```

## 3

```javascript
class C {
  showThis() {
    console.log(this);
  }
}
var o = new C();
var showThis = o.showThis;

showThis();
showThis.call(null);
o.showThis();

class B {
  showThis = () => {
    console.log(this);
  };
}
var b = new B();
b.showThis();
```

## 4

```javascript
var length = 10;
function fn() {
  console.log(this.length);
}
var obj = {
  length: 5,
  methods: function(fn) {
    fn();
    arguments[0]();
  },
};
obj.methods(fn, 1);
```
