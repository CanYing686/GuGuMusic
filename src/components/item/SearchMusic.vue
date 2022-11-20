<template>
  <div class="search">
    <input type="search" class="search__input" placeholder="音乐/电台/明星" @keydown.enter="enterKey"
           v-model="searchKey">
  </div>

  <div class="MusicList" v-for="(item,index) in searchList" :key="index">
    <div class="MusicList__item">
      <div class="MusicList__name">
        <p> {{ item.name }} </p>
      </div>
      <div class="MusicList__author">
        <p  v-for="item in item.ar" :key="item" > {{ item.name }} </p>
      </div>
    </div>
  </div>
</template>

<script>

import {getSearchMusic} from "@/request/api/home";

export default {
  name: "SearchMusic",
  data() {
    return {
      keyWorldList: [],
      searchKey: "",
      searchList: [],
      authorName: []
    }
  },
  methods: {
    enterKey: async function () {
      this.keyWorldList.push(this.searchKey);
      let res = await getSearchMusic(this.searchKey);
      this.searchList = res.data.result.songs;
      this.searchKey = ""
      console.log(res)
      // 跳转
      this.$router.push({name: 'SearchMusic'}).catch(error => error);
    }
  }
}

</script>

<style lang="scss" scoped>
.MusicList {

  width: 35rem;
  margin: 3rem auto;

  &__item{
    padding: 1rem 1.5rem;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: flex;
    transition: all .5s;
    justify-content: space-between;



      &:hover {
          transform: translateY(-2px) scale(1.1);
      }
  }

  &__name{

  }

  &__author{

  }
}
</style>