<template>
  <div class="FooterMusic">
    <div class="FooterMusic__left" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" class="FooterMusic__left-img"
           :class="{'FooterMusic__left-img-active':!isBtnShow,'FooterMusic__left-img-pause':isBtnShow}">

      <div class="FooterMusic__information">
        <p>{{ playList[playListIndex].name }}</p>
        <p>{{ playList[playListIndex].ar.name }}</p>
      </div>
    </div>

    <div class="FooterMusic__right">
      <button @click="play" v-if="isBtnShow">播放</button>
      <button @click="play" v-else>暂停</button>
      <span>列表</span>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `"></audio>
    <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%' }">
      <MusicDetail :musicList="playList[playListIndex]" :play="play" :isBtnShow="isBtnShow" :addDuration="addDuration"/>
    </van-popup>

    <div>
      <input type="range" class="range" min="0" max="100" v-model="volume " @change="changeVolume(volume)" step="1" >
      音量: {{this.volume}}
    </div>

  </div>

</template>

<script>

import {mapState, mapMutations} from "vuex";
import MusicDetail from "@/components/item/MusicDetail";

export default {
  data(){
    return{
      interVal: 0,
      volume: 50
    }
  },
  methods: {
    changeVolume: function(index = 0) {
      this.$refs.audio.volume = index / 1000;
      this.volume = index;
    },
    play: function () {
      console.log(this.$refs)

      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsBtnShow(false)
        this.updateTime();
      } else {
        this.$refs.audio.pause();
        this.updateIsBtnShow(true)
        clearInterval(this.interVal);
      }
    },
    addDuration:function () {
      this.updateDuration(this.$refs.audio.duration)
    },
    // 歌词延迟 100毫秒
    updateTime:function () {

      this.interVal = setInterval(() =>{
        this.updateCurrentTime(this.$refs.audio.currentTime);
      },100)
    },
    ...mapMutations(['updateIsBtnShow', 'updateDetailShow','updateCurrentTime','updateDuration'])
  },
  watch: {
    // 监听下标,发生改变就自动播放音乐
    playListIndex: function () {
      this.$refs.audio.autoplay = true;

      if (this.$refs.audio.paused) {
        this.updateIsBtnShow(false)
      }
    },
    playList: function () {
      if (this.isBtnShow) {
        this.$refs.audio.autoplay = true;
        this.updateIsBtnShow(false);
      }
    }
  },
  computed: {
    ...mapState(['playList', 'playListIndex', "isBtnShow", 'detailShow']),
  },
  components: {
    MusicDetail
  },
  updated() {
    this.$store.dispatch("getLyric",this.playList[this.playListIndex].id);
    this.addDuration()

  },
  mounted() {
    this.$store.dispatch("getLyric",this.playList[this.playListIndex].id);
    this.updateTime();
    this.$refs.audio.volume = 0.05;
  },
};
</script>

<style>
.FooterMusic__left-img{
  animation: rotates 10s infinite linear;
}
.FooterMusic__left-img-active{
  animation-play-state: running;
}
.FooterMusic__left-img-pause{
  animation-play-state: paused;
}

@keyframes rotates {
  0%{
    transform: rotateZ(0);

  }
  100%{
    transform: rotateZ(360deg);
  }
}


</style>