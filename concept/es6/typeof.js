
const sym = Symbol('1');
console.log(typeof sym)

const s = new Set(['1']);
console.log(typeof s);

const m = new Map([['1'],['2']]);
console.log(typeof m);

/* 注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。
也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。
 */