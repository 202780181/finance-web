<template>
  <div v-if="visible">
    <mars-dialog v-if="visible" :fullscreen="true" class="dialogFixedTop" title="项目下达回收明细" @close="closeDialog">
      <mars-crud
        ref="crud"
        :outdata="outdata"
        :columns="listConfig.columns"
        :autoSearch="false"
        :showPagination="false"
        :selectionRow="false"
      >
        <template v-slot:header>
          <el-form :inline="true" style="margin-top:20px">
            <el-form-item label="执行项目编号：">
              <div class="detail-font">11-180000</div>
            </el-form-item>
            <el-form-item label="项目名称：">
              <div class="detail-font">财务处办公费</div>
            </el-form-item>
            <el-form-item label="执行项目类别：">
              <div class="detail-font">180000 学校部门公用</div>
            </el-form-item>
            <el-form-item label="所属部门：">
              <div class="detail-font">财务处</div>
            </el-form-item>
            <el-form-item label="项目负责人：">
              <div class="detail-font">张三</div>
            </el-form-item>
          </el-form>
        </template>
        <template slot="xdhsCode" slot-scope="scope">
          <el-button type="text" @click="goDetail(scope.row)">{{scope.row.xdhsCode || '--'}}</el-button>
        </template>

        <template slot="pzCode" slot-scope="scope">
          <el-button type="text" @click="goPzCode(scope.row)">{{scope.row.pzCode || '--'}}</el-button>
        </template>
      </mars-crud>
      <template slot="ms-foot">
        <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
      </template>
    </mars-dialog>

    <!-- 凭证明细 -->
    <VoucherDetailDialog v-if="voucherVisible" :visible="voucherVisible" @close="()=>{voucherVisible=false}" />

    <!-- 下达回收批次号 -->
    <BatchEditorPage
      routeName="ReleaseAndRecycleBatch"
      :visible="batchEditorVisible"
      :readonly="true"
      :batchNo="batchNo"
      v-if="batchEditorVisible"
      @close="()=>{batchEditorVisible=false}"
    />
  </div>
</template>
<script>
import VoucherDetailDialog from './VoucherDetailDialog.vue'
import BatchEditorPage from '../ReleaseAndRecycleAudit/BatchEditorPage.vue'
export default {
  name: 'TransmiTretrieveDetail',
  components: {
    VoucherDetailDialog,
    BatchEditorPage
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      outdata: [{}, {}],
      voucherVisible: false,
      batchEditorVisible: false,
      batchNo: '',
      listConfig: {
        columns: [
          {
            prop: 'xdhsCode',
            label: '下达回收批次号',
            align: 'center',
            minWidth: '120px',
            slotName: 'xdhsCode'
          },
          {
            prop: '2',
            label: '来源',
            align: 'center',
            minWidth: '100px'
          },
          {
            prop: '3',
            label: '下达回收前累计下达额度',
            align: 'center',
            minWidth: '180px'
          },
          {
            prop: '4',
            label: '本次下达回收额度',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: '5',
            label: '下达回收后累计下达额度',
            align: 'center',
            minWidth: '180px'
          },
          {
            prop: '6',
            label: '制单',
            align: 'center',
            minWidth: '100px'
          },
          {
            prop: '7',
            label: '审核',
            align: 'center',
            minWidth: '100px'
          },
          {
            prop: '8',
            label: '复核',
            align: 'center',
            minWidth: '100px'
          },
          {
            prop: '9',
            label: '下达回收时间',
            align: 'center',
            minWidth: '160px'
          },
          {
            prop: 'pzCode',
            label: '凭证编号',
            align: 'center',
            minWidth: '140px',
            slotName: 'pzCode'
          },
          {
            prop: '11',
            label: '摘要',
            align: 'center',
            minWidth: '140px'
          }
        ]
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    // 凭证编号
    goPzCode(row) {
      this.voucherVisible = true
    },

    // 下达回收批次号
    goDetail(row) {
      this.batchEditorVisible = true
      this.batchNo = row.batchNo
    }
  }
}
</script>
<style lang="scss" scoped>
.dialogFixedTop {
  ::v-deep.el-dialog__body {
    .fw-dialog-body {
      height: 100%;
      position: relative;
    }
  }
}
.detail-font {
  font-size: 13px;
  line-height: 33px;
}
</style>
