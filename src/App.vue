<template>
  <div id="app">
    <component :is="layout" :customBoolean="customBoolean">
      <template v-slot:contentCustom v-if="customBoolean">
        <keep-alive>
          <cashier/>
        </keep-alive>
      </template>
    </component>
  </div>
</template>
<script>
import { Layout, Layout2, childLayout } from 'mars-ui-frame'
import cashier from './views/cashier/index.vue'
export default {
  name: 'app',
  data() {
    return {
      customBoolean: true
    }
  },
  components: {
    Layout: Layout,
    withoutAsideLayout: Layout2,
    childLayout: childLayout,
    cashier
  },
  computed: {
    layout() {
      if (this.$route.path === '/') {
        return 'childLayout' // 2021.4.7+ 解决打开新窗口时，出现明显的 layout 切换过程的问题；
      } else {
        if (this.$route.meta.layout === 'oneLayerRouteLayout') {
          return 'Layout'
        } else if (this.$route.meta.layout === 'logoutLayout') {
          return 'childLayout'
        } else {
          return this.$route.meta.layout || 'Layout'
        }
      }
    }
  },
  watch: {
    $route: {
      handler(val) {
        if (val.path === '/cashier') {
          this.customBoolean = true
        } else {
          this.customBoolean = false
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/index.scss';
</style>
