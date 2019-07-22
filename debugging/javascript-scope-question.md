# javascript scope question

## 1

```javascript
var b = 10;
(function b() {
  b = 20;
  console.log(b)
})()
```

## 2

```javascript
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```
