import { childLayout } from 'mars-ui-frame'

const PersonalProjectQuery = {
  path: '/PersonalProjectQuery',
  name: 'PersonalProjectQuery',
  alivePath: '/PersonalProjectQuery',
  component: childLayout,
  meta: {
    title: '个人项目查询',
  },

  children: [{
    path: 'PersonalProjectList',
    component: () => import('@/views/PersonalProjectQuery/PersonalProjectList/index.vue'),
    name: 'PersonalProjectList',
    meta: {
      title: '个人项目列表',
    },
  }, {
    path: 'PersonalLoanQuery',
    component: () => import('@/views/PersonalProjectQuery/PersonalLoanQuery/index.vue'),
    name: 'PersonalLoanQuery',
    meta: {
      title: '个人借款查询',
    },
  },],
}

export default PersonalProjectQuery
