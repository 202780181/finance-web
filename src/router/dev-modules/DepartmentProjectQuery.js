import { childLayout } from 'mars-ui-frame'

const DepartmentProjectQuery = {
  path: '/DepartmentProjectQuery',
  name: 'DepartmentProjectQuery',
  alivePath: '/DepartmentProjectQuery',
  component: childLayout,
  meta: {
    title: '部门项目查询',
  },
  children: [
    {
      path: 'ReleaseAndRecycleAudit',
      component: () => import('@/views/DepartmentProjectQuery/ReleaseAndRecycleAudit/index.vue'),
      name: 'ReleaseAndRecycleAudit',
      meta: {
        title: '部门项目列表',
      },
    }
  ]
}

export default DepartmentProjectQuery
