import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import store from './vuex/store'
import routers from './router'
 
Vue.use(VueRouter)
Vue.use(VueResource)

// Vue.config.debug = process.env.NODE_ENV === 'dev'
  
const router = new VueRouter({
  mode: 'history',
  routes: routers,
  base: __dirname,
})

new Vue({
  router,
  store,
  el: '#app', 
  render: h => h(App)
})
