import Vue from 'vue'
import App from './App.vue'
import store from './components/PayStore'


Vue.config.productionTip = false

new Vue({
  el: '#app',
  store: store,
  render: h => h(App),
})
