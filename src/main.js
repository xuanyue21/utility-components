import Vue from 'vue'
import App from './App.vue'
import './assets/index.scss'; // 消除多余css影响
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
