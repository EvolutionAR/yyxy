<template>
    <div>
        <div class="breadcrumbContainer">
            <BreadCrumb></BreadCrumb>
        </div>
        <p class="applyNumberTip">
            <i style="color:#537efd" class="el-icon-info"></i>
            当前待报名人数{{needSignUpNumber}}人 , 考场空位{{examEmptyPlace}}个
            <span v-show=" examEmptyPlace < needSignUpNumber"> , 目前有{{needEmptyPlace}}人无考场, 请创建考试批次</span>
        </p>
        <div  class="contentBox">
            <div>
                <el-form :inline="true" class="searchForm">
                    <el-form-item label="批次状态">
                        <el-select v-model="currSelectBatchValue" placeholder="请选择">
                            <el-option
                                v-for="item of examBatchClassifyList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="批次号">
                        <el-input
                            v-model="BatchClassifyparams.data.examId"
                            placeholder="请输入批次号"
                            clearable
                            ></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="searchBatchList">查询</el-button>
                </el-form>
            </div>
            <div class="examBatchContainer">
                <el-button type="primary" @click="isCreateBatch = true">创建考试批次</el-button>
                <el-dialog width="730px" title="创建批次" :visible.sync="isCreateBatch" class="createBarchDialog"
                    :append-to-body="true" center>
                    <el-form :inline="true">
                        <el-form-item label="考试开始时间" label-width="100px">
                            <el-date-picker 
                            style="width:202px"
                            v-model="batchParams.beginTime" 
                            type="datetime"
                            format = "yyyy-MM-dd HH:mm"
                            value-format = "yyyy-MM-dd HH:mm"
                            placeholder="2019-03-10 13:20"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="考试结束时间"  label-width="100px">
                            <el-date-picker 
                            style="width:202px"
                            v-model="batchParams.endTime" 
                            type="datetime"
                            format = "yyyy-MM-dd HH:mm"
                            value-format = "yyyy-MM-dd HH:mm"
                            placeholder="2019-03-10 13:20"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true">
                        <el-form-item label="报名截止时间" label-width="100px">
                            <el-date-picker 
                            style="width:202px"
                            v-model="batchParams.checkInEndTime" 
                            type="datetime"
                            format = "yyyy-MM-dd HH:mm"
                            value-format = "yyyy-MM-dd HH:mm"
                            placeholder="2019-03-10 13:00"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="考试地址" label-width="100px">
                            <el-input 
                            v-model="batchParams.examAddress" 
                            placeholder="xx市xx区"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true">
                         <el-form-item label="批次人数" label-width="100px">
                            <el-input 
                            v-model.number="batchParams.examineeLimit" 
                            placeholder="30"
                            min="1"
                            type="number"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true" slot="footer" class="dialog-footer">
                        <el-button @click="isCreateBatch = false">取 消</el-button>
                        <el-button type="primary" @click="ConfirmCreateBatch">确 定</el-button>
                    </el-form>
                </el-dialog>
                <el-dialog title="创建批次确认" :visible.sync="isConfirmCreateBatch" class="ConfirmCreateBatchDialog"
                    :append-to-body="true" width="630px">
                    <p>
                        <span>考试开始时间：{{batchParams.beginTime}}</span>
                        <span>考试结束时间：{{batchParams.endTime}}</span>
                    </p>
                    <p>
                        <span>报名截止时间：{{batchParams.checkInEndTime}}</span>
                        <span>考试地点：{{batchParams.examAddress}}</span>
                    </p>
                    <p>
                        <span>批次人数：{{batchParams.examineeLimit}}</span>
                    </p>
                    <p class="tip">*该批次一旦创建将不可删除且不可修改,请确认是否创建该考试批次</p>
                    <el-form :inline="true" slot="footer" class="dialog-footer">
                        <el-button @click="isConfirmCreateBatch = false">取 消</el-button>
                        <el-button type="primary" @click="submitBatch" :class="{btnBgColor : ensureCreateBatch}">确 定</el-button>
                    </el-form>
                </el-dialog>
            </div>
            <div class="putDownTable">
                <ul  class="needHighLight">
                    <li>考试批次</li>
                    <li>考试开始时间</li>
                    <li>考试结束时间</li>
                    <li>考试地点</li>
                    <li>报名/考场(人)</li>
                    <li>详情</li>
                </ul>
                <div v-for="(item, index) in batchInfoList" :key="index">
                    <ul class="needHighLight">
                        <li>{{item.examId}}</li>
                        <li>{{item.beginTime}}</li>
                        <li>{{item.endTime}}</li>
                        <li>{{item.examAddress}}</li>
                        <li>{{item.examineeCount +'/'+ item.examineeLimit}}</li>
                        <li @click="getAlreadeApplyPhysicianInfoByBatch(item,index)">
                        <span :class="item.icon"></span>
                        </li>
                    </ul>
                    <div class="batchInfoBox" v-show="item.isShow">
                        <p v-if = "!item.array.length" class="noDataShowTip">暂无数据</p>
                        <div
                        v-else
                        class="examBatchDetail"
                        v-for="(physicianInfoItem,index) in item.array"
                        :key= "index"
                        >
                        <span>姓名：{{physicianInfoItem.name}}</span>
                        <span>身份证号：{{physicianInfoItem.idNo}}</span>
                        <span>所属医院：{{physicianInfoItem.institutionName}}</span>
                        </div>
                        <el-button type="primary" class="applyBtn" @click="exportExamInfo(item.examId)">导出</el-button>
                    </div>
                </div>
            </div>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="BatchClassifyparams.pageNum"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="tatalPageNum"
                v-if="tatalPageNum > 10">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { Message } from 'element-ui'
