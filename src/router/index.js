import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: resolve => require(['../components/login.vue'], resolve)
  }, {
    path: '/home',
    component: resolve => require(['../components/home.vue'], resolve),
    children: [{
      path: 'home',
      name: "首页",
      component: resolve => require(['../components/home.vue'], resolve)
    }, {
      path: 'order',
      name: "订单管理",
      component: resolve => require(['../components/order.vue'], resolve)
    }, {
      path: 'service',
      name: "服务管理",
      component: resolve => require(['../components/service.vue'], resolve)
    }, {
      path: 'user',
      name: "用户管理",
      component: resolve => require(['../components/user.vue'], resolve)
    }, {
      path: 'register',
      name: "管理员注册",
      component: resolve => require(['../components/register.vue'], resolve)
    }]
  }]
})
