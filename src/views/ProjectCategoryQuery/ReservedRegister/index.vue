<template>
  <ibps-container type="full" class="page">
    <!-- 留用登记 -->
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
        <template v-slot:footer>
          <div class="ibps-container-crud__footer">nihao</div>
        </template>
      </mars-crud>
    </div>
    <!-- 选择项目 -->
    <ProjectChoiceDialog :visible="projectVisible" v-if="projectVisible" @close="()=>{projectVisible=false}" />

    <!-- 编辑/详情页面 -->
    <ReservedRegisterCommonPage :pageType="pageType" :visible="visible" v-if="visible" @close="()=>{visible=false}" />
  </ibps-container>
</template>
<script>
import searchForm from 'mars-comps-lib/lib/mars-crud/src/components/search-form/index.vue'
import ProjectChoiceDialog from '@/components/projectItemDialog/ProjectChoiceDialog.vue'
import ReservedRegisterCommonPage from './ReservedRegisterCommonPage.vue'

export default {
  name: 'ReservedRegister',
  components: {
    searchForm,
    ProjectChoiceDialog,
    ReservedRegisterCommonPage
  },
  data() {
    return {
      selection: [],
      projectVisible: false,
      visible: false,
      forms: [
        {
          prop: 'batchCode',
          label: '留用批次号',
          placeholder: '请输入留用批次号'
        },
        {
          prop: 'createUser',
          label: '创建人',
          placeholder: '请输入创建人'
        },
        {
          prop: 'status',
          label: '状态',
          fieldType: 'select',
          options: [{ value: '1', label: '财务变更' }]
        }
      ],
      listConfig: {
        toolbars: [
          { key: 'add', label: '新增' },
          { key: 'removeBatch', type: 'danger', label: '删除', icon: 'ibps-icon-remove' },
          { key: 'cancelShBatch', type: 'danger', label: '取消审核' }
        ],
        columns: [
          {
            prop: 'code',
            label: '留用批次号',
            align: 'center',
            minWidth: '140px',
            fixed: 'left'
          },
          {
            prop: 'source',
            label: '状态',
            align: 'center',
            minWidth: '100px'
          },
          {
            prop: 'status',
            label: '项目数量',
            align: 'center',
            minWidth: '100px'
          },
          {
            prop: 'num',
            label: '计划留用总额度',
            align: 'center',
            minWidth: '160px'
          },
          {
            prop: 'money',
            label: '创建人',
            align: 'center',
            minWidth: '120px'
          },

          {
            prop: 'createTime',
            label: '创建时间',
            align: 'center',
            minWidth: '160px'
          },
          {
            prop: 'createTime',
            label: '审核时间',
            align: 'center',
            minWidth: '160px'
          }
        ],
        rowHandle: {
          fixed: 'left',
          actions: [
            {
              key: 'cancelSh',
              type: 'primary',
              label: '取消审核'
            },
            {
              key: 'edit'
            },
            {
              key: 'remove',
              type: 'danger'
            },
            {
              key: 'check',
              label: '查看',
              icon: 'ibps-icon-detail'
            }
          ]
        },
        searchForm: {
          forms: []
        }
      },
      pageType: 'edit'
    }
  },
  mounted() {
    this.getList()
  },

  methods: {
    getList() {
      this.$refs.crud.ibpsData = [{}, {}]
    },
    /**
     * 表格操作
     */
    handleAction(buttonKey, position, selection, data) {
      switch (buttonKey) {
        case 'add':
          this.goAdd()
          break
        case 'removeBatch':
          this.removeBatch()
          break
        case 'cancelShBatch':
          this.cancelShBatch()
          break
        case 'cancelSh':
          this.cancelSh(data)
          break
        case 'edit':
          this.edit(data)
          break
        case 'remove':
          this.remove(data)
          break
        case 'check':
          this.check(data)
          break
      }
    },

    edit(data) {
      this.pageType = 'edit'
      this.visible = true
    },

    check(data) {
      this.pageType = 'detail'
      this.visible = true
    },

    goAdd() {
      this.projectVisible = true
    },

    removeBatch() {
      if (!this.selection.length) {
        return this.$message.warning('请选择需要删除的数据！')
      }
      this.$confirm('确定删除选中数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {})
    },

    cancelShBatch() {
      if (!this.selection.length) {
        return this.$message.warning('请选择需要取消审核的数据！')
      }
      this.$confirm('确定取消审核吗？', '提示', {
        confirmButtonText: '取消审核',
        cancelButtonText: '关闭',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {})
    },

    remove(data) {
      this.$confirm('确定删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {})
    },

    cancelSh(data) {
      this.$confirm('确定取消审核吗？', '提示', {
        confirmButtonText: '取消留用',
        cancelButtonText: '关闭',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {})
    },

    selectionChange(val) {
      this.selection = val
    },

    summaryMethod() {},

    handleSearch() {},

    handleResetSearch() {}
  }
}
</script>
<style lang="scss" scoped>
.table-data_list {
  ::v-deep .el-table tr {
    height: 40px;
  }
}
</style>
