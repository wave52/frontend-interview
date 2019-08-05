// 实现 promise

// Promise A+ 规范：https://promisesaplus.com/
// Promise A+ 规范中文：http://malcolmyu.github.io/malnote/2015/06/12/Promises-A-Plus/

// 最佳实践：
// https://github.com/then/promise
// https://github.com/taylorhakes/promise-polyfill

// 教程：https://yq.aliyun.com/articles/613412

// 我的实现：

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class Promise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放法数组
    this.onRejectedCallbacks = [];

    let resolve = value => {
      // pending时才会转换状态
      if (this.state === PENDING) {
        this.state = FULFILLED;
        // 存储成功的值
        this.value = value;
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = reason => {
      // pending时才会转换状态
      if (this.state === PENDING) {
        this.state = FULFILLED;
        // 存储失败的原因
        this.reason = reason;
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    // 如果executor执行报错，直接执行reject
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : err => {
            throw err;
          };
    // 声明返回的promise2
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        // onFulfilled需异步 asap了解一下
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.state === REJECTED) {
        // 异步
        setTimeout(() => {
          // 如果报错
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用报错
  if (x === promise2) {
    // reject报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 防止多次调用
  let called;
  // x不是null 且x是对象或者函数
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // A+规定，声明then = x的then方法
      let then = x.then;
      // 如果then是函数，就默认是promise了
      if (typeof then === 'function') {
        // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
        then.call(
          x,
          y => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise2, y, resolve, reject);
          },
          err => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err); // 失败了就失败了
          }
        );
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了那就不要在继续执行了
      reject(e);
    }
  } else {
    resolve(x);
  }
}

// 其他方法：注意区分类方法和原型方法
//resolve方法
Promise.resolve = function(val) {
  return new Promise((resolve, reject) => {
    resolve(val);
  });
};
//reject方法
Promise.reject = function(val) {
  return new Promise((resolve, reject) => {
    reject(val);
  });
};
// catch方法
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};
// finally
Promise.prototype.finally = function(f) {
  return this.then(
    function(value) {
      return Promise.resolve(f()).then(function() {
        return value;
      });
    },
    function(err) {
      return Promise.resolve(f()).then(function() {
        throw err;
      });
    }
  );
};
//race方法
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function(promises) {
  let arr = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(data => {
        arr[i] = data;
        count++;
        if (count == promises.length) {
          resolve(arr);
        }
      }, reject);
    }
  });
};

// done
Promise.prototype.done = function(onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function(err) {
    setTimeout(function() {
      throw err;
    }, 0);
  });
};

// any https://github.com/tc39/proposal-promise-any
Promise.any = function(promises) {
  const result = [];
  return Promise.all(
    promises.map(promise => {
      // 控制Promise.all处理的所有的promise都执行resolve决议
      return Promise.resolve(promise).then(
        res => {
          // 但是只记录实际上决议为resolve的结果值
          result.push(res);
        },
        () => {
          // 防止穿透，这里可以进行拒绝信息的返回
        }
      );
    })
  ).then(() => {
    return new Promise((resolve, reject) => {
      if (result.length > 0) resolve(result);
      else reject(result);
    });
  });
};

// allSettled https://github.com/tc39/proposal-promise-allSettled
Promise.allSettled = function(promises) {
  return Promise.all(
    promises.map(promise => {
      return Promise.resolve(promise)
        .then(value => {
          return { status: 'fulfilled', value: value };
        })
        .catch(function(reason) {
          return { status: 'rejected', reason: reason };
        });
    })
  );
};

/****************** 测试数据 *******************/
var myPromise = new Promise(function(resolve, reject) {
  // 当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
  // 在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
  console.log('----------------- 流程开始 --------------------');
  setTimeout(function() {
    resolve('promise初始化resolve成功!'); // 代码正常执行！
  }, 500);
});
myPromise
  .then(function(successMessage) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        console.log('myPromise then 1 收到 resolveMessage:' + successMessage);
        reject('from then 1');
      }, 3000);
    });
  })
  .then(
    function(successMessage) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          console.log('myPromise then 2 收到 resolveMessage:' + successMessage);
          resolve('from then 2');
        }, 2000);
      });
    },
    function(failMessage) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          console.log('myPromise then 2 收到 rejectMessage:' + failMessage);
          resolve('from then 2');
        }, 1000);
      });
    }
  )
  .then(function(successMessage) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        console.log('myPromise then 3 收到 resolveMessage:' + successMessage);
        reject('from then 3');
      }, 1000);
    });
  })
  .catch(function(error) {
    console.log('caught rejected data:');
    console.log(error);
  })
  .finally(function() {
    console.log('-----------全部处理完毕！-----------');
  });
