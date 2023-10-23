import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Index from '@/components/index/Index'
// import IndexDetail from '@/components/index/IndexDetail'
import ApplyList from '@/components/apply/ApplyList'
import MedicalApplyDetail from '@/components/apply/MedicalApplyDetail'
import DrugsApplyDetail from '@/components/apply/DrugsApplyDetail'
import HomePage from '@/components/index/HomePage'
import InstitutionList from '@/components/institution/InstitutionList'
import InstitutionBaseInfo from '@/components/institution/InstitutionBaseInfo'
import InstitutionPersonList from '@/components/institution/InstitutionPersonList'
import SelfManagement from '@/components/account/SelfManagement'
import AccountManage from '@/components/account/AccountManage'
import ExamBatch from '@/components/exam/examBatch'
import AddScore from '@/components/exam/addScore'
import CreateNewAccount from '@/components/account/CreateNewAccount'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/imis/sdrz/mom' : '',
  routes: [
    {
      path: '/',
      name: 'Blank',
      redirect: '/homePage'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      redirect: '/homePage',
      children: [
        {
          path: '/homePage',
          name: 'HomePage',
          component: HomePage
        },
        {
          path: '/institutionList',
          name: 'InstitutionList',
          component: InstitutionList,
          meta: [
            {name: '两定机构管理'}, {name: '机构信息管理'}
          ]
        },
        {
          path: '/institutionBaseInfo/:institutionId',
          name: 'InstitutionBaseInfo',
          component: InstitutionBaseInfo,
          meta: [
            {name: '两定机构管理'}, {name: '机构信息管理', path: '/institutionList'}, {name: '机构基础信息'}
          ]
        },
        {
          path: '/institutionPersonList',
          name: 'InstitutionPersonList',
          component: InstitutionPersonList,
          meta: [
            {name: '两定机构管理'}, {name: '机构人员管理'}
          ]
        },
        {
          path: '/examBatch',
          name: 'ExamBatch',
          component: ExamBatch,
          meta: [
            {name: '两定机构管理'}, {name: '考试信息管理'}, {name: '考试批次'}
          ]
        },
        {
          path: '/addScore',
          name: 'AddScore',
          component: AddScore,
          meta: [
            {name: '两定机构管理'}, {name: '考试信息管理'}, {name: '分数录入'}
          ]
        }
      ]
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Index,
      children: [
        // {
        //   path: '/applyList',
        //   name: 'ApplyList',
        //   component: ApplyList
        // },
        {
          path: 'all',
          name: 'All',
          component: ApplyList,
          meta: [
            {name: '两定机构管理'}, {name: '申请管理'}, {name: '全部'}
          ]
        },
        {
          path: 'firstTrial',
          name: 'FirstTrial',
          component: ApplyList,
          meta: [
            {name: '两定机构管理'}, {name: '申请管理'}, {name: '材料初审'}
          ]

        },
        {
          path: 'review',
          name: 'Review',
          component: ApplyList,
          meta: [
            {name: '两定机构管理'}, {name: '申请管理'}, {name: '复审（现场评估）'}
          ]
        },
        {
          path: 'physicianExamination',
          name: 'PhysicianExamination',
          component: ApplyList,
          meta: [
            {name: '两定机构管理'}, {name: '申请管理'}, {name: '医师考试'}
          ]
        },
        {
          path: 'infoPublicity',
          name: 'InfoPublicity',
          component: ApplyList,
          meta: [
            {name: '两定机构管理'}, {name: '申请管理'}, {name: '信息公示'}
          ]
        },
        {
          path: 'agreementSigning',
          name: 'AgreementSigning',
          component: ApplyList,
          meta: [
            {name: '两定机构管理'}, {name: '申请管理'}, {name: '协议签订'}
          ]
        },
        {
          path: 'drugsApplyDetail',
          name: 'DrugsApplyDetail',
          component: DrugsApplyDetail
        },
        {
          path: 'medicalApplyDetail',
          name: 'MedicalApplyDetail',
          component: MedicalApplyDetail,
          meta: [
            {name: '两定机构管理'}, {name: '申请管理'}, {name: '全部', path: '/apply/all'}, {name: '申请详情'}
          ]
        }
      ]
    },
    {
      path: '/account',
      name: 'Account',
      component: Index,
      children: [
        {
          path: '/selfManagement',
          name: 'selfManagement',
          component: SelfManagement,
          meta: [
            {name: '权限管理'}, {name: '本局帐号管理'}
          ]
        },
        {
          path: '/accountManage',
          name: 'AccountManage',
          component: AccountManage,
          meta: [
            {name: '权限管理'}, {name: '机构账号管理'}, {name: '机构密码重置'}
          ]
        },
        {
          path: '/createNewAccount',
          name: 'CreateNewAccount',
          component: CreateNewAccount,
          meta: [
            {name: '学员账号创建'}
          ]
        }
      ]
    }
    // {
    //   path: '/index/:indexDetail',
    //   props: true,
    //   name: 'IndexDetail',
    //   component: IndexDetail
    // },
  ]
})
