import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/defines' //  引入 defines
import Print from 'vue-print-nb';
import TDesign from 'tdesign-vue';
Vue.use(TDesign);
Vue.use(Print);
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        // 展示系统信息
        this.$store.commit('ibps/releases/versionShow')
        // 检查最新版本
        this.$store.dispatch('ibps/releases/checkUpdate')
        // 获取并记录用户 UA
        this.$store.commit('ibps/ua/get')
        // 初始化全屏监听
        this.$store.dispatch('ibps/fullscreen/listen')
        // 设置系统主题色
        this.$store.dispatch('ibps/theme/load')
        // 【特殊处理】设置子系统信息
        this.$store.dispatch('ibps/system/set', {
            id: 'xxxx',
            name: WIN_GLOBAL.SYSNAME ? WIN_GLOBAL.SYSNAME.CHINESE_NAME : this.$setting.program.loginPartChineseName,
            enName: WIN_GLOBAL.SYSNAME ? WIN_GLOBAL.SYSNAME.ENGLISH_NAME : this.$setting.program.platformEnglishName
        })
    }
}).$mount('#app')
