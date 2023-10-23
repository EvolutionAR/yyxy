<template>
    <div>
        <div class="breadcrumbContainer">
            <BreadCrumb></BreadCrumb>
            <!-- <h1>机构人员管理</h1> -->
        </div>
        <div class="tableContainer tableQuickSearchContainer">
            <!-- <h3 class="infoTitle">快速搜索</h3> -->
            <el-form :model="getRosterParams" class="searchForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="机构名称">
                            <el-input
                            prefix-icon="el-icon-search"
                            :clearable="clearable"
                            v-model="getRosterParams.institutionName" 
                            placeholder="请输入机构名称"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="6">
                        <el-form-item label="职位">
                            <el-select class="position-select"
                            v-model="getRosterParams.position" 
                            placeholder="请选择职位">
                                <el-option label="全部" value=""></el-option>
                                <el-option 
                                v-for="(item,index) in personTypeList" 
                                :key="index"
                                :label="item.name"
                                :value="item.code"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="姓名">
                            <el-input
                            :clearable="clearable"
                            prefix-icon="el-icon-search"
                            v-model="getRosterParams.name" 
                            placeholder="请输入人员姓名"></el-input>
                        </el-form-item>
                    </el-col>
                   
                    <el-col :span="6">
                        <el-form-item label="证件号码">
                            <el-input
                            :clearable="clearable"
                            prefix-icon="el-icon-search"
                            v-model="getRosterParams.idNo" 
                            placeholder="请输入证件号码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                            <!-- <el-button type="default" @click="onRest">清空</el-button> -->
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table
            :data="rosterDataList" 
            style="width: 100%">
               <el-table-column
                    width="80"
                    type="index"
                    label="编号">
                </el-table-column>
                <el-table-column
                    width="220"
                    prop="institutionName"
                    label="所属医院">
                </el-table-column>
                <el-table-column
                    width="100"
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    width="80"
                    prop="sex"
                    label="性别">
                </el-table-column>
                
                <el-table-column
                    width="80"
                    prop="position"
                    label="职位">
                </el-table-column>
                <el-table-column
                    width="80"
                    prop="insPersonLevel"
                    label="级别">
                    <template slot-scope="scope">
                        <span>{{scope.row.level | positionLevel}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="150"
                    prop="idType"
                    label="证件类型">
                </el-table-column>
                <el-table-column
                    width="210"
                    prop="idNo"
                    label="证件号">
                </el-table-column>
                <el-table-column
                    prop="practisingCertificate"
                    label="执业证书号">
                </el-table-column>
                <!-- <el-table-column 
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                        type="text"
                        @click="goInsPersonDetail(scope.row)"
                        >查看</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <el-dialog title="人员信息" 
            width="550px"
            :append-to-body="true"
            :visible.sync="dialogFormVisible">
                <el-form  :model="personForm" class="dialogForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="姓名">
                                <el-input v-model="personForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="电话">
                                <el-input v-model="personForm.telphone" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="医院">
                                <el-select v-model="personForm.belonged" placeholder="请选择医院">
                                    <el-option label="医院111" value="shanghai"></el-option>
                                    <el-option label="医院222" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="科室">
                                <el-input v-model="personForm.depart" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="级别">
                                <el-input v-model="personForm.level" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="职位">
                                <el-input v-model="personForm.position" autocomplete="off"></el-input>
                            </el-form-item> 
                        </el-col>    
                    </el-row>
                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
            <el-pagination
                v-if="total>10"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="getRosterParams.pageBean.pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getRoster, getAllInstitution, getAllPersonType} from '@/api/api.js'
import { SUCCESS_CODE, FAIL_CODE,ERR_CODE } from '@/utils/Constant'
import BreadCrumb from '@/components/public/breadCrumb'
export default {
    name:"InsPersontitutionPersonList",
    components: {
        BreadCrumb
    },
    data:function(){
        return{
            personTypeList:[],
            institutionList:[],
            getRosterParams:{
                idNo:'',
                institutionName:'',
                name:'',
                position:'',
                pageBean:{
                    pageNum:1,
                    pageSize:10,
                }
            },
            total:0,
            rosterDataList:[],
            dialogFormVisible:false,
            personForm:{
                name:'童文杰',
                telphone:'1566998523',
                belonged:'日照人民医院',
                depart:'消化科',
                level:'中级',
                position:'医师'
            },
            clearable:true
        }
    },
    mounted() {
        this.getSelectList()
        this.getRosterList()
    },
    methods:{
        //获取机构下拉列表
        getAllInstitution() {
            getAllInstitution().then(res=>{
                if(res && res.code === FAIL_CODE){
                    this.$message({
                        message:res.message,
                        type:'error'
                    })
                }
                if(res && res.code === SUCCESS_CODE){
                    this.institutionList = res.data
                }
            })
        },
        //获取职位下拉列表
        getAllPersonType() {
            getAllPersonType().then(res=>{
                if(res && res.code === FAIL_CODE){
                    this.$message({
                        message:res.message,
                        type:'error'
                    })
                }
                if(res && res.code === SUCCESS_CODE){
                    this.personTypeList = res.data
                }
            })
        },
        getSelectList() {
            this.getAllInstitution()
            this.getAllPersonType()
        },
        //重置清空搜索条件
        onRest(){
            this.getRosterParams.pageBean.pageNum = 1
            this.getRosterParams.pageBean.pageSize = 10
            this.getRosterParams.institutionName = ''
            this.getRosterParams.position = ''
            this.getRosterParams.idNo = ''
            this.getRosterParams.name = ''
        },
        //查询数据
        getRosterList() {
            this.$loading.show()
            getRoster(this.getRosterParams).then(res=>{
                this.$loading.hide()
                if(res && res.code === FAIL_CODE){
                    this.$message({
                        message:res.message,
                        type:'error'
                    })
                }
                if(res && res.code === SUCCESS_CODE){
                    this.rosterDataList = res.data.list
                    this.total = res.data.total
                }
                
            })
        },
        goInsPersonDetail(row){
            this.dialogFormVisible = true;
        },
        onSubmit(){
            console.log(this.getRosterParams)
            this.getRosterParams.pageBean.pageNum = 1
            this.total = 0
            this.getRosterList()
        },
        handleSizeChange(){

        },
        handleCurrentChange(val){
            this.getRosterParams.pageBean.pageNum = val
            this.getRosterList()
        }
    }
}
</script>
<style scoped>

.searchForm .el-button {
    float: left;
}
.position-select{
    width: 100%;
}
</style>
