// const pipe = function(value) {
//   let obj = {};
//   Object.defineProperty(obj, 'double', {
//     get: function() {
//       return pipe(value * 2);
//     },
//   });
//   Object.defineProperty(obj, 'pow', {
//     get: function() {
//       return pipe(value ** 2);
//     },
//   });
//   Object.defineProperty(obj, 'get', {
//     get: function() {
//       console.log(value);
//       return value;
//     },
//   });
//   return obj;
// };

const pipe = function(value) {
  let obj = new Proxy(
    {},
    {
      get: function(obj, prop) {
        if (prop === 'double') {
          return pipe(value * 2);
        }
        if (prop === 'pow') {
          return pipe(value ** 2);
        }
        if (prop === 'get') {
          console.log(value);
          return value;
        }
        return obj;
      },
    }
  );
  return obj;
};

pipe(3).double.pow.get;
