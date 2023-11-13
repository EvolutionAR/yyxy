import TkpAxios from "../utils/TkAxios";
// let tkAxios = new TkpAxios(process.env.CONTEXT_URL)
console.log("process.env", process.env.NODE_ENV);
let getBaseUrl = nodeEnv => {
  let baseUrl;
  switch (nodeEnv) {
    case "development":
      // baseUrl = 'http://easymock.apps.uat.taikangcloud.com/mock/5d53d2c54314210017939bcc'
      baseUrl = "http://127.0.0.1:7001";
      break;
    case "test":
      baseUrl = "";
      break;
    case "production":
      baseUrl = "";
      break;
  }
  return baseUrl;
};
console.log("getBaseUrl(process.env)", getBaseUrl(process.env.NODE_ENV));
let tkAxios = new TkpAxios(getBaseUrl(process.env.NODE_ENV));
// tkAxios.refreshTokenRequst()
//
const usercreate = params => {
  // 学员账号创建
  return tkAxios.post(`/api/user/create`, params).then(res => res.data);
};
const userlist = params => {
  // 学员账号创建
  return tkAxios.post(`/api/user`, params).then(res => res.data);
};
// 登录相关
const getLoginKey = () => {
  // 获取密钥
  return tkAxios
    .get(`/imis/user/srv/api/login/getLoginKey`, {}, {}, true)
    .then(res => res.data);
};
const getTimestamp = () => {
  // 获取当前时间戳
  return tkAxios
    .get(`/imis/user/srv/api/login/getTimestamp`, {}, {}, true)
    .then(res => res.data);
};
const bureauLogin = params => {
  //
  return tkAxios
    .post(`/imis/user/srv/api/login/bureauLogin`, params, true)
    .then(res => res.data);
};
const personLogin = params => {
  // 个人用户登录
  return tkAxios
    .post(`/imis/user/srv/api/login/personLogin`, params)
    .then(res => res.data);
};
const institutionLogin = params => {
  // 机构用户登录
  return tkAxios
    .post(`/imis/user/srv/api/login/institutionLogin`, params)
    .then(res => res.data);
};
const Logout = (paramsUrl, params) => {
  // 登出
  return tkAxios
    .post(`/imis/user/srv/api/auth/logout`, paramsUrl, params)
    .then(res => res.data);
};
const createInstitutionUser = params => {
  // 创建机构账号
  return tkAxios
    .post(`/imis/user/srv/api/user/createInstitutionUser`, params)
    .then(res => res.data);
};
const getMenu = (paramsUrl, params) => {
  // 获取左侧菜单
  return tkAxios
    .post(`/imis/user/srv/api/user/getMenu`, paramsUrl, params)
    .then(res => res.data);
};
const getUserMessages = paramsUrl => {
  // 获取消息列表
  return tkAxios
    .get(`/imis/user/srv/api/user/getUserMessages`, paramsUrl)
    .then(res => res.data);
};
const resetPassword = params => {
  // 重置密码
  return tkAxios
    .post(`/imis/user/srv/api/login/resetPassword`, params)
    .then(res => res.data);
};
// person list
const getMedicalList = paramsUrl => {
  // 获取医保办人员列表
  return tkAxios
    .get(`/imis/user/srv/api/application/getMedicalList`, paramsUrl)
    .then(res => res.data);
};
const getNurseList = paramsUrl => {
  // 获取医院护士列表
  return tkAxios
    .get(`/imis/user/srv/api/application/getNurseList`, paramsUrl)
    .then(res => res.data);
};
const getParamedicList = paramsUrl => {
  // 获取医院医技人员列表
  return tkAxios
    .get(`/imis/user/srv/api/application/getParamedicList `, paramsUrl)
    .then(res => res.data);
};
const getPhysicianList = paramsUrl => {
  // 获取医院医师列表
  return tkAxios
    .get(`/imis/user/srv/api/application/getPhysicianList `, paramsUrl)
    .then(res => res.data);
};
// Flow
const getApplyList = params => {
  // 获取申请列表
  return tkAxios
    .post(`/imis/flow/srv/api/task/getApplyList`, params)
    .then(res => res.data);
};
const getToDoList = params => {
  // 获取待办事项页表
  return tkAxios
    .post(`/imis/flow/srv/api/task/getToDoList`, params)
    .then(res => res.data);
};
const getFlowList = params => {
  // 查询FLOW定义列表接口
  return tkAxios
    .post(`/imis/flow/srv/api/process/getFlowList`, params)
    .then(res => res.data);
};
const getTaskTrace = paramsUrl => {
  // 获取申请流程轨迹接口
  return tkAxios
    .get(`/imis/flow/srv/api/task/getTaskTrace`, paramsUrl)
    .then(res => res.data);
};
const getNodeData = params => {
  // 获取节点信息
  return tkAxios
    .post(`/imis/flow/srv/api/node/getNodeData`, params)
    .then(res => res.data);
};
const saveTempNode = params => {
  // 结点暂存接口
  return tkAxios
    .post(`/imis/flow/srv/api/node/saveTempNode`, params)
    .then(res => res.data);
};
const newApplyTask = params => {
  // 流程申请/开始接口
  return tkAxios
    .post(`/imis/flow/srv/api//task/newApplyTask`, params)
    .then(res => res.data);
};
const applyData = params => {
  // 机构申请提交
  return tkAxios
    .post(`/imis/sdrz/institution/srv/api/application/apply`, params)
    .then(res => res.data);
};
const getToDoCount = params => {
  // 获取代办事项数目
  return tkAxios
    .post(`/imis/flow/srv/api/task/getToDoCount`, params)
    .then(res => res.data);
}; // 复审提交接口
// INSTITUTION
const getInstitutionType = paramsUrl => {
  // 获取机构类型字典
  return tkAxios
    .get(
      `/imis/sdrz/institution/srv/api/application/getInstitutionType`,
      paramsUrl
    )
    .then(res => res.data);
};
const getInstitutionBasic = paramsUrl => {
  // 查询机构的基本信息
  return tkAxios
    .get(
      `/imis/sdrz/institution/srv/api/application/getInstitutionBasic`,
      paramsUrl
    )
    .then(res => res.data);
};
const getDepartment = paramsUrl => {
  // 查询机构科室信息
  return tkAxios
    .get(`/imis/sdrz/institution/srv/api/application/getDepartment`, paramsUrl)
    .then(res => res.data);
};
const getEquipmentList = paramsUrl => {
  // 查询机构医疗设备信息
  return tkAxios
    .get(
      `/imis/sdrz/institution/srv/api/application/getEquipmentList`,
      paramsUrl
    )
    .then(res => res.data);
};
const getIncomeTrance = paramsUrl => {
  // 查询机构去年收支流水
  return tkAxios
    .get(
      `/imis/sdrz/institution/srv/api/application/getIncomeTrance`,
      paramsUrl
    )
    .then(res => res.data);
};
const getMedicalInsurance = paramsUrl => {
  return tkAxios
    .get(
      `/imis/sdrz/institution/srv/api/application/getMedicalInsurance`,
      paramsUrl
    )
    .then(res => res.data);
};
const getSocialInsurance = paramsUrl => {
  // 查询机构参保信息
  return tkAxios
    .get(
      `/imis/sdrz/institution/srv/api/application/getSocialInsurance`,
      paramsUrl
    )
    .then(res => res.data);
};
const getRoster = params => {
  // 多条件分页查询花名册
  return tkAxios
    .post(`/imis/sdrz/institution/srv/api/application/getRoster`, params)
    .then(res => res.data);
};
const getAllInstitution = () => {
  // 获取所有机构
  return tkAxios
    .get(`/imis/sdrz/institution/srv/api/system/getAllInstitution`)
    .then(res => res.data);
};
const getAllInstitutionList = params => {
  return tkAxios
    .get(
      `/imis/sdrz/institution/srv/api/system/getAllInstitutionList`,
      {},
      params
    )
    .then(res => res.data);
};
const getAllPersonType = () => {
  return tkAxios
    .get(`/imis/sdrz/institution/srv/api/system/getAllPersonType`)
    .then(res => res.data);
};
const getApplyedInstitution = params => {
  return tkAxios
    .get(
      `/imis/sdrz/institution/srv/api/application/getApplyedInstitution`,
      {},
      params
    )
    .then(res => res.data);
};
const statisticsSumPersonByTitle = paramsUrl => {
  return tkAxios
    .get(
      `/imis/sdrz/institution/srv/api/institution/statisticsSumPersonByTitle`,
      paramsUrl
    )
    .then(res => res.data);
};
// dictionary
const getAllInpatientDepartment = () => {
  // 查询所有住院科室
  return tkAxios
    .get(`/imis/sdrz/institution/srv/api/system/getAllInpatientDepartment`)
    .then(res => res.data);
};
const getAllOutpatientDepartment = () => {
  // 查询所有门诊科室
  return tkAxios
    .get(`/imis/sdrz/institution/srv/api/system/getAllOutpatientDepartment`)
    .then(res => res.data);
};
const getAllRisk = () => {
  // 查询所有险种
  return tkAxios
    .get(`/imis/sdrz/institution/srv/api/system/getAllRisk`)
    .then(res => res.data);
};
const getAllInstitutionType = () => {
  // 查询机构类型
  return tkAxios
    .get(`/imis/sdrz/institution/srv/api/system/getAllInstitutionType`)
    .then(res => res.data);
};
const getAllAssessmentLevel = () => {
  // 获取所有的医疗机构评审等级
  return tkAxios
    .get(`/imis/sdrz/institution/srv/api/system/getAllAssessmentLevel`)
    .then(res => res.data);
};
const getAllOwnership = () => {
  // 获取所有的所有制
  return tkAxios
    .get(`/imis/sdrz/institution/srv/api/system/getAllOwnership`)
    .then(res => res.data);
};
const getAllServiceTarget = () => {
  return tkAxios
    .get(`/imis/sdrz/institution/srv/api/system/getAllServiceTarget`)
    .then(res => res.data);
};
const getAllManagement = () => {
  return tkAxios
    .get(`/imis/sdrz/institution/srv/api/system/getAllManagement`)
    .then(res => res.data);
};
// upload
const uploadNurseInfoExcel = params => {
  return tkAxios
    .post(
      `/imis/sdrz/institution/srv/api/attachment/uploadNurseInfoExcel`,
      params
    )
    .then(res => res.data);
};
const uploadParamedicInfoExcel = params => {
  return tkAxios
    .post(
      `/imis/sdrz/institution/srv/api/attachment/uploadParamedicInfoExcel`,
      params
    )
    .then(res => res.data);
};
const uploadPhysicianInfoExcel = params => {
  return tkAxios
    .post(
      `/imis/sdrz/institution/srv/api/attachment/uploadPhysicianInfoExcel`,
      params
    )
    .then(res => res.data);
};
const uploadPic = params => {
  return tkAxios
    .post(`/imis/sdrz/institution/srv/api/attachment/upload`, params)
    .then(res => res.data);
};
const uploadAnyFileType = params => {
  return tkAxios
    .post(`/imis/sdrz/institution/srv/api/attachment/uploadAnyFileType`, params)
    .then(res => res.data);
};
// material
const getQuestionAnswer = (paramsUrl, params) => {
  // 获取材料问题和答案
  return tkAxios
    .get(`/imis/material/srv/api/material/getQuestionAnswer`, paramsUrl, params)
    .then(res => res.data);
};
const getQuestionList = (paramsUrl, params) => {
  // 获取材料问题列表
  return tkAxios
    .get(`/imis/material/srv/api/material/getQuestionList`, paramsUrl, params)
    .then(res => res.data);
};
const saveQuestionAnswer = params => {
  // 复审保存问题和答案
  return tkAxios
    .post(`/imis/material/srv/api/material/saveQuestionAnswer`, params)
    .then(res => res.data);
};
// node
const saveAttachmentAndAnswer = params => {
  return tkAxios
    .post(`/imis/flow/srv/api/node/saveAttachmentAndAnswer`, params)
    .then(res => res.data);
}; // 复审提交接口
const submitNode = params => {
  return tkAxios
    .post(`/imis/flow/srv/api/node/submitNode`, params)
    .then(res => res.data);
}; // 复审审核接口
const findByInstitutionId = params => {
  return tkAxios
    .post(`/imis/exam/srv/api/examinee/findByInstitutionId`, params)
    .then(res => res.data);
}; // 复审审核接口
// exam
const getExamBatch = params => {
  return tkAxios
    .post(`/imis/exam/srv/api/examBatch/getExamBatch`, params)
    .then(res => {
      if (res.data && (res.data.data || res.data.data === []))
        return res.data.data;
    });
};
const getBatchInfo = paramsUrl => {
  return tkAxios
    .get(`/imis/exam/srv/api/examinee/findByExamId`, paramsUrl)
    .then(res => {
      if (res.data && (res.data.data || res.data.data === []))
        return res.data.data;
    });
};
// 获取及格率
const getRate = paramsUrl => {
  return tkAxios
    .get(`/imis/exam/srv/api/examinee/getRate`, paramsUrl)
    .then(res => res.data);
};

