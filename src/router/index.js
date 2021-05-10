import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard',
    component: () => import(/* webpackChunkName */ '../views/Home'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          text: 'Dashboard',
          breadcrumbs: [
            { name: 'home', text: 'Home' }
          ]
        },
        component: () => import(/* webpackChunkName */ '../views/Home/Dashboard'),
      },
      {
        path: '/test-components',
        name: 'test-components',
        meta: {
          text: 'Test Components',
          breadcrumbs: [
            { name: 'home', text: 'Home' }
          ]
        },
        component: () => import(/*webpackChunkName */ '../views/Home/TestComponent')
      }
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
