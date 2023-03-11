<template>
  <div v-if="visible">
    <mars-dialog
      v-if="visible"
      :modal-append-to-body="false"
      :fullscreen="true"
      class="dialogFixedTop"
      :title="title"
      @close="closeDialog"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-tabs v-model="activeName" class="el-tabs_reset">
        <el-tab-pane label="项目信息" name="1">
          <ProjectInfoTabs />
        </el-tab-pane>
        <el-tab-pane label="费用预算" name="2">
          <FeeList />
        </el-tab-pane>
        <el-tab-pane label="预算信息" name="3">
          <FeeInfoList />
        </el-tab-pane>
      </el-tabs>
      <template slot="ms-foot">
        <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
      </template>
    </mars-dialog>
  </div>
</template>
<script>
import FeeList from './comps/FeeList.vue'
import FeeInfoList from './comps/FeeInfoList.vue'
import ProjectInfoTabs from './comps/ProjectInfoTabs.vue'
export default {
  name: 'ExecuteProjectCheckDetail',
  components: {
    FeeList,
    FeeInfoList,
    ProjectInfoTabs
  },
  props: {
    title: {
      type: String,
      default: '信息运维项目'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      activeName: '1'
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tabs_reset {
  ::v-deep .el-tabs__content {
    border: none;
    padding: 0;
  }
  ::v-deep.el-tabs__header {
    .el-tabs__item.is-top {
      background: #fff;
    }
    .el-tabs__nav-scroll .el-tabs__nav.is-top .el-tabs__item {
      border: none !important;
    }
    .el-tabs__item.is-active {
      border-top: none !important;
    }
    .el-tabs__item {
      padding: 0 20px;
    }
  }
}

.dialogFixedTop {
  ::v-deep.el-dialog__body {
    .fw-dialog-body {
      height: 100%;
    }
  }
}
</style>