// 创建批次
const createBatch = params => {
  return tkAxios
    .post(`/imis/exam/srv/api/examBatch/saveExamBatch`, params)
    .then(res => {
      if (res.data) return res.data;
    });
};
const uploadPhysicianScore = params => {
  return tkAxios
    .post(`/imis/exam/srv/api/examinee/inputScore`, params)
    .then(res => {
      if (res.data) return res.data;
    });
};
const getBatchInfoByExamId = paramsUrl => {
  return tkAxios
    .get(`/imis/exam/srv/api/examinee/findByExamId`, paramsUrl)
    .then(res => {
      if (res.data && (res.data.data || res.data.data === []))
        return res.data.data;
    });
};
// const getUnExam = () => {
//   return tkAxios.get(`/imis/exam/srv/api/examinee/findByExamId`).then(res => { if (res.data && (res.data.data || res.data.data === [])) return res.data.data })
// }
const getEnrollExamBatch = params => {
  return tkAxios
    .post(`/imis/exam/srv/api/examBatch/getEnrollExamBatch`, params)
    .then(res => {
      if (res.data && (res.data.data || res.data.data === []))
        return res.data.data;
    });
};
const getExamineeCount = () => {
  return tkAxios.get(`/imis/flow/srv/api/node/getExamineeCount`).then(res => {
    if (res.data) return res.data;
  });
};

