/**
 * Created by liukun on 2021/11/1.
 */
import tablePage from './src/components'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('tablePage', tablePage)
}

tablePage.install = function(Vue){
  Vue.component(tablePage.name, tablePage)
}
export default tablePage
