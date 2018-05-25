import Vue from 'vue'
import Router from 'vue-router'
import stores from '../vuex/store.js'

import Login from '@/components/Login/login'

import Frame from '@/components/Frame'
import FramePage1 from '@/components/FramePage/FramePage1'
import FramePage2 from '@/components/FramePage/FramePage2'

Vue.use(Router)

const router = new Router({
  routes: [
     {
      path: '*', //其他页面，强制跳转到登录页面
      redirect: '/Login'
    },
    // 登录 校验
    {
      path:'/Login',
      name:'Login',
      
      component:Login
    },
    {
      path: '/Frame',
      name: 'Frame',
      component: Frame,
      children: [
        {
          path: '/FramePage1',
          name: 'FramePage1',
          component: FramePage1
        },
        {
          path: '/FramePage2',
          name: 'FramePage2',
          component: FramePage2
        }
      ]
    }
  ],
  //滚动行为
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {//浏览器前进后退
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

// 全局导航钩子
 router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // console.log(stores);

  //判断是否存在 userInfo 内数据是否都存在，否则重新登录
  if(to.path === '/Login'){
    console.log("此为登录页");
    next();
  } else {
    let UserInfo = stores.getters.getUserInfo;
    // let UserInfo = stores.state.login.userInfo;
    console.log(UserInfo);
    if(UserInfo.userCode
      && UserInfo.password
      && UserInfo.token){
      // console.log("存在登录信息，正在跳转");
      next();
    } else {
      // console.log("登录失效，跳转到登录页");
      next({
        path: '/Login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }

 });

 
export default router
