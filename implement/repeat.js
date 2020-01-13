// 用js实现一个repeat方法
function repeat(func, times, wait) {
  return (...params) => {
    for (let i = 0; i < times; i += 1) {
      setTimeout(() => {
        func(...params);
      }, wait * i);
    }
  };
}

const repeatFunc = repeat(console.log, 4, 3000);

repeatFunc('hello world');
