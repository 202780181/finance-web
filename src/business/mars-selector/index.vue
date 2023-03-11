<template>
  <div style="height: 32px;">
    <!-- 以下属性，可以根据需要再从原始参数中挪列进来，以便外界调用 -->
    <mars-select
      ref="mselect"
      v-model="selectedvalue"
      :defaultValue="defaultValue"
      :multiple="multiple"
      :itemWidth="itemWidth"
      :options="options"
      :normalizer="normalizer"
      :showCount="showCount"
      :placeholder="placeholder"
      :valueFormat="valueFormat"
      :loadOptions="loadOptions"
      @input="handleInput"
    >
    </mars-select>
  </div>
</template>

<script>
import MarsSelect from '@/components/mars-select'
// 引入字典获取数据的接口
// import sysDictManage from '@/api/sys/dict/manage'

export default {
  components: {
    MarsSelect
  },
  props: {
    code: {   // 字典的code或者
      type: String,
      default: ''
    },
    normalizer: {
      type: Function,
      default: (node) => {
        return {
          id: node.id,              // 定义id字段，可传进来覆盖
          label: node.name,         // 定义label字段，可传进来覆盖
          isDefaultExpanded: true   // 全展开，可传进来覆盖
        }
      }
    },
    src: {    // 自定义的可以作为下拉选择框中数据的 src 值
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    itemWidth: {
      type: Number,
      default: 200,
    },
    placeholder: {
      type: String,
      default: '请选择...'
    },
    showCount: {
      type: Boolean,
      default: false
    },
    valueFormat: {
      type: String,
      default: 'object'
    },
    loadOptions: {    // 3.27 新增。考虑到有些 crud 界面一打开，就要去加载数据，所以开放这个功能
      type: Function,
      default: null
    },
    defaultValue: {   // 2019.6.13 处理组件不能重置的问题
      type: [Object, Array, String, Number],
      default: () => {
      }
    }

  },
  data() {
    return {
      selectedvalue: [],
      options: null,
    }
  },
  methods: {
    /**
     * 1、通过key获取数据
     *    1.1、通过key获取字典数据
     *    1.2、通过自定义key匹配获取数据的接口路径，并自动带上特殊参数
     */
    // 1.1 通过key获取字典数据
    fetchDatasWhenDict(dic_code) {
      // sysDictManage.getDictItems({code: dic_code}).then(data=>{
      //     if(data.data.hasOwnProperty('rows')){
      //         this.options = data.data.rows
      //     }else{
      //         this.options = data.data
      //     }
      // })
    },

    // 待开发..
    // 1.2 通过自定义key(即 src 字段)直接获取业务数据
    fetchDatasWhenBussiness(src) {
      // src 进行路由处理

    },

    handleInput(val, id) {
      // 将值返回调用者
      // console.log('val：：：', val);
      this.$emit('input', val, id)
    },
  },
  created() {
    this.fetchDatasWhenDict(this.code)
  },

}
</script>

<style scoped>
</style>
