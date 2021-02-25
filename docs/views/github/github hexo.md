---
title: github pages + hexo 搭建静态博客
date: 2016-08-05
categories:
- hexo
tags:
- github pages
- hexo

---



> github pages 和hexo使用文档如下：

GitHub Pages Docs: [github pages](https://pages.github.com)  
Hexo Docs: [hexo](https://hexo.io/zh-cn/docs/)  

<!-- more -->

>Tips:

* 通过ssh keys将本地git项目要与远程的github建立联系，否则之后hexo建立的blog无法部署到github上。

### hexo安装
* github上建立Github pages，具体操作如上；
* 本地建立blog的文件夹；
* 命令行hexo init 安装hexo文件到本地blog文件夹，cd到本地blog的文件夹，安装npm包管理；

		$ hexo init <your blog folder>  
		$ cd <your blog folder>  
		$ npm install  
		
* 一般按照这个步骤安装的，目录结构和hexo docs上所说一致；
* cd到blog文件夹，然后执行hexo 本地server服务预览下是否安装成功，更多hexo命令见hexo docs

		$ hexo s

### hexo与github关联并发布
* 修改blog根目录下的_config.yml文件;  

		deploy:
		  type: git
		  repo: git@github.com:your bolg Repository
		  branch: master
* type 和repo后面的空格是必须的，your bolg Repository就是你blog的github的项目地址，可以去github复制出来;
* 安装hexo git的插件;

		$ npm install hexo-deployer-git --save

* 执行下面的命令就发布到github pages，访问你github pages的url查看是否与hexo server预览的一致，每次更新blog都要执行下面的命令，clean是清楚之前代码，g是生成静态文件，d是部署;

		$ hexo clean
		$ hexo g 
		$ hexo d
		  
### 发布文章


### 更改主题
* 在github上找到hexo 主题，如我用的这个

		$ git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia

* 更新配置

		$ cd themes/yilia  
		$ git pull
		
* 主题的配置文件都在 themes/your themes/_config.yml里，跟新主题的配置都要执行以上步骤


