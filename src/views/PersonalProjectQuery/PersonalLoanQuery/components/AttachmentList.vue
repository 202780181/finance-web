<template>
  <el-form :model="tableForm" style="height:100%" ref="tableForm" :rules="rules" size="small">
    <div class="attachment-list_btn" v-if="!readonly">
      <el-button type="primary" icon="ibps-icon-add" @click="goAdd">新增</el-button>
      <el-button type="danger" icon="ibps-icon-remove" @click="goRemove">删除</el-button>
    </div>
    <el-table @selection-change="handleSelectionChange" :data="tableForm.tableData" border tooltip-effect="dark" height="100%">
      <el-table-column v-if="!readonly" type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="序号" align="center" width="50">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="* 附件类型" prop="fileType" align="center" min-width="150">
        <template slot-scope="scope">
          <el-form-item style="margin-top:10px;" :prop="'tableData.' + scope.$index + '.fileType'" :rules="rules.fileType" v-if="!readonly">
            <el-select style="width:100%" v-model="scope.row.fileType" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column label="附件名称" prop="name" align="center" min-width="200">
        <template slot-scope="scope">
          <el-button v-if="!readonly" type="primary" @click="goFile(scope.row)">选择文件</el-button>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" align="center" min-width="200">
        <template slot-scope="scope">
          <el-input v-if="!readonly" v-model.trim="scope.row.remark" placeholder="请输入"></el-input>
          <span v-else></span>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>
<script>
export default {
  name: 'AttachmentList',
  props: {
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableForm: {
        tableData: []
      },
      options: [
        {
          value: '1',
          label: '01-政策依据'
        },
        {
          value: '2',
          label: '02-资金需求'
        },
        {
          value: '3',
          label: '03-立项论证情况'
        },
        {
          value: '4',
          label: '04-其他资料'
        }
      ],
      selection: [],
      rules: {
        fileType: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'change'
          }
        ]
      }
    }
  },

  methods: {
    // 新增
    goAdd() {
      this.tableForm.tableData.push({
        fileType: '',
        name: '',
        remark: ''
      })
    },

    // 选择文件
    goFile() {},

    // 删除
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
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  display: flex;
  flex-direction: column;
  .attachment-list_btn {
    margin-bottom: 10px;
    .el-button {
      margin-right: 10px;
    }
  }
}
</style>