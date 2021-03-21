/*
 * @Author: 翟珂峰
 * @LastEditTime: 2021-03-21 21:44:19
 * @Description: 创建下雪的js方法
 */

/*
十分感谢大佬的输出
参考文档:https://mp.weixin.qq.com/s/9lsQAYR7y3X8SJ0dkKeslQ
github地址:https://github.com/wanglin2/snow
*/
/**
 * 创建雪花
 * 雪花正常是正方形
 * 
*/
class Snow {
    constructor (opt = {}) {
        // 是否是雨
        this.isRain = opt.isRain || false
        // 元素
        this.el = null
        // 倾斜方向
        this.dir = opt.dir || 'r'
        // 直径
        this.width = 0
        // 最大直径
        this.maxWidth = opt.maxWidth || 80
        // 最小直径
        this.minWidth = opt.minWidth || 2
        // 透明度
        this.opacity = 0
        // 水平位置
        this.x = 0
        // 重置位置
        this.y = 0
        // z轴位置
        this.z = 0
        // 水平速度
        this.sx = 0
        // 是否左右摇摆
        this.isSwing = false
        // 左右摇摆的步长
        this.stepSx = 0.02
        // 左右摇摆的正弦函数x变量
        this.swingRadian = 1
        // 左右摇摆的正弦x步长
        this.swingStep = 0.01
        // 垂直速度
        this.sy = 0
        // 最大速度
        this.maxSpeed = opt.maxSpeed || 4
        // 最小速度
        this.minSpeed = opt.minSpeed || 1
        // 快速划过的最大速度
        this.quickMaxSpeed = opt.quickMaxSpeed || 10
        // 快速划过的最小速度
        this.quickMinSpeed = opt.quickMinSpeed || 8
        // 快速划过的宽度
        this.quickWidth = opt.quickWidth || 80
        // 快速划过的透明度
        this.quickOpacity = opt.quickOpacity || 0.2
        // 窗口尺寸
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight

        this.init()
    }

    // 随机初始化属性
    init (reset) {
        let isQuick = Math.random() > 0.8
        this.isSwing = Math.random() > 0.8
        this.width = isQuick ? this.quickWidth : Math.floor(Math.random() * this.maxWidth + this.minWidth)
        this.opacity = isQuick ? this.quickOpacity : Math.random()
        this.x = Math.floor(Math.random() * (this.windowWidth - this.width))
        this.y = Math.floor(Math.random() * (this.windowHeight - this.width))
        if (reset && Math.random() > 0.8) {
            this.x = -this.width
        } else if (reset) {
            this.y = -this.width
        }
        this.sy = isQuick ? Math.random() * this.quickMaxSpeed + this.quickMinSpeed : Math.random() * this.maxSpeed + this.minSpeed
        this.sx = this.dir === 'r' ? this.sy : -this.sy
        this.z = isQuick ? Math.random() * 300 + 200 : 0
        this.swingStep = 0.01 * Math.random()
        this.swingRadian = Math.random() * (1.1 - 0.9) + 0.9
    }

    // 设置样式
    setStyle () {
        this.el.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            display: block;
            width: ${this.isRain ? 1 : this.width}px;
            height: ${this.width}px;
            opacity: ${this.opacity};
            background-image: radial-gradient(#fff 0%, rgba(255, 255, 255, 0) 60%);
            border-radius: 50%;
            z-index: 9999999999999;
            pointer-events: none;
            transform: translate(${this.x}px, ${this.y}px) ${this.getRotate(this.sy, this.sx)};
        `
    }

    // 渲染
    render () {
        this.el = document.createElement('div')
        this.setStyle()
        document.body.appendChild(this.el)
    }

    move () {
        if (this.isSwing) {
            // if (this.sx >= 1 || this.sx <= -1) {
            //     this.stepSx = -this.stepSx
            // }
            // this.sx += this.stepSx
            if (this.swingRadian > 1.1 || this.swingRadian < 0.9) {
                this.swingStep = -this.swingStep
            }
            this.swingRadian += this.swingStep
            if (this.isRain) {
                this.x += this.sx
            } else {
                this.x += this.sx * Math.sin(this.swingRadian * Math.PI)
            }
            this.y -= this.sy * Math.cos(this.swingRadian * Math.PI)
        } else {
            this.x += this.sx
            this.y += this.sy
        }
        // 完全离开窗口就调一下初始化方法，另外还需要修改一下init方法，因为重新出现我们是希望它的y坐标为0或者小于0，这样就不会又凭空出现的感觉，而是从天上下来的
        if (this.x < -this.width || this.x > this.windowWidth || this.y > this.windowHeight) {
          this.init(true)
          this.setStyle()
        }
        this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, ${this.z}px) ${this.getRotate(this.sy, this.sx)}`
      }

      getRotate(sy, sx) {
        return this.isRain ? `rotate(${sx === 0 ? 0 : (90 + Math.atan(sy / sx) * (180 / Math.PI))}deg)` : ''
      }
}


export default class NewSnow{
    constructor(opt={}) {
        // 元素个数
        this.num = opt.num || 150;
        // 配置项
        this.opt = opt;
        // 雪花数据
        this.snowList = [];
        // 设置body  为了保证透视效果 实现近大远小
        this.setBody();
        // 创建雪花
        this.createSnow();
        // 移动雪花
        this.moveSnow();
    }

    createSnow() {
        this.snowList = [];
        for (let index = 0; index < this.num; index++) {
            let snow = new Snow(this.opt)
            snow.render();
            this.snowList.push(snow);
        }
    }

    moveSnow() {
        const cb = () =>{
            this.snowList.map((item)=>{
                item.move();
            })
            this.moveSnow();
        }
        requestAnimationFrame(cb)
    }

     
    setBody(){
        const head = document.getElementsByTagName('head')[0];
        const style = document.createElement('style')
        style.setAttribute('type','text/css');
        style.innerHTML = `
            body{
                perspective: 500;
                -webkit-perspective: 500;
            }
        `
        head.appendChild(style)
    }
}