---
title: vue开发总结
date: 2018-02-28
categories: 
- vue
tags:
- vue
---

# vue2.0 项目开发知识点总结，填坑

## 生命周期
> created -> mounted -> updated -> destroyed

[nextTick](https://segmentfault.com/a/1190000008570874)
> 在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中

## 引用类型对象的更新检测
* [数组更新检测](https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B)
```
    // 方案1
    vm.$set(this.arr[index], oldval, newval)
    // 方案2
    this.arr.splice(indexOfItem, 1, newValue)
```
* [对象更新检测](https://cn.vuejs.org/v2/guide/list.html#%E5%AF%B9%E8%B1%A1%E6%9B%B4%E6%94%B9%E6%A3%80%E6%B5%8B%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
```
    // 方案1
    vm.$set(this.obj, oldval, newval)
    // 方案2
    this.obj = Object.assign({}, this.obj, {newkey: newval})
```

## 组件
1. 通信-父子组件
* prop单向绑定

prop 向下传递，事件向上传递(pass props, emit events)

* prop双向绑定
```
    // 方案1
    sync修饰符号
    this.$emit('eventname')
    // 方案2
    prop传递的数值包装在一个对象key里
```

2. 通信-非父子组件
* event bus
* vuex

3. slot

4. 编写组件
* Prop 允许外部环境传递数据给组件；
* 事件允许从组件内触发外部环境的副作用；
* 插槽允许外部环境将额外的内容组合在组件中。

## mixin
```
    // 定义一个混合对象
    var myMixin = {
      created: function () {
        this.hello()
      },
      methods: {
        hello: function () {
          console.log('hello from mixin!')
        }
      }
    }
    // 定义一个使用混合对象的组件
    var Component = Vue.extend({
      mixins: [myMixin]
    })
```


