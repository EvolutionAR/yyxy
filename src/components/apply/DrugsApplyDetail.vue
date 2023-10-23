<template>
  <div>
       <div class="breadcrumbContainer">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>两定机构管理</el-breadcrumb-item>
                <el-breadcrumb-item>申请管理</el-breadcrumb-item>
                <el-breadcrumb-item>全部</el-breadcrumb-item>
            </el-breadcrumb>
            <h1>日照人民医院<span>申请时间：2019-06-30 10:02</span></h1>
            <div class="breadcrumbBtn">
                <el-button type="primary">通过</el-button>
                <el-button type="danger" plain>未通过</el-button>
            </div>
        </div>
        <el-row class="stepsContainer">
            <el-col :span="18" :offset="3">
                <el-steps :active="activeStep" finish-status="success" process-status="success" align-center>
                    <el-step v-for="(step,stepIndex) in steps" :key="stepIndex" :title="step.stepName"></el-step>
                </el-steps>
            </el-col>
            
        </el-row>
        <div class="applyDetailContainer">
            <el-collapse v-model="activeApplyData" @change="handleChange">
                <el-collapse-item v-for="(applyData,applyIndex) in applyDatas" :key="applyIndex" :title="applyData.applyTitle" :name="applyIndex">
                    <div v-if="applyData.step==0" class="applyInfos">
                        <div class="applyInfo">
                            <h3 class="infoTitle">基本信息</h3>
                            <el-row class="infoContainer">
                                <el-form :inline="true" :model="baseInfoForm">
                                    <el-col :span="6">
                                        <el-form-item label="医院名称">
                                            <el-input :disabled="isDiseabled" v-model="baseInfoForm.hospitalName" placeholder="请输入医院名称"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="医院地址">
                                            <el-input :disabled="isDiseabled" v-model="baseInfoForm.hospitalAddress" placeholder="请输入医院地址"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="法人名称（负责人）">
                                            <el-input :disabled="isDiseabled" v-model="baseInfoForm.legalPerson" placeholder="请输入法人名称（负责人）"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="电话">
                                            <el-input :disabled="isDiseabled" v-model="baseInfoForm.legalTel" placeholder="请输入电话"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="联系人">
                                            <el-input :disabled="isDiseabled" v-model="baseInfoForm.linkPerson" placeholder="请输入医院名称"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="联系电话">
                                            <el-input :disabled="isDiseabled" v-model="baseInfoForm.linkTel" placeholder="请输入医院地址"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="单位电子邮箱">
                                            <el-input :disabled="isDiseabled" v-model="baseInfoForm.companyMail" placeholder="请输入法人名称（负责人）"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="开户银行">
                                            <el-input :disabled="isDiseabled" v-model="baseInfoForm.bank" placeholder="请输入电话"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="开户行账号">
                                            <el-input :disabled="isDiseabled" v-model="baseInfoForm.bankNumber" placeholder="请输入医院地址"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="职工总人数">
                                            <el-input :disabled="isDiseabled" v-model="baseInfoForm.workersAmount" placeholder="请输入法人名称（负责人）"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="签订劳动合同人数">
                                            <el-input :disabled="isDiseabled" v-model="baseInfoForm.singedAmount" placeholder="请输入电话"></el-input>
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
                                            <el-input :disabled="isDiseabled" v-model="qualityInfoForm.licenseRegNumber" placeholder="请输入执业许可证登记号"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="所有制形式">
                                            <el-select :disabled="isDiseabled" v-model="qualityInfoForm.ownerShipType" placeholder="请选择医院名称所有制形式">
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
                                            <el-select :disabled="isDiseabled" v-model="qualityInfoForm.organizationType" placeholder="请选择医疗机构类型">
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
                                            <el-select :disabled="isDiseabled" v-model="qualityInfoForm.businessType" placeholder="请选择经营类型">
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
                                            <el-input :disabled="isDiseabled" v-model="qualityInfoForm.plannedBeds" placeholder="请输入编制床位"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="实际床位">
                                            <el-input :disabled="isDiseabled" v-model="qualityInfoForm.actualBeds" placeholder="请输入实际床位"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="医疗机构评审等级">
                                            <el-input :disabled="isDiseabled" v-model="qualityInfoForm.medicalOrgGrade" placeholder="请输入医疗机构评审等级"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="服务对象">
                                            <el-select :disabled="isDiseabled" v-model="qualityInfoForm.serviceObj" placeholder="请选择服务对象">
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
                                        <el-form-item label="诊疗科目">
                                            <el-input :disabled="isDiseabled" v-model="qualityInfoForm.medicalSubject" placeholder="请输入诊疗科目"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="有效时间">
                                            <el-date-picker
                                                :disabled="isDiseabled"
                                                v-model="qualityInfoForm.vaildDate"
                                                type="date"
                                                placeholder="请选择有效时间"
                                                >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="终止时间">
                                            <el-date-picker
                                                :disabled="isDiseabled"
                                                v-model="qualityInfoForm.endDate"
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
                            <el-row class="infoContainer">
                                <el-form :inline="true" :model="insuredInfoForm">
                                    <el-col :span="6">
                                        <el-form-item label="社会缴费账号号码">
                                            <el-input :disabled="isDiseabled" v-model="insuredInfoForm.socialPaymentAccountNo" placeholder="请输入医院名称所有制形式"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="参保时间">
                                            <el-input :disabled="isDiseabled" v-model="insuredInfoForm.insuredTime" placeholder="请输入参保时间"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="已参加险种">
                                            <el-checkbox-group v-model="insuredInfoForm.partedInsured" :disabled="isDiseabled">
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
                                            <el-input :disabled="isDiseabled" v-model="insuredInfoForm.agedAmount" placeholder="请输入养老（人数）"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="医疗（人数）">
                                            <el-input :disabled="isDiseabled" v-model="insuredInfoForm.medicalAmount" placeholder="请输入医疗（人数）"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="失业（人数）">
                                            <el-input :disabled="isDiseabled" v-model="insuredInfoForm.unemployedAmount" placeholder="请输入失业（人数）"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="工伤（人数）">
                                            <el-input :disabled="isDiseabled" v-model="insuredInfoForm.industrialAmount" placeholder="请输入工伤（人数）"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="生育（人数）">
                                            <el-input :disabled="isDiseabled" v-model="insuredInfoForm.birthAmount" placeholder="请输入生育（人数）"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="医疗保险联网及时结算设备">
                                            <el-input :disabled="isDiseabled" v-model="insuredInfoForm.isEquipment" placeholder="请输入医疗保险联网及时结算设备"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="申请定点类型">
                                            <el-select :disabled="isDiseabled" v-model="insuredInfoForm.applyType" placeholder="请选择申请定点类型">
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
                        <div class="applyInfo">
                            <h3 class="infoTitle">卫生技术人员</h3>
                            <el-row class="infoContainer">
                                <table class="columnTable">
                                    <tr>
                                        <td>人员类别</td>
                                        <td>总人数</td>
                                        <td>高级职称</td>
                                        <td>中级职称</td>
                                        <td>初级职称</td>
                                    </tr>
                                    <tr v-for="(col,index) in healthPersonnelInfo" :key="index"> 
                                        <td>{{col.category}}</td>
                                        <td v-if="index==(healthPersonnelInfo.length-1)" colspan="4">{{col.amount}}</td>
                                        <td v-if="index!=(healthPersonnelInfo.length-1)">{{col.amount}}</td>
                                        <td v-if="index!=(healthPersonnelInfo.length-1)">{{col.senior}}</td>
                                        <td v-if="index!=(healthPersonnelInfo.length-1)">{{col.intermediate}}</td>
                                        <td v-if="index!=(healthPersonnelInfo.length-1)">{{col.junior}}</td>
                                    </tr>
                                </table>
                            </el-row>
                        </div>
                        <div class="applyInfo">
                            <h3 class="infoTitle">科室设置</h3>
                            <el-row class="infoContainer">
                                <table class="columnTable">
                                    <tr>
                                        <td width="100px">门诊科室</td>
                                        <td colspan="6">
                                            <p>呼吸内科、消化内科、泌尿内科、心内科、血液科、内分泌科、神经内科、小儿科、感染科、普外科、骨科、神经外科、肝胆外科、泌尿外科、烧伤科、妇科、产科、血透室、重症监护室等。</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td rowspan="3">住院科室</td>
                                        <td>科室</td>
                                        <td>床位数</td>
                                        <td>科室</td>
                                        <td>床位数</td>
                                        <td>科室</td>
                                        <td>床位数</td>
                                    </tr>
                                    <tr>
                                        <td>呼吸内科</td>
                                        <td>200</td>
                                        <td>泌尿内科</td>
                                        <td>100</td>
                                        <td>妇科</td>
                                        <td>40</td>
                                    </tr>
                                    <tr>
                                        <td>消化内科</td>
                                        <td>200</td>
                                        <td>心内科</td>
                                        <td>100</td>
                                        <td>泌尿外科</td>
                                        <td>40</td>
                                    </tr>
                                </table>
                            </el-row>
                        </div>
                        <div class="applyInfo">
                            <h3 class="infoTitle">大型医疗器械清单</h3>
                            <el-row class="infoContainer">
                                <el-table
                                    :data="largeMedicalDevicesInfo"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                        prop="deviceName"
                                        label="设备名称">
                                    </el-table-column>
                                    <el-table-column
                                        prop="specification"
                                        label="规格型号">
                                    </el-table-column> 
                                    <el-table-column
                                        prop="proStandards"
                                        label="产品标准">
                                    </el-table-column>
                                    <el-table-column
                                        prop="factory"
                                        label="生产厂家">
                                    </el-table-column> 
                                    <el-table-column
                                        prop="price"
                                        label="价格（万元）">
                                    </el-table-column>
                                    <el-table-column
                                        prop="enablationTime"
                                        label="启用时间">
                                    </el-table-column> 
                                    <el-table-column
                                        prop="feeStandards"
                                        label="收费标准">
                                    </el-table-column> 
                                </el-table>
                            </el-row>
                        </div>
                        <div class="applyInfo">
                            <h3 class="infoTitle">上年度收支情况</h3>
                            <el-row class="infoContainer">
                                <el-table
                                    :data="lastYearPaymentInfo"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                        prop="outpatientAmount"
                                        label="门诊诊疗人次">
                                    </el-table-column>
                                    <el-table-column
                                        prop="perOutpatientPayment"
                                        label="次均门诊费用">
                                    </el-table-column> 
                                    <el-table-column
                                        prop="inpatientAmount"
                                        label="住院人数">
                                    </el-table-column>
                                    <el-table-column
                                        prop="perInpatientPayment"
                                        label="次均住院费用">
                                    </el-table-column> 
                                    <el-table-column
                                        prop="perPersonInpatientPayment"
                                        label="人均住院费用">
                                    </el-table-column>
                                    <el-table-column
                                        prop="perStayDays"
                                        label="平均住院日">
                                    </el-table-column> 
                                    <el-table-column
                                        prop="bedUsageRate "
                                        label="床位使用率">
                                    </el-table-column> 
                                    <el-table-column
                                        prop="other"
                                        label="其他">
                                    </el-table-column> 
                                </el-table>
                            </el-row>
                        </div>
                        <div class="applyInfo">
                            <h3 class="infoTitle">医疗机构从事医疗保险管理人员名单</h3>
                            <el-row class="infoContainer">
                                <el-table
                                    :data="medInsManagersInfo"
                                    border
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
                                        prop="duty"
                                        label="职务">
                                    </el-table-column>
                                    <el-table-column
                                        prop="specialty"
                                        label="专业">
                                    </el-table-column> 
                                    <el-table-column
                                        prop="isFullTime"
                                        label="专（兼）职">
                                    </el-table-column>
                                    <el-table-column
                                        prop="job"
                                        label="工作岗位">
                                    </el-table-column> 
                                    <el-table-column
                                        prop="telphone"
                                        label="联系电话">
                                    </el-table-column> 
                                </el-table>
                            </el-row>
                        </div>
                        <div class="applyInfo">
                            <h3 class="infoTitle">医疗机构卫生专业技术人员花名册</h3>
                            <el-row class="infoContainer">
                                <el-table
                                    :data="technicialStaffInfo"
                                    border
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
                            <el-row class="infoContainer">
                                <el-row> 
                                    <!-- 有图 -->
                                    <el-col :span="6">
                                        <el-upload
                                            class="certifyImg"
                                            action="">
                                            <!-- <img src="../../assets/logo.png"> -->
                                            <i class="el-icon-picture"></i>
                                            <p>《医疗机构执业许可证》正</p>
                                        </el-upload>
                                    </el-col>
                                   <el-col :span="6">
                                        <el-upload
                                            class="certifyImg"
                                            action="">
                                            <!-- <img src="../../assets/logo.png"> -->
                                            <i class="el-icon-picture"></i>
                                            <p>《医疗机构执业许可证》反</p>
                                        </el-upload>
                                    </el-col>
                                    <el-col :span="6">
                                         <el-upload
                                            class="certifyImg"
                                            action="">
                                            <i class="el-icon-picture"></i>
                                            <p>《医疗机构执业许可证》复印件正</p>
                                         </el-upload>
                                    </el-col>
                                    <el-col :span="6">
                                         <el-upload
                                            class="certifyImg"
                                            action="">
                                            <i class="el-icon-picture"></i>
                                            <p>《医疗机构执业许可证》复印件反</p>
                                         </el-upload>
                                    </el-col>
                                    <el-col :span="6">
                                         <el-upload
                                            class="certifyImg"
                                            action="">
                                            <i class="el-icon-picture"></i>
                                            <p>法定代表人（负责人）身份证正</p>
                                         </el-upload>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-upload
                                            class="certifyImg"
                                            action="">
                                            <i class="el-icon-picture"></i>
                                            <p>法定代表人（负责人）身份证反</p>
                                        </el-upload>
                                    </el-col>
                                </el-row>
                            </el-row>
                         </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
  </div>
