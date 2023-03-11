<template>
  <!-- 额度下达回收单 -->
  <mars-dialog
    :fullscreen="false"
    class="choice-dialog"
    :modal="true"
    :modal-append-to-body="false"
    title="额度下达回收单"
    v-if="visible"
    @close="closeDialog"
  >
    <div id="printArea">
      <h3 class="print-title">额度下达回收单</h3>
      <div class="print-ul">
        <ul>
          <li>下达回收批次号 XDHS2023010001</li>
          <li>摘要 额度下达</li>
        </ul>
        <ul>
          <li>附件数量 0张</li>
          <li>日期 2022年11月18日</li>
        </ul>
      </div>

      <table border="1">
        <tr>
          <th>序号</th>
          <th>执行项目编号</th>
          <th>项目名称</th>
          <th>预算项目</th>
          <th>年度预算金额</th>
          <th>上年结转额度</th>
          <th>本年累计下达额度</th>
          <th>本次下达额度</th>
          <th>下达后本年累计下达额度</th>
        </tr>
        <tr v-for="i in 100" :key="i">
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td style="text-align: right;">5</td>
          <td style="text-align: right;">6</td>
          <td style="text-align: right;">7</td>
          <td style="text-align: right;">8</td>
          <td style="text-align: right;">9</td>
        </tr>
      </table>
      <ul class="print-bottom">
        <li>制单：王五</li>
        <li>审核：王五</li>
        <li>复核：王五</li>
      </ul>
      <p>说明：本次额度下达回收来源为财务变更，凭证编号XXXXXX</p>
    </div>
    <template slot="ms-foot">
      <el-button icon="el-icon-printer" type="primary" v-print="print">打 印</el-button>
      <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
    </template>
  </mars-dialog>
</template>
<script>
import myUtil from '@/utils/myUtil.js'
export default {
  name: 'PrintDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myUtil,
      print: {
        id: 'printArea',
        popTitle: '额度下达回收单'
      }
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
.choice-dialog ::v-deep.el-dialog__body {
  overflow: auto !important;
}
.print-title {
  margin: 0 auto;
  text-align: center;
  padding: 10px 0;
  width: 300px;
  border-bottom: 1px solid #333;
  font-size: 18px;
}
.print-ul {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 10px 0;
  ul {
    display: flex;
    li {
      margin-right: 20px;
    }
  }
}
.print-bottom {
  display: flex;
  li {
    margin: 10px 40px 20px 0;
  }
}
#printArea {
  table {
    width: 100%;
    border-collapse: collapse;
    tr th {
      height: 40px;
      color: #333;
      font-size: 14px;
    }
    tr td {
      font-weight: normal;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
