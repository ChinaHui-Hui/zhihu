// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import App from './App'
import router from './router'

Vue.use(MintUI)

// 引入reset.css 引入rem.js 引入动画 引入iconfont.css
import '../src/assets/css/reset.css'
import '../src/assets/js/rem'
import 'animate.css'
import './assets/css/iconfont.css'

// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios


import commonCompoent from './components/common'
for (var i in commonCompoent) {
  Vue.component(i, commonCompoent[i])
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
