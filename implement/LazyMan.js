// LazyMan TODO:
function LazyManClass(name) {
    console.log(`Hi I am ${name}`)
}
LazyManClass.prototype.sleep = function (wait) {
    var _this = this;
    setTimeout(() => _this, wait * 1000)
}
LazyManClass.prototype.eat = function (food) {
    console.log(`I am eating ${food}`)
}
function LazyMan(name) {
    return new LazyManClass(name)
}

// 实现以下功能
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

