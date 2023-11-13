<template>
  <div>
    <div class="breadcrumbContainer">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="applyDetailContainer applybackground">
      <div class="applyInfos primary">
        <div class="applyInfo">
          <h3 class="infoTitle">基本信息</h3>
          <el-row class="infoContainer formInfoContainer">
            <el-form :inline="true">
              <el-col :span="6">
                <el-form-item label="学员姓名">
                  <el-input
                    :disabled="isDisabled"
                    v-model="institutionBasic.institutionName"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="考试难度">
                  <el-input
                    :disabled="isDisabled"
                    v-model="institutionBasic.address"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="开始时间">
                  <el-input
                    :disabled="isDisabled"
                    v-model="institutionBasic.legalRepresentative"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <div class="applyInfo">
          <!-- todo -->
          <h3 class="infoTitle">后台日志记录</h3>
          <el-row class="infoContainer">
            <el-table border :data="healthPersonnelInfo" style="width: 100%">
              <el-table-column prop="category" label="时间" width="180">
              </el-table-column>
              <el-table-column prop="amount" label="内容"> </el-table-column>
              <el-table-column prop="senior" label="错误类型" width="180">
              </el-table-column>
              <el-table-column prop="intermediate" label="错误详情">
              </el-table-column>
              <el-table-column prop="junior" label="扣分" width="180">
              </el-table-column>
              <el-table-column prop="junior" label="语音文件" width="180">
              </el-table-column>
            </el-table>
          </el-row>
        </div>
        <div class="applyInfo">
          <h3 class="infoTitle">能力评测图表</h3>
          <el-row class="infoContainer formInfoContainer">
            <el-form :inline="true">
              <el-col :span="12">
                <div
                  id="myChart1"
                  :style="{ width: '100%', height: '500px' }"
                />
              </el-col>
              <el-col :span="12">
                <div
                  id="myChart2"
                  :style="{ width: '100%', height: '500px' }"
                />
              </el-col>
            </el-form>
          </el-row>
          <!-- todo -->
        </div>
        <div class="applyInfo">
          <h3 class="infoTitle">评定等级</h3>
          <!-- todo -->
          <el-row class="infoContainer"> </el-row>
        </div>
        <div class="applyInfo">
          <h3 class="infoTitle">综合评定</h3>
          <el-row class="infoContainer"> </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  OwnerShipTypes,
  OrganizationTypes,
  BusinessTypes,
  ServiceObjs,
  OutpatientDepartments,
  ApplyTypes,
  SexTypes,
  licenseLongPresent,
  fullPartTimeType,
  Credentials,
  staffListExcel,
  closeAccountEquipmnet,
  SUCCESS_CODE,
  FAIL_CODE,
  ERR_CODE
} from "../../utils/Constant";
import {
  getInstitutionBasic,
  getDepartment,
  getEquipmentList,
  getIncomeTrance,
  getMedicalInsurance,
  getSocialInsurance,
  getMedicalList,
  getAllInpatientDepartment,
  statisticsSumPersonByTitle,
  getAllOutpatientDepartment,
  getAllRisk,
  getAllAssessmentLevel,
  getAllOwnership,
  getAllManagement
} from "@/api/api";
import BreadCrumb from "@/components/public/breadCrumb";
export default {
  name: "InstitutionBaseInfo",
  components: {
    BreadCrumb
  },
  data: function() {
    return {
      institutionId: "TK001",
      ownerShipTypes: OwnerShipTypes,
      organizationTypes: OrganizationTypes,
      businessTypes: BusinessTypes,
      serviceObjs: ServiceObjs,
      applyTypes: ApplyTypes,
      sexTypes: SexTypes,
      licenseLongPresent: licenseLongPresent,
      fullPartTimeType: fullPartTimeType,
      credentials: Credentials,
      isDisabled: true,
      dialogInDepart: false,
      staffListExcel: staffListExcel,
      closeAccountEquipmnet: closeAccountEquipmnet,
      allAssessmentLevel: [],
      healthPersonnelInfo: [
        {
          category: "医师",
          amount: 0,
          senior: 0,
          intermediate: 0,
          junior: 0
        },
        {
          category: "护士",
          amount: 0,
          senior: 0,
          intermediate: 0,
          junior: 0
        },
        {
          category: "医技人员",
          amount: 0,
          senior: 0,
          intermediate: 0,
          junior: 0
        },
        {
          category: "合计",
          amount: 0,
          senior: 0,
          intermediate: 0,
          junior: 0
        }
      ],
      inDepartmentData: [],
      //-----------------------------------------------------
      institutionBasic: {
        actualBedNumber: "", //当前实际床位数量
        address: "", //单位地址
        assessmentLevel: "", //医疗机构评审等级
        authorizedBedNumber: "", //编制床位数量
        bank: "", //开户银行
        bankAccount: "", //银行账号
        businessType: "", //经营性质
        email: "", //邮箱
        employeeNumber: "", //合同员工人数
        institutionType: "", //医疗机构类别
        insuredBeginDate: "", //参保时间
        legalRepresentative: "", //法人代表
        legalRepresentativePhone: "", //法人代表联系电话
        linkman: "", //联系人
        linkmanPhone: "", //联系人电话
        ownership: "", //所有制形式
        longPresent: true,
        registrationBeginDate: "", //执业许可证登记号有效开始时间
        registrationEndDate: "", //执业许可证登记号有效结束时间
        registrationNumber: "", //执业许可证登记号
        // "rehabilitationArea": '',//康复用房面积
        // "rehabilitationBedNumber": "",//康复床位数
        serviceClient: "", //服务对象
        settleEquipment: "", //是否具备即使结算设备
        ssContributionAccount: "", //社保缴费账号
        staffNumber: "", //职工总人数
        //picture
        legalIDCardBackUrl: "",
        legalIDCardUrl: "",
        positiveLicenseUrl: ""
      },
      socialInsurance: [],
      //这里主要是用于回显的数组
      checkedInsured: [],
      checkedInDepartment: [],
      checkedOutDepartment: [],
      department: {
        inpatientDepartmentList: [
          //住院科室
        ],
        outpatientDepartmentList: [
          //门诊科室
        ]
      },
      equipmentList: [],
      incomeTrace: [
        {
          avgInpatientDays: "",
          avgPeopleInpatientIncome: "",
          avgTimeInpatientIncome: "",
          avgTimeOutpatientIncome: "",
          inpatientTimes: "",
          outpatientTimes: "",
          rateOfBedUsing: "",
          remarks: "",
          traceYear: "2018"
        }
      ],
      medicalInsuranceOfficeList: [
        //机构医保办人员
      ],
      nurseList: [],
      paramedicList: [
        //查询机构医技人员列表
      ],
      physicianList: [
        //医师人员列表
      ],
      // dictionary
      allInpatientDepartment: [],
      allOutpatientDepartment: [],
      allRisk: []
    };
  },
  methods: {
    drawLine() {
      const myChart = this.$echarts.init(document.getElementById("myChart1"));
      myChart.setOption({
        title: [
          {
            text: "雷达图",
            left: "center"
          }
        ],
        polar: {
          radius: [30, "70%"]
        },
        radiusAxis: {
          max: 4
        },
        angleAxis: {
          type: "category",
          data: ["a", "b", "c", "d"],
          startAngle: 75
        },
        tooltip: {},
        series: {
          type: "bar",
          data: [2, 1.2, 2.4, 3.6],
          coordinateSystem: "polar",
          label: {
            show: true,
            position: "middle",
            formatter: "{b}: {c}"
          }
        },
        backgroundColor: "#fff",
        animation: false
      });
      // 基于准备好的dom，初始化echarts实例
      var myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      myChart2.setOption({
        title: {
          text: "柱状图"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  },
  mounted() {
    this.drawLine();
  }
};
</script>
<style scoped>
.applyInfos {
  overflow: hidden;
}
/* .applyInfos.primary .el-form-item{
        margin-bottom:0px;
} */
</style>
