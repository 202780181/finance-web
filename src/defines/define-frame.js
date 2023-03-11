import Vue from 'vue'
import router, { asyncDevRouterMap } from '@/router'
import store from '@/store'
import uiFrame from 'mars-ui-frame/lib/mars-ui-frame.umd'
import setting from '@/setting'
import localZh from '@/i18n/zh'
import localEn from '@/i18n/en'

import { utilAuth } from 'mars-ui-frame'
if (process.env.NODE_ENV === 'development') {
    utilAuth.setToken('012345678')
}

const outsideMenus = []

Vue.use(uiFrame, {
    router,
    store,
    outsideMenus,
    _import: require('@/router/_import_' + process.env.NODE_ENV),  // 必传
    logoSrc: getLogoSrc() || '',
    env: process.env,
    dev_routes: asyncDevRouterMap,
    setting,
    i18n: {      // 传入本地的json，在库内，会被合并，本地的优先级更高
        zh: localZh,
        en: localEn,
    }
})

// 读取配置的logo图片
function getLogoSrc() {
    try {
        return require('/public/logo.png')
    } catch (error) {
        console.log('error')
    }
}
