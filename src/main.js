import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
// import { IsPC } from './utils/index'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import i18n from './utils/i18n'

import './walletsAccount'
import '@/icons' // icon
// import '@/permission' // permission control

Vue.use(ElementUI)
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  i18n, // 挂载i18n
  router,
  store,
  render: h => h(App)
})

