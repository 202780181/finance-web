<template>
  <mars-dialog
    :fullscreen="false"
    class="choice-dialog"
    :modal="true"
    :modal-append-to-body="false"
    title="选择人员"
    v-if="visible"
    @close="closeDialog"
  >
    <mars-crud
      ref="crud"
      :columns="listConfig.columns"
      :search-form="listConfig.searchForm"
      :autoSearch="false"
      @selection-change="handleSelectChange"
      :selectionType="selectionType"
      :selectionRow="true"
      pkKey="code"
    >
      <template slot="searchForm">
        <el-form :inline="true" ref="queryForm" label-width="130px" class="queryForm" :model="queryForm">
          <el-form-item label="编号" prop="pCode">
            <el-input placeholder="请输入编号" v-model.trim="queryForm.pCode" clearable></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="pName">
            <el-input placeholder="请输入名称" v-model.trim="queryForm.pName" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin:0 5px" type="primary" icon="ibps-icon-search" @click="handleSearch">查询</el-button>
            <el-button type="primary" icon="ibps-icon-refresh" @click="handleResetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template slot="departmentCode" slot-scope="scope">
        <span>{{scope.row.department.code || '--'}}</span>
      </template>
      <template slot="departmentName" slot-scope="scope">
        <span>{{scope.row.department.name || '--'}}</span>
      </template>
      <template slot="degreeName" slot-scope="scope">
        <span>{{scope.row.degree?scope.row.degree.name : '--'}}</span>
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
    <template slot="ms-foot">
      <el-button type="primary" icon="ibps-icon-save" @click="saveConfim">
        <span style="padding-left:5px;">确 定</span>
      </el-button>
      <el-button type="primary" @click="clearAll" icon="el-icon-delete">清空选择</el-button>
      <el-button @click="closeDialog" icon="el-icon-circle-close">取 消</el-button>
    </template>
  </mars-dialog>
</template>
<script>
import { queryPersonInfo } from '@/api/baseData'
import _clonedeep from 'lodash.clonedeep'
export default {
  name: 'PersonChoiceDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },

    selectionType: {
      //单选radio 还是多选 checkbox
      type: String,
      default: 'checkbox'
    },

    defaultItems: {
      // 接收初始选中值
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      total: 0,
      selection: [],
      queryForm: {
        pCode: '', //编号
        pName: '' //名称
      },
      listConfig: {
        columns: [
          {
            prop: 'code',
            label: '编号',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'name',
            label: '名称',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'departmentCode',
            label: '部门编号',
            align: 'center',
            minWidth: '120px',
            slotName: 'departmentCode'
          },
          {
            prop: 'departmentName',
            label: '部门名称',
            align: 'center',
            minWidth: '120px',
            slotName: 'departmentName'
          },
          {
            prop: 'degreeName',
            label: '编制',
            align: 'center',
            minWidth: '120px',
            slotName: 'degreeName'
          }
        ],
        searchForm: {
          forms: []
        }
      }
    }
  },
  mounted() {
    this.getList(false)
  },
  methods: {
    // 默认选中
    giveChoiceItems() {
      this.$nextTick(() => {
        // 先清空选项
        this.$refs['crud'].$refs['elTable'].clearSelection()
        this.selection = _clonedeep(this.defaultItems)
        if (!this.selection.length) {
          return
        }
        this.toggleRowSelectionFn()
      })
    },

    handlePaginationSizeChange(val) {
      this.pageSize = val
      this.getList(true)
    },

    handlePaginationCurrentChange(val) {
      this.currentPage = val
      this.getList(true)
    },

    getList(boolean) {
      this.$nextTick(() => {
        this.$refs.crud.loading = true
        let params = {
          search: this.queryForm,
          requestPage: {
            limit: this.pageSize,
            pageNo: this.currentPage
          }
        }
        queryPersonInfo(params)
          .then(res => {
            this.$refs.crud.ibpsData = res.data.dataResult || []
            this.total = res.data.pageResult.totalCount || 0
            this.$refs.crud.loading = false
            !boolean && this.giveChoiceItems()
          })
          .catch(() => {
            this.$refs.crud.loading = false
          })
      })
    },

    toggleRowSelectionFn() {
      let selectAllIds = []
      this.selection.forEach(row => {
        selectAllIds.push(row.code)
      })
      if (this.$refs.crud.ibpsData.length) {
        this.$refs.crud.ibpsData.forEach(f => {
          selectAllIds.forEach(i => {
            if (f.code === i) {
              this.$refs['crud'].$refs['elTable'].toggleRowSelection(f, true)
              if (this.selectionType === 'radio') {
                // 单选
                this.$refs['crud'].selectionRadio = f.code
                console.log(this.$refs['crud'].selectionRadio)
              }
            }
          })
        })
      }
    },

    handleSearch() {
      this.currentPage = 1
      this.getList(true)
    },

    handleResetSearch() {
      this.$refs.queryForm.resetFields()
      this.handleSearch()
    },

    handleSelectChange(val) {
      this.selection = val
    },

    closeDialog() {
      this.$emit('close')
    },

    // 确定
    saveConfim() {
      let selection = null
      if (Array.isArray(this.selection)) {
        if (this.selectionType === 'radio') {
          selection = this.selection.length ? this.selection[0] : null
        } else {
          selection = this.selection
        }
      } else {
        selection = this.selection
      }
      this.$emit('success', selection)
      this.closeDialog()
    },

    // 清空选择
    clearAll() {
      this.selection = []
      this.$nextTick(() => {
        this.$refs.crud.toggleSelection([])
      })
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
