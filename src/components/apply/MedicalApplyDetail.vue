<template>
  <div>
    <div class="breadcrumbContainer">
      <BreadCrumb></BreadCrumb>
      <!-- <h1>
        {{applyUserName}}
        <span>申请时间：{{applyTime}}</span>
      </h1> -->
      <div class="breadcrumbBtn" v-if="endStatus == 'process'">
        <el-button type="primary" @click="showDialogPassed">通过</el-button>
        <el-button type="default" @click="showDialogFailed">未通过</el-button>
        <el-dialog width="520px"
          title="提示"
          :show-close="showClose"
          :visible.sync="dialogPassed"
          :append-to-body="true" center>
            <p>{{examineTip}}</p>
            <p v-if="examineTipSecondLineShow">{{examineTipSecondLine}}</p>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPassed = false">取 消</el-button>
                <el-button type="primary" @click="submitNode('pass')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog width="520px"
          title="未通过原因"
          :show-close="showClose"
          :visible.sync="dialogFailed"
          :append-to-body="true" center>
            <el-input
              type="textarea"
              v-model="auditMessage"
              :autosize="{ minRows: 7}"
              maxlength="1000"
              show-word-limit>
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFailed = false">取 消</el-button>
                <el-button type="primary" @click="submitNode('notpass')">确 定</el-button>
            </div>
        </el-dialog>
      </div>
    </div>
    <el-row class="stepsContainer">
      <ApplyProgressBar :flowId=flowId :applyTaskId=applyTaskId></ApplyProgressBar>
    </el-row>
    <div class="applyDetailContainer">
      <el-collapse @change="handleChange" v-model="active">
        <el-collapse-item
          v-for="(traceData,traceIndex) in traceList"
          :key="traceIndex"
          :name="traceIndex"
        >
          <template slot="title">
            <div class="applyDetalTitle">
              <!-- <span v-if="traceIndex==activeApplyIndex&&traceOpenName">{{traceOpenName}}</span> -->
              <div>
                <span class="node-name">{{traceData.nodeName}}</span>
                <span class="auditResult"  style="color:#2BD37B" v-if="traceData.auditResult == 'pass'">{{traceData.auditResult | auditResult}}</span>
                <span class="auditResult"  style="color:#377DFF" v-if="traceData.auditResult == 'process'" >{{traceData.auditResult | auditResult}}</span>
                 <span class="auditResult"  style="color:#F56C6C" v-if="traceData.auditResult == 'notpass'" >{{traceData.auditResult | auditResult}}</span>
              </div>
            </div>
          </template>
          <div v-show="traceIndex == 0 && traceData.auditResult =='notpass'" class="notpass-reason">未通过原因：{{traceData.auditMessage | auditMessage}}</div>
          <div v-show="traceIndex == 1 && traceData.auditResult =='notpass'" class="notpass-reason">未通过原因：{{traceData.auditMessage | auditMessage}}</div>
          <div v-show="traceIndex == 2 && traceData.auditResult =='notpass'" class="notpass-reason">未通过原因：{{traceData.auditMessage | auditMessage}}</div>
          <div v-show="traceIndex == 3 && traceData.auditResult =='notpass'" class="notpass-reason">未通过原因：{{traceData.auditMessage | auditMessage}}</div>
          <div v-show="traceIndex == 4 && traceData.auditResult =='notpass'" class="notpass-reason">未通过原因：{{traceData.auditMessage | auditMessage}}</div>
          <!-- <div v-for="(num,index) in 4" :key="index" v-show="traceIndex == num && traceData.endStatus =='end_false'" class="notpass-reason">未通过原因：{{traceData.auditMessage}}</div> -->
          <OriginalMedicalMaterial v-if="traceIndex==0" :applyUserName="applyUserName"  :applyUserId="applyUserId" :nodeId="storesReserveNodeId"  :isDisabled="OriginalIsDisabled"></OriginalMedicalMaterial>
          <ReviewMedicalMaterial v-if="traceIndex==1" :nodeId="traceList[1].nodeId" ref="reviewMedicalMaterial"></ReviewMedicalMaterial>
          <ExamDetail ref="examDetail" :applyUserId="applyUserId" v-if="traceIndex==2"></ExamDetail>
          <DeclareDetail :flowName="flowName" :applyUserName="applyUserName" :currentNodeId="currentNodeId" v-if="traceIndex==3"></DeclareDetail>
          <AgreementDetail :nodeId="traceList[4].nodeId" v-if="traceIndex==4"></AgreementDetail>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { Steps } from "@/utils/Constant";
