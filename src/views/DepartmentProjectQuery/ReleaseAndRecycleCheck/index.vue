<template>
  <ibps-container type="full" class="page">
    <!-- 下达回收复核 -->
    <div>
      <mars-crud
        ref="crud"
        class="table-data_list"
        :toolbars="listConfig.toolbars"
        :columns="listConfig.columns"
        :row-handle="listConfig.rowHandle"
        :search-form="listConfig.searchForm"
        @action-event="handleAction"
        :autoSearch="false"
        :selectionRow="false"
      >
        <template slot="searchForm">
          <searchForm ref="searchForm" :forms="forms" @search="handleSearch" @reset-search="handleResetSearch" />
        </template>

        <template slot="source" slot-scope="scope">
          <span>{{{FinancialChanges:'财务变更',UserAppend:'用户申请'}[scope.row.source] || '--'}}</span>
        </template>

        <template slot="total" slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.total))}}</span>
        </template>

        <template slot="createPerson" slot-scope="scope">
          <span>{{scope.row.createPerson.name || '--'}}</span>
        </template>

        <template slot="createTime" slot-scope="scope">
          <span>{{yyAtool.parseMonth(scope.row.createTime)}}</span>
        </template>

        <template slot="auditTime" slot-scope="scope">
          <span>{{yyAtool.parseMonth(scope.row.auditTime)}}</span>
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
      :visible="batchEditorVisible"
      v-if="batchEditorVisible"
      :readonly="true"
      :batchNo="batchNo"
      @close="()=>{batchEditorVisible=false;getList()}"
      routeName="ReleaseAndRecycleCheck"
    />
  </ibps-container>
</template>
<script>
import yyAtool from '@/utils/aTool.js'
import searchForm from 'mars-comps-lib/lib/mars-crud/src/components/search-form/index.vue'
import BatchEditorPage from '../ReleaseAndRecycleAudit/BatchEditorPage.vue'
import { QueryList_GrpNBNUgJX } from '@/api/getBatchData'
import myUtil from '@/utils/myUtil.js'
export default {
  name: 'ReleaseAndRecycleCheck',
  components: {
    searchForm,
    BatchEditorPage
  },
  data() {
    return {
      myUtil,
      yyAtool,
      batchNo: '',
      currentPage: 1,
      pageSize: 20,
      total: 0,
      batchEditorVisible: false,
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
        }
      ],
      listConfig: {
        toolbars: [],
        searchForm: {
          forms: []
        },
        columns: [
          {
            prop: 'batchNo',
            label: '下达回收批次号',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'source',
            label: '来源',
            align: 'center',
            minWidth: '120px',
            slotName: 'source'
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
            prop: 'createPerson',
            label: '创建人',
            align: 'center',
            minWidth: '120px',
            slotName: 'createPerson'
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
          }
        ],
        rowHandle: {
          actions: [
            {
              key: 'check',
              label: '复核',
              icon: 'ibps-icon-edit'
            }
          ]
        }
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    /**
     * 表格操作
     */
    handleAction(buttonKey, position, selection, data) {
      switch (buttonKey) {
        case 'check':
          this.check(data) //复核
          break
      }
    },

    check(data) {
      this.batchNo = data.batchNo
      this.batchEditorVisible = true
    },

    handlePaginationSizeChange(val) {
      this.pageSize = val
      this.getList()
    },

    handlePaginationCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },

    getList() {
      this.$nextTick(() => {
        this.$refs.crud.loading = true
        let params = {
          ...this.$refs.searchForm.params,
          // state: 'Reviewing',
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

    handleSearch() {
      this.currentPage = 1
      this.getList()
    },

    handleResetSearch() {
      Object.keys(this.$refs.searchForm.params).forEach(key => {
        this.$refs.searchForm.params[key] = ''
      })
      this.handleSearch()
    }
  }
}
</script>