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

<details>
  <summary>
    <b>答案</b>
  </summary>
  <p>
    234<br/>
    234
  </p>
</details>

---

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
foo.bar();
(foo.bar)();
((foo.bar = foo.bar))();
(foo.bar, foo.bar)();
```

<details>
  <summary>
    <b>答案</b>
  </summary>
  <p>
    20<br />
    20<br />
    10<br />
    10<br />
  </p>
</details>

---

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

<details>
  <summary>
    <b>答案</b>
  </summary>
  <p>
    undefined<br />
    null<br />
    C{}<br />
    B{showThis:f}<br />
  </p>
</details>

---

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

<details>
  <summary>
    <b>答案</b>
  </summary>
  <p>
    10<br />
    2<br />
  </p>
</details>

---

## 5

```javascript
var x = 100;
function A() {
  this.x = 10;
  this.foo = function() {
    console.log(this.x)
  }
}
var a = new A();
a.foo.call(null);
```

<details>
  <summary>
    <b>答案</b>
  </summary>
  <p>
    100<br />
  </p>
</details>

---
