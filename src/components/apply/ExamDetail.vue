<template>
  <div class="applyInfos">
    <div class="applyInfo">
      <h3 class="infoTitle">医师考试信息</h3>
      <el-row class="infoContainer">
        <el-table
            :data="examDetailData"
            border
            style="width: 100%">
            <el-table-column
              prop="examId"
              width="120px"
              label="考试批次">
              <template slot-scope="scope">
                   <div v-if="!scope.row.examId">批次暂无</div>
                   <div v-if="scope.row.examId">{{scope.row.examId}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="institutionName"
              label="所属医院">
            </el-table-column>
            <el-table-column
              prop="professionalTitle"
              label="职称">
            </el-table-column>
            <el-table-column
              prop="level"
              label="级别">
              <template slot-scope="scope">
                   <div>{{scope.row.level | positionLevel}}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="duty"
              label="职责">
            </el-table-column> -->
            <el-table-column
              prop="idNo"
              width="300px"
              label="身份证号">
            </el-table-column>
            <el-table-column
              prop="score"
              label="分数">
              <template slot-scope="scope">
                   <div v-if="scope.row.score == null">尚未录入</div>
                   <div v-if="scope.row.score !== null">{{scope.row.score}}</div>
              </template>
            </el-table-column>
        </el-table>
         <!-- <p class="examBlue" @click="inputScore">点击此处去分数录入页面录入分数</p> -->
         <p  class="tips color4D" v-if="totleNum">总人数:{{totleNum}},  通过人数:{{passNum}},  未录入人数:{{noEnterSum}},  通过率:{{rate}}</p>
         <el-pagination
            v-if="totleNum && (totleNum > 10)"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>
<script>
import {ApplyListTypes, roleId, nodeNumber} from "../../utils/Constant"
import { findByInstitutionId, getRate} from '@/api/api.js'
import { getRoleId, getUserId, getNickName } from '@/utils/LocalStoragePerform.js'
import { SUCCESS_CODE, FAIL_CODE, ERR_CODE } from "@/utils/Constant";
import {Message} from 'element-ui'
export default {
  name:'ExamDetail',
  props:["applyUserId"],
  data:function(){
    return{
      currentPage:1,
      examParams:{
        data:{
          institutionId:this.applyUserId
        },
        pageNum:1,
        pageSize:10
      },
      examDetailData:[],
      total:0,
      passingRate:'',
      passingData:'',
      totleNum:'',
      noEnterSum:'',
      passNum:'',
      rate:''
    }
  },
  mounted(){
     this.getInitPage()
  },
  methods:{
    handleCurrentChange(currentPage){
      this.findByInstitutionId(currentPage)
    },
    handleSizeChange(){
    },
    getPassingRate() {
          let paramUrl = {
              institutionId:this.examParams.data.institutionId
          }
          getRate(paramUrl).then(res=>{
            if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return 
            }
            if(res &&  res.code === SUCCESS_CODE){
            this.passingData = res.data
            this.totleNum = res.data.totleNum
            this.noEnterSum = res.data.noEnterSum
            this.passNum = res.data.passNum
            this.rate = res.data.rate
            console.log(res,'什么状态考试情况')
           }
          })
   },
    getInitPage(){
       this.findByInstitutionId()
       this.getPassingRate()
    },
    findByInstitutionId(currentPage){
      this.examParams.pageNum = currentPage
      findByInstitutionId(this.examParams).then(res=>{
        if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return 
                }
                if(res &&  res.code === SUCCESS_CODE){
            console.log('考试列表',res)
            this.examDetailData = res.data.list
            this.total = res.data.total
                }
        
            // this.applyList = res.list
      })
    },
    inputScore(){
      sessionStorage.removeItem('routerPath')
      this.$router.push('/addScore')
      console.log('录入分数')
    }
  }
}
</script>
<style scoped>
.examBlue{
  text-align: right;
  color:#377DFF;
  font-size: 16px;
  cursor: pointer;
}
</style>
