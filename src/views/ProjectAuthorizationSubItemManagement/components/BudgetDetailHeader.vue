<template>
  <div>
    <el-form label-width="130px">
      <el-row :gutter="20" v-if="moreVisible">
        <el-col :span="8">
          <el-form-item label="预算项目编号：">
            <span class="form-span">11-180000</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称：">
            <span class="form-span">财务处办公费</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目负责人：">
            <span class="form-span">张三</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预算项目类别：">
            <span class="form-span">张三</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属单位：">
            <span class="form-span">张三</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="存续状态：">
            <span class="form-span">张三</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="2021年预算金额：">
            <span class="form-span">张三</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="2021年执行金额：">
            <span class="form-span">张三</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="2021年执行率：">
            <span class="form-span">张三</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="2022年预算金额：">
            <span class="form-span">张三</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="2022年执行金额：">
            <span class="form-span">张三</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="2022年执行率：">
            <span class="form-span">张三</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-else>
        <el-col :span="8">
          <el-form-item label="项目编号：">
            <span class="form-span">11-180000</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称：">
            <span class="form-span">财务处办公费</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目级别：">
            <span class="form-span">张三</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align:right">
      <el-button type="text" @click="goMore">
        查看更多
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <el-divider class="space-divider">
      <el-button type="text" @click="goDivider">
        {{moreVisible?'收起':'更多详情'}}
        <i :class="moreVisible?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
      </el-button>
    </el-divider>
    <!-- 查看更多 -->
    <ProjectInfoDialog :visible="projectVisible" v-if="projectVisible" @close="()=>{projectVisible=false}" />
  </div>
</template>
<script>
import ProjectInfoDialog from './ProjectInfoDialog.vue'
export default {
  name: 'BudgetDetailHeader',
  components: {
    ProjectInfoDialog
  },
  data() {
    return {
      moreVisible: true,
      projectVisible: false
    }
  },
  methods: {
    goMore() {
      this.projectVisible = true
    },

    goDivider() {
      this.moreVisible = !this.moreVisible
    }
  }
}
</script>
<style lang="scss" scoped>
.space-divider {
  margin: 0;
}
.form-span {
  line-height: 33px;
  display: block;
  font-size: 13px;
}
.el-form .el-form-item {
  margin-bottom: 0 !important;
}
</style>