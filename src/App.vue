<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
@import "./assets/css/iconfont/iconfont.css";
#app {
  font-family:'微软雅黑', 'PingFang SC','STHeiti', 'SimHei','Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif';
  color: #4D4D4D;
}
body .el-table th.gutter{
  display: table-cell!important;
}
[v-cloak]{
  display: none
}
</style>