export {
  usercreate,
  userlist,
  getLoginKey,
  getTimestamp,
  bureauLogin,
  personLogin,
  institutionLogin,
  Logout,
  createInstitutionUser,
  getMenu,
  getUserMessages,
  resetPassword,
  getMedicalList,
  getNurseList,
  getParamedicList,
  getPhysicianList,
  getInstitutionType,
  getApplyList,
  getFlowList,
  getTaskTrace,
  newApplyTask,
  getNodeData,
  saveTempNode,
  applyData,
  statisticsSumPersonByTitle,
  getInstitutionBasic,
  getDepartment,
  getEquipmentList,
  getIncomeTrance,
  getMedicalInsurance,
  getSocialInsurance,
  getAllInpatientDepartment,
  getAllOutpatientDepartment,
  getAllRisk,
  getAllInstitutionType,
  getAllAssessmentLevel,
  getAllOwnership,
  getAllServiceTarget,
  getAllManagement,
  uploadNurseInfoExcel,
  uploadParamedicInfoExcel,
  uploadPhysicianInfoExcel,
  uploadPic,
  getQuestionAnswer,
  getQuestionList,
  saveQuestionAnswer,
  getToDoList,
  saveAttachmentAndAnswer,
  getToDoCount,
  submitNode,
  findByInstitutionId,
  getRoster,
  getAllInstitution,
  getAllInstitutionList,
  getAllPersonType,
  getExamBatch,
  getBatchInfo,
  getApplyedInstitution,
  getRate,
  createBatch,
  uploadPhysicianScore,
  getBatchInfoByExamId,
  getEnrollExamBatch,
  getExamineeCount,
  uploadAnyFileType
};
