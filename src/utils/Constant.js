// 一些常亮，避免魔数
// INSTITUTION 机构 PHARMACY 药店 BUREAU 医保局
// export const roleId = 'INSTITUTION'
export const SUCCESS_CODE = 200
export const FAIL_CODE = 901
export const ERR_CODE = 999
export const OUTDATE_CODE = 600
export const roleId = 'BUREAU'
export const loginRoleId = 'BUREAU'
export const rootMenuId = 'BUREAU_ROOT'
// 定义全局的输入限制
export const uploadFileBgImg = require('./../assets/img/uploadBg.png')
export const inputLimit = {
  'number': 6,
  'sInput': 20,
  'lInput': 100
}
// 角色-申请类型-路由
export const applyTypeInfoByRoleId = {
  INSTITUTION: {
    path: '/medicalApplyDetail',
    flowId: 'FL2019082201'
  },
  PHARMACY: {
    path: '/drugsApplyDetail',
    flowId: 'FL2019082202'
  }
}
export const nodeNumber = {
  All: '',
  FirstTrial: 'N2019082202', // 填写申请内容节点
  Review: 'N2019082203', // 初审节点
  PhysicianExamination: 'N2019082204', // 现场审核
  InfoPublicity: 'N2019082205', // 机构公示
  AgreementSigning: 'N2019082206' // 签署协议
}
export const routerNodeNumber = {
  N2019082202: '/apply/firstTrial',
  N2019082203: '/apply/review',
  N2019082204: '/apply/physicianExamination',
  N2019082205: '/apply/infoPublicity',
  N2019082206: '/apply/agreementSigning'
}
// flowId - 路由
export const routerPathByFlowId = {
  'FL2019082201': {
    path: '/medicalApplyDetail'
  },
  'FL2019082202': {
    path: '/drugsApplyDetail'
  }
}
export const OwnerShipTypes = [
  {
    'ownershipCode': 'O_001',
    'ownershipName': '公立'
  },
  {
    'ownershipCode': 'O_002',
    'ownershipName': '民营'
  }
]
export const allAssessmentLevel = [
  {
    'levelCode': 'L_001',
    'levelName': '一级甲等'
  },
  {
    'levelCode': 'L_002',
    'levelName': '一级乙等'
  },
  {
    'levelCode': 'L_003',
    'levelName': '一级丙等'
  },
  {
    'levelCode': 'L_004',
    'levelName': '二级甲等'
  },
  {
    'levelCode': 'L_005',
    'levelName': '二级乙等'
  },
  {
    'levelCode': 'L_006',
    'levelName': '二级丙等'
  },
  {
    'levelCode': 'L_007',
    'levelName': '三级甲等'
  },
  {
    'levelCode': 'L_008',
    'levelName': '三级乙等'
  },
  {
    'levelCode': 'L_009',
    'levelName': '三级丙等'
  }
]
export const OrganizationTypes = [
  {
    value: '1',
    label: '定点医院'
  },
  {
    value: '2',
    label: '定点药房'
  },
  {
    value: '3',
    label: '门诊'
  },
  {
    value: '4',
    label: '康复机构'
  }
]

export const BusinessTypes = [
  {
    managementTypeCode: 'M_001',
    managementTypeName: '营利性'
  },
  {
    managementTypeCode: 'M_002',
    managementTypeName: '非营利性'
  }

]
export const ServiceObjs = [
  {
    'serviceTargetCode': 'T_001',
    'serviceTargetName': '社会'
  },
  {
    'serviceTargetCode': 'T_002',
    'serviceTargetName': '单位内部'
  }
]
export const closeAccountEquipmnet = [ // 是否有结算设备
  {
    value: false,
    text: '否'

  }, {
    value: true,
    text: '是'
  }
]

export const ApplyTypes = [
  {
    institutionTypeCode: 'H_001',
    institutionTypeName: '医院'
  },
  {
    institutionTypeCode: 'H_002',
    institutionTypeName: '门诊'
  },
  {
    institutionTypeCode: 'H_003',
    institutionTypeName: '药店'
  }
]

