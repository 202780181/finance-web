import { childLayout } from 'mars-ui-frame'

const cashierManage = [
  {
    path: '/cashier',
    name: 'cashier',
    component: ()=> import('@/views/cashier/index.vue'),
    meta: {
      title: '出纳复核',
    }
  },
  {
    path: '/cashiers',
    name: 'cashiers',
    component: ()=> import('@/views/cashiers/index.vue'),
    meta: {
      title: '批量出纳复核',
    }
  },
  {
    path: '/result',
    name: 'result',
    meta: {
      title: '出纳结果查看',
    }
  }
]

export default cashierManage
