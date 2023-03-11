import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

/**
 * 导入本地 /dev-modules 中定义的路由
 * 再导出 asyncDevRouterMap
 * asyncDevRouterMap：用于 VUE_APP_DEV_ROUTER_MODE = 2 时，用本地树形路由当作左侧菜单
 */
import CashierManage from "@/router/dev-modules/cashierManage"

export const asyncDevRouterMap = [  // 导出本地定义的路由树（非固定路由）
  ...CashierManage
]

Vue.use(VueRouter)

/**
 * frameIn：业务系统内置页面，但不会以左侧菜单的形式呈现，只会以 tag 的形式被打开
 */
const frameIn = []
const frameOut = []
const tmpConstantRouterMap = [...frameIn, ...frameOut]   // 重新组织后导出

export const frameInRoutes = frameIn   // 导出需要能以tags打开，但不要在左侧显示的菜单；
export default new VueRouter({
  scrollBehavior: () => ({y: 0}),
  routes: tmpConstantRouterMap,
  base: '/'  // 在nginx部署后，index 被放置在二级目录下，因此前端此处需要配置，此处/platform/只是示例
})
