<template>
  <div class="voucher-info_list">
    <el-form :inline="true">
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
        <div class="detail-font">180000 学校部门公用</div>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border tooltip-effect="dark" height="100%">
      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="经办人" prop="1" align="center" min-width="120" />
      <el-table-column label="摘要" prop="2" align="center" min-width="120" />
      <el-table-column label="项目名称" prop="2" align="center" min-width="140" />
      <el-table-column label="科目" prop="2" align="center" min-width="140" />
      <el-table-column label="资金来源" prop="2" align="center" min-width="140" />
      <el-table-column label="经济分类" prop="2" align="center" min-width="120" />
      <el-table-column label="部门" prop="2" align="center" min-width="120" />
      <el-table-column label="借方金额" prop="2" align="center" min-width="140" />
      <el-table-column label="贷方金额" prop="2" align="center" min-width="140" />
    </el-table>
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
        <div class="detail-font">180000 学校部门公用</div>
      </el-form-item>
      <el-form-item label="记账：">
        <div class="detail-font">180000 学校部门公用</div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'VoucherInfoList',
  data() {
    return {
      tableData: []
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-font {
  font-size: 13px;
  line-height: 33px;
  margin-right: 40px;
}
.voucher-info_list {
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>