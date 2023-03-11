<template>
  <mars-dialog
    :fullscreen="false"
    class="choice-dialog"
    :modal="true"
    :modal-append-to-body="false"
    title="费用预算明细"
    v-if="visible"
    @close="closeDialog"
  >
    <el-form :model="tableForm" label-width="120px" style="height:100%" ref="tableForm" :rules="rules">
      <div class="table-header">
        <div>
          <p>
            执行项目编号：
            <span>123</span>
          </p>
        </div>
        <div>
          <p>
            项目名称：
            <span>123</span>
          </p>
        </div>
        <div>
          <p>
            执行项目类别：
            <span>123</span>
          </p>
        </div>
        <div>
          <p>
            所属部门：
            <span>123</span>
          </p>
        </div>
        <div>
          <p>
            项目负责人：
            <span>123</span>
          </p>
        </div>
      </div>
      <div class="table-middle" v-if="!readonly">
        <span>当前项目余额：5000</span>
      </div>
      <el-table :data="tableForm.tableData" border tooltip-effect="dark" height="100%">
        <el-table-column label="序号" align="center" width="50">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="费用项" prop="2" align="center" min-width="120" />
        <el-table-column label="年度预算" prop="2" align="center" min-width="120" />
        <el-table-column label="上年结转预算" prop="2" align="center" min-width="140" />
        <el-table-column label="总预算" prop="2" align="center" min-width="140" />
        <el-table-column label="支出金额" prop="2" align="center" min-width="140" />
        <el-table-column label="预算余额" prop="2" align="center" min-width="140" />
        <el-table-column label="冻结金额" prop="2" align="center" min-width="140" />
        <el-table-column label="已登记留用额度" prop="2" align="center" min-width="140" />
        <el-table-column label="* 本次调整留用额度" prop="bcxded" align="center" min-width="150">
          <template slot-scope="scope">
            <el-form-item
              v-if="!readonly"
              class="table-form_item"
              style="margin-top:10px;"
              :prop="'tableData.' + scope.$index + '.bcxded'"
              :rules="rules.bcxded"
            >
              <el-input-number :controls="false" v-model="scope.row.bcxded" :precision="2" :step="0.1" :min="0" placeholder="请输入"></el-input-number>
            </el-form-item>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="调整后留用额度" prop="2" align="center" min-width="140" />
      </el-table>
    </el-form>
    <template slot="ms-foot">
      <el-button v-if="!readonly" icon="ibps-icon-save" type="primary" @click="submit">
        <span style="padding-left:5px;">保 存</span>
      </el-button>
      <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
    </template>
  </mars-dialog>
</template>
<script>
export default {
  name: 'FeeBudgetDetailedSet',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableForm: {
        tableData: [{ bcxded: undefined }]
      },
      rules: {
        bcxded: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    submit() {
      this.$refs.tableForm.validate(valid => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.choice-dialog {
  ::v-deep.el-dialog__body {
    .fw-dialog-body {
      height: 100%;
      position: relative;
    }
  }
}
.el-form {
  display: flex;
  flex-direction: column;
  .table-header {
    display: flex;
    margin-bottom: 20px;
    & > div {
      margin-right: 60px;
    }
  }
  .table-middle {
    text-align: right;
    margin-bottom: 10px;
  }
  .table-form_item {
    ::v-deep.el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
