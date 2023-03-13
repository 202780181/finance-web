import Vue from "vue";

/**
 * @description 隐藏顶部header 头
 */
export const hiddenHeader = ()=> {
  Vue.nextTick(()=> {
    const header = document.querySelector('.ibps-theme-header')
    if(header) {
      header.style.display = 'none'
    }
  })
}
