---
title: 微信JSSDK开发
date: 2018-02-27
categories: 
- 微信
tags:
- 微信h5
- 微信JSSDK
- vue SPA JSSDK
- JSSDK invalid signature
---

## 流程
1. 引入jssdk
2. 初始化sdk
```
    // 首先通过接口请求获取初始化的sdk参数，接口请求的参数包含初始化当前sdk页面的url(url为锚点#前的全部参数，可以使用 location.href.split('#')[0] 去签名)
    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
```
3. 在wx.ready()方法中使用jsApiList中的方法
```
    wx.ready(() => {})
```

## JSSDK invalid signature签名错误的解决方案
[常见错误及解决方法](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)

* 补充
** 服务端签名url的接口和调用skd的前端页面必须全部在公众号绑定的安全域名内
** 微信支付必须指定支付页面的目录

## vue spa 使用JSSDK
* 我路由使用的是hash模式，由于从公众号进入之后，经过微信oauth2授权之后，回调的地址的url之后会添加code和status等hash参数，spa应用携带hash参数的url去签名会造成invalid signature错误，可以在第一次进入页面，获取到相关参数之后，使用HTML5的history对象的replace方法不刷新页面更改
url

```
    history.replaceState('', '', location.href.split('?')[0])
```