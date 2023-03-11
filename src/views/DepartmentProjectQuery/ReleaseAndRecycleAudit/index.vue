<template>
  <ibps-container type="full" class="page">
    <!-- 下达回收审核 -->
    <div>
      <mars-crud
        ref="crud"
        class="table-data_list"
        :toolbars="listConfig.toolbars"
        :columns="listConfig.columns"
        :row-handle="listConfig.rowHandle"
        :search-form="listConfig.searchForm"
        @action-event="handleAction"
        :summaryMethod="summaryMethod"
        :showSummary="true"
        :autoSearch="false"
        @selection-change="selectionChange"
      >
        <template slot="searchForm">
          <searchForm ref="searchForm" :forms="forms" @search="handleSearch" @reset-search="handleResetSearch" />
        </template>

        <template slot="source" slot-scope="scope">
          <span>{{{FinancialChanges:'财务变更',UserAppend:'用户申请'}[scope.row.source] || '--'}}</span>
        </template>

        <template slot="state" slot-scope="scope">
          <span>{{{Draft:'草稿',Reviewing:'复核中',Return:'被退回',Finish:'已完成'}[scope.row.state] || '--'}}</span>
        </template>

        <template slot="total" slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.total))}}</span>
        </template>

        <template slot="createPerson" slot-scope="scope">
          <span>{{scope.row.createPerson.name || '--'}}</span>
        </template>

        <template slot="createTime" slot-scope="scope">
          <span>{{yyAtool.parseMonth(scope.row.createTime)}}</span>
        </template>

        <template v-slot:footer>
          <div class="ibps-container-crud__footer">
            <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              :pageSizes="[10, 20, 50, 100, 200]"
              layout="prev, pager, next, jumper,sizes, ->, total"
              :pagerCount="5"
              @size-change="handlePaginationSizeChange"
              @current-change="handlePaginationCurrentChange"
            ></el-pagination>
          </div>
        </template>
      </mars-crud>
    </div>
    <!-- 选择项目 -->
    <ProjectChoiceDialog :visible="projectVisible" v-if="projectVisible" @close="()=>{projectVisible=false}" @success="callBackProject" />
    <!-- 额度下达回收 -->
    <BatchEditorPage
      :visible="batchEditorVisible"
      v-if="batchEditorVisible"
      :batchNo="batchNo"
      :projectCodes="projectCodes"
      @close="()=>{batchEditorVisible=false;getList()}"
      routeName="ReleaseAndRecycleAudit"
    />
  </ibps-container>
