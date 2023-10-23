<template>
  <el-row class="loginContainer">
    <div class="loginBox">
       <div class="logo">
        <img src="@/assets/img/logo.png" alt="">
      </div>
      <div class="login">
        <h3> 两定机构信息管理系统（医保局端）</h3>
        <el-form class="loginForm" ref="loginForm" :model="loginForm" label-width="38px">
          <el-form-item>
            <span slot="label"><i class="icon iconfont iconsdrzaccounts"></i></span>
            <el-input v-model="loginForm.customerName" placeholder="请输入账号"  @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label"><i class="icon iconfont iconsdrzaccount"></i></span>
            <el-input :type="isShowPass?'text':'password'" v-model="loginForm.passWord"  placeholder="请输入密码"  @keyup.enter.native="login">  <i	slot="suffix"	:class="['icon','iconfont',isShowPass?'iconeyeslash-fill':'iconeye-fill']" @click="togglePassword" style="cursor:pointer;"></i></el-input>
          </el-form-item>
          <el-form-item class="formRemeber">
            <el-checkbox v-model="loginForm.remeberPsd">记住密码</el-checkbox>
          </el-form-item>
          <el-button type="primary" @click='login'>登录</el-button>
        </el-form>
      </div>
    </div>
    <div class="login-footer">
      <div class="login-footer-content">
        <div class="login-footer-left">
            <a :href="linkHref" target="_blank">
              <img src="@/assets/red.png" alt="">
            </a>
        </div>
        <div class="login-footer-right">
          <p class="footer-des">版权所有：日照市医疗保障局 </p>
          <p class="footer-des">地址：日照市北京路128号劳动大厦     电话：0633-7670700  传真：0633-7670711</p>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
// base64EncodeURi 编码和解码
const b64EncodeUnicode = (str) => {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1)
  }))
}
// console.log(b64EncodeUnicode('我是很厉害的'))
const b64DecodeUnicode = (str) => {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join('')
  )
}
import { Message } from 'element-ui'
import { getLoginKey,getTimestamp,personLogin,institutionLogin,bureauLogin,getInstitutionType } from '@/api/api.js'
import { fnencrypt,deepCopy } from '@/utils/commonTool.js'
import {setUserInfoToStorage, removeAllInfoFromLocalStorage, setAccountInfo, getAccountInfo, removeAccountInfo} from '@/utils/LocalStoragePerform'
import {
  loginRoleId,
  SUCCESS_CODE,
  FAIL_CODE,
  ERR_CODE
} from '@/utils/Constant'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        customerName: '',
        passWord: '',
        remeberPsd: true
      },
      roleId:'',
      institutionId:'',
      isShowPass:false,
      linkHref:'http://bszs.conac.cn/sitename?method=show&id=8B43B7BF53FDCE08E05310291AACDA65'
    }
  },
  mounted(){
    this.getAccountInfo()

  },
  methods:{
      togglePassword(){
        this.isShowPass=!this.isShowPass
        // console.log('this.isShowPass',this.isShowPass)
      },
     getInstitutionType(institutionId){
      let params={
        institutionId:institutionId
      }
      getInstitutionType(params).then(res=>{
        // console.log('getInstitutionType',res)
        if(res && res.code === FAIL_CODE){
            Message.error({ message: res.message })
            return
        }
        if(res &&  res.code === SUCCESS_CODE){
            // this.roleId=res.data.institutionType
            // setRoleId(this.roleId)
          let timer=setTimeout(()=>{
              this.$router.push('/index')
              clearTimeout(timer)
          },1000)
        }

      })
    },
    getAccountInfo(){
        let accountInfo=getAccountInfo() || '{}'
        let accountInfoUnicode = JSON.parse(accountInfo)
        accountInfoUnicode.passWord = b64DecodeUnicode(accountInfoUnicode.passWord)
        this.loginForm = accountInfoUnicode
    },
    login(){
      //判断  是否记住密码
      if(this.loginForm && this.loginForm.remeberPsd){//记住密码
        let loginFormflag = deepCopy(this.loginForm)
        loginFormflag.passWord = b64EncodeUnicode(loginFormflag.passWord)
        setAccountInfo(loginFormflag)
      }else{
        removeAccountInfo()
      }
        this.initLogin(getLoginKey,getTimestamp)
    },
    checkInput(){
        if(!this.loginForm.customerName|| !this.loginForm.passWord){
          return false
        }
        return true//通过
    },
    initLogin(getLoginKey,getTimestamp){
      let _this=this
      Promise.all([getLoginKey(),getTimestamp()]).then(res=>{
        if(res[0] && res[0].code === FAIL_CODE){
            Message.error({ message: res[0].message })
            return
        }
         if(res[1] && res[1].code === FAIL_CODE){
            Message.error({ message: res[1].message })
            return
        }
        if((res[0] && res[0].code === SUCCESS_CODE) && (res[1] && res[1].code === SUCCESS_CODE)){
            let publicKey=res[0].data,timeStamp=res[1].data
            let rsaPassword=fnencrypt(_this.loginForm.passWord.trim()+timeStamp,publicKey)
            let params={
                "userName": _this.loginForm.customerName.trim(),
                "passwordEncode": rsaPassword,
                "roleId":  loginRoleId,
                "timestamp": timeStamp
            }
            bureauLogin(params).then(res=>{

              if(res && res.code === FAIL_CODE){
                    Message.error({ message: res.message })
                    return
                }
                if(res &&  res.code === SUCCESS_CODE){
                    setUserInfoToStorage(res.data)
                    Message.success({message:'登录成功'})
                    _this.institutionId=res.data.userId
                    _this.getInstitutionType(_this.institutionId)

                }
            })
        }

      })
    },
  }
}

</script>
<style>
  .loginForm .el-input__inner{
    border: none;
  }
</style>
<style>
  @import "../../assets/css/moudle.css";
</style>
