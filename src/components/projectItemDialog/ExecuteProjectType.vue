<template>
  <mars-dialog
    :fullscreen="false"
    class="choice-dialog"
    :modal="true"
    :modal-append-to-body="false"
    title="选择项目类别"
    v-if="visible"
    @close="closeDialog"
  >
    <div class="tree-content" element-loading-text="加载中" element-loading-spinner="el-icon-loading" v-loading="loading">
      <div class="tree-content_left">
        <div class="tree-content_left-input">
          <el-input placeholder="请输入内容" v-model.trim="filterText" clearable size="mini"></el-input>
        </div>
        <el-tree ref="tree" :filter-node-method="filterNode" :data="projectTypeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="tree-content_right">
        <p v-if="selectedNodes">
          <el-tag :disable-transitions="true" closable @close="handleCloseTag">
            <span class="choice-tags-span">（{{selectedNodes.code}}）-{{selectedNodes.name}}</span>
          </el-tag>
        </p>
      </div>
    </div>
    <template slot="ms-foot">
      <el-button type="primary" icon="ibps-icon-save" @click="saveConfim">
        <span style="padding-left:5px;">确 定</span>
      </el-button>
      <el-button @click="closeDialog" icon="el-icon-circle-close">取 消</el-button>
    </template>
  </mars-dialog>
</template>
<script>
import { GetAll_uR8YTYIK20 } from '@/api/baseData'
import treeUtil from '@/utils/tree'
export default {
  name: 'ExecuteProjectType',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    defaultCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      filterText: '',
      projectTypeData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      selectedNodes: null,
      loading: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.loading = true
    GetAll_uR8YTYIK20({})
      .then(res => {
        this.projectTypeData = treeUtil.transformToTreeFormat(res.data, {
          idKey: 'id',
          pIdKey: 'pId',
          nameKey: 'name',
          childrenKey: 'children'
        })
        res.data.forEach(item => {
          if (item.code === this.defaultCode) {
            this.selectedNodes = item
          }
        })
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    saveConfim() {
      this.$emit('success', this.selectedNodes)
      this.closeDialog()
    },
    closeDialog() {
      this.$emit('close')
    },

    handleNodeClick(node) {
      if (node.children && node.children.length) {
        return this.$message.warning('含有子级类别不能选择！')
      }
      this.selectedNodes = node
    },

    handleCloseTag() {
      this.selectedNodes = null
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
    .tree-content {
      height: 100%;
      display: flex;
    }
    .tree-content_right {
      width: 30%;
      border: 1px dashed #ccc;
      border-radius: 2px;
      padding: 10px;
      overflow-y: auto;
    }
    .tree-content_left {
      flex: 1;
      padding: 10px;
    }
    .tree-content_left-input {
      padding-bottom: 10px;
    }
  }
}
</style>
