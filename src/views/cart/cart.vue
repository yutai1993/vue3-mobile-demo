<template>
  <div class="cart">
    <!-- 搜索 -->
    <van-search
      v-model="value"
      shape="round"
      disabled
      @click="tapHandle"
      placeholder="请输入搜索关键词"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'cart',
  setup () {
    const store = useStore()
    const router = useRouter()

    const value = ref('')

    /* 显示 tabbar */
    store.commit('tabbar/SETTABAR', true)

    /* 进入搜索页 */
    function tapHandle () {
      router.push({ name: 'search' })
    }

    onBeforeUnmount(() => {
      store.commit('tabbar/SETTABAR', false)
    })
    return {
      tapHandle,
      value
    }
  }
}
</script>

<style lang="scss">
.cart {
  .van-action-sheet {
    height: 100vh;
  }
}
</style>
