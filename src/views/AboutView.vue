<template>
  <div class="Run">
    <div class="SwiperBox" @mouseenter="MouseFun('移入')" @mouseleave="MouseFun('移出')">
      <!-- 图片 -->
      <div class="imgBox" :style="{ left: `-${leftVal}px`, transition: `${ition}s` }">
        <img :src="item.imageUrl" v-for="(item, index) in this.state.imgList" :key="index"/>
        <!-- 复制第一张放到最后,以实现无缝无线循环滚动效果 -->
        <img :src="item.imageUrl" v-for="(item, index) in this.state.imgList" :key="index"/>

      </div>
      <!-- 左箭头按钮 -->
      <div class="leftBtn" @click="throttle(PrevFun)">&larr;</div>
      <!-- 右箭头按钮 -->
      <div class="rightBtn" @click="throttle(NextFun)">&rarr;</div>
      <!-- 下方指示点容器 -->
      <div class="instBox">
        <div
            @click="instFun(index)"
            v-for="(item, index) in this.state.imgList.length"
            :key="index"
            :class="['inst', index === imgShow ? 'instActv' : '']"
        ></div>
      </div>
    </div>
  </div>

  <swiperView/>
</template>

<script>
import {onMounted, reactive} from "vue";
import {getBanner} from "@/request/api/home.js";
import swiperView from "@/components/SwiperView";

export default {

  data() {
    return {
      leftVal: 0, // 轮播图盒子的偏移值
      flag: true, // 用来节流防止重复点击
      start: null, // 自动执行下一张定的时器
      imgWidth: 800, // 在这里填写你需要的图片宽度
      ition: 0.8, // 设置轮播图过度时间
      imgShow: 0, // 表示当前显示的图片索引
    };
  },
  components: {
    swiperView

  },
  setup() {
    const state = reactive({imgList: []})
    onMounted(async () => {
      let res = await getBanner();
      state.imgList = res.data.banners;
    });
    return {state};

  },
  mounted() {
    this.Swiper(); // 偷偷告诉大家一个小秘密,JavaScript是原生支持中文命名函数或变量的哦
  },

  methods: {
    // 这里定义一个鼠标移入移出事件，鼠标悬停时停止自动轮播，鼠标移出则重新执行自动轮播
    MouseFun(type) {
      // 停止定时器            // 重新执行定时器
      type === "移入" ? clearTimeout(this.start) : this.Swiper();
    },
    // 此为自动轮播定时器
    Swiper() {
      this.start = setInterval(() => {
        this.NextFun();
      }, 3000);
    },
    // 这里通过额外封装的节流函数触发 PrevFun() 和 NextFun(),以达到防止重复点击的效果
    throttle(fun) {
      if (this.flag) {
        this.flag = false;
        fun(); // 此为模板中传递进来的PrevFun()或NextFun()函数
        setTimeout(() => {
          this.flag = true;
        }, 1200); // 节流间隔时间
      }
    },
    // 上一张
    PrevFun() {
      if (this.leftVal === 0) {
        // 判断显示的图片 是 第一张时执行
        // this.imgList.length是指循环图片数组的图片个数
        this.ition = 0; // 将过渡时间变成0，瞬间位移到最后一张图
        this.imgShow = this.state.imgList.length - 1; // 将高亮小点改为最后一张图
        this.leftVal = this.state.imgList.length * this.imgWidth; // 瞬间移动
        setTimeout(() => {
          // 通过延时障眼法,归原过渡时间,执行真正的“上一张”函数
          this.ition = 0.8;
          this.leftVal -= this.imgWidth;
        }, this.ition * 1000);
      } else {
        // 判断显示的图片 不是 第一张时执行
        this.ition = 0.8;
        this.leftVal -= this.imgWidth;
        this.imgShow--;
      }
    },
    // 下一张
    NextFun() {
      if (this.leftVal === (this.state.imgList.length - 1) * this.imgWidth) {
        // 判断显示的图片 是 最后一张时执行
        this.ition = 0.8;
        this.leftVal += this.imgWidth;
        this.imgShow = 0;
        setTimeout(() => {
          this.ition = 0;
          this.leftVal = 0;
        }, this.ition * 1000);
      } else {
        // 判断显示的图片 不是 最后一张时执行
        this.ition = 0.8;
        this.leftVal += this.imgWidth;
        this.imgShow++;
      }
    },
    // 点击小圆点
    instFun(index) {
      this.ition = 0.8;
      this.leftVal = index * this.imgWidth;
      this.imgShow = index;
    },
  },
};
</script>

<style scoped>

.main {

}
</style>