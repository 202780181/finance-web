<template>
  <div v-if="visible">
    <mars-dialog
      :fullscreen="false"
      class="choice-dialog"
      :modal="true"
      :modal-append-to-body="false"
      title="XXX预算支出项\XX部门结转明细"
      v-if="visible"
      @close="closeDialog"
    >
      <mars-crud
        ref="crud"
        class="batch-detail_list"
        :toolbars="listConfig.toolbars"
        :columns="listConfig.columns"
        :search-form="listConfig.searchForm"
        :autoSearch="false"
        @action-event="handleAction"
        :selectionRow="false"
      >
        <template slot="searchForm">
          <el-form :inline="true" ref="queryForm" label-width="120px" :model="queryForm">
            <el-form-item label="执行项目编号" prop="code">
              <el-input placeholder="请输入执行项目编号" v-model.trim="queryForm.code" clearable></el-input>
            </el-form-item>
            <el-form-item label="项目名称" prop="name">
              <el-input placeholder="请输入项目名称" v-model.trim="queryForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="所属部门" prop="ssbmName">
              <el-input
                v-model.trim="queryForm.ssbmName"
                :readonly="queryForm.ssbmName?false:true"
                clearable
                @clear="clearDepartment"
                @focus="openDepartment"
                placeholder="请选择所属部门"
              ></el-input>
            </el-form-item>
            <el-form-item label="执行项目类别" prop="zzxmlbName">
              <el-input
                v-model.trim="queryForm.zzxmlbName"
                :readonly="queryForm.zzxmlbName?false:true"
                clearable
                @clear="clearProjectType"
                @focus="openPeojectType"
                placeholder="请选择执行项目类别"
              ></el-input>
            </el-form-item>
            <el-form-item label="预算支出项" prop="yszcxName">
              <el-input placeholder="请输入预算支出项" v-model.trim="queryForm.yszcxName" clearable></el-input>
            </el-form-item>
          </el-form>
        </template>

        <template slot="fyysjz" slot-scope="scope">
          <el-button type="text" @click="goDetail(scope.row)">明细</el-button>
        </template>
      </mars-crud>
      <template slot="ms-foot">
        <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
      </template>
    </mars-dialog>
    <!-- 所属部门 -->
    <DepartmentChoiceDialog
      :visible="departmentVisible"
      v-if="departmentVisible"
      @close="()=>{departmentVisible=false}"
      @success="callBackDepartment"
      :defaultItems="defaultDepartmentItems"
      selectionType="radio"
    />

    <!-- 选择项目类别 -->
    <ExecuteProjectType
      v-if="projectTypeVisible"
      :visible="projectTypeVisible"
      @close="()=>{projectTypeVisible=false}"
      @success="callBackProjectType"
      :defaultCode="projectTypeCode"
    />
    <FeeBudgetDetailedSet :readonly="true" v-if="feeBudgetVisible" :visible="feeBudgetVisible" @close="()=>{feeBudgetVisible=false}" />
  </div>
</template>
<script>
import DepartmentChoiceDialog from '@/components/projectItemDialog/DepartmentChoiceDialog.vue'
import ExecuteProjectType from '@/components/projectItemDialog/ExecuteProjectType.vue'
import FeeBudgetDetailedSet from '../../ProjectCategoryQuery/ReservedRegister/FeeBudgetDetailedSet.vue'
export default {
  name: 'BudgetDetailDialog',
  components: {
    DepartmentChoiceDialog,
    ExecuteProjectType,
    FeeBudgetDetailedSet
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultDepartmentItems: [],
      departmentVisible: false,
      projectTypeCode: '',
      projectTypeVisible: false,
      feeBudgetVisible: false,
      queryForm: {
        code: '', // 执行项目编号
        name: '', // 项目名称
        ssbmName: '', // 所属部门
        ssbmCode: '', // 所属部门
        zzxmlbName: '', // 执行项目类别
        zzxmlbCode: '', // 执行项目类别
        yszcxCode: '', //预算支出项编号
        yszcxName: '' //预算支出项名称
      },
      listConfig: {
        toolbars: [
          { key: 'searchNew', label: '查询', icon: 'ibps-icon-search' },
          { key: 'refreshNew', label: '重置', icon: 'ibps-icon-refresh' }
        ],
        columns: [
          {
            prop: '1',
            label: '执行项目编号',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: '2',
            label: '项目名称',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: '11',
            label: '执行项目类别',
            align: 'center',
            minWidth: '130px'
          },
          {
            prop: '11',
            label: '预算支出项',
            align: 'center',
            minWidth: '130px'
          },
          {
            prop: '11',
            label: '所属部门',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: '11',
            label: '项目余额',
            align: 'center',
            minWidth: '130px'
          },
          {
            prop: '11',
            label: '冻结金额',
            align: 'center',
            minWidth: '130px'
          },
          {
            prop: '11',
            label: '结转下年额度',
            align: 'center',
            minWidth: '130px'
          },
          {
            prop: 'fyysjz',
            label: '费用预算结转',
            align: 'center',
            minWidth: '130px',
            slotName: 'fyysjz'
          }
        ],
        searchForm: {
          forms: []
        }
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    getList() {
      this.$nextTick(() => {
        this.$refs.crud.ibpsData = [{}, {}]
      })
    },

    /**
     * 表格操作
     */
    handleAction(buttonKey, position, selection, data) {
      switch (buttonKey) {
        case 'searchNew':
          this.handleSearch() //查询
          break
        case 'refreshNew':
          this.handleResetSearch() //重置
          break
      }
    },

    handleSearch() {},

    handleResetSearch() {},

    clearDepartment() {
      this.queryForm.ssbmName = ''
      this.queryForm.ssbmCode = ''
    },

    openDepartment() {
      this.defaultDepartmentItems = this.queryForm.ssbmCode ? [{ code: this.queryForm.ssbmCode }] : []
      this.departmentVisible = true
    },

    callBackDepartment(data) {
      this.clearDepartment()
      if (data) {
        this.queryForm.ssbmName = data.name
        this.queryForm.ssbmCode = data.code
      }
    },

    clearProjectType() {
      this.queryForm.zzxmlbName = ''
      this.queryForm.zzxmlbCode = ''
    },

    openPeojectType() {
      this.projectTypeCode = this.queryForm.zzxmlbCode
      this.projectTypeVisible = true
    },

    callBackProjectType(data) {
      this.clearProjectType()
      if (data) {
        this.queryForm.zzxmlbName = data.name
        this.queryForm.zzxmlbCode = data.code
      }
    },

    // 明细
    goDetail(row) {
      this.feeBudgetVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.choice-dialog {
  ::v-deep.el-dialog__body {
    .fw-dialog-body {
      height: 100%;
      position: relative;
    }
  }
}
</style>
