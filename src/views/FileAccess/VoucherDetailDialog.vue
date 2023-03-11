<template>
  <mars-dialog
    :fullscreen="false"
    class="choice-dialog"
    :modal="true"
    :modal-append-to-body="false"
    title="凭证查看"
    v-if="visible"
    @close="closeDialog"
  >
    <div class="voucher-detail">
      <el-form label-width="80px" :inline="true">
        <el-form-item label="日期：">
          <div class="form-div">11-180000</div>
        </el-form-item>
        <el-form-item label="类型：">
          <div class="form-div">11-180000</div>
        </el-form-item>
        <el-form-item label="凭证号：">
          <div class="form-div">11-180000</div>
        </el-form-item>
        <el-form-item label="报账人：">
          <div class="form-div">11-180000</div>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border tooltip-effect="dark" height="100%">
        <el-table-column label="经办人" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
        <el-table-column label="摘要" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
        <el-table-column label="项目名称" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
        <el-table-column label="科目" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
        <el-table-column label="资金来源" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
        <el-table-column label="经济分类" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
        <el-table-column label="部门" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
        <el-table-column label="借方金额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
        <el-table-column label="贷方金额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
      </el-table>
      <el-form label-width="80px" :inline="true">
        <el-form-item label="制单：">
          <div class="form-div">11-180000</div>
        </el-form-item>
        <el-form-item label="下达：">
          <div class="form-div">11-180000</div>
        </el-form-item>
        <el-form-item label="复核：">
          <div class="form-div">11-180000</div>
        </el-form-item>
        <el-form-item label="出纳：">
          <div class="form-div">11-180000</div>
        </el-form-item>
        <el-form-item label="记账：">
          <div class="form-div">11-180000</div>
        </el-form-item>
      </el-form>
    </div>
    <template slot="ms-foot">
      <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
    </template>
  </mars-dialog>
</template>
<script>
export default {
  name: 'VoucherDetailDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: []
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
.form-div {
  line-height: 33px;
  font-size: 13px;
}
.choice-dialog {
  ::v-deep.el-dialog__body {
    .fw-dialog-body {
      height: 100%;
    }
  }
}
.voucher-detail {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
