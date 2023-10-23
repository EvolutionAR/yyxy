<template>
  <div class="applyInfos review">
     <div class="applyInfo">
      <!-- <h3 class="infoTitle">{{materialName}}</h3> -->
      <h3 class="infoTitle">住院医疗机构申报定点医药机构现场评估</h3>
      <el-row class="infoContainer">
        <!-- <h3></h3> -->
        <table class="recheck-table">
          <thead>
            <tr>
              <th width="186">项目</th>
              <th width="200">评估内容</th>
              <th width="100">分值</th>
              <th width="300">评估标准</th>
              <th width="300">评估记录</th>
              <th width="100">评估得分</th>
            </tr>
          </thead>
          <tr v-for="(item,index) in answerList" :key="index">
            <td class="as-cateName">{{item.cateName}}</td>
            <td>
              <div
                v-for="(asItem,asIndex) in item.questionAnswerList"
                :key="asIndex"
                :class="['as-questionContent',asIndex!=item.questionAnswerList.length-1?'boreder-bottom':'']"
                ref="questionContent"
              >{{asItem.questionContent}}</div>
            </td>
            <td>
              <div
                v-for="(asItem,asIndex) in item.questionAnswerList"
                :key="asIndex"
                :class="['as-auditScore',asIndex!=item.questionAnswerList.length-1?'boreder-bottom':'']"
                ref="auditScore"
              >{{asItem.auditScore}}</div>
            </td>
            <td>
               <div
                  v-for="(asItem,asIndex) in item.questionAnswerList"
                  :key="asIndex"
                  :class="['as-auditStandard',asIndex!=item.questionAnswerList.length-1?'boreder-bottom':'']"
                  ref="auditStandard"
                >{{asItem.auditStandard}}
                </div>         
            </td>
            <td>
              <div
                v-for="(asItem,asIndex) in item.questionAnswerList"
                :key="asIndex"
                :class="['as-answerMessage',asIndex!=item.questionAnswerList.length-1?'boreder-bottom':'']"
                ref="answerMessage"
              >     
                <el-input
                  slot="reference"
                  :disabled="allDisabled"
                  resize="none"
                  type="textarea"
                  rows="4"
                  maxlength="200"
                  show-word-limit
                  v-model="asItem.answerMessage"
                  placeholder="评估内容"
                ></el-input>
              </div>
            </td>
            <td>
              <div
                v-for="(asItem,asIndex) in item.questionAnswerList"
                :key="asIndex"
                :class="['as-answerScore',asIndex!=item.questionAnswerList.length-1?'boreder-bottom':'']"
                ref="answerScore"
              >
                <el-input
                  :disabled="allDisabled"
                  v-model.number="asItem.answerScore"
                  type="number"
                  :max="asItem.auditScore"
                  min="0"
                  @blur="checkScore($event,asItem.answerScore,asItem.auditScore)"
                  placeholder="评分"
                ></el-input>
              </div>
            </td>
          </tr>
        </table>
      </el-row>
    </div>
    <div class="applyInfo">
      <h3 class="infoTitle">现场照片</h3>
      <el-col v-if="isHavePic && allDisabled">
           <div style="margin:40px">
              无现场照片信息
           </div>         
      </el-col>
      <el-row class="infoContainerPic">
        <div v-show="item.attachmentType == 'ScenePhoto'"  v-for="(item,index)  in attachmentList" :key='index'>
              <div class="picList">
                 <img @click="viewInfo(item.attachmentUrl)"  :src="item.attachmentUrl" class="image">
                <div class="picName">
                  <span>{{item.attachmentName}}</span>
                  <i  class="el-icon-close" v-if="!allDisabled" @click="handleRemoveMaterial(item)"></i>
                </div>
                <div class="picMessage">
                <el-input :disabled="allDisabled" resize="none" rows="4" show-word-limit
                  maxlength="200" v-if="!allDisabled"  type="textarea" v-model="item.attachmentDesc" placeholder="请添加详细描述"></el-input>
                <el-input :disabled="allDisabled" resize="none" show-word-limit rows="4" maxlength="200" v-if="allDisabled" v-model="item.attachmentDesc"  type="textarea"  placeholder="描述暂无"></el-input>
                </div>
              </div>
        </div>
        <el-upload
          v-if="!allDisabled"
          :disabled="allDisabled"
          action="''"
          :before-upload="handbeforePicUpload"
          class="imgUpload"
          :http-request="uploadPicList"
        >
         <div class="el-upload__text"> <img :src="uploadScenePicUrl"></div>
        </el-upload>
      </el-row>
    </div>
    <div class="applyInfo">
      <h3 class="infoTitle">资料上传</h3>
      <p class="applyNumberTip">
            <i style="color:#537efd" class="el-icon-info"></i>
            请下载模板文件，填写完成后，将此文件拍照或扫描上传，支持jpg、png及pdf格式
      </p>
        <el-row>
         <el-upload
          class="materialUpload"
          :action="''"
          :http-request="uploadFileList"
          :disabled="allDisabled"
          :before-upload=" handbeforeFileUpload"
        >
          <div class="el-upload__file" v-if="isHaveFile"> <img :src="uploadZipUrl"></div>
          <el-button v-if="!isHaveFile" :disabled="allDisabled" type="primary">重新上传</el-button>
        </el-upload>
        <div class="el-after-upload" v-if="!isHaveFile">
            <div class="file-upload">
              <img :src="uploadBgUrl">
              <div class="fileMessage" @click="viewInfo(item.attachmentUrl)" v-show="item.attachmentType !== 'ScenePhoto'"  v-for="(item,index) in attachmentList" :key="index"><span class="icon iconfont iconPicPdf"></span><span>{{ item.attachmentName }}</span></div>
            </div>
        </div>
        <div class="el-after-upload-title">
            <p>
             现场评估承诺书
            </p>
            <div>
              <a :href="downloadUrl"><span class="icon iconfont iconxiazaiicon downloadIcon"></span>现场评估承诺书模板下载</a>
            </div>
        </div>
        <!-- <div class="flieTitle">
            （请下载模板文件，请拍照或扫描文件上传，仅支持jpg,png及pdf文件）
        </div> -->
      </el-row>
    </div>
    <div class="applyInfo submitReview" v-if="!allDisabled">
      <el-row class="primaryBtn">
        <el-button type="primary" size="medium" @click="submitReview">提交</el-button>
      </el-row>
    </div>
    <div class="applyInfo submitReview" v-if="allDisabled && currentNodeId == 'N2019082203' && endStatus == 'process'">
      <el-row class="primaryBtn">
        <el-button type="primary" size="medium" @click="editPage">编辑</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  saveAttachmentAndAnswer,
  getNodeData,
  getQuestionList,
  getQuestionAnswer,
  getTaskTrace,
  getFlowList,
  uploadPic,
  uploadAnyFileType
} from "@/api/api.js";
import { roleId, uploadFileType } from "../../utils/Constant";
import { judgeFileType, addArrayOption, Sum, dealErrMessage} from "@/utils/commonTool";
import { Form, Message } from "element-ui";
import { SUCCESS_CODE, FAIL_CODE, ERR_CODE } from "@/utils/Constant";
const upLoadFile = (context, item, fileType) => {
  //todo
  let excelIndex = item.action;
  let reader = new FileReader();
  let file = item.file;
  let fileName = file.name;
  let itemFileType = file.name;
  if (!fileName || !fileName.split(".")) {
    return;
  }
  if (uploadFileType[fileType] === undefined) {
    return;
  }
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = function() {
      let itemFileTypeArray = itemFileType.split(".");
         
      let fileIndex = itemFileTypeArray.length - 1
      let type = itemFileTypeArray[fileIndex]
  
      let fileOriginalName = fileName.substring(0,fileName.lastIndexOf('.'))
      let fileSuffixName = type
      let fileBase64Str = this.result
      //todo
      let params = {
        institutionId: context.institutionId,
        applyTaskId: context.applyTaskId,
        attachmentInfo: {
          fileOriginalName: fileOriginalName,
          fileSuffixName: fileSuffixName,
          fileBase64Str: fileBase64Str.split(",")[1]
        }
      };
      resolve(params);
    };
  });
};
export default {
  name: "ReviewMedicalMaterial",
  props: ["nodeId"],
  data: function() {
    return {
      uploadScenePicUrl:require('../../assets/img/scenephoto.png'),
      uploadZipUrl:require('../../assets/img/letterOfCommitment.png'),
      iconUrl:require('../../assets/img/letterOfCommitmentIcon.svg'),
      uploadBgUrl:require('../../assets/img/uploadBg.png'),
      downloadUrl:'http://wxyl.pension.taikang.com/imis/sdrz/institution/srv/api/attachment/download/18F14A5D-EF85-4CA4-85AC-0AB2FFD4587F',
      isHaveFile:true,
      isHavePic:true,
      autosize:{
        maxRows:6
      },
      photoDialogVisible: false,
      dialogImageUrl: "",
      nodeDataParam: {
        applyTaskId: "",
        nodeId: ""
      },
      institutionId: "",
      materialName: "",
      materialAnswerList: [],
      answerList: [],
      materialStatus: false,
      materialIdList: "",
      flowListParmes: {
        flowId: this.$route.query.flowId,
        roleId: ""
      },
      credentials: [],
      applyTaskId: this.$route.query.applyTaskId,
      attachmentList: [], //附件内容                 //一个附件格式
      ReviewInfo: {
        applyTaskId: "",
        attachmentList: [],
        data: {
          materialId: "",
          questionCateList: []
        },
        nodeId: this.nodeId,
        processRoleId: roleId
      },
      picList: [],
      fileList: [],
      allDisabled: false,
      currentNodeName:'',
      endStatus:'',
      currentNodeId:''
    };
  },
  mounted() {
    this.getApplyTaskIdFromRouter();
    this.getInitPage();
  },
  methods: {
    checkScore(el,answerScore,auditScore){
      if(answerScore > auditScore || answerScore < 0 || answerScore == null){
        el.target.classList.add('font-red-coler')
      } else{
        el.target.classList.remove('font-red-coler')
      }
    },
    handbeforeFileUpload(file) {
      let typeArr = uploadFileType["picpdf"];
      let isAllowedType = judgeFileType(file.name, typeArr);
      if (!isAllowedType) {
        Message.error("文件类型有误，请重新上传");
        return false;
      }
    },

    handbeforePicUpload(file) {
      let typeArr = uploadFileType["pic"];
      let isAllowedType = judgeFileType(file.name, typeArr);
      if (!isAllowedType) {
        Message.error("文件类型有误，请重新上传");
        return false;
      }
    },

    handleRemoveMaterial(picitem) {
      this.deleteMaterial(picitem.attachmentId);
    },
    deleteMaterial(uid) {
      for (let key in this.attachmentList) {
        if (this.attachmentList[key].attachmentId == uid) {
          this.attachmentList.splice(key, 1);
        }
      }
    },
    viewInfo(url) {
      window.open(url);
    },
    submitReview() {
      this.$loading.show()
      this.ReviewInfo.applyTaskId = this.$route.query.applyTaskId;
      this.ReviewInfo.attachmentList = this.attachmentList;
      this.ReviewInfo.data.questionCateList = this.answerList;
      saveAttachmentAndAnswer(this.ReviewInfo).then(res => {
        this.$loading.hide()
        if (res && res.code === ERR_CODE) {
          Message.error({ message: '系统异常，请稍后再试'+res.code });
          return;
        }
        if (res && res.code === FAIL_CODE) {
          this.$message({
              dangerouslyUseHTMLString:true,
              type:'error',
              message:dealErrMessage(res.message)
          })
          return;
        }
        if (res && res.code === SUCCESS_CODE) {
          for (let key in this.attachmentList) {
              if (this.attachmentList[key].attachmentType == "fileList") {
                 this.isHaveFile = false
              }
              if (this.attachmentList[key].attachmentType == "ScenePhoto") {
                this.isHavePic = false
              }
          }
          this.$message({
              message:'提交成功',
              type:'success'
          })
          this.allDisabled = true
          // this.$alert("复审(现场评估）资料已提交完成", "提示", {
          //   confirmButtonText: "确定",
          //   callback: action => {
              
          //   }
          // });
        }
      });
    },
    editPage(){
       this.allDisabled = false
    },
    uploadFileList(item) {
      this.$loading.show()
      upLoadFile(this, item, "pic").then(params => {
        uploadAnyFileType(params).then(res => {
          this.$loading.hide()
          if (res && res.code === ERR_CODE) {
            Message.error({ message: '上传文件失败，请重新上传' });
            return;
          }
          if (res && res.code === FAIL_CODE) {
            Message.error({ message: res.message });
            return;
          }
          if (res && res.code === SUCCESS_CODE) {
            this.$message({
              message:'上传成功',
              type:'success'
            })
            var attachmen = {
              attachmentId: item.file.uid,
              attachmentName: "",
              attachmentType: "",
              attachmentUrl: "",
              attachmentDesc:''
            };
            attachmen.attachmentUrl = res.data.attachmentUrl;
            attachmen.attachmentType = "fileList";
            attachmen.attachmentName = params.attachmentInfo.fileOriginalName;
           
            for(let key in this.attachmentList){
               if(this.attachmentList[key].attachmentType == "fileList"){
                 this.attachmentList.splice(key,1)
               }
            }
            this.attachmentList.push(attachmen);
            this.isHaveFile = false
          }
        });
      });
    },
    uploadPicList(item) {
      this.$loading.show()
      upLoadFile(this, item, "pic").then(params => {
        uploadPic(params).then(res => {
          this.$loading.hide()
          if (res && res.code === ERR_CODE) {
            Message.error({ message: '上传图片失败，请重新上传' });
            return;
          }
          if (res && res.code === FAIL_CODE) {
            Message.error({ message: res.message });
            return;
          }
          if (res && res.code === SUCCESS_CODE) {
            this.$message({
              message:'上传成功',
              type:'success'
            })
            var attachmen = {
              attachmentId: item.file.uid,
              attachmentName: "",
              attachmentType: "",
              attachmentUrl: "",
              attachmentDesc:''
            };
            attachmen.attachmentUrl = res.data.attachmentUrl;
            attachmen.attachmentType = "ScenePhoto";
            attachmen.attachmentName = params.attachmentInfo.fileOriginalName;
            this.attachmentList.push(attachmen);
          }
        });
      });
    },
    getInitPage() {
      this.getTaskTrace({ applyTaskId: this.$route.query.applyTaskId });
    },
    //无答案获取问题
    getQuestionList(materialIdList) {
      getQuestionList({}, { materialId: materialIdList }).then(res => {
        if (res && res.code === FAIL_CODE) {
          Message.error({ message: res.message });
          return;
        }
        if (res && res.code === SUCCESS_CODE) {
          this.ReviewInfo.data.materialId = res.data[0].materialId;
          this.materialName = res.data[0].materialName;
          this.merageAnswerList(res.data[0].materialCateInfoList);
          this.$nextTick(() => {
            this.getAuditStandardHeightAndCHangeOtherHeight();
          });
        }
      });
    },
    //获取路由参数
    getApplyTaskIdFromRouter() {
      this.nodeDataParam.applyTaskId = this.$route.query.applyTaskId;
      this.nodeDataParam.nodeId = this.nodeId;
    },
    getTaskTrace(taskParam) {
      getTaskTrace(taskParam).then(res => {
        this.currentNodeName = res.data.currentNodeName
        this.endStatus = res.data.endStatus
        this.currentNodeId = res.data.currentNodeId
        if (res && res.code === FAIL_CODE) {
          Message.error({ message: res.message });
          return;
        }
        if (res && res.code === SUCCESS_CODE) {
          this.institutionId = res.data.applyUserId;
          this.materialStatus = res.data.materialStatus;
          if(res.data.endStatus !== 'process'){
            this.allDisabled = true;
          }
          if (res.data.currentNodeId !== "N2019082203") {
            this.materialStatus = true;
            this.allDisabled = true;
          }
          if (this.materialStatus) {
            this.allDisabled = true;
            this.getNodeData();
            return;
          }
          // this.allDisabled = true;
          this.getFlowList();
        }
      });
    },
    getFlowList() {
      getFlowList(this.flowListParmes)
        .then(res => {
          if (res && res.code === FAIL_CODE) {
            Message.error({ message: res.message });
            return;
          }
          if (res && res.code === SUCCESS_CODE) {
            this.materialIdList = res.data[0].nodeList[2].materialList[0].materialId;
          }
        })
        .then(() => {
          this.getQuestionList(this.materialIdList);
        });
    },
    getAuditStandardHeightAndCHangeOtherHeight() {
      let auditStandard = this.$refs.auditStandard;
      let questionContent = this.$refs.questionContent;
      let auditScore = this.$refs.auditScore;
      let answerMessage = this.$refs.answerMessage;
      let answerScore = this.$refs.answerScore;
      if(!auditStandard){
        return
      }
      for (let i = 0; i < auditStandard.length; i++) {
        let auditStandardHeight =
          Math.floor(auditStandard[i].offsetHeight) + "px";
        if (auditStandardHeight == "0px") {
          // this.getAuditStandardHeightAndCHangeOtherHeight()
          return;
        }
        auditStandard[i].style.height = auditStandardHeight;
        questionContent[i].style.height = auditStandardHeight;
        questionContent[i].style.lineHeight = auditStandardHeight;
        auditScore[i].style.height = auditStandardHeight;
        auditScore[i].style.lineHeight = auditStandardHeight;
        answerMessage[i].style.height = auditStandardHeight;
        answerMessage[i].style.lineHeight = auditStandardHeight;
        answerScore[i].style.height = auditStandardHeight;
        answerScore[i].style.lineHeight = auditStandardHeight;
      }
    },
    //有答案的信息
    getNodeData() {
      getNodeData(this.nodeDataParam)
        .then(res => {
          if (res && res.code === FAIL_CODE) {
            Message.error({ message: res.message });
            return;
          }
          if (res && res.code === SUCCESS_CODE) {
            this.ReviewInfo.data.materialId =
              res.data.materialAnswerList[0].materialId;
            this.attachmentList = res.data.attachmentList;
            this.materialAnswerList = res.data.materialAnswerList;
            for (let key in this.attachmentList) {
              if (this.attachmentList[key].attachmentType == "fileList") {
                 this.isHaveFile = false
              }
              if (this.attachmentList[key].attachmentType == "ScenePhoto") {
                this.isHavePic = false
              }
            }
          }
        })
        .then(() => {
          this.getQuestionAnswerByanswerId(this.materialAnswerList);
        });
    },
    //有答案信息
    getQuestionAnswerByanswerId(materialAnswerList) {
      if (materialAnswerList.length < 1) {
        return;
      }
      for (let i = 0; i < materialAnswerList.length; i++) {
        let questionAnswerParam = {
          answerId: materialAnswerList[i].answerId
        };
        getQuestionAnswer({}, questionAnswerParam).then(res => {
          if (res && res.code === FAIL_CODE) {
            Message.error({ message: res.message });
            return;
          }
          if (res && res.code === SUCCESS_CODE) {
            this.materialName = res.data[0].materialName;
            this.merageAnswerList(res.data[0].questionCateList);
            this.$nextTick(() => {
              this.getAuditStandardHeightAndCHangeOtherHeight();
            });
          }
        });
      }
    },
    //合并数据
    merageAnswerList(answerList) {
      for (let i = 0; i < answerList.length; i++) {
        this.answerList.push(answerList[i]);
      }
      // this.$forceUpdate()
    }
  }
};
</script>
<style scoped>
.download-btn {
  outline: none;
  text-decoration: none;
  float: right;
  border: 1px solid #377dff;
  border-radius: 2px;
  font-size: 14px;
  color: #377dff;
  line-height: 20px;
  padding: 3px 18px;
}
.primaryBtn{
  text-align: center
}
.download-btn {
  float: right;
  border: 1px solid #377dff;
  border-radius: 2px;
  font-size: 14px;
  color: #377dff;
  line-height: 20px;
  padding: 3px 18px;
}
.recheck-table input {
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}
.recheck-table {
  width: 100%;
  border: 1px solid #d5d5d5;
  margin-top: 5px;
  border-spacing: 0px;
}
.recheck-table th {
  background: #e5effe;
  border-right: 1px solid #d5d5d5;
  height: 49px;
  line-height: 49px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: normal;
}
.recheck-table tr td {
  border-bottom: 1px solid #d5d5d5;
  border-right: 1px solid #d5d5d5;
  padding-left: 0px;
}
/* .recheck-table tr td div{
   padding: 5px 10px;
} */
.recheck-table tr td.as-cateName {
  padding-left: 10px;
}