import BreadCrumb from '@/components/public/breadCrumb'
import { getExamBatch, getBatchInfoByExamId, createBatch, getExamineeCount } from '@/api/api.js'
export default {
    name : 'examBatch',
    components: {
        BreadCrumb
    },
    data () {
        return {
            isCreateBatch : false, 
            isConfirmCreateBatch :false,
            currSelectBatchValue :"0",
            examBatchClassifyList :[
                {
                    value : "0",
                    label : "全部"
                },
                {
                    value : "1",
                    label : "待考试"
                },
                {
                    value : "3",
                    label : "报名中"
                },
                {
                    value : "2",
                    label : "已完成"
                }
                
            ],
            batchParams : {
                beginTime : "",
                endTime : "",
                checkInEndTime : "",
                examineeLimit : null,
                examAddress : "",
            },
            batchInfoList: [],
            patchInfoParam : {
                examId : ""
            },
            currBatchInfo:[],
            getInstitutionAllExanInfo: {
                pageNum: 1,
                pageSize: 10,
                data: {
                    institutionId: ''
                }
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() <= Date.now();
                }
            },
            BatchClassifyparams : {
                data : {
                    examId : "",
                    status : "0"
                },
                pageNum : 1,
                pageSize : 10
            },
            tatalPageNum : 0,
            pageSize : 10,
            needSignUpNumber : 0,
            examEmptyPlace : 0,
            ensureCreateBatch :false,
            needEmptyPlace : 0
        }
    },
    mounted () {
        this.examBatch()
        this.getExamineeCount()
    },
    methods : {
        examBatch () {
            this.$loading.show()
            getExamBatch(this.BatchClassifyparams).then(res => {
                this.$loading.hide()
                if(!res) return
                this.batchInfoList = res.list
                this.tatalPageNum = res.total
                if (this.batchInfoList &&  this.batchInfoList.constructor === Array){
                //将要提出封装
                    for(var i = 0; i < this.batchInfoList.length ; i++){
                        this.$set(this.batchInfoList[i] ,"array" ,[])
                        this.$set(this.batchInfoList[i] ,"isShow" ,false)
                        this.$set(this.batchInfoList[i] ,"icon" ,"el-icon-arrow-down")
                    }
                } 
            })
        },
        getExamineeCount () {
            getExamineeCount().then((res) => {
                if(res.data.sumExamineeCount){
                    this.needSignUpNumber = res.data.sumExamineeCount
                    this.examEmptyPlace = res.data.sumEnableExamineeCount
                    this.needEmptyPlace = this.needSignUpNumber -this.examEmptyPlace
                }
            })
        },
        getAlreadeApplyPhysicianInfoByBatch (examBatch,batchIndex) {
            this.patchInfoParam.examId = examBatch.examId
            this.batchInfoList[batchIndex].isShow ? this.batchInfoList[batchIndex].isShow=false : this.batchInfoList[batchIndex].isShow=true
            this.batchInfoList[batchIndex].icon === "el-icon-arrow-down" ? this.batchInfoList[batchIndex].icon = "el-icon-arrow-up" : this.batchInfoList[batchIndex].icon = "el-icon-arrow-down"
            this.getBatchInfo(batchIndex)
        },
        getBatchInfo (batchIndex) {
           getBatchInfoByExamId(this.patchInfoParam).then(res => {
                this.batchInfoList[batchIndex].array = res
           }) 
        },
        ConfirmCreateBatch () {
            let beginTime = this.batchParams.beginTime
            let endTime = this.batchParams.endTime
            let checkInEndTime = this.batchParams.checkInEndTime
            let examineeLimit = this.batchParams.examineeLimit
            let examAddress = this.batchParams.examAddress
            if(beginTime && endTime && checkInEndTime && examineeLimit && examAddress){
                this.ensureCreateBatch =false
                this.isConfirmCreateBatch = true
            }else{
                Message.error({message:'请完善信息！'})
            }
        },
        //提交创建批次
        submitBatch () {
            if(this.ensureCreateBatch) return
            this.createBatch();
        },
        createBatch() {
            createBatch (this.batchParams).then(res => {
                if(res.code == 0){
                    Message.success({message:'创建成功！'})
                    this.isCreateBatch = false
                    this.isConfirmCreateBatch = false
                    this.examBatch()
                }else{
                    this.ensureCreateBatch = true
                    Message.error({message: res.message})
                }
            })
        },
        exportExamInfo (examId) {
            window.location.href="/imis/exam/srv/api/examinee/exportExcel/"+examId
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
        },
        //是否创建批次的确认弹框
        
    }
}
</script>
<style>
    .putDownTable{
       box-shadow : 0px 2px 16px -7px rgba(113,123,131,0.5);
    }
    .examBatchContainer{
        margin:0 22px 22px 30px;
    }

    /* 下拉table */
    .putDownTable>ul{
        text-align: left;
        padding:0;
        margin:0
    }
    .putDownTable>ul:first-child{
        background: #E5EFFE;
    }
    .putDownTable ul>li{
        width:21%;
        display:inline-block;
        text-align: center;
        font-size:14px;
        line-height:23px;
        padding:12px 0 12px 10px;
    }
    .putDownTable ul>li:first-child{
        width:17%;
    }
    .putDownTable ul>li:nth-child(4){
        width:19%
    }
    .putDownTable ul>li:nth-child(5){
        width:12%
    } 
    .putDownTable ul>li:last-child{
        width:5%;
    }
    .examBatchDetail{
        text-align: center;
        line-height:50px
    }
    .examBatchDetail span{
        display:inline-block;
        width:30%;
        text-align: center;
        font-size: 14px
    }
    .examBatchDetail span:first-child{
        width:20%;
    }
    .batchInfoBox{
        padding: 15px 3% 60px 3%;
        width:100%;
        position: relative;
        background:#fff;
        border-bottom: 1px solid #F4F6FA;
        border-top: 1px solid #F4F6FA;
    }
    .applyBtn{
        position:absolute;
        right:4%;
        bottom:20px;
    }
    .ConfirmCreateBatchDialog p{
        margin:8px 0;
    }
    .ConfirmCreateBatchDialog p>span{
        display: inline-block;
        width:40%
    }
    .ConfirmCreateBatchDialog p>span:first-child{
        margin-right:13%;
        margin-left:4%
    }
    .ConfirmCreateBatchDialog p.tip{
        color:red;
        margin:10px;

    }
    .contentBox {
        margin: 22px;
        background: #fff;
        box-shadow: 0 2px 16px -7px rgba(113,123,131,.5);
    }
    .applyNumberTip{
        margin:22px;
        background:#dfe7ff;
        text-align: center;
        border:1px solid #cadbff;
        line-height:40px
    }
    .btnBgColor{
        background:#cccccc !important
    }
</style>





