<!--
    @createTime: 3/9/23
    @author: aaron
    @desc: 出纳复核
    @update: 3/9/23
-->
<template>
  <div flex-box="1" class="cashier-main wrapper-box" ref="main">
    <div class="header-box header-container-top" ref="headTop">
      <el-form ref="form" :model="searchQuery" label-width="80px">
        <el-row type="flex" :gutter="1" class="row-align-center mrg-20">
          <el-col :span="4">
            <el-form-item label="凭证类型:">
              <el-select v-model="searchQuery.type">
                <el-option :label="item.name" :value="item.value" v-for="item in receiptType"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="凭证日期:">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="searchQuery.time"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="凭证号:">
              <el-input v-model="searchQuery.code" placeholder="凭证号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="text-center">
            <el-checkbox v-model="searchQuery.paper">无纸质凭证</el-checkbox>
          </el-col>
          <el-col :span="4" class="">
            <el-button class="right-20" size="small" type="primary">查询</el-button>
            <el-button type="primary" size="small" class="left-20">下一单</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row type="flex" class="ops-btn">
        <el-button class="right-20" size="small" type="primary">批量出纳</el-button>
        <el-button class="right-20" size="small" type="primary">附件查看</el-button>
        <el-button class="right-20" size="small" type="primary" @click="search">查询</el-button>
        <el-button class="right-20" size="small" type="primary">凭证查看</el-button>
        <el-button class="right-20" size="small" type="primary">设置</el-button>
      </el-row>
    </div>
    <div id="J_2937333540" class="cashier-body">
      <div class="summary-bar" ref="sumBar">
        <el-row>
          <el-col :xs="6" :sm="6" :md="8" :lg="10" :xl="7">
            <div class="su-bar-flex">
              <div>共: 10笔</div>
              <span class="small-gap">;</span>
              <div>待出纳: 1笔</div>
              <span class="small-gap">;</span>
              <div>出纳中: 2笔</div>
              <span class="small-gap">;</span>
              <div>出纳失败: 0笔</div>
            </div>
          </el-col>
          <el-col :span="4">
            <div>付款总额: 10,000.00</div>
          </el-col>
          <el-col :span="4">
            <div>收款总额: 10,000.00</div>
          </el-col>
        </el-row>
      </div>
      <div class="cashier-content grid-wrapper">
        <div class="left-grid" :style="{height: pageH + 'px'}">
          <div class="wr-ls-list">
            <div class="tag-item"
                 :class="{'choose': selectedIndex === index}"
                 v-for="(item, index) in items"
                 :key="index"
                 @click="selectedAction(item, index)"
            >
              <div class="widget-todo-item">
                <span class="label">状态：</span>
                <span class="count_value">出纳中,待打票</span>
              </div>
              <div class="widget-todo-item">
                <span class="label">金额：</span>
                <span class="teamix-status-tag">(付)</span>
                <span class="count_value">100.00</span>
              </div>
              <div class="widget-todo-item">
                <span class="label">科目：</span>
                <span class="count_value">102001</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right-grid" :style="{height: pageH + 'px'}">
          <div class="top-status-box">
            <div class="label left-box-s">
              <div class="left">
                <span>状态：</span>
                <span>{{getStripStatus()}}</span>
              </div>
            </div>
            <div class="label left-amount-t">
              <span>付款:</span>
              <span>¥10,000.00</span>
            </div>
          </div>
          <div class="content-box">
            <el-form ref="form" label-position="right" :model="form" label-width="105px">
              <div class="car-box top-10">
                <div class="card-head">
                  <span class="card-title">付款信息</span>
                </div>
                <div class="card-extra">
                  <el-row >
                    <el-col :span="12">
                      <el-col :span="12">
                        <el-form-item label="付款方户名:">
                          <el-input v-model="form.name"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="账号:">
                          <el-input v-model="form.name"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="开户行:">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="12">
                      <el-form-item label="付款方户名:">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-col :span="12">
                        <el-form-item label="科目:">
                          <el-input v-model="form.name"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="资金来源:">
                          <el-input v-model="form.name"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="car-box top-10">
                <div class="card-head">
                  <span class="card-title">出纳信息</span>
                </div>
                <div class="card-extra">
                  <el-row >
                    <el-col :span="12">
                      <el-form-item label="用途:">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-col :span="12">
                        <el-form-item label="结算方式:">
                          <el-select :value="form.payMent">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="出纳日期:">
                          <el-select :value="form.time">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="12">
                     <el-col :span="12">
                       <el-form-item label="类型:">
                         <el-input v-model="form.name"></el-input>
                       </el-form-item>
                     </el-col>
                      <el-col :span="12">
                        <el-form-item label="结算单号:">
                          <el-input v-model="form.name"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-col :span="4">
                        <el-form-item label-width="0">
                          <el-checkbox v-model="form.associate">关联预开</el-checkbox>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-select :value="form.associateValue" placeholder="请选择活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="10">
                        <div class="view-info" :class="{'disabled': isAssociate}">查看信息</div>
                      </el-col>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="car-box top-10">
                <div class="card-head">
                  <span class="card-title">首款单位</span>
                </div>
                <div class="card-extra">
                  <el-row >
                    <el-col :span="12">
                      <el-form-item label="对方账户:">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="所属银行:">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="12">
                      <el-form-item label="银行账户:">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="开户行:">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="car-box top-10">
                <div class="card-head">
                  <span class="card-title">国库信息</span>
                </div>
                <div class="card-extra">
                  <el-row >
                    <el-col :span="12">
                     <el-col :span="12">
                       <el-form-item label="预算类型:">
                         <el-select :value="form.budgetType">
                           <el-option label="区域一" value="shanghai"></el-option>
                           <el-option label="区域二" value="beijing"></el-option>
                         </el-select>
                       </el-form-item>
                     </el-col>
                      <el-col :span="12">
                        <el-form-item label="功能分类:">
                          <el-select :value="form.fClass">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="国库经济分类:">
                        <el-input v-model="form.economy"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="12">
                      <el-col :span="12">
                        <el-form-item label="支出类型:">
                          <el-select :value="form.outlay">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="预算来源:">
                          <el-select :value="form.sfBudget">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item label="预算关联号:">
                        <el-select :value="form.budgetLinkedNo">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="car-box top-10">
                <div class="card-head">
                  <span class="card-title">其他</span>
                </div>
                <div class="card-extra">
                  <el-row >
                    <el-col :span="12">
                      <el-form-item label="审批说明:">
                        <el-input v-model="form.economy"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-col :span="3">
                        <el-form-item label-width="0">
                          <el-checkbox v-model="form.short">短信通知</el-checkbox>
                        </el-form-item>
                      </el-col>
                      <el-col :span="9" :offset="1">
                        <el-form-item label-width="0">
                        <el-input v-model="form.host" placeholder="请输入">接收人</el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="9" :offset="2">
                        <el-form-item label-width="0">
                          <el-input v-model="form.phone" placeholder="请输入">号码</el-input>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="car-box top-10">
                <div class="card-head">
                  <span class="card-title">出纳日志</span>
                </div>
                <div class="card-extra">
                  <el-table
                    class="journal-table"
                    :data="form.journalData"
                    style="width: 97%">
                    <el-table-column
                      prop="date"
                      label="日期"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="操作人"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="detail"
                      label="详情">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-form>
          </div>
          <div class="bottom-bar">
            <div class="state-ope in-writ-print" v-if="false">
              <el-button type="primary" size="small">打印票据</el-button>
              <el-button type="primary" size="small">搁置</el-button>
              <el-button size="small">取消出纳</el-button>
              <el-dropdown>
                <el-button type="primary">
                  打印确认单<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>打印确认单</el-dropdown-item>
                  <el-dropdown-item>打印回单</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="state-ope" v-if="false">
              <el-button type="primary" size="small">出纳复核</el-button>
            </div>
            <!-- 状态: 待确认、带出纳(现金)  -->
            <div class="state-ope" v-if="true">
              <el-button type="primary" size="small">关联搁置</el-button>
              <el-dropdown>
                <el-button type="primary">
                  打印确认单<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>打印确认单</el-dropdown-item>
                  <el-dropdown-item>打印回单</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="state-ope" v-if="false">
              <el-button type="primary" size="small">搁置</el-button>
              <el-dropdown>
                <el-button type="primary">
                  打印确认单<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>打印确认单</el-dropdown-item>
                  <el-dropdown-item>打印回单</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="state-ope" v-if="false">
              <el-button type="primary" size="small">搁置</el-button>
              <el-button size="small">取消出纳</el-button>
              <el-dropdown>
                <el-button type="primary">
                  打印确认单<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>打印确认单</el-dropdown-item>
                  <el-dropdown-item>打印回单</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button size="small">票据</el-button>
            </div>
            <div class="state-ope" v-if="false">
              <el-button type="primary" size="small">搁置</el-button>
              <el-button size="small">取消出纳</el-button>
              <el-dropdown>
                <el-button type="primary">
                  打印确认单<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>打印确认单</el-dropdown-item>
                  <el-dropdown-item>打印回单</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-dragDialog";

