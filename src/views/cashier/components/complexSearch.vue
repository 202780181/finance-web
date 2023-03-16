<!--
    @createTime: 3/11/23
    @author: aaron
    @desc: complexSearch
    @update: 3/11/23
-->
<template>
  <div class="wrapper">
    <el-dialog
      title="查询"
      v-el-drag-dialog
      custom-class="complex-model"
      :visible.sync="show"
      :close-on-click-modal="false"
      :width="dialogWidth">
      <div class="complex-model-box">
        <div class="tab-btn">
          <el-button size="mini" :class="{'checked': tabType === '1'}" @click="changeType('1')">待出纳复核</el-button>
          <el-button size="mini" :class="{'checked': tabType === '2'}" @click="changeType('2')">待支付</el-button>
          <el-button size="mini" :class="{'checked': tabType === '3'}" @click="changeType('3')">更多查询</el-button>
        </div>
        <div class="search-form">
          <el-form ref="form" :model="searchForm" label-width="80px">
            <div class="more" v-if="tabType === '3'">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="活动时间">
                    <el-col :span="23">
                      <el-date-picker
                        style="width: 100%"
                        v-model="searchForm.startTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                      </el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-col :span="12">
                    <el-form-item label="凭证类型:">
                      <el-select v-model="searchForm.type" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="出纳状态">
                      <el-select v-model="searchForm.status" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="凭证编号:">
                    <el-col :span="11">
                      <el-input v-model="searchForm.certNo" placeholder="请输入"></el-input>
                    </el-col>
                    <el-col class="line" :span="1">至</el-col>
                    <el-col :span="11">
                      <el-input v-model="searchForm.certNo" placeholder="凭证号、摘要、金额"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-col :span="12">
                    <el-form-item label="结算方式:">
                      <el-select v-model="searchForm.payMethod">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="搁置:">
                      <el-select v-model="searchForm.onHold">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="会计科目:">
                    <el-col :span="11">
                      <el-input v-model="searchForm.suject" placeholder="请输入"></el-input>
                    </el-col>
                    <el-col class="line" :span="1">至</el-col>
                    <el-col :span="11">
                      <el-input v-model="searchForm.sujectTo" placeholder="凭证号、摘要、金额"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-col :span="12">
                    <el-form-item label="附件:">
                      <el-select v-model="searchForm.attachment">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3" :offset="8">
                    <el-form-item label-width="0">
                      <el-button size="mini" type="primary">查询</el-button>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
            </div>
            <div class="table-content-one" v-if="tabType === '2'">
              <el-row>
                <el-col :span="23" class="flex-col">
                  <el-form-item label-width="0">
                    <el-checkbox v-model="searchForm.onHold">仅搁置</el-checkbox>
                  </el-form-item>
                  <el-form-item label="关键字搜索" label-width="100px">
                    <el-input v-model="searchForm.keywords" placeholder="凭证号、摘要、金额"></el-input>
                  </el-form-item>
                  <el-form-item label-width="0">
                    <el-button type="primary" size="mini" class="le-c-st">查询</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="table-content-one" v-if="tabType === '1'">
              <el-row>
                <el-col :span="23" class="flex-col">
                  <el-form-item label="关键字搜索" label-width="100px">
                    <el-input v-model="searchForm.keywords" placeholder="凭证号、摘要、金额"></el-input>
                  </el-form-item>
                  <el-form-item label-width="0">
                    <el-button type="primary" size="mini" class="le-c-st">查询</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="table-content-ST">
              <el-table
                :data="tableData"
                height="500px"
                style="width: 100%"
                max-height="250">
                <el-table-column
                  fixed
                  prop="date"
                  label="日期"
                  >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  >
                </el-table-column>
                <el-table-column
                  prop="province"
                  label="省份"
                  >
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="市区">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址"
                  >
                </el-table-column>
                <el-table-column
                  prop="zip"
                  label="邮编">
                </el-table-column>
              </el-table>
            </div>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-dragDialog";

export default {
  name: "complexSearch",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    elDragDialog
  },
  data() {
    return {
      dialogWidth: '60%',
      tabType: '1',
      searchForm: {
        startTime: '',
        endTime: '',
        certNo: '',
        payMethod: '',
        onHold: '',
        type: '',
        status: '',
        suject: '',
        sujectTo: '',
        attachment: '',
        keywords: ''
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
  mounted() {
    if(window.innerWidth < 1500) {
      this.dialogWidth = '80%'
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {

    },
    changeType(val) {
      this.tabType = val
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  ::v-deep .el-dialog__header {
    padding: 10px 20px 10px;
  }

  ::v-deep .el-dialog__headerbtn {
    top: 13px;
  }

  ::v-deep .el-dialog__body {
    padding: 0
  }

  ::v-deep .el-row {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.dialog-footer {
  width: 100%;
  text-align: center;
}

.padding-10 {
  padding: 0 10px;
}

.tab-btn {
  margin: 10px;
  .checked {
    border-color: #91c2f2;
    background: #e9f3fc;
    color: rgba(34, 132, 229, 0.7);
  }
  button {
    margin-right: 5px;
  }
}
.line {
  text-align: center;
}
.flex-col {
  display: flex;
  justify-content: right;

  .le-c-st {
    margin-left: 4px;
  }
}
</style>
