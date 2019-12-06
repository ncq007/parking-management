import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  /* {
    path: '/',
    component: Layout,
    redirect: '/sectionmgt',
    children: [{
      path: 'sectionmgt',
      name: 'sectionmgt',
      component: () => import('@/views/sectionmgt/index'),
      meta: { title: '栏目管理', icon: 'dashboard' }
    }]
  }, */
  {
    path: '/',
    component: Layout,
    redirect: '/payment-details'
  },
  {
    path: '/payment-details',
    component: Layout,
    redirect: '/payment-details/index',
    children: [
      {
        path: '',
        name: 'payment-details',
        component: () => import('@/views/payment-details/index'),
        meta: { title: '缴费详情', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/refund-management',
    component: Layout,
    redirect: '/refund-management',
    children: [
      {
        path: '',
        name: 'refund-management',
        component: () => import('@/views/refund-management/index'),
        meta: { title: '退款管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/user-management',
    component: Layout,
    redirect: '/user-management',
    children: [
      {
        path: '',
        name: 'user-management',
        component: () => import('@/views/user-management/index'),
        meta: { title: '用户管理', icon: 'dashboard' }
      }
    ]
  },
  /* {
    path: '/content',
    component: Layout,
    redirect: '/content/home',
    name: 'Content',
    meta: {
      title: '内容管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/content/home/index'), // Parent router-view
        redirect: '/content/home/swiper',
        name: 'Home',
        meta: { title: '首页' },
        children: [
          {
            path: 'swiper',
            component: () => import('@/views/content/home/swiper'),
            name: 'Swiper',
            meta: { title: '轮播' }
          },
          {
            path: 'news',
            component: () => import('@/views/content/home/news'),
            name: 'News',
            meta: { title: '新闻动态' }
          }
        ]
      },
      {
        path: 'contact',
        component: () => import('@/views/content/contact/index'),
        meta: { title: '国际联络' }
      }
    ]
  },

  {
    path: '/company',
    component: Layout,
    meta: { title: '企业管理', icon: 'form' },
    redirect: '/company',
    children: [
      {
        path: 'index',
        name: 'Company',
        component: () => import('@/views/company/index'),
        meta: { title: '企业管理', icon: 'form' }
      },
      {
        path: 'c_add',
        component: () => import('@/views/company/components/add'),
        name: 'c_add',
        meta: { title: '新建' },
        hidden: true
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  }, */

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
