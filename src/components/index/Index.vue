<template>
  <el-container class="main">
    <el-header height="90px">
      <Header></Header>
    </el-header>
    <el-container class="mainRight">
      <el-aside width="250px">
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from './Header';
import LeftMenu from './LeftMenu';

export default {
  name: "Index",
  components: {
    Header,
    LeftMenu
  },
  data: function() {
    return {
      message: "欢迎登录医保局后台管理系统"
    };
  },

};
</script>
<style>
@import "../../assets/css/moudle.css";
</style>

