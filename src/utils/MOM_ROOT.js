const childrenMenu = [
  {
    menuId: "IN_HOME",
    menuName: "首页",
    menuPath: "/homePage",
    menuClass: "iconsdrzhome",
    childrenMenu: []
  },
  {
    menuId: "IN_MNG_MANAGEMENT",
    menuName: "两定机构管理",
    menuPath: "/institution",
    menuClass: "iconsdrzapply",
    childrenMenu: [
      {
        menuId: "IN_MNG_MANAGEMENT_APPLY",
        menuName: "申请管理",
        menuPath: "/apply",
        childrenMenu: [
          {
            menuId: "IN_MNG_MANAGEMENT_APPLY_ALL",
            menuName: "全部",
            menuPath: "/apply/all",
            childrenMenu: []
          },
          {
            menuId: "IN_MNG_MANAGEMENT_APPLY_PRIMARY",
            menuName: "材料初审",
            menuPath: "/apply/firstTrial",
            childrenMenu: []
          },
          {
            menuId: "IN_MNG_MANAGEMENT_APPLY_REVIEW",
            menuName: "复审（现场评估）",
            menuPath: "/apply/review",
            childrenMenu: []
          },
          {
            menuId: "IN_MNG_MANAGEMENT_APPLY_EXAM",
            menuName: "医师考试",
            menuPath: "/apply/physicianExamination",
            childrenMenu: []
          },
          {
            menuId: "IN_MNG_MANAGEMENT_APPLY_PUBLIC",
            menuName: "信息公示",
            menuPath: "/apply/infoPublicity",
            childrenMenu: []
          },
          {
            menuId: "IN_MNG_MANAGEMENT_APPLY_SIGN",
            menuName: "协议签订",
            menuPath: "/apply/agreementSigning",
            childrenMenu: []
          }
        ]
      },
      {
        menuId: "IN_MNG_MANAGEMENT_INSTITUTION",
        menuName: "机构信息管理",
        menuPath: "/institutionList",
        childrenMenu: []
      },
      {
        menuId: "IN_MNG_MANAGEMENT_PERSON",
        menuName: "机构人员管理",
        menuPath: "/institutionPersonList",
        childrenMenu: []
      },
      {
        menuId: "IN_MNG_MANAGEMENT_EXAM",
        menuName: "考试信息管理",
        menuPath: "/exam",
        childrenMenu: [
          {
            menuId: "IN_MNG_MANAGEMENT_EXAM_BATCH",
            menuName: "考试批次",
            menuPath: "/examBatch",
            childrenMenu: []
          },
          {
            menuId: "IN_MNG_MANAGEMENT_EXAM_BATCH",
            menuName: "分数录入",
            menuPath: "/addScore",
            childrenMenu: []
          }
        ]
      }
    ]
  },
  {
    menuId: "IN_ACCOUNTMANAGE",
    menuName: "权限管理",
    menuPath: "/account",
    menuClass: "iconsdrzaccountm",
    childrenMenu: [
      {
        menuId: "IN_ACCOUNT_INSTITUTION",
        menuName: "机构密码重置",
        menuPath: "/accountManage",
        childrenMenu: []
      },
      {
        menuId: "IN_ACCOUNT_INSTITUTION",
        menuName: "机构账号创建",
        menuPath: "/createNewAccount",
        childrenMenu: []
      }
    ]
  }
];
export default childrenMenu;
