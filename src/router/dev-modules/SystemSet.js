import { childLayout } from 'mars-ui-frame'

const SystemSet = {
  path: '/SystemSet',
  name: 'SystemSet',
  alivePath: '/SystemSet',
  component: childLayout,
  meta: {
    title: '系统设置',
  },

  children: [
    {
      path: 'ExecutiveYearManage',
      component: () => import('@/views/SystemSet/ExecutiveYearManage/index.vue'),
      name: 'ExecutiveYearManage',
      meta: {
        title: '执行年度管理',
      }
    },
  ],
}

export default SystemSet
