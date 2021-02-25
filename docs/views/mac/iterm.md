---
title: mac下iterm2安装
date: 2016-08-08
categories:
- mac
tags:
- iterm
- mac

---

## 安装

> url: [iterm2](http://iterm2.com)

大致安装过程详见[此blog](https://laoshuterry.gitbooks.io/mac_os_setup_guide/content/4_ZshConfig.html)  

<!-- more -->

## 命令行报错
> zsh: command not found

原因：环境变量没有配置,将bash的环境变量添加到zsh  
 
zsh中环境变量配置: .zshrc  (bash中环境变量配置：.bash_profile )

* 打开zsh文件 

		open ~/.zshc
* 添加bash环境变量

		source ~/.bash_profile
* 更新zsh

		source .zshrc
		
## tips
> 在iterm中使用sublime打开文件

open命令以默认打开

* 打开zsh文件 

		open ~/.zshrc  
* 在文件末位添加

		alias subl="'/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl'"	 
		alias nano="sub  
		export EDITOR="sub				
* 更新zsh

		source .zshrc




