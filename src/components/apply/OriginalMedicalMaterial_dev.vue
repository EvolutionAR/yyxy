<template>
  <div class="applyInfos">
    <div class="applyInfo">
        <!-- <h3 class="infoTitle">基本信息</h3> -->
        <el-row class="infoContainer">
            <el-form :inline="true" :model="baseInfoForm">
                <el-col :span="6">
                    <el-form-item label="医院名称">
                        <el-input :disabled="isDisabled" v-model="nickName" placeholder="请输入医院名称"></el-input>
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
                        <el-input :disabled="isDisabled" v-model="institutionBasic.staffNumber" placeholder="请输入职工总人数"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="签订劳动合同人数">
                        <el-input :disabled="isDisabled" v-model="institutionBasic.employeeNumber" placeholder="请输入签订劳动合同人数"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
    <div class="applyInfo">
        <h3 class="infoTitle">资格情况</h3>
        <el-row class="infoContainer">
            <el-form :inline="true" :model="qualityInfoForm">
                <el-col :span="6">
                    <el-form-item label="执业许可证登记号">
                        <el-input :disabled="isDisabled" v-model="institutionBasic.registrationNumber" placeholder="请输入执业许可证登记号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="所有制形式">
                        <el-select :disabled="isDisabled" v-model="institutionBasic.ownership" placeholder="请选择医院名称所有制形式">
                            <el-option
                            v-for="item in ownerShipTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="医疗机构类型">
                        <el-select :disabled="isDisabled" v-model="institutionBasic.institutionType" placeholder="请选择医疗机构类型">
                            <el-option
                            v-for="item in organizationTypes"
                            :key="item.value"
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
                            v-for="item in businessTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="编制床位">
                        <el-input :disabled="isDisabled" v-model="institutionBasic.authorizedBedNumber" placeholder="请输入编制床位"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="实际床位">
                        <el-input :disabled="isDisabled" v-model="institutionBasic.actualBedNumber" placeholder="请输入实际床位"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="医疗机构评审等级">
                        <el-input :disabled="isDisabled" v-model="institutionBasic.assessmentLevel" placeholder="请输入医疗机构评审等级"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="服务对象">
                        <el-select :disabled="isDisabled" v-model="institutionBasic.serviceClient" placeholder="请选择服务对象">
                            <el-option
                            v-for="item in serviceObjs"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <!-- todo -->
                    <el-form-item label="诊疗科目">
                        <el-input :disabled="isDisabled" v-model="qualityInfoForm.medicalSubject" placeholder="请输入诊疗科目"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="有效时间">
                        <el-date-picker
                            :disabled="isDisabled"
                            v-model="institutionBasic.registrationBeginDate"
                            type="date"
                            placeholder="请选择有效时间"
                            >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="终止时间">
                        <el-date-picker
                            :disabled="isDisabled"
                            v-model="institutionBasic.registrationEndDate"
                            type="date"
                            placeholder="请选择终止时间"
                            >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
    <div class="applyInfo">
        <h3 class="infoTitle">参保情况</h3>
        <!-- todo -->
        <el-row class="infoContainer">
            <el-form :inline="true"  class="demo-form-inline">
                <!-- :model="insuredInfoForm" -->
                <el-col :span="6">
                    <el-form-item label="社会缴费账号号码">
                        <el-input :disabled="isDisabled" v-model="institutionBasic.ssContributionAccount" placeholder="请输入医院名称所有制形式"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="参保时间">
                        <el-input :disabled="isDisabled" v-model="institutionBasic.insuredBeginDate" placeholder="请输入参保时间"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <!-- todo -->
                    <el-form-item label="已参加险种">
                        <el-checkbox-group v-model="insuredInfoForm.partedInsured" :disabled="isDisabled">
                            <el-checkbox label="养老"></el-checkbox>
                            <el-checkbox label="医疗"></el-checkbox>
                            <el-checkbox label="工伤"></el-checkbox>
                            <el-checkbox label="失业"></el-checkbox>
                            <el-checkbox label="生育"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="养老（人数）">
                        <el-input :disabled="isDisabled" v-model="insuredInfoForm.agedAmount" placeholder="请输入养老（人数）"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="医疗（人数）">
                        <el-input :disabled="isDisabled" v-model="insuredInfoForm.medicalAmount" placeholder="请输入医疗（人数）"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="失业（人数）">
                        <el-input :disabled="isDisabled" v-model="insuredInfoForm.unemployedAmount" placeholder="请输入失业（人数）"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="工伤（人数）">
                        <el-input :disabled="isDisabled" v-model="insuredInfoForm.industrialAmount" placeholder="请输入工伤（人数）"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="生育（人数）">
                        <el-input :disabled="isDisabled" v-model="insuredInfoForm.birthAmount" placeholder="请输入生育（人数）"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="医疗保险联网及时结算设备">
                        <el-input :disabled="isDisabled" v-model="institutionBasic.settleEquipment" placeholder="请输入医疗保险联网及时结算设备"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <!-- todo -->
                    <el-form-item label="申请定点类型">
                        <el-select :disabled="isDisabled" v-model="insuredInfoForm.applyType" placeholder="请选择申请定点类型">
                            <el-option
                            v-for="item in applyTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
    <div class="applyInfo"  v-if="isDisabled">
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
            <el-form :model="departform">
                <h4>门诊科室</h4>
                <el-row class="pd15">
                    <el-checkbox-group v-model="departform.outDepartments">
                        <el-checkbox v-for="outDepart in outpatientDepartments" :label="outDepart.value" :key="outDepart.value">{{outDepart.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-row>
                <h4>住院科室</h4>
                <el-row class="pd15">
                    <!-- todo -->
                    <el-table
                    border
                    :data="outDepartmentData"
                    style="width: 100%">
                        <el-table-column
                            prop="departName_1"
                            label="科室">
                        </el-table-column>
                        <el-table-column
                            prop="beds_1"
                            label="床位数">
                            <template slot-scope="scope">
                                <span v-if="isDisabled">{{ scope.row.beds_1 }}</span>
                                <el-input v-if="!isDisabled" v-model="scope.row.beds_1"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="departName_2"
                            label="科室">
                        </el-table-column>
                        <el-table-column
                            prop="beds_2"
                            label="床位数">
                            <template slot-scope="scope">
                                <span v-if="isDisabled">{{ scope.row.beds_2 }}</span>
                                <el-input v-if="!isDisabled" v-model="scope.row.beds_2"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="departName_3"
                            label="科室">
                        </el-table-column>
                        <el-table-column
                            prop="beds_3"
                            label="床位数">
                            <template slot-scope="scope">
                                <span v-if="isDisabled">{{ scope.row.beds_3 }}</span>
                                <el-input v-if="!isDisabled" v-model="scope.row.beds_3"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="departName_4"
                            label="科室">
                        </el-table-column>
                        <el-table-column
                            prop="beds_4"
                            label="床位数">
                            <template slot-scope="scope">
                                <span v-if="isDisabled">{{ scope.row.beds_4 }}</span>
                                <el-input v-if="!isDisabled" v-model="scope.row.beds_4"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-form>
        </el-row>
    </div>
    <div class="applyInfo">
        <h3 class="infoTitle">大型医疗器械清单</h3>
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
                        <span v-if="isDisabled">{{ scope.row.chargingPrice }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.chargingPrice"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="enablationTime"
                    label="启用时间">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.startUsingDate }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.startUsingDate"></el-input>
                    </template>
                </el-table-column> 
                <el-table-column
                    prop="feeStandards"
                    label="收费标准">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.chargingType }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.chargingType"></el-input>
                    </template>
                </el-table-column> 
            </el-table>
        </el-row>
    </div>
    <div class="applyInfo">
        <h3 class="infoTitle">上年度收支情况</h3>
        <el-row class="infoContainer">
            <el-table
                :data="incomeTrance"
                border
                style="width: 100%">
                <el-table-column
                    prop="outpatientAmount"
                    label="门诊诊疗人次">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.outpatientTimes }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.outpatientTimes"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="perOutpatientPayment"
                    label="次均门诊费用">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.avgTimeOutpatientIncome }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.avgTimeOutpatientIncome"></el-input>
                    </template>
                </el-table-column> 
                <el-table-column
                    prop="inpatientAmount"
                    label="住院人数">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.inpatientTimes }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.inpatientTimes"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="perInpatientPayment"
                    label="次均住院费用">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.avgTimeInpatientIncome }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.avgTimeInpatientIncome"></el-input>
                    </template>
                </el-table-column> 
                <el-table-column
                    prop="perPersonInpatientPayment"
                    label="人均住院费用">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.avgPeopleInpatientIncome }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.avgPeopleInpatientIncome"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="perStayDays"
                    label="平均住院日">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.avgInpatientDays }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.avgInpatientDays"></el-input>
                    </template>
                </el-table-column> 
                <el-table-column
                    prop="bedUsageRate "
                    label="床位使用率">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.rateOfBedUsing }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.rateOfBedUsing"></el-input>
                    </template>
                </el-table-column> 
                <el-table-column
                    prop="other"
                    label="其他">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.remarks }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.remarks"></el-input>
                    </template>
                </el-table-column> 
            </el-table>
            <p class="tips">单位：元/日/人</p>
        </el-row>
    </div>
    <div class="applyInfo">
        <h3 class="infoTitle">医疗机构从事医疗保险管理人员名单</h3>
        <el-row class="infoContainer">
            <!-- todo -->
            <el-table
                :data="medicalInsurance"
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
                            :value="sex.value">
                            </el-option>
                        </el-select>
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
                    prop="specialty"
                    label="专业">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.specialty }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.specialty"></el-input>
                    </template>
                </el-table-column> 
                <el-table-column
                    prop="isFullTime"
                    label="专（兼）职">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.isFullTime }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.isFullTime"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="job"
                    label="工作岗位">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.job }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.job"></el-input>
                    </template>
                </el-table-column> 
                <el-table-column
                    prop="telphone"
                    label="联系电话">
                    <template slot-scope="scope">
                        <span v-if="isDisabled">{{ scope.row.telphone }}</span>
                        <el-input v-if="!isDisabled" v-model="scope.row.telphone"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
    <div class="applyInfo">
        <h3 class="infoTitle">医疗机构卫生专业技术人员花名册</h3>
        <el-row class="infoContainer">
            <el-upload 
                v-if="!isDisabled" 
                class="uploadExcel"
                action=""
                >
                <el-button type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">这里是一些关于温馨提示</div>
            </el-upload>
            <el-table
                :data="technicialStaffInfo"
                border
                v-if="isDisabled"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别">
                </el-table-column> 
                <el-table-column
                    prop="idNo"
                    label="身份证号">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="职称">
                </el-table-column> 
                <el-table-column
                    prop="qualityCertifyNo"
                    label="医师资格证书号码">
                </el-table-column>
                <el-table-column
                    prop="practiceCertifyNo"
                    label="医师(护士)执业证书号码">
                </el-table-column> 
            </el-table>
            <el-pagination
                v-if="isDisabled"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000">
            </el-pagination>
        </el-row>
    </div>
    <div class="applyInfo">
    <h3 class="infoTitle">证件类信息</h3>
    <el-row class="infoContainer materialContainer">
        <!-- 有图 -->
        <el-col :span="6">
            <el-upload
                class="certifyUpload"
                action="">
                <!-- <img src="../../assets/logo.png"> -->
                <i class="el-icon-picture"></i>
                <p>《医疗机构执业许可证》正</p>
            </el-upload>
        </el-col>
        <el-col :span="6">
            <el-upload
                class="certifyUpload"
                action="">
                <!-- <img src="../../assets/logo.png"> -->
                <i class="el-icon-picture"></i>
                <p>《医疗机构执业许可证》反</p>
            </el-upload>
        </el-col>
        <el-col :span="6">
                <el-upload
                class="certifyUpload"
                action="">
                <i class="el-icon-picture"></i>
                <p>《医疗机构执业许可证》复印件正</p>
                </el-upload>
        </el-col>
        <el-col :span="6">
                <el-upload
                class="certifyUpload"
                action="">
                <i class="el-icon-picture"></i>
                <p>《医疗机构执业许可证》复印件反</p>
                </el-upload>
        </el-col>
        <el-col :span="6">
                <el-upload
                class="certifyUpload"
                action="">
                <i class="el-icon-picture"></i>
                <p>法定代表人（负责人）身份证正</p>
                </el-upload>
        </el-col>
        <el-col :span="6">
            <el-upload
                class="certifyUpload"
                action="">
                <i class="el-icon-picture"></i>
                <p>法定代表人（负责人）身份证反</p>
            </el-upload>
        </el-col>
    </el-row>
    </div>
