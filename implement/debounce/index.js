/* 基础版 */
// function debounce(fn, wait) {
//     var timer = null;
//     return function() {
//         clearTimeout(timer)
//         timer = setTimeout(() => {
//             fn.apply(this, arguments)
//         }, wait)
//     }
// }

function debounce(fn, wait, immediate) {
    var timer = null;
    var result;
    var debounced = function() {
        if (timer) clearTimeout(timer);
        if (immediate) {
            var callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait)
            if (callNow) result = fn.apply(this, arguments)
        } else {
            timer = setTimeout(() => {
                fn.apply(this, arguments)
            }, wait)
        }
        return result;
    }
    debounced.cancel = function() {
        clearTimeout(timer);
        timer = null;
    }
    return debounced;
}

/* 固定 */
var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    console.log(e)
    container.innerHTML = count++;
};

var setUseAction = debounce(getUserAction, 10000, true);

container.onmousemove = setUseAction;

document.getElementById("button").addEventListener('click', function() {
    setUseAction.cancel();
})