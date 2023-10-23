<template>
    <el-row>
      <el-col :span="8">
        <div class="cardContainer cardContainerAll"  @click="goPointPage('/apply/all')">
            <h3>{{homePageData.total | resetHomePageData}}<em>条</em></h3>
            <span>全部待审核</span>
        </div>
      </el-col>
      <el-col :span="16">
         <el-row class="cardblock">
            <el-col :span="8" >
              <div class="cardContainer" @click="goPointPage('/apply/firstTrial')">
                  <h3>{{homePageData[nodeNumber.FirstTrial] | resetHomePageData}}<em>条</em></h3>
                  <span>材料初审</span>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="cardContainer" @click="goPointPage('/apply/review')">
                  <h3>{{homePageData[nodeNumber.Review] | resetHomePageData}}<em>条</em></h3>
                  <span>复审（现场评估）</span>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="cardContainer" @click="goPointPage('/apply/physicianExamination')">
                  <h3>{{homePageData[nodeNumber.PhysicianExamination] | resetHomePageData}}<em>条</em></h3>
                  <span>医师考试</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="cardblock">
            <el-col :span="8" >
              <div class="cardContainer" @click="goPointPage('/apply/infoPublicity')">
                  <h3>{{homePageData[nodeNumber.InfoPublicity] | resetHomePageData}}<em>条</em></h3>
                  <span>信息公示</span>
              </div>
            </el-col>
            <el-col :span="8" >
              <div class="cardContainer" @click="goPointPage('/apply/agreementSigning')">
                  <h3>{{homePageData[nodeNumber.AgreementSigning] | resetHomePageData}}<em>条</em></h3>
                  <span>协议签订</span>
              </div>
            </el-col>
            <!-- <el-col :span="8">
              <div class="cardContainer">
                  <h3>72<em>条</em></h3>
                  <span>申请成功</span>
              </div>
            </el-col> -->
          </el-row>
      </el-col>
    </el-row>
</template>
<script>
import {ApplyListTypes, roleId, nodeNumber} from "../../utils/Constant"
import { getToDoCount } from '@/api/api.js'
import { SUCCESS_CODE,FAIL_CODE,ERR_CODE} from '@/utils/Constant'
export default {
    name:'applyentrance',
    data() {
        return {
            param:{
                flowId:'',
                roleId:'1111',
            },
            applyTypeList:[],
            getToDoCountParams:{
              processRoleId:roleId
            },
            homePageData:{},
            nodeNumber:nodeNumber
        }
    },
    mounted() {
      // this.getToDoCount()
    },
    methods:{
      getToDoCount(){
           getToDoCount(this.getToDoCountParams).then(res=>{
             if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return 
                }
                if(res &&  res.code === SUCCESS_CODE){
                    this.homePageData = res.data
                }
          })
      },
      goPointPage(pageName){
        if(pageName == '/apply/all'){
            this.$router.push({
               path:pageName,
               query:{
                   type:'process',
               }
           })
        } else{
          this.$router.push(pageName)
        }     
      }
    },
    filters:{
      resetHomePageData:function(value){
        if(!value){
          return '0'
        }
        return value.countNum
      }
    }
}
</script>


