<style>
.arguments .el-upload {
    display: inline-block;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
    padding: 10px;
}
.applyInfo .uploadDemo.uploadExcel{
        width: 300px;
        height: 240px;
        position: relative;
    }
    .uploadDemo.uploadExcel .text-center{
        text-align: center;
    }   
    .uploadDemo.uploadExcel .block{
        display: block;
    }   
    .uploadDemo.uploadExcel .mt10{
        margin-top:10px;
    } 
     .uploadDemo.uploadExcel .mt10{
        margin-top:10px;
    }
    .uploadDemo.uploadExcel .overFlowEllipsis{
        width: 100%;
        position: absolute;
        top:40px;
        left: 0px;
    }
    .el-upload.el-upload--text{
        padding: 0;
    }   
    .upload-excel-background{
        width: 100%;
        height: 180px;
        position: relative;
        background: #d8d8d8;
    }
    .upload-excel-content{
        width: 260px;position: absolute;
        height: 140px;
        top: 20px;left: 20px; 
        background: #fff;
        border-radius: 3%;

    }
    .upload-excel-content img{
      width: 100%;
      height: 100%;
    }
    .upload-excel-btn{
        top:75px;
        left: 110px;
        position: absolute;
        z-index: 5;
    }
    .upload-excel-img{
        width: 100%;
        height: 100%;
    }
    .upload-file-tips{
      /* position: absolute; */
      display: inline-block;
      color: #377DFF;
      /* margin-left:360px; */
      margin-top: 140px;
      width: 400px;
    }      
           

</style>
<template>
<div class="applyInfos">
    <div style="position:relative;"  class="applyInfo">
      <h3 class="infoTitle">协议签订内容</h3>
      <el-row class="infoContainer">
            <div class="uploadDemo uploadExcel"  v-for = "(item,index) in fileList" :key = 'index' >
                <div class="upload-excel-background">
                    <el-upload v-if="!isDisabled"
                    :action="''+index"
                    :show-file-list = false
                    class="uploadExcel"
                    :http-request="uploadArguments"
                    >
                    <img :src="item.defaultUrl" alt="" class="upload-excel-img" v-show="!item.fileUrl">
                    <el-button class="upload-excel-btn" type="bgBlue" size="small" v-show="!!item.fileUrl">重新上传</el-button>
                    <!-- <div slot="file" slot-scope="{file}">
                        <i class="el-icon-document-checked"></i>{{file.name}}
                    </div> -->
                    </el-upload>
                    
                    <div  class="upload-excel-content">
                        <img :src="uploadFileBgImg" alt="">
                        <a  v-if="!!item.fileUrl" :class="['overFlowEllipsis','text-center','block',isDisabled?'download':'']" :title="item.fileName||''" :href="item.fileUrl" ><span class="icon iconfont iconxiazaiicon downloadIcon"></span>{{item.fileName||''}}</a>
                        <a  v-else class='overFlowEllipsis text-center block download text-black'>暂未上传相关文件</a>
                    </div>
                </div>
                <h3 class="text-center mt10">{{item.title}}</h3>
                 
                 <a :href="item.templateUrl"  class="block text-center" v-if="!isDisabled"><span class="icon iconfont iconxiazaiicon downloadIcon"></span>{{item.downLoadTitle}}</a>
                 
                <div slot="tip" class="el-upload__tip text-danger" style="color:red;margin-top:0px;" v-show="!item.isSuccess"><i class="el-icon-warning"></i>{{item.errTips}}</div>
            </div>
            <!-- <div class="upload-file-tips">
              {{fileList[0].tips}}
            </div> -->
           
        </el-row>
    </div>
  </div>
</template>

