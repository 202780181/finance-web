import { childLayout } from 'mars-ui-frame'

const cashierManage = [
  {
    path: '/cashier',
    name: 'cashier',
    alivePath: '/cashier',
    component: ()=> import('@/views/cashier/index.vue'),
    meta: {
      keepAlive: true,
      title: '出纳复核',
    }
  },
  {
    path: '/cashiers',
    name: 'cashiers',
    alivePath: '/cashiers',
    component: ()=> import('@/views/cashiers/index.vue'),
    meta: {
      title: '批量出纳复核',
    }
  },
  {
    path: '/cashiersResult',
    name: 'cashiersResult',
    component: ()=> import('@/views/cashiersResult/index.vue'),
    meta: {
      title: '出纳结果查看',
    }
  }
]

export default cashierManage
