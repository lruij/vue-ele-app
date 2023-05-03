import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Tabbar, TabbarItem, Search, NavBar, Icon, Tag, Loading, Skeleton } from 'vant'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// vant-ui 按需引入
app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(NavBar)
app.use(Icon)
app.use(Tag)
app.use(Loading)
app.use(Skeleton)


// 字体配置 对不同尺寸适配 (px -> rem)
const rootValue = 16
const rootwidth = 390

const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = (deviceWidth * rootValue) / rootwidth + 'px'

app.mount('#app')
