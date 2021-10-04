<template>
  <div class="router">
    <router-view v-slot="{ Component }">
      <keep-alive include="member,Home,category,cart">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <Tabbar></Tabbar>
</template>

<style lang="scss">
  @import "assets/css/global_Vant";
</style>
<script>
import Tabbar from '@/components/tabbar'
export default {
  components: { Tabbar },
  setup(){

    return {

    }
  }
}
</script>
