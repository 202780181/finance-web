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
        <el-tab-pane label="年度预算信息" name="1">
          <AnnualBudgetInfoList />
        </el-tab-pane>
        <el-tab-pane label="费用预算信息" name="2">
          <ExpenseBudgetInformation />
        </el-tab-pane>
        <el-tab-pane label="执行明细" name="3">
          <ExecuteDetailsTabs />
        </el-tab-pane>
      </el-tabs>
      <template slot="ms-foot">
        <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
      </template>
    </mars-dialog>
  </div>
</template>
<script>
import ExecuteDetailsTabs from './comps/ExecuteDetailsTabs.vue'
import ExpenseBudgetInformation from './comps/ExpenseBudgetInformation.vue'
import AnnualBudgetInfoList from './comps/AnnualBudgetInfoList.vue'
export default {
  name: 'CheckYearBudgetInfo',
  components: {
    ExecuteDetailsTabs,
    ExpenseBudgetInformation,
    AnnualBudgetInfoList
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
