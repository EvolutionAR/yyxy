<template>
    <div>
        <div class="breadcrumbContainer">
            <BreadCrumb></BreadCrumb>
        </div>
        <div class="addScoreList contentBox">
            <div>
                <el-form :inline="true" class="searchForm">
                    <el-form-item label="录入状态">
                        <el-select v-model="currSelectBatchValue" placeholder="请选择">
                            <el-option
                                v-for="item of examBatchClassifyList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="批次号"  style="margin-right:45px">
                        <el-input v-model="BatchClassifyparams.data.examId" placeholder="请输入批次号"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="searchBatchList">查询</el-button>
                </el-form>
            </div>
            <ul class="collapse_header">
                <li>考试批次</li>
                <li>考试时间</li>
                <li>考试地点</li>
                <li>报名/考场(人)</li>
                <li>详情</li>
            </ul>
            <el-collapse @change="handleChange" v-model="active" :accordion="true" class="addScore_collapse">
                <el-collapse-item
                    v-for="(item,index) in batchIdList"
                    :key="index"
                    :name="index">
                    <template slot="title">
                        <div class="applyDetalTitle">
                            <span>{{item.examId}}</span>
                            <span>{{item.beginTime}}</span>
                            <span>{{item.examAddress}}</span>
                            <span>{{item.examineeCount +'/'+item.examineeLimit}}</span>
                        </div>
                    </template>
                    <div class="physicianInfoOfBatch">
                        <el-form :inline="true" class="searchForm" style="margin-left:0 !important;padding-top:0">
                            <el-button type="primary" @click="redactScore(index)" :class="{bgGrey : item.btnEditBgIsGrey}">编辑</el-button>
                            <el-button  @click="saveScore(item,index)" v-show="!item.isEdit">保存</el-button>
                        </el-form>
                        <el-table
                            :data="item.array"
                            border
                            style="width: 100%;margin-top:1%">
                            <el-table-column
                                width="150px"
                                label="姓名"
                                prop="name">
                            </el-table-column>
                            <el-table-column
                                label="身份证号"
                                prop="idNo">
                            </el-table-column>
                            <el-table-column
                                label="医院编号"
                                prop="institutionId">
                            </el-table-column>
                            <el-table-column
                                label="所属医院"
                                prop="institutionName">
                            </el-table-column>
                            <el-table-column
                                label="分数"
                                prop="[score,enrollStatus]">
                                <template slot-scope="scope">
                                <el-input 
                                    :disabled="!scope.row.enrollStatus || item.isEdit"
                                    v-model="scope.row.score"
                                    type="number"
                                    min="0"
                                    class="input" 
                                    placeholder="录入分数"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>  
                    </div>
                    </el-collapse-item>
                </el-collapse>
                <el-pagination
                    v-if="tatalPageNum > 10"
                    @current-change="handleCurrentChange"
                    :current-page.sync="BatchClassifyparams.pageNum"
                    :page-size="BatchClassifyparams.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="tatalPageNum">
                </el-pagination>
        </div>
    </div>
