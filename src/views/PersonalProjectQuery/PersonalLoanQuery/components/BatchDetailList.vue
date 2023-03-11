<template>
  <div class="batch-detail_list">
    <mars-crud
      ref="crud"
      :toolbars="rulelistConfig.toolbars"
      :columns="rulelistConfig.columns"
      :searchForm="rulelistConfig.searchForm"
      :rowHandle="rulelistConfig.rowHandle"
      :selectionRow="false"
      :outdata="tableData"
      @action-event="handleAction"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
    >
      <template v-slot:header>
        <div class="header-list-detail">
          <p>批次</p>
          {{batchCode}} {{finishedNew?'已完成':'未完成'}}
        </div>
      </template>
      <template slot="searchForm">
        <searchForm ref="searchForm" :forms="forms" @search="handleSearch" @reset-search="handleResetSearch" />
      </template>
      <!-- 预算项目 -->
      <template slot="ysName" slot-scope="scope">
        <span>{{scope.row.budgetProjectInfo.name}}</span>
      </template>

      <!-- 预算项目类别 -->
      <template slot="lbName" slot-scope="scope">
        <span>{{scope.row.budgetProjectType.name}}</span>
      </template>

      <!-- 所属一级项目 -->
      <template slot="ssyjxm" slot-scope="scope">
        <span>{{scope.row.topProject.name || '--'}}</span>
      </template>

      <!-- 执行项目编号 -->
      <template slot="code" slot-scope="scope">
        <el-input v-model.trim="scope.row.code" placeholder="请输入" clearable></el-input>
      </template>

      <!-- 项目名称 -->
      <template slot="name" slot-scope="scope">
        <el-input v-model.trim="scope.row.name" placeholder="请输入" clearable></el-input>
      </template>

      <!-- 执行项目类别 -->
      <template slot="projectType" slot-scope="scope">
        <el-input
          v-model.trim="scope.row.projectType.name"
          :readonly="scope.row.projectType.name?false:true"
          clearable
          @clear="clearProjectType(scope.row.projectType)"
          @focus="openPeojectType(scope.row.projectType)"
          size="mini"
          placeholder="请选择"
        ></el-input>
      </template>

      <!-- 所属部门 -->
      <template slot="department" slot-scope="scope">
        <el-input
          v-model.trim="scope.row.department.name"
          :readonly="scope.row.department.name?false:true"
          clearable
          @clear="clearDepartment(scope.row.department)"
          @focus="openDepartment(scope.row.department)"
          size="mini"
          placeholder="请选择"
        ></el-input>
      </template>

      <!-- 职能部门 -->
      <template slot="functionalDepartment" slot-scope="scope">
        <span>{{scope.row.functionalDepartment?scope.row.functionalDepartment.name:'--'}}</span>
      </template>

      <!-- 项目负责人 -->
      <template slot="directorNew" slot-scope="scope">
        <el-input
          v-model.trim="scope.row.directorNew.name"
          :readonly="scope.row.directorNew.name?false:true"
          clearable
          @clear="clearPerson(scope.row)"
          @focus="openPerson(scope.row)"
          size="mini"
          placeholder="请选择"
        ></el-input>
      </template>

      <!-- 借方默认科目 -->
      <template slot="defaultDebitSubjectCode" slot-scope="scope">
        <el-input
          v-model.trim="scope.row.defaultDebitSubjectCode"
          :readonly="scope.row.defaultDebitSubjectCode?false:true"
          clearable
          @clear="clearSubject(scope.row,'defaultDebitSubjectCode')"
          @focus="openSubject(scope.row,'defaultDebitSubjectCode')"
          size="mini"
          placeholder="请选择"
        ></el-input>
      </template>

      <!-- 默认预算借方科目 -->
      <template slot="defaultDebitSubjectCodeYS" slot-scope="scope">
        <el-input
          v-model.trim="scope.row.defaultDebitSubjectCodeYS"
          :readonly="scope.row.defaultDebitSubjectCodeYS?false:true"
          clearable
          @clear="clearSubject(scope.row,'defaultDebitSubjectCodeYS')"
          @focus="openSubject(scope.row,'defaultDebitSubjectCodeYS')"
          size="mini"
          placeholder="请选择"
        ></el-input>
      </template>

      <!-- 借方其他科目 -->
      <template slot="otherDebitSubjectCodes" slot-scope="scope">
        <el-input
          v-model.trim="scope.row.otherDebitSubjectCodes"
          :readonly="scope.row.otherDebitSubjectCodes?false:true"
          clearable
          @clear="clearSubject(scope.row,'otherDebitSubjectCodes')"
          @focus="openSubject(scope.row,'otherDebitSubjectCodes')"
          size="mini"
          placeholder="请选择"
        ></el-input>
      </template>

      <!-- 贷方默认科目 -->
      <template slot="defaultCreditSubjectCode" slot-scope="scope">
        <el-input
          v-model.trim="scope.row.defaultCreditSubjectCode"
          :readonly="scope.row.defaultCreditSubjectCode?false:true"
          clearable
          @clear="clearSubject(scope.row,'defaultCreditSubjectCode')"
          @focus="openSubject(scope.row,'defaultCreditSubjectCode')"
          size="mini"
          placeholder="请选择"
        ></el-input>
      </template>

      <!-- 默认预算贷方科目 -->
      <template slot="defaultCreditSubjectCodeYS" slot-scope="scope">
        <el-input
          v-model.trim="scope.row.defaultCreditSubjectCodeYS"
          :readonly="scope.row.defaultCreditSubjectCodeYS?false:true"
          clearable
          @clear="clearSubject(scope.row,'defaultCreditSubjectCodeYS')"
          @focus="openSubject(scope.row,'defaultCreditSubjectCodeYS')"
          size="mini"
          placeholder="请选择"
        ></el-input>
      </template>

      <!-- 贷方其他科目 -->
      <template slot="otherCreditSubjectCodes" slot-scope="scope">
        <el-input
          v-model.trim="scope.row.otherCreditSubjectCodes"
          :readonly="scope.row.otherCreditSubjectCodes?false:true"
          clearable
          @clear="clearSubject(scope.row,'otherCreditSubjectCodes')"
          @focus="openSubject(scope.row,'otherCreditSubjectCodes')"
          size="mini"
          placeholder="请选择"
        ></el-input>
      </template>

      <!-- 可用资金来源 -->
      <template slot="fundsOriginSubjects" slot-scope="scope">
        <el-input
          v-model.trim="scope.row.fundsOriginSubjects"
          :readonly="scope.row.fundsOriginSubjects?false:true"
          clearable
          @clear="clearMoney(scope.row)"
          @focus="openMoneySource(scope.row)"
          size="mini"
          placeholder="请选择"
        ></el-input>
      </template>

      <!-- 预算管理类型 -->
      <template slot="budgetType" slot-scope="scope">
        <el-select style="width:100%" value-key="code" size="mini" v-model="scope.row.budgetType" filterable clearable placeholder="请选择">
          <el-option v-for="item in YSLX" :key="item.id" :label="item.name" :value="item"></el-option>
        </el-select>
      </template>

      <!-- 功能分类 -->
      <template slot="purpose" slot-scope="scope">
        <el-select style="width:100%" size="mini" v-model="scope.row.purpose" filterable clearable value-key="code" placeholder="请选择">
          <el-option v-for="item in ZCGNFL" :key="item.id" :label="item.name" :value="item"></el-option>
        </el-select>
      </template>
    </mars-crud>

    <!-- 编辑页面 -->
    <ProjectEditPage
      v-if="projectEditVisible"
      :visible="projectEditVisible"
      :projectCode="projectCode"
      :batchList="batchList"
      @close="()=>{projectEditVisible=false}"
      @success="getList"
    />

    <!-- 立项项目详情页面 -->
    <ProjectDetailPage
      v-if="projectDetailVisible"
      :visible="projectDetailVisible"
      :projectCode="projectCode"
      @close="()=>{projectDetailVisible=false}"
    />

    <!-- 选择执行项目类别 -->
    <ExecuteProjectType
      v-if="projectTypeVisible"
      :visible="projectTypeVisible"
      @close="()=>{projectTypeVisible=false}"
      @success="callBackProjectType"
      :defaultCode="projectTypeCode"
    />

    <!-- 选择科目 -->
    <SubjectChoice
      :visible="subjectChoiceVisible"
      v-if="subjectChoiceVisible"
      @close="()=>{subjectChoiceVisible=false}"
      @success="callBackSubject"
    />

    <!-- 选择资金来源科目 -->
    <MoneySource
      :visible="moneyVisible"
      v-if="moneyVisible"
      @close="()=>{moneyVisible=false}"
      @success="callBackMoney"
      :defaultCodeArr="moneyCode"
    />

    <!-- 所属部门 -->
    <DepartmentChoiceDialog
      :visible="departmentVisible"
      v-if="departmentVisible"
      @close="()=>{departmentVisible=false}"
      @success="callBackDepartment"
      :defaultItems="defaultDepartmentItems"
      selectionType="radio"
    />

    <!-- 选择人员 -->
    <PersonChoiceDialog
      :visible="personVisible"
      v-if="personVisible"
      @close="()=>{personVisible=false}"
      @success="callBackPerson"
      :defaultItems="defaultPersonItems"
      selectionType="radio"
    />
  </div>
