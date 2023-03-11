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
      title="项目预算调整审核"
      @close="closeDialog"
    >
      <div class="project-budget_adjust">
        <BudgetDetailHeader />
        <h3>预算调整</h3>
        <el-tabs v-model="activeName" class="el-tabs_reset">
          <el-tab-pane label="调整信息" name="1">
            <div class="adjust-info_content">
              <el-form label-width="120px">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="调整编号：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="状态：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="送审日期：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="调整原因：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-table :data="tableData" border tooltip-effect="dark" :summary-method="summaryMethod">
                <el-table-column label="序号" align="center" width="50">
                  <template slot-scope="scope">
                    <span>{{scope.$index+1}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="费用项名称" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
                <el-table-column label="预算金额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="支出金额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="费用项余额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="冻结金额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="本次申请调整预算" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="调整后预算余额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="调整后费用项余额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="附件" name="2">
            <AttachmentList :readonly="true" />
          </el-tab-pane>
          <el-tab-pane label="流转信息" name="3">
            <MoveInfoList />
          </el-tab-pane>
          <el-tab-pane label="原预算申报信息" name="4"></el-tab-pane>
          <el-tab-pane label="调整记录" name="5">
            <div class="adjust-info_content">
              <el-form label-width="120px">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="调整编号：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="通过日期：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="调整原因：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-table :data="tableData" border tooltip-effect="dark" :summary-method="summaryMethod">
                <el-table-column label="序号" align="center" width="50">
                  <template slot-scope="scope">
                    <span>{{scope.$index+1}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="费用项名称" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
                <el-table-column label="预算金额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="支出金额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="费用项余额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="冻结金额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="本次申请调整预算" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="调整后预算余额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="调整后费用项余额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
              </el-table>
              <el-form label-width="120px">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="制单：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="审核：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <p class="space"></p>
              <el-form label-width="120px">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="调整编号：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="通过日期：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="调整原因：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-table :data="tableData" border tooltip-effect="dark" :summary-method="summaryMethod">
                <el-table-column label="序号" align="center" width="50">
                  <template slot-scope="scope">
                    <span>{{scope.$index+1}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="费用项名称" prop="projectName" show-overflow-tooltip align="center" min-width="120"></el-table-column>
                <el-table-column label="预算金额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="支出金额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="费用项余额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="冻结金额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="本次申请调整预算" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="调整后预算余额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
                <el-table-column label="调整后费用项余额" prop="projectName" show-overflow-tooltip align="right" min-width="180"></el-table-column>
              </el-table>
              <el-form label-width="120px">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="制单：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="审核：">
                      <div class="detail-font">YSTJ2022010004</div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-form :inline="true" class="project-budget_adjust-bottom">
          <el-form-item label="制单：">
            <div class="detail-font">--</div>
          </el-form-item>
          <el-form-item label="审核：">
            <div class="detail-font">--</div>
          </el-form-item>
        </el-form>
      </div>
      <template slot="ms-foot">
        <el-button type="primary" @click="releaseBudget">下 达</el-button>
        <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
      </template>
    </mars-dialog>
  </div>
</template>
<script>
import BudgetDetailHeader from '../components/BudgetDetailHeader.vue'
import AttachmentList from '@/views/DepartmentProjectQuery/ReleaseAndRecycleAudit/components/AttachmentList.vue'
import MoveInfoList from '@/views/DepartmentProjectQuery/ReleaseAndRecycleAudit/components/MoveInfoList.vue'
export default {
  name: 'ProjectBudegtDetail',
  components: {
    BudgetDetailHeader,
    AttachmentList,
    MoveInfoList
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
      tableData: []
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    releaseBudget() {},

    summaryMethod() {}
  }
}
</script>
<style lang="scss" scoped>
.dialogFixedTop {
  ::v-deep.el-dialog__body {
    .fw-dialog-body {
      height: 100%;
    }
  }
}
.project-budget_adjust {
  height: 100%;
  display: flex;
  flex-direction: column;
  h3 {
    text-align: center;
    margin-top: 10px;
    border-bottom: 1px solid #e4e7ed;
    line-height: 40px;
  }
}
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
.project-budget_adjust-bottom {
  border-top: 1px solid #e4e7ed;
  margin-top: 20px;
}
.el-form {
  .el-form-item {
    margin-bottom: 0 !important;
  }
}
.detail-font {
  font-size: 13px;
  line-height: 33px;
  margin-right: 40px;
}
.adjust-info_content {
  height: 100%;
  display: flex;
  flex-direction: column;
  & > p {
    height: 2px;
    background-color: #55a0eb;
    margin: 10px 0;
  }
}
</style>
