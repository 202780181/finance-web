<template>
  <mars-dialog :fullscreen="false" :modal="true" :modal-append-to-body="false" title="填写意见" v-if="visible" @close="closeDialog">
    <el-form :model="formData" label-width="120px" ref="form" :rules="rules" size="small">
      <el-form-item label="常用语：">
        <el-select v-model="formData.cyy" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="意见：" prop="remark">
        <el-input type="textarea" :rows="5" placeholder="请输入" v-model.trim="formData.remark" />
      </el-form-item>
    </el-form>
    <template slot="ms-foot">
      <el-button type="primary" icon="ibps-icon-save" @click="saveConfim">
        <span style="padding-left:5px;">确 定</span>
      </el-button>
      <el-button @click="closeDialog" icon="el-icon-circle-close">取 消</el-button>
    </template>
  </mars-dialog>
</template>
<script>
export default {
  name: 'CallBackInfoDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        cyy: '', //常用语
        remark: '' //意见
      },
      rules: {
        remark: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      options: []
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    saveConfim() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('success', this.formData)
          this.closeDialog()
        }
      })
    }
  }
}
</script>