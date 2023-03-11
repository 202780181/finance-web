<template>
  <div class="annual-budget-info_tabs">
    <el-radio-group v-model="activeName">
      <el-radio-button label="1">年度资金计划</el-radio-button>
      <el-radio-button label="2">招标采购预算</el-radio-button>
      <el-radio-button label="3">新增资产预算</el-radio-button>
      <el-radio-button label="4">绩效目标</el-radio-button>
      <el-radio-button label="5">附件</el-radio-button>
    </el-radio-group>
    <div class="annual-budget-info_tabs-table">
      <template v-if="activeName==='1'"></template>
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
          <el-table-column prop="code" align="center" label="采购方式" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="采购项目" min-width="100" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="采购品目" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="经济分类" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="采购需求概况" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="预计采购时间" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="预算金额（元）" min-width="140" show-overflow-tooltip />
        </el-table>
      </template>
      <template v-if="activeName==='3'">
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
          <el-table-column prop="code" align="center" label="资产分类" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="资产名称" min-width="100" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="参考型号" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="参考品牌" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="单价（元）" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="数量" min-width="100" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="总金额（元）" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="备注" min-width="140" show-overflow-tooltip />
        </el-table>
      </template>
      <template v-if="activeName==='4'">
        <div class="performance-objective">
          <div class="performance-objective_card">
            <ul>
              <li>
                <el-card shadow="never">
                  <h3>实施周期绩效目标</h3>
                  <div class="el-card_div-content"></div>
                </el-card>
              </li>
              <li>
                <el-card shadow="never">
                  <h3>年度绩效目标</h3>
                  <div class="el-card_div-content"></div>
                </el-card>
              </li>
            </ul>
          </div>
          <div class="performance-objective_table">
            <p>绩效指标</p>
            <el-table ref="multipleTable" height="100%" tooltip-effect="dark" :data="tableData1" border>
              <el-table-column type="index" label="序号" align="center" fixed="left" width="50"></el-table-column>
              <el-table-column prop="code" align="center" label="一级指标" fixed="left" min-width="120" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="二级指标" min-width="120" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="三级指标" min-width="120" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="指标方向" min-width="100" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="实施周期目标值" min-width="140" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="年度目标值" min-width="110" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="计量单位" min-width="100" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="备注" min-width="140" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="分值（权重）" min-width="130" show-overflow-tooltip />
            </el-table>
          </div>
        </div>
      </template>
      <template v-if="activeName==='4'">
        <el-table ref="multipleTable" height="100%" tooltip-effect="dark" :data="tableData1" border>
          <el-table-column type="index" label="序号" align="center" fixed="left" width="50"></el-table-column>
          <el-table-column prop="code" align="center" label="附件类型" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="附件名称" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="备注" min-width="120" show-overflow-tooltip />
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AnnualBudgetInfoList',
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
.annual-budget-info_tabs {
  display: flex;
  height: 100%;
  flex-direction: column;
  .annual-budget-info_tabs-table {
    margin-top: 10px;
    flex: 1;
  }
}
::v-deep .el-table tr {
  height: 40px;
}
.performance-objective {
  display: flex;
  height: 100%;
  flex-direction: column;
  .performance-objective_card {
    ul {
      display: flex;
      li {
        width: 50%;
        ::v-deep .el-card {
          .el-card__body {
            padding: 0;
          }
          .el-card_div-content {
            height: 200px;
            overflow-y: auto;
          }
        }
        h3 {
          width: 100%;
          height: 50px;
          line-height: 50px;
          background-color: #f5f5f6;
          text-align: center;
        }
      }
    }
  }
  .performance-objective_table {
    flex: 1;
    display: flex;
    flex-direction: column;
    & > p {
      margin: 10px 0 10px 10px;
      font-weight: 600;
    }
    .el-table {
      flex: 1;
    }
  }
}
</style>
