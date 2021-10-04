<template>
  <van-tabbar v-if="tabbar" route>
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/category" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/member" icon="friends-o">会员</van-tabbar-item>
  </van-tabbar>
  <div v-if="tabbar" class="user-tabbar"></div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'tabbar',
  setup(){
    let store = useStore()

    let tabbar = computed(() => store.state.tabbar.tabbar)
    return {
      tabbar
    }
  }
}
</script>

<style lang="scss" >
.van-tabbar{
  border-top: 1px solid #ccc;
}
.van-tabbar-item--active{
  color: red;
}
.user-tabbar{
  width: 100%;
  height: calc(var(--van-tabbar-height) + 1px);
}
</style>
