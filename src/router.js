import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/Home'},
    {path:'/Home',name:'Home',component:()=>import(/* webpackChunkName:'Home' */ '@/components/Home'),
      children:[
        {path:'/System',name:'System',component:()=>import(/* webpackChunkName:'System' */ '@/components/System/System'),
        children:[
          {path:'Permission',name:'Permission',component:()=>import(/* webpackChunkName:'Permission' */ '@/components/System/Permission/Permission')},
          {path:'Role',name:'Role',component:()=>import(/* webpackChunkName:'Role' */ '@/components/System/Role/Role')},
          {path:'Users',name:'Users',component:()=>import(/* webpackChunkName:'Users' */ '@/components/System/Users/Users')},
      ]
      },
        {path:'/News',name:'News',component:()=>import(/* webpackChunkName:'News' */ '@/components/News/News') },
        {path:'/Games',name:'Games',component:()=>import(/* webpackChunkName:'Games' */ '@/components/Games/Games')},
        {path:'/Advert',name:'Advert',component:()=>import(/* webpackChunkName:'Advert' */ '@/components/Advert/Advert')},
        
      ]
  },
    {path:'/Login',name:'Login',component:()=>import(/* webpackChunkName:'Login' */ '@/components/Login/Login')},
   
  ]
})