.as-questionContent,
.as-auditScore,
.as-auditStandard,
.as-answerMessage,
.as-answerScore {
  padding: 0px 10px;
  min-height: 120px;
}
/* .as-answerMessage input[type = 'textarea']{
  resize: none
} */
.as-auditStandard {
  padding: 5px 10px;
}
.boreder-bottom {
  border-bottom: 1px solid #d5d5d5;
}
.recheck-table tr:nth-of-type(even) td {
  background: #f4f6fa;
}
.recheck-table tr:hover td {
  background: #f4f6fa;
}
/* .sss{
  position: absolute;
  top:40%;
  left: 50%;
} */
.imgUpload .el-upload-list{
   display: none
}
.as-answerMessage .el-textarea {
   vertical-align: middle
}
.picList{
  position: relative;
  float:left;
  width: 300px;
  height: 303px;
  margin-left: 40px;
  margin-bottom: 20px
}
.picList img{
  width: 300px;
  height: 184px;
  border: 1px #999999 solid;
  cursor: pointer;
}
.picList .picName{
  position: absolute;
  bottom: 118px;
  left: 1px;
  width: 300px;
  height: 30px;
  line-height: 30px;
  padding: 0px 10px 0px 10px;
  background: #ffffff;
}
.picList .picName span{
  display: inline-block;
  width: 260px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}
