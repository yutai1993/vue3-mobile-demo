import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/index.scss' // 重置样式

//移动端rem适配
import 'amfe-flexible/index'

// ui
import {
  Button, Search, Swipe, SwipeItem, Icon, Empty, NavBar,
  Tabbar, TabbarItem, Sidebar, SidebarItem, Tab,
  Tabs, Image as VanImage, List, PullRefresh, Loading, ActionBar,
  ActionBarIcon, ActionBarButton, ImagePreview, ActionSheet
} from 'vant'

// 手势事件自定义指令
import Touch from './directive/Touch/Touch'

const app = createApp(App)

app.use(Touch)

app.use(store)
app.use(router)

app.use(Button)
app.use(Search)
app.use(Swipe)
app.use(SwipeItem)
app.use(Icon)
app.use(Empty)
app.use(NavBar)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Sidebar)
app.use(SidebarItem)
app.use(Tab)
app.use(Tabs)
app.use(VanImage)
app.use(List)
app.use(PullRefresh)
app.use(Loading)
app.use(ActionBar)
app.use(ActionBarIcon)
app.use(ActionBarButton)
app.use(ImagePreview)
app.use(ActionSheet)

app.mount('#app')
