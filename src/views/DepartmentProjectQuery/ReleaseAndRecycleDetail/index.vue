<template>
  <ibps-container type="full" class="page">
    <!-- 下达回收明细 -->
    <div>
      <mars-crud
        ref="crud"
        class="batch-detail_list"
        :toolbars="listConfig.toolbars"
        :columns="listConfig.columns"
        :row-handle="listConfig.rowHandle"
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
            <el-form-item label="下达回收批次号" prop="xxpch">
              <el-input placeholder="请输入下达回收批次号" v-model.trim="queryForm.xxpch" clearable></el-input>
            </el-form-item>
            <el-form-item label="来源" prop="source">
              <el-select v-model="queryForm.source" placeholder="请选择来源" clearable>
                <el-option v-for="item in [{value:'1',label:'财务变更'}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="凭证编号" prop="pzbh">
              <el-input placeholder="请输入凭证编号" v-model.trim="queryForm.pzbh" clearable></el-input>
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
      <!-- 明细 -->
      <TransmiTretrieveDetail v-if="detailVisible" :visible="detailVisible" @close="()=>{detailVisible=false}" />
    </div>
  </ibps-container>
</template>
<script>
import yyAtool from '@/utils/aTool.js'
import DepartmentChoiceDialog from '@/components/projectItemDialog/DepartmentChoiceDialog.vue'
import ExecuteProjectType from '@/components/projectItemDialog/ExecuteProjectType.vue'
import PersonChoiceDialog from '@/components/projectItemDialog/PersonChoiceDialog.vue'
import TransmiTretrieveDetail from './TransmiTretrieveDetail.vue'
import { QueryItems_cPXfeHilxG } from '@/api/getBatchData'
export default {
  name: 'ReleaseAndRecycleDetail',
  components: {
    DepartmentChoiceDialog,
    ExecuteProjectType,
    PersonChoiceDialog,
    TransmiTretrieveDetail
  },
  data() {
    return {
      yyAtool,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      defaultDepartmentItems: [],
      departmentVisible: false,
      projectTypeCode: '',
      projectTypeVisible: false,
      defaultPersonItems: [],
      personVisible: false,
      detailVisible: false,
      queryForm: {
        code: '', // 执行项目编号
        name: '', // 项目名称
        ssbmName: '', // 所属部门
        ssbmCode: '', // 所属部门
        ysxmName: '', // 预算项目
        xxpch: '', // 下达回收批次号
        source: '', // 来源
        pzbh: '', // 凭证编号
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
        searchForm: {
          forms: []
        },
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
            label: '下达回收批次号',
            align: 'center',
            minWidth: '130px',
            slotName: 'xdhsCode'
          },
          {
            prop: '5',
            label: '来源',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: '5',
            label: '下达回收前累计下达额度',
            align: 'center',
            minWidth: '180px'
          },

          {
            prop: '6',
            label: '本次下达回收额度',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: '7',
            label: '下达回收后累计下达额度',
            align: 'center',
            minWidth: '180px'
          },
          {
            prop: '8',
            label: '下达回收时间',
            align: 'center',
            minWidth: '160px'
          },
          {
            prop: '9',
            label: '凭证编号',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: '10',
            label: '摘要',
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
            prop: '12',
            label: '所属部门',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: '13',
            label: '项目负责人',
            align: 'center',
            minWidth: '120px'
          }
        ]
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
        case 'searchNew':
          this.handleSearch() //查询
          break
        case 'refreshNew':
          this.handleResetSearch() //重置
          break
      }
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
      this.$refs.crud.ibpsData = [{}, {}]
    },

    handleSearch() {
      this.currentPage = 1
      this.getList()
    },

    handleResetSearch() {
      Object.keys(this.queryForm).forEach(key => {
        this.queryForm[key] = ''
      })
      this.handleSearch()
    },

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

    goDetail(row) {
      this.detailVisible = true
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
