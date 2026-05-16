import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/Login/login.vue') },
    {
      path: '/', component: () => import('@/views/layout/LayOut.vue'), redirect: '/home', children: [
        { path: '/home', component: () => import('@/views/home/HomePage.vue') },
        { path: '/cate/:id', component: () => import('@/views/CateGory/CateGoryPage.vue') },
        { path: '/cate/sub/:id', component: () => import('@/views/SubCate/SubCategory.vue') },
        { path: '/detail/:id', component: () => import('@/views/Detail/DetailPage.vue') },
        { path: '/shop', component: () => import('@/views/ShopPage/index.vue') },
        { path: '/pay', component: () => import('@/views/PayPage/index.vue') },
        { path: '/subpay', component: () => import('@/views/subPay/index.vue') },
        { path: '/backjj', component: () => import('@/components/paycallback.vue') },
        {
          path: '/member', component: () => import('@/views/member/MemberPage.vue'), redirect: '/myself', children: [
            { path: '/myself', component: () => import('@/views/member/MySelf.vue') },
            { path: '/order', component: () => import('@/views/member/OrderPage.vue') }
          ]
        }
      ]
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
