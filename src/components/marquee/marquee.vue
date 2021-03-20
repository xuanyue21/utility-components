<!--
 * @Author: 翟珂峰
 * @LastEditTime: 2021-03-20 18:33:07
 * @Description: 这里是跑马灯组件
-->

<template>
  <div class="marquee-wrap">
    <div
      class="marquee-contain"
      ref="contain"
      :class="{
        row: direction === 'row',
        col: direction === 'col',
      }"
      :style="{
        animationDuration: duration,
      }"
    >
      <div class="data" ref="marqueeData">
        <div
          :style="{
            marginRight: right,
          }"
          v-for="(item, index) in list"
          :key="index"
        >
          恭喜{{ item.nickname }}获取{{ item.money }}
        </div>
      </div>
      <div class="copy" v-show="loop">
        <div
          :style="{
            marginRight: right,
          }"
          v-for="(item, index) in list"
          :key="index"
        >
          恭喜{{ item.nickname }}获取{{ item.money }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "marquee",
  props: {
    // 数组数据
    list: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    // 跑马灯的方向
    direction: {
      type: String,
      default: "row", // row 表示横向  col 表示竖向
    },
    // 横向跑马灯是否需要间隙
    gap: {
      type: Number,
      default: 0,
    },
    // 横向跑马灯的速率
    speed:{
      type: Number,
      default: 0.6
    },
    // 是否需要实现无缝循环
    loop:{
      type: Boolean,
      default: true,
    }
  },
  mounted() {
    this.init();
  },
  computed:{
    // 横向判断元素之间的间距
    right(){
      if(this.gap && (this.direction === 'row')) {
       return `${this.gap}px`
      }
      return '';
    },
    // 横向判断滚动时间
    duration(){ 
      if(!this.direction) return;
      if(this.direction === 'row') {
        if(!this.width) return;
        let time = parseFloat(Math.ceil(this.width / 20  * this.speed));
        console.log('记录横向当前时间=>>>',time)
        return  `${time}s`
      }else if(this.direction === 'col'){
        let time = parseFloat(Math.ceil(1.15 * this.list.length));
        console.log('记录竖直当前时间=>>>',time)
        return  `${time}s`
      }
      return 0;
    }
  },
  data() {
    return {
      height: null,
      width: null,
      styleDom: null,
      canplay: false, // 默认不打开动画
    };
  },
  methods: {
    // 获取撑开元素的宽或高
    init() {
      const { marqueeData:data } = this.$refs;
      if (this.direction === "row") {
        this.width = data.getBoundingClientRect().width;
      } else {
        this.height = data.getBoundingClientRect().height;
      }
      this.addkeyframes();
    },
    // 增加样式
    addkeyframes() {
      let keyframes;
      if (this.direction === "row") {
        if(this.loop) {
          this.width = this.width * 2.2;
        }
        keyframes = `
                 @keyframes rowAni {
                    0% {
                    transform: translate3d(0, 0, 0);
                    }
                    100% {
                    transform: translate3d(${-this.width}px, 0, 0);
                    }
                }
            `;
      } else {
        keyframes = `
                   @keyframes colAni {
                    0% {
                    transform: translate3d(0, 0, 0);
                    }
                    100% {
                    transform: translate3d(0, ${-this.height}px, 0);
                    }
                }
            `;
      }
      if (!this.styleDom) {
        this.styleDom = document.createElement("style");
        this.styleDom.setAttribute("type", "text/css");
        this.styleDom.innerHTML = keyframes;
        const head = document.getElementsByTagName("head")[0];
        head.appendChild(this.styleDom);
      } else {
        this.styleDom.innerHTML = keyframes;
      }
      this.canplay = false;
      requestAnimationFrame(()=>{
        this.canplay = true;
      })
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