<script>
import { judgeFileType } from '@/utils/commonTool'
import { uploadPic, getNodeData,uploadAnyFileType  } from '@/api/api'
import { getUserId } from '@/utils/LocalStoragePerform'
import { Message } from 'element-ui'
import { 
  uploadFileBgImg,
  argumentsList, 
  uploadFileType,
  fileList,
  SUCCESS_CODE,
  FAIL_CODE,
  ERR_CODE
} from "@/utils/Constant"
const getFileSuffix=(fileName)=>{
  if(!fileName || !fileName.split('.')[1]){
    return 
  }
  return fileName.split('.')[
    fileName.split('.').length-1
  ]
}
const upLoadFile = (context,item,fileType) =>{//todo
            // console.log('item',item)
            let excelIndex=item.action
            let reader = new FileReader()
            let file = item.file
            let fileName=file.name
            if(!fileName || !fileName.split('.') ){
                return 
            }
            if(uploadFileType[fileType] === undefined){
                return 
            }
            let typeArr=uploadFileType[fileType]
            let isAllowedType=judgeFileType(fileName, typeArr)
            return new Promise((resolve,reject)=>{  
                if(!isAllowedType){
                    Message.error('文件类型有误，请重新上传')
                    resolve(null)
                    return 
                }
                reader.readAsDataURL(file)
                reader.onload=function(){
                    let fileOriginalName = fileName.split('.')[0],
                        fileSuffixName = fileName.split('.')[1],
                        fileBase64Str = this.result
                        //todo
                    let params={
                        "institutionId": context.institutionId,
                        "applyTaskId": context.query.applyTaskId,
                        "attachmentInfo": {
                            "fileOriginalName": fileOriginalName,
                            "fileSuffixName": fileSuffixName,
                            "fileBase64Str": fileBase64Str.split(',')[1]
                        }
                    }
                    resolve(params)
                }
            })
}
const updateArgumentsList=(fileList,argumentsList,file,picIndex)=>{
  console.log('..............',fileList,argumentsList,file,picIndex)
  if(!fileList || !fileList instanceof Array || fileList.length==0){
    return 
  }
  let item = {
        attachmentDesc: null,
        attachmentId: "",
        attachmentName: fileList[picIndex].fileName,
        attachmentType: getFileSuffix(fileList[picIndex].fileName),
        attachmentUrl: fileList[picIndex].fileUrl,
  }
  argumentsList[picIndex]=item
   console.log('..............',argumentsList)
  return argumentsList
}
const removeArgumentsListItem = (argumentsList,file) =>{
  if(!argumentsList instanceof Array ){
    return 
  }

    argumentsList.map((item,index) => {
        if(item.attachmentId=file.uid){
          argumentsList.splice(index,1)
        }
    })
   return argumentsList
}