</template>
<script>
import yyAtool from '@/utils/aTool.js'
import ProjectChoiceDialog from '@/components/projectItemDialog/ProjectChoiceDialog.vue'
import searchForm from 'mars-comps-lib/lib/mars-crud/src/components/search-form/index.vue'
import BatchEditorPage from './BatchEditorPage.vue'
import { QueryList_GrpNBNUgJX, Delete_gd9PEQqLWL } from '@/api/getBatchData'
import myUtil from '@/utils/myUtil.js'
export default {
  name: 'ReleaseAndRecycleAudit',
  components: {
    ProjectChoiceDialog,
    BatchEditorPage,
    searchForm
  },
  data() {
    return {
      projectCodes: [],
      myUtil,
      yyAtool,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      projectVisible: false,
      batchEditorVisible: false,
      selection: [],
      batchNo: '',
      forms: [
        {
          prop: 'batchNo',
          label: '下达回收批次号',
          placeholder: '请输入下达回收批次号'
        },
        {
          prop: 'source',
          label: '来源',
          fieldType: 'select',
          options: [
            { value: 'FinancialChanges', label: '财务变更' },
            { value: 'UserAppend', label: '用户申请' }
          ]
        },
        {
          prop: 'state',
          label: '状态',
          fieldType: 'select',
          options: [
            { value: 'Draft', label: '草稿' },
            { value: 'Reviewing', label: '复核中' },
            { value: 'Return', label: '被退回' },
            { value: 'Finish', label: '已完成' }
          ]
        }
      ],
      listConfig: {
        toolbars: [
          { key: 'add', label: '新增' },
          { key: 'removeBatch', type: 'danger', label: '删除', icon: 'ibps-icon-remove' }
        ],
        searchForm: {
          forms: []
        },
        columns: [
          {
            prop: 'batchNo',
            label: '下达回收批次号',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'source',
            label: '来源',
            align: 'center',
            minWidth: '120px',
            slotName: 'source'
          },
          {
            prop: 'state',
            label: '状态',
            align: 'center',
            minWidth: '90px',
            slotName: 'state'
          },
          {
            prop: 'count',
            label: '项目数量',
            align: 'center',
            minWidth: '80px'
          },
          {
            prop: 'total',
            label: '下达总额度',
            minWidth: '180px',
            align: 'right',
            slotName: 'total'
          },
          {
            prop: 'createPerson',
            label: '创建人',
            align: 'center',
            minWidth: '120px',
            slotName: 'createPerson'
          },
          {
            prop: 'createTime',
            label: '创建时间',
            align: 'center',
            minWidth: '180px',
            slotName: 'createTime'
          }
        ],
        rowHandle: {
          actions: [
            {
              key: 'edit'
            },
            {
              key: 'remove',
              type: 'danger'
            }
          ]
        }
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    /**
     * 表格操作
     */
    handleAction(buttonKey, position, selection, data) {
      switch (buttonKey) {
        case 'add':
          this.goAdd() //新增项目
          break
        case 'removeBatch':
          this.removeBatch() //批量删除
          break
        case 'edit':
          this.edit(data) //编辑
          break
        case 'remove':
          this.remove(data) //删除
          break
      }
    },
    // 批量删除
    removeBatch() {
      if (!this.selection.length) {
        return this.$message.warning('请选择需要删除的数据！')
      }
      this.$confirm('确定删除选中数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.goDelete(this.selection)
        })
        .catch(() => {})
    },

    edit(data) {
      this.batchEditorVisible = true
      this.batchNo = data.batchNo
      this.projectCodes = []
    },

    remove(data) {
      this.$confirm('确认删除该条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.goDelete([data])
        })
        .catch(() => {})
    },

    goDelete(arr) {
      Delete_gd9PEQqLWL({ batchNos: arr.map(item => item.batchNo) }).then(res => {
        this.$message.success('删除成功！')
        this.getList()
      })
    },

    handlePaginationSizeChange(val) {
      this.pageSize = val
      this.getList()
    },

    handlePaginationCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },

    getList() {
      this.$nextTick(() => {
        this.$refs.crud.loading = true
        let params = {
          ...this.$refs.searchForm.params,
          requestPage: {
            limit: this.pageSize,
            pageNo: this.currentPage
          }
        }
        QueryList_GrpNBNUgJX(params)
          .then(res => {
            this.$refs.crud.ibpsData = res.data.dataResult || []
            this.total = res.data.pageResult.totalCount || 0
            this.$refs.crud.loading = false
          })
          .catch(() => {
            this.$refs.crud.loading = false
          })
      })
    },

    //合计
    summaryMethod(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '合计'
          return
        }
        if (column.property === 'total') {
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
          sums[index] = '￥' + myUtil.thsm(Number(sums[index]))
        }
      })
      return sums
    },

    selectionChange(val) {
      this.selection = val
    },

    handleSearch() {
      this.currentPage = 1
      this.getList()
    },

    handleResetSearch() {
      Object.keys(this.$refs.searchForm.params).forEach(key => {
        this.$refs.searchForm.params[key] = ''
      })
      this.handleSearch()
    },

    goAdd() {
      //新增项目
      this.projectVisible = true
    },

    // 选择项目，点击确定后回到批次编辑页面
    callBackProject(data) {
      this.batchNo = null
      this.projectCodes = []
      if (data.length) {
        this.projectCodes = data.map(item => item.code)
        this.batchEditorVisible = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep.table-data_list {
  .el-table__footer-wrapper {
    font-size: 13px;
  }
}
</style>
