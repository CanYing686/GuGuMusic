<template>
  <img :src="musicList.al.picUrl" alt="Music" class="detail__background">
  <div class="detail">
    <div class="detail__top">
      <vue3-marquee class="detail__top-Name" style="--duration:10s;">
        {{musicList.al.name}}
      </vue3-marquee>
      <p class="detail__top-Author" v-for="(item) in musicList.ar" :key="item">
       作者: {{item.name}}
      </p>
    </div>
    <div class="detail__main">
      <img src="../../assets/needle-ab.png" alt="cd">
      <img src="../../assets/cd.png" alt="cd">
      <img :src="musicList.al.picUrl" alt="">
    </div>
  </div>
</template>

<script>
import {Vue3Marquee} from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
export default {
  name: "MusicDetail",
  props: ['musicList'],
  mounted() {
    console.log(this.musicList)
  },
  components:{
    Vue3Marquee
  }

}
</script>

<style lang="scss">
.detail__background{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(100px);
}
.detail{
  max-height: 100vh;
  margin: 15rem auto;
  &__top{
    margin: 0 auto;

    text-align: center;
    color: black;
    width: 30rem;
    &-Name{
      font-size: 30px;
    }

    &-Author{
      font-size: 20px;

    }

  }
}

.detail__main{
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &> img:nth-child(1){
    width: 9rem;
    height: 15rem;
    position: absolute;
    left: 46%;
    top: 15rem;
    transform: rotate(-10deg);
    transition: all 2s;
    z-index: 1;
  }
  &> img:nth-child(2){
    width: 30rem;
    height: 30rem;
    position: absolute;
    top: 15rem;
  }
  &> img:nth-child(3){
    top: 20rem;
    width: 20rem;
    height: 20rem;
    position: absolute;
    border-radius: 50%;
  }
}

</style>