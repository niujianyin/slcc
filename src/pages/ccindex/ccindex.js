// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'

import 'common/stylus/reset.styl'

import { Pagination,Table,TableColumn,Alert, Loading, Message, MessageBox, Notification, DatePicker} from 'element-ui';
Vue.use(Loading.directive);
Vue.use(DatePicker);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
