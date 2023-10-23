<template>
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
                        <el-input :disabled="isDisabled" v-model="institutionBasic.registrationNumber" placeholder="请输入登记号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="所有制形式">
                        <el-select :disabled="isDisabled" v-model="institutionBasic.ownership" placeholder="请选择">
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
                        <el-select :disabled="isDisabled" v-model="institutionBasic.institutionType" placeholder="请选择">
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
                        <el-select :disabled="isDisabled" v-model="institutionBasic.businessType" placeholder="请选择">
                            <el-option
                            v-for="(item, index) in businessTypes"
                            :key="index"
                            :label="item.managementTypeName"
                            :value="item.managementTypeCode">
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
                        <el-select :disabled="isDisabled" v-model="institutionBasic.assessmentLevel" placeholder="请选择">
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
                    <el-form-item label="服务对象">
                        <el-select :disabled="isDisabled" v-model="institutionBasic.serviceClient" placeholder="请选择">
                            <el-option
                            v-for="(item, index) in serviceObjs"
                            :key="index"
                            :label="item.serviceTargetName"
                            :value="item.serviceTargetCode">
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
                        <el-input :disabled="isDisabled" v-model="institutionBasic.ssContributionAccount" placeholder="请输入社会缴费账号"></el-input>
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
                            placeholder="请选择"
                            >
                        </el-date-picker> -->
                        <el-input disabled v-model="institutionBasic.insuredBeginDate"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="7">
                    <el-form-item label="是否有医疗保险联网及时结算设备">
                        <!-- <el-input :disabled="isDisabled" v-model="institutionBasic.settleEquipment" placeholder="请输入医疗保险联网及时结算设备"></el-input> -->
                        <el-select  :disabled="isDisabled" v-model="institutionBasic.settleEquipment" placeholder="请选择">
                            <el-option v-for="(item, index) in closeAccountEquipmnet"
                            :key="index"
                            :label="item.text"
                            :value="item.value"></el-option>
                            </el-select>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
                    <el-form-item label="申请定点类型">
                        <el-select :disabled="isDisabled" v-model="institutionBasic.applyType" placeholder="请选择">
                           <el-option
                            v-for="(item, index) in applyTypes"
                            :key="index"
                            :label="item.institutionTypeName"
                            :value="item.institutionTypeCode">
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
                <el-row class="pd15 text-center">
                    <el-checkbox-group v-model="checkedOutDepartment" @change="changeOutDepartment">
                      <el-col :span="3" v-for="(outDepart,outDepartIndex) in allOutpatientDepartment" :key="outDepartIndex">
                        <el-checkbox :label="outDepart.departmentId" :key="outDepart.departmentId" :disabled="isDisabled">{{outDepart.departmentName}}</el-checkbox>
                      </el-col>
                    </el-checkbox-group>
                </el-row>
                <h4>住院科室<i class="el-icon-circle-plus addIcon" @click="dialogInDepart = true" v-if="!isDisabled"></i></h4>
                <el-dialog width="700px" title="请勾选您要添加的住院科室" :visible.sync="dialogInDepart"
                :append-to-body="true" center>
                        <el-checkbox-group v-model="checkedInDepartment" >
                          <el-col :span="6" v-for="(inDepart,index) in allOutpatientDepartment" :key="index">
                            <el-checkbox @change="changeInDepartment(inDepart,$event)" :label="inDepart.departmentId" :key="inDepart.departmentId">{{inDepart.departmentName}}</el-checkbox>
                          </el-col>
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
                    width="140"
                    label="启用时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.startUsingDate }}</span>
                        <!-- <el-input v-if="!isDisabled" v-model="scope.row.startUsingDate"></el-input> -->
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
                v-if="!isDisabled"
                label="操作"
                width="60">
                <template slot-scope="scope">
                    <div class="deleteBtn">
                        <i class="el-icon-delete" @click="deleteEquipmentItem(scope.$index)" v-if="!isDisabled"></i>
                    </div>
                </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
    <div class="applyInfo">
        <h3 class="infoTitle">上年度收支情况</h3>
        <el-row class="infoContainer">
            <el-table
                :data="incomeTrace"
                border
                style="width: 100%">
                <el-table-column
                    prop="outpatientAmount"
                    label="门诊诊疗人次（次）">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.outpatientTimes }}</span>
                        <el-input v-if="!isDisabled" v-model.number="scope.row.outpatientTimes"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="perOutpatientPayment"
                    label="次均门诊费用（元）">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.avgTimeOutpatientIncome }}</span>
                        <el-input v-if="!isDisabled" v-model.number="scope.row.avgTimeOutpatientIncome"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="inpatientAmount"
                    label="住院人数（人）">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.inpatientTimes }}</span>
                        <el-input v-if="!isDisabled" v-model.number="scope.row.inpatientTimes"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="perInpatientPayment"
                    label="次均住院费用（元）">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.avgTimeInpatientIncome }}</span>
                        <el-input v-if="!isDisabled" v-model.number="scope.row.avgTimeInpatientIncome"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="perPersonInpatientPayment"
                    label="人均住院费用（元）">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.avgPeopleInpatientIncome }}</span>
                        <el-input v-if="!isDisabled" v-model.number="scope.row.avgPeopleInpatientIncome"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="perStayDays"
                    label="平均住院日（天）">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.avgInpatientDays }}</span>
                        <el-input v-if="!isDisabled" v-model.number="scope.row.avgInpatientDays"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="bedUsageRate "
                    label="床位使用率（%）">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.rateOfBedUsing }}</span>
                        <el-input v-if="!isDisabled" v-model.number="scope.row.rateOfBedUsing"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="other"
                    label="备注">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.remarks }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.remarks"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <p class="tips">单位：元/日/人</p> -->
        </el-row>
    </div>
    <div class="applyInfo">
        <h3 class="infoTitle">医疗机构从事医疗保险管理人员名单
            <el-button class="infoTitleRightBtn" type="primary" size="small" v-if="!isDisabled"
            @click="addMedicalInsuranceOfficeItem"
            >添加</el-button>
        </h3>
        <el-row class="infoContainer">
            <!-- todo -->
            <el-table
                :data="medicalInsuranceOfficeList"
                border
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="姓名">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.name }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.name"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.sex }}</span>
                        <el-select v-if="!isDisabled" v-model="scope.row.sex" placeholder="请选择">
                            <el-option
                            v-for="sex in sexTypes"
                            :key="sex.value"
                            :label="sex.label"
                            :value="sex.label">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="idNo"
                    width="200"
                    label="身份证">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.idNo }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.idNo"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="duty"
                    label="职务">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.duty }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.duty"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="major"
                    label="专业">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.major }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.major"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="fullPartTime"
                    label="专（兼）职">
                    <template slot-scope="scope">
                        <!-- <span v-if="isDisabled">{{ scope.row.isFullTime }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.isFullTime"></el-input> -->
                        <span v-if="isDisabled">{{ scope.row.fullPartTime | partTimeFilter}}</span>
                        <el-select v-if="!isDisabled" v-model="scope.row.fullPartTime" placeholder="请选择">
                            <el-option
                            v-for="item in fullPartTimeType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="position"
                    label="工作岗位">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.position }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.position"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="phone"
                    width="150"
                    label="联系电话">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.phone }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.phone"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                v-if="!isDisabled"
                label="操作"
                width="80">
                <template slot-scope="scope">
                    <div class="deleteBtn">
                        <i class="el-icon-delete" @click="deleteMedicalInsuranceOfficeItem(scope.$index)" v-if="!isDisabled"></i>
                    </div>
                </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
    <div class="applyInfo">
        <h3 class="infoTitle">医疗机构卫生专业技术人员花名册</h3>
        <el-row class="infoContainer">
            <div class="uploadDemo uploadExcel"  v-for = "(item,index) in staffListExcel" :key = 'index' >
                <div class="upload-excel-background">
                    <el-upload v-if="!isDisabled"
                    :action="''+index"
                    :show-file-list = false
                    class="uploadExcel"
                    :http-request="uploadStaffListExcel"
                    >
                    <img :src="item.defaultUrl" alt="" class="upload-excel-img" v-show="!item.excelUrl">
                    <el-button class="upload-excel-btn" type="bgBlue" size="small" v-show="!!item.excelUrl">上传</el-button>
                    </el-upload>
                    <div v-show="!!item.excelUrl" class="upload-excel-content">
                        <img :src="uploadFileBgImg" alt="">
                        <a :class="['overFlowEllipsis','text-center','block',isDisabled?'download':'']"  :title="item.excelName||''" :href="item.excelUrl" v-if="!isDisabled"><span class="icon iconfont iconxiazaiicon downloadIcon"></span>{{item.excelName||''}}</a>
                        <a :class="['overFlowEllipsis','text-center','block',isDisabled?'download':'']"  :title="item.excelName||''" :href="item.excelUrl" v-else><span class="icon iconfont iconxiazaiicon downloadIcon"></span>{{item.downLoadTitle}}</a>
                    </div>
                </div>
                <h3 class="text-center mt10">{{item.templateTitle}}</h3>               
                <div slot="tip" class="el-upload__tip text-danger" style="color:red;margin-top:0px;" v-show="!item.isSuccess"><i class="el-icon-warning"></i>{{item.errTips}}</div>
                <a :href="item.templateUrl" v-if="!isDisabled" class="block text-center"><span class="icon iconfont iconxiazaiicon downloadIcon"></span>{{item.subTitle}}</a>
            </div>
        </el-row>
    </div>
    <div class="applyInfo mb30">
        <h3 class="infoTitle">证件类信息</h3>
        <!-- todo    列表 展示修改 -->
        <el-row class="infoContainer materialContainer text-center">
            <!-- 有图 -->
            <div v-for="(item, index) in credentials" :key='index'>
                <!-- :show-file-list="false" -->
                <el-upload
                    class="certifyImg avatar-upload relative"
                    :action="''+index"
                    :limit="1"
                    :disabled="isDisabled"
                    >
                    <img :src="item.picUrl||'../../assets/logo.png'">
                    <!-- <i class="el-icon-picture"></i> -->
                    <p>{{item.title}}</p>
                </el-upload>
            </div>
        </el-row>
    </div>
