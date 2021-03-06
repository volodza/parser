import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import VueResource from 'vue-resource'
import * as fb from 'firebase'



Vue.use(VueResource)

Vue.use(Vuetify, {
  iconfont: 'mdi'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App},
  template: '<App/>',
  created(){
    fb.initializeApp({
      apiKey: "AIzaSyDsUYWd1Eegmv1P9nCPPLo600Jc8ni2MSM",
      authDomain: "theta-shuttle-228314.firebaseapp.com",
      databaseURL: "https://theta-shuttle-228314.firebaseio.com",
      projectId: "theta-shuttle-228314",
      storageBucket: "theta-shuttle-228314.appspot.com",
      messagingSenderId: "909587803669",
      appId: "1:909587803669:web:b8769bd4da145504"
    })
  }
})