</template>
<script>
import { getEnrollExamBatch, getBatchInfo, uploadPhysicianScore} from '@/api/api.js'
import { Message } from 'element-ui';
import BreadCrumb from '@/components/public/breadCrumb'
export default {
    name : 'examBatch',
    components: {
        BreadCrumb
    },
    data () {
        return {
            batchIdList :[],
            active : "",
            currSelectBatchValue :"0",
            patchInfoParam : {
                examId : ""
            },
            currBatchInfo : [],
            enteringScoreList:{
                examId: "",
                examineeScoreList :[]
            },
            examBatchClassifyList :[
                {
                    value : "0",
                    label : "全部"
                },
                {
                    value : "1",
                    label : "待录入"
                },
                {
                    value : "2",
                    label : "已完成"
                }
            ],
            BatchClassifyparams : {
                data : {
                    status : "0",
                    examId : ""
                },
                pageNum : 1,
                pageSize : 10
            },
            tatalPageNum : 0
        }
    },
    mounted () {
        this.examBatch()
    },
    methods : {
        examBatch () {
            this.$loading.show()
            getEnrollExamBatch(this.BatchClassifyparams).then(res => {
                this.$loading.hide()
                if(!res) return
                this.batchIdList = res.list
                this.tatalPageNum = res.total
                  //将要提出封装
                if (this.batchIdList &&  this.batchIdList.constructor === Array){
                    for(var i = 0; i < this.batchIdList.length ; i++){
                        this.$set(this.batchIdList[i] ,"array" ,[])
                        this.$set(this.batchIdList[i] ,"isEdit" ,true)
                        this.$set(this.batchIdList[i] ,"btnEditBgIsGrey" ,true)
                    }
                } 
            })
        },
        handleChange (activeNames) {
            //activeNames是当前改变的下边  用localStorage保存起来 因为activeNames只有打开的时候存在，关闭不存在会报错
            if(activeNames || activeNames === 0)
                localStorage.setItem("currChangeIndex",activeNames)
            let tempIndex = localStorage.getItem("currChangeIndex")
            if(this.batchIdList[tempIndex])
                this.patchInfoParam.examId = this.batchIdList[tempIndex].examId
            this.showBatchInfo(tempIndex)
        },
        showBatchInfo (currChangeIndex) {
            getBatchInfo(this.patchInfoParam).then(res => {
                let currBatchInfo = res
                if(currBatchInfo && currBatchInfo.constructor === Array){
                    this.batchIdList[currChangeIndex].array = currBatchInfo
                    if(currBatchInfo.length){
                        this.batchIdList[currChangeIndex].btnEditBgIsGrey = false
                    }
                }
                    
                
            }) 
        },
        //编辑score 
        redactScore (currBatchIndex) {
            if(this.batchIdList[currBatchIndex].btnEditBgIsGrey){
                Message.error({message:"暂无数据可编辑"})
                return
            }
             this.batchIdList[currBatchIndex].isEdit = false
        },
        saveScore (currExamId,batchIndex) {
             this.enteringScoreList.examId = currExamId.examId
             //配参数
             for(let i=0;i<this.batchIdList[batchIndex].array.length;i++){
                 if(this.batchIdList[batchIndex].array[i].score)
                    this.enteringScoreList.examineeScoreList.push({"personId":this.batchIdList[batchIndex].array[i].personId,"score":this.batchIdList[batchIndex].array[i].score})
             }
             this.submitEnterScore(batchIndex)
        },
        submitEnterScore (batchIndex) {
            uploadPhysicianScore (this.enteringScoreList).then( res => {
                if(res.code == 0){
                    Message.success({"message":"录入成功！"})
                   this.batchIdList[batchIndex].isEdit = true
                   this.batchIdList[batchIndex].btnEditBgIsGrey = true
                    this.patchInfoParam.examId = this.enteringScoreList.examId
                    this.showBatchInfo(batchIndex)
                }
            })
        },
        handleCurrentChange(val) {
            //  console.log(`当前页: ${val}`);
            this.BatchClassifyparams.pageNum = val
            this.examBatch()
        },
        searchBatchList () {
            this.BatchClassifyparams.data.status = this.currSelectBatchValue
            this.BatchClassifyparams.pageNum = 1
            this.examBatch()
        }
    }
}
</script>
<style scoped>
    .addScoreList{
        margin: 22px;
        box-shadow : 0px 2px 16px -7px rgba(113,123,131,0.5);
    }
    .physicianInfoOfBatch {
        width:95%;
        margin:1% auto
    }
   .bgGrey{
       background:#cccccc
   }
   .collapse_header{
       width:100%;
       background:#E5EFFE;
   }
   .collapse_header>li{
       display:inline-block;
       width:22.5%;
       text-align: center;
       background:#E5EFFE;
       line-height: 23px;
       padding:12px 0;
   }
   .collapse_header>li:last-child{
       width:8%
   }
   .applyDetalTitle>span{
       display:inline-block;
       width:22.5%;
       text-align: center
   }
  
</style>