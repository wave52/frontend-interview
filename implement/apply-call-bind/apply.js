// ES5
Function.prototype.apply2 = function(context, arr) {
  var context = context || window; //因为传进来的context有可能是null
  context.fn = this;
  var args = [];
  var params = arr || [];
  for (var i = 0; i < params.length; i++) {
    args.push('params[' + i + ']'); //不这么做的话 字符串的引号会被自动去掉 变成了变量 导致报错
  }
  args = args.join(',');

  var result = eval('context.fn(' + args + ')'); //相当于执行了context.fn(arguments[1], arguments[2]);

  delete context.fn;
  return result; //因为有可能this函数会有返回值return
};
// 使用 eval 是为了避开 Array.prototype.slice.call(arguments)

// ES6
Function.prototype.apply2 = function(context, arr) {
  context = context || window; // 因为传进来的context有可能是null
  context.fn = this;
  arr = arr || [];
  const result = context.fn(...arr); // 相当于执行了context.fn(arguments[1], arguments[2]);
  delete context.fn;
  return result; // 因为有可能this函数会有返回值return
};
