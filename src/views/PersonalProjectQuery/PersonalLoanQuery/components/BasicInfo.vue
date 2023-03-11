<template>
  <!-- 基本情况-->
  <el-form :model="formData" label-width="120px" style="height:100%" ref="tableForm" :rules="rules" size="small">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="会计年度">
          <el-select v-model="selectValue" placeholder="请选择会计年度">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="8">
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
      </el-form-item>-->
      <!-- </el-col> -->
      <!-- <el-col :span="24" class="batch-info_list-btn" v-if="!readonly">
        <el-button type="primary" icon="ibps-icon-add" @click="goAdd">新增</el-button>
        <el-button type="danger" icon="ibps-icon-remove" @click="goRemove">删除</el-button>
        <el-button type="primary" @click="batchSetEd">批量设置下达额度</el-button>
      </el-col>-->
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="项目主负责人：">
          <div class="detail-font">{{formData.voucher?formData.voucher.zdrmc || '--':'--'}}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="审核要求：">
          <div class="detail-font">{{formData.reviewPerson?formData.reviewPerson.name || '--':'--'}}</div>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="其他负责人：">
          <div class="detail-font">{{formData.voucher?formData.voucher.zdrmc || '--':'--'}}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="项目类别：">
          <div class="detail-font">{{formData.reviewPerson?formData.reviewPerson.name || '--':'--'}}</div>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="所在部门：">
          <div class="detail-font">{{formData.voucher?formData.voucher.zdrmc || '--':'--'}}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="职能部门：">
          <div class="detail-font">{{formData.reviewPerson?formData.reviewPerson.name || '--':'--'}}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="立项日期：">
          <div class="detail-font">{{formData.voucher?formData.voucher.zdrmc || '--':'--'}}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="结项日期：">
          <div class="detail-font">{{formData.reviewPerson?formData.reviewPerson.name || '--':'--'}}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="所属课题：">
          <div class="detail-font">{{formData.voucher?formData.voucher.zdrmc || '--':'--'}}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="可用凭证类型：">
          <div class="detail-font">{{formData.reviewPerson?formData.reviewPerson.name || '--':'--'}}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="预算管理类型：">
          <div class="detail-font">{{formData.voucher?formData.voucher.zdrmc || '--':'--'}}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="功能分类：">
          <div class="detail-font">{{formData.reviewPerson?formData.reviewPerson.name || '--':'--'}}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="超支额度：">
          <div class="detail-font">{{formData.voucher?formData.voucher.zdrmc || '--':'--'}}</div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="授权情况：">
          <div class="detail-font">{{formData.reviewPerson?formData.reviewPerson.name || '--':'--'}}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="项目组成员：">
          <div class="detail-font">{{formData.voucher?formData.voucher.zdrmc || '--':'--'}}</div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label>
          <el-checkbox-group v-model="checkboxList">
            <el-checkbox v-for="item in checkList" :key="item.value" :label="item.label" disabled></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-table border tooltip-effect="dark" :data="tableData">
      <el-table-column label="会计年度" show-overflow-tooltip falign="center" min-width="120">
        <template slot-scope="scope">
          <span>{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="本年累计收入" show-overflow-tooltip align="center" min-width="120">
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.count1))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="本年累计支出" align="center" min-width="170" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.count2))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="本年借款变化额" prop="initAmount" show-overflow-tooltip align="right" min-width="140">
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.count3))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目余额" show-overflow-tooltip align="right" min-width="140">
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.count4))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="本年资金执行进度" prop="in" show-overflow-tooltip align="right" min-width="140">
        <template slot-scope="scope">
          <el-progress :text-inside="true" :stroke-width="26" status="warning" :percentage="scope.row.progress"></el-progress>
        </template>
      </el-table-column>
      <el-table-column label="借款余额" show-overflow-tooltip align="right" min-width="140">
        <template slot-scope="scope">
          <span>￥{{myUtil.thsm(Number(scope.row.count5))}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <!-- <ProjectChoiceDialog :visible="projectVisible" v-if="projectVisible" @close="()=>{projectVisible=false}" @success="callBackProject" /> -->
    <!-- 批量设置下达额度 -->
    <!-- <BatchSetReleaseQuota
      :visible="batchSetVisible"
      v-if="batchSetVisible"
      @close="()=>{batchSetVisible=false}"
      @success="releaseQuotaData"
    />-->
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
  name: 'BasicInfo',
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
      checkboxList: [],
      checkList: [
        {
          value: 1,
          label: '是否锁定'
        },
        {
          value: 2,
          label: '是否启用'
        },
        {
          value: 3,
          label: '是否国库项目'
        }
      ],
      options: [
        { value: '2022', label: '2022' },
        { value: '2021', label: '2021' },
        { value: '2020', label: '2020' },
        { value: '2019', label: '2019' },
        { value: '2018', label: '2018' },
        { value: '2017', label: '2017' },
        { value: '2016', label: '2016' }
      ],
      selectValue: '',
      selection: [],
      tableData: [
        {
          date: '2018年',
          count1: '100.00',
          count2: '0.00',
          count3: '6,000.00	',
          count4: '-5,900.00',
          progress: 60.0,
          count5: '6,000.00'
        },
        {
          date: '2019年',
          count1: '0.00',
          count2: '210.00',
          count3: '600.00	',
          count4: '500.00',
          progress: 66.94,
          count5: '600.00'
        },
        {
          date: '2020年',
          count1: '0.00',
          count2: '0.00',
          count3: '6,000.00	',
          count4: '900.00',
          progress: 0.0,
          count5: '100.00'
        },
        {
          date: '2021年',
          count1: '100.00',
          count2: '0.00',
          count3: '6,000.00	',
          count4: '900.00',
          progress: 61.3,
          count5: '1,000.00'
        }
      ]
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
