<template>
    <div>
        <div class="breadcrumbContainer">
            <BreadCrumb></BreadCrumb>
        </div>
        <div class="tableContainer">
            <h4 v-if="applicationProcess !== '全部'">待处理任务列表</h4>
            <el-form class="queryApplyList" v-if="applicationProcess == '全部'" :inline="true" >
                <el-form-item label="处理状态">
                    <el-select 
                    v-model="operationTitle" 
                    placeholder="请选择处理状态">
                        <el-option 
                        v-for="(item,index) in processingList"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryApplyList">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
            :data="applyList"
            style="width: 100%"
            @sort-change="sortApplyList"
            >
               <el-table-column
                    type="index"
                    width="120"
                    label="编号">
                </el-table-column>
                <el-table-column
                    width="200"
                    prop="applyUserName"
                    label="医院名称">
                </el-table-column>
                <el-table-column
                    prop="flowName"
                    width="200"
                    label="申请类型">
                </el-table-column>
                <el-table-column
                    prop="currentNodeName"
                    label="状态">
                </el-table-column>
                <el-table-column
                    width="200"
                    prop="endStatus"
                    label="处理状态">
                    <template slot-scope="scope">
                       <div style="color:#2BD37B" v-if="scope.row.endStatus == 'end_success'">{{scope.row.endStatus | filtersEndStatus}}</div>
                       <div style="color:#377DFF" v-if="scope.row.endStatus == 'process'">{{scope.row.endStatus | filtersEndStatus}}</div>
                       <div style="color:#F56C6C" v-if="scope.row.endStatus == 'end_false'">{{scope.row.endStatus | filtersEndStatus}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="申请时间"
                    sortable="custom"
                    :sort-orders="sortOrders"
                    >
                    <template slot-scope="scope">
                        <span>{{scope.row.applyTime | timeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                        type="text"
                        v-if="scope.row.endStatus == 'process'"
                        @click="goApplyDetail(scope.row.flowId,scope.row.applyTaskId)"
                        >处理</el-button>
                        <el-button
                        v-if="scope.row.endStatus !== 'process'"
                        type="text"
                        @click="goApplyDetail(scope.row.flowId,scope.row.applyTaskId)"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            :hide-on-single-page="isHideOn"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        </div>
    </div>
</template>
<script>
const ApplicationProcess = {
   All:'全部',
   FirstTrial:'材料初审',
   Review:'复审（现场评估）',
   PhysicianExamination: '医师考试',
   InfoPublicity: '信息公示',
   AgreementSigning: '协议签订'
}
import {ApplyListTypes, roleId, nodeNumber} from "../../utils/Constant"
import { getToDoList } from '@/api/api.js'
import { getRoleId, getUserId, getNickName } from '@/utils/LocalStoragePerform.js'
import { SUCCESS_CODE,
  FAIL_CODE,
  ERR_CODE
} from '@/utils/Constant'
import BreadCrumb from '@/components/public/breadCrumb'
export default {
    name: 'ApplyList',
    components: {
        BreadCrumb
    },
    data: function(){
        return{
            sortOrders:[
                "ascending",
                "descending"
            ],
            processingList:[
                {
                value:'',
                label:'全部'
                },
                {
                value:'process',
                label:'进行中'
                },
                {
                value:'end_success',
                label:'已成功'
                },
                {
                value:'end_false',
                label:'已失败'
                }
            ],
            applicationProcess:'',
            isHideOn:true,
            applyList:[],
            applyListType:'',
            applyListParams:{
                data:{
                    applyUserName:'',
                    endStatus:'',//参数为空查所有
                    flowId: "",
                    nodeId: "",
                    processRoleId: roleId,
                    descFlag:true
                },
                pageNum:1,
                pageSize:10,
            },
            total:0,
            currentPage:1,
            operationTitle:'',
        }
    },
    watch: {
        '$route' (to, from){
             this.applicationProcess = ApplicationProcess[to.name]
             this.getInitPage(to.name)
             if(to.name !== 'All'){
               this.applyListParams.data.endStatus = 'process'
               this.operationTitle = 'process'
            } else {
                this.applyListParams.data.endStatus = ''
                this.operationTitle = ''
            }
        }
    },
    mounted(){
        this.getApplyListTypeFromRouter()
        this.applicationProcess = ApplicationProcess[this.$route.name]
        this.getInitPage(this.$route.name)
    },
    filters:{
        filtersEndStatus(val){
            switch(val){
              case 'end_success': return '已成功';
              case 'process': return "进行中";
              case 'end_false': return '已失败';
              default: return
          }
        }
    },
    methods:{
       sortApplyList(column){
           if(column.order == 'ascending'){
               this.applyListParams.data.descFlag = false
               this.getToDoList()
           } else {
               this.applyListParams.data.descFlag = true
               this.getToDoList()
           }
       },
       queryApplyList(){
          this.currentPage = 1
          this.applyListParams.pageNum = 1
          this.applyListParams.data.endStatus = this.operationTitle
          this.getToDoList()
       },
       handleCurrentChange(pageNum){
           this.applyListParams.pageNum = pageNum
           this.getToDoList()
       },
       getInitPage(nodeName){
            if(nodeName !== 'All'){
                this.applyListParams.data.endStatus = 'process'
                this.operationTitle = 'process'
            } else {
                this.applyListParams.data.endStatus = ''
                this.operationTitle = ''
            }
            if(this.$route.query.type && this.$route.query.type == 'process'){
                this.applyListParams.data.endStatus = 'process'
                this.operationTitle = this.$route.query.type
            }
           this.applyListParams.data.nodeId = nodeNumber[nodeName]
           this.getToDoList()
       },
       getApplyListTypeFromRouter:function(){
           this.applyListType = this.$route.params.type;
       },
       goApplyDetail:function(flowId,applyTaskId){
           this.$router.push({
               path:'/apply/medicalApplyDetail',
               query:{
                   flowId:flowId,
                   applyTaskId,applyTaskId
               }
           })
       },
       getToDoList(){
           this.$loading.show()
            getToDoList(this.applyListParams).then(res=>{
                 this.$loading.hide()
                if (res && res.code === ERR_CODE) {
                    Message.error({ message: '系统异常，请稍后再试'+res.code });
                    return;
                }
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                    this.applyList = res.data.list
                    this.total = res.data.total
                }

             })
       }
    }
}
</script>
<style scoped>
@import "../../assets/css/moudle.css";
.tableContainer h4{
    padding-top: 20px;
    margin-left: 30px;
    padding-bottom: 20px;
}
/* .tableContainer th div{
    font-size: 14px;
}
.tableContainer td div{
    font-size: 14px;
} */
.queryApplyList{
    padding: 22px 40px 0px 30px
} 
.queryApplyList button{
    width: 100px;
    height: 38px;
} 
.tableContainer .el-form-item__label{
    font-size: 16px
}
</style>