export const Steps = [
  {
    stepName: '准备材料'
  },
  {
    stepName: '材料初审'
  },
  {
    stepName: '复审（现场评估）'
  },
  {
    stepName: '医师考试'
  },
  {
    stepName: '信息公示'
  },
  {
    stepName: '协议签订'
  },
  {
    stepName: '申请成功'
  }
]
export const cardType = [
  {code: '0', value: '身份证'},
  {code: '1', value: '护照'},
  {code: '2', value: '军官证'},
  {code: '4', value: '户口本'},
  {code: 'd', value: '港澳同胞回乡证'},
  {code: 'e', value: '台胞证'},
  {code: 'g', value: '出生医学证明'},
  {code: 'h', value: '外国人永久居留身份证'},
  {code: 'i', value: '港澳台居民居住证'}
]
export const SexTypes = [
  {
    value: 0,
    label: '男'
  },
  {
    value: 1,
    label: '女'
  }
]
export const licenseLongPresent = [
  {
    label: '是',
    value: true
  },
  {
    label: '否',
    value: false
  }
]
export const fullPartTimeType = [
  {
    label: '专职',
    value: true
  },
  {
    label: '兼职',
    value: false
  }
]
export const staffListExcel = [
  {
    templateTitle: '医师人员明细',
    subTitle: '医师人员明细模板下载',
    downLoadTitle: '医师人员明细下载',
    templateUrl: 'http://wxyl.pension.taikang.com/imis/sdrz/institution/srv/api/attachment/download/F4149DB9-57B0-49A8-BC06-000DF5BB839C',
    tips: '只能上传xls、xlsx格式文件且不超过10M',
    errTips: '上传失败，请重试！',
    isSuccess: true,
    excelName: '',
    excelUrl: '',
    defaultUrl: require('./../assets/img/excel.png')
  },
  {
    templateTitle: '医技人员明细',
    subTitle: '医技人员明细模板下载',
    downLoadTitle: '医技人员明细下载',
    templateUrl: 'http://wxyl.pension.taikang.com/imis/sdrz/institution/srv/api/attachment/download/5F553F89-FCFF-4B33-8CFE-E8E04CDAE55E',
    tips: '只能上传xls、xlsx格式文件且不超过10M',
    errTips: '上传失败，请重试！',
    isSuccess: true,
    excelName: '',
    excelUrl: '',
    defaultUrl: require('./../assets/img/excel.png')
  },
  {
    templateTitle: '护士人员明细',
    subTitle: '护士人员明细模板下载',
    downLoadTitle: '护士人员明细下载',
    templateUrl: 'http://wxyl.pension.taikang.com/imis/sdrz/institution/srv/api/attachment/download/078F9183-2607-4033-BB27-A7A994DA25F9',
    tips: '只能上传xls、xlsx格式文件且不超过10M',
    errTips: '上传失败，请重试！',
    isSuccess: true,
    excelName: '',
    excelUrl: '',
    defaultUrl: require('./../assets/img/excel.png')
  }
]
export const Credentials = [
  {
    title: '《医疗机构执业许可证》',
    picName: '',
    picUrl: ''
  },
  // {
  //   title: '《医疗机构执业许可证》反',
  //   picName: '',
  //   picUrl: ''
  // },
  // {
  //   title: '《医疗机构执业许可证》复印件正',
  //   picName: '',
  //   picUrl: ''
  // },
  // {
  //   title: '《医疗机构执业许可证》复印件反',
  //   picName: '',
  //   picUrl: ''
  // },
  {
    title: '法定代表人（负责人）身份证头像面',
    picName: '',
    picUrl: ''
  },
  {
    title: '法定代表人（负责人）身份证国徽面',
    picName: '',
    picUrl: ''
  }
]
export const OutpatientDepartments = [
  {
    value: '1',
    label: '呼吸内科'
  },
  {
    value: '2',
    label: '呼吸内科'
  },
  {
    value: '3',
    label: '呼吸内科'
  },
  {
    value: '4',
    label: '呼吸内科'
  },
  {
    value: '5',
    label: '呼吸内科'
  },
  {
    value: '6',
    label: '呼吸内科'
  }
]

