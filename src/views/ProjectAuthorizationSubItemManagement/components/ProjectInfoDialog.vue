<template>
  <mars-dialog
    :fullscreen="false"
    class="choice-dialog"
    :modal="true"
    :modal-append-to-body="false"
    title="信息运维项目"
    v-if="visible"
    @close="closeDialog"
  >
    <template slot="ms-foot">
      <el-button @click="closeDialog" icon="el-icon-circle-close">关 闭</el-button>
    </template>
  </mars-dialog>
</template>
<script>
export default {
  name: 'ProjectInfoDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    }
  }
}
</script>