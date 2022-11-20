<template>
  <div class="content">
    <div class="music-top">
      <div class="content-img">
        <img :src="state.playlist.coverImgUrl" alt=""/>
      </div>
      <div class="content__information">
        <ul class="content__box">
          <li class="content__item">
            <p class="content__top">歌单名称:</p>
            <span class="content__name">{{ state.playlist.name }}</span>
          </li>
          <li class="content__item">
            <p class="content__top">标签:</p>
            <span class="content__name">{{ state.playlist.tags }}</span>
          </li>
          <li class="content__item">
            <p class="content__top">歌单介绍:</p>
            <span class="content__name">{{ ellipsis(state.playlist.description) }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="music">
      <div class="music__item" v-for="(Item,Index) in state.playitem" :key="Index" @click="playMusic(Index)">
        <div class="music__number">
          {{ Index + 1 }}
        </div>

        <div class="music__left">
          <div class="music__left-left">
            <p>歌曲名称: {{ Item.name }} </p>
          </div>

          <div class="music__left-right">
            <span>歌手: </span>
            <div class="" v-for="Item in Item.ar" :key="Item">
              {{ Item.name }}&nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import {useRoute} from "vue-router";
import {onMounted, reactive} from "@vue/runtime-core";
import {getMusicItemList, getItemList} from "@/request/api/musicListItem";
import {mapMutations} from "vuex";
import service from "@/request";

export default {
  name: "itemMusic",
  setup() {
    const state = reactive({
      playlist: {},
      playitem: [],
    });

    onMounted(async () => {
      let id = useRoute().query.id;
      // 获取歌单详情页面
      let res = await getMusicItemList(id);
      console.log('歌单详情页面')
      console.log(res);
      state.playlist = res.data.playlist;
      // 获取歌单歌曲
      let result = await getItemList(id);
      state.playitem = result.data.songs;
      console.log('歌单歌曲列表')
      console.log(state.playitem);
      console.log(service);
    });

    function ellipsis(value) {
      if (!value) return ''
      if (value.length > 100) {
        return value.slice(0, 100) + "...";
      }
      return value;
    }

    return {state, ellipsis};
  },
  methods: {
    playMusic: function (i) {
      this.updatePlayerList(this.state.playitem);
      this.updatePlayLIndex(i);

    },
    ...mapMutations(['updatePlayerList', 'updatePlayLIndex'])
  }
};
</script>