export const InpatientDepartments = [
  {
    value: '1',
    label: '呼吸内科'
  },
  {
    value: '2',
    label: '呼吸内科'
  },
  {
    value: '3',
    label: '呼吸内科'
  },
  {
    value: '4',
    label: '呼吸内科'
  }
]
// 定义了上传文件类型
export const uploadFileType = {
  'picpdf': ['pdf', 'png', 'jpg', 'jpeg'],
  'pic': ['png', 'jpg', 'jpeg'],
  'excel': ['xls', 'xlsx'],
  'file': [],
  'ziprar': ['zip', 'rar']
}
export const fileList = [
  {
    title: '协议签订相关文件',
    downLoadTitle: '压缩文件模板下载',
    templateUrl: 'http://wxyl.pension.taikang.com/imis/sdrz/institution/srv/api/attachment/download/5DA9CC63-235E-4C47-BB7F-45F530200C6F',
    tips: '（请下载模板文件，根据提示把相关文件置于文件夹中并压缩上传，仅支持zip，rar文件）',
    errTips: '上传失败，请重试！',
    isSuccess: true,
    fileName: '',
    fileUrl: '',
    defaultUrl: require('./../assets/img/agreement.png')
  },
  {
    title: '医师人员职业证书',
    downLoadTitle: '压缩文件模板下载',
    templateUrl: 'http://wxyl.pension.taikang.com/imis/sdrz/institution/srv/api/attachment/download/215A5DE3-B882-4458-93EC-BD6A6D1A04A7',
    tips: '（请下载模板文件，根据提示把相关文件置于文件夹中并压缩上传，仅支持zip，rar文件）',
    errTips: '上传失败，请重试！',
    isSuccess: true,
    fileName: '',
    fileUrl: '',
    defaultUrl: require('./../assets/img/doctor.png')
  },
  {
    title: '医技人员职业证书',
    downLoadTitle: '压缩文件模板下载',
    templateUrl: 'http://wxyl.pension.taikang.com/imis/sdrz/institution/srv/api/attachment/download/8F5A627B-EDCC-4535-8E9A-B2E06F0A2DD7',
    tips: '（请下载模板文件，根据提示把相关文件置于文件夹中并压缩上传，仅支持zip，rar文件）',
    errTips: '上传失败，请重试！',
    isSuccess: true,
    fileName: '',
    fileUrl: '',
    defaultUrl: require('./../assets/img/technology.png')
  },
  {
    title: '护士人员职业证书',
    downLoadTitle: '压缩文件模板下载',
    templateUrl: 'http://wxyl.pension.taikang.com/imis/sdrz/institution/srv/api/attachment/download/86416680-A6E7-4AB1-816A-960844B023AC',
    tips: '（请下载模板文件，根据提示把相关文件置于文件夹中并压缩上传，仅支持zip，rar文件）',
    errTips: '上传失败，请重试！',
    isSuccess: true,
    fileName: '',
    fileUrl: '',
    defaultUrl: require('./../assets/img/nurse.png')
  }
]
export const argumentsList = [
  {
    attachmentDesc: null,
    attachmentId: '',
    attachmentName: '',
    attachmentType: '',
    attachmentUrl: ''
  },
  {
    attachmentDesc: null,
    attachmentId: '',
    attachmentName: '',
    attachmentType: '',
    attachmentUrl: ''
  },
  {
    attachmentDesc: null,
    attachmentId: '',
    attachmentName: '',
    attachmentType: '',
    attachmentUrl: ''
  },
  {
    attachmentDesc: null,
    attachmentId: '',
    attachmentName: '',
    attachmentType: '',
    attachmentUrl: ''
  }
]
