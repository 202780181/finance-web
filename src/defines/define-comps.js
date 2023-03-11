import Vue from 'vue'
import {
  ibpsIcon, ibpsContextmenu, ibpsContextmenuList, ibpsLayout,
  ibpsContainer, marsGroup,
  ibpsTree,
  ibpsToolbar,
  marsSelectPane,
  marsToolbar,
  marsDialog,
  marsCrud,
  marsVxeCrud,
  personTableSelect,
  marsTransfer,
  marsFormItems,
  marsSelectPlus,
  marsTooltip,
  marsTree,
  marsTreeSelector,
} from 'mars-comps-lib'

Vue.use(ibpsIcon)
Vue.use(ibpsContextmenu)
Vue.use(ibpsContextmenuList)
Vue.use(ibpsLayout)
Vue.use(ibpsContainer)
Vue.use(marsGroup)
Vue.use(ibpsTree)
Vue.use(ibpsToolbar)
Vue.use(marsToolbar)
Vue.use(marsCrud)
Vue.use(marsDialog)
Vue.use(marsSelectPane)
Vue.use(marsVxeCrud)
Vue.use(personTableSelect)
Vue.use(marsTransfer)
Vue.use(marsFormItems)
Vue.use(marsTooltip)
Vue.use(marsSelectPlus)
Vue.use(marsTree)
Vue.use(marsTreeSelector)


// 引入 vxe-table
import 'xe-utils'
import {
  VXETable,
  Column,
  Table,
  Header,
  Grid,
} from 'vxe-table'

Vue.use(VXETable)
Vue.use(Header)
Vue.use(Column)
Vue.use(Table)
Vue.use(Grid)

import '@/components';  // 注册本地公共组件；