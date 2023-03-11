<template>
  <ibps-container type="full" class="page">
    <!-- 下达回收批次管理 -->
    <div>
      <mars-crud
        ref="crud"
        class="table-data_list"
        :columns="listConfig.columns"
        :row-handle="listConfig.rowHandle"
        :toolbars="listConfig.toolbars"
        :search-form="listConfig.searchForm"
        :autoSearch="false"
        :indexRow="false"
        @action-event="handleAction"
        @selection-change="selectionChange"
      >
        <template slot="searchForm">
          <searchForm ref="searchForm" :forms="forms" @search="handleSearch" @reset-search="handleResetSearch" />
        </template>

        <template slot="source" slot-scope="scope">
          <span>{{{FinancialChanges:'财务变更',UserAppend:'用户申请'}[scope.row.source] || '--'}}</span>
        </template>

        <template slot="state" slot-scope="scope">
          <span>{{{Draft:'草稿',Reviewing:'复核中',Return:'被退回',Finish:'已完成'}[scope.row.state] || '--'}}</span>
        </template>

        <template slot="total" slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.total))}}</span>
        </template>

        <template slot="voucherCode" slot-scope="scope">
          <span>{{scope.row.voucher?scope.row.voucher.voucherCode:'--'}}</span>
        </template>

        <template slot="voucherState" slot-scope="scope">
          <span>{{scope.row.voucher?scope.row.voucher.voucherState:'--'}}</span>
        </template>

        <template slot="createTime" slot-scope="scope">
          <span>{{yyAtool.parseMonth(scope.row.createTime)}}</span>
        </template>

        <template slot="auditTime" slot-scope="scope">
          <span>{{yyAtool.parseMonth(scope.row.auditTime)}}</span>
        </template>

        <template slot="reviewTime" slot-scope="scope">
          <span>{{yyAtool.parseMonth(scope.row.reviewTime)}}</span>
        </template>

        <template v-slot:footer>
          <div class="ibps-container-crud__footer">
            <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              :pageSizes="[10, 20, 50, 100, 200]"
              layout="prev, pager, next, jumper,sizes, ->, total"
              :pagerCount="5"
              @size-change="handlePaginationSizeChange"
              @current-change="handlePaginationCurrentChange"
            ></el-pagination>
          </div>
        </template>
      </mars-crud>
    </div>

    <!-- 额度下达回收 -->
    <BatchEditorPage
      routeName="ReleaseAndRecycleBatch"
      :visible="batchEditorVisible"
      :readonly="true"
      :batchNo="batchNo"
      v-if="batchEditorVisible"
      @close="()=>{batchEditorVisible=false}"
    />
  </ibps-container>