</div>
</template>
<script>
import {
    uploadFileBgImg,
    roleId,
    OwnerShipTypes,
    OrganizationTypes,
    BusinessTypes,
    ServiceObjs,
    ApplyTypes,
    SexTypes,
    licenseLongPresent,
    fullPartTimeType,
    Credentials,
    staffListExcel,
    closeAccountEquipmnet,
    allAssessmentLevel,
    SUCCESS_CODE,
    FAIL_CODE,
    ERR_CODE
} from "../../utils/Constant"
import { getNickName, getAccountInfo } from '@/utils/LocalStoragePerform'
import { judgeFileType, addArrayOption, Sum } from '@/utils/commonTool'
import { getNodeData, saveTempNode, applyData, getMedicalList, getAllInpatientDepartment, getAllOutpatientDepartment, getAllRisk, getAllAssessmentLevel, getAllOwnership, getAllServiceTarget,getAllManagement,
    statisticsSumPersonByTitle, getAllInstitutionType
    } from '@/api/api'
import { Form, Message } from 'element-ui';
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
    name: 'OriginalMedicalMaterial',
    props:{
        nodeId:String,
        applyUserId:String
    },
    data: function () {
      return {
        institutionId:'TK001',
         nickName:"",
        isDisabled:false,
        uploadFileBgImg:uploadFileBgImg,
        query:{
        },

        ownerShipTypes: OwnerShipTypes,
        organizationTypes: OrganizationTypes,
        businessTypes: BusinessTypes,
        serviceObjs: ServiceObjs,
        applyTypes: ApplyTypes,
        sexTypes:SexTypes,
        licenseLongPresent:licenseLongPresent,
        fullPartTimeType:fullPartTimeType,
        credentials:Credentials,
        staffListExcel:staffListExcel,
        closeAccountEquipmnet:closeAccountEquipmnet,
        allAssessmentLevel:allAssessmentLevel,
        dialogInDepart:false,
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
    mounted(){
        this.initPage()
        // this.handleHealthPersonnelInfo()

    },
    methods: {
        initPage(){
            this.getAllRisk()
            this.getAllInpatientDepartment()
            this.getAllOutpatientDepartment()
            this.getAllInstitutionType()
            this.getAllAssessmentLevel()
            this.getAllOwnership()
            this.getAllServiceTarget()
            this.getAllManagement()

            this.getNickName()
            this.getInstitutionId()
            this.dealWithPage()
            this.statisticsSumPersonByTitle()
        },
        getRouterQuery(){
            return  this.$route.query
        },
        dealWithPage(){
            let query=this.getRouterQuery()
            this.query=query
                //  this.query.nodeId='N2019082201'
                this.dealDetailTaskProgress(query)
        },
        dealDetailTaskProgress(query){//查看详情流程
            this.isDisabled = true
            // var query  = this.query
            let applyTaskId= query.applyTaskId || ""
            this.getPrimaryApplyData(applyTaskId)
        },
        getPrimaryApplyData(applyTaskId=""){
            let params={
                "applyTaskId": applyTaskId,
                "nodeId": this.nodeId
            }
            getNodeData(params).then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                    let tempData=res.data.tempData
                if(!tempData){
                    this.clearPageData()
                    return
                }
                this.department=tempData.department || {}
                this.checkedInDepartment= this.updateCheckedInDepartment(this.department.inpatientDepartmentList || []) || []
                this.checkedOutDepartment= this.updateCheckedOutDepartment(this.department.outpatientDepartmentList || []) || []

                this.inDepartmentData=createInDepartmentData(this.department.inpatientDepartmentList || []) || []

                this.equipmentList=tempData.equipmentList || []
                // this.incomeTrace[0]=tempData.incomeTrace
                tempData.incomeTrace.traceYear='2018'
                this.$set(this.incomeTrace,0,tempData.incomeTrace)
                this.institutionBasic=tempData.institutionBasic || {}
                this.medicalInsuranceOfficeList= tempData.medicalInsuranceOfficeList || []
                this.socialInsurance= this.handleSocialInsurance(tempData.socialInsuranceList || [])||[]
                // console.log('socialInsurance----------------',this.socialInsurance,tempData.socialInsuranceList)
                this.checkedInsured= this.updateCheckedInsured(this.socialInsurance)||[]
                //设置上传文件的信息  有空单独拿出来
                this.staffListExcel[0].excelUrl= tempData.doctorUrl || ""
                this.staffListExcel[1].excelUrl= tempData.medicalUrl || ""
                this.staffListExcel[2].excelUrl= tempData.nurseUrl || ""
                this.staffListExcel[0].excelName= tempData.doctorUrlName || ""
                this.staffListExcel[1].excelName= tempData.medicalUrlName || ""
                this.staffListExcel[2].excelName= tempData.nurseUrlName || ""

                this.credentials[0].picUrl= tempData.institutionBasic.positiveLicenseUrl || ""
                this.credentials[1].picUrl= tempData.institutionBasic.legalIDCardUrl || ""
                this.credentials[2].picUrl= tempData.institutionBasic.legalIDCardBackUrl || ""
                }
                // this.$set(this,'socialInsurance',this.handleSocialInsurance(tempData.socialInsuranceList || []))
            })
        },
        getNickName(){
            this.nickName=getNickName()
        },
        getInstitutionId(){
            this.institutionId=this.applyUserId || ""
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
            newArr[4].amount = newArr[3].amount
            return newArr

        },
        clearPageData(){
            this.staffListExcel[0].excelUrl= ""
            this.staffListExcel[1].excelUrl= ""
            this.staffListExcel[2].excelUrl= ""
            this.staffListExcel[0].excelName= ""
            this.staffListExcel[1].excelName= ""
            this.staffListExcel[2].excelName= ""
            this.credentials[0].picUrl=  ""
            this.credentials[1].picUrl=  ""
            this.credentials[2].picUrl=  ""
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
         getAllAssessmentLevel(){
            getAllAssessmentLevel().then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                   this.allAssessmentLevel=res.data || this.allAssessmentLevel
                }

            })
        },
        getAllOwnership(){
            getAllOwnership().then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                    this.ownerShipTypes=res.data || this.ownerShipTypes
                }

            })
        },
        getAllServiceTarget(){
            getAllServiceTarget().then(res => {
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                   this.serviceObjs = res.data || this.serviceObjs
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
        getAllInstitutionType(){
            getAllInstitutionType().then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                   this.applyTypes = res.data ||  this.applyTypes
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
                "doctorUrlName": this.staffListExcel[0].excelName || "",
                "medicalUrlName": this.staffListExcel[1].excelName || "",
                "nurseUrlName": this.staffListExcel[2].excelName || "",

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
         uploadStaffListExcel(item){
            let _this=this
            let excelIndex=item.action
             upLoadFile(this,item,'excel').then(params => {
                if(!params){
                    return
                }
                switch (excelIndex){
                    case '0':
                         uploadPhysicianInfoExcel(params).then(res=>{

                            if(res && res.code === SUCCESS_CODE){
                                _this.staffListExcel[excelIndex].isSuccess=true
                                _this.staffListExcel[excelIndex].excelUrl=res.data.attachmentUrl
                                _this.staffListExcel[excelIndex].excelName=item.file.name
                                _this.updateStaffListData(_this.staffListExcel)
                                _this.$message({
                                    message:'上传成功',
                                    type:'success'
                                })
                                return
                            }
                            _this.staffListExcel[excelIndex].isSuccess=false
                            _this.staffListExcel[excelIndex].excelUrl=""
                             _this.staffListExcel[excelIndex].excelName=""
                            if(res && res.code === FAIL_CODE){
                                Message.error({ message: res.message })
                                return
                            }
                            if(res && res.code === ERR_CODE){
                                Message.error({ message: '服务器开小差儿了，您待会再试吧！' })
                            }
                        })
                        break;
                    case '1':
                         uploadParamedicInfoExcel(params).then(res=>{

                            if(res && res.code === SUCCESS_CODE){
                                _this.staffListExcel[excelIndex].isSuccess=true
                                _this.staffListExcel[excelIndex].excelUrl=res.data.attachmentUrl
                                _this.staffListExcel[excelIndex].excelName=item.file.name
                                _this.updateStaffListData(_this.staffListExcel)
                                 _this.$message({
                                    message:'上传成功',
                                    type:'success'
                                })

                                return
                            }
                            _this.staffListExcel[excelIndex].isSuccess=false
                            _this.staffListExcel[excelIndex].excelUrl=""
                             _this.staffListExcel[excelIndex].excelName=""
                            if(res && res.code === FAIL_CODE){
                                Message.error({ message: res.message })
                                return
                            }
                            if(res && res.code === ERR_CODE){
                                Message.error({ message: '服务器开小差儿了，您待会再试吧！' })
                            }
                        })
                        break;
                    case '2':
                         uploadNurseInfoExcel(params).then(res=>{

                            if(res && res.code === SUCCESS_CODE){
                                _this.staffListExcel[excelIndex].isSuccess=true
                                _this.staffListExcel[excelIndex].excelUrl=res.data.attachmentUrl
                                _this.staffListExcel[excelIndex].excelName=item.file.name
                                _this.updateStaffListData(_this.staffListExcel)
                                _this.$message({
                                    message:'上传成功',
                                    type:'success'
                                })

                                return
                            }
                                _this.staffListExcel[excelIndex].isSuccess=false
                                _this.staffListExcel[excelIndex].excelUrl=""
                                _this.staffListExcel[excelIndex].excelName=""
                                _this.updateStaffListData(_this.staffListExcel)
                            if(res && res.code === FAIL_CODE){
                                Message.error({ message: res.message })
                                return
                            }
                            if(res && res.code === ERR_CODE){
                                Message.error({ message: '服务器开小差儿了，您待会再试吧！' })
                            }

                        })
                        break;
                    default:
                        //todo
                }
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
        submitData(){
            let params = this.createTempData()
            applyData(params).then(res=>{
                this.$message({
                    message:'提交成功',
                    type:'success'
                })
                setTimeout(()=>{
                    this.$router.push('/applyList')
                },1000)
            })
        },
        saveData(){
            let params={
                "applyTaskId": this.query.applyTaskId,
                "nodeId": this.nodeId,
                "processRoleId": this.query.processRoleId,
                "tempData": this.createTempData()
            }
            saveTempNode(params).then(res=>{
                if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                   this.$message({
                    message:'保存成功',
                    type:'success'
                    })
                    setTimeout(()=>{
                        this.$router.push('/applyList')
                    },1000)
                    return
                }
                if(res &&  res.code === ERR_CODE){
                    Message.error({ message: '服务器开小差儿了，您待会再试' })
                    return
                }
            })
        }
    },
     filters:{
        partTimeFilter(value){
            let partLabel
            fullPartTimeType.map(item =>{
                if(item.value==value){
                    partLabel=item.label
                }
            })
            return partLabel
        }
    }
}
</script>
<style lang="css">
    .el-input--suffix .el-input__inner{
        padding-right:0px;
    }
      .applyInfo .el-input__inner{
        padding: 0 0 0 15px;
    }
    .applyInfo .el-input--prefix .el-input__inner{
        padding-left:30px;
        width: 92.5%;
    }
    /* .applyInfos.primary .el-form-item{
        margin-bottom:0px;
    } */
    /* .materialContainer .el-col{
        margin-right:3%;
    } */
    .applyInfo .el-input__inner{
        padding: 0 0 0 15px;
    }
    .applyInfo .el-input--prefix .el-input__inner{
        padding-left:30px;
        width: 92.5%;
    }
    .applyInfo  .el-input__suffix{
        right:20px;
    }
    /* .applyInfos.primary .el-form-item{
        margin-bottom:0px;
    } */
    .indepartmentdata .el-form-item{
        margin-bottom:0px;
    }
    /* .materialContainer .el-col{
        margin-right:3%;
    } */   
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
    .uploadDemo.uploadExcel .overFlowEllipsis{
        width: 100%;
        position: absolute;
        top:40px;
        left: 0px;
    }
     .uploadDemo.uploadExcel .overFlowEllipsis.download{
        top:55px;
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
        z-index: 100;
    }
    .upload-excel-img{
        width: 100%;
        height: 100%;
    }  
    .certifyImg.avatar-upload.relative{
        position: relative;
    }   
    .infoContainer.materialContainer{
        margin: 30px 40px;
    } 
    .infoContainer.materialContainer .certifyImg{
        margin:0 30px 0 0;
    }   
</style>
