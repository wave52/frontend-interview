const co = require('./co');

// 初识 generator 生成器函数
function* g() {
  yield 1;
  yield 2;
  return 3;
}
const i = g();
console.log(i.next()); // { value: 1, done: false }
console.log(i.next()); // { value: 2, done: false }
console.log(i.next()); // { value: 3, done: true }
console.log(i.next()); // { value: undefined, done: true }

console.log('======================');

// yield 后面是表达式
function call() {
  return new Promise(resolve => setTimeout(() => resolve('result'), 1000));
}
function put(payload) {
  console.log(payload);
  return {}; // TODO
}
function* gen() {
  const result = yield call();
  yield put(result);
}
co(gen);

console.log('======================');

function wrapper(generatorFunction) {
  return function(...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

const wrapped = wrapper(function*() {
  console.log(`First input: ${yield}`);
  return 'DONE';
});

const t = wrapped();
console.log(t);
console.log(t.next('hello!'));

console.log('====================');

var gen = function* gen() {
  yield console.log('hello');
  yield console.log('world');
};

var g = gen();
g.next();

try {
  throw new Error();
} catch (e) {
  g.next();
}

console.log('===============');
