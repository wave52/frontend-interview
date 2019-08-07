function sum(...arg) {
  var result = arg.reduce((a, b) => a + b);
  var add = (...others) => {
    result = others.reduce((a, b) => a + b, result);
    add.toString = () => result;
    return add;
  };
  return add();
}

console.log(sum(1, 2)(3)(4, 5));