</template>
<script>
import ProjectEditPage from './ProjectEditPage.vue'
import ProjectDetailPage from './ProjectDetailPage.vue'
import {
  GetProjects_6P4EQuiEB5,
  Finished_9kVgt2kewj,
  SaveProjects_iePTommUNR,
  GetProjectCodesByBatchCode_k32OhaYMQ7
} from '@/api/getBatchData'
import { Query_HfcOXVLBiX } from '@/api/baseData'
import ExecuteProjectType from '@/components/projectItemDialog/ExecuteProjectType.vue'
import SubjectChoice from '@/components/projectItemDialog/SubjectChoice.vue'
import MoneySource from '@/components/projectItemDialog/MoneySource.vue'
import DepartmentChoiceDialog from '@/components/projectItemDialog/DepartmentChoiceDialog.vue'
import PersonChoiceDialog from '@/components/projectItemDialog/PersonChoiceDialog.vue'
import searchForm from 'mars-comps-lib/lib/mars-crud/src/components/search-form/index.vue'

export default {
  name: 'BatchDetailList',
  components: {
    ProjectEditPage,
    ProjectDetailPage,
    ExecuteProjectType,
    SubjectChoice,
    MoneySource,
    DepartmentChoiceDialog,
    PersonChoiceDialog,
    searchForm
  },
  props: {
    batchCode: {
      type: String,
      default: ''
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      finishedNew: false,
      loading: false,
      projectEditVisible: false,
      YSLX: [],
      ZCGNFL: [],
      tableData: [],
      tableDataOrigin: [],
      projectTypeVisible: false,
      projectTypeCode: '', //项目类别code
      subjectChoiceVisible: false,
      moneyVisible: false, //资金来源
      moneyCode: [],
      batchList: [],
      projectTypeRow: null, //项目类别
      subjectFiled: '',
      subjectRow: null,
      moneyRow: null,
      projectDetailVisible: false,
      projectCode: '',
      departmentRow: null,
      departmentVisible: false, //选择部门
      defaultDepartmentItems: [], //已经选择的部门
      personRow: null,
      personVisible: false,
      defaultPersonItems: [], //已经选择的人员
      forms: [
        {
          prop: 'name',
          label: '预算项目',
          placeholder: '请输入预算项目'
        },
        {
          prop: 'bmmc',
          label: '所属部门',
          placeholder: '请输入所属部门'
        },
        {
          prop: 'projectLeader',
          label: '项目负责人',
          placeholder: '请输入项目负责人'
        }
      ],
      rulelistConfig: {
        searchForm: {
          forms: []
        },
        columns: [
          {
            prop: 'ysName',
            label: '预算项目',
            align: 'center',
            fixed: 'left',
            minWidth: '180px',
            slotName: 'ysName'
          },
          {
            prop: 'lbName',
            label: '预算项目类别',
            align: 'center',
            minWidth: '140px',
            slotName: 'lbName'
          },
          {
            prop: 'ssyjxm',
            label: '所属一级项目',
            align: 'center',
            minWidth: '120px',
            slotName: 'ssyjxm'
          },
          {
            prop: 'code',
            label: '执行项目编号',
            align: 'center',
            minWidth: '130px',
            slotName: 'code'
          },
          {
            prop: 'name',
            label: '项目名称',
            align: 'center',
            minWidth: '130px',
            slotName: 'name'
          },
          {
            prop: 'projectType',
            label: '执行项目类别',
            align: 'center',
            minWidth: '130px',
            slotName: 'projectType'
          },
          {
            prop: 'department',
            label: '所属部门',
            align: 'center',
            minWidth: '130px',
            slotName: 'department'
          },
          {
            prop: 'functionalDepartment',
            label: '职能部门',
            align: 'center',
            minWidth: '130px',
            slotName: 'functionalDepartment'
          },
          {
            prop: 'directorNew',
            label: '项目负责人',
            align: 'center',
            minWidth: '130px',
            slotName: 'directorNew'
          },
          {
            prop: 'defaultDebitSubjectCode',
            label: '借方默认科目',
            align: 'center',
            minWidth: '130px',
            slotName: 'defaultDebitSubjectCode'
          },
          {
            prop: 'defaultDebitSubjectCodeYS',
            label: '默认预算借方科目',
            align: 'center',
            minWidth: '130px',
            slotName: 'defaultDebitSubjectCodeYS'
          },
          {
            prop: 'otherDebitSubjectCodes',
            label: '借方其他科目',
            align: 'center',
            minWidth: '130px',
            slotName: 'otherDebitSubjectCodes'
          },
          {
            prop: 'defaultCreditSubjectCode',
            label: '贷方默认科目',
            align: 'center',
            minWidth: '130px',
            slotName: 'defaultCreditSubjectCode'
          },
          {
            prop: 'defaultCreditSubjectCodeYS',
            label: '默认预算贷方科目',
            align: 'center',
            minWidth: '130px',
            slotName: 'defaultCreditSubjectCodeYS'
          },
          {
            prop: 'otherCreditSubjectCodes',
            label: '贷方其他科目',
            align: 'center',
            minWidth: '130px',
            slotName: 'otherCreditSubjectCodes'
          },
          {
            prop: 'fundsOriginSubjects',
            label: '可用资金来源',
            align: 'center',
            minWidth: '130px',
            slotName: 'fundsOriginSubjects'
          },
          {
            prop: 'budgetType',
            label: '预算管理类型',
            align: 'center',
            minWidth: '130px',
            slotName: 'budgetType'
          },
          {
            prop: 'purpose',
            label: '功能分类',
            align: 'center',
            minWidth: '130px',
            slotName: 'purpose'
          }
        ], //表头
        rowHandle: {
          fixed: 'left',
          actions: [
            {
              key: 'edit'
            },
            {
              key: 'check',
              label: '查看',
              icon: 'ibps-icon-detail'
            }
          ]
        },
        // 顶部按钮
        toolbars: [
          { key: 'back', label: '返 回', type: 'primary' },
          { key: 'savedetail', label: '保 存', type: 'primary' },
          { key: 'finish', label: '标志已完成', type: 'primary' }
          // { key: 'column', label: '自定义列', type: 'primary' }
        ]
      }
    }
  },

  mounted() {
    this.finishedNew = this.finished
    this.getList()
    this.queryZd('YSLX')
    this.queryZd('ZCGNFL')
  },
  methods: {
    queryZd(dictCode) {
      Query_HfcOXVLBiX({ dictCode }).then(res => {
        this[dictCode] = res.data.items || []
      })
    },

    getList() {
      this.loading = true
      GetProjects_6P4EQuiEB5({ batchCode: this.batchCode })
        .then(res => {
          // 对数据重新处理
          res.data.length &&
            res.data.forEach(f => {
              f.directorNew = f.directors.length
                ? f.directors[0]
                : {
                    name: '',
                    code: '',
                    isMainDirector: false
                  }
            })
          this.tableData = res.data || []
          this.tableDataOrigin = res.data || []
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    handleSearch() {
      let { name, bmmc, projectLeader } = this.$refs.searchForm.params
      this.tableData = this.tableDataOrigin.filter(
        f =>
          f.budgetProjectInfo.name.indexOf(name) !== -1 &&
          f.department.name.indexOf(bmmc) !== -1 &&
          f.directorNew.name.indexOf(projectLeader) !== -1
      )
    },

    handleResetSearch() {
      Object.keys(this.$refs.searchForm.params).forEach(key => {
        this.$refs.searchForm.params[key] = ''
      })
      this.handleSearch()
    },

    /**
     * 表格操作
     */
    handleAction(buttonKey, position, selection, data) {
      switch (buttonKey) {
        case 'edit':
          this.Edit(data) //编辑
          break
        case 'check':
          this.Check(data) //查看
          break
        case 'back':
          this.Back() //返回
          break
        case 'savedetail':
          this.Save() //保存
          break
        case 'finish':
          this.Finish() //标志已完成
          break
        case 'column':
          this.Column() //自定义列
          break
      }
    },

    Edit(data) {
      GetProjectCodesByBatchCode_k32OhaYMQ7({ batchCode: this.batchCode }).then(res => {
        this.batchList = res.data || [] //批次列表
        this.projectCode = data.budgetProjectInfo.code
        this.projectEditVisible = true
      })
    },

    Check(data) {
      this.projectCode = data.budgetProjectInfo.code
      this.projectDetailVisible = true
    },

    Back() {
      this.$emit('successBack')
    },

    Save() {
      if (!this.tableDataOrigin.length) {
        return this.$message.warning('列表无数据，无法执行该操作！')
      }
      let params = {
        batchCode: this.batchCode,
        projects: this.tableDataOrigin.map(f => {
          return {
            ...f,
            directors: [f.directorNew]
          }
        })
      }
      params.projects.forEach(f => {
        delete f.directorNew
      })
      this.loading = true
      SaveProjects_iePTommUNR(params)
        .then(res => {
          this.$message.success('保存成功！')
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    Finish() {
      this.loading = true
      Finished_9kVgt2kewj({ batchCode: this.batchCode })
        .then(res => {
          if (res.data.msg) {
            this.$message.warning(res.data.msg)
          } else {
            this.$message.success('操作成功！')
          }
          this.finishedNew = res.data.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    Column() {},

    // 项目执行类别
    clearProjectType(row) {
      Object.keys(row).forEach(key => {
        row[key] = ''
      })
    },

    openPeojectType(row) {
      this.projectTypeRow = row
      this.projectTypeCode = row.code
      this.projectTypeVisible = true
    },

    callBackProjectType(data) {
      Object.keys(this.projectTypeRow).forEach(key => {
        this.projectTypeRow[key] = ''
        if (data) {
          this.projectTypeRow[key] = data[key]
        }
      })
    },

    // 选择科目
    callBackSubject(data) {
      this.subjectRow[this.subjectFiled] = ''
      if (data) {
        this.subjectRow[this.subjectFiled] = data.code
      }
    },

    clearSubject(row, filed) {
      row[filed] = ''
    },

    openSubject(row, filed) {
      this.subjectFiled = filed
      this.subjectRow = row
      this.subjectChoiceVisible = true
    },

    // 资金来源
    callBackMoney(data) {
      this.moneyRow.fundsOriginSubjects = ''
      if (data.length) {
        this.moneyRow.fundsOriginSubjects = data.map(f => f.code).join(',')
      }
    },

    clearMoney(row) {
      row.fundsOriginSubjects = ''
    },

    openMoneySource(row) {
      this.moneyRow = row
      this.moneyCode = row.fundsOriginSubjects ? row.fundsOriginSubjects.split(',') : []
      this.moneyVisible = true
    },

    // 选择负责人
    clearPerson(row) {
      row.fzRs = ''
      row.directorNew.name = ''
      row.directorNew.code = ''
    },

    openPerson(row) {
      this.personRow = row
      this.defaultPersonItems = [this.personRow.directorNew]
      this.personVisible = true
    },

    callBackPerson(data) {
      this.personRow.directorNew.name = ''
      this.personRow.directorNew.code = ''
      this.personRow.fzRs = ''
      if (data) {
        this.personRow.fzRs = data.code
        this.personRow.directorNew.name = data.name
        this.personRow.directorNew.code = data.code
      }
    },

    // 选择部门
    clearDepartment(row) {
      Object.keys(row).forEach(key => {
        row[key] = ''
      })
    },

    openDepartment(row) {
      this.departmentRow = row
      this.defaultDepartmentItems = [row]
      this.departmentVisible = true
    },

    callBackDepartment(data) {
      Object.keys(this.departmentRow).forEach(key => {
        this.departmentRow[key] = ''
        if (data) {
          this.departmentRow[key] = data[key]
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.batch-detail_list {
  ::v-deep .el-table tr {
    height: 40px;
  }
  .header-list-detail {
    padding-bottom: 10px;
    padding-left: 10px;
    display: flex;
    p {
      font-weight: 600;
      margin-right: 6px;
    }
  }
  ::v-deep.ibps-container-crud {
    padding: 10px;
  }
}
</style>
