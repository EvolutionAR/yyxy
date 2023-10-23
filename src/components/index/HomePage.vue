<template>
		<el-main class="indexMain">
				<ApplyEntrance></ApplyEntrance>
        <MessageList></MessageList>
			</el-main>
</template>
<script>
import ApplyEntrance from './ApplyEntrance'
import MessageList from './MessageList'

export default {
  name: 'homepage',
  components:{
    ApplyEntrance,
    MessageList
  },
  data() {
    return {
      alreadyApply:null,
    }
  },
  mounted(){
  },
  methods: {
   
  },
}
</script>
<style>
</style>
