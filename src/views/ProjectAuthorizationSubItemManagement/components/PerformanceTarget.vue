<template>
  <div class="performance-goal_table">
    <ul class="performance-goal_header">
      <li>
        <h3>实施周期绩效目标</h3>
        <p>通过本次修缮，更新破旧的大楼，为师生创建优秀的办公环境。</p>
      </li>
      <li>
        <h3>年度绩效目标</h3>
        <p>通过本次修缮，更新破旧的大楼，为师生创建优秀的办公环境。</p>
      </li>
    </ul>
    <h3>绩效指标</h3>
    <div class="performance-goal_bottom">
      <el-table :data="tableData1" border tooltip-effect="dark" height="100%">
        <el-table-column label="序号" align="center" width="50">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="一级指标" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
        <el-table-column label="二级指标" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
        <el-table-column label="三级指标" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
        <el-table-column label="指标方向" prop="projectName" show-overflow-tooltip align="center" min-width="100"></el-table-column>
        <el-table-column label="实施周期目标值" prop="projectName" show-overflow-tooltip align="center" min-width="100"></el-table-column>
        <el-table-column label="年度目标值" prop="projectName" show-overflow-tooltip align="center" min-width="100"></el-table-column>
        <el-table-column label="计量单位" prop="projectName" show-overflow-tooltip align="center" min-width="100"></el-table-column>
        <el-table-column label="备注" prop="projectName" show-overflow-tooltip align="center" min-width="180"></el-table-column>
        <el-table-column label="分值（权重）" prop="projectName" show-overflow-tooltip align="center" min-width="100"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PerformanceTarget',
  data() {
    return {
      tableData1: []
    }
  }
}
</script>
<style lang="scss" scoped>
.performance-goal_table {
  height: 100%;
  display: flex;
  flex-direction: column;
  & > h3 {
    margin: 10px;
    font-size: 14px;
    font-weight: 500;
  }
  .performance-goal_bottom {
    flex: 1;
  }
}
.performance-goal_header {
  display: flex;
  li {
    width: 50%;
    border: 1px solid #ccc;
    h3 {
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      background-color: #f5f5f6;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
    }
    p {
      padding: 10px 5px;
      height: 200px;
      overflow: auto;
    }
  }
}
</style>