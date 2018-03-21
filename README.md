# gulp入门
## gulp是什么
 gulp是前端自动化构建工具
 
 ***
## 为什么要学习gulp
 代码编程过程重复性操作太多，浪费较多的时间
 
 ***
## 怎么学习gulp
	+ 先安装node.js,然后就可以使用npm命令行安装插件包（输入node -v检测是否安装成功）
	+ 使用npm命令行全局安装gulp ：Npm install gulp -g;（输入gulp -v检测是否成功）
	+ 安装好以后，在项目文件夹增加一个gulpfile.js文件，这是gulp工具的主文件
	+ 再gulpfile.js文件里面书写任务，因为gulp是轻量级的工具，一些特定功能的安装包需要npm下载使用
	+ 定义好任务后，在命令行执行gulp 加任务名即可执行

***
## 项目说明
	这个项目的gulpfile.js实现以下功能：
	+  html压缩
	+  .less转为.css，并且压缩css,自动补全前缀
	+  .js压缩合并
	+  浏览器与编程同步