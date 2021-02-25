---
title: 盒模型与BFC
tags:
 - CSS
date: 2016-09-07
update: 2021-02-22
sidebar: false
---

# BFC: block formatting context(块级格式化上下文)
> w3c中关于[bfc](http://www.w3.org/TR/CSS2/visuren.html#block-formatting)的解释
> * 浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的块级格式化上下文。
> * 在一个块级格式化上下文里，盒子从包含块的顶端开始垂直地一个接一个地排列，两个盒子之间的垂直的间隙是由他们的margin 值所决定的。两个相邻的块级盒子的垂直外边距会发生叠加。
> * 在块级格式化上下文中，每一个盒子的左外边缘（margin-left）会触碰到容器的左边缘(border-left)（对于从右到左的格式来说，则触碰到右边缘），即使存在浮动也是如此，除非这个盒子创建一个新的块级格式化上下文。

## 触发条件 
> MDN中关于[bfc的触发条件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

* 根元素或其它包含它的元素
* 浮动 (元素的 float 不为 none)
* 绝对定位元素 (元素的 position 为 absolute 或 fixed)
* 行内块 inline-blocks (元素的 display: inline-block)
* 表格单元格 (元素的 display: table-cell，HTML表格单元格默认属性)
* 表格标题 (元素的 display: table-caption, HTML表格标题默认属性)
* overflow 的值不为 visible的元素
* 弹性盒子 flex boxes (元素的 display: flex 或 inline-flex)

## 影响
* 阻止外边距合并
* 可以包含浮动的元素(清浮动)
* 可以阻止元素被浮动元素覆盖(用于布局)

## 参考
* [CSS之BFC详解](http://www.html-js.com/article/1866)  
* [深入理解盒模型与BFC](https://zhuanlan.zhihu.com/p/50335287)

