<template>
  <mars-dialog
    :fullscreen="false"
    class="choice-dialog"
    :modal="true"
    :modal-append-to-body="false"
    title="选择资金来源科目"
    v-if="visible"
    @close="closeDialog"
  >
    <div class="subject-list">
      <div class="subject-list_top">
        <el-input clearable v-model.trim="subjectName" @clear="resetFn" placeholder="请输入科目名称"></el-input>
        <el-button class="search-btn" @click="searchFn" type="primary" icon="ibps-icon-search">搜 索</el-button>
        <el-button type="primary" @click="resetFn" icon="ibps-icon-refresh">重 置</el-button>
      </div>
      <el-table
        class="subject-list_bottom"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        v-loading="loading"
        ref="multipleTable"
        tooltip-effect="dark"
        :data="tableData"
        height="100%"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column prop="code" align="center" label="科目编号" min-width="120" show-overflow-tooltip />
        <el-table-column prop="name" align="center" label="科目名称" min-width="160" show-overflow-tooltip />
        <el-table-column prop="fullName" align="center" label="全称" min-width="160" show-overflow-tooltip />
        <el-table-column prop="mnemonic" align="center" label="助记码" min-width="120" show-overflow-tooltip />
        <el-table-column prop="level" align="center" label="级次" min-width="80" show-overflow-tooltip />
        <el-table-column prop="isDetailString" align="center" label="是否明细" min-width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" align="center" label="备注" min-width="140" show-overflow-tooltip />
      </el-table>
    </div>
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
import { QueryAll_LStvbphNQE } from '@/api/baseData'
export default {
  name: 'MoneySource',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    defaultCodeArr: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      tableDataOrigin: [],
      selection: [],
      subjectName: ''
    }
  },
  created() {
    this.loading = true
    QueryAll_LStvbphNQE({})
      .then(res => {
        this.tableData = res.data || []
        this.tableDataOrigin = res.data || []
        let arr = []
        this.defaultCodeArr.forEach(f => {
          res.data.forEach(item => {
            if (item.code === f) {
              arr.push(item)
            }
          })
        })
        this.$nextTick(() => {
          arr.forEach(item => {
            this.$refs.multipleTable.toggleRowSelection(item, true)
          })
        })
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    searchFn() {
      this.tableData = this.tableDataOrigin.filter(item => item.name.indexOf(this.subjectName) !== -1)
    },

    resetFn() {
      this.subjectName = ''
      this.searchFn()
    },

    handleSelectionChange(selection) {
      this.selection = selection
    },

    saveConfim() {
      this.$emit('success', this.selection)
      this.closeDialog()
    },

    clearAll() {
      this.selection = []
      this.$refs.multipleTable.clearSelection()
    }
  }
}
</script>
<style lang="scss" scoped>
.choice-dialog {
  ::v-deep.el-dialog__body {
    .fw-dialog-body {
      height: 100%;
    }
  }
  .subject-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    .subject-list_bottom {
      flex: 1;
    }
    .subject-list_top {
      display: flex;
      margin-bottom: 20px;
      .el-input {
        width: 200px;
      }
      .search-btn {
        margin: 0 10px;
      }
    }
  }
}
</style>
