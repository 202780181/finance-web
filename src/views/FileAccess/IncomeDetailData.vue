<template>
  <ibps-container type="full" class="page">
    <!-- 收入明细数据 -->
    <div>
      <mars-crud
        ref="crud"
        class="table-data_list"
        :columns="listConfig.columns"
        :row-handle="listConfig.rowHandle"
        @action-event="handleAction"
        :search-form="listConfig.searchForm"
        :autoSearch="false"
        :selectionRow="false"
      >
        <template slot="searchForm">
          <el-form :inline="true" ref="queryForm" label-width="120px" :model="queryForm">
            <el-form-item label="日期">
              <el-input placeholder="请输入日期" v-model.trim="queryForm.code" clearable></el-input>
            </el-form-item>
            <el-form-item label="执行项目">
              <el-input placeholder="请输入执行项目" v-model.trim="queryForm.code" clearable></el-input>
            </el-form-item>
            <el-form-item class="btn-list">
              <el-button type="primary" icon="ibps-icon-search" @click="handleSearch">查询</el-button>
              <el-button type="primary" icon="ibps-icon-refresh" @click="handleResetSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </template>
      </mars-crud>
    </div>
    <!-- 收入记录查看 -->
    <IncomeDetailDialog v-if="incomeVisible" :visible="incomeVisible" @close="()=>{incomeVisible=false}" />
  </ibps-container>
</template>
<script>
import IncomeDetailDialog from './IncomeDetailDialog.vue'
export default {
  name: 'IncomeDetailData',
  components: {
    IncomeDetailDialog
  },
  data() {
    return {
      listConfig: {
        columns: [
          {
            prop: 'code',
            label: '日期',
            align: 'center',
            minWidth: '120px'
          },
          {
            prop: 'code',
            label: '执行项目',
            align: 'center',
            minWidth: '140px'
          },
          {
            prop: 'code',
            label: '摘要',
            align: 'center',
            minWidth: '140px'
          },
          {
            prop: 'code',
            label: '收入金额',
            align: 'right',
            minWidth: '140px'
          }
        ],
        searchForm: {
          forms: []
        },
        rowHandle: {
          actions: [
            {
              key: 'detail',
              label: '查看'
            }
          ]
        }
      },
      queryForm: {
        code: ''
      },
      incomeVisible: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$nextTick(() => {
        this.$refs.crud.ibpsData = [{}, {}]
      })
    },

    handleSearch() {},

    handleResetSearch() {},

    /**
     * 表格操作
     */
    handleAction(buttonKey, position, selection, data) {
      switch (buttonKey) {
        case 'detail':
          this.goDetail(data) //查看详情
          break
      }
    },

    goDetail(data) {
      this.incomeVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-list {
  .el-button {
    margin-left: 5px !important;
  }
}
</style>