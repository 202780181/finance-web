<template>
  <div v-if="visible">
    <mars-dialog
      :fullscreen="false"
      class="choice-dialog"
      :modal="true"
      :modal-append-to-body="false"
      title="支出记录查看"
      v-if="visible"
      @close="closeDialog"
    >
      <div>
        <p>支出记录信息</p>
        <table border="1" class="info-table">
          <tr>
            <td class="info-table_td1">日期</td>
            <td></td>
          </tr>
          <tr>
            <td class="info-table_td1">执行项目</td>
            <td></td>
          </tr>
          <tr>
            <td class="info-table_td1">摘要</td>
            <td></td>
          </tr>
          <tr>
            <td class="info-table_td1">支出金额</td>
            <td></td>
          </tr>
          <tr>
            <td class="info-table_td1">费用类型</td>
            <td></td>
          </tr>
          <tr>
            <td class="info-table_td1">资金来源</td>
            <td>
              <el-button type="text" @click="goLimit">2323</el-button>
            </td>
          </tr>
        </table>
        <p>关联凭证信息</p>
        <table border="1" class="info-table">
          <tr>
            <td class="info-table_td1">会计期间</td>
            <td></td>
          </tr>
          <tr>
            <td class="info-table_td1">凭证类型</td>
            <td></td>
          </tr>
          <tr>
            <td class="info-table_td1">凭证编号</td>
            <td>
              <el-button type="text" @click="goDetail">1</el-button>
            </td>
          </tr>
          <tr>
            <td class="info-table_td1">分录编号</td>
            <td></td>
          </tr>
        </table>
      </div>
      <template slot="ms-foot">
        <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
      </template>
    </mars-dialog>

    <!-- 凭证查看 -->
    <VoucherDetailDialog v-if="voucherVisible" :visible="voucherVisible" @close="()=>{voucherVisible=false}" />
  </div>
</template>
<script>
import VoucherDetailDialog from './VoucherDetailDialog.vue'
export default {
  name: 'PayDetailDialog',
  components: {
    VoucherDetailDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      voucherVisible: false,
      batchEditorVisible: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    goDetail() {
      this.voucherVisible = true
    },

    goLimit() {
      this.batchEditorVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.info-table {
  width: 100%;
  border-collapse: collapse;
  td {
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .info-table_td1 {
    width: 20%;
    font-weight: 500;
    background-color: #55a0eb;
    color: #fff;
  }
}
p {
  margin: 20px 0 10px 0;
}
</style>