export default {
  name: "cashier",
  directives: {
    elDragDialog
  },
  data() {
    return {
      visible: false,
      pageH: 0,
      selectedIndex: -1,
      items: [
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
        {}, {}, {}, {}, {},
      ],
      searchQuery: {
        type: '',
        time: '',
        code: '',
        paper: ''
      },
      form: {
        // 结算方式
        payMent: '',
        //出纳日期
        time: '',
        associate: false,
        associateValue: '',
        // 国库信息
        budgetType: '',
        fClass: '',
        economy: '' ,
        outlay: '',
        sfBudget: '',
        budgetLinkedNo:'',
        // 其他
        short: false,
        host: '',
        phone: '',
        // 日志
        journalData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            detail: ''
          }, {
            date: '2016-05-04',
            name: '王小虎',
            detail: ''
          }, {
            date: '2016-05-01',
            name: '王小虎',
            detail: ''
          }
        ]
      },
      receiptType: []
    }
  },
  mounted() {
    this.initPageDivSize()
  },
  computed:{
    isAssociate() {
      return !this.form.associate
    }
  },
  methods: {
    initPageDivSize() {
      let bodyH = this.$refs.main.offsetHeight
      let headerH = this.$refs.headTop.offsetHeight
      this.pageH = (bodyH - headerH) - 80
    },
    selectedAction(item, index) {
      this.selectedIndex = index
    },
    getStripStatus() {
      return '待出纳'
    },
    search() {

    }
  }
}
</script>
<style lang="scss" scoped>
*, :after, :before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.cashier-main {
  height: 100%;
  overflow: hidden;
}

