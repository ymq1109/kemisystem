import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './utils/mqaxios'
import './apis'

Vue.config.productionTip = false
import "reset-css"

//导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//引入mixin
import "@/mixins"

import mqTable from '@/components/Commons/mqTable'
Vue.component('mq-table',mqTable)


router.beforeEach((to,from,next)=>{
  if(to.path==='/login'){
     next();
  }else{
    /*
      判断是否已经登录
    */
    var token = localStorage.getItem("token");
    if(token){
       next();
    }else{
       next({path:'/login',query:{redirect:to.path}})
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
