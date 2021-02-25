---
title: sublime下安装less2css出现lessc is not available  
date: 2016-09-06  
categories:
- sublime package  
tags:
- less  
- sublime 

---

> 背景：mac使用iterm2的zsh，nvm安装的nodejs，npm安装less之后，命令行可以使用less，sublime3下安装less2css的package后，cmd＋s less文件时，sublime报错`less2css error: lessc is not avavailable`  
> 之前未用nvm安装node，直接安装node貌似不会出现这个错误。

<!-- more -->

## 解决
> （吐槽下国内各种文章解决问题的blog都是互相copy，不忍直视，而且问题都没解决）[google](https://www.google.com)下github上有个less2css的[issue](https://github.com/timdouglas/sublime-less2css/issues/55)上提出方案遂实践之。

##solution 1  
	1. sudo ln -s /opt/local/bin/lessc /usr/local/bin/lessc  
	2. sudo ln -s /opt/local/bin/node /usr/bin/node
	
虽然，我已经将nvm node命令添加到环境变量中了，但按上面操作肯定是行不通的，然后我就去搜索命令行in操作。

> in命令主要用途：将一个文件或目录在同一个文件系统或者另一个不同的文件系统的某个位置建立一个链接，类似windows系统中的超链接，这样当我们在链接处访问被链接的目录或文件时就可以通过此链接来访问，不必要再进入要访问的文件系统中。  
> sudo ln -s 源文件 目标文件

* 所以，上面两个命令就是把less和node的命令添加一个软连接到/usr/local/bin/中去（上述第二个命令有错）。  
* 在命令行中输入 which lessc 和which node 输出原来的路径
* 上述两个命令添加到的不是同一个环境变量，害我试了半天，而且，mac下/usr/bin/node的也访问不了，把 /usr/bin/node 改成 /usr/local/bin/node即可

## 正确流程
* npm全局安装less
* sublime安装less2css的package
* 命令行执行以下两个操作

		1. sudo ln -s <which lessc> /usr/local/bin/lessc  
		2. sudo ln -s <which node> /usr/local/bin/node 
		
### 总结
以上只是我个人遇到此问题的个人解决方案，如果表述不对，望指出。

