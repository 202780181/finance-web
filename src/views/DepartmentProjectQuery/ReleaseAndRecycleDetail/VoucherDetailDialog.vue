<template>
  <mars-dialog
    :fullscreen="false"
    class="choice-dialog"
    :modal="true"
    :modal-append-to-body="false"
    title="凭证明细"
    v-if="visible"
    @close="closeDialog"
  >
    <mars-crud ref="crud" :columns="listConfig.columns" :autoSearch="false" :showPagination="false" :selectionRow="false">
      <template v-slot:header>
        <el-form :inline="true" style="margin-top:20px">
          <el-form-item label="日期：">
            <div class="detail-font">11-180000</div>
          </el-form-item>
          <el-form-item label="类型：">
            <div class="detail-font">财务处办公费</div>
          </el-form-item>
          <el-form-item label="凭证号：">
            <div class="detail-font">180000 学校部门公用</div>
          </el-form-item>
          <el-form-item label="报账人：">
            <div class="detail-font">财务处</div>
          </el-form-item>
        </el-form>
      </template>

      <template v-slot:footer>
        <el-form :inline="true">
          <el-form-item label="制单：">
            <div class="detail-font">11-180000</div>
          </el-form-item>
          <el-form-item label="审核：">
            <div class="detail-font">财务处办公费</div>
          </el-form-item>
          <el-form-item label="复核：">
            <div class="detail-font">180000 学校部门公用</div>
          </el-form-item>
          <el-form-item label="出纳：">
            <div class="detail-font">财务处</div>
          </el-form-item>
          <el-form-item label="记账：">
            <div class="detail-font">财务处</div>
          </el-form-item>
        </el-form>
      </template>
    </mars-crud>
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
      listConfig: {
        columns: [
          {
            prop: '1',
            label: '经办人',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: '2',
            label: '摘要',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: '3',
            label: '项目名称',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: '4',
            label: '科目',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: '5',
            label: '资金来源',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: '6',
            label: '经济分类',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: '7',
            label: '部门',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: '8',
            label: '借方金额',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: '9',
            label: '贷方金额',
            align: 'center',
            minWidth: '150px'
          }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    closeDialog() {
      this.$emit('close')
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
.detail-font {
  font-size: 13px;
  line-height: 33px;
}
</style>
