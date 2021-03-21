<!--
 * @Author: 翟珂峰
 * @LastEditTime: 2021-03-21 20:05:02
 * @Description: 这里是使用canvas画下雪场景
-->
<template>
    <div class="snow" ref="snow">
        <canvas id="canvas" class="canvas">
            canvas is not support
        </canvas>
    </div>
</template>

<script>
/**
 * 雪花图片链接地址:https://www.deanhan.cn/wp-content/uploads/2017/12/snow.png
*/
// todo 如何取消成千上百的动画
// todo 如何保证在页面hidden的情况下,取消动画
const snowPic = require('./images/snow.png');
export default {
    name: 'snowCanvas',
    props:{
        // 雪花数量
        number: {
            type: Number,
            default: 200,
        },
        // 雪花图片
        pic:{
            type: String,
            default: snowPic,
        }
    },
    data(){
        return {
            canvas: null, // canvas
            context: null, // canvas的context对象
            width: null, // canvas区域的宽度
            height: null, // canvas区域的高度
            snowArr: [], // 雪花数据
        }
    },
    mounted(){
        this.addData();
        this.setSize();
        // document.addEventListener('visibilitychange',this.cancelAni.bind(this))
    },
    methods:{
        cancelAni(){
        //    if(document.visibilityState === 'hidden') {
        //        console.log('取消下雪动画')
        //    } else {
        //        this.addData();
        //        this.dropAnimation();
        //    }
        },
        // 设置canvas大小与背景图片大小相同
        setSize(){
           const {snow} = this.$refs;
           const {width,height} = snow.getBoundingClientRect();
           if(!this.canvas){
               this.canvas = document.getElementById('canvas');
           }
           this.width =  Math.ceil(width);
           this.height = Math.ceil(height);
           this.canvas.setAttribute('width',this.width);
           this.canvas.setAttribute('height',this.height);
           this.context = this.canvas.getContext('2d');
           this.dropAnimation();
        },
        // 增加数据
        addData(){
            for(let i = 0; i < this.number;  i++) {
                this.snowArr.push({
                    x: Math.random() * this.width, // 雪花的x轴
                    y: Math.random() * this.height, // 雪花的y轴
                    toX: Math.random(), // 雪花每一次渲染的X距离
                    toY: Math.random() * 1 + 1, // 雪花每一次渲染的Y距离
                    size: Math.random() * 20 + 5 , // 雪花大小
                })
            }
        },
        dropAnimation() {
            if(!this.snowArr.length) return;
            let snowImg = new Image();
            snowImg.setAttribute('crossOrigin','anonymous')
            snowImg.src = this.pic;
            this.context.clearRect(0,0,this.width,this.height);
            this.snowArr.map((item)=>{
                this.context.drawImage(snowImg,item.x,item.y,item.size,item.size);
                item.x = item.x > this.width ? 0 : item.x + item.toX;
                item.y = item.y > this.height ? 0 : item.y + item.toY;
            }) 
            requestAnimationFrame(this.dropAnimation)
        },

    }
    
}
</script>

<style lang="scss" scoped>
.snow{
    width: 100vw;
    height: 400px;
    background: url('./images/bg.jpg') no-repeat center center;
    background-size: cover;
}
.canvas{
    z-index: 9;
    display: block;
}
</style>