<template>
  <!-- 项目查询明细-->
  <div v-if="visible">
    <mars-dialog
      v-if="visible"
      class="dialogFixedTop"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      :fullscreen="true"
      :title="title"
      @close="closeDialog"
    >
      <div class="batch-editor_page">
        <el-tabs v-model="activeName" class="el-tabs_reset">
          <el-tab-pane label="基本情况" name="1">
            <BasicInfo ref="BasicInfo" :projectCodes="projectCodes" :formData="formData" :readonly="readonly" />
          </el-tab-pane>
          <el-tab-pane label="收支明细表" name="2">
            <VoucherInfoList />
          </el-tab-pane>
          <el-tab-pane label="收支汇总表" name="3">
            <AttachmentList ref="AttachmentList" :readonly="readonly" />
          </el-tab-pane>
          <el-tab-pane label="借款明细账" name="4">
            <MoveInfoList />
          </el-tab-pane>
          <el-tab-pane label="经济分类汇总表" name="5">
            <MoveInfoList />
          </el-tab-pane>
          <el-tab-pane label="项目明细账" name="6">
            <MoveInfoList />
          </el-tab-pane>
          <el-tab-pane label="预算执行进度" name="7">
            <MoveInfoList />
          </el-tab-pane>
          <el-tab-pane label="预算执行明细" name="8">
            <MoveInfoList />
          </el-tab-pane>
          <el-tab-pane label="项目被锁定原因表" name="9">
            <MoveInfoList />
          </el-tab-pane>
          <el-tab-pane label="冻结明细表" name="10">
            <MoveInfoList />
          </el-tab-pane>
          <el-tab-pane label="资金来源统计" name="11">
            <MoveInfoList />
          </el-tab-pane>
          <el-tab-pane label="科研项目归集表" name="12">
            <MoveInfoList />
          </el-tab-pane>
          <el-tab-pane label="项目支出属性执行进度表" name="13">
            <MoveInfoList />
          </el-tab-pane>
        </el-tabs>
        <!-- <el-form :inline="true">
          <el-form-item label="制单：">
            <div class="detail-font">{{formData.voucher?formData.voucher.zdrmc || '--':'--'}}</div>
          </el-form-item>
          <el-form-item label="审核：">
            <div class="detail-font">{{formData.auditPerson?formData.auditPerson.name || '--':'--'}}</div>
          </el-form-item>
          <el-form-item label="复核：">
            <div class="detail-font">{{formData.reviewPerson?formData.reviewPerson.name || '--':'--'}}</div>
          </el-form-item>
        </el-form>-->
      </div>
      <template slot="ms-foot">
        <!-- <template v-if="routeName==='ReleaseAndRecycleAudit'">
          <el-button type="primary" @click="goIdentify">审 核</el-button>
          <el-button icon="ibps-icon-save" type="primary" @click="submit">
            <span style="padding-left:5px;">保 存</span>
          </el-button>
          <el-button @click="closeDialog" icon="el-icon-circle-close">取 消</el-button>
        </template>-->
        <template>
          <el-button type="primary" @click="goPass">导 出</el-button>
          <el-button type="danger" @click="callBack">打 印</el-button>
          <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
        </template>

        <!-- <template v-if="routeName==='ReleaseAndRecycleBatch'">
          <el-button icon="el-icon-printer" type="primary" @click="print">打 印</el-button>
          <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
        </template>-->
      </template>
    </mars-dialog>

    <!-- 退回，填写意见 -->
    <!-- <CallBackInfoDialog :visible="callBackVisible" v-if="callBackVisible" @close="()=>{callBackVisible=false}" @success="backFn" /> -->
    <!-- 打印弹窗 -->
    <PrintDialog :visible="printVisible" v-if="printVisible" @close="()=>{printVisible=false}" />
  </div>
