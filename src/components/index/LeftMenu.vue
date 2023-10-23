<style>
.roleBlock h3{
  font-size: 16px;
  margin-bottom:6px;
}
</style>
<template>
  <div>
    <!-- <div class="roleBlock">
      <img src="../../assets/img/institution.png" alt="">
      <h3>{{userData.nickName}}</h3>
      <p>超级管理员</p>
    </div> -->
   <el-menu router
    :default-active="defaultActive"
    background-color="#fff"
    :unique-opened="isUniqueOpen"
    text-color="#75777F"
    active-text-color="#377DFF">
          <template>
            <!-- <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu> -->
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">导航一</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </template>
        </el-menu>
  </div>
</template>
<script>
import {
  getUserInfoFromStorage,
  removeUserInfoFromStorage
} from "@/utils/LocalStoragePerform";
import childrenMenu from '@/utils/MOM_ROOT.js'
import { getMenu } from '@/api/api.js'
import { Message } from 'element-ui'
import { 
    SUCCESS_CODE,
    FAIL_CODE,
    ERR_CODE,
    roleId,rootMenuId
} from "@/utils/Constant"
export default {
    name: 'LeftMenu',
    data:function(){
      return {
        isUniqueOpen:true,
          menu:[],
          defaultActive:'',
          userData: {
            nickName: "",
            userId: "",
            tokenInfo: {}
          }
      }
    },
    mounted(){
        // this.initMenu()
        // this.getInitPage(this.$route.path)
        // this.getUserData()
        // console.log(this.defaultActive,'活动路由')
    },
    methods:{
       getUserData() {
        let userInfo = JSON.parse(getUserInfoFromStorage());
        if (userInfo == null || !userInfo.nickName || !userInfo.userId) {
          this.$router.push("/login");
        }
        this.userData = userInfo;
      },
      getInitPage(path){
          if(path == '/apply/all' || path == '/apply/agreementSigning' || path == '/apply/firstTrial' || 
          path == '/apply/review' || path == '/apply/physicianExamination' || path == '/apply/infoPublicity'){
            sessionStorage.setItem('routerPath',path)
            this.defaultActive = path
            return
          }
          if(path == '/apply/medicalApplyDetail' && sessionStorage.getItem('routerPath')){
            this.defaultActive = sessionStorage.getItem('routerPath')
            return
          }
          if(path.indexOf('institutionBaseInfo') !== -1){
            this.defaultActive = '/institutionList'
            sessionStorage.removeItem('routerPath')
            return
          }
          // if(path == '/addScore'){
          //   this.defaultActive = '/addScore'
          //   sessionStorage.removeItem('routerPath')
          //   return
          // }
          // if(path == '/selfManagement'){
          //   this.defaultActive = '/selfManagement'
          //   sessionStorage.removeItem('routerPath')
          //   return
          // }
          this.defaultActive = path
          sessionStorage.removeItem('routerPath')
          // else if(path == '/selfManagement'){
          //   this.defaultActive = '/selfManagement'
          // }else if(path == '/apply/medicalApplyDetail' && sessionStorage.getItem('routerPath')){
          //   this.defaultActive = sessionStorage.getItem('routerPath')
          // }else if(path.indexOf('institutionBaseInfo') !== -1){
          //   this.defaultActive = '/institutionList'
          // }else{
          //   sessionStorage.removeItem('routerPath')
          //   this.defaultActive = path
          // }
      },
      initMenu(){
        let params={
          roleId:roleId,
          rootMenuId:rootMenuId
        }
        getMenu(params).then(res=>{
          if(res && res.code === FAIL_CODE){
              Message.error({ message: res.message })
              return 
          }
          if(res &&  res.code === SUCCESS_CODE){
              this.menu = res.data.childrenMenu || childrenMenu
          }
        })
      },
      openMenu(index,indexpath){
        console.log(index.indexPath)
      }
    },
    watch: {
        '$route' (to, from){
           this.getInitPage(to.path)
        }
    },
}
</script>
