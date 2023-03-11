<template>
  <div class="project-info_tabs">
    <el-radio-group v-model="activeName">
      <el-radio-button label="1">基本信息</el-radio-button>
      <el-radio-button label="2">年度资金计划</el-radio-button>
      <el-radio-button label="3">招标采购预算</el-radio-button>
      <el-radio-button label="4">新增资产预算</el-radio-button>
      <el-radio-button label="5">绩效目标</el-radio-button>
      <el-radio-button label="6">附件</el-radio-button>
    </el-radio-group>
    <div class="project-info_tabs-content">
      <template v-if="activeName==='1'">
        <el-form :model="formData" label-width="160px" label-position="right">
          <div class="sub-title first-sub-title">基本信息</div>
          <el-row :gutter="20" style="margin:0">
            <el-col :span="8">
              <el-form-item label="项目编号：">
                <span class="project-info_tabs-detail">项目编号</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目级别："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目状态："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目名称："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="01-一级项目："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属单位："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职能部门："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目负责人："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人手机："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预算项目类别："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目申报人："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申报人手机："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目起始年度："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目终止年度："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="存续状态："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否科研项目："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目总金额（元）："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="起始年度金额（元）："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目入库日期："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目申报日期："></el-form-item>
            </el-col>
          </el-row>
          <div class="sub-title first-sub-title">管理信息</div>
          <el-row :gutter="20" style="margin:0">
            <el-col :span="8">
              <el-form-item label="预算编制模式：">
                <span class="project-info_tabs-detail">项目编号</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="支出功能类别："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="额度模式："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="优先级："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="对应核算项目："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分类属性1："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分类属性2："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分类属性3："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分类属性4："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分类属性5："></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分类属性6："></el-form-item>
            </el-col>
          </el-row>
          <div class="sub-title first-sub-title">其他信息</div>
          <el-row :gutter="20" style="margin:0">
            <el-col :span="24">
              <el-form-item label="项目概述：">
                <span class="project-info_tabs-detail">项目编号</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="立项依据："></el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="测算依据："></el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="项目必要性："></el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="项目可行性："></el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="项目实施方案："></el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="项目预期效果："></el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template v-if="activeName==='3'">
        <el-table
          ref="multipleTable"
          :summary-method="getSummaries"
          show-summary
          height="100%"
          tooltip-effect="dark"
          :data="tableData"
          border
        >
          <el-table-column type="index" label="序号" align="center" fixed="left" width="50"></el-table-column>
          <el-table-column prop="code" align="center" fixed="left" label="采购方式" min-width="120" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="采购项目" min-width="120" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="采购品目" min-width="120" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="经济分类" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="采购需求概括" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="预计采购时间" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="预算金额（元）" min-width="150" show-overflow-tooltip />
        </el-table>
      </template>
      <template v-if="activeName==='4'">
        <el-table
          ref="multipleTable"
          :summary-method="getSummaries"
          show-summary
          height="100%"
          tooltip-effect="dark"
          :data="tableData"
          border
        >
          <el-table-column type="index" label="序号" align="center" fixed="left" width="50"></el-table-column>
          <el-table-column prop="code" align="center" fixed="left" label="资产分类" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="资产名称" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="参考型号" min-width="120" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="参考品牌" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="单价（元）" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="数量" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="总金额（元）" min-width="150" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="备注" min-width="150" show-overflow-tooltip />
        </el-table>
      </template>

      <template v-if="activeName==='5'">
        <div class="performance-objective">
          <div class="performance-objective_card">
            <ul>
              <li>
                <el-card shadow="never">
                  <h3>实施周期绩效目标</h3>
                  <div class="el-card_div-content"></div>
                </el-card>
              </li>
              <li>
                <el-card shadow="never">
                  <h3>年度绩效目标</h3>
                  <div class="el-card_div-content"></div>
                </el-card>
              </li>
            </ul>
          </div>
          <div class="performance-objective_table">
            <p>绩效指标</p>
            <el-table ref="multipleTable" height="100%" tooltip-effect="dark" :data="tableData" border>
              <el-table-column type="index" label="序号" align="center" fixed="left" width="50"></el-table-column>
              <el-table-column prop="code" align="center" label="一级指标" fixed="left" min-width="120" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="二级指标" min-width="120" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="三级指标" min-width="120" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="指标方向" min-width="100" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="实施周期目标值" min-width="140" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="年度目标值" min-width="110" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="计量单位" min-width="100" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="备注" min-width="140" show-overflow-tooltip />
              <el-table-column prop="code" align="center" label="分值（权重）" min-width="130" show-overflow-tooltip />
            </el-table>
          </div>
        </div>
      </template>
      <template v-if="activeName==='6'">
        <el-table ref="multipleTable" height="100%" tooltip-effect="dark" :data="tableData" border>
          <el-table-column type="index" label="序号" align="center" fixed="left" width="50"></el-table-column>
          <el-table-column prop="code" align="center" label="附件类型" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="附件名称" min-width="140" show-overflow-tooltip />
          <el-table-column prop="code" align="center" label="备注" min-width="120" show-overflow-tooltip />
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProjectInfoTabs',
  data() {
    return {
      activeName: '1',
      formData: {},
      tableData: [] //招标采购预算
    }
  },
  methods: {
    getSummaries() {}
  }
}
</script>
<style lang="scss" scoped>
.project-info_tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  .project-info_tabs-content {
    margin-top: 10px;
    flex: 1;
    overflow-y: auto;
  }
}
::v-deep .el-table tr {
  height: 40px;
}
.sub-title {
  font-weight: bold;
  font-size: 16px;
  padding: 12px 0 12px 20px;
  margin-bottom: 10px;
  background-color: #f0f7ff;
  &.first-sub-title {
    border-top: none;
    padding-top: 10px;
  }
}
.project-info_tabs-detail {
  font-size: 13px;
}
.performance-objective {
  display: flex;
  height: 100%;
  flex-direction: column;
  .performance-objective_card {
    ul {
      display: flex;
      li {
        width: 50%;
        ::v-deep .el-card {
          .el-card__body {
            padding: 0;
          }
          .el-card_div-content {
            height: 200px;
            overflow-y: auto;
          }
        }
        h3 {
          width: 100%;
          height: 50px;
          line-height: 50px;
          background-color: #f5f5f6;
          text-align: center;
        }
      }
    }
  }
  .performance-objective_table {
    flex: 1;
    display: flex;
    flex-direction: column;
    & > p {
      margin: 10px 0 10px 10px;
      font-weight: 600;
    }
    .el-table {
      flex: 1;
    }
  }
}
</style>