</template>
<script>
import MoveInfoList from './components/MoveInfoList.vue'
import AttachmentList from './components/AttachmentList.vue'
import BasicInfo from './components/BasicInfo.vue'
import VoucherInfoList from './components/VoucherInfoList.vue'
import { QueryByBatchNo_79cuq4FwH7, Save_J9SHlVUzWk, Audit_ps7QVtrkzX, CancelAudit_pz89OOvxWp, Review_VKJpioF22t } from '@/api/getBatchData'
// import CallBackInfoDialog from './components/CallBackInfoDialog.vue'
import PrintDialog from './components/PrintDialog.vue'
export default {
  name: 'BatchEditorPage',
  components: {
    MoveInfoList,
    AttachmentList,
    BasicInfo,
    VoucherInfoList,
    // CallBackInfoDialog,
    PrintDialog
  },
  props: {
    title: {
      type: String,
      default: '项目查询明细'
    },
    visible: {
      type: Boolean,
      default: false
    },
    // 批次号
    batchNo: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },

    // 判断是从那个页面过来的
    routeName: {
      type: String,
      default: ''
    },

    //执行项目编号列表
    projectCodes: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      callBackVisible: false,
      printVisible: false,
      activeName: '1',
      formData: {
        batchNo: '', //下达回收批次号
        remark: '', //摘要
        state: '', //状态
        voucher: {}, //凭证
        auditPerson: {}, //审核
        reviewPerson: {}, //复核
        items: [] //下达回收明细
      }
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      if (this.batchNo) {
        //批次号存在
        this.loading = true
        QueryByBatchNo_79cuq4FwH7({ batchNo: this.batchNo })
          .then(res => {
            this.formData = res.data
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        this.formData.state = 'Draft'
      }
    },
    closeDialog() {
      this.$emit('close')
    },

    submit() {
      this.loading = true
      Save_J9SHlVUzWk(this.getParams())
        .then(res => {
          if (res.data.msg) {
            this.$message.error(res.data.msg)
          } else {
            this.$message.success('操作成功！')
            this.closeDialog()
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    goIdentify() {
      let arr = [
        { name: 'BasicInfo', type: '1' },
        { name: 'AttachmentList', type: '3' }
      ]
      let brr = []
      arr.forEach(f => {
        this.$refs[f.name].$refs.tableForm.validate(valid => {
          brr.push(valid)
          if (!valid) {
            this.activeName = f.type
          }
        })
      })
      if (brr.every(f => f)) {
        this.loading = true
        Audit_ps7QVtrkzX(this.getParams())
          .then(res => {
            if (res.data.msg) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.success('操作成功！')
              this.closeDialog()
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    },

    getParams() {
      let params = {
        releaseRecycling: {
          //其他详细信息
          ...this.formData
        },
        attachIds: [] //附件
      }
      return params
    },

    //打 印
    print() {
      this.printVisible = true
    },

    // 通过
    goPass() {
      Review_VKJpioF22t({ batchNos: [this.batchNo] }).then(res => {})
    },

    // 退回
    callBack() {
      this.callBackVisible = true
    },

    // 退回成功后调用内容
    backFn(data) {
      let params = {
        batchNos: [this.batchNo],
        reason: data.remark
      }
      CancelAudit_pz89OOvxWp(params).then(res => {
        this.$message.success('操作成功！')
        this.closeDialog()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tabs_reset {
  ::v-deep .el-tabs__content {
    border: none;
    padding: 0;
  }
  ::v-deep.el-tabs__header {
    .el-tabs__item.is-top {
      background: #fff;
    }
    .el-tabs__nav-scroll .el-tabs__nav.is-top .el-tabs__item {
      border: none !important;
    }
    .el-tabs__item.is-active {
      border-top: none !important;
    }
    .el-tabs__item {
      padding: 0 20px;
    }
  }
}
.detail-font {
  font-size: 13px;
  line-height: 33px;
  margin-right: 40px;
}
.dialogFixedTop {
  ::v-deep.el-dialog__body {
    .fw-dialog-body {
      height: 100%;
    }
  }
}
.batch-editor_page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
