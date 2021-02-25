---
title: nvm使用及npm配置
date: 2017-11-10
categories:
- node
tags:
- nvm
- npm

---

## [NVM](https://github.com/creationix/nvm) （官方文档）
> Node Version Manager。用于切换不同项目依赖不同版的 NodeJS 运行环境。

[nvm安装及使用](http://bubkoo.com/2017/01/08/quick-tip-multiple-versions-node-nvm/)

* 罗列远程所有版本：`nvm ls-remote`
* 安装node：`nvm install x.x.x`
* 罗列本地安装版本：`nvm ls`
* 使用某个版本：`nvm use x.x.x`
* 设置默认使用斑斑：`nvm alias default x.x.x`
* 把nvm下的node链接到/usr/local/bin/目录下：`ln -s <which node> /usr/local/bin/node`
* 

### 多环境npm使用
每个版本的 Node 都会自带一个不同版本的 npm，可以用 npm -v 来查看 npm 的版本。全局安装的 npm 包并不会在不同的 Node 环境中共享，因为这会引起兼容问题。它们被放在了不同版本的目录下，例如 ~/.nvm/versions/node/<version>/lib/node_modules</version> 这样的目录。

* 安装node时拉取版本安装npm包 `nvm install vx.x.x --reinstall-packages-from=x.x.x`

## NPM
> Node Package Manager

### npm换镜像
* `npm config set registry https://registry.npm.taobao.org`

* 使用nrm来管理npm镜像
```
    npm install nrm -g
    nrm ls
    nrm use xxx
```

## [n管理node版本](https://github.com/muwenzi/Program-Blog/issues/6)

