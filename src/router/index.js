import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/login/Login";
import Index from "@/components/index/Index";
import Mobileregistration from "@/components/index/Mobileregistration";
import HomePage from "@/components/index/HomePage";
import InstitutionBaseInfo from "@/components/institution/InstitutionBaseInfo";
import AccountManage from "@/components/account/AccountManage";
import ExamList from "@/components/account/ExamList";
import CreateNewAccount from "@/components/account/CreateNewAccount";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === "production" ? "/imis/sdrz/mom" : "",
  routes: [
    {
      path: "/",
      name: "Blank",
      redirect: "/accountManage"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/mobileregistration",
      name: "Mobileregistration",
      component: Mobileregistration
    },
    {
      path: "/index",
      name: "Index",
      component: Index,
      redirect: "/homePage",
      children: [
        {
          path: "/homePage",
          name: "HomePage",
          component: HomePage
        },
        {
          path: "/institutionBaseInfo",
          name: "InstitutionBaseInfo",
          component: InstitutionBaseInfo,
          meta: [{ name: "学员评估报告" }]
        },
        {
          path: "/accountManage",
          name: "AccountManage",
          component: AccountManage,
          meta: [{ name: "学员账号管理" }]
        },
        {
          path: "/examList",
          name: "ExamList",
          component: ExamList,
          meta: [{ name: "考试管理" }]
        },
        {
          path: "/createNewAccount",
          name: "CreateNewAccount",
          component: CreateNewAccount,
          meta: [{ name: "学员账号创建" }]
        }
      ]
    },
    {
      path: "/account",
      name: "Account",
      component: Index,
      children: []
    }
  ]
});
