import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/Home' },
    {
      path: '/Home', name: 'Home', component: () => import(/* webpackChunkName:'Home' */ '@/components/Home'),
      children: [
        { path: 'PermissionManage', name: 'PermissionManage', component: () => import(/* webpackChunkName:'PermissionManage' */ '@/components/PermissionManage/PermissionManage'),
          children:[
            { path: 'addNewPersmission', name: 'addNewPersmission', component: () => import(/* webpackChunkName:'addNewPersmission' */ '@/components/PermissionManage/addNewPersmission')}
          ]
      },
        { path: 'RoleManage', name: 'RoleManage', component: () => import(/* webpackChunkName:'RoleManage' */ '@/components/RoleManage/RoleManage')},
        { path: 'accountManager', name: 'accountManager', component: () => import(/* webpackChunkName:'accountManager' */ '@/components/accountManager/accountManager') },
        { path: '/LotteryList', name: 'LotteryList', component: () => import(/* webpackChunkName:'LotteryList' */ '@/components/LotteryList/LotteryList'),
          children:[
            { path: '/findByGameName', name: 'findByGameName', component: () => import(/* webpackChunkName:'findByGameName' */ '@/components/LotteryList/findByGameName'),}
          ]
      },
        { path: '/Advert', name: 'Advert', component: () => import(/* webpackChunkName:'Advert' */ '@/components/Advert/Advert') },
      ]
    },
    { path: '/Login', name: 'Login', component: () => import(/* webpackChunkName:'Login' */ '@/components/Login/Login') },

  ]
})
