<!--
    @createTime: 3/14/23
    @author: aaron
    @desc: index
    @update: 3/14/23
-->
<template>
  <ibps-container type="full" class="page cas-r-wrapper">
    <mars-crud-local
      ref="crud"
      class="table-data_list"
      :data="listData"
      :showToolbar="false"
      :toolbars="[]"
      :columns="listConfig.columns"
      :selectionRow="true"
      :indexRow="false"
      :showSummary="true"
      :autoSearch="false"
      @action-event="handleAction"
      @pagination-change="handlePaginationChange"
    >
      <div class="" slot="header" style="width: 100%">
        <div class="cas-header">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :xs="2" :sm="2" :md="2" :lg="3" :xl="4">
                <el-form-item label="账户:">
                  <el-input v-model="form.account" placeholder="凭证号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
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
              <el-col :lg="6" :xl="7" :offset="1">
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
              <el-col :xs="2" :sm="2" :md="2" :lg="3" :xl="4">
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
                  <el-button type="primary" size="mini">查询</el-button>
                  <el-button type="primary" size="mini">重置</el-button>
                </t-space>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="opera-box btn-s">
          <t-space>
            <el-button type="primary" size="mini">查看详情</el-button>
            <el-button type="primary" size="mini">打印回单</el-button>
            <el-button type="primary" size="mini">凭证查看</el-button>
            <el-button type="primary" size="mini">刷新状态</el-button>
            <el-button type="primary" size="mini" @click="showSeniorModel = true">高级查询</el-button>
            <el-button type="primary" size="mini">导出</el-button>
            <el-button type="primary" size="mini">退出</el-button>
          </t-space>
        </div>
        <!-- 高级搜索   -->
        <div class="senior-search model">
          <t-dialog
            class="cash-model"
            width="600px"
            header="查询"
            confirmBtn="确定"
            cancelBtn="取消"
            draggable
            :closeOnOverlayClick="false"
            :visible.sync="showSeniorModel"
            @confirm="seniorOnConfirm"
            :onClose="seniorModelClose"
          >
            <el-form ref="highForm" :model="highForm" label-width="100px" label-position="left">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="出纳状态">
                    <t-select v-model="highForm.status" placeholder="请选择">
                      <t-option value="1" label="待出纳"></t-option>
                      <t-option value="2" label="出纳中"></t-option>
                    </t-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="结算状态">
                    <t-select v-model="highForm.settleStatus" placeholder="请选择">
                      <t-option value="1" label="测试1"></t-option>
                      <t-option value="2" label="测试2"></t-option>
                    </t-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-col :span="8">
                    <t-select v-model="highForm.level2" placeholder="请选择">
                      <t-option value="1" label="凭证编号"></t-option>
                      <t-option value="2" label="业务编号"></t-option>
                    </t-select>
                  </el-col>
                  <el-col :span="16">
                    <t-input clearable v-model="highForm.level21"/>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="至">
                    <t-input clearable v-model="highForm.level22"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-col :span="8">
                    <t-select v-model="highForm.level3" placeholder="请选择">
                      <t-option value="1" label="凭证日期"></t-option>
                      <t-option value="2" label="业务日期"></t-option>
                    </t-select>
                  </el-col>
                  <el-col :span="16">
                    <t-date-picker v-model="highForm.level31" placeholder="选择日期"/>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="至">
                    <t-date-picker v-model="highForm.level32" placeholder="选择日期"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="金额">
                    <t-input clearable v-model="highForm.level41"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="至">
                    <t-input clearable v-model="highForm.level42"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="银行账户">
                    <t-select v-model="highForm.status" placeholder="请选择">
                      <t-option value="1" label="0000000001"></t-option>
                      <t-option value="2" label="0000000002"></t-option>
                    </t-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="至">
                    <t-select v-model="highForm.settleStatus" placeholder="请选择">
                      <t-option value="1" label="0000000003"></t-option>
                      <t-option value="2" label="0000000005"></t-option>
                    </t-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="收款类型">
                    <t-select v-model="highForm.status" placeholder="请选择">
                      <t-option value="1" label="0000000001"></t-option>
                      <t-option value="2" label="0000000002"></t-option>
                    </t-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="结算方式">
                    <t-select v-model="highForm.settleStatus" placeholder="请选择">
                      <t-option value="1" label="0000000003"></t-option>
                      <t-option value="2" label="0000000005"></t-option>
                    </t-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="对方账户">
                    <t-input clearable v-model="highForm.level41"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="出纳人">
                    <t-input clearable v-model="highForm.level41"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </t-dialog>
        </div>
      </div>
    </mars-crud-local>
  </ibps-container>
