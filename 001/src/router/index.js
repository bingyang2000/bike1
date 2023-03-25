import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    redirect:'/home/port',
    component:()=>import('@/views/home/index'),
    meta: {
      title: '首页',
      requireAuth: 'true'
    },
    children:[
      {
        path: 'check',
        component:()=>import("@/views/check/index"),
        meta:{
          title: '任务管理',
          requireAuth: 'false'
        }
      },
      {
        path: 'port',
        component:()=>import("@/views/port/index"),
        meta:{
          title: '站点管理',
          requireAuth: 'false'
        }
      },
      {
        path: 'control',
        component:()=>import("@/views/control/index"),
        meta:{
          title: '人员管理',
          requireAuth: 'false'
        }
      }
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: {
      title: 'login',
      requireAuth: 'true'
    },
    hidden: true
  },
  
]
const createRouter = () => new VueRouter({
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
