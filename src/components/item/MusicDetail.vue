<template>
  <img :src="musicList.al.picUrl" alt="Music" class="detail__background">
  <div class="detail">
    <div class="detail__top">
      <vue3-marquee class="detail__top-Name" style="--duration:10s;">
        {{ musicList.name }}
      </vue3-marquee>
      <p class="detail__top-Author" v-for="(item) in musicList.ar" :key="item">
        作者: {{ item.name }}
      </p>
    </div>

    <div class="detail__main" v-show="!isLyricShow" @click="isLyricShow=true">
      <img src="../../assets/needle-ab.png" alt="cd" class="needle-ab" :class="{'needle-ab-active':!isBtnShow}">
      <img src="../../assets/cd.png" alt="cd">
      <img :src="musicList.al.picUrl" alt="cd" class="detail_picture"
           :class="{'detail_picture-active':!isBtnShow,'detail_picture-pause':isBtnShow}">
    </div>

    <div class="Lyric" v-show="isLyricShow" ref="musicLyric" @click="isLyricShow=false">
      <p v-for="item in lyric" :key="item"
         :class="{active:(currentTime * 1000>=item.time && currentTime*1000<item.pre)}">
        {{ item.lrc }}
      </p>
    </div>

    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="this.currentTime" step="0.05">
    </div>

    <div class="detail__footer">
      <button @click="updateDetailShow" class="detail__footer-btn">关闭全屏</button>
      <div class="detail__Btn">
        <button @click="goPlay(-1)" class="detail__footer-btn">上一首</button>
        <button @click="play" class="detail__footer-btn" v-if="isBtnShow">播放</button>
        <button @click="play" class="detail__footer-btn" v-else>暂停</button>
        <button @click="goPlay(1)" class="detail__footer-btn">下一首</button>
      </div>

    </div>
  </div>
</template>

<script>
import {Vue3Marquee} from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import {mapMutations, mapState} from "vuex";

export default {
  name: "MusicDetail",
  props: ['musicList', 'play', 'isBtnShow','addDuration'],

  data() {
    return {
      isLyricShow: false
    }
  },
  mounted() {
    this.addDuration()
    // console.log(this.musicList)
  },
  components: {
    Vue3Marquee
  },

  methods: {
    goPlay: function (num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1
      } else if (index === this.playList.length) {
        index = 0
      }
      this.updatePlayLIndex(index);
    }
    ,
    ...mapMutations(['updateDetailShow', 'updatePlayLIndex'])
  },
  computed: {
    ...mapState(["lyricList", "currentTime", 'playListIndex', 'playList','duration']),
    lyric: function () {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);

          let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          return {min, sec, mill, lrc, time};
        })
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1]).time) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time
          }
        })
      }
      return arr;
    }
  },
  watch: {
    currentTime: function (newValue) {
      let p = document.querySelector("p.active");
      //如果有 p 触发
      if (p) {
        if (p.offsetTop > 400) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 400;
        }
      }
      if (newValue === this.duration){
        //回到第一首
        if (this.playListIndex === this.playList.length-1){
          this.updatePlayLIndex(0);
          this.play();
        }else {
          this.updatePlayLIndex(this.playListIndex+1);
        }
      }
    }
  },
}
</script>

<style lang="scss">
.detail__background {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(100px);
}

.detail {
  max-height: 100vh;
  margin: 10rem auto;

  &__top {
    margin: 0 auto;

    text-align: center;
    color: black;
    width: 30rem;

    &-Name {
      font-size: 30px;
    }

    &-Author {
      font-size: 20px;
    }

  }
}

.detail__main {
  width: 100%;
  height: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .needle-ab {
    width: 9rem;
    height: 15rem;
    position: absolute;
    left: 49%;
    top: 2rem;
    //transform: rotate(0deg);
    transition: all 2s;
    z-index: 1;
  }

  .needle-ab-active {
    left: 50%;
    transform: rotate(-15deg);
    top: 1rem;
  }

  & > img:nth-child(2) {
    width: 30rem;
    height: 30rem;
    position: absolute;
    top: 5rem;
  }

  .detail_picture {
    animation: rotates 10s infinite linear;
    top: 10rem;
    width: 20rem;
    height: 20rem;
    position: absolute;
    border-radius: 50%;
  }

  .detail_picture-active {
    animation-play-state: running;
  }

  .detail_picture-pause {
    animation-play-state: paused;
  }
}

.detail__footer {
  text-align: center;

  &-btn {
    background: none;
    color: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 1rem 3rem;
    border-radius: 2.5rem;
    transition: all .5s;

    &:hover {
      background: rgba(0, 0, 0, 0.7);
      color: rgb(141, 122, 122);

    }

  }

}

.detail__Btn {

}

.detail__footer-btn {
  margin-bottom: 1rem;
  width: 15rem;
}

.detail__footer {
}

.Lyric {
  text-align: center;
  overflow-y: scroll;
  margin: 3rem 0;
  height: 40rem;
  scroll-behavior: smooth;

  p {
    cursor: pointer;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    transition: all .3s;

    &:hover {
      font-size: 2rem;
      background-image: -webkit-linear-gradient(right, #00ff32, yellow);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .active {
    background-image: -webkit-linear-gradient(right, red, yellow);
    -webkit-background-clip: text;
    font-size: 2rem;
    -webkit-text-fill-color: transparent;
  }
}

::-webkit-scrollbar {

  display: none;
}

.footerContent{
  display: flex;
  width: 50%;
  margin: 0 auto;
  .range{
    width: 50%;
    margin: 0 auto;


  }
}
</style>