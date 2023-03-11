<template>
  <div>
    <ibps-container type="full" class="page">
      <div>
        <!-- 执行年度管理 -->
        <mars-crud
          ref="crud"
          class="table-data_list"
          :columns="listConfig.columns"
          :row-handle="listConfig.rowHandle"
          :toolbars="listConfig.toolbars"
          @action-event="handleAction"
          :summaryMethod="summaryMethod"
          :showSummary="true"
          :autoSearch="false"
          :showPagination="false"
          @selection-change="selectionChange"
        ></mars-crud>
      </div>
    </ibps-container>
  </div>
</template>
<script>
export default {
  name: 'ExecutiveYearManage',
  data() {
    return {
      selection: [],
      listConfig: {
        toolbars: [
          { key: 'add', label: '新增' },
          { key: 'removeBatch', type: 'danger', label: '删除', icon: 'ibps-icon-remove' }
        ],
        columns: [
          {
            prop: 'batchNo',
            label: '执行年度',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'batchNo',
            label: '锁定',
            align: 'center',
            minWidth: '150px'
          },
          {
            prop: 'batchNo',
            label: '备注',
            align: 'center',
            minWidth: '150px'
          }
        ],
        rowHandle: {
          actions: [
            {
              key: 'lock',
              type: 'primary',
              label: '解锁'
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
        case 'add':
          this.goAdd() //新增项目
          break
        case 'removeBatch':
          this.removeBatch() //批量删除
          break
        case 'lock':
          this.lock(data) //解锁/锁定
          break
      }
    },
    goAdd() {},

    removeBatch() {
      if (!this.selection.length) {
        return this.$message.warning('请选择需要删除的数据！')
      }
    },

    lock(data) {},

    summaryMethod(param) {},

    selectionChange(val) {
      this.selection = val
    },

    getList() {
      this.$nextTick(() => {
        this.$refs.crud.ibpsData = [{}, {}]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-list_header {
  padding: 10px;
  .el-button {
    margin-right: 5px;
  }
}
</style>