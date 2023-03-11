<template>
  <div v-if="visible">
    <mars-dialog
      v-if="visible"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      :fullscreen="true"
      class="dialogFixedTop"
      :title="title"
      @close="closeDialog"
    >
      <ProjectEditForm ref="ProjectEditForm" :projectCode="projectCodeNew" @loading="callBackLoading" />
      <template slot="ms-foot">
        <el-button type="primary" @click="goLast" :disabled="index===0?true:false">上一个</el-button>
        <el-button type="primary" @click="goNext" :disabled="index===leg?true:false">下一个</el-button>
        <el-button icon="ibps-icon-save" type="primary" @click="submit">
          <span style="padding-left:5px;">保 存</span>
        </el-button>
        <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
      </template>
    </mars-dialog>
  </div>
</template>
<script>
import ProjectEditForm from './ProjectEditForm.vue'
import { SaveProject_LdCz7Cv7re } from '@/api/getBatchData'
export default {
  name: 'ProjectEditPage',
  components: {
    ProjectEditForm
  },
  props: {
    title: {
      type: String,
      default: '立项项目编辑'
    },
    projectCode: {
      //项目号
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    batchList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      index: 0,
      leg: 0,
      projectCodeNew: '',
      loading: false
    }
  },
  created() {
    this.projectCodeNew = this.projectCode
    this.leg = this.batchList.length - 1
    this.batchList.forEach((f, idx) => {
      if (f === this.projectCode) {
        this.index = idx
      }
    })
  },
  methods: {
    callBackLoading(boolean) {
      this.loading = boolean
    },
    closeDialog() {
      this.$emit('close')
      this.$emit('success')
    },
    //上一个
    goLast() {
      this.index = this.index - 1
      this.projectCodeNew = this.batchList[this.index]
    },
    // 下一个
    goNext() {
      this.index = this.index + 1
      this.projectCodeNew = this.batchList[this.index]
    },

    // 保存
    submit() {
      if (this.$refs.ProjectEditForm.validate()) {
        let params = { ...this.$refs.ProjectEditForm.formData, directors: [this.$refs.ProjectEditForm.formData.directorsNew] }
        delete params.directorsNew
        this.callBackLoading(true)
        SaveProject_LdCz7Cv7re({ project: params })
          .then(res => {
            this.$message.success('保存成功！')
            this.callBackLoading(false)
          })
          .catch(() => {
            this.callBackLoading(false)
          })
      } else {
        this.$refs.ProjectEditForm.scroll()
      }
    }
  }
}
</script>