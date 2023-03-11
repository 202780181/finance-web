<template>
  <div v-if="visible">
    <mars-dialog
      v-if="visible"
      :modal-append-to-body="false"
      :fullscreen="true"
      class="dialogFixedTop"
      :title="title"
      @close="closeDialog"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
    >
      <ProjectEditForm :readonly="true" :projectCode="projectCode" @loading="callBackLoading" />
      <template slot="ms-foot">
        <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
      </template>
    </mars-dialog>
  </div>
</template>
<script>
import ProjectEditForm from './ProjectEditForm.vue'
export default {
  name: 'ProjectDetailPage',
  components: {
    ProjectEditForm
  },
  props: {
    title: {
      type: String,
      default: '立项项目详情'
    },

    projectCode: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },

  methods: {
    callBackLoading(boolean) {
      this.loading = boolean
    },
    closeDialog() {
      this.$emit('close')
    }
  }
}
</script>