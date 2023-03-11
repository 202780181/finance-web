<template>
  <div v-if="visible">
    <!-- 查看 -->
    <mars-dialog
      v-if="visible"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      :fullscreen="true"
      class="dialogFixedTop"
      title="查看"
      @close="closeDialog"
    >
      <div class="budget-check_content">
        <BudgetDetailHeader />
        <div>
          <el-form label-width="100px" class="detail-task_header">
            <el-form-item label="任务编号：">
              <span class="form-span">2023.01.05</span>
            </el-form-item>
            <h3>紧急预算申报</h3>
            <el-form-item label="项目状态：">
              <span class="form-span">待下达</span>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-radio-group v-model="activeName" @change="changeRadio">
            <el-radio-button :label="item.value" v-for="item in options" :key="item.value">{{item.label}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="budget-check_table">
          <!-- 底部列表表格 -->
          <div v-if="activeName==='1'" class="year-budget_table">
            <div class="year-budget_radio">
              <el-radio-group v-model="radio">
                <el-radio label="1">默认视图</el-radio>
                <el-radio label="2">费用项视图</el-radio>
              </el-radio-group>
            </div>
            <el-table :data="tableData" border tooltip-effect="dark" height="100%" :summary-method="summaryMethod" show-summary>
              <el-table-column label="序号" align="center" width="50">
                <template slot-scope="scope">
                  <span>{{scope.$index+1}}</span>
                </template>
              </el-table-column>
              <el-table-column label="开支事项" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
              <el-table-column label="费用项" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
              <el-table-column label="开支内容" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
              <el-table-column label="计量单位" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
              <el-table-column label="单价/支出标准" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
              <el-table-column label="工作量" prop="projectName" show-overflow-tooltip align="right" min-width="100"></el-table-column>
              <el-table-column label="测算依据及说明" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
              <el-table-column label="按标准测算金额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
              <el-table-column label="是否招标采购" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
              <el-table-column label="是否新增资产" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
            </el-table>
          </div>
          <el-table
            :data="tableData"
            v-if="activeName==='2'"
            border
            tooltip-effect="dark"
            height="100%"
            :summary-method="summaryMethod"
            show-summary
          >
            <el-table-column label="序号" align="center" width="50">
              <template slot-scope="scope">
                <span>{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="采购方式" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
            <el-table-column label="采购项目" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
            <el-table-column label="采购品目" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
            <el-table-column label="经济分类" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
            <el-table-column label="采购需求概况" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
            <el-table-column label="预计采购时间" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
            <el-table-column label="预算金额（元）" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
          </el-table>
          <el-table
            :data="tableData1"
            v-if="activeName==='3'"
            border
            tooltip-effect="dark"
            height="100%"
            :summary-method="summaryMethod"
            show-summary
          >
            <el-table-column label="序号" align="center" width="50">
              <template slot-scope="scope">
                <span>{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="资产分类" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
            <el-table-column label="资产名称" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
            <el-table-column label="参考型号" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
            <el-table-column label="参考品牌" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
            <el-table-column label="单价（元）" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
            <el-table-column label="数量" prop="projectName" show-overflow-tooltip align="center" min-width="100"></el-table-column>
            <el-table-column label="总金额（元）" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
            <el-table-column label="备注" prop="projectName" show-overflow-tooltip align="center" min-width="180"></el-table-column>
          </el-table>
          <template v-if="activeName==='4'">
            <PerformanceTarget />
          </template>
          <template v-if="activeName==='5'">
            <AttachmentList :readonly="true" />
          </template>
          <MoveInfoList v-if="activeName==='6'" />
        </div>
      </div>
      <template slot="ms-foot">
        <el-button type="primary" @click="releaseBudget">下达预算</el-button>
        <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
      </template>
    </mars-dialog>
  </div>
</template>
<script>
import AttachmentList from '@/views/DepartmentProjectQuery/ReleaseAndRecycleAudit/components/AttachmentList.vue'
import MoveInfoList from '@/views/DepartmentProjectQuery/ReleaseAndRecycleAudit/components/MoveInfoList.vue'
import BudgetDetailHeader from '../components/BudgetDetailHeader.vue'
import PerformanceTarget from '../components/PerformanceTarget.vue'
export default {
  name: 'BudgetDetailCheck',
  components: {
    AttachmentList,
    MoveInfoList,
    BudgetDetailHeader,
    PerformanceTarget
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      activeName: '1',
      radio: '1',
      tableData: [], //招标采购预算
      tableData1: [], //新增资产预算
      options: [
        {
          label: '年度资金计划',
          value: '1'
        },
        {
          label: '招标采购预算',
          value: '2'
        },
        {
          label: '新增资产预算',
          value: '3'
        },
        {
          label: '绩效目标',
          value: '4'
        },
        {
          label: '附件',
          value: '5'
        },
        {
          label: '流转信息',
          value: '6'
        }
      ]
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    // 下达预算
    releaseBudget() {},

    changeRadio() {},

    summaryMethod() {}
  }
}
</script>
<style lang="scss" scoped>
.form-span {
  line-height: 33px;
  display: block;
  font-size: 13px;
}
.detail-task_header {
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  h3 {
    margin-left: 20px;
  }
}
.el-form .el-form-item {
  margin-bottom: 0 !important;
}

.dialogFixedTop {
  ::v-deep.el-dialog__body {
    .fw-dialog-body {
      height: 100%;
    }
  }
}
.budget-check_content {
  height: 100%;
  display: flex;
  flex-direction: column;
  .budget-check_table {
    flex: 1;
    margin-top: 20px;
  }
}
.year-budget_table {
  height: 100%;
  display: flex;
  flex-direction: column;
  .year-budget_radio {
    margin-bottom: 10px;
    text-align: right;
  }
}
</style>
