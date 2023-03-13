import Vue from 'vue';
import loadingVue from './loading.vue'

const LoadingConstructor = Vue.extend(loadingVue);

const toggleLoading = (el, binding) => {
  if (binding.value) {
    Vue.nextTick(() => {
      htmlElEach(el, 'none')
      el.instance.visible = true
      insertDom(el, el, binding)
    })
  } else {
    el.instance.visible = false
    htmlElEach(el, '')
  }
}
const htmlElEach = (el, value)=> {
  if(!el.children) return;
  let htmlCollList = el.children
  const mapList = Array.from(htmlCollList)
  mapList.forEach(item => {
    item.style.display = value
  })
}

const insertDom = (target, el) => {
  target.appendChild(el.loading)
}
export default {
  bind(el, binding, vnode) {
    const loading = new LoadingConstructor({
      el: document.createElement('div'),
      data() {
      }
    })

    el.instance = loading
    el.loading = loading.$el
    binding.value && toggleLoading(el, binding)
  },
  update(el, binding) {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding)
    }
  },
  unbind(el, binding) {
    el.instance && el.instance.$destroy()
  }
}
