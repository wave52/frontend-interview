/* 基础版 */
// function throttle(fn, wait) {
//     var timer = null;
//     return function() {
//         if(!timer) {
//             timer = setTimeout(() => {
//                 timer = null;
//                 fn.apply(this, arguments);
//             }, wait);
//         }
//     }
// }

function throttle(fn, wait, options) {
    var timer, context, args, result;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timer = null;
        fn.apply(context, args);
        if (!timer) context = args = null;
    };
    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            previous = now;
            fn.apply(context, args);
            if (!timer) context = args = null;
        } else if (!timer && options.trailing !== false) {
            timer = setTimeout(later, remaining);
        }
    };
    throttled.cancel = function() {
        clearTimeout(timer);
        previous = 0;
        timer = null;
    }
    return throttled;
}

/* 固定 */
var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    console.log(e)
    container.innerHTML = count++;
};

var setUseAction = throttle(getUserAction, 1000, {
    leading: false,
    trailing: false
});

container.onmousemove = setUseAction;

document.getElementById("button").addEventListener('click', function() {
    setUseAction.cancel();
})