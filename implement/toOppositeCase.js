// 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 
function toOppositeCase(str) {
    let i = 0
    let resStr = '';
    while(i < str.length) {
        let s = str.charAt(i)
        if(/[a-z]/.test(s)) resStr = resStr + s.toUpperCase()
        else if(/[A-Z]/.test(s)) resStr = resStr + s.toLowerCase()
        else resStr = resStr + s
        i++
    }
    return resStr;
}

console.log(toOppositeCase('aBc'))
