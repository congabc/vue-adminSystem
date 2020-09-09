import Vue from "vue";
import Router from "vue-router";
// import Login from './views/login/index.vue'
//  下面情况，默认的会导入 ./views/login 目录下的index.vue组件
import Login from './views/login'
import Layout from './components/LayOut.vue'
import Home from './views/home'
import Goods from './views/goods'
import memter from './views/memter'
import supplier from './views/supplier'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login', //路由名称
      component: Login //组件对象
    },
    {
      path: '/',
      name: 'layout', //路由名称
      component: Layout, //组件对象
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home,
          meta: {title: '首页'}
        },
        
      ]
    },
    {
      path:'/goods',
      component: Layout,
      children: [
        {
          path: '/',
          component: Goods,
          meta: {title: '商品管理'}
        }
      ]
    },
    {
      path:'/memter',
      component: Layout,
      children: [
        {
          path: '/',
          component: memter,
          meta: {title: '会员管理'}
        }
      ]
    },
    {
      path:'/supplier',
      component: Layout,
      children: [
        {
          path: '/',
          component: supplier,
          meta: {title: '供应商管理'}
        }
      ]
    }
  ]
})
