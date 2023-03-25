import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = true
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 判断该路由是否需要登录权限
  if(to.meta.requireAuth){
    if (JSON.parse(localStorage.getItem('islogin'))) {
      next()
    } else {
      next({path:'/login'})
    }
  }
  else {
    next()  // 确保一定要有next()被调用
  }
  if(to.fullPath == "/login"){
    if(JSON.parse(localStorage.getItem('islogin'))){
      next({
        path:from.fullPath
      });
    }else {
      next();
    }
  }
})