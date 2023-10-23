<template>
  <div>
    <el-input v-model="searchLocation" placeholder="请输入内容"></el-input>
    <div id="nbMapContainer">
    </div>
    <div id="searchLocationResults">
    </div>
  </div>
</template>

<script>
import {Input} from 'element-ui'
export default {
  name: 'NbMapSearch',
  components: {Input},
  data () {
    return {
      searchLocation: ''
    }
  },
  props: ['startLocation', 'searchLocationResults'],
  mounted () {
    this.initMap()
    console.log('现在的路由是', this.$router, this.$route, this.startLocation)
  },
  methods: {
    initMap () {
      console.log(window.BMap)
      let map = new window.BMap.Map('nbMapContainer')
      // 转变成百度坐标系
      let point = new window.BMap.Point(116.404, 39.915)
      map.centerAndZoom(point, 15)
      var myKeys = ['酒店', '加油站']
      var local = new window.BMap.LocalSearch(map, {
        renderOptions: {map: map, panel: 'searchLocationResults'},
        pageCapacity: 5
      })
      local.searchInBounds(myKeys, map.getBounds())
      console.log(local)
    }
  }
}
</script>

<style scoped>
  #nbMapContainer{
    height: 100%;
    width: 100%;
    position: absolute;
  }
</style>
