# webpack4_pc_tool
webpack4搭建多页面多环境demo

## v 1.0.1 改动
增加px2rem，以及rem.js文件（以750设计稿为准）
使用时引入rem.js，设计稿多少px，css就写多少px，自动转换为rem

## v 1.0.2 改动
添加公共代码提取，minChunks: 2

## v 1.0.3 改动
增加本地调试方法
npm run local

增加本地打包方法
npm run test
其余方法npm run dev, npm run test等均为build方法，如需变更，请去package.json中以及env-config中自行修改

## v 1.0.5 改动
本工具参照 https://juejin.im/post/5b9116086fb9a05d05307e96 进行修改完成

修改一些功能，不对打包的HTML进行压缩，scss,sacc,js进行源代码调试提示

多页面浏览请输入不同url 例如：http://127.0.0.1:8090/index.html  http://127.0.0.1:8090/page1.html http://127.0.0.1:8090/page2.html

本工具不对html热更新 只对 css,js,scss,sass,less进行热更新调试