<template>
  <div class="fee-info_list">
    <div class="header-title">
      <p>
        <span style="margin-right:20px">预算汇总表</span>
        拨款下达经常性项目举例
      </p>
      <p>
        <span>单位（元）</span>
      </p>
    </div>
    <el-table ref="multipleTable" tooltip-effect="dark" :data="tableData1" border style="width: 100%" height="50%">
      <el-table-column type="index" label="序号" align="center" fixed="left" width="50"></el-table-column>
      <el-table-column prop="code" align="center" fixed="left" label="年度" min-width="100" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="年度预算" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="上年结转额度" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="本年下达额度" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="总额度" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="支出金额" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="冻结金额" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="结转下年额度" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="可用余额" min-width="150" show-overflow-tooltip />
      <el-table-column align="center" fixed="right" label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button type="text" @click="goDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="header-title">
      <p>
        <span style="margin-right:20px">预算汇总表</span>
        拨款下达经常性项目举例
      </p>
      <p>
        <span>单位（元）</span>
      </p>
    </div>
    <el-table ref="multipleTable" tooltip-effect="dark" :data="tableData1" border style="width: 100%" height="50%">
      <el-table-column type="index" label="序号" align="center" fixed="left" width="50"></el-table-column>
      <el-table-column prop="code" align="center" fixed="left" label="年度" min-width="100" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="年度预算" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="上年结转额度" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="本年下达额度" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="总额度" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="支出金额" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="冻结金额" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="结转下年额度" min-width="150" show-overflow-tooltip />
      <el-table-column prop="code" align="center" label="可用余额" min-width="150" show-overflow-tooltip />
      <el-table-column align="center" fixed="right" label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button type="text" @click="goDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'FeeInfoList',
  data() {
    return {
      tableData1: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      tableData2: [{}, {}],
      outdata1: [],
      outdata2: [],

      listConfig: {
        columns1: [
          {
            prop: 'code',
            label: '费用项',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'code',
            label: '预算金额',
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
          }
        ],
        columns2: [
          {
            prop: 'code',
            label: '费用项',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'code',
            label: '预算金额',
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
          }
        ]
      }
    }
  },
  methods: {
    goDetail(row) {}
  }
}
</script>
<style lang="scss" scoped>
.fee-info_list {
  height: 100%;
  display: flex;
  flex-direction: column;
}
::v-deep .el-table tr {
  height: 40px;
}
.header-title {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 13px;
  p {
    margin-left: 20px;
  }
  p span {
    font-weight: 600;
  }
}
</style>
