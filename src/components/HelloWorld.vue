<template>
<div>
<nb-map-search></nb-map-search>
</div>
</template>

<script>

import NbMapSearch from './public/NbMap/NbMapSearch'
export default {
  name: 'HelloWorld',
  components: {NbMapSearch},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
