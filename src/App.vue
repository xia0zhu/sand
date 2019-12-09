<template>
  <div id="app" :style="{ height: screenHeight + 'px', width: screenWidth + 'px' ,background: color }">
<!--    <img src="./assets/logo.png">-->
    <div class="bar">
      <div style="padding-left:16px">应急演练管理子系统</div>
      <div style="display: flex;margin-right: 30px">
        <div style="margin-right: 10px;cursor: pointer" class="btn" @click="goSand">进入沙盘</div>
        <div class="btn">退出</div>
      </div>
    </div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 5px 16px 0 16px;">
      <el-breadcrumb-item :to="{ path: '/list' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item style="color:#006aff">{{currentname}}</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view/>
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
      currentname : ""
    }
  },
  mounted() {
    this.currentname = localStorage.getItem('currentname') || '演练系统'
  },
  methods : {
    goSand(){
      window.location.href = 'http://47.99.113.181:1001/emergency-system/supermap/index.html#/';
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
