<template>
  <main class="main">
      <div class="pic" v-for="(item,index) in this.state.imgList" :key="index">
        <router-link :to="{path:'/src/components/itemMusic.vue',query:{id:item.id}}">
          <div class="pic__in">
            <img :src="item.picUrl" alt="">
            <span>{{ item.name }}</span><br/>
            <span>播放量:{{ changeCount(item.playCount) }} </span>
          </div>
        </router-link>
    </div>
  </main>
</template>

<script>
import {getMusicList} from "@/request/api/home";
import {onMounted, reactive} from "vue";

export default {
  name: 'SwiperView',
  setup() {
    const state = reactive({imgList: []});

    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿"
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万"
      }
    }

    onMounted(async () => {
      let res = await getMusicList();
      state.imgList = res.data.result;
      console.log(res)
    });
    return {state, changeCount};
  },

}
</script>

<style>
.main {
  width: 120rem;
  margin: 5rem auto;
  display: flex;
  flex-wrap: wrap;
}

.pic {
  padding: 1rem 2rem;

}

.pic__in {
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  width: 15rem;

}

.main img {
  border-radius: 5px;
  width: 15rem;
  height: 15rem;
  transition: all .5s;

}
.pic:hover img{
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

a {
  color: black;
}
</style>