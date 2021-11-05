/**
 * Created by liukun on 2021/11/1.
 */
import Vue from 'vue'
import tablePage from './src/components'

import sticky from 'vuejs-sticky-directive'

import OverlayScrollbars from 'overlayscrollbars'
import { OverlayScrollbarsPlugin } from 'overlayscrollbars-vue'

Vue.use(sticky)

Vue.use(OverlayScrollbarsPlugin)
Vue.use(OverlayScrollbars)

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('tablePage', tablePage)
}

tablePage.install = function(Vue){
  Vue.component(tablePage.name, tablePage)
}
export default tablePage
