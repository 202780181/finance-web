<template>
  <el-form :model="formData" label-width="120px" style="height:100%" ref="tableForm" :rules="rules" size="small">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="下达回收批次号">
          <el-input v-model="formData.batchNo" v-if="!readonly" disabled :placeholder="projectCodes.length?'自动生成':''"></el-input>
          <div v-else class="detail-font">{{formData.batchNo}}</div>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="摘要" prop="remark">
          <el-input v-model.trim="formData.remark" placeholder="请输入" v-if="!readonly"></el-input>
          <div v-else class="detail-font">{{formData.remark}}</div>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态">
          <div class="detail-font">{{{Draft:'草稿',Reviewing:'复核中',Return:'被退回',Finish:'已完成'}[formData.state] || '--'}}</div>
        </el-form-item>
      </el-col>
      <el-col :span="24" class="batch-info_list-btn" v-if="!readonly">
        <el-button type="primary" icon="ibps-icon-add" @click="goAdd">新增</el-button>
        <el-button type="danger" icon="ibps-icon-remove" @click="goRemove">删除</el-button>
        <el-button type="primary" @click="batchSetEd">批量设置下达额度</el-button>
      </el-col>
    </el-row>

    <el-table
      @selection-change="handleSelectionChange"
      :data="formData.items"
      border
      tooltip-effect="dark"
      height="100%"
      :summary-method="summaryMethod"
      show-summary
    >
      <el-table-column v-if="!readonly" type="selection" width="55" align="center" fixed="left"></el-table-column>
      <el-table-column label="序号" fixed="left" align="center" width="50">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行项目编号" show-overflow-tooltip fixed="left" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{scope.row.project.code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" show-overflow-tooltip align="center" min-width="120" fixed="left">
        <template slot-scope="scope">
          <span>{{scope.row.project.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="预算项目" align="center" min-width="170" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.budgetProject.code}} {{scope.row.budgetProject.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="年度预算金额" prop="initAmount" show-overflow-tooltip align="right" min-width="140">
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.initAmount))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上年结转额度" show-overflow-tooltip align="right" min-width="140">
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.lastAmount))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="本年累计下达额度" prop="in" show-overflow-tooltip align="right" min-width="140">
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.in))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="可下达额度" show-overflow-tooltip align="right" min-width="140">
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.canUse))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="支出金额" show-overflow-tooltip align="right" min-width="140">
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.out))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目余额" show-overflow-tooltip align="right" min-width="140">
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.balance))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="冻结金额" show-overflow-tooltip align="right" min-width="140">
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.frozen))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="可用余额" show-overflow-tooltip align="right" min-width="140">
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.canUseBalance))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="* 本次下达额度" prop="amount" align="center" min-width="150">
        <template slot-scope="scope">
          <el-form-item
            class="table-form_item"
            style="margin-top:10px;"
            :prop="'items.' + scope.$index + '.amount'"
            :rules="rules.amount"
            v-if="!readonly"
          >
            <el-input-number :controls="false" v-model="scope.row.amount" :precision="2" :step="0.1" :min="0" placeholder="请输入"></el-input-number>
          </el-form-item>
          <span v-else>￥{{myUtil.thsm(Number(scope.row.amount))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="下达后本年累计下达额度" align="right" show-overflow-tooltip min-width="180">
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.amount)+Number(scope.row.in))}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <ProjectChoiceDialog :visible="projectVisible" v-if="projectVisible" @close="()=>{projectVisible=false}" @success="callBackProject" />
    <!-- 批量设置下达额度 -->
    <BatchSetReleaseQuota
      :visible="batchSetVisible"
      v-if="batchSetVisible"
      @close="()=>{batchSetVisible=false}"
      @success="releaseQuotaData"
    />
  </el-form>
</template>
<script>
import ProjectChoiceDialog from '@/components/projectItemDialog/ProjectChoiceDialog.vue'
import myUtil from '@/utils/myUtil.js'
import BatchSetReleaseQuota from './BatchSetReleaseQuota.vue'
import yyAtool from '@/utils/aTool.js'
import _clonedeep from 'lodash.clonedeep'
import { AddByQueryProject_eXNKvKzWqi } from '@/api/getBatchData'
export default {
  name: 'BatchInfoList',
  components: { ProjectChoiceDialog, BatchSetReleaseQuota },
  props: {
    formData: {
      type: Object,
      default() {
        return {
          batchNo: '', //批次号
          remark: '', //摘要
          state: '', //状态
          items: [] //下达回收明细
        }
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    //执行项目编号列表
    projectCodes: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      myUtil,
      projectVisible: false,
      batchSetVisible: false,
      rules: {
        remark: [{ required: true, message: '请输入', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      selection: []
    }
  },
  created() {
    if (this.projectCodes.length) {
      this.getProjectList(this.projectCodes)
    }
  },
  methods: {
    goAdd() {
      this.projectVisible = true
    },

    //根据项目编号，获取返回列表数据
    getProjectList(arr) {
      let params = {
        projectCode: arr
      }
      AddByQueryProject_eXNKvKzWqi(params).then(res => {
        if (this.formData.items.length) {
          let arr = res.data.filter(f => this.formData.items.every(item => item.project.code !== f.project.code))
          this.formData.items.push(...arr)
        } else {
          this.formData.items.push(...res.data)
        }
      })
    },

    callBackProject(data) {
      if (data.length) {
        this.getProjectList(data.map(item => item.code))
      }
    },

    //合计
    summaryMethod(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '合计'
          return
        }
        if (index === 2) {
          sums[index] = this.formData.items.length
          return
        }
        if (column.property === 'initAmount' || column.property === 'in') {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] = ''
          }
          sums[index] = '￥' + myUtil.thsm(Number(sums[index]))
        }
      })
      return sums
    },

    goRemove() {
      if (!this.selection.length) {
        return this.$message.warning('请选择记录！')
      }
      this.$confirm('确定删除选中数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let arr = []
          this.formData.items.forEach(item => {
            if (this.selection.every(f => f.project.code !== item.project.code)) {
              arr.push(item)
            }
          })
          this.formData.items = _clonedeep(arr)
        })
        .catch(() => {})
    },
    // 批量设置下达额度
    batchSetEd() {
      this.batchSetVisible = true
    },

    handleSelectionChange(val) {
      this.selection = val
    },

    releaseQuotaData(type, amount) {
      if (!amount) return
      if (type === '1') {
        //按具体数值设置
        this.formData.items.forEach(item => {
          item.amount = amount
        })
      } else if (type === '2') {
        // 按可下达额度比例设置
        this.formData.items.forEach(item => {
          item.amount = yyAtool.accMul(Number(item.canUse), amount / 100)
        })
      } else if (type === '3') {
        // 按预算金额比例设置
        this.formData.items.forEach(item => {
          item.amount = yyAtool.accMul(Number(item.initAmount), amount / 100)
        })
      }
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
::v-deep .el-table tr {
  height: 40px;
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
::v-deep.el-table {
  .el-table__footer-wrapper {
    font-size: 13px;
  }
}
</style>