</template>

<script>
export default {
  name: "cashiersResult",
  data() {
    return {
      tableH: '0',
      showSeniorModel: false,
      form: {
        account: '',
        status: '',
        expState: ''
      },
      highForm: {
        status: '',
        settleStatus: '',
        level2: '1',
        level21: '',
        level22: '',
        level3: '',
        level31: '',
        level32: '',
        level41: '',
        level42: ''
      },
      listData: [],
      listConfig: {
        searchForm: {
          fns: [this.loadData, this.reset],
          forms: [
            {
              prop: 'account',
              label: '账户',
              fieldType: 'select',
              options: []
            },
          ]
        },
        columns: [
          {
            prop: 'code',
            label: '凭证日期',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'time',
            label: '提交时间',
            align: 'center',
            minWidth: '120px',
            slotName: 'projectCodeName'
          },
          {
            prop: 'sno',
            label: '凭证号',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'caStatus',
            label: '出纳状态',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'accumulatedIncome',
            label: '收付状态',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'accumulatedExpenditure',
            label: '相关信息',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'borrowingsChanges',
            label: '结算方式',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'loanBalance',
            label: '收付类型',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'money',
            label: '金额',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'otherUnit',
            label: '对方单位',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'otherAccount',
            label: '对方账户',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'bankName',
            label: '所属银行名称',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'summarize',
            label: '摘要',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'yontu',
            label: '用途',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'annex',
            label: '附件数',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'unitBankName',
            label: '单位银行账户',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'bankSuject',
            label: '银行科目',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'cashiersInfo',
            label: '出纳',
            align: 'center',
            minWidth: '120px'
          }
        ]
      }
    }
  },
  mounted() {
    this.initTableSize()
  },
  methods: {
    loadData() {

    },
    reset() {

    },
    // 选中切换
    handleAction() {

    },
    // 分页切换
    handlePaginationChange() {

    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    initTableSize() {
      this.$nextTick(() => {
        const searchH = this.$refs.wrp.offsetHeight
        const content = document.getElementsByClassName('ibps-theme-container-main-body')[0]
        this.tableH = (content.offsetHeight - searchH) - 40 + 'px'
      })
    },
    // 高级查询
    seniorOnConfirm() {

    },
    //
    seniorModelClose() {
    }
  }
}
</script>

<style lang="scss" scoped>
.cas-r-wrapper {
  height: 100%;
  padding-top: 12px;

  ::v-deep .cas-header {
    padding-top: 10px;
  }

  .cas-body {
    padding: 0 20px;
    max-width: calc(100vw - 270px);
    overflow: hidden;
  }
}

.col-btn {
  button {
    padding: 7px 20px !important;
  }
}

.opera-box {
  margin: 0 20px;
  border-top: 1px solid rgb(242, 243, 245);
  padding-top: 20px;
  padding-bottom: 15px;
}

.cash-model {
  ::v-deep .el-select {
    width: 100%;
  }

  ::v-deep .el-form-item__label {
    text-align: center;
  }

  ::v-deep .t-dialog--default {
    padding: 0;
    border-radius: 4px;

    .t-dialog__header {
      padding: 8px 10px 10px 10px;
      border-bottom: 1px solid rgb(242, 243, 245);
    }

    .t-dialog__body {
      padding: 10px 10px;
      background: #f2f2f2;
    }

    .t-dialog__footer {
      text-align: center;
      padding-bottom: 10px;
    }
  }
}
</style>
