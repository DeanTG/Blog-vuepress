---
title: promise
date: 2021-03-02
categories:
- js
- promise
tags:
- js
- promise
---

# promise
> 异步编程的一种解决方案

## e.g.
```
    const asyncRequest = new Promise((resolve, reject) => {
        //异步请求
        http.get(url, function(res) {
            if(res.code === 1) {
                resolve(res.id)  
            } else {
                reject(res)
            }
        })
    })
    asyncRequest().then(res => {
        console.log(res)
    })
```

## 特性
### Promise 状态
Promise 有三种状态：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected，一旦Promise被resolve或reject，不能再迁移至其他任何状态（即状态 immutable）。

### then 回调异步执行
* Promise 实例化时传入的函数会立即执行，then(...) 中的回调需要异步延迟调用。
* onFulfilled 和 onRejected 方法必须异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列采用微任务 micro-task机制来实现。

## 内部实现
### Promise 构造函数
1. 初始化 Promise 状态（pending）
2. 初始化 then(..) 注册回调处理数组（then 方法可被同一个 promise 调用多次）
3. 立即执行传入的 fn 函数，传入Promise 内部 resolve、reject 函数

```
    function Promise (fn) {
      // promise 状态变量
      // 0 - pending
      // 1 - resolved
      // 2 - rejected
      this._state = 0;
      // promise 执行结果
      this._value = null;
     
      // then(..) 注册回调处理数组
      this._deferreds = [];

      function resolve(value) {
        // TODO
      }

      function reject(reason) {
        // TODO
      }

      // 立即执行 fn 函数
      try {
        fn(resolve,reject)
      } catch (err) {
        // 处理执行 fn 异常
        reject(err);
      }
    }
```

### then 函数
1. 实例化空 promise 对象用来返回（保持then链式调用）
2. 构造 then(..) 注册回调处理函数结构体
3. 判断当前 promise 状态，pending 状态存储延迟处理对象 deferred ，非pending状态执行 onResolved 或 onRejected 回调

```
    Promise.prototype.then = function (onResolved, onRejected) {
      // 实例化空 promise 对象用来返回
      var res = new Promise(function () {});

      // Handler 函数封装存储 onResolved、onRejected 函数和新生成 promise 对象。
      function Handler (onResolved, onRejected, promise) {
          this.onResolved = typeof onResolved === 'function' ? onResolved : null;
          this.onRejected = typeof onRejected === 'function' ? onRejected : null;
          this.promise = promise;
      }

      // 使用 onResolved，onRejected 实例化处理对象 Handler
      var deferred = new Handler(onResolved, onRejected, res);

      // 当前状态为 pendding，存储延迟处理对象
      if (this._state === 0) {
        this._deferreds.push(deferred);
        return res;
      }

      // 当前 promise 状态不为 pending
      // 调用 handleResolved 执行onResolved或onRejected回调
      handleResolved(this, deferred);
      
      // 返回新 promise 对象，维持链式调用
      return res;
    };
```

* 链式调用需要返回新的 promise，而不直接返回 this 当前对象
```
    // 假如 then 函数执行返回 this 调用对象本身，那么 promise2 === promise1，promise2 状态也应该等于 promise1 同为 resolved。而 onResolved 回调中返回状态为 rejected 对象。考虑到 Promise 状态一旦 resolved 或 rejected就不能再迁移，所以这里 promise2 也没办法转为回调函数返回的 rejected 状态，产生矛盾。

    var promise2 = promise1.then(function (value) {
      return Promise.reject(3)
    })
```

### resolve 函数
> Promise 实例化时立即执行传入的 fn 函数，同时传递内部 resolve 函数作为参数用来改变 promise 状态。resolve 函数简易版逻辑大概为：判断并改变当前 promise 状态，存储 resolve(..) 的 value 值。判断当前是否存在 then(..) 注册回调执行函数，若存在则依次异步执行 onResolved 回调。

* 如果 promise 和 value 指向同一对象，拒绝执行 promise
* 如果 value 为 Promise ，则使 promise 接受 value 的状态
* 如果 value 为对象或函数
    1. 把 value.then 赋值给 then
    2. 如果取 value.then 的值时抛出错误 e ，拒绝执行 promise
    3. 如果 then 是函数，将 value 作为函数的作用域 this 调用之。
    4. 如果 value 不为对象或者函数，以 value 为参数执行 promise

