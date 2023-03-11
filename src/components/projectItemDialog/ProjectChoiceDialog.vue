<template>
  <mars-dialog
    :fullscreen="false"
    class="choice-dialog"
    :modal="true"
    :modal-append-to-body="false"
    title="选择项目"
    v-if="visible"
    @close="closeDialog"
  >
    <div class="project-content">
      <div class="project-content_tree">
        <div class="tree-content_left-input">
          <p>预算支出项</p>
          <el-input placeholder="请输入内容" v-model.trim="filterText" clearable size="mini"></el-input>
        </div>
        <div class="project-content_tree-content">
          <el-tree ref="tree" :filter-node-method="filterNode" :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
            <div class="custom-tree-node" slot-scope="{ node }">
              <span :title="node.label">{{ node.label }}</span>
            </div>
          </el-tree>
        </div>
      </div>
      <div class="project-content_table">
        <mars-crud
          ref="crud"
          :columns="listConfig.columns"
          :search-form="listConfig.searchForm"
          :autoSearch="false"
          pkKey="code"
          @selection-change="selectionChange"
          :selectionRow="true"
          :indexRow="false"
        >
          <template slot="header">
            <div style="margin:0 0 10px 10px;" class="clear">tips：没有项目编号和执行项目类别的项目无法下达额度，不在本列表页。</div>
          </template>
          <template slot="searchForm">
            <searchForm :labelWidth="110" ref="searchForm" :forms="forms" @search="handleSearch" @reset-search="handleResetSearch" />
          </template>

          <template slot="zxType" slot-scope="scope">
            <span>{{scope.row.projectType.code}} {{scope.row.projectType.name}}</span>
          </template>

          <template slot="xh" slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>

          <template slot="ysProject" slot-scope="scope">
            <span>{{scope.row.budgetProjectInfo.code}} {{scope.row.budgetProjectInfo.name}}</span>
          </template>

          <template slot="ysZcx" slot-scope="scope">
            <span>{{scope.row.budget.code}} {{scope.row.budget.name}}</span>
          </template>

          <template slot="topProject" slot-scope="scope">
            <span>{{scope.row.topProject.code}} {{scope.row.topProject.name}}</span>
          </template>
          <template slot="department" slot-scope="scope">
            <span>{{scope.row.department.name}}</span>
          </template>

          <template slot="functionalDepartment" slot-scope="scope">
            <span>{{scope.row.functionalDepartment.name}}</span>
          </template>

          <template slot="directors" slot-scope="scope">
            <span>{{scope.row.directors.length?scope.row.directors[0].name:''}}</span>
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
      <div class="project-content_choose">
        <p>已选择项目({{selection.length}})</p>
        <p v-for="(item,index) in selection" :key="item.code">
          <el-tag style="margin-top:10px" :disable-transitions="true" closable @close="handleCloseTag(item,index)">
            <span>{{item.code}}-{{item.name}}</span>
          </el-tag>
        </p>
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
import searchForm from 'mars-comps-lib/lib/mars-crud/src/components/search-form/index.vue'
import { SearchProject_AOFZuAWEg4, GetAll_uR8YTYIK20 } from '@/api/baseData'
import _clonedeep from 'lodash.clonedeep'
import treeUtil from '@/utils/tree'
export default {
  name: 'ProjectChoiceDialog',
  components: {
    searchForm
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    QuotaType: {
      type: String,
      default: 'Appropriation'
    }
  },
  data() {
    return {
      filterText: '',
      forms: [
        {
          prop: 'code',
          label: '执行项目编号',
          placeholder: '请输入执行项目编号',
          itemWidth: '130'
        },
        {
          prop: 'name',
          label: '项目名称',
          placeholder: '请输入项目名称',
          itemWidth: '130'
        },
        {
          prop: 'deptName',
          label: '所属部门',
          placeholder: '请输入所属部门',
          itemWidth: '130'
        }
      ],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      listConfig: {
        columns: [
          {
            prop: 'xh',
            label: '序号',
            align: 'center',
            width: '50px',
            fixed: 'left',
            slotName: 'xh'
          },
          {
            prop: 'code',
            label: '执行项目编号',
            align: 'center',
            minWidth: '120px',
            fixed: 'left'
          },
          {
            prop: 'name',
            label: '项目名称',
            align: 'center',
            minWidth: '120px',
            fixed: 'left'
          },
          {
            prop: 'zxType',
            label: '执行项目类别',
            align: 'center',
            minWidth: '140px',
            slotName: 'zxType'
          },
          {
            prop: 'ysProject',
            label: '预算项目',
            align: 'center',
            minWidth: '150px',
            slotName: 'ysProject'
          },
          {
            prop: 'ysZcx',
            label: '预算支出项',
            align: 'center',
            minWidth: '120px',
            slotName: 'ysZcx'
          },
          {
            prop: 'topProject',
            label: '所属一级项目',
            align: 'center',
            minWidth: '160px',
            slotName: 'topProject'
          },
          {
            prop: 'department',
            label: '所属部门',
            align: 'center',
            minWidth: '120px',
            slotName: 'department'
          },
          {
            prop: 'functionalDepartment',
            label: '职能部门',
            align: 'center',
            minWidth: '120px',
            slotName: 'functionalDepartment'
          },
          {
            prop: 'directors',
            label: '项目负责人',
            align: 'center',
            minWidth: '120px',
            slotName: 'directors'
          }
        ],
        searchForm: {
          forms: []
        }
      },
      currentPage: 1,
      pageSize: 20,
      total: 0,
      selection: [],
      projectTypeId: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getList()
    this.getTree()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },

    getTree() {
      GetAll_uR8YTYIK20({}).then(res => {
        this.treeData = treeUtil.transformToTreeFormat(res.data, {
          idKey: 'id',
          pIdKey: 'pId',
          nameKey: 'name',
          childrenKey: 'children'
        })
      })
    },

    // 查询数据
    getList() {
      this.$nextTick(() => {
        this.$refs.crud.loading = true
        let params = {
          search: {
            ...this.$refs.searchForm.params,
            projectTypeId: this.projectTypeId,
            QuotaType: this.QuotaType
          },
          requestPage: {
            limit: this.pageSize,
            pageNo: this.currentPage
          }
        }
        SearchProject_AOFZuAWEg4(params)
          .then(res => {
            this.$refs.crud.ibpsData = res.data.dataResult || []
            this.total = res.data.pageResult.totalCount || 0
            this.$refs.crud.loading = false
          })
          .catch(() => {
            this.$refs.crud.loading = false
          })
      })
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
      this.currentPage = 1
      this.getList()
    },

    handleResetSearch() {
      Object.keys(this.$refs.searchForm.params).forEach(key => {
        this.$refs.searchForm.params[key] = ''
      })
      this.projectTypeId = ''
      this.handleSearch()
    },

    selectionChange(val) {
      this.selection = val
    },

    handleCloseTag(item, index) {
      let tmp = this.selection[index]
      this.selection.splice(index, 1)
      this.$refs.crud.toggleSelection([tmp])
    },

    handleNodeClick(node) {
      if (!node.children) {
        this.projectTypeId = node.id
        this.handleSearch()
      }
    },

    closeDialog() {
      this.$emit('close')
    },

    saveConfim() {
      this.$emit('success', this.selection)
      this.closeDialog()
    },

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
  ::v-deep .el-dialog {
    width: 90% !important;
  }
}
::v-deep .el-table tr {
  height: 40px;
}
.project-content {
  display: flex;
  height: 100%;
  .project-content_tree {
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 10px;
    width: 20%;
    display: flex;
    flex-direction: column;
  }
  .project-content_table {
    flex: 1;
    position: relative;
    height: 100%;
  }
  .project-content_choose {
    width: 20%;
    border: 1px dashed #ccc;
    border-radius: 2px;
    padding: 10px;
    overflow-y: auto;
  }
  .tree-content_left-input {
    padding-bottom: 10px;
    & > p {
      margin-bottom: 10px;
    }
  }
}
.project-content_tree-content {
  flex: 1;
  overflow: auto;
  .el-tree {
    height: 100% !important;
    .custom-tree-node {
      font-size: 12px;
      width: 100%;
      overflow: hidden; //超出隐藏
      white-space: nowrap; //不折行
      text-overflow: ellipsis; //溢出显示省略号
    }
  }
}
</style>
