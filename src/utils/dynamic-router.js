import router from '../router'
import Layout from '@/layout'
import { resetRouter } from '../router/index'

// 动态路由
const dynamicRoutes = []

const generateDynamicRoutes = () => {
  // 先从 sessionStorage 获取该用户所拥有的权限菜单
  const menuStr = sessionStorage.getItem('menu')
  const menu = JSON.parse(menuStr)
  // 匹配该用户到底有哪些路由的权限
  menu.forEach(element => {
    if (element.resourceName === '缴费详情') {
      dynamicRoutes.push({
        path: '/payment-details',
        component: Layout,
        redirect: '/payment-details/index',
        children: [
          {
            path: '',
            name: 'payment-details',
            component: () => import('@/views/payment-details/index'),
            meta: { title: '缴费详情', icon: 'nested' }
          }
        ]
      })
    } else if (element.resourceName === '退款记录') {
      dynamicRoutes.push({
        path: '/refund-management',
        component: Layout,
        redirect: '/refund-management',
        children: [
          {
            path: '',
            name: 'refund-management',
            component: () => import('@/views/refund-management/index'),
            meta: { title: '退款记录', icon: 'example' }
          }
        ]
      },)
    } else if (element.resourceName === '用户管理') {
      dynamicRoutes.push({
        path: '/user-management',
        component: Layout,
        meta: { title: '用户管理' },
        redirect: '/user-management',
        children: [
          {
            path: '',
            name: 'user-management',
            component: () => import('@/views/user-management/index'),
            meta: { title: '用户管理', icon: 'user', breadcrumb: false }
          },
          {
            path: 'user-add',
            component: () => import('@/views/user-management/add'),
            name: 'user-add',
            meta: { title: '新增用户' },
            hidden: true
          }
        ]
      },)
    }
  })
  // 在最前面放上 /
  let redirect = dynamicRoutes[0].path
  dynamicRoutes.unshift({ path: '/', component: Layout, redirect: redirect })
  // 在最后放上 404
  // 404 page must be placed at the end !!!
  dynamicRoutes.push({ path: '*', redirect: '/404', hidden: true })
}

const getDynamicRoutes = () => {
  generateDynamicRoutes()
  // 必须是响应式的往 router.options.routes 数组里面添加数据，不然方法 2 不起作用
  router.options.routes.push(...dynamicRoutes)
  // 方法 1：动态添加路由。（addRoutes 是为了让动态添加的路由生效，否则跳转后页面空白）
  // router.addRoutes(dynamicRoutes)
  // 方法 2：使用自带的 resetRouter 方法。（估摸着 resetRouter 方法里面也调用了 addRoutes 方法）
  resetRouter()
}

export default getDynamicRoutes