```
    function resolve (promise, value) {
      // 非 pending 状态不可变
      if (promise._state !== 0) return;
      
      // promise 和 value 指向同一对象
      if (value === promise) {
        return reject( promise, new TypeError('A promise cannot be resolved with itself.') );
      }
      
      // 如果 value 为 Promise，则使 promise 接受 value 的状态
      if (value && value instanceof Promise && value.then === promise.then) {
        var deferreds = promise._deferreds
        
        if (value._state === 0) {
          // value 为 pending 状态
          // 将 promise._deferreds 传递 value._deferreds
          value._deferreds.push(...deferreds)
        } else if (deferreds.length !== 0) {
          // value 为 非pending 状态
          // 使用 value 作为当前 promise，执行 then 注册回调处理
          for (var i = 0; i < deferreds.length; i++) {
            handleResolved(value, deferreds[i]);
          }
          // 清空 then 注册回调处理数组
          value._deferreds = [];
        }
        return;
      }

      // value 是对象或函数
      if (value && (typeof value === 'object' || typeof value === 'function')){
          var then = obj.then;
        } catch (err) {
          return reject(promise, err);
        }

      // 如果 then 是函数，将 value 作为函数的作用域 this 调用之
        if (typeof then === 'function') {
          try {
            // 执行 then 函数
            then.call(value, function (value) {
              resolve(promise, value);
            }, function (reason) {
              reject(promise, reason);
            })
          } catch (err) {
            reject(promise, err);
          }
          return;
        }
      }
      
      // 改变 promise 内部状态为 `resolved`
      promise._state = 1;
      promise._value = value;

      // promise 存在 then 注册回调函数
      if (promise._deferreds.length !== 0) {
        for (var i = 0; i < promise._deferreds.length; i++) {
          handleResolved(promise, promise._deferreds[i]);
        }
        // 清空 then 注册回调处理数组
        promise._deferreds = [];
      }
    }
```

### reject 函数
```
    function reject (promise, reason) {
      // 非 pending 状态不可变
      if (promise._state !== 0) return;

      // 改变 promise 内部状态为 `rejected`
      promise._state = 2;
      promise._value = reason;

      // 判断是否存在 then(..) 注册回调处理
      if (promise._deferreds.length !== 0) {
        // 异步执行回调函数
        for (var i = 0; i < promise._deferreds.length; i++) {
          handleResolved(promise, promise._deferreds[i]);
        }
        promise._deferreds = [];
      }
    }
```

### handleResolved 函数
```
    function handleResolved (promise, deferred) {
      // 异步执行注册回调
      asyncFn(function () {
        var cb = promise._state === 1 ? 
                deferred.onResolved : deferred.onRejected;

        // 传递注册回调函数为空情况
        if (cb === null) {
          if (promise._state === 1) {
            resolve(deferred.promise, promise._value);
          } else {
            reject(deferred.promise, promise._value);
          }
          return;
        }

        // 执行注册回调操作
        try {
          var res = cb(promise._value);
        } catch (err) {
          reject(deferred.promise, err);
        }

        // 处理链式 then(..) 注册处理函数调用
        resolve(deferred.promise, res);
      });
    }
```

## 总结
> * Promise的实现过程，其主要使用了设计模式中的观察者模式
> * promise里面的then函数仅仅是注册了后续需要执行的代码，真正的执行是在resolve方法里面执行。

1. 通过Promise.prototype.then和Promise.prototype.catch方法将观察者方法注册到被观察者Promise对象中，同时返回一个新的Promise对象，以便可以链式调用。
2. 被观察者管理内部pending、fulfilled和rejected的状态转变，同时通过构造函数中传递的resolve和reject方法以主动触发状态转变和通知观察者。

## Promise 相关方法实现
### Promise.race
```
    Promise.race = function (values) {
      return new Promise(function (resolve, reject) {
        values.forEach(function(value) {
          Promise.resolve(value).then(resolve, reject);
        });
      });
    };
```

### Promise.all
```
    Promise.all = function(promises) {
      let results = [];
      let promiseCount = 0;
      let promisesLength = promises.length;
      return new Promise(function(resolve, reject) {
        for (let i = 0; i < promises.length; i++) { // 使用let保证promise顺序执行
          Promise.resolve(promises[i]).then(function(res) {
            results[i] = res;
            promiseCount++;
            // 当所有函数都正确执行了，resolve输出所有返回结果。
            if (promiseCount === promisesLength) {
              resolve(results);
            }
          }, function(err) {
            reject(err);
          });
        }
      });
    }
```

## 参考
* [解读Promise内部实现原理](https://juejin.cn/post/6844903521284784142#heading-1)
* [30分钟，让你彻底明白Promise原理](https://mengera88.github.io/2017/05/18/Promise%E5%8E%9F%E7%90%86%E8%A7%A3%E6%9E%90/)