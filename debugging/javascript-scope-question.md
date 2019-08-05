# javascript scope question

## 1

```javascript
var b = 10;
(function b() {
  b = 20;
  console.log(b);
})();
```

<details>
  <summary>
    <b>答案</b>
  </summary>
  <p>
    function b()<br/>
  </p>
</details>

---

## 2

```javascript
var a = 10;
(function() {
  console.log(a);
  a = 5;
  console.log(window.a);
  var a = 20;
  console.log(a);
})();
```

<details>
  <summary>
    <b>答案</b>
  </summary>
  <p>
    undefined<br/>
    10<br/>
    20<br/>
  </p>
</details>

---