.picList .picName i{
  float:right;
  margin-top:8px;
  width:19px;
  cursor: pointer;
}
.picList .picMessage{
  margin-top: 10px
}
/* .el-upload--picture-card{
    border: none
} */
.infoContainerPic .el-upload__text{
  text-align: center;
  background: #D8D8D8;
  width: 300px;
  height: 184px;
  margin-left: 40px
}
.el-upload__file{
  text-align: center;
  background: #D8D8D8;
  width: 300px;
  height: 184px;
  margin-left: 40px;
  margin-top: 30px
}
.el-upload__text img{
  width: 300px;
  height: 184px;
}
.el-upload__file img{
  width: 300px;
  height: 184px;
}
.el-after-upload{
  text-align: center;
  background: #D8D8D8;
  width: 300px;
  height: 184px;
  padding-top: 20px;
  margin-top: 7px;
  margin-left: 40px
}
.el-after-upload .file-upload{
  width: 260px;
  height: 144px;
  margin-left: 20px;
  background: #ffffff;
  border-radius: 3%;
  color: #377DFF;
  cursor: pointer;
}
.fileMessage{
  width: 250px;
  margin: -110px auto 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}
.el-after-upload .file-upload img{
  width: 260px;
  height: 144px
}
.el-after-upload-title{
  margin-top: 20px;
  margin-left: 90px;
  width: 190px;
  text-align: center
}
.el-after-upload-title a{
  color: #377DFF
}
.flieTitle{
  position: absolute;
  top: 172px;
  left: 380px;
  text-align: left;
  width: 300px;
  color: #377DFF;
}
.infoContainerPic{
  margin: 30px 0
}
.submitReview{
  margin-top: 50px
}
.applyNumberTip{
    margin:22px;
    background:#dfe7ff;
    text-align: center;
    border:1px solid #cadbff;
    line-height:40px
}
</style>
