<template>
  <div id="app" :style="{ height: screenHeight + 'px', width: screenWidth + 'px' ,background: color }">
<!--    <img src="./assets/logo.png">-->
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
      color: '#E5EBFF'
    }
  },
  mounted() {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
