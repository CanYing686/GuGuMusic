<template>
  <header class="header">
    <div class="Brand">
      GuGuMusic
    </div>
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__item" @click="click(index)" :class="{nav__item_active:index===this.Num}"
            v-for="(Item,index) in List" :key="index">
          <router-link :to="Item.Link" class="nav__router">
            {{ Item.NavName }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
  <router-view/>
</template>
<script>

export default {
  name: "TheNav",
  data() {
    return {
      Num: 0,
      List: [
        {
          Link: "/",
          NavName: "主页"
        }, {
          Link: "/SwiperView",
          NavName: "歌单"
        }, {
          Link: "/SearchMusic",
          NavName: "搜索音乐"
        },
        {
          Link: "/Login",
          NavName: "登录"
        },
      ]
    }
  },
  methods: {
    click(value) {
      this.Num = value;
      console.log(this.Num)
    }
  },

}
</script>
