<template>
  <ibps-container type="full" class="page">
    <div>
      <!-- 个人项目列表 -->
      <mars-crud-local
        v-if="!projectShowDialog"
        ref="crud"
        class="table-data_list"
        :data="listData"
        :columns="listConfig.columns"
        :row-handle="listConfig.rowHandle"
        :search-form="listConfig.searchForm"
        :toolbars="listConfig.toolbars"
        :tag="listConfig.tag"
        :totalKey="listConfig.totalKey"
        :pageKey="listConfig.pageKey"
        :pageSizeKey="listConfig.pageSizeKey"
        :pageCountKey="listConfig.pageCountKey"
        :openPagination="listConfig.openPagination"
        :showPagination="listConfig.showPagination"
        :pagination="listConfig.pagination"
        :loading="listConfig.loading"
        :summaryMethod="summaryMethod"
        :selectionRow="true"
        :indexRow="false"
        :showSummary="true"
        :autoSearch="false"
        @action-event="handleAction"
        @pagination-change="handlePaginationChange"
      >
        <template slot="projectCodeName" slot-scope="scope">
          <span class="ibps-link" @click="handleOpenDetails(scope)">{{ scope.row.projectCodeName || '--'}}</span>
        </template>
        <template slot="fundImplementationProgress" slot-scope="scope">
          <el-progress
            class="fundImplementationProgress"
            :text-inside="true"
            :stroke-width="26"
            status="warning"
            :percentage="scope.row.fundImplementationProgress"
          ></el-progress>
        </template>
      </mars-crud-local>

      <ProjectQueryDetails
        v-if="projectQueryDetailsVisible"
        routeName="ReleaseAndRecycleAudit"
        :visible="projectQueryDetailsVisible"
        :batchNo="batchNo"
        :projectCodes="projectCodes"
        @close="()=>{projectQueryDetailsVisible=false;loadData()}"
      />
    </div>
  </ibps-container>