.row-align-center {
  align-content: center;
  align-items: center;

  .el-form-item {
    margin-bottom: 0 !important;
  }
}

.summary-bar {
  height: 35px;
  line-height: 35px;
  font-size: 16px;
  color: #555555;
  background-color: #d7d7d7;
  border-radius: 5px;
  padding-left: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}

.su-bar-flex {
  display: flex;
}

.text-center {
  text-align: center;
}

.mrg-20 {
  margin: 20px 0;
}
.top-10 {
  margin-top: 10px;
}
.ops-btn {
  padding-left: 10px;
}

.right-20 {
  margin-right: 20px !important;
}

.small-gap {
  margin-right: 15px;
}
.car-box {
  background: #ffffff;
  .card-head {
    position: relative;
    padding: 20px 0;
    padding-left: 15px;
    &::before {
      position: absolute;
      content: '';
      left: 0;
      top: 37%;
      width: 3px;
      height: 13px;
      background: #1573E5;
      border-radius: 8px;
    }
  }
  .card-extra {
    padding-bottom: 10px;
    padding-right: 15px;
    ::v-deep .el-select {
      width: 100%;
    }
  }
}
.cashier-body {
  margin: 10px;

  .cashier-content {

  }

  .grid-wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -moz-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    overflow: hidden;

    .left-grid {
      width: 232px;
      background-color: #d8d8d8;
      overflow-y: auto;
      border-radius: 5px;

      .wr-ls-list {
        padding: 5px;
      }
    }

    .right-grid {
      position: relative;
      flex: 1;
      overflow-y: auto;
      padding: 0 8px 50px;
      background-color: #f2f2f2;
      .bottom-bar {
        position: sticky;
        bottom: -50px;
        left: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background:#ffffff;
        box-shadow: 8px 8px 0 0 rgb(55 99 170 / 10%);
        .state-ope {
          text-align: center;
          button {
            margin-right: 20px;
          }
        }
      }
    }
  }

  .tag-item {
    width: 100%;
    border-radius: 5px;
    background: #ffffff;
    margin-bottom: 1px;
    padding-left: 10px;
    cursor: pointer;
    transition: all .2s ease-in;
    .count_value {
      color: rgb(58, 142, 230);
    }

    .teamix-status-tag {
      margin-right: 5px;
      color: rgb(245, 154, 35);
    }

    &.choose {
      color: #ffffff;
      background-color: #939393;

      .teamix-status-tag, .count_value {
        color: #ffffff;
      }
    }

    .widget-todo-item {
      height: 40px;
      line-height: 40px;
    }
  }
  .top-status-box {
    display: flex;
    height: 40px;
    font-size: 18px;
    line-height: 40px;
    background: #ffffff;
    padding: 0 10px;
    border: 2px solid #147AE3;
    .label {
      margin-right: 40px;
    }
    .left-amount-t {
      color: #F59A23;
    }
  }
}
.journal-table {
  margin-left: 20px;
}
.view-info {
  padding-left: 20px;
  cursor: pointer;
  color: #02A7F0;
  &.disabled {
    cursor:no-drop;
    color: rgb(215, 215, 215);
  }
}
</style>
