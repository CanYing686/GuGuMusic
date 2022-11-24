<template>
  <div class="login">
      <h1>登陆界面</h1>

      <div class="login_box">
        <input type="text" placeholder="账号" v-model="this.phone">
        <input type="text" placeholder="密码" v-model="this.password">
      </div>
    <button type="button" @click="Login"> 登录</button>

  </div>
</template>

<script>
export default {
  name: "Login.vue",
  data(){
    return{
      phone: '',
      password: '',
    }
  },
  methods:{
      Login : async function () {
       const res = await this.$store.dispatch('getLogin',{phone:this.phone,password:this.password})
        console.log(res)
        if (res.data.code === 200){
          this.$store.cookie = encodeURIComponent(res.data.cookie)
          this.$store.commit('updateToken',res.data.token)
          alert("登陆成功")
          this.$router.push('/')
          console.log("当前等级")
        } else {
          alert("手机号或密码错误!")
          this.password = ''
        }
      }
  }
}
</script>

<style scoped>

.login{
  width: 120rem;
  margin: 10rem auto;
  text-align: center;
}

</style>