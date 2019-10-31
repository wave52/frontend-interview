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

function compose(fArr) {
    return function(context) {
        const h = (i) => {
            let f = fArr[i] ? fArr[i] : () => {}
            if (i < fArr.length) { 
                return f(context, () => h(i + 1))
            } else {
                return f
            }
        }
        h(0)
    }
}


// ---
const context = {}
const composedFn = compose([f1, f2, f3])
composedFn(context)
console.log(context)