</template>
<script>
export default {
    name: 'DrugsApplyDetail',
    data: function () {
      return {
        ownerShipTypes: [
            {
                value: '1',
                label: '全日制'
            }
        ],
        organizationTypes:[
            {
                value: '1',
                label: '三级甲等'
            }
        ],
        businessTypes:[
            {
                value: '1',
                label: '民营'
            }
        ],
        serviceObjs:[
            {
                value: '1',
                label: '全部'
            }
        ],
        applyTypes:[
            {
                value: '1',
                label: '定点医院'
            }
        ],
        activeStep: 0,
        steps: [
            {
                stepName: '准备材料'
            },{
                stepName: '材料初审'
            },{
                stepName: '复审（现场评估）'
            },{
                stepName: '医师考试'
            },{
                stepName: '信息公示'
            },{
                stepName: '协议签订'
            },{
                stepName: '申请成功'
            }
        ],
        activeApplyData: [0],
        isDiseabled:false,
        applyDatas: [
            {
                applyTitle: '日照人民医院申请材料',
                step:0,
                // applyActiveTitle: '基本信息',
            },
            {
                applyTitle: '日照人民医院现场资料',
            },
            {
                applyTitle: '日照人民医院医师考试详情',
            },
            {
                applyTitle: '日照人民医院医师公示',
            },
            {
                applyTitle: '日照人民医院协议上传',
            }
        ],
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
                amount: 720
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
                name: '韩商言',
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
                name: '韩商言',
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
        // initTitle(applyData,applyIndex){
        //     if(this.activeApplyData.indexOf(applyIndex)>-1){
        //         return applyData.applyActiveTitle;
        //     }
        //     return applyData.applyTitle
        // },
        handleChange(){

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (rowIndex  === (this.healthPersonnelInfo.length-1)) {
                if (columnIndex === 0) {
                    return [1, 3];
                } else if (columnIndex === 1) {
                    return [1, 2];
                }
            }
        },
    }
}
</script>
