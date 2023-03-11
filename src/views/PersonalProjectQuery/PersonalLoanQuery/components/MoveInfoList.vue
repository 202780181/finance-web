<template>
  <el-table ref="multipleTable" tooltip-effect="dark" :data="tableData" border height="100%">
    <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
    <el-table-column prop="code" align="center" label="节点名称" min-width="150" show-overflow-tooltip />
    <el-table-column prop="code" align="center" label="操作人" min-width="150" show-overflow-tooltip />
    <el-table-column prop="code" align="center" label="流转操作" min-width="150" show-overflow-tooltip />
    <el-table-column prop="code" align="center" label="意见" min-width="150" show-overflow-tooltip />
    <el-table-column prop="code" align="center" label="操作时间" min-width="150" show-overflow-tooltip />
  </el-table>
</template>
<script>
export default {
  name: 'MoveInfoList',
  data() {
    return {
      tableData: []
    }
  }
}
</script>