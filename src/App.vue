<!--
 * @Author: 翟珂峰
 * @LastEditTime: 2021-03-21 17:21:24
 * @Description: 
-->
<template>
  <div id="app">
    <!-- 跑马灯 -->
    <!-- <marquee
      :list="marqueeArr"
      :gap="+0"
      :speed="+0.4"
      :loop="true"
      :direction="'row'">
    </marquee> -->

    <Snow/>
  </div>
</template>

<script>
// marquee 组件
// import Marquee from './components/marquee/marquee.vue';
// import marqueeData from '../mock/marquee.js'; 

import Snow from './components/snowCanvas/snow.vue';

export default {
  name: 'App',
  components: {
    // Marquee,
    Snow
  },
  data(){
    return{
      marqueeArr: [],
    }
  },
  created(){
    // this.marqueeArr = marqueeData;
  }
}
</script>

<style lang="scss" scoped>
#app{
  width: 100vw;
  height: 100vh;
  .marquee-wrap{
    width: 300px;
    height: 23px;
    margin: 0 auto;
    background: skyblue;
    border-radius: 13px;
    padding: 0 20px;
    box-sizing: border-box;
  }
}

</style>