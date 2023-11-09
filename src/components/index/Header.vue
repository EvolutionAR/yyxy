<template>
  <div>
    <!-- <img src="../../assets/logo_rz.png" alt="logo"> -->
    <span>{{message}}</span>
    <div class="headerRight">
      <!-- <span>2019年10月21日 星期一</span> -->
      <span>欢迎登录</span>
      <span class="divider"></span>
      <i class="icon iconfont iconsdrzclose" @click="logout"></i>
    </div>
  </div>
</template>
<script>
import {
  getUserInfoFromStorage,
  removeUserInfoFromStorage
} from "@/utils/LocalStoragePerform";
import { Logout } from "@/api/api";

export default {
  name: "Header",
  data: function() {
    return {
      message: '后台管理系统',
      userData: {
        nickName: "",
        userId: "",
        tokenInfo: {}
      }
    };
  },
  methods: {
    getUserData() {
      let userInfo = JSON.parse(getUserInfoFromStorage());
      if (userInfo == null || !userInfo.nickName || !userInfo.userId) {
        this.$router.push("/login");
      }
      this.userData = userInfo;
    },
    logout() {
      let _this = this;
      this.$confirm("确定注销吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (
          !_this.userData.tokenInfo ||
          !_this.userData.tokenInfo.refreshToken
        ) {
          removeUserInfoFromStorage();
          this.$router.replace('/login');
          return;
        }
        let params = {
          refreshToken: _this.userData.tokenInfo.refreshToken
        };
        Logout(params)
          .then(res => {
            removeUserInfoFromStorage();
             this.$router.replace('/login');
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  },
  mounted() {
    // this.getUserData();
  }
};
</script>
<style>
.iconsdrzclose{
  cursor: pointer;
}
</style>

