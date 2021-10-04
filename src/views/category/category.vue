<template>
  <div class="category">
    <!-- 搜索 -->
    <van-search
      v-model="value"
      shape="round"
      disabled
      @click="tapHandle"
      placeholder="请输入搜索关键词"
    />
    <use-tabs :categoryList="categoryList"></use-tabs>
  </div>
</template>

<script>
import { ref, reactive, computed,  onMounted,  onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import UseTabs from '@/components/tabs/usetabs'
export default {
  name: 'category',
  components: { UseTabs },
  setup () {
    const store = useStore()
    const router = useRouter()
    let value = ref('')
    /* 显示 tabbar */
    store.commit('tabbar/SETTABAR', true)
    let categoryList = computed(() => store.state.category.category)
    onMounted(() => {
      store.dispatch('category/fetchCategory')
    })


    /* 进入搜索页 */
    function tapHandle () {
      router.push({ name: 'search' })
    }
    onBeforeUnmount(() => {
      store.commit('tabbar/SETTABAR', false)
    })
    return {
      tapHandle,
      value,
      categoryList
    }
  }
}
</script>

<style lang="scss" scoped>
.van-search {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}


</style>
