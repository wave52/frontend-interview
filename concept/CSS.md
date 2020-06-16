# CSS

## 概念题

### CSS

1. CSS (cascading style sheet) 层叠样式表
2. 技术用途：用来表现HTML样式，对网页元素位置排版
3. 通过选择器设置元素属性和属性值
4. 内联：

    ```html
    <body>
      <div style="width: 65px;height: 20px;border: 1px solid;">测试元素</div>
    </body>
    ```

    嵌入:

    ```html
    <head>
        <meta charset="utf-8" />
        <title>测试</title>
        <style type="text/css">
            div {
                width: 65px;
                height: 20px;
                border: 1px solid;
                background: greenyellow;
            }
        </style>
    </head>
    ```

    外联：

    ```html
    <link rel="stylesheet" type="text/css" href="*.css" />
    <style>@import url("*.css");</style>
    ```

5. 优点：下限低，上手容易
6. 缺点：上限高，完全掌握难，不正交（[为什么 CSS 这么难学？ - 方应杭的回答 - 知乎](https://www.zhihu.com/question/66167982/answer/239709754)）
7. 如何弥补缺点：经验学科，常来看这份总结

### 选择器

确定目标元素的东西。

**选择器：**

- ID选择器 `#id`
- 类选择器 `.class`
- 标签选择器 `div`
- 属性选择器 `[title="head"] {}`
- 伪类选择器 `:first-child`
- 伪元素选择器 `::after`
- 通配符选择器 `*`

**关系选择器：**

- 后代选择器 空格链接
- 子选择器 `>`
- 兄弟选择器 `~`
- 相邻兄弟选择器 `+`

**选择器优先级：**

- ！important  **Infinity**
- 内联样式  **1000**
- ID 选择器  **100**
- 类选择器、属性选择器、伪类选择器  **10**
- 标签选择器、伪元素选择器  **1**
- 通配符选择器  **0**

相加比较，和DOM树结构无关，优先级算下来相同，使用后面的，这叫“就近原则”

```css
body h1 {
  color: green;
}
html h1 {
  color: purple; /* √ */
}
```

```html
<html>
  <body>
    <h1>Here is a title!</h1>
  </body>
</html>
```

### 文档流

1.2. 浏览器渲染过程中有一步叫做 flow（布局、排列），还有一步叫做 reflow（回流、重排），可以看出，“流”是css的一种基本定位和布局机制。
3. 核心概念&运作流程：自上而下、从左到右，
4. 代码实现：
块级元素撑满一行 div、h1、p、ul (block)，li (list-item)，table (table)

内联元素(行内元素) 并排一行(如果父元素宽度足够)