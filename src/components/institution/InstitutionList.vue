<template>
    <div>
        <div class="breadcrumbContainer">
            <BreadCrumb></BreadCrumb>
            <!-- <h1>机构信息管理</h1> -->
        </div>
        <div class="tableContainer">
            <el-form :inline="true" :model="searchForm" class="searchForm">
                <el-form-item label="医院名称">
                    <el-input 
                    prefix-icon="el-icon-search"
                    :clearable="clearable"
                    v-model="searchForm.name" 
                    placeholder="搜索医院名称快速查询"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <!-- <el-button type="default" @click="onRest">清空</el-button> -->
                </el-form-item>
            </el-form>
            <el-table
            :data="institutionList" 
            style="width: 100%">
               <el-table-column
                    prop="insID"
                    type="index"
                    width="120"
                    label="编号">
                </el-table-column>
                <el-table-column
                    prop="institutionName"
                    label="医院名称">
                </el-table-column>
                <el-table-column
                    prop="staffNumber"
                    label="人员">
                </el-table-column>
                <el-table-column
                    prop="identityNames"
                    label="定点类型">
                </el-table-column>
                <el-table-column
                    width="200"
                    prop="address"
                    label="地址">
                </el-table-column>
                <el-table-column 
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                        type="text"
                        @click="goInsDetail(scope.row)"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-if="total>10"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { getApplyedInstitution } from '@/api/api'
import BreadCrumb from '@/components/public/breadCrumb'
import {
    SUCCESS_CODE,
    FAIL_CODE,
    ERR_CODE
} from "../../utils/Constant"
import { Message } from 'element-ui'
export default {
    name:'InstitutionList',
    components: {
        BreadCrumb
    },
    data:function(){
        return{
            searchForm:{
                name:""
            },
            institutionList:[
            ],
            currentPage3:1,
            pageSize:10,
            total:100,
            clearable:true
        }
    },
    mounted(){
        this.searchInstitution(1)
    },
    methods:{
        onSubmit:function(){
            this.currentPage3 = 1
            this.searchInstitution(1)
        },
        onRest:function(){
            this.searchForm.name=""
        },
        searchInstitution(pageNum = 1){
            let params = {
                institutionName:this.searchForm.name,
                pageNum:pageNum, 
                pageSize:this.pageSize
            }
            this.$loading.show()
            getApplyedInstitution(params).then(res=>{
                this.$loading.hide()
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return 
                }
                if(res &&  res.code === SUCCESS_CODE){
                    this.total = res.data.total || 0
                    this.institutionList = res.data.list || []
                }
               
            })
        },
        handleCurrentChange(val) {
            if(!val || typeof val != 'number'){
                return
            }
            this.searchInstitution(val)
        },
        goInsDetail(item){
            console.log('item',item)
            if(!item.institutionId){
                return 
            }
            this.$router.push({
                path:`/institutionBaseInfo/${item.institutionId}`
                })
            // this.$router.push("/institutionBaseInfo/"+item.institutionId)
        }
    }
}
</script>
<style scoped>
.searchForm{
    margin-left: 30px
}
</style>
