<template>
  <ibps-container type="full" class="page">
    <!-- 项目预算调整管理-->
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
            <el-form-item label="调整编号">
              <el-input placeholder="请输入调整编号" v-model.trim="queryForm.code" clearable></el-input>
            </el-form-item>
            <el-form-item label="执行项目编号">
              <el-input placeholder="请输入执行项目编号" v-model.trim="queryForm.code" clearable></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input placeholder="请输入项目名称" v-model.trim="queryForm.code" clearable></el-input>
            </el-form-item>
            <el-form-item label="所属部门">
              <el-input
                v-model.trim="queryForm.dwmc"
                :readonly="queryForm.dwmc?false:true"
                clearable
                @clear="clearDepartment"
                @focus="openDepartment"
                placeholder="请选择所属部门"
              ></el-input>
            </el-form-item>
            <el-form-item label="申请人">
              <el-input
                v-model.trim="queryForm.xmfzrName"
                :readonly="queryForm.xmfzrName?false:true"
                clearable
                @clear="clearPerson"
                @focus="openPerson"
                placeholder="请选择申请人"
              ></el-input>
            </el-form-item>
            <el-form-item class="btn-list">
              <el-button type="primary" icon="ibps-icon-search" @click="handleSearch">查询</el-button>
              <el-button type="primary" icon="ibps-icon-refresh" @click="handleResetSearch">重置</el-button>
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
      </mars-crud>
    </div>
    <!-- 所属部门 -->
    <DepartmentChoiceDialog
      :visible="departmentVisible"
      v-if="departmentVisible"
      @close="()=>{departmentVisible=false}"
      @success="callBackDepartment"
      :defaultItems="defaultDepartmentItems"
      selectionType="radio"
    />

    <!-- 选择申请人 -->
    <PersonChoiceDialog
      :visible="personVisible"
      v-if="personVisible"
      @close="()=>{personVisible=false}"
      @success="callBackPerson"
      :defaultItems="defaultPersonItems"
      selectionType="radio"
    />

    <!-- 撤回 -->
    <!-- <CallBackInfoDialog :visible="callBackVisible" v-if="callBackVisible" @close="()=>{callBackVisible=false}" /> -->

    <!-- 查看详情 -->
    <ProjectBudegtDetail :visible="projectBudegtVisible" v-if="projectBudegtVisible" @close="()=>{projectBudegtVisible=false}" />
  </ibps-container>
</template>
<script>
import DepartmentChoiceDialog from '@/components/projectItemDialog/DepartmentChoiceDialog.vue'
import PersonChoiceDialog from '@/components/projectItemDialog/PersonChoiceDialog.vue'
import CallBackInfoDialog from '@/views/DepartmentProjectQuery/ReleaseAndRecycleAudit/components/CallBackInfoDialog.vue'
import ProjectBudegtDetail from '../components/ProjectBudegtDetail.vue'
export default {
  name: 'ProjectBudgetAdjustManagement',
  components: { DepartmentChoiceDialog, PersonChoiceDialog, CallBackInfoDialog, ProjectBudegtDetail },
  data() {
    return {
      listConfig: {
        searchForm: {
          forms: []
        },
        rowHandle: {
          fixed: 'left',
          actions: [
            {
              key: 'makeDown',
              label: '下达',
              hidden: row => {
                return false
              }
            },
            {
              key: 'check',
              label: '查看',
              hidden: row => {
                return true
              }
            }
          ]
        },
        columns: [
          {
            prop: 'code',
            label: '调整编号',
            align: 'center',
            minWidth: '120px',
            fixed: 'left'
          },
          {
            prop: 'code',
            label: '执行项目编号',
            align: 'center',
            minWidth: '120px',
            fixed: 'left'
          },
          {
            prop: 'code',
            label: '项目名称',
            align: 'center',
            minWidth: '120px',
            fixed: 'left'
          },
          {
            prop: 'code',
            label: '预算项目',
            align: 'center',
            minWidth: '140px'
          },
          {
            prop: 'code',
            label: '状态',
            align: 'center',
            minWidth: '100px'
          },
          {
            prop: 'code',
            label: '本次调整金额',
            align: 'center',
            minWidth: '140px'
          },
          {
            prop: 'code',
            label: '所属部门',
            align: 'center',
            minWidth: '140px'
          },
          {
            prop: 'code',
            label: '申请人',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'code',
            label: '调整原因',
            align: 'center',
            minWidth: '140px'
          },
          {
            prop: 'code',
            label: '送审时间',
            align: 'center',
            minWidth: '160px'
          }
        ]
      },
      selection: [],
      queryForm: {
        code: '',
        dwh: '', //单位号
        dwmc: '', //单位名称
        xmfzrName: '', // 项目负责人
        xmfzrCode: '' // 项目负责人
      },
      departmentVisible: false,
      defaultDepartmentItems: [],
      personVisible: false,
      defaultPersonItems: [],
      radio: '1',
      callBackVisible: false,
      projectBudegtVisible: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleSearch() {},

    handleResetSearch() {},

    getList() {
      this.$nextTick(() => {
        this.$refs.crud.ibpsData = [{}, {}]
      })
    },

    selectionChange(val) {
      this.selection = val
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

    goDetail(data) {
      this.projectBudegtVisible = true
    },

    // 撤回
    goRecall() {
      if (!this.selection.length) {
        return this.$message.warning('请选择需要撤回的数据！')
      }
      this.callBackVisible = true
    },

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

    clearPerson() {
      this.queryForm.xmfzrName = ''
      this.queryForm.xmfzrCode = ''
    },

    openPerson() {
      this.defaultPersonItems = this.queryForm.xmfzrCode ? [{ code: this.queryForm.xmfzrCode }] : []
      this.personVisible = true
    },

    callBackPerson(data) {
      this.clearPerson()
      if (data) {
        this.queryForm.xmfzrName = data.name
        this.queryForm.xmfzrCode = data.code
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-list {
  .el-button {
    margin-left: 5px !important;
  }
}
::v-deep.table-data_list {
  .el-table__footer-wrapper {
    font-size: 13px;
  }
  .el-table tr {
    height: 40px;
  }
}
</style>
