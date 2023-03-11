<template>
  <ibps-container type="full" class="page">
    <!-- 项目余额结转 -->
    <div class="project-balance_list">
      <div class="dropdown-div">
        <el-dropdown @command="handleCommandJz" trigger="click">
          <el-tooltip placement="bottom-start" effect="light">
            <div slot="content" class="content-btn">
              <p>（1）必须已经生成下个执行年度方可进行结转；</p>
              <p>（2）结转后如果因核算系统调账导致执行数据发生变化，请先进行结转前回收，然后再次点击结转按钮更新结转数据；</p>
              <p>（3）该结转功能不处理项目的费用预算，资金来源额度，资金来源经济分类额度的结转。</p>
            </div>
            <el-button type="primary">
              结转
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </el-tooltip>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">未生成执行年度</el-dropdown-item>
            <el-dropdown-item command="2">结转确认</el-dropdown-item>
            <el-dropdown-item command="3">正在结转</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleCommandJy" trigger="click">
          <el-tooltip placement="bottom-start" effect="light">
            <div slot="content" class="content-btn">
              <p>（1）用于检查有没有项目余额≠0。</p>
            </div>
            <el-button type="primary">
              校验
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </el-tooltip>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">项目数据正常</el-dropdown-item>
            <el-dropdown-item command="2">项目数据异常</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
        tooltip-effect="dark"
        height="100%"
        :tree-props="{children: 'children'}"
      >
        <el-table-column label="预算支出项及部门" prop="date" align="center" min-width="140" />
        <el-table-column label="结转项目数" prop="name" align="center" min-width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="goDetail(scope.row)">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="结转下年额度(元)" prop="address" align="center" min-width="140">
          <template slot-scope="scope">
            <el-button type="text" @click="goDetail(scope.row)">{{scope.row.address}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 明细 -->
    <BudgetDetailDialog v-if="budgetVisible" :visible="budgetVisible" @close="()=>{budgetVisible=false}" />
  </ibps-container>
</template>
<script>
import BudgetDetailDialog from './BudgetDetailDialog.vue'
export default {
  name: 'ProjectBalanceCarryForward',
  components: {
    BudgetDetailDialog
  },
  data() {
    return {
      budgetVisible: false,
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 3,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  methods: {
    handleCommandJz(val) {
      if (val === '1') {
        //未生成执行年度
        this.$confirm('下个执行年度未生成，请前往执行年度设置生成下个执行年度再发起结转！', '提示', {
          cancelButtonText: '关闭',
          type: 'warning',
          showConfirmButton: false
        })
          .then(() => {})
          .catch(() => {})
      } else if (val === '2') {
        //结转确认
        this.$confirm('将发起项目余额结转，请确认！', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '启动结转',
          type: 'warning'
        })
          .then(() => {})
          .catch(() => {})
      } else {
        //正在结转
        this.$confirm('上一结转操作后台处理中，无法再发起结转！', '提示', {
          cancelButtonText: '关闭',
          type: 'warning',
          showConfirmButton: false
        })
          .then(() => {})
          .catch(() => {})
      }
    },

    handleCommandJy(val) {
      if (val === '1') {
        this.$confirm('项目数据正常，无需更新！', '提示', {
          cancelButtonText: '关闭',
          type: 'warning',
          showConfirmButton: false
        })
          .then(() => {})
          .catch(() => {})
      } else {
        this.$confirm('存在部分项目的项目余额≠0，请先发起“结转前回收”，然后再次发起结转。', '提示', {
          cancelButtonText: '关闭',
          type: 'warning',
          showConfirmButton: false
        })
          .then(() => {})
          .catch(() => {})
      }
    },

    goDetail(row) {
      this.budgetVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.project-balance_list {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .dropdown-div {
    margin-bottom: 10px;
    .el-button {
      margin-right: 10px;
    }
  }
}
.content-btn {
  p {
    line-height: 24px;
  }
}
</style>