</template>
<script>
import searchForm from 'mars-comps-lib/lib/mars-crud/src/components/search-form/index.vue'
import BatchEditorPage from '../ReleaseAndRecycleAudit/BatchEditorPage.vue'
import { QueryList_GrpNBNUgJX, CancelAudit_pz89OOvxWp, CancelReview_C0pDufjJux, GenVoucher_CMvLOzTHIK } from '@/api/getBatchData'
import myUtil from '@/utils/myUtil.js'
import yyAtool from '@/utils/aTool.js'
export default {
  name: 'ReleaseAndRecycleBatch',
  components: {
    searchForm,
    BatchEditorPage
  },
  data() {
    return {
      myUtil,
      yyAtool,
      selection: [],
      batchEditorVisible: false,
      batchNo: '',
      forms: [
        {
          prop: 'batchNo',
          label: '下达回收批次号',
          placeholder: '请输入下达回收批次号'
        },
        {
          prop: 'source',
          label: '来源',
          fieldType: 'select',
          options: [
            { value: 'FinancialChanges', label: '财务变更' },
            { value: 'UserAppend', label: '用户申请' }
          ]
        },
        {
          prop: 'state',
          label: '状态',
          fieldType: 'select',
          options: [
            { value: 'Reviewing', label: '复核中' },
            { value: 'Finish', label: '已完成' }
          ]
        }
      ],
      listConfig: {
        toolbars: [
          { key: 'qxsh', type: 'danger', label: '取消审核' },
          { key: 'qxfh', type: 'danger', label: '取消复核' }
        ],
        columns: [
          {
            prop: 'BatchNo',
            label: '下达回收批次号',
            align: 'center',
            minWidth: '150px',
            fixed: 'left'
          },
          {
            prop: 'source',
            label: '来源',
            align: 'center',
            minWidth: '120px',
            slotName: 'source',
            fixed: 'left'
          },
          {
            prop: 'state',
            label: '状态',
            align: 'center',
            minWidth: '90px',
            slotName: 'state'
          },
          {
            prop: 'count',
            label: '项目数量',
            align: 'center',
            minWidth: '80px'
          },
          {
            prop: 'total',
            label: '下达总额度',
            minWidth: '180px',
            align: 'right',
            slotName: 'total'
          },
          {
            prop: 'voucherCode',
            label: '凭证编号',
            align: 'center',
            minWidth: '140px',
            slotName: 'voucherCode'
          },
          {
            prop: 'voucherState',
            label: '凭证状态',
            align: 'center',
            minWidth: '100px',
            slotName: 'voucherState'
          },
          {
            prop: 'createTime',
            label: '创建时间',
            align: 'center',
            minWidth: '180px',
            slotName: 'createTime'
          },
          {
            prop: 'auditTime',
            label: '审核时间',
            align: 'center',
            minWidth: '180px',
            slotName: 'auditTime'
          },
          {
            prop: 'reviewTime',
            label: '复核时间',
            align: 'center',
            minWidth: '180px',
            slotName: 'reviewTime'
          }
        ],
        searchForm: {
          forms: []
        },

        rowHandle: {
          fixed: 'left',
          actions: [
            {
              key: 'rowqxsh',
              label: '取消审核',
              type: 'danger',
              hidden(row) {
                return row.state === 'Reviewing' ? false : true
              }
            },
            {
              key: 'rowqxfh',
              label: '取消复核',
              type: 'danger',
              hidden(row) {
                return row.state === 'Finish' ? false : true
              }
            },
            {
              key: 'detail',
              label: '查看'
            },
            {
              key: 'resetcreate',
              label: '重新生成'
            }
          ]
        }
      },
      currentPage: 1,
      pageSize: 20,
      total: 0
    }
  },
  mounted() {
    this.getList()
  },

  methods: {
    selectionChange(val) {
      this.selection = val
    },

    handlePaginationSizeChange(val) {
      this.pageSize = val
      this.getList()
    },

    handlePaginationCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },

    handleSearch() {
      this.currentPage = 1
      this.getList()
    },

    handleResetSearch() {
      Object.keys(this.$refs.searchForm.params).forEach(key => {
        this.$refs.searchForm.params[key] = ''
      })
      this.handleSearch()
    },

    getList() {
      this.$nextTick(() => {
        this.$refs.crud.loading = true
        let params = {
          ...this.$refs.searchForm.params,
          requestPage: {
            limit: this.pageSize,
            pageNo: this.currentPage
          }
        }
        QueryList_GrpNBNUgJX(params)
          .then(res => {
            this.$refs.crud.ibpsData = res.data.dataResult || []
            this.total = res.data.pageResult.totalCount || 0
            this.$refs.crud.loading = false
          })
          .catch(() => {
            this.$refs.crud.loading = false
          })
      })
    },

    /**
     * 表格操作
     */
    handleAction(buttonKey, position, selection, data) {
      switch (buttonKey) {
        case 'qxsh':
          this.goCancelSh() //取消审核
          break
        case 'qxfh':
          this.goCancelFh() //取消复核
          break
        case 'detail':
          this.check(data) //查看
          break
        case 'rowqxsh':
          this.goRowCancelSh(data) //列表内容取消审核
          break
        case 'rowqxfh':
          this.goRowCancelFh(data) //列表内容取消复核
          break
        case 'resetcreate':
          this.goCreate(data) //重新生成
          break
      }
    },

    // 取消审核
    goCancelSh() {
      if (!this.selection.length) {
        return this.$message.warning('请选择需要取消审核的数据！')
      }
      if (this.selection.some(item => item.state !== 'Reviewing')) {
        return this.$message.warning('请选择状态为“复核中”的批次！')
      }
      this.shCommonFn(this.selection)
    },

    shCommonFn(data) {
      this.$confirm('取消审核后，批次将返回下达回收审核页，请确认！', '提示', {
        confirmButtonText: '确认取消',
        cancelButtonText: '关 闭',
        type: 'warning'
      })
        .then(() => {
          CancelAudit_pz89OOvxWp({ batchNos: data.map(item => item.batchNo) }).then(res => {
            this.$message.success('操作成功！')
            this.getList()
            this.$router.push({
              name: 'ReleaseAndRecycleAudit'
            })
          })
        })
        .catch(() => {})
    },

    // 取消复核
    goCancelFh() {
      if (!this.selection.length) {
        return this.$message.warning('请选择需要取消复核的数据！')
      }
      if (this.selection.some(item => item.state !== 'Finish')) {
        return this.$message.warning('请选择状态为“已完成”的批次！')
      }
      this.fhCommonFn(this.selection)
    },

    fhCommonFn(data) {
      this.$confirm('取消复核后，批次将返回下达回收复核/审核页，请确认！', '提示', {
        confirmButtonText: '确认取消',
        cancelButtonText: '关 闭',
        type: 'warning'
      })
        .then(() => {
          CancelReview_C0pDufjJux({ batchNos: data.map(item => item.batchNo) }).then(res => {
            this.$message.success('操作成功！')
            this.getList()
            this.$router.push({
              name: 'ReleaseAndRecycleCheck'
            })
          })
        })
        .catch(() => {})
    },

    goRowCancelSh(row) {
      this.shCommonFn([row])
    },

    goRowCancelFh(row) {
      this.fhCommonFn([row])
    },

    // 重新生成凭证
    goCreate(row) {
      GenVoucher_CMvLOzTHIK({ batchNos: [row.batchNo] }).then(res => {
        this.$message.success('操作成功！')
        this.getList()
      })
    },

    check(row) {
      this.batchEditorVisible = true
      this.batchNo = row.batchNo
    }
  }
}
</script>
<style lang="scss" scoped>
.table-data_list {
  ::v-deep .el-table tr {
    height: 40px;
  }
}
.operate-btns {
  ::v-deep .el-button {
    padding: 0 5px !important;
  }
}
</style>
