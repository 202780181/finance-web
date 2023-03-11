<template>
  <el-form :model="tableForm" label-width="120px" style="height:100%" ref="tableForm" :rules="rules">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="留用批次号">
          <el-input v-if="!readonly" v-model="tableForm.batchCode" disabled></el-input>
          <div v-else class="detail-font">留用批次号</div>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="摘要" prop="zy">
          <el-input v-if="!readonly" v-model.trim="tableForm.zy" placeholder="请输入"></el-input>
          <div v-else class="detail-font">留用批次号</div>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态">
          <div class="detail-font">{{tableForm.statusName}}</div>
        </el-form-item>
      </el-col>
      <el-col :span="24" class="batch-info_list-btn" v-if="!readonly">
        <el-button type="primary" icon="ibps-icon-add" @click="goAdd">新增</el-button>
        <el-button type="danger" icon="ibps-icon-remove" @click="goRemove">删除</el-button>
      </el-col>
    </el-row>

    <el-table @selection-change="handleSelectionChange" :data="tableForm.tableData" border tooltip-effect="dark" height="100%">
      <el-table-column v-if="!readonly" type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="序号" align="center" width="50">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="readonly?'项目编号':'执行项目编号'" prop="1" align="center" min-width="120" />
      <el-table-column label="项目名称" prop="2" align="center" min-width="120" />
      <el-table-column label="预算项目" prop="2" align="center" min-width="140" />
      <el-table-column label="项目余额" prop="2" align="center" min-width="140" />
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
      <el-table-column label="调整后留用额度" prop="2" align="center" min-width="180" />
      <el-table-column label="操作" align="center" width="130">
        <template slot-scope="scope">
          <el-button v-if="!readonly" type="text" @click="goSetFee(scope.row)">设置费用预算</el-button>
          <el-button v-else type="text" @click="goFeeDetail(scope.row)">费用预算明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <ProjectChoiceDialog :visible="projectVisible" v-if="projectVisible" @close="()=>{projectVisible=false}" />
    <!-- 费用预算明细 -->
    <FeeBudgetDetailedSet :readonly="readonly" :visible="feeVisible" v-if="feeVisible" @close="()=>{feeVisible=false}" />
  </el-form>
</template>
<script>
import ProjectChoiceDialog from '@/components/projectItemDialog/ProjectChoiceDialog.vue'
import FeeBudgetDetailedSet from './FeeBudgetDetailedSet.vue'
export default {
  name: 'ReservedRegisterBatchList',
  components: { ProjectChoiceDialog, FeeBudgetDetailedSet },
  props: {
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableForm: {
        tableData: [{ bcxded: undefined }],
        batchCode: '', //下达回收批次号
        zy: '', //摘要
        status: '',
        statusName: '草稿'
      },
      rules: {
        zy: [{ required: true, message: '请输入', trigger: 'blur' }],
        bcxded: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      selection: [],
      projectVisible: false,
      feeVisible: false
    }
  },

  methods: {
    goAdd() {
      this.projectVisible = true
    },

    goRemove() {
      if (!this.selection.length) {
        return this.$message.warning('请选择需要删除的数据！')
      }
      this.$confirm('确定删除选中数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {})
    },

    handleSelectionChange(val) {
      this.selection = val
    },

    // 设置费用预算
    goSetFee(row) {
      this.feeVisible = true
    },

    // 费用预算明细
    goFeeDetail(row) {
      this.feeVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-font {
  font-size: 13px;
  line-height: 33px;
}
.batch-info_list-btn {
  margin-bottom: 10px;
  .el-button {
    margin-right: 10px;
  }
}
.el-form {
  display: flex;
  flex-direction: column;
}
.table-form_item {
  ::v-deep.el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
