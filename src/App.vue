<template>
  <div id="app" :style="{background: color }">
    <!--<div id="app" :style="{ height: screenHeight + 'px', width: screenWidth + 'px' ,background: color }">-->
<!--    <img src="./assets/logo.png">-->
    <div class="bar">
      <div class="mainTitleFontSize" style="padding-left:16px;color:#ffffff">天津市应急演练管理子系统</div>
      <div style="display: flex;margin-right: 30px">
        <div style="margin-right: 10px;cursor: pointer" class="btn" @click="goSand">进入沙盘</div>
        <div class="btn">退出</div>
      </div>
    </div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px 16px 10px 16px;">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
       <el-breadcrumb-item :to="{ path: '/list' }">系统演练</el-breadcrumb-item>
      <el-breadcrumb-item class="fontColor_blue">{{currentname}}</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view style="padding:0 16px 10px 16px"/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name: 'App',
      screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
      color: '#E5EBFF' ,
    }
  },
  mounted() {
    // this.currentname = localStorage.getItem('currentname') || '演练系统'
  },
  methods : {
    goSand(){
      // window.location.href = 'http://47.99.113.181:1001/emergency-system/map/iclient-leaflet/examples/leaflet/index.html';
      window.location.href = '/emergency-system/sand/map/index .html';
    }
  },
  computed : {
    currentname:function (){
      return this.$store.state.title
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-bottom: 10px; */
}
  .bar{
    width:100%;height:60px;line-height:60px;background:black;display:flex;
    align-items: center;
    justify-content: space-between;
  }
  .btn{
    width:78px;
    height: 32px;
    background-color: #f84e44;
    color:#fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

</style>
