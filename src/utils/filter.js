import Vue from 'vue'
Vue.filter('positionLevel', function (level) {
  switch (level) {
    case 'primary':
      return '初级'
    case 'middle':
      return '中级'
    case 'high':
      return '高级'
    default:
      return '暂无级别'
  }
})
Vue.filter('nodeStateFilter', function (state) {
  switch (state) {
    case 'process':
      return '进行中'
    case 'pass':
      return '已通过'
    case 'notpass':
      return '未通过'
    default:
      return ''
  }
})
Vue.filter('timeFilter', function (time) {
  if (!time) {
    return ''
  }
  return time.split(' ')[0]
})
