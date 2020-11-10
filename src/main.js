import Vue from 'vue'
import App from './App'
import plugins from './plugins'

Vue.use(plugins)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