import BreadCrumb from '@/components/public/breadCrumb'
import OriginalMedicalMaterial from "./OriginalMedicalMaterial";
import ReviewMedicalMaterial from "./ReviewMedicalMaterial";
import ExamDetail from "./ExamDetail";
import DeclareDetail from "./DeclareDetail";
import AgreementDetail from "./AgreementDetail";
import ApplyProgressBar from "../index/ApplyProgressBar"
import { getTaskTrace, submitNode, getRate} from '@/api/api.js'
import {ApplyListTypes, roleId, nodeNumber, routerNodeNumber} from "../../utils/Constant"
import { getRoleId, getUserId, getNickName } from '@/utils/LocalStoragePerform.js'
import { SUCCESS_CODE, FAIL_CODE, ERR_CODE } from '@/utils/Constant'
import {Message} from 'element-ui'
export default {
  name: "MedicalApplyDetail",
  components: {
    OriginalMedicalMaterial,
    ReviewMedicalMaterial,
    ExamDetail,
    DeclareDetail,
    AgreementDetail,
    ApplyProgressBar,
    BreadCrumb
  },
  data: function() {
    return {
      showClose:false,
      auditMessage:'暂无',
      flowId:'',
      active:1,
      nickName:"",
      dialogPassed:false,
      dialogFailed:false,
      activeStep: 0,
      steps: Steps,
      traceOpenNames:[
        "材料初审","复审（现场评估）","医师考试","信息公示","协议签订"
      ],
      examineTip:'审核无误，确认通过?',
      activeApplyIndex:null,
      institutionBasic:{
      },
      socialInsurance:{
      },
      department:{
      },
      equipmentList:[
      ],
      OriginalIsDisabled:true,
      traceList:[],
      taskParam: {
         applyTaskId:'',
      },
      applyUserName:'',
      applyTime:'',
      userId:'',
      auditMessage:'',
      currentNodeId:'',
      currentNodeName:'',
      applyUserId:'',
      flowName:'',
      storesReserveNodeId:'',
      endStatus:'',
      showWordLimit:true,
      examineTipSecondLine:'',
      examineTipSecondLineShow:false
    };
  },
  created(){
    this.flowId = this.$route.query.flowId
    this.applyTaskId = this.$route.query.applyTaskId
    this.userId = getUserId()
  },
  mounted(){
    this.getInitPage()
  },
  filters:{
      auditResult:function(value){
        switch(value){
              case 'pass': return '已通过';
              case 'process': return "进行中";
              case 'notpass': return '未通过';
              default: return ''
          }
      },
      auditMessage:function(value){
        if(value == ''){
           return '暂无'
        } else{
          return value
        }
      }
  },
  methods: {
    showDialogPassed(){
        if(this.currentNodeName === '医师考试'){
          let paramUrl = {
              institutionId:this.applyUserId
          }
            getRate(paramUrl).then(res=>{
            if(res && res.code === FAIL_CODE){
                Message.error({ message: res.message })
                return
            }
            if(res &&  res.code === SUCCESS_CODE){
                let examineTip =  `总人数:${res.data.totleNum}人， 通过人数:${res.data.passNum}人，未录入人数:${res.data.noEnterSum}人，通过率:${res.data.rate}。`
                this.examineTip = examineTip
                this.examineTipSecondLine = '是否确认通过？'
                this.examineTipSecondLineShow = true
                this.dialogPassed = true
              
           }
          })
        } else if(this.currentNodeName === '协议签订'){
          this.examineTip = `请确认您是否已完成对该机构“${this.currentNodeName}”的审核？`
          this.examineTipSecondLine = '协议签署是本申请流程最后一步，点击确定后，本申请将全部通过审核。'
          this.examineTipSecondLineShow = true
          this.dialogPassed = true
        } else{
          this.examineTip = `请确认您是否已完成对该机构“${this.currentNodeName}”的审核？`
          this.dialogPassed = true
        }
    },
    showDialogFailed(){
        this.dialogFailed = true
    },
    submitNode(auditResult){
      var submitNodeParams = {
        applyTaskId:this.applyTaskId,
        auditMessage:this.auditMessage,
        auditResult:auditResult,
        processRoleId:roleId,
        processUserId:this.userId
      }
      submitNode(submitNodeParams).then(res=>{
           if(res && res.code === ERR_CODE){
                Message.error({ message: res.message})
                this.dialogPassed = false
                this.dialogFailed = false
                return
           }
           if(res && res.code === FAIL_CODE){
                Message.error({ message: res.message })
                this.dialogPassed = false
                this.dialogFailed = false
                return
            }
            if(res &&  res.code === SUCCESS_CODE){
                this.dialogPassed = false
                this.dialogFailed = false
                this.$router.push(routerNodeNumber[this.currentNodeId])
                sessionStorage.setItem('routerPath',routerNodeNumber[this.currentNodeId])
            }
      })
    },
    getInitPage(){
       this.getTaskTrace({applyTaskId:this.applyTaskId})
      // console.log(this.$refs.examDetail,'什么数据============')

    },
    getTaskTrace(taskParam) {
      this.$loading.show()
      getTaskTrace(taskParam).then(res =>{
        this.$loading.hide()
        console.log(res,'当前节点信息')
        if(res && res.code === FAIL_CODE){
            Message.error({ message: res.message })
            return
        }
        if(res &&  res.code === SUCCESS_CODE){
            this.applyUserId = res.data.applyUserId
            this.applyUserName = res.data.applyUserName
            this.applyTime = res.data.applyTime
            this.storesReserveNodeId = res.data.traceList[0].nodeId
            this.traceList = res.data.traceList.slice(1)
            this.flowName = res.data.flowName
            this.endStatus = res.data.endStatus
            this.active = this.traceList.length-1
            this.currentNodeId = res.data.currentNodeId
            this.currentNodeName = res.data.currentNodeName
        }
      })
    },
    handleChange(activeApplyIndex){
      if(activeApplyIndex.indexOf(1) !== -1){
        this.$nextTick(()=>{
          this.$refs.reviewMedicalMaterial[0].getAuditStandardHeightAndCHangeOtherHeight()
        })
      }
    }
  }
};
</script>
<style scoped>
 .notpass-reason{
      width: 90%;
      padding: 15px;
      margin: 0 auto;
      color: #F56C6C;
      background: #fef0f0;
      margin-top: 15px;
      border-radius: 5px;
    }
  .breadcrumbBtn{
      right:22px;
  }  
  .applyDetalTitle .node-name{
    font-size: 18px
  }
</style>

