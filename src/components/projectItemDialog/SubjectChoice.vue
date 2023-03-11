<template>
  <mars-dialog
    :fullscreen="false"
    class="choice-dialog"
    :modal="true"
    :modal-append-to-body="false"
    title="选择科目"
    v-if="visible"
    @close="closeDialog"
  >
    <div class="tree-content" element-loading-text="加载中" element-loading-spinner="el-icon-loading" v-loading="loading">
      <div class="tree-content_top">
        <el-radio-group v-model="activeName" @change="changeRadio">
          <el-radio-button :label="item.property" v-for="item in options" :key="item.property">{{item.propertyString}}</el-radio-button>
        </el-radio-group>
        <div class="tree-content_top-search">
          <el-input clearable v-model.trim="subjectName" @clear="resetFn" placeholder="请输入科目名称"></el-input>
          <el-button class="search-btn" @click="searchFn" type="primary" icon="ibps-icon-search">搜 索</el-button>
          <el-button type="primary" @click="resetFn" icon="ibps-icon-refresh">重 置</el-button>
        </div>
      </div>
      <div class="tree-content_bottom">
        <el-table ref="multipleTable" tooltip-effect="dark" :data="tableData" height="100%" border style="width: 100%" @select="selectInfo">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column prop="code" align="center" fixed="left" label="科目编号" min-width="120" show-overflow-tooltip />
          <el-table-column prop="name" align="center" fixed="left" label="科目名称" min-width="200" show-overflow-tooltip />
          <el-table-column prop="fullName" align="center" label="科目全称" min-width="200" show-overflow-tooltip />
          <el-table-column prop="typeString" align="center" label="会计类别" min-width="120" show-overflow-tooltip />
          <el-table-column prop="categoryString" align="center" label="科目类型" min-width="120" show-overflow-tooltip />
          <el-table-column prop="directionString" align="center" label="余额方向" min-width="120" show-overflow-tooltip />
          <el-table-column prop="mnemonic" label="助记码" align="center" min-width="120" show-overflow-tooltip />
          <el-table-column label="科目类别" prop="propertyString" align="center" min-width="120" show-overflow-tooltip />
          <el-table-column prop="auxiliaryAccountingString" label="辅助核算" align="center" min-width="120" show-overflow-tooltip />
          <el-table-column prop="level" label="级次" align="center" min-width="80" show-overflow-tooltip />
          <el-table-column prop="isDetail" label="明细" align="center" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.isDetail?'是':'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="isForeignCurrencyAccounting" label="外币核算" align="center" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.isForeignCurrencyAccounting?'是':'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="foreignCurrencyID" label="外币编号" align="center" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enable" label="启用" align="center" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.enable?'是':'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="isCashFlow" label="现金流量" align="center" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.isCashFlow?'是':'否'}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="ibps-container-crud__footer">
        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next, jumper, total"
          :pagerCount="5"
          @current-change="handlePaginationCurrentChange"
        ></el-pagination>
      </div>
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
import { QueryAll_3PUSmhqzSp } from '@/api/baseData'
import { uniqBy } from 'lodash'
export default {
  name: 'SubjectChoice',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [],
      activeName: 'All',
      loading: false,
      tableData: [],
      selectionRow: null,
      subjectName: '',

      currentPage: 1,
      pageSize: 20,
      total: 0
    }
  },
  created() {
    this.querySubject()
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    changeRadio() {
      this.subjectName = ''
      this.currentPage = 1
      this.getList()
    },

    getList() {
      this.selectionRow = null
      this.options.forEach(f => {
        if (f.property === this.activeName) {
          let arr = f.tableData.filter(item => item.name.indexOf(this.subjectName) !== -1)
          this.tableData = arr.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
          this.total = arr.length || 0
        }
      })
    },

    searchFn() {
      //查询
      this.currentPage = 1
      this.getList()
    },

    resetFn() {
      //重置
      this.subjectName = ''
      this.searchFn()
    },

    handlePaginationCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },

    clearAll() {
      this.selectionRow = null
      this.$refs.multipleTable.clearSelection()
    },

    selectInfo(selection, row) {
      this.$refs.multipleTable.clearSelection()
      if (selection.length === 0) return
      this.$refs.multipleTable.toggleRowSelection(row, true)
      this.selectionRow = row
    },

    saveConfim() {
      this.$emit('success', this.selectionRow)
      this.closeDialog()
    },

    querySubject() {
      this.loading = true
      QueryAll_3PUSmhqzSp({})
        .then(res => {
          let arr = res.data || []
          let objArr = [
            {
              property: 'All',
              propertyString: '全部',
              tableData: res.data || []
            }
          ]
          arr.forEach(item => {
            objArr.push({
              property: item.property,
              propertyString: item.propertyString,
              tableData: []
            })
          })
          objArr = uniqBy(objArr, 'property')
          objArr.forEach(f => {
            arr.forEach(m => {
              if (m.property === f.property) {
                f.tableData.push(m)
              }
            })
          })
          this.options = objArr
          this.changeRadio()
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.ibps-container-crud__footer {
  margin-top: 10px;
  text-align: right;
}
.choice-dialog {
  ::v-deep.el-dialog__body {
    .fw-dialog-body,
    .tree-content {
      height: 100%;
    }
  }
}
.tree-content {
  display: flex;
  flex-direction: column;
  .tree-content_top {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .tree-content_top-search {
      display: flex;
      .el-input {
        width: 200px;
      }
      .search-btn {
        margin: 0 10px;
      }
    }
  }
  .tree-content_bottom {
    flex: 1;
  }
  ::v-deep .el-table tr {
    height: 40px;
  }
  ::v-deep .el-table .el-table-column--selection.is-leaf .el-checkbox {
    display: none;
  }
}
</style>
