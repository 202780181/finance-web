<template>
  <ibps-container type="full" class="page">
    <!-- 支出明细数据 -->
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
            <el-form-item label="费用分类">
              <el-input placeholder="请输入费用分类" v-model.trim="queryForm.code" clearable></el-input>
            </el-form-item>
            <el-form-item label="资金来源">
              <el-input placeholder="请输入资金来源" v-model.trim="queryForm.code" clearable></el-input>
            </el-form-item>
            <el-form-item label="凭证编号">
              <el-input placeholder="请输入凭证编号" v-model.trim="queryForm.code" clearable></el-input>
            </el-form-item>
            <el-form-item class="btn-list">
              <el-button type="primary" icon="ibps-icon-search" @click="handleSearch">查询</el-button>
              <el-button type="primary" icon="ibps-icon-refresh" @click="handleResetSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </template>
      </mars-crud>
    </div>
    <!-- 支出记录查看 -->
    <PayDetailDialog v-if="payVisible" :visible="payVisible" @close="()=>{payVisible=false}" />
  </ibps-container>
</template>
<script>
import PayDetailDialog from './PayDetailDialog.vue'
export default {
  name: 'PayDetailData',
  components: {
    PayDetailDialog
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
            label: '支出金额',
            align: 'right',
            minWidth: '140px'
          },
          {
            prop: 'code',
            label: '费用分类',
            align: 'center',
            minWidth: '140px'
          },
          {
            prop: 'code',
            label: '资金来源',
            align: 'center',
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

      payVisible: false
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
      this.payVisible = true
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