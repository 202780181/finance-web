<template>
  <div v-if="visible">
    <mars-dialog
      v-if="visible"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      :fullscreen="true"
      class="dialogFixedTop"
      :title="title"
      @close="closeDialog"
    >
      <div class="batch-editor_page">
        <el-tabs v-model="activeName" class="el-tabs_reset">
          <el-tab-pane label="批次信息" name="1">
            <ReservedRegisterBatchList :readonly="readonly" />
          </el-tab-pane>
          <el-tab-pane label="附件" name="2">
            <AttachmentList :readonly="readonly" />
          </el-tab-pane>
        </el-tabs>
        <el-form :inline="true">
          <el-form-item label="制单：">
            <div class="detail-font">11-180000</div>
          </el-form-item>
          <el-form-item label="审核：">
            <div class="detail-font">财务处办公费</div>
          </el-form-item>
          <el-form-item label="复核：" v-if="readonly">
            <div class="detail-font">财务处办公费</div>
          </el-form-item>
        </el-form>
      </div>

      <template slot="ms-foot">
        <template v-if="!readonly">
          <el-button type="primary" @click="identify">
            <span style="padding-left:5px;">审 核</span>
          </el-button>
          <el-button icon="ibps-icon-save" type="primary" @click="submit">
            <span style="padding-left:5px;">保 存</span>
          </el-button>
        </template>
        <template v-if="readonly">
          <el-button type="danger" @click="cancelSh">
            <span style="padding-left:5px;">取消审核</span>
          </el-button>
          <el-button icon="ibps-icon-save" type="primary" @click="print">
            <span style="padding-left:5px;">打印</span>
          </el-button>
        </template>
        <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
      </template>
    </mars-dialog>
  </div>
</template>
<script>
import AttachmentList from '../../DepartmentProjectQuery/ReleaseAndRecycleAudit/components/AttachmentList.vue'
import ReservedRegisterBatchList from './ReservedRegisterBatchList.vue'
export default {
  name: 'ReservedRegisterCommonPage',
  components: {
    AttachmentList,
    ReservedRegisterBatchList
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '留用登记'
    },

    pageType: {
      type: String,
      default: 'edit'
    }
  },
  data() {
    return {
      loading: false,
      activeName: '1',
      readonly: false
    }
  },
  created() {
    this.readonly = this.pageType === 'edit' ? false : true
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    identify() {},

    submit() {},

    cancelSh() {},

    print() {}
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
.batch-editor_page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.detail-font {
  font-size: 13px;
  line-height: 33px;
  margin-right: 40px;
}
.dialogFixedTop {
  ::v-deep.el-dialog__body {
    .fw-dialog-body {
      height: 100%;
    }
  }
}
</style>
