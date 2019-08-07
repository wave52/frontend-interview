# ES5 与 ES6 类、继承的区别

## 类

### 1.写法对比

```javascript
// ES6
class A {
  constructor() {
    this.a = 0;
  }
  // 类方法、静态方法
  static get1() {
    console.log(1);
  }
  // 实例方法
  get2() {
    console.log(2);
  }
  // 实例方法，会存在在新实例化的对象上
  get3 = () => {
    console.log(3);
  };
}

// ES5
function A() {
  this.a = 0;
  this.get3 = () => {
    console.log(3);
  };
}
A.get1 = function() {
  console.log(1);
};
A.prototype.get2 = function() {
  console.log(2);
};
```

### 2.区别

#### 1.class 声明会“提升”，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量(提升的说法有争议)

```javascript
const bar = new Bar(); // it's ok
function Bar() {
  this.bar = 42;
}

const foo = new Foo(); // ReferenceError: Foo is not defined
class Foo {
  constructor() {
    this.foo = 42;
  }
}
```

#### 2.class 声明内部会启用严格模式

```javascript
// 引用一个未声明的变量
function Bar() {
  baz = 42; // it's ok
}
const bar = new Bar();

class Foo {
  constructor() {
    fol = 42; // ReferenceError: fol is not defined
  }
}
const foo = new Foo();
```

#### 3.class 的所有方法（包括静态方法和实例方法）都是不可枚举的

```javascript
// 引用一个未声明的变量
function Bar() {
  this.bar = 42;
}
Bar.answer = function() {
  return 42;
};
Bar.prototype.print = function() {
  console.log(this.bar);
};
const barKeys = Object.keys(Bar); // ['answer']
const barProtoKeys = Object.keys(Bar.prototype); // ['print']

class Foo {
  constructor() {
    this.foo = 42;
  }
  static answer() {
    return 42;
  }
  print() {
    console.log(this.foo);
  }
}
const fooKeys = Object.keys(Foo); // []
const fooProtoKeys = Object.keys(Foo.prototype); // []
```

#### 4.class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用

```javascript
function Bar() {
  this.bar = 42;
}
Bar.prototype.print = function() {
  console.log(this.bar);
};

const bar = new Bar();
const barPrint = new bar.print(); // it's ok

class Foo {
  constructor() {
    this.foo = 42;
  }
  print() {
    console.log(this.foo);
  }
}
const foo = new Foo();
const fooPrint = new foo.print(); // TypeError: foo.print is not a constructor
```

#### 5.必须使用 new 调用 class

```javascript
function Bar() {
  this.bar = 42;
}
const bar = Bar(); // it's ok

class Foo {
  constructor() {
    this.foo = 42;
  }
}
const foo = Foo(); // TypeError: Class constructor Foo cannot be invoked without 'new'
```

#### 6.class 内部无法重写类名

```javascript
function Bar() {
  Bar = 'Baz'; // it's ok
  this.bar = 42;
}
const bar = new Bar();
// Bar: 'Baz'
// bar: Bar {bar: 42}

class Foo {
  constructor() {
    this.foo = 42;
    Foo = 'Fol'; // TypeError: Assignment to constant variable
  }
}
const foo = new Foo();
Foo = 'Fol'; // it's ok
```

## 继承

### 1.写法对比

```javascript
// ES6
class Super {}
class Sub extends Super {}

const sub = new Sub();

Sub.__proto__ === Super;

// ES5 继承有几种写法http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html
// 常见的有两个，原型链继承、构造函数继承
// 1.原型链继承
function Super() {}
function Sub() {}

Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

var sub = new Sub();

Sub.__proto__ === Function.prototype;

// 2.构造函数继承
function Super() {}
function Sub() {
  Super.apply(this, arguments);
}

var sub = new Sub();

Sub.__proto__ === Function.prototype;
```

### 2.区别

#### 1.ES6 子类可以直接通过 `__proto__` 寻址到父类, 而通过 ES5 的方式，`Sub.__proto__ === Function.prototype`

#### 2.ES5 和 ES6 子类 this 生成顺序不同。ES5 的继承先生成了子类实例，再调用父类的构造函数修饰子类实例，ES6 的继承先生成父类实例，再调用子类的构造函数(constructor中必须先调用super方法)修饰父类实例。这个差别使得 ES6 可以继承内置对象

```javascript
function MyES5Array() {
  Array.apply(this, arguments);
}

// it's useless
const arrayES5 = new MyES5Array(3); // arrayES5: MyES5Array {}

class MyES6Array extends Array {}

// it's ok
const arrayES6 = new MyES6Array(3); // arrayES6: MyES6Array(3) []
```