</template>
<script>
import ProjectQueryDetails from './ProjectQueryDetails.vue'
import yyAtool from '@/utils/aTool.js'
// import searchForm from 'mars-comps-lib/lib/mars-crud/src/components/search-form/index.vue'
export default {
  name: 'PersonalProjectList',
  components: {
    // BatchDetailList,
    // ProjectEditPage,
    ProjectQueryDetails
    // searchForm
  },
  data() {
    return {
      listData: [
        {
          code: '(00) 广州大学',
          projectCodeName: '(112302)项目test3',
          projectLeader: '079076 谢良',
          beginningBalance: '900.00',
          accumulatedIncome: '0.00',
          accumulatedExpenditure: '0.00',
          borrowingsChanges: '0.00',
          loanBalance: '100.00',
          projectBalance: '900.00',
          frozenAmount: '180,178.73',
          projectAvailableBalance: '-179,278.73',
          fundImplementationProgress: 22.5
        }
      ],
      yyAtool,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      projectShowDialog: false,
      projectEditVisible: false,
      batchCode: '', //批次号
      batchList: [],
      projectCode: '',
      projectQueryDetailsVisible: false,
      batchNo: '',
      projectCodes: [],

      listConfig: {
        searchForm: {
          fns: [this.loadData, this.reset],
          forms: [
            {
              prop: 'fiscalYear',
              label: '会计年度',
              fieldType: 'select',
              options: [
                { value: '2022', label: '2022' },
                { value: '2021', label: '2021' },
                { value: '2020', label: '2020' },
                { value: '2019', label: '2019' },
                { value: '2018', label: '2018' },
                { value: '2017', label: '2017' },
                { value: '2016', label: '2016' }
              ]
            },
            {
              prop: 'department',
              label: '项目',
              placeholder: '请选择项目'
            },
            {
              prop: 'projectCodeName',
              label: '部门',
              placeholder: '请选择部门'
            },
            {
              prop: 'mnemoniCode',
              label: '助记码',
              placeholder: '请选择助记码'
            },
            {
              prop: 'groupingConditions',
              label: '分组条件',
              fieldType: 'select',
              options: [
                { value: 0, label: '无' },
                { value: 1, label: '按部门分组' },
                { value: 2, label: '按项目类别分组' }
              ]
            },
            {
              prop: 'contain',
              label: ' ',
              itemWidth: 550,
              labelWidth: 92,
              fieldType: 'checkbox',
              defaultValue: [0, 1, 2],
              options: [
                {
                  name: '包含当年发生额为零的项目',
                  label: 0
                },
                {
                  name: '包含项目余额为零的项目',
                  label: 1
                },
                {
                  name: '包含禁用项目',
                  label: 2
                }
              ]
            }
          ]
        },
        toolbars: [
          { key: 'grant', label: '授权', icon: 'ibps-icon-add' },
          { key: 'export', label: '导出' },
          {
            type: 'text',
            label: '借款余额提示：'
          },
          {
            type: 'tips',
            color: 'red',
            label: '红色代表(已被锁定) '
          },
          {
            type: 'tips',
            color: 'orange',
            label: '橙色代表(7天内将被锁定) '
          },
          {
            type: 'tips',
            color: '#008080',
            label: '深绿代表(1个月内将被锁定) '
          }
        ],
        columns: [
          {
            prop: 'code',
            label: '部门编号/名称',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'projectCodeName',
            label: '项目编号/名称',
            align: 'center',
            minWidth: '120px',
            slotName: 'projectCodeName'
          },
          {
            prop: 'projectLeader',
            label: '项目负责人',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'beginningBalance',
            label: '年初余额',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'accumulatedIncome',
            label: '本年累计收入',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'accumulatedExpenditure',
            label: '本年累计支出',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'borrowingsChanges',
            label: '本年借款变化额',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'loanBalance',
            label: '借款余额',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'projectBalance',
            label: '项目余额',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'frozenAmount',
            label: '冻结金额',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'projectAvailableBalance',
            label: '项目可用余额',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'fundImplementationProgress',
            label: '本年资金执行进度',
            align: 'center',
            slotName: 'fundImplementationProgress',
            minWidth: '120px'
          }
        ]
      }
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {},
    reset() {},
    handleOpenDetails(scope) {
      // const id = scope.row.userId
      // const code = scope.row.userCode
      // this.$refs.queryPerson.showPersonInfo({ id, code })
      this.projectQueryDetailsVisible = true
    },
    handlePaginationSizeChange(val) {
      this.pageSize = val
      this.loadData()
    },

    handlePaginationChange(page) {
      this.myUtil.setPagination(this.listConfig.pagination, page)
      this.loadData()
    },
    handlePaginationCurrentChange(val) {
      this.currentPage = val
      this.loadData()
    },

    handleSearch() {
      this.currentPage = 1
      this.loadData()
    },

    handleResetSearch() {
      Object.keys(this.$refs.searchForm.params).forEach(key => {
        this.$refs.searchForm.params[key] = ''
      })
      this.handleSearch()
    },
    handleAction() {},
    //合计
    summaryMethod(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (
          column.property === 'beginningBalance' ||
          column.property === 'accumulatedIncome' ||
          column.property === 'accumulatedExpenditure' ||
          column.property === 'borrowingsChanges' ||
          column.property === 'loanBalance' ||
          column.property === 'projectBalance' ||
          column.property === 'frozenAmount' ||
          column.property === 'projectAvailableBalance'
        ) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = ''
          }
        }
      })
      return sums
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep.table-data_list {
  .el-table__footer-wrapper {
    font-size: 14px;
  }
}
::v-deep.fundImplementationProgress .el-progress-bar__innerText {
  color: black !important;
}
// .batch-detail_list-content {
//   /deep/ .el-dialog__body {
//     .fw-dialog-body {
//       height: 100%;
//     }
//   }
// }
</style>
