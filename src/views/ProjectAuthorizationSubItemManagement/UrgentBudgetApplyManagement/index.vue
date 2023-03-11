<template>
  <ibps-container type="full" class="page">
    <!-- 紧急预算申报管理 -->
    <div>
      <mars-crud
        ref="crud"
        class="table-data_list"
        :columns="listConfig.columns"
        :row-handle="listConfig.rowHandle"
        @action-event="handleAction"
        :search-form="listConfig.searchForm"
        :summaryMethod="summaryMethod"
        :showSummary="true"
        :autoSearch="false"
        :indexRow="false"
        @selection-change="selectionChange"
      >
        <template slot="searchForm">
          <el-form :inline="true" ref="queryForm" label-width="120px" :model="queryForm">
            <el-form-item label="任务编号">
              <el-input placeholder="请输入任务编号" v-model.trim="queryForm.code" clearable></el-input>
            </el-form-item>
            <el-form-item label="预算项目名称">
              <el-input placeholder="请输入预算项目名称" v-model.trim="queryForm.projectName" clearable></el-input>
            </el-form-item>
            <el-form-item label="所属单位">
              <el-input
                v-model.trim="queryForm.dwmc"
                :readonly="queryForm.dwmc?false:true"
                clearable
                @clear="clearDepartment"
                @focus="openDepartment"
                placeholder="请选择所属单位"
              ></el-input>
            </el-form-item>
            <el-form-item class="btn-list">
              <el-button type="primary" icon="ibps-icon-search" @click="handleSearch">查询</el-button>
              <el-button type="primary" icon="ibps-icon-refresh" @click="handleResetSearch">重置</el-button>
              <el-button type="primary" @click="goMore">更多条件</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:header>
          <div style="padding:0 0 10px 10px;">
            <el-button type="primary">下达</el-button>
            <el-button style="margin:0 5px !important;" type="danger" @click="goRecall">撤回</el-button>
            <el-radio-group v-model="radio">
              <el-radio-button label="1">待处理</el-radio-button>
              <el-radio-button label="2">已完成</el-radio-button>
            </el-radio-group>
          </div>
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

    <!-- 所属单位 -->
    <DepartmentChoiceDialog
      :visible="departmentVisible"
      v-if="departmentVisible"
      @close="()=>{departmentVisible=false}"
      @success="callBackDepartment"
      :defaultItems="defaultDepartmentItems"
      selectionType="radio"
    />
    <!-- 更多条件 -->
    <MoreSearchListDialog :visible="searchListVisible" @close="()=>{searchListVisible=false}" />
    <!-- 查看详情 -->
    <BudgetDetailCheck :visible="budgetDetailVisible" v-if="budgetDetailVisible" @close="()=>{budgetDetailVisible=false}" />
    <!-- 撤回 -->
    <!-- <CallBackInfoDialog :visible="callBackVisible" v-if="callBackVisible" @close="()=>{callBackVisible=false}" /> -->
  </ibps-container>
</template>
<script>
import DepartmentChoiceDialog from '@/components/projectItemDialog/DepartmentChoiceDialog.vue'
import MoreSearchListDialog from './MoreSearchListDialog.vue'
import BudgetDetailCheck from './BudgetDetailCheck.vue'
import CallBackInfoDialog from '@/views/DepartmentProjectQuery/ReleaseAndRecycleAudit/components/CallBackInfoDialog.vue'
export default {
  name: 'UrgentBudgetApplyManagement',
  components: {
    DepartmentChoiceDialog,
    MoreSearchListDialog,
    BudgetDetailCheck,
    CallBackInfoDialog
  },
  data() {
    return {
      departmentVisible: false,
      searchListVisible: false,
      budgetDetailVisible: false,
      callBackVisible: false,
      defaultDepartmentItems: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      radio: '1',
      selection: [],
      queryForm: {
        code: '', //任务编号
        projectName: '', //预算项目
        dwh: '', //单位号
        dwmc: '' //单位名称
      },
      listConfig: {
        searchForm: {
          forms: []
        },
        columns: [
          {
            prop: 'code',
            label: '任务编号',
            align: 'center',
            minWidth: '120px',
            fixed: 'left'
          },
          {
            prop: 'code',
            label: '预算项目编号',
            align: 'center',
            minWidth: '120px',
            fixed: 'left'
          },
          {
            prop: 'code',
            label: '预算项目名称',
            align: 'center',
            minWidth: '150px',
            fixed: 'left'
          },
          {
            prop: 'code',
            label: '对应执行项目',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'code',
            label: '预算项目类别',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'code',
            label: '一级项目',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'code',
            label: '项目状态',
            align: 'center',
            minWidth: '100px'
          },
          {
            prop: 'code',
            label: '所属单位',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'code',
            label: '职能部门',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'code',
            label: '预算金额',
            align: 'right',
            minWidth: '180px'
          },
          {
            prop: 'code',
            label: '存续状态',
            align: 'center',
            minWidth: '110px'
          },
          {
            prop: 'code',
            label: '是否科研项目',
            align: 'center',
            minWidth: '110px'
          },
          {
            prop: 'code',
            label: '起始年度',
            align: 'center',
            minWidth: '100px'
          },
          {
            prop: 'code',
            label: '终止年度',
            align: 'center',
            minWidth: '100px'
          }
        ],

        rowHandle: {
          fixed: 'left',
          actions: [
            {
              key: 'makeDown',
              label: '下达',
              hidden: row => {
                console.log(row, '-----nihao')
                return false
              }
            },
            {
              key: 'check',
              label: '查看',
              hidden: row => {
                console.log(row, '-----nihao')
                return true
              }
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
    clearDepartment() {
      this.queryForm.dwh = ''
      this.queryForm.dwmc = ''
    },

    openDepartment() {
      this.defaultDepartmentItems = this.queryForm.dwh ? [{ code: this.queryForm.dwh }] : []
      this.departmentVisible = true
    },

    callBackDepartment(data) {
      this.clearDepartment()
      if (data) {
        this.queryForm.dwmc = data.name
        this.queryForm.dwh = data.code
      }
    },

    selectionChange(val) {
      this.selection = val
    },

    handlePaginationSizeChange(val) {
      this.pageSize = val
      this.getList()
    },

    handlePaginationCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },

    handleSearch() {
      this.handlePaginationCurrentChange(1)
    },

    // 重置
    handleResetSearch() {},

    // 更多条件
    goMore() {
      this.searchListVisible = true
    },

    getList() {
      this.$nextTick(() => {
        this.$refs.crud.ibpsData = [{}, {}]
      })
    },

    //合计
    summaryMethod(param) {},

    /**
     * 表格操作
     */
    handleAction(buttonKey, position, selection, data) {
      switch (buttonKey) {
        case 'makeDown':
          this.goDetail(data) //查看详情
          break
      }
    },

    // 查看详情
    goDetail(data) {
      this.budgetDetailVisible = true
    },

    // 撤回
    goRecall() {
      if (!this.selection.length) {
        return this.$message.warning('请选择需要撤回的数据！')
      }
      this.callBackVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep.table-data_list {
  .el-table__footer-wrapper {
    font-size: 13px;
  }
  .el-table tr {
    height: 40px;
  }
}
.btn-list {
  .el-button {
    margin-left: 5px !important;
  }
}
</style>
