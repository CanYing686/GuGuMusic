import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVant from './plugins';
import "./assets/scss/index.scss"

const app = createApp(App);
import VueCookies from 'vue-cookies'
app.use(VueCookies)
getVant(app);
app.use(store)
app.use(router).mount('#app')

