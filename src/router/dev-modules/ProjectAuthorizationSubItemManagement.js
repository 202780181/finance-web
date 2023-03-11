import { childLayout } from 'mars-ui-frame'

const ProjectAuthorizationSubItemManagement = {
  path: '/ProjectAuthorizationSubItemManagement',
  name: 'ProjectAuthorizationSubItemManagement',
  alivePath: '/ProjectAuthorizationSubItemManagement',
  component: childLayout,
  meta: {
    title: '项目授权分项管理',
  },

  children: [
    {
      path: 'UrgentBudgetApplyManagement',
      component: () => import('@/views/ProjectAuthorizationSubItemManagement/UrgentBudgetApplyManagement/index.vue'),
      name: 'UrgentBudgetApplyManagement',
      meta: {
        title: '紧急预算申报管理',
      },
    },
    {
      path: 'ProjectBudgetAdjustManagement',
      component: () => import('@/views/ProjectAuthorizationSubItemManagement/ProjectBudgetAdjustManagement/index.vue'),
      name: 'ProjectBudgetAdjustManagement',
      meta: {
        title: '项目预算调整管理',
      },
    },
    {
      path: 'ProjectMoneyBudgetSetManagement',
      component: () => import('@/views/ProjectAuthorizationSubItemManagement/ProjectMoneyBudgetSetManagement/index.vue'),
      name: 'ProjectMoneyBudgetSetManagement',
      meta: {
        title: '项目费用预算调整管理',
      },
    },
    {
      path: 'ProjectBetweenBudgetManagement',
      component: () => import('@/views/ProjectAuthorizationSubItemManagement/ProjectBetweenBudgetManagement/index.vue'),
      name: 'ProjectBetweenBudgetManagement',
      meta: {
        title: '项目间预算调剂管理',
      },
    },
    {
      path: 'ProjectAuthorizationSubItemManagementRules',
      component: () => import('@/views/ProjectAuthorizationSubItemManagement/ProjectAuthorizationSubItemManagementRules/index.vue'),
      name: 'ProjectAuthorizationSubItemManagementRules',
      meta: {
        title: '预算调整调剂规则设置',
      },
    },
  ],
}

export default ProjectAuthorizationSubItemManagement
