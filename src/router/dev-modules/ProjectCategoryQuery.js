import { childLayout } from 'mars-ui-frame'

const ProjectCategoryQuery = {
  path: '/ProjectCategoryQuery',
  name: 'ProjectCategoryQuery',
  alivePath: '/ProjectCategoryQuery',
  component: childLayout,
  meta: {
    title: '项目类别查询',
  },
  children: [
    {
      path: 'ReservedRegister',
      component: () => import('@/views/ProjectCategoryQuery/ReservedRegister/index.vue'),
      name: 'ReservedRegister',
      meta: {
        title: '留用登记',
      },
    },
    {
      path: 'ReservedRegisterDetail',
      component: () => import('@/views/ProjectCategoryQuery/ReservedRegisterDetail/index.vue'),
      name: 'ReservedRegisterDetail',
      meta: {
        title: '留用登记明细',
      },
    },
  ],
}

export default ProjectCategoryQuery
