# slcc 新浪彩票赛事中心 Sina Lottery Competition Center

> A Vue.js project

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:80
sudo npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 发布路径
```
配置config > index.js > build.assetsPublicPath
assetsPublicPath: '//n.sinaimg.cn/sports/slcc/v1/pc',
资源发布地址:http://cms.pub.sina.com.cn/#file
svn资源同步: https://svn1.intra.sina.com.cn/nostaff_caitong/front_dev/web/slcc/
页面部署系统: https://svnpub.intra.sina.com.cn/index_p.php?project_id=560
```

## 命令行部署 配置.conf文件夹下
```
# 启动本地服务
sudo npm run dev
# 生成dll动态链接库文件,对第三方库的打包
npm run dll-clean 
# 发布正式文件资源
npm run deploy
# 发布测试文件资源
npm run deploy-test
# 启动yangxing为前缀的api本地服务
npm run dev-yangxing
# 有选择的发布测试文件资源 三个参数 --compile=uncompile --dirs='css,js' htmls='account.html'
npm run deploy-test-udh
```

## 技术选型
```
框架 vue+vueX
css预处理stylus
脚手架 vue-cli
组件库 element-ui
```

## 新浪jira
http://jira.intra.sina.com.cn/browse/CAIPIAOPROJ-913

## 接口wiki
http://wiki.intra.sina.com.cn/pages/viewpage.action?pageId=191734187


## cms发布地址
```
http://wiki.intra.sina.com.cn/pages/viewpage.action?pageId=164495750
http://cms.pub.sina.com.cn/#file
http://cms.pub.sina.com.cn/#site
https://svnpub.intra.sina.com.cn/index_p.php?project_id=560
```


```
1、专家后台 
    post预览：http://wiki.intra.sina.com.cn/pages/viewpage.action?pageId=163187802

2、用户前台
    方案列表：http://wiki.intra.sina.com.cn/pages/viewpage.action?pageId=161615101
    权威专家（不要"N个推荐"，直接切静态dom，发布做输出）

```    

## 组件库相关
[Axios 中文说明](https://www.kancloud.cn/yunye/axios/234845)
[Element](http://element-cn.eleme.io/#/zh-CN/component/quickstart)
[vue使用 better-scroll的参数和方法](http://blog.csdn.net/TionSu/article/details/77651051)
[vue之better-scroll的封装,包含下拉刷新](https://www.cnblogs.com/xiaohaifengke/p/7308943.html)
[使用Vue-cli搭建多页面应用时对项目结构和配置的调整](https://www.jianshu.com/p/0a30aca71b16)
[在 webpack 中使用 ECharts](http://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts)
[localForage 中文文档](https://localforage.docschina.org/)

## 本地地址
```
[大数据透视列表页](http://match.lottery.sina.com.cn/) 
[大数据透视单场页](http://match.lottery.sina.com.cn/perspective.html?id=176831) 
[算法选球](http://match.lottery.sina.com.cn/algorithm.html?id=1,2,3)
[算法选球支付](http://match.lottery.sina.com.cn/aipay.html?pdtIds=memberVip-alg-1-3&pdtType=algVip)
 ```

## 测试地址
```
[大数据透视列表页](http://match.lottery.sina.com.cn/test/index/render?__t__=datalist) 
[大数据透视单场页](http://match.lottery.sina.com.cn/test/index/render?__t__=perspective) 
 ```
 
## 正式地址
```
[大数据透视列表页](https://lottery.sina.com.cn/ai/datalist.shtml) 
[大数据透视单场页](http://match.lottery.sina.com.cn/render?__t__=perspective&id=176871) 
[算法选球](http://match.lottery.sina.com.cn/render?__t__=algorithm) 
[购买页](http://match.lottery.sina.com.cn/render?__t__=aipay&pdtIds=algDc-football-z5_spf-176871&pdtType=algDc) 
 ```
