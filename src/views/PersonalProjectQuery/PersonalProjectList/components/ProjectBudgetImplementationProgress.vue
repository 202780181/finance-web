<template>
  <el-row class="panel-show">
    <el-collapse v-model="activeNames" @change="handleChange" style="border-top: 0px !important;">
      <el-collapse-item v-for="(config,index) in Fconfigs" :key="index" :title="config.name" :name="config.prop">
        <!-- <base-info v-if="config.prop==='baseInfo'" :model="itemData[config.prop]"></base-info>
        <use-setting v-if="config.prop==='useSet'" :model="itemData[config.prop]" :step-current="stepCurrent"></use-setting>
        <pay-type v-if="config.prop==='chargeWay'" :model="itemData[config.prop]"></pay-type>
        <money-setting v-if="config.prop==='acountRule'" :model="itemData[config.prop]"></money-setting>
        <ticket-setting v-if="config.prop==='useTicket'" :model="itemData[config.prop]"></ticket-setting>
        <echarge-param v-if="config.prop==='accountParam'" :model="itemData[config.prop]"></echarge-param>
        <settle-param v-if="config.prop==='settleParam'" :model="itemData[config.prop]"></settle-param>
        <files v-if="config.prop==='applyBasis'" :model="itemData[config.prop]"></files> -->
        <!-- <budget-process
          v-if="config.prop==='budgetProgress'"
          style="height: 550px;width: 700px;margin-left: 30px;"
        ></budget-process> -->
        <!-- <auths v-if="config.prop==='auths'" :model="itemData[config.prop]"></auths> -->
      </el-collapse-item>
    </el-collapse>
  </el-row>
</template>
<script>
// import baseInfo from './comps/base-info'
// import useSetting from './comps/use-setting'
// import payType from './comps/pay-type'
// import moneySetting from './comps/money-rule/index'
// import ticketSetting from './comps/ticket-setting/'
// import echargeParam from './comps/echarge-param/'
// import settleParam from './comps/settle-param/'
// import auths from './comps/auths'
// import files from './comps/upload-file/'
// import budgetProgress from './comps/budget-process/index'

export default {
  name: 'itemPanel',
  components: {
    // baseInfo,
    // useSetting,
    // payType,
    // moneySetting,
    // ticketSetting,
    // budgetProgress,
    // echargeParam,
    // settleParam,
    // auths,
    // files
  },
  props: {
    itemData: {
      type: Object
    }
  },
  data() {
    return {
      configs: [
        // { name: '  基础信息', prop: 'baseInfo' },
        // { name: '  使用设定', prop: 'useSet' },
        // { name: '  可用交费方式', prop: 'chargeWay' },
        // { name: '  计费规则', prop: 'acountRule' },
        // { name: '  使用票据', prop: 'useTicket', necessaryKey: 'ticketTypeId' },
        // {name: '  入账参数', prop: 'accountParam'},
        // {name: '  结算参数', prop: 'settleParam'},
        // { name: '  项目权限', prop: 'auths' },
        // { name: '  附件', prop: 'applyBasis' },
        { name: '项目预算执行进度', prop: 'budgetProgress'}
      ],
      activeNames: [],
      // 当前的步骤
      stepCurrent: null
    }
  },
  computed: {
    Fconfigs() {
      return this.configs
      //   return this.configs.filter(config => {
      //     return this.exists(config)
      //   })
    }
  },
  methods: {
    // exists(config) {
    //   if (!config.unCheck) {
    //     if (config.prop == 'useSet') {
    //       return this.itemData['useSet'].activePayEnabled || this.itemData['useSet'].nonIdentityEnabled
    //     }
    //     let itemData = this.itemData
    //     let f = itemData[config.prop] && JSON.stringify(itemData[config.prop]) !== '{}'
    //     let f2 = !config.arrKey || itemData[config.prop][config.arrKey].length > 0
    //     let f3 = !config.necessaryKey || itemData[config.prop][config.necessaryKey]
    //     return f && f2 && f3
    //   }
    //   return true
    // },
    handleChange() {},
    auditProcessLoaded(data) {
    //   if (data && data.length) {
    //     this.stepCurrent = data[data.length - 1].stepCurrent
    //   }
    }
  },
  created() {
    this.activeNames = this.configs.map((x, index) => x.prop)
  }
}
</script>

<style lang="scss">
.panel-show {
  height: 100%;
  .el-form-item__label {
    padding-top: 0 !important;
  }
}

.pane-form-item {
  min-width: 250px;
  margin-right: 30px;
  margin-left: 20px;
  margin-bottom: 0px !important;
}
</style>
