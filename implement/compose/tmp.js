function f1(context, next) {
	context.a = 111;
	next();
}
function f2(context, next) {
	context.b = 222;
	next();
}
function f3(context, next) {
	context.c = 333;
	next();
}
// ...

// 写一个函数compose，输入数组：[f1, f2, f3, ...fn], 输出： 函数 composedFn
// 当调用 composedFn(context) 时可以依次调用f1 f2 f3...，且在f1中执行next时调用f2, 依此类推

const compose = (middleware) => (ctx) => {
  const handle = (i) => {
      const fn = middleware[i] ? middleware[i] : () => { };
      if (i < middleware.length) {
          return fn(ctx, () => handle(i + 1));
      }
      else {
          return fn;
      }
  };
  handle(0);
};



// koa compose
const compose = (middleware) => (ctx) => {
  const handle = (i) => {
    const fn = middleware[i] ? middleware[i] : () => {};
    if (i<middleware.length) {
      return Promise.resolve(fn(ctx, handle.bind(null, i+1)));
    } else {
      return Promise.resolve();
    }
  };
  return handle(0);
};





// 第二题
//  n1
const m1 = next => action => {
  return next(action);
};
// n2
const m2 = next => action => {
  return next(action);
};
// n3
const m3 = next => action => {
  return next(action);
};

dispatch = n1;

funcs [m1, m2, m3];
// 1. const midComposed = (arg) => m1(m2(m3(arg)));
// 2. midComposed(store.dispatch); // n1 = dispatch

// redux compose
function compose(...funcs) {
  if (funcs.length === 0) return args => args;

  if (funcs.length === 1) return funcs[0];

  return funcs.reduce((a, c) => (...args) => a(c(...args)));
}

function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = () => {
      throw new Error('Is constructing middleware, Cannot dispatching.');
    };

    const middlewareAPI = {
      getState: store.getState,
      dispatch,
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
}

// redux-thunk
({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  return next(action);
};

// 中间件与面向切面编程(AOP)
// 处理cors
// if (auth()) {
      // 处理options请求
//   if () {
        // 权限校验
//     if () {
         // ...
//     } else {

//     }
//   } else {

//   }
// } else {

// }
