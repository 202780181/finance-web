import { childLayout } from 'mars-ui-frame'

const ProjectAuthorizationManagement = {
  path: '/ProjectAuthorizationManagement',
  name: 'ProjectAuthorizationManagement',
  alivePath: '/ProjectAuthorizationManagement',
  component: childLayout,
  meta: {
    title: '项目授权管理',
  },
  children: [
    {
      path: 'CarryForwardRecovery',
      component: () => import('@/views/ProjectAuthorizationManagement/CarryForwardRecovery/index.vue'),
      name: 'CarryForwardRecovery',
      meta: {
        title: '个人项目授权',
      },
    }
  ]
}

export default ProjectAuthorizationManagement
