# vue-element-ui-test

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

```
已存在 README.md

git init
git add . (git add README.md)
git commit -m "first commit"
git remote add origin git@github.com:nidunlove/vue-element-ui-test.git
git push -u origin master
```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

1. vue init webpack vue-element-ui-test

2. config/index.js 修改 port、localhost改为 0.0.0.0 (方便其他局域网访问到本地的ip)

3. config/index.js 修改 build.assetsPublicPath 改为 ./ (dist打包完文件路径)

4. 加入 elementui
	1. https://blog.csdn.net/larger5/article/details/79219021
	2. https://www.cnblogs.com/zimo-jing/p/7694591.html
	3. cnpm install element-ui --save-dev
	4. cnpm install jquery --save-dev
	5. 修改 webpack.base.config.js 添加 plugins[], resolve.alias 中配置（var webpack = require("webpack")）
	6. main.js 中引入 element-ui
	7. http://element.eleme.io/#/zh-CN/component/quickstart
	8. npm install babel-plugin-component -D
	9. 修改 .babelrc 下的 plugins
	10. npm run dev 
	11. cnpm install --save axios vue-axios
	12. cnpm install vuex --save-dev
	13. cnpm install less --save-dev
	14. cnpm install less-loader --save-dev
	15. build/utils.js 修改 vue-style-loader 加 publicPath:'../../' 解决相对路径下，css引用图片问题

5. 问题
	1. <el-input type="textarea"> 的 v-on:keyup.enter 事件无效 => 改用textarea 去写
	2. elementui table 数据 null，鼠标经过报错 =>  提问，几天后得到解决，element-ui BUG，升级element-ui版本。https://segmentfault.com/q/1010000014914978

6. elementUi 主题定制 
	1. http://element-cn.eleme.io/#/zh-CN/component/custom-theme
	2. sass https://stackoverflow.com/questions/47447199/module-not-found-error-cant-resolve-sass-loader
	3. https://github.com/ElementUI/theme-chalk/blob/master/src/common/var.scss => 变量	

7. es6学习
	1. http://es6.ruanyifeng.com/#docs/destructuring
	2. 注意 es7的 async await 需要修改 .babel的stage-2，package的 babel-preset-stage 
				npm install babel-preset-stage-0
				在.babelrc文件presets中添加stage-0，
				npm i -D babel-core babel-polyfill babel-preset-es2015 babel-preset-stage-0 babel-loader
				以上都失败
				https://segmentfault.com/q/1010000006801859/a-1020000006806116
				按此解决
				这是一个补完babel支持es6的拓展包，配置步骤为3个
				1.打开命令行键入 npm install --save-dev babel-polyfill 安装polyfill
				2.在webpack.config.js中最上面写上var babelpolyfill = require("babel-polyfill");
				3.在自己的项目js文件中最开头写上import "babel-polyfill";
				OK 这样就解决了