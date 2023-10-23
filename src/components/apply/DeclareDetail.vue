<template>
   <div class="applyInfos">
    <div class="applyInfo">
      <h3 class="infoTitle">信息公示内容</h3>
      <el-row class="infoContainer">
        <p class="declareCon">{{declareType}}</p>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name:"DeclareDetail",
  // props:["applyUserName","flowName"],
  props:['currentNodeId'],
  // props:{
  //    applyUserName:{
  //      type:String,
  //      default:''
  //    },
  //    flowName:{
  //      type:String,
  //      default:''
  //    },
  //    currentNodeId:{
  //      type:String,
  //      default:''
  //    }
  // },
  data:function(){
    return {
      // flowName:this.flowName,
      // applyUserName:this.applyUserName,
      // message:'日照人民医院是否可以申请为定点医院',
      declareType:'信息公示中'
    }
  },
  mounted(){
    this.geInitPage()
  },
  methods:{
      geInitPage(){
        if(this.currentNodeId === "N2019082206"){
          this.declareType = '信息公示完成'
        }
      }
  }
}
</script>
<style scoped>
.infoContainer{
  text-align: center;
  margin-bottom: 10px;
}
.declareCon{
  font-size: 14px;
  color: #4D4D4D;
}
</style>>
