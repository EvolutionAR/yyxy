<template>
    <el-row class="stepsContainer">
      <el-col :span="20" :offset="2">
        <el-steps
          :active="activeStep"
          :finish-status="successStatus"
          :process-status="processStatus"
          align-center
        >
          <el-step v-for="(step,stepIndex) in steps" :key="stepIndex" :title="step.nodeName"></el-step>
        </el-steps>
      </el-col>
    </el-row>
</template>
<script>
import { getFlowList, getTaskTrace} from '@/api/api.js'
import { SUCCESS_CODE,FAIL_CODE,ERR_CODE } from '@/utils/Constant'
export default {
    name: 'applyprogressbar',
    props:[
      'flowId',
      'applyTaskId'
    ],
    data() {
        return {
            flowParam: {
              flowId: "",
              roleId: ""
            },
            taskParam: {
                applyTaskId:this.applyTaskId,
            },
            activeStep:0,
            steps:[],
            successStatus:'success',
            processStatus:'process'
        }
    },
    mounted() {
        // this.getInitPage(this.flowId)
    },
    methods: {
      getInitPage(flowId){
          this.flowParam.flowId = flowId
          this.getFlowList(this.flowParam,this.taskParam)
      },
      getFlowList(flowParam,taskParam){
          getFlowList(flowParam).then(res=>{
            if(res && res.code === FAIL_CODE){
                Message.error({ message: res.message })
                return 
            }
            if(res &&  res.code === SUCCESS_CODE){
                this.steps=res.data[0].nodeList.slice(1)
            }
          }).then(()=>{
                this.getTaskTrace(taskParam)
          })
      },
       //获取当前申请任务的流程轨迹 重新申请做特殊处理
      getTaskTrace(taskParam) {
        getTaskTrace(taskParam).then(res =>{
            if(res && res.code === FAIL_CODE){
                Message.error({ message: res.message })
                return 
            }
            if(res &&  res.code === SUCCESS_CODE){
                  this.initActiveStep(res.data)
            }
            
        })
      },
      initActiveStep(applyTaskProcessInfo) {
            let length = applyTaskProcessInfo.traceList.length-1
            console.log()
            if(applyTaskProcessInfo.endStatus == 'end_success'){
                this.activeStep = 5
                return
            }
            this.activeStep = length-1      
            if(applyTaskProcessInfo.endStatus == 'end_false'){
               this.processStatus = 'error'
            }
       },
    }
}
</script>
<style>

</style>