const initFileList = (argumentsList,fileList) =>{
  if(!argumentsList instanceof Array ){
    return 
  }
  let fileItem
  argumentsList.map( (item,index) => {
      fileList[index].fileName=item.attachmentName
      fileList[index].fileUrl=item.attachmentUrl
  })
 
  return fileList
}
export default {
  name:'AgreementDetail',
  props:{
    nodeId:String
  },
  data: function (){
    return {
       dialogImageUrl:	'',
       dialogVisible:	false,
       institutionId:'',
       argumentsList:argumentsList,
       fileList:fileList,
       query:{},
       isDisabled:true,
       uploadFileBgImg:uploadFileBgImg
    }
  },
  mounted(){
    this.clearAttachmentList()
    this.getInstitutionId()
    this.dealWithPage()
  },
  methods:{
    clearAttachmentList(){
        this.fileList = [
          {
            title: '协议签订相关文件',
            downLoadTitle: '压缩文件模板下载',
            templateUrl: 'http://wxyl.pension.taikang.com/imis/sdrz/institution/srv/api/attachment/download/5DA9CC63-235E-4C47-BB7F-45F530200C6F',
            tips: '（请下载模板文件，根据提示把相关文件置于文件夹中并压缩上传，仅支持zip，rar文件）',
            errTips: '上传失败，请重试！',
            isSuccess: true,
            fileName: '',
            fileUrl: '',
            defaultUrl: require('../../assets/img/agreement.png')
          },
          {
            title: '医师人员职业证书',
            downLoadTitle: '压缩文件模板下载',
            templateUrl: 'http://wxyl.pension.taikang.com/imis/sdrz/institution/srv/api/attachment/download/215A5DE3-B882-4458-93EC-BD6A6D1A04A7',
            tips: '（请下载模板文件，根据提示把相关文件置于文件夹中并压缩上传，仅支持zip，rar文件）',
            errTips: '上传失败，请重试！',
            isSuccess: true,
            fileName: '',
            fileUrl: '',
            defaultUrl: require('../../assets/img/doctor.png')
          },
          {
            title: '医技人员职业证书',
            downLoadTitle: '压缩文件模板下载',
            templateUrl: 'http://wxyl.pension.taikang.com/imis/sdrz/institution/srv/api/attachment/download/8F5A627B-EDCC-4535-8E9A-B2E06F0A2DD7',
            tips: '（请下载模板文件，根据提示把相关文件置于文件夹中并压缩上传，仅支持zip，rar文件）',
            errTips: '上传失败，请重试！',
            isSuccess: true,
            fileName: '',
            fileUrl: '',
            defaultUrl: require('../../assets/img/technology.png')
          },
          {
            title: '护士人员职业证书',
            downLoadTitle: '压缩文件模板下载',
            templateUrl: 'http://wxyl.pension.taikang.com/imis/sdrz/institution/srv/api/attachment/download/86416680-A6E7-4AB1-816A-960844B023AC',
            tips: '（请下载模板文件，根据提示把相关文件置于文件夹中并压缩上传，仅支持zip，rar文件）',
            errTips: '上传失败，请重试！',
            isSuccess: true,
            fileName: '',
            fileUrl: '',
            defaultUrl: require('../../assets/img/nurse.png')
          }
        ]
        this.argumentsList = [
            {
              attachmentDesc: null,
              attachmentId: '',
              attachmentName: '',
              attachmentType: '',
              attachmentUrl: ''
            },
            {
              attachmentDesc: null,
              attachmentId: '',
              attachmentName: '',
              attachmentType: '',
              attachmentUrl: ''
            },
            {
              attachmentDesc: null,
              attachmentId: '',
              attachmentName: '',
              attachmentType: '',
              attachmentUrl: ''
            },
            {
              attachmentDesc: null,
              attachmentId: '',
              attachmentName: '',
              attachmentType: '',
              attachmentUrl: ''
            }
          ]
      },
      getFileList(){
        let params = {
          "applyTaskId": this.query.applyTaskId,
          "nodeId": this.nodeId
        }
        getNodeData(params).then(res=>{
          if(res && res.code === FAIL_CODE){
              Message.error({ message: res.message })
              return 
          }
          if(res &&  res.code === SUCCESS_CODE){
              this.argumentsList=res.data.attachmentList||this.argumentsList
              this.fileList=initFileList(this.argumentsList,this.fileList)
              console.log('this.argumentsList',this.argumentsList)
          }
          
        })
       
      },
      dealWithPage(){
        this.query=this.getRouterQuery() || {}
        console.log('argumentDetail query',this.query)
        this.getFileList()
       },
      getInstitutionId(){
          let institutionId = getUserId()
          this.institutionId = institutionId||""            
      },
      getRouterQuery(){
          // console.log('query',this.$route.query)
          return  this.$route.query
      },
    	handleRemove(file,	fileList)	{
        console.log('removeFile',file,fileList)

        this.fileList=fileList
        this.argumentsList=removeArgumentsListItem(this.argumentsList,file) || this.argumentsList
        console.log('arguments',this.argumentsList)
      }, 
      handlePictureCardPreview(file)	{ 
        this.dialogImageUrl	=	file.url; 
        this.dialogVisible	=	true; 
      },
      updateFileList(file,picIndex,attachmentUrl){
        this.$set(this.fileList[picIndex],'fileUrl',attachmentUrl)
        this.$set(this.fileList[picIndex],'fileName',file.name)
      },
      uploadArguments(item,fileList){
            console.log('item',item,fileList)
            let _this=this
            let file=item.file
            let picIndex=item.action
               upLoadFile(this,item,'ziprar').then(params=>{
                if(!params){
                    return 
                }
                uploadAnyFileType(params).then(res=>{ 
                  if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return 
                }
                if(res &&  res.code === SUCCESS_CODE){
                    let attachmentUrl=res.data.attachmentUrl
                    _this.updateFileList(file,picIndex,attachmentUrl) 
                    
                    _this.argumentsList=updateArgumentsList(_this.fileList,_this.argumentsList,file,picIndex)            
                     console.log('this.argumentsList',_this.argumentsList)
                     _this.$message({
                      message:'上传成功',
                      type:'success'
                    })  
                    //储存结点
                }
               
            })
            })  
      },
      handleChange(file,fileList){
        console.log(file,fileList)
        this.fileList=fileList
        console.log(this.argumentsList)
      },
  }
}
</script>
<style>
  .overFlowEllipsis.download.text-black{
    color:#999;
  }
</style>