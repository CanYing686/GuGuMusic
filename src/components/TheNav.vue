<template>
  <header class="header">
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__box">
          <router-link to="/" class="router-link">发现音乐</router-link>
        </li>
        <li class="nav__box">
          <router-link to="/about" class="router-link">我的音乐</router-link>
        </li>
        <li class="nav__box">
          <router-link to="/SwiperView" class="router-link">关注</router-link>
        </li>
        <li class="nav__box">
          <router-link to="/" class="router-link">商城</router-link>
        </li>
        <li class="nav__box">
          <router-link to="/" class="router-link">音乐人</router-link>
        </li>
        <li class="nav__box">
          <router-link to="/" class="router-link">下载客户端</router-link>
        </li>
        <li class="nav__box">
          <router-link to="/SearchMusic" class="router-link">搜索音乐</router-link>
        </li>
      </ul>
    </nav>

  </header>

  <router-view/>
</template>

<script>


export default {
  name: "TheNav",
  components:{
  },

}
</script>

<style>


</style>
