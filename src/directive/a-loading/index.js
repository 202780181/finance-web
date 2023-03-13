import loading from "@/directive/a-loading/loading";

const install = (Vue) => {
  Vue.directive('a-loading', loading)
}


if(window.Vue) {
  window['a-loading'] = loading
  Vue.use(install);
}

loading.install = loading

export default loading


