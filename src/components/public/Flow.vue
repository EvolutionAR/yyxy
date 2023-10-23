<template>
    <el-col :span="20" :offset="2">
        <el-steps
          :active="activeStep"
          finish-status="success"
          process-status="success"
          align-center
        >
          <el-step v-for="step in steps" :key="step" :title="step.nodeName"></el-step>
        </el-steps>
      </el-col>
</template>
<script>
import { getFlowList } from "@/api/api.js"
import { getRoleId } from "../../utils/LocalStoragePerform"

export default {
    name:"Flow",
    data:function(){
        return{
            activeStep:0,
            steps:''
        }
    },
    mounted(){
       this.getFlowList()
    },
    methods:{
        getParams(){
            console.log('this.$route.query',this.$route.query)
            return {
                type:this.$route.query.type||'',
                flowId:this.$route.query.flowId||'',
            }
        },
        getActiveStep(res){
            let startNodeId = res.startNodeId;
            this.activeStep =  res.nodeList.findIndex(function(currentValue){
                return currentValue.nodeId == startNodeId;
            })
        },
        getFlowList() {
            let flowId= this.getParams().flowId
            let roleId = getRoleId();
            console.log(roleId,"roleId")
            if(!flowId){
            //todo
            return 
            }
            let params={
                flowId: flowId,
                // roleId: roleId
            }
            getFlowList(params).then(res=>{
                console.log(res,'flowlist')
                this.steps = res[0].nodeList
                console.log("this.steps",res[0].nodeList)
                this.getActiveStep(res[0]);
            })
        },
    }
}
</script>