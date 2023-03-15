<!--
    @createTime: 3/14/23
    @author: aaron
    @desc: index
    @update: 3/14/23
-->
<template>
  <div class="cas-r-wrapper">
    <div class="cas-header">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="3">
            <el-form-item label="账户:">
              <el-input v-model="form.account" placeholder="凭证号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-col :span="6">
              <el-select v-model="form.type">
                <el-option label="凭证日期" value="shanghai"></el-option>
                <el-option label="出纳日期" value="beijing"></el-option>
              </el-select>
            </el-col>
            <el-col :span="18">
              <el-date-picker
                style="width: 100%"
                v-model="form.startTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </el-col>
          </el-col>
          <el-col :lg="4" :xl="5" :offset="1">
            <el-col :span="12">
              <el-form-item label="结算方式:">
                <el-select v-model="form.type">
                  <el-option label="凭证日期" value="shanghai"></el-option>
                  <el-option label="出纳日期" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出纳状态:">
                <el-select v-model="form.status">
                  <el-option label="全部" value="1"></el-option>
                  <el-option label="出纳中" value="2"></el-option>
                  <el-option label="出纳成功" value="3"></el-option>
                  <el-option label="出纳失败" value="4"></el-option>
                  <el-option label="带出纳" value="5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="3">
            <el-form-item label="收支状态:">
              <el-select v-model="form.expState" style="width: 100%">
                <el-option label="审批中" value="1"></el-option>
                <el-option label="审批失败" value="2"></el-option>
                <el-option label="待提交平台" value="3"></el-option>
                <el-option label="银行处理中" value="4"></el-option>
                <el-option label="付款失败" value="5"></el-option>
                <el-option label="待打票" value="6"></el-option>
                <el-option label="待交付票据" value="7"></el-option>
                <el-option label="付款成功" value="8"></el-option>
                <el-option label="收款成功" value="9"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1" class="col-btn">
            <t-space>
              <el-button type="primary">查询</el-button>
              <el-button type="primary">重置</el-button>
            </t-space>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="cas-body">
      <el-table
        :data="tableData"
        height="500px"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="凭证日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="提交时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="province"
          label="凭证号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="city"
          label="出纳状态"
          width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="收付状态"
          width="140">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="相关信息"
          width="200">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="结算方式"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="收付类型"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="金额"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="对方单位"
          width="170"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="对方账号"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="所属银行名称"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="摘要"
          width="170"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="用途"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="附件数"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="单位银行账户"
          width="210"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="银行科目"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="zip"
          label="出纳"
          width="150"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "cashiersResult",
  data() {
    return {
      form: {
        account: '',
        status: '',
        expState: ''
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  },
}
</script>

<style lang="scss" scoped>
.cas-r-wrapper {
  height: 100%;
  padding-top: 12px;
  .cas-body {
    height: 100%;
  }
}
.col-btn {
  button {
    padding: 7px 20px!important;
  }
}
</style>
