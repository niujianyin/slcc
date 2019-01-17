/**
 * @Author: niujianyin@staff.caitong.sina.com
 * @Date: 2018/4/10 17:42
 */
  //webpack.dll.conf.js
const webpack = require('webpack');
const config = require('../config')
const AssetsPlugin = require('assets-webpack-plugin')

//配置需要打包到dll中的模块
const vendors = [
  'core-js',
  'core-js/library/index.js',
  'babel-polyfill',
  'better-scroll',
  'qs',
  'js-md5',
  'vue/dist/vue.esm.js',
  'vuex',
  'vuex/dist/logger.js',
  'axios',
  'jsonp',
];
const elementui = [
  'element-ui/lib/alert.js',
  'element-ui/lib/loading.js',
  'element-ui/lib/message.js',
  'element-ui/lib/message-box.js',
  'element-ui/lib/notification.js',
  'element-ui/lib/popover.js',
  'element-ui/lib/pagination.js',
  'element-ui/lib/table.js',
  'element-ui/lib/table-column.js',
  'element-ui/lib/date-picker.js',
  'element-ui/lib/select.js',
  'element-ui/lib/option.js',
  'element-ui/lib/option-group.js'
];
module.exports = {
  entry: {
    vendor: vendors,
    elementui: elementui
  },
  output: {
    path: __dirname+'/../static/dll',
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.DllPlugin({
      path: __dirname+'/../static/dll/[name].manifest.json',//manifest文件的输出路径,必须为绝对路径
      name: '[name]_[chunkhash]', //name是dll暴露的对象名，要跟output.library保持一致
      context: __dirname,
    }),
    // 把带hash的dll插入到html中
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: './'
    })
  ]
};
