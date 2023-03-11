<template>
  <!-- 批量设置下达额度 -->
  <mars-dialog
    :fullscreen="false"
    class="choice-dialog"
    :modal="true"
    :modal-append-to-body="false"
    title="批量设置下达额度"
    v-if="visible"
    @close="closeDialog"
  >
    <div>
      <div>
        <el-radio v-model="radio" label="1">按具体数值设置</el-radio>
        <div class="release-quota">
          <p>下达额度（元）</p>
          <el-input-number :controls="false" v-model="amount1" :precision="2" :step="0.1" :min="0" placeholder="请输入"></el-input-number>
        </div>
      </div>
      <div>
        <el-radio v-model="radio" label="2">按可下达额度比例设置</el-radio>
        <div class="release-quota">
          <p>下达额度为可下达额度的</p>
          <el-input-number :controls="false" v-model="amount2" :precision="2" :step="0.1" :min="0" placeholder="请输入"></el-input-number>%
        </div>
      </div>
      <div>
        <el-radio v-model="radio" label="3">按预算金额比例设置</el-radio>
        <div class="release-quota">
          <p>下达额度为年度预算金额的</p>
          <el-input-number :controls="false" v-model="amount3" :precision="2" :step="0.1" :min="0" placeholder="请输入"></el-input-number>%
        </div>
      </div>
    </div>
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
  name: 'BatchSetReleaseQuota',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      radio: '',
      amount1: undefined,
      amount2: undefined,
      amount3: undefined
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    // 确定
    saveConfim() {
      this.$emit('success', this.radio, this['amount' + this.radio])
      this.closeDialog()
    }
  }
}
</script>
<style lang="scss" scoped>
.release-quota {
  display: flex;
  align-items: center;
  margin: 10px 0 30px 0;
  .el-input-number {
    margin: 0 10px;
  }
}
</style>