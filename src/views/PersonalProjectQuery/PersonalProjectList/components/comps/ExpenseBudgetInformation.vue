<template>
  <mars-crud
    ref="crud"
    :columns="listConfig.columns"
    :selectionRow="false"
    :summaryMethod="summaryMethod"
    :outdata="outdata"
    :showSummary="true"
    :autoSearch="false"
  >
    <template v-slot:header>
      <div class="header-title">
        <p>
          <span>费用项预算汇总（元）</span>预算周期：会计年度周期
        </p>
        <el-button type="text" @click="goRouter">费用预算额度及控制策略设置</el-button>
      </div>
    </template>
  </mars-crud>
</template>
<script>
export default {
  name: 'ExpenseBudgetInformation',
  data() {
    return {
      outdata: [],
      listConfig: {
        columns: [
          {
            prop: 'code',
            label: '费用项',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'code',
            label: '年度预算',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'code',
            label: '上年结转预算',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'code',
            label: '总预算',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'code',
            label: '支出金额',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'code',
            label: '预算余额',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'code',
            label: '冻结金额',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'code',
            label: '可用余额',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'code',
            label: '结转下年预算',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'code',
            label: '申请留用预算',
            align: 'center',
            minWidth: '150px'
          }
        ]
      }
    }
  },
  methods: {
    summaryMethod() {},
    goRouter() {}
  }
}
</script>
<style lang="scss" scoped>
.header-title {
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    margin-left: 20px;
    span {
      font-weight: 600;
    }
  }
}
</style>