</div>
</template>
<script>
import {
    OwnerShipTypes,
    OrganizationTypes,
    BusinessTypes,
    ServiceObjs,
    ApplyTypes,
    OutpatientDepartments,
    InpatientDepartments,
    SexTypes
} from "../../utils/Constant"
export default {
    name: 'OriginalMedicalMaterial',
    props:{
        nickName:String,
        institutionBasic:Object, 
        socialInsurance:Object,
        department:Object,
        equipmentList:Array,
        incomeTrance:Array,
        medicalInsurance:Array,
        isDisabled:Boolean
    },
    data: function () {
      return {
        ownerShipTypes: OwnerShipTypes,
        organizationTypes: OrganizationTypes,
        businessTypes: BusinessTypes,
        serviceObjs: ServiceObjs,
        applyTypes: ApplyTypes,
        outpatientDepartments: OutpatientDepartments,
        inpatientDepartments: InpatientDepartments,
        sexTypes:SexTypes,
        
        dialogInDepart:false,
        departform:{
           outDepartments:[],
           inDepartments:[],
        },
        baseInfoForm: {
          hospitalName: '日照人民医院',
          hospitalAddress: '日照市',
          legalPerson: 'XXX',
          legalTel: '13011113333',
          linkPerson: 'XXXX',
          linkTel: '13011114444',
          bank: '建设银行',
          bankNumber: '6214980823245',
          workersAmount: '907',
          singedAmount: '545'
        },
        currentPage3:1,
        qualityInfoForm: {
            licenseRegNumber: 'SAF11111',
            ownerShipType:'全日制',
            organizationType: '三级甲等',
            businessType: '民营',
            plannedBeds: '420',
            actualBeds: '800',
            medicalOrgGrade: '三级',
            serviceObj: '全部',
            medicalSubject: '小儿外科、妇科、骨科、神经外科、眼科',
            vaildDate: '1949-10-01',
            endDate: '2049-10-01'
        },
        insuredInfoForm: {
            socialPaymentAccountNo:'SAF54628562',
            insuredTime:'全日制',
            partedInsured:['养老','生育'],
            agedAmount:'300',
            medicalAmount:'300',
            unemployedAmount:'300',
            industrialAmount:'300',
            birthAmount:'300',
            isEquipment:'是',
            applyType:'住院定点'
        },
        healthPersonnelInfo:[
            {
                category: '医师',
                amount: 520,
                senior: 200,
                intermediate:100,
                junior:220
            }, {
                category: '护士',
                amount: 520,
                senior: 200,
                intermediate:100,
                junior:220
            }, {
                category: '医技人员',
                amount: 520,
                senior: 200,
                intermediate:100,
                junior:220
            }, {
                category: '合计',
                amount: 520,
                senior: 200,
                intermediate:100,
                junior:220
            }, 
            {
                category: '按医疗机构基本标准配置人数',
                amount: 720,
                senior: '',
                intermediate:'',
                junior:''
            }
        ],
        outDepartmentData:[
            {
                departName_1:"呼吸内科",
                beds_1:"300",
                departName_2:"呼吸内科",
                beds_2:"300",
                departName_3:"呼吸内科",
                beds_3:"300",
                departName_4:"呼吸内科",
                beds_4:"300",
            },
            {
                departName_1:"呼吸内科",
                beds_1:"300",
                departName_2:"呼吸内科",
                beds_2:"300",
                departName_3:"呼吸内科",
                beds_3:"300",
                departName_4:"呼吸内科",
                beds_4:"300",
            }
        ],
        largeMedicalDevicesInfo:[
            {
                deviceName:'呼吸机',
                specification:'522.62',
                proStandards:'20.826',
                factory:'日照',
                price:'25',
                enablationTime:'2007.01',
                feeStandards:'200元/次'
            },
            {
                deviceName:'各种内窥镜',
                specification:'522.62',
                proStandards:'20.826',
                factory:'日照',
                price:'25',
                enablationTime:'2007.01',
                feeStandards:'200元/次'
            }
        ],
        lastYearPaymentInfo:[
            {
                outpatientAmount: '65652',
                perOutpatientPayment: '530',
                inpatientAmount: '5097',
                perInpatientPayment: '1053',
                perPersonInpatientPayment: '3050',
                perStayDays: '7',
                bedUsageRate: '90%',
                other: '无',
            }
        ],
        medInsManagersInfo:[
            {
                name: '方圆',
                sex: '男',
                duty: '医师大',
                specialty: '医师大',
                isFullTime: '消化科',
                job: '专职',
                telphone: '12345678900',
            }
        ],
        technicialStaffInfo:[
            {
                name: '方圆',
                sex: '男',
                idNo: '130789197912048904',
                title: '医师',
                qualityCertifyNo: 'SEC25612231',
                practiceCertifyNo: 'SEC25612231' 
            }
        ]
      }
    },
    methods: {
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        addLargeMedicalDevicesInfo(){
            let singleLargeMedDevInfo = {
                name: '',
                sex: '',
                duty: '',
                specialty: '',
                isFullTime: '',
                job: '',
                telphone: '',
            }
            this.largeMedicalDevicesInfo.push(singleLargeMedDevInfo)
        },
        deleteLargeMedicalDevicesInfo(rowIndex,row){
            this.$confirm('您是否确定删除此条记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.largeMedicalDevicesInfo.splice(rowIndex,1)
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
        addMedInsManagersInfo(){
            let singleMedInsManageInfo = {
                deviceName:'',
                specification:'',
                proStandards:'',
                factory:'',
                price:'',
                enablationTime:'',
                feeStandards:''
            }
            this.medInsManagersInfo.push(singleMedInsManageInfo)
        },
        deleteMedInsManagersInfo(rowIndex,row){
            this.$confirm('您是否确定删除此条记录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.medInsManagersInfo.splice(rowIndex,1)
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
        handleSizeChange(){

        }
    }
}
</script>