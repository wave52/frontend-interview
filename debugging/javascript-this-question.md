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
foo.bar();
(foo.bar = foo.bar)();
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
    o(C的实例，打印出来这样：C{})<br />
    b(B的实例，打印出来这样：B{showThis:f})<br />
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
    console.log(this.x);
  };
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

## 6

```javascript
// 1
let circle = {
  get() {
    function a() {
      let b = () => {
        console.log(this);
      };
      b();
    }
    a();
  },
};
circle.get();

// 2
var c = { c: 1 };
let circle = {
  get() {
    function a() {
      let b = () => {
        console.log(this);
      };
      b();
    }
    a.call(c);
  },
};
circle.get();

// 3
var c = { c: 1 };
let circle = {
  get() {
    function a() {
      function b() {
        console.log(this);
      }
      b();
    }
    a.call(c);
  },
};
circle.get();

// 4
let circle = {
  get() {
    let a = () => {
      console.log(this);
    };
    a();
  },
};
circle.get();

// 5
var c = { c: 1 };
let circle = {
  get() {
    let a = () => {
      console.log(this);
    };
    a.call(c);
  },
};
circle.get();

// 6
var c = { c: 1 };
let circle = {
  get() {
    let a = () => {
      console.log(this);
    };
    a();
  },
};
circle.get.call(c);

// 7
let circle = {
  get() {
    function a() {
      function b() {
        console.log(this);
      }
      return b;
    }
    return a;
  },
};
circle.get()()();
```

<details>
  <summary>
    <b>答案</b>
  </summary>
  <p>
    window<br />
    c<br />
    window<br />
    circle<br />
    circle<br />
    c<br />
    window<br />
  </p>
  <p>解析：
  1.箭头函数b的this绑定词法作用域，这里即是function a(){}，a被调用时没有调用者，所以是window<br />
  2.a被调用时调用者是c对象，所以是c<br />
  3.b不是箭头函数了，看b的调用，没有调用者，所以是window<br />
  4.箭头函数a的this绑定词法作用域，这里即是get(){}，get被调用时circle是调用者，所以是circle<br />
  5.箭头函数a的this绑定词法作用域，这里即是get(){}，get被调用时circle是调用者，所以是circle，与a调用者是谁无关<br />
  6.同上，a的this的绑定，与a调用者是谁无关，只与当前的词法作用域有关，即get的调用者有关<br />
  7.看谁调用了b
  </p>
</details>

```javascript
class A {
  constructor(dom) {
    dom.addEventListener('click', this._handle);
  }
  _handle = () => {
    console.log('what is', this);
  };
}

const btn = document.getElementById('btn');
const a = new A(btn);
```

<details>
  <summary>
    <b>答案</b>
  </summary>
  <p>
    a(A的实例)<br />
  </p>
  <p>解析：和第3题第二段代码一个意思
  </p>
</details>
