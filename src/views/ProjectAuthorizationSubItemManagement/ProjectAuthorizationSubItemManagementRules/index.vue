<template>
  <mars-dialog
    v-loading="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    :fullscreen="true"
    class="dialogFixedTop"
    title="申报规则设置"
    :showClose="false"
  >
    <div>
      <el-form :model="formData" :rules="rules" ref="form" label-width="140px">
        <el-form-item label="规则编号" prop="name">
          <el-input v-model.trim="formData.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="规则名称" prop="name">
          <el-input v-model.trim="formData.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="规则类型" prop="name">
          <el-input v-model.trim="formData.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="预算调整工作流" prop="name">
          <el-input v-model.trim="formData.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="预算调剂工作流" prop="name">
          <el-input v-model.trim="formData.name" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template slot="ms-foot">
      <el-button type="primary" icon="ibps-icon-save" @click="confirm">&nbsp;&nbsp;保 存</el-button>
    </template>
  </mars-dialog>
</template>
<script>
export default {
  name: 'ProjectAuthorizationSubItemManagementRules',
  data() {
    return {
      loading: false,
      rules: {},
      formData: {
        name: ''
      }
    }
  },
  methods: {
    confirm() {}
  }
}
</script>