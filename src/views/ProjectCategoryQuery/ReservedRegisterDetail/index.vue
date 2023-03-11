<template>
  <ibps-container type="full" class="page">
    <!-- 留用登记明细 -->
    <div>
      <mars-crud
        ref="crud"
        class="batch-detail_list"
        :toolbars="listConfig.toolbars"
        :columns="listConfig.columns"
        :search-form="listConfig.searchForm"
        :autoSearch="false"
        @action-event="handleAction"
        :indexRow="false"
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
            <el-form-item label="预算项目" prop="ysxmName">
              <el-input placeholder="请输入预算项目" v-model.trim="queryForm.ysxmName" clearable></el-input>
            </el-form-item>
            <el-form-item label="留用批次号" prop="xxpch">
              <el-input placeholder="请输入留用批次号" v-model.trim="queryForm.xxpch" clearable></el-input>
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
            <el-form-item label="项目负责人" prop="xmfzrName">
              <el-input
                v-model.trim="queryForm.xmfzrName"
                :readonly="queryForm.xmfzrName?false:true"
                clearable
                @clear="clearPerson"
                @focus="openPerson"
                placeholder="请选择项目负责人"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>

        <template slot="index" slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>

        <template slot="xdhsCode" slot-scope="scope">
          <el-button type="text" @click="goDetail(scope.row)">{{scope.row.xdhsCode || '--'}}</el-button>
        </template>

        <template slot="mx" slot-scope="scope">
          <el-button type="text" @click="goDialog(scope.row)">明细</el-button>
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

    <!-- 选择项目类别 -->
    <ExecuteProjectType
      v-if="projectTypeVisible"
      :visible="projectTypeVisible"
      @close="()=>{projectTypeVisible=false}"
      @success="callBackProjectType"
      :defaultCode="projectTypeCode"
    />
    <!-- 选择项目负责人 -->
    <PersonChoiceDialog
      :visible="personVisible"
      v-if="personVisible"
      @close="()=>{personVisible=false}"
      @success="callBackPerson"
      :defaultItems="defaultPersonItems"
      selectionType="radio"
    />
    <!-- 详情页面 -->
    <ReservedRegisterCommonPage pageType="detail" :visible="visible" v-if="visible" @close="()=>{visible=false}" />
    <!-- 明细 -->
    <FeeBudgetDetailedSet :readonly="true" :visible="feeVisible" v-if="feeVisible" @close="()=>{feeVisible=false}" />
  </ibps-container>
</template>
<script>
import DepartmentChoiceDialog from '@/components/projectItemDialog/DepartmentChoiceDialog.vue'
import ExecuteProjectType from '@/components/projectItemDialog/ExecuteProjectType.vue'
import PersonChoiceDialog from '@/components/projectItemDialog/PersonChoiceDialog.vue'
import ReservedRegisterCommonPage from '../ReservedRegister/ReservedRegisterCommonPage.vue'
import FeeBudgetDetailedSet from '../ReservedRegister/FeeBudgetDetailedSet.vue'
export default {
  name: 'ReservedRegisterDetail',
  components: {
    DepartmentChoiceDialog,
    ExecuteProjectType,
    PersonChoiceDialog,
    ReservedRegisterCommonPage,
    FeeBudgetDetailedSet
  },
  data() {
    return {
      queryForm: {
        code: '',
        name: '',
        ssbmName: '', // 所属部门
        ssbmCode: '', // 所属部门
        ysxmName: '',
        xxpch: '',
        zzxmlbName: '', // 执行项目类别
        zzxmlbCode: '', // 执行项目类别
        xmfzrName: '', // 项目负责人
        xmfzrCode: '' // 项目负责人
      },
      listConfig: {
        toolbars: [
          { key: 'searchNew', label: '查询', icon: 'ibps-icon-search' },
          { key: 'refreshNew', label: '重置', icon: 'ibps-icon-refresh' }
        ],
        columns: [
          {
            label: '序号',
            align: 'center',
            minWidth: '50px',
            fixed: 'left',
            slotName: 'index'
          },
          {
            prop: '1',
            label: '执行项目编号',
            align: 'center',
            minWidth: '120px',
            fixed: 'left'
          },
          {
            prop: '2',
            label: '项目名称',
            align: 'center',
            minWidth: '120px',
            fixed: 'left'
          },
          {
            prop: '3',
            label: '预算项目',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'xdhsCode',
            label: '留用批次号',
            align: 'center',
            minWidth: '130px',
            slotName: 'xdhsCode'
          },
          {
            prop: '7',
            label: '调整前已登记留用额度',
            align: 'center',
            minWidth: '180px'
          },
          {
            prop: '7',
            label: '本次调整留用额度',
            align: 'center',
            minWidth: '180px'
          },
          {
            prop: '7',
            label: '调整后留用额度',
            align: 'center',
            minWidth: '180px'
          },
          {
            prop: '7',
            label: '本次调整费用预算',
            align: 'center',
            minWidth: '160px',
            slotName: 'mx'
          },
          {
            prop: '7',
            label: '登记时间',
            align: 'center',
            minWidth: '180px'
          },
          {
            prop: '7',
            label: '执行项目类别',
            align: 'center',
            minWidth: '180px'
          },
          {
            prop: '7',
            label: '所属部门',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: '7',
            label: '项目负责人',
            align: 'center',
            minWidth: '120px'
          }
        ],
        searchForm: {
          forms: []
        }
      },
      defaultDepartmentItems: [],
      departmentVisible: false,
      projectTypeCode: '',
      projectTypeVisible: false,
      defaultPersonItems: [],
      personVisible: false,
      visible: false,
      feeVisible: false
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
        case 'searchNew':
          this.handleSearch() //查询
          break
        case 'refreshNew':
          this.handleResetSearch() //重置
          break
      }
    },

    getList() {
      this.$refs.crud.ibpsData = [{}, {}]
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
    },

    //留用批次号
    goDetail(row) {
      this.visible = true
    },

    // 本次调整费用预算
    goDialog(row) {
      this.feeVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.batch-detail_list {
  ::v-deep .el-table tr {
    height: 40px;
  }
}
</style>
