/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 09:52:04
 * @LastEditTime: 2019-08-13 11:15:38
 * @LastEditors: Please set LastEditors
 */
function* genNode() {
  yield 1;
  yield 2;
}

const node = genNode();

console.log(node.next());
console.log(node.next());
console.log(node.next());

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
