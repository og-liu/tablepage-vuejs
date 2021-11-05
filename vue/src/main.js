import Vue from 'vue'
import App from './App.vue'

import 'overlayscrollbars/css/OverlayScrollbars.css'
import OverlayScrollbars from 'overlayscrollbars'
import { OverlayScrollbarsPlugin } from 'overlayscrollbars-vue'
import sticky from 'vuejs-sticky-directive'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(OverlayScrollbarsPlugin)
Vue.use(OverlayScrollbars)

Vue.use(ElementUI)
Vue.use(sticky)

new Vue({
  el: '#app',
  render: h => h(App)
})
