// node
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setImmediate(() => {
  console.log('setImmediate');
});

setTimeout(function() {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});
process.nextTick(() => console.log('nextTick')); // 微任务

console.log('script end');

/*
script start
async1 start
async2
promise1
script end
nextTick
promise2
async1 end
setTimeout
setImmediate

node 中 async1 end 在 promise2 之后 https://v8.dev/blog/fast-async#await-under-the-hood
*/
