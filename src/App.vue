<!--
 * @Author: 翟珂峰
 * @LastEditTime: 2021-03-20 18:30:41
 * @Description: 
-->
<template>
  <div id="app">
    <marquee
      :list="marqueeArr"
      :gap="+0"
      :speed="+0.4"
      :loop="true"
      :direction="'row'">
    </marquee>
  </div>
</template>

<script>
import Marquee from './components/marquee/marquee.vue';
import marqueeData from '../mock/marquee.js';

export default {
  name: 'App',
  components: {
    Marquee
  },
  data(){
    return{
      marqueeArr: [],
    }
  },
  created(){
    this.marqueeArr = marqueeData;
  }
}
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding:0;
}
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