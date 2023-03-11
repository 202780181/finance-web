// 注册本地过滤器
import Vue from 'vue';
import * as filters from '@/filters';
Object.keys(filters).map(key => {
    Vue.filter(key, filters[key])
})
