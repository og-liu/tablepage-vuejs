import Vue from 'vue'
import App from './App.vue'

import sticky from 'vuejs-sticky-directive'
import vueSvg from 'svg-vuejs'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(sticky)
Vue.use(vueSvg)

new Vue({
  el: '#app',
  render: h => h(App)
})
