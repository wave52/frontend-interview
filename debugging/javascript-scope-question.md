# javascript scope question

## 1

```javascript
var b = 10;
(function b() {
  b = 20;
  console.log(b)
})()
```
