function throttle(fn, wait) {
    var timer = null;
    return function() {
        if(!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(this, arguments);
            }, wait);
        }
    }
}

/* 固定 */
var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    console.log(e)
    container.innerHTML = count++;
};

var setUseAction = throttle(getUserAction, 1000, true);

container.onmousemove = setUseAction;

document.getElementById("button").addEventListener('click', function() {
    setUseAction.cancel();
})