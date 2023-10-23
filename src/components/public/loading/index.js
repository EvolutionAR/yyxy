import loadTemp from './Loading.vue'
let Load = {}

Load.install = (Vue, options) => {
  if (document.getElementsByClassName('.loading-wrap').length) return

  // 创建一个VUE构造器
  let lTemp = Vue.extend(loadTemp)

  let $vm = new lTemp()

  // 此处使用$mount来手动开启编译。用$el来访问元素，并插入到body中
  let tpl = $vm.$mount().$el
  document.body.appendChild(tpl)

  Vue.prototype.$loading = { // 在Vue的原型上添加实例方法，以全局调用
    show (options) {
      $vm.showLoading = true
    },
    hide () {
      $vm.showLoading = false
    }
  }
}
// 导出Load
export default Load
