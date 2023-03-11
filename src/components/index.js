import Vue from 'vue'

// 注意 有些组件使用异步加载会有影响
Vue.component('mars-crud-local', () => import('./mars-crud/index.vue'))
Vue.component('mars-toolbar-local', () => import('./mars-toolbar/index.vue'))
