<template>
  <div class="FooterMusic">
    <div class="FooterMusic__left" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="">

      <div class="FooterMusic__information">
        <p>{{ playList[playListIndex].al.name }}</p>
        <p>{{ playList[playListIndex].ar.name }}</p>
      </div>
    </div>

    <div class="FooterMusic__right">
      <button @click="play" v-if="isBtnShow">播放</button>
      <button @click="play" v-else>暂停</button>
      <span>列表</span>
    </div>
    <audio ref="audio"
           :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `"></audio>
    <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%' }">
      <MusicDetail :musicList="playList[playListIndex]"/>
    </van-popup>
  </div>

</template>

<script>

import {mapState, mapMutations} from "vuex";
import MusicDetail from "@/components/item/MusicDetail";

export default {
  methods: {
    play: function () {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsBtnShow(false)
      } else {
        this.$refs.audio.pause();
        this.updateIsBtnShow(true)
      }
    },
    ...mapMutations(['updateIsBtnShow', 'updateDetailShow'])
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


  }

};
</script>

<style>


</style>