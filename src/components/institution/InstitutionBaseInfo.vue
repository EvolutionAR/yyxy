<template>
<div>
    <div class="breadcrumbContainer">
        <BreadCrumb></BreadCrumb>
        <!-- <h1>{{institutionBasic.institutionName}}
            <span>申请时间：2019-06-30 10:02</span>
        </h1> -->
    </div>
    <div class="applyDetailContainer applybackground">
        <div class="applyInfos primary">
            <div class="applyInfo">
                <h3 class="infoTitle">基本信息</h3>
                <el-row class="infoContainer formInfoContainer">
                    <el-form :inline="true">
                        <el-col :span="6">
                            <el-form-item label="医院名称">
                                <el-input :disabled="isDisabled" v-model="institutionBasic.institutionName" placeholder="请输入医院名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="医院地址">
                                <el-input :disabled="isDisabled" v-model="institutionBasic.address" placeholder="请输入医院地址"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="法人名称（负责人）">
                                <el-input :disabled="isDisabled" v-model="institutionBasic.legalRepresentative" placeholder="请输入法人名称（负责人）"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="电话">
                                <el-input :disabled="isDisabled" v-model="institutionBasic.legalRepresentativePhone" placeholder="请输入电话"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系人">
                                <el-input :disabled="isDisabled" v-model="institutionBasic.linkman" placeholder="请输入联系人名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系电话">
                                <el-input :disabled="isDisabled" v-model="institutionBasic.linkmanPhone" placeholder="请输入联系人电话"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="单位电子邮箱">
                                <el-input :disabled="isDisabled" v-model="institutionBasic.email" placeholder="请输入单位电子邮箱）"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="开户银行">
                                <el-input :disabled="isDisabled" v-model="institutionBasic.bank" placeholder="请输入开户银行"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="开户行账号">
                                <el-input :disabled="isDisabled" v-model="institutionBasic.bankAccount" placeholder="请输入开户行账号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="职工总人数">
                                <el-input :disabled="isDisabled" v-model.number="institutionBasic.staffNumber" placeholder="请输入职工总人数"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="签订劳动合同人数">
                                <el-input :disabled="isDisabled" v-model.number="institutionBasic.employeeNumber" placeholder="请输入签订劳动合同人数"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>
            </div>
            <div class="applyInfo">
                <h3 class="infoTitle">资格情况</h3>
                <el-row class="infoContainer formInfoContainer">
                    <el-form :inline="true" >
                        <el-col :span="6">
                            <el-form-item label="执业许可证登记号">
                                <el-input :disabled="isDisabled" v-model="institutionBasic.registrationNumber" placeholder="请输入执业许可证登记号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="所有制形式">
                                <el-select :disabled="isDisabled" v-model="institutionBasic.ownership" placeholder="请选择医院名称所有制形式">
                                    <el-option
                                    v-for="(item, index) in ownerShipTypes"
                                    :key="index"
                                    :label="item.ownershipName"
                                    :value="item.ownershipCode">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="医疗机构类型">
                                <el-select :disabled="isDisabled" v-model="institutionBasic.institutionType" placeholder="请选择医疗机构类型">
                                    <el-option
                                    v-for="(item,index) in organizationTypes"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="经营类型">
                                <el-select :disabled="isDisabled" v-model="institutionBasic.businessType" placeholder="请选择经营类型">
                                    <el-option
                                    v-for="(item, index) in businessTypes"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="编制床位">
                                <el-input :disabled="isDisabled" v-model.number="institutionBasic.authorizedBedNumber"  placeholder="请输入编制床位"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="实际床位">
                                <el-input :disabled="isDisabled" v-model.number="institutionBasic.actualBedNumber" placeholder="请输入实际床位"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="6">
                            <el-form-item label="康复床位">
                                <el-input :disabled="isDisabled" v-model.number="institutionBasic.rehabilitationBedNumber"  placeholder="请输入编制床位"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="康复面积">
                                <el-input :disabled="isDisabled" v-model.number="institutionBasic.rehabilitationArea" placeholder="请输入实际床位"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="6">
                            <el-form-item label="医疗机构评审等级">
                                <el-select :disabled="isDisabled" v-model="institutionBasic.assessmentLevel" placeholder="请选择医疗评审等级">
                                    <el-option
                                    v-for="(item,index) in allAssessmentLevel"
                                    :key="index"
                                    :label="item.levelName"
                                    :value="item.levelCode">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="营业执照是否长期有效" prop="longPresent">
                                <el-select :disabled="isDisabled" v-model="institutionBasic.longPresent" placeholder="请选择">
                                    <el-option
                                    v-for="(item, index) in licenseLongPresent"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="营业执照有效起始时间">
                                <el-input disabled v-model="institutionBasic.registrationBeginDate"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-show="!institutionBasic.longPresent">
                            <el-form-item label="营业执照有效终止时间">
                                <el-input disabled v-model="institutionBasic.registrationEndDate"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>
            </div>
            <div class="applyInfo">
                <h3 class="infoTitle">参保情况</h3>
                <!-- todo -->
                <el-row class="infoContainer formInfoContainer">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-col :span="6">
                            <el-form-item label="社会缴费账号号码">
                                <el-input :disabled="isDisabled" v-model="institutionBasic.ssContributionAccount" placeholder="请输入医院名称所有制形式"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="参保时间">
                                <!-- <el-date-picker
                                    :disabled="isDisabled"
                                    v-model="institutionBasic.insuredBeginDate"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="请选择参保时间"
                                    >
                                </el-date-picker> -->
                                <el-input :disabled="isDisabled" v-model="institutionBasic.insuredBeginDate"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="是否有医疗保险联网及时结算设备">
                                <!-- <el-input :disabled="isDisabled" v-model="institutionBasic.settleEquipment" placeholder="请输入医疗保险联网及时结算设备"></el-input> -->
                                <el-select  :disabled="isDisabled" v-model="institutionBasic.settleEquipment" placeholder="">
                                    <el-option v-for="(item, index) in closeAccountEquipmnet"
                                    :key="index"
                                    :label="item.text"
                                    :value="item.value"></el-option>
                                    </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="6">
                            <el-form-item label="申请定点类型">
                                <el-select :disabled="isDisabled" v-model="insuredInfoForm.applyType" placeholder="请选择申请定点类型">
                                    <el-option
                                    v-for="(item, index) in applyTypes"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                        <!-- todo 页面设计调整 -->
                        <el-col :span="24" style="text-align:left;">
                            <el-form-item label="已参加险种">
                                <el-checkbox-group :disabled="isDisabled" v-model="checkedInsured">
                                    <el-checkbox :label="riskItem.riskId" v-for="(riskItem, index) in allRisk" :key="index"  @change="changeInsurance(riskItem,$event)">{{riskItem.riskName}}</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-for="(item,index) in socialInsurance" :key="index">
                            <el-form-item :label="`${item.riskName}（人数）`">
                                <el-input :disabled="isDisabled" v-model.number="item.insureNumber" :placeholder="`请输入${item.riskName}（人数）`"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>
                </el-row>
            </div>
            <div class="applyInfo" v-if="isDisabled">
                <!-- todo -->
                <h3 class="infoTitle">卫生技术人员</h3>
                <el-row class="infoContainer">
                    <el-table
                    border
                    :span-method="arraySpanMethod"
                    :data="healthPersonnelInfo"
                    style="width: 100%">
                        <el-table-column
                            prop="category"
                            label="人员类别"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="总人数"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="senior"
                            label="高级职称">
                        </el-table-column>
                        <el-table-column
                            prop="intermediate"
                            label="中级职称">
                        </el-table-column>
                        <el-table-column
                            prop="junior"
                            label="初级职称"
                            width="180">
                        </el-table-column>
                    </el-table>
                </el-row>
            </div>
            <div class="applyInfo">
                <h3 class="infoTitle">科室设置</h3>
                <!-- todo -->
                <el-row class="infoContainer">
                    <el-form>
                        <h4>门诊科室</h4>
                        <el-row class="pd15">
                            <el-checkbox-group v-model="checkedOutDepartment" @change="changeOutDepartment">
                                <!-- <el-checkbox v-for="outDepart in allOutpatientDepartment" :label="outDepart.departmentId" :key="outDepart.departmentId" :disabled="isDisabled">{{outDepart.departmentName}}</el-checkbox>
                             -->
                                <el-col :span="3" v-for="(outDepart,outDepartIndex) in allOutpatientDepartment" :key="outDepartIndex">
                                    <el-checkbox :label="outDepart.departmentId" :key="outDepart.departmentId" :disabled="isDisabled">{{outDepart.departmentName}}</el-checkbox>
                                </el-col>
                            </el-checkbox-group>
                        </el-row>
                        <h4>住院科室<i class="el-icon-circle-plus addIcon" @click="dialogInDepart = true" v-if="!isDisabled"></i></h4>
                        <el-dialog width="700px" title="请勾选您要添加的住院科室" :visible.sync="dialogInDepart"
                        :append-to-body="true" center>
                                <el-checkbox-group v-model="checkedInDepartment" >
                                    <el-checkbox v-for="inDepart in allInpatientDepartment" @change="changeInDepartment(inDepart,$event)" :label="inDepart.departmentId" :key="inDepart.departmentId">{{inDepart.departmentName}}</el-checkbox>
                                </el-checkbox-group>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogInDepart = false">取 消</el-button>
                                <el-button type="primary" @click="addDepartment">确 定</el-button>
                            </div>
                        </el-dialog>
                        <el-row class="pd15">
                            <el-table
                            border
                            :data="inDepartmentData"
                            style="width: 100%">
                                <el-table-column
                                    prop="departName_0"
                                    label="科室">
                                </el-table-column>
                                <el-table-column
                                    prop="beds_0"
                                    label="床位数">
                                    <template slot-scope="scope">
                                        <span v-if="isDisabled">{{ scope.row.beds_0 }}</span>
                                        <el-input v-if="!isDisabled" v-model.number="scope.row.beds_0" @change="changeBedsNum(scope.row.departId_0,scope.row.beds_0)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="departName_1"
                                    label="科室">
                                </el-table-column>
                                <el-table-column
                                    prop="beds_1"
                                    label="床位数">
                                    <template slot-scope="scope" v-if="scope.row.hasOwnProperty('departName_1')">
                                        <span v-if="isDisabled">{{ scope.row.beds_1 }}</span>
                                        <el-input v-if="!isDisabled" v-model.number="scope.row.beds_1"  @change="changeBedsNum(scope.row.departId_1,scope.row.beds_1)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="departName_2"
                                    label="科室">
                                </el-table-column>
                                <el-table-column
                                    prop="beds_2"
                                    label="床位数">
                                    <template slot-scope="scope" v-if="scope.row.hasOwnProperty('departName_2')">
                                        <span v-if="isDisabled">{{ scope.row.beds_2 }}</span>
                                        <el-input v-if="!isDisabled" v-model.number="scope.row.beds_2" @change="changeBedsNum(scope.row.departId_2,scope.row.beds_2)"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="departName_3"
                                    label="科室">
                                </el-table-column>
                                <el-table-column
                                    prop="beds_3"
                                    label="床位数">
                                    <template slot-scope="scope" v-if="scope.row.hasOwnProperty('departName_3')">
                                        <span v-if="isDisabled">{{ scope.row.beds_3 }}</span>
                                        <el-input v-if="!isDisabled" v-model.number="scope.row.beds_3"  @change="changeBedsNum(scope.row.departId_3,scope.row.beds_3)"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-form>
                </el-row>
            </div>
            <div class="applyInfo">
                <h3 class="infoTitle">大型医疗器械清单
                    <el-button class="infoTitleRightBtn" type="primary" size="small" v-if="!isDisabled"
                    @click="addEquipmentItem"
                    >添加</el-button>
                </h3>
                <el-row class="infoContainer">
                    <el-table
                        :data="equipmentList"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="deviceName"
                            label="设备名称">
                            <template slot-scope="scope">
                                <span v-if="isDisabled">{{ scope.row.equipmentName }}</span>
                                <el-input v-if="!isDisabled" v-model="scope.row.equipmentName"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="specification"
                            label="规格型号">
                            <template slot-scope="scope">
                                <span v-if="isDisabled">{{ scope.row.specification }}</span>
                                <el-input v-if="!isDisabled" v-model="scope.row.specification"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="proStandards"
                            label="产品标准">
                            <template slot-scope="scope">
                                <span v-if="isDisabled">{{ scope.row.productStandard}}</span>
                                <el-input v-if="!isDisabled" v-model="scope.row.productStandard"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="factory"
                            label="生产厂家">
                            <template slot-scope="scope">
                                <span v-if="isDisabled">{{ scope.row.manufacturer }}</span>
                                <el-input v-if="!isDisabled" v-model="scope.row.manufacturer"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="价格（万元）">
                            <template slot-scope="scope">
                                <span v-if="isDisabled">{{ scope.row.purchasePrice }}</span>
                                <el-input v-if="!isDisabled" v-model.number="scope.row.purchasePrice"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="enablationTime"
                            label="启用时间">
                            <template slot-scope="scope">
                                 <span v-if="isDisabled">{{ scope.row.startUsingDate }}</span>
                                <!--<el-input v-if="!isDisabled" v-model="scope.row.startUsingDate"></el-input> -->
                                <!-- <el-date-picker
                                    :disabled="isDisabled"
                                    v-model="scope.row.startUsingDate"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="请选择启用时间"
                                    >
                                </el-date-picker> -->
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="feeStandards"
                            label="收费标准(元/次)">
                            <template slot-scope="scope">
                                <span v-if="isDisabled">{{ scope.row.chargingPrice }}</span>
                                <el-input v-if="!isDisabled" v-model="scope.row.chargingPrice"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        width="80">
                        <template slot-scope="scope">
                            <div class="deleteBtn">
                                <i class="el-icon-delete" @click="deleteEquipmentItem(scope.$index)" v-if="!isDisabled"></i>
                            </div>
                        </template>
                        </el-table-column>
                    </el-table>
                </el-row>
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
} from "../../utils/Constant"
import { getAccountInfo, getUserId } from '@/utils/LocalStoragePerform'
import { judgeFileType, addArrayOption, Sum } from '@/utils/commonTool'
import { getInstitutionBasic,getDepartment,getEquipmentList,getIncomeTrance,getMedicalInsurance,getSocialInsurance,
         getMedicalList, getAllInpatientDepartment,statisticsSumPersonByTitle, getAllOutpatientDepartment, getAllRisk, getAllAssessmentLevel, getAllOwnership,getAllManagement,
} from '@/api/api'
import { Form, Message } from 'element-ui'; 
import BreadCrumb from '@/components/public/breadCrumb'
const  initAllRisk=(allRisk)=>{
    return addArrayOption(allRisk, 'insureNumber')
}
const initInpatientDepartmentList=(inpatientDepartmentList)=>{
    return addArrayOption(inpatientDepartmentList, 'bedNumber')
}
const createInDepartmentData=(data)=>{
    if(!data|| data.length==0){
        return data
    }
    let inDepartmentData=[]
    let length=Math.ceil(data.length/4)
    let dataIndex=0
    for(let i=0;i<length;i++){
        let obj={}
        for(let j=0;j<4;j++){
            if(!data || data.length==dataIndex){
                break
            }
            obj["departId_"+j]=data[dataIndex].departmentId || ""
            obj["departName_"+j]=data[dataIndex].departmentName || ""
            obj["beds_"+j]=data[dataIndex].bedNumber || ""
            dataIndex++
        }
        inDepartmentData[i]=obj

    }
    return inDepartmentData
}
export default {
    name: 'InstitutionBaseInfo',
    components: {
        BreadCrumb
    },
    data: function () {
      return {
        institutionId:'TK001',
        ownerShipTypes: OwnerShipTypes,
        organizationTypes: OrganizationTypes,
        businessTypes: BusinessTypes,
        serviceObjs: ServiceObjs,
        applyTypes: ApplyTypes,
        sexTypes:SexTypes,
        licenseLongPresent:licenseLongPresent,
        fullPartTimeType:fullPartTimeType,
        credentials:Credentials,
        isDisabled:true,
        dialogInDepart:false,
        staffListExcel:staffListExcel,
        closeAccountEquipmnet:closeAccountEquipmnet,
        allAssessmentLevel:[],
        healthPersonnelInfo:[
            {
                category: '医师',
                amount: 0,
                senior: 0,
                intermediate:0,
                junior:0
            }, {
                category: '护士',
                amount: 0,
                senior: 0,
                intermediate:0,
                junior:0
            }, {
                category: '医技人员',
                amount: 0,
                senior: 0,
                intermediate:0,
                junior:0
            }, {
                category: '合计',
                amount: 0,
                senior: 0,
                intermediate:0,
                junior:0
            },
            {
                category: '按医疗机构基本标准配置人数',
                amount: 0,
                senior: '',
                intermediate:'',
                junior:''
            }
        ],
        inDepartmentData:[
        ],
        //-----------------------------------------------------
        institutionBasic:{
            "actualBedNumber": "",//当前实际床位数量
            "address": "",//单位地址
            "assessmentLevel": "",//医疗机构评审等级
            "authorizedBedNumber": "",//编制床位数量
            "bank": "",//开户银行
            "bankAccount": "",//银行账号
            "businessType": "",//经营性质
            "email": "",//邮箱
            "employeeNumber": "",//合同员工人数
            "institutionType": "",//医疗机构类别
            "insuredBeginDate": "",//参保时间
            "legalRepresentative": "",//法人代表
            "legalRepresentativePhone": "",//法人代表联系电话
            "linkman": "",//联系人
            "linkmanPhone": "",//联系人电话
            "ownership": "",//所有制形式
            "longPresent":true,
            "registrationBeginDate": "",//执业许可证登记号有效开始时间
            "registrationEndDate": "",//执业许可证登记号有效结束时间
            "registrationNumber": "",//执业许可证登记号
            // "rehabilitationArea": '',//康复用房面积
            // "rehabilitationBedNumber": "",//康复床位数
            "serviceClient": "",//服务对象
            "settleEquipment": "",//是否具备即使结算设备
            "ssContributionAccount": "",//社保缴费账号
            "staffNumber": "",//职工总人数
            //picture
            "legalIDCardBackUrl": "",
            "legalIDCardUrl": "",
            "positiveLicenseUrl": ""

        },
        socialInsurance:[
        ],
        //这里主要是用于回显的数组
        checkedInsured:[],
        checkedInDepartment:[],
        checkedOutDepartment:[],
        department:{
            "inpatientDepartmentList": [//住院科室
            ],
            "outpatientDepartmentList": [//门诊科室
            ]
        },
        equipmentList:[
        ],
        incomeTrace:[{
            avgInpatientDays:'',
            avgPeopleInpatientIncome:'',
            avgTimeInpatientIncome:'',
            avgTimeOutpatientIncome:'',
            inpatientTimes:'',
            outpatientTimes:'',
            rateOfBedUsing:'',
            remarks:"",
            traceYear:"2018",
        }],
        medicalInsuranceOfficeList:[//机构医保办人员
        ],
        nurseList:[
        ],
        paramedicList:[//查询机构医技人员列表
        ],
        physicianList:[//医师人员列表
        ],
        // dictionary
        allInpatientDepartment:[],
        allOutpatientDepartment:[],
        allRisk:[]
      }
    },
    methods: {
        initPage(){
            
            this.getAllRisk()
            this.getAllInpatientDepartment()
            this.getAllOutpatientDepartment()
            this.getAllManagement()
            this.getInstitutionId()

            this.getInstitutionBasic()
            this.getDepartment()
            this.getEquipmentList()
            this.getIncomeTrance()
            // this.getMedicalInsurance()
            this.getSocialInsurance()
            this.statisticsSumPersonByTitle()

        },
        getInstitutionBasic(){
            this.$loading.show()
            let params = {
                institutionId:this.institutionId
            }
            getInstitutionBasic(params).then(res=>{
                 this.$loading.hide()
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                   this.institutionBasic = res.data || this.institutionBasic
                }

            }).catch(err=>{
                this.$loading.hide()
            })
        },
        getDepartment(){
            let params = {
                institutionId:this.institutionId
            }
            getDepartment(params).then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                       this.department=res.data||{}
                        this.checkedInDepartment= this.updateCheckedInDepartment(this.department.inpatientDepartmentList || []) || []
                        this.checkedOutDepartment= this.updateCheckedOutDepartment(this.department.outpatientDepartmentList || []) || []
                        this.inDepartmentData=createInDepartmentData(this.department.inpatientDepartmentList || []) || []

                }

            })
        },
        getEquipmentList(){
            let params = {
                institutionId:this.institutionId
            }
            getEquipmentList(params).then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                   this.equipmentList=res.data || []
                }
            })
        },
        getIncomeTrance(){
            let params = {
                institutionId:this.institutionId
            }
            getIncomeTrance(params).then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                   
                   if(res.data){
                    res.data.traceYear='2018'
                    this.$set(this.incomeTrace,0,res.data)
                   }
                   
                }

            })
        },
        getMedicalInsurance(){
            let params = {
                institutionId:this.institutionId
            }
            getMedicalInsurance(params).then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                   this.medicalInsuranceOfficeList= res.data || []
                }

            })
        },
        getSocialInsurance(){
            let params = {
                institutionId:this.institutionId
            }
            getSocialInsurance(params).then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                    this.socialInsurance= this.handleSocialInsurance(res.data || [])||[]
                this.checkedInsured= this.updateCheckedInsured(this.socialInsurance)||[]
                }

            })
        },
        statisticsSumPersonByTitle(){
            let params = {
                institutionId:this.institutionId
            }
            statisticsSumPersonByTitle(params).then(res => {
                if(res  && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res  && res.code === SUCCESS_CODE){
			        this.healthPersonnelInfo=this.handleHealthPersonnelInfo(res.data,this.healthPersonnelInfo) || this.healthPersonnelInfo
                }

            })
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (rowIndex ==this.healthPersonnelInfo.length-1) {
                if (columnIndex === 0) {
                    return [1, 3];
                }
                else if (columnIndex === 1) {
                    return [1, 2];
                }
            }
        },
        getInstitutionId(){
            let institutionId = this.$route.params && this.$route.params.institutionId
            this.institutionId = institutionId||""
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleSocialInsurance(socialInsuranceList){//把接口返回的socialInsuranceLIst 转变为页面中的对象
            let allRisk=this.allRisk
            let socialInsurance=[],insuranceItem={}
            if(!allRisk || !socialInsuranceList || !socialInsuranceList instanceof Array || socialInsuranceList.length==0){
                return
            }
            socialInsuranceList.map(item=>{
                for(var i=0;i<allRisk.length;i++){
                    if(item.riskId === allRisk[i].riskId){
                        insuranceItem.riskId= item.riskId
                        insuranceItem.insureNumber= item.insureNumber
                        insuranceItem.riskName= allRisk[i].riskName
                        socialInsurance.push(insuranceItem)
                        insuranceItem={}
                    }
                }
            })
            return socialInsurance
        },
        updateCheckedInsured(socialInsurance){
            let checkedInsured=[]
            if(!socialInsurance || !socialInsurance instanceof Array || socialInsurance.length==0 ){
                return
            }
            socialInsurance.map(item=>{
                checkedInsured.push(item.riskId)
            })
            return checkedInsured
        },
        createSocialInsurance(checkedInsured){
            let allRisk=this.allRisk
            let socialInsurance=[],insuranceItem={}
            if(!allRisk||!checkedInsured || !checkedInsured instanceof Array || checkedInsured.length==0){
                return
            }
            checkedInsured.map(riskId=>{
                for(let  i=0;i<allRisk.length;i++){
                    if(riskId==allRisk[i].riskId){
                        insuranceItem.riskId= riskId
                        insuranceItem.insureNumber= ""
                        insuranceItem.riskName= allRisk[i].riskName
                        socialInsurance.push(insuranceItem)
                        insuranceItem={}
                    }
                }
            })
            return socialInsurance
        },
        reduceSocialInsurance(riskItem){
            let _this=this
            if(!this.socialInsurance || !this.socialInsurance instanceof Array){
                return
            }
            this.socialInsurance.map((item,index)=>{
                if(item.riskId===riskItem.riskId){
                    _this.socialInsurance.splice(index,1)
                }
            })
        },
        addSocialInsurance(item){
            this.socialInsurance.push(item)
        },
        changeInsurance(riskItem,$event){
        //    把checkedInsured 映射到socialInsurance
            if(!$event){//取消选中
            this.reduceSocialInsurance(riskItem)
                return
            }
            this.checkedInsured.sort()
            this.addSocialInsurance(riskItem)
            this.socialInsurance.sort((a,b)=>{
                return parseInt(a.riskId.slice(2))-parseInt(b.riskId.slice(2))
            })
        },
        handleHealthPersonnelInfo(arr,newArr){

            if(!arr || !arr instanceof Array || arr.length==0){
                return
            }
            arr.map(item => {//??优化处理方式
                if(item.type === 'physician'){
                    if(item.level === 'primary'){
                        newArr[0].junior = item.sumCount || 0
                    }else if(item.level === 'middle'){
                        newArr[0].intermediate = item.sumCount || 0
                    }else if(item.level === 'high'){
                        newArr[0].senior = item.sumCount || 0
                    }
                }else if(item.type === 'paramedic'){
                    if(item.level === 'primary'){
                        newArr[1].junior = item.sumCount || 0
                    }else if(item.level === 'middle'){
                        newArr[1].intermediate = item.sumCount || 0
                    }else if(item.level === 'high'){
                        newArr[1].senior = item.sumCount || 0
                    }
                }else if(item.type === 'nurse'){
                   if(item.level === 'primary'){
                        newArr[2].junior = item.sumCount || 0
                    }else if(item.level === 'middle'){
                        newArr[2].intermediate = item.sumCount || 0
                    }else if(item.level === 'high'){
                        newArr[2].senior = item.sumCount || 0
                    }
                }
            })
            newArr[3].junior = Sum(newArr[0].junior, newArr[1].junior, newArr[2].junior)
            newArr[3].intermediate = Sum(newArr[0].intermediate, newArr[1].intermediate, newArr[2].intermediate)
            newArr[3].senior = Sum(newArr[0].senior, newArr[1].senior, newArr[2].senior)
            newArr.map((item,index) => {
                if(index === 4){
                    return
                }
                item.amount = Sum(item.senior, item.intermediate, item.junior )
                return item
            })
            newArr[4].amount =  newArr[3].amount
            return newArr

        },
        // add
        addEquipmentItem(){
            let equipmentItem=
                {
                    "chargingPrice": '',//每单位收费价格
                    "chargingType": "元/次",//收费标准单位
                    "equipmentId": "",//流水号
                    "equipmentName": "",//设备名称
                    "manufacturer": "",//生产厂商
                    "productStandard": "",//产品标准
                    "purchasePrice": "",//采购价格
                    "specification": "",//规格型号
                    "startUsingDate": ""//启用时间
                }
                 this.equipmentList.push(equipmentItem)
        },
        addMedicalInsuranceOfficeItem(){
            let template={
                "birthday":"2019-09-10",
                 "name": "",
                "sex": "",
                "idType": "身份证",
                "idNo": "",
                "duty": "",
                "fullPartTime": true,
                "major": "",
                "phone": "",
                "position": ""
            }

            this.medicalInsuranceOfficeList.push(template)
        },
        //delete
        deleteTableRow(list,rowIndex){
            this.$confirm('您是否确定删除此条记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    list.splice(rowIndex,1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        deleteMedicalInsuranceOfficeItem(rowIndex){
            this.deleteTableRow(this.medicalInsuranceOfficeList,rowIndex)
        },
        deleteEquipmentItem(rowIndex){
            this.deleteTableRow(this.equipmentList,rowIndex)
        },
        // dictionary
        getAllInpatientDepartment(){
            getAllInpatientDepartment().then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                    this.allInpatientDepartment = initInpatientDepartmentList(res.data)
                }

            })
        },
        getAllOutpatientDepartment(){
            getAllOutpatientDepartment().then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                    this.allOutpatientDepartment=res.data
                }
            })
        },
        getAllRisk(){
            getAllRisk().then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                    this.allRisk=initAllRisk(res.data)
                }

            })
        },
         getAllManagement(){
            getAllManagement().then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res && res.code === SUCCESS_CODE){
                   this.businessTypes = res.data ||  this.businessTypes
                }

            })
        },

        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (rowIndex ==this.healthPersonnelInfo.length-1) {
                if (columnIndex === 0) {
                    return [1, 3];
                }
                else if (columnIndex === 1) {
                    return [1, 2];
                }
            }
        },
        createTempData(){// todo   drafts
           let params = {
                "institutionBasic": {},
                "socialInsuranceList": [],
                "department": {},
                "equipmentList": [],
                "incomeTrace": {},
                "medicalInsuranceOfficeList": [],
                "doctorUrl": "",
                "nurseUrl": "",
                "medicalUrl": "",
                "applyTaskId": "",
                "processRoleId": "INSTITUTION",
                "processUserId": "TK002",
                "institutionId": "TK002"
            }
            // return params
            let tempData={
                // "institutionBasic": this.institutionBasic || {},
                "institutionBasic":this.institutionBasic || {},
                "socialInsuranceList": this.socialInsurance || [],
                "department":this.department || {},
                "equipmentList": this.equipmentList || [],
                "incomeTrace": this.incomeTrace[0] || {},
                "medicalInsuranceOfficeList": this.medicalInsuranceOfficeList || [],

                "doctorUrl": this.staffListExcel[0].excelUrl || "",
                "medicalUrl": this.staffListExcel[1].excelUrl || "",
                "nurseUrl": this.staffListExcel[2].excelUrl || "",

                "institutionId": this.institutionId || "",
                "applyTaskId": this.query.applyTaskId || "",
                "processRoleId": roleId,
                "processUserId": this.institutionId || "",

            }
            return tempData
        },
        // updateCheckedDepartment
        updateCheckedDepartment(departmentList){
             if(!departmentList || !departmentList instanceof Array || departmentList.length==0){
                return
            }
            let checkedDepartment= []
            departmentList.map(item=>{
                checkedDepartment.push(item.departmentId)
            })
            return checkedDepartment
        },
        updateCheckedInDepartment(inDepartmentList){
            return this.updateCheckedDepartment(inDepartmentList)
        },
        updateCheckedOutDepartment(outDepartmentList){
            return this.updateCheckedDepartment(outDepartmentList)
        },
        // updateDepartmentList
        updateDepartmentList(checkedDepartment,allPatientDepartment,hasBedNums){
            if(!checkedDepartment || !checkedDepartment instanceof Array || checkedDepartment.length==0){
                return
            }
            if(!allPatientDepartment  || !allPatientDepartment instanceof Array || allPatientDepartment.length==0){
                return
            }
            let departItem={},departmentList=[]
            checkedDepartment.map(item=>{
                for(let i=0;i<allPatientDepartment.length;i++){
                    if(item==allPatientDepartment[i].departmentId){
                        departItem.departmentId=item
                        departItem.departmentName=allPatientDepartment[i].departmentName
                        if(hasBedNums){
                            departItem.bedNumber=""
                        }
                        departmentList.push(departItem)
                        departItem={}
                    }
                }
            })
            return departmentList
        },
        updateOutDepartment(checkedOutDepartment){
            return this.updateDepartmentList(checkedOutDepartment,this.allOutpatientDepartment)
        },
        updateInDepartment(checkedInDepartment){
            return this.updateDepartmentList(checkedInDepartment,this.allInpatientDepartment,true)
        },

        //注释
        updateInDepartmentBedNums(inDepartmentList,inDepartmentBedNums){
            if(!inDepartmentList || !inDepartmentList instanceof Array || inDepartmentList.length==0){
                return
            }
            if(!inDepartmentBedNums  || !inDepartmentBedNums instanceof Array){
                return
            }
            if(inDepartmentBedNums.length==0){
                   return addArrayOption(inDepartmentList,'bedNumber')
            }
            let hasSameItem
            inDepartmentList.map(item=>{
                hasSameItem=false
                for(let i=0;i<inDepartmentBedNums.length;i++){
                    if(item.departmentId== inDepartmentBedNums[i].departmentId){
                        hasSameItem=true
                    }
                }
                if(hasSameItem===false){
                    item.bedNumber
                    inDepartmentBedNums.push(item)
                }
            })
            return inDepartmentBedNums
        },
        changeOutDepartment(){
            this.department.outpatientDepartmentList=this.updateOutDepartment(this.checkedOutDepartment)
        },
        changeInDepartment(departmentItem,$event){
            if(!$event){ //取消选中
                this.reduceInDepartment(departmentItem)
                return
            }
            this.addInDepartment(departmentItem)
            // this.department.inpatientDepartmentList=this.updateInDepartment(this.checkedInDepartment)
        },
        reduceInDepartment(departmentItem){
            let _this=this
            if(!this.department.inpatientDepartmentList || !this.department.inpatientDepartmentList instanceof Array){
                return
            }
            this.department.inpatientDepartmentList.map((item,index)=>{
                if(item.departmentId==departmentItem.departmentId){
                    _this.department.inpatientDepartmentList.splice(index,1)
                }
            })
            this.inDepartmentData=createInDepartmentData(this.department.inpatientDepartmentList || []) || []
        },
        addInDepartment(departmentItem){
            if(!this.department.inpatientDepartmentList || !this.department.inpatientDepartmentList instanceof Array){
                return
            }
            this.department.inpatientDepartmentList.push(departmentItem)
            this.inDepartmentData=createInDepartmentData(this.department.inpatientDepartmentList || []) || []
        },
        addDepartment(){
            this.dialogInDepart=false
            //排序 this.department.inpatientDepartmentList
            this.department.inpatientDepartmentList.sort((a,b)=>{
                return parseInt(a.departmentId)-parseInt(b.departmentId)
            })
            this.inDepartmentData=createInDepartmentData(this.department.inpatientDepartmentList)


        },
        changeBedsNum(departmentId,num){
            if( !this.department.inpatientDepartmentList||  !this.department.inpatientDepartmentList instanceof Array ){
                return
            }
            this.department.inpatientDepartmentList=this.department.inpatientDepartmentList.map(item=>{
                if(item.departmentId===departmentId){
                    item.bedNumber=num
                }
                return item
            })
        },

        //上传材料相关的
        updateInstitutionBasic(Credentials){
            if(!Credentials || !Credentials instanceof Array || Credentials.length!=3){
                return
            }
            this.institutionBasic.positiveLicenseUrl= Credentials[0].picUrl ||""
            this.institutionBasic.legalIDCardUrl= Credentials[1].picUrl ||""
            this.institutionBasic.legalIDCardBackUrl= Credentials[2].picUrl ||""

        },
        updateCredentials(institutionBasic){
            if(!this.credentials || !this.credentials instanceof Array ||this.credentials.length!=3){
                return
            }
            this.credentials[0].picUrl= institutionBasic.positiveLicenseUrl || ""
            this.credentials[1].picUrl= institutionBasic.legalIDCardUrl || ""
            this.credentials[2].picUrl= institutionBasic.legalIDCardBackUrl || ""
        },
        updateStaffListExcel(){
            if(!this.staffListExcel || !this.staffListExcel instanceof Array || this.staffListExcel.length!=3){
                return
            }
            this.staffListExcel[0]= this.doctorUrl || ""
            this.staffListExcel[1]= this.medicalUrl || ""
            this.staffListExcel[2]= this.nurseUrl || ""
        },
        updateStaffListData(staffListExcel){
            if(!staffListExcel || !staffListExcel instanceof Array || staffListExcel.length!=3){
                return
            }
            this.doctorUrl= this.staffListExcel[0] || ""
            this.medicalUrl=this.staffListExcel[1] || ""
            this.nurseUrl= this.staffListExcel[2] || ""
        },


    },
    mounted() {
        this.initPage()
    }
}
</script>
<style scoped>
.applyInfos{
  overflow: hidden;
}
/* .applyInfos.primary .el-form-item{
        margin-bottom:0px;
} */
</style>
