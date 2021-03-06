// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { ToastPlugin, LoadingPlugin } from 'vux'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(iView)

import filters from 'src/filters/'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// 全局注册vux
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
