<template>
  <div class="execute-details_tabs">
    <el-radio-group v-model="activeName">
      <el-radio-button label="1">预算下达明细</el-radio-button>
      <el-radio-button label="2">收支明细</el-radio-button>
      <el-radio-button label="3">借款明细</el-radio-button>
      <el-radio-button label="4">冻结明细</el-radio-button>
    </el-radio-group>
    <div class="execute-details_tabs-table">
      <template v-if="activeName==='1'">
        <el-table
          ref="multipleTable"
          :summary-method="getSummaries"
          show-summary
          height="100%"
          tooltip-effect="dark"
          :data="tableData1"
          border
        >
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="code" align="center" label="业务日期" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="摘要" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="下达金额" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="操作人员" min-width="140" show-overflow-tooltip />
        </el-table>
      </template>
      <template v-if="activeName==='2'">
        <el-table
          ref="multipleTable"
          :summary-method="getSummaries"
          show-summary
          height="100%"
          tooltip-effect="dark"
          :data="tableData1"
          border
        >
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="code" align="center" label="业务日期" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="业务类型" min-width="100" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="摘要" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="收入\拨款" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="支出\拨出" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="余额" min-width="140" show-overflow-tooltip />
        </el-table>
      </template>
      <template v-if="activeName==='3'">
        <el-table ref="multipleTable" height="100%" tooltip-effect="dark" :data="tableData1" border>
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="code" align="center" label="业务日期" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="摘要" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="借款增加" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="借款减少" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="借款余额" min-width="140" show-overflow-tooltip />
        </el-table>
      </template>
      <template v-if="activeName==='4'">
        <el-table ref="multipleTable" height="100%" tooltip-effect="dark" :data="tableData1" border>
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="code" align="center" label="业务日期" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="冻结类型" min-width="100" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="摘要" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="冻结金额" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="解冻金额" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="冻结余额" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="费用预算模板" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="费用预算科目" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="经济分类科目" min-width="140" show-overflow-tooltip />
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ExecuteDetailsTabs',
  data() {
    return {
      activeName: '1',
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: []
    }
  },
  methods: {
    getSummaries() {}
  }
}
</script>
<style lang="scss" scoped>
.execute-details_tabs {
  display: flex;
  height: 100%;
  flex-direction: column;
  .execute-details_tabs-table {
    margin-top: 10px;
    flex: 1;
  }
}
</style>