<template>

  <main class="main">

    <div class="main__Top">
      发现音乐
    </div>

    <div class="Music__List">
      <div class="pic" v-for="(item,index) in this.state.imgList" :key="index">
        <router-link :to="{path:'/src/components/itemMusic.vue',query:{id:item.id}}">
          <div class="pic__in">
            <img :src="item.picUrl" alt="">
            <span>{{ item.name }}</span><br/>
            <span>播放量:{{ changeCount(item.playCount) }} </span>
          </div>
        </router-link>
      </div>
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

<style lang="scss" scoped>

.main {
  padding: 10rem 30rem;
  width: 100%;
  border-bottom: 1px solid black;

  &__Top{
    padding: 0 2.5rem;
    font-size: 2rem;
    font-weight: bolder;

    a{
      cursor: pointer;
      border-bottom: 3px solid rgba(0, 0, 0, 0.3);

      &:hover{
        color: rgba(0, 0, 0, 0.7);
        border-bottom: 1px solid rgba(0, 0, 0, 0.6);

      }
    }
  }
}
.Music__List{
  display: grid;
  grid-template-rows: 1.2fr 1.2fr 1.2fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}

.pic {
  padding: 1rem 2.5rem;
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
  transition: all .3s;
}

a {
  color: black;

  &:hover img{
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}
</style>