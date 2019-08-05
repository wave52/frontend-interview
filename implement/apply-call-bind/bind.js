// ES5
Function.prototype.bind2 = function(context) {
  var _this = this;
  var argsParent = Array.prototype.slice.call(arguments, 1);
  return function() {
    var args = argsParent.concat(Array.prototype.slice.call(arguments)); //转化成数组
    _this.apply(context, args);
  };
};

// ES5 且不使用 apply、call 比较麻烦，因为不能用 xxx.prototype.call 处理 arguments，需要使用 eval，参考 apply、call

// ES6 (可以使用apply、call) 从最简单的写法开始
// ❌ 这里 bind() 返回的函数是一个箭头函数，箭头函数没有arguments，可能并不满足需要
Function.prototype.bind2 = function(...arg1) {
  return (...arg2) => {
    this.call(...arg1, ...arg2);
  };
};

// ✅ 这应该是最简单（代码最少）版本了
Function.prototype.bind2 = function(...arg1) {
  var fn = this;
  return function(...arg2) {
    fn.call(...arg1, ...arg2);
  };
};

// 把上下文体现出来，其实没啥用
Function.prototype.bind2 = function(context, ...arg1) {
  var fn = this;
  return function(...arg2) {
    fn.call(context, ...arg1, ...arg2);
  };
};

// 不使用 Rest 参数，使用 arguments
Function.prototype.bind2 = function() {
  var fn = this;
  var argsParent = [...arguments];
  return function() {
    fn.call(...argsParent, ...arguments);
  };
};

// ES6 (不可以使用apply、call)
// Rest 参数，不使用 apply、call 的代码最少版
Function.prototype.bind2 = function(context, ...arg1) {
  const context = context || window;
  context.fn = this;
  return function(...arg2) {
    context.fn(...arg1, ...arg2);
    delete context.fn;
  };
};

// arguments，不能使用 xxx.prototype.call，那就用ES6的 Array.from() 处理 arguments
Function.prototype.bind2 = function() {
  const context = arguments[0] || window;
  const argsParent = Array.from(arguments).splice(1, arguments.length - 1);
  context.fn = this;
  return function() {
    context.fn(...argsParent, ...arguments);
    delete context.fn;
  };
};

// MDN 版本
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // 与 ECMAScript 5 最接近的 // 内部 IsCallable 函数
      throw new TypeError(
        'Function.prototype.bind - what is trying ' +
          'to be bound is not callable'
      );
    }
    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function() {},
      fBound = function() {
        return fToBind.apply(
          this instanceof fNOP && oThis ? this : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments))
        );
      };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  };
}
