<template>
  <div class="home">
    <!-- 搜索 -->
    <van-search
      v-model="value"
      shape="round"
      disabled
      @click="tapHandle"
      placeholder="请输入搜索关键词"
    />
    <!--  轮播  -->
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in swiperList" :key="image">
        <router-link to="/">
          <img :src="image.image_src"/>
        </router-link>

      </van-swipe-item>
    </van-swipe>
    <!--  导航  -->
    <div class="nav">
      <div class="nav-item" v-for="item in navigationList" :key="item.name">
        <router-link class="link" to="/">
          <img :src="item.image_src" :alt="item.name">
        </router-link>
        <span class="nav-name">{{ item.name }}</span>
      </div>
    </div>
    <!-- 楼层   -->
    <div class="building" >
      <template v-for="(item, index) in buildingList" :key="index">
        <div class="building-header">
          <span>{{ item.floor_title.name }}</span>
          <img :src="item.floor_title.image_src" :alt="item.floor_title.name">
        </div>
        <div class="building-body clearfix">
          <div class="building-list-item" v-for="list in item.product_list" :key="list.name">
            <img :src="list.image_src" alt="">
          </div>
        </div>
      </template>
    </div>
  </div>

</template>

<script>
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  setup () {
    const router = useRouter()
    const store = useStore()
    store.commit('tabbar/SETTABAR', true)
    /* 搜索数据 */
    const value = ref('')

    onMounted(() => {
      initFetch()
    })
    onBeforeUnmount(() => {
      store.commit('tabbar/SETTABAR', false)
    })
    /* 轮播图数据 */
    let swiperList = computed(() => store.state.home.swiper)
    /* 导航数据 */
    let navigationList = computed(() => store.state.home.navigation)
    let buildingList = computed(() => store.state.home.building)

    /* 搜索跳转 */
    function tapHandle (fn, e) {
      router.push({
        name: 'search'
      })
    }

    /* 获取页面数据 */
    function initFetch () {
      store.dispatch('home/fetchSwiper')
      store.dispatch('home/fetchNavigation')
      store.dispatch('home/fetchBuilding')
    }

    return {
      value,
      tapHandle,
      swiperList,
      navigationList,
      buildingList
    }
  }
}
</script>

<style lang="scss">
.home {
  /* 轮播 */
  .van-swipe {
    .van-swipe-item {
      img {
        width: 100%;
        height: 150px;
        display: block;
        object-fit: cover;
      }
    }
  }

  /* 导航*/
  .nav {
    padding: 5px 0;

    .nav-item {
      display: inline-block;
      width: 25%;

      .link {
        display: block;
        padding: 5px;

        img {
          width: 100%;
        }
      }

      .nav-name {
        display: none;
      }
    }
  }
  /* 楼层 */
  .building{
    .building-header{
      height: 30px;
      padding: 8px 0 0 0;
      span{
        display: none;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    .building-body{
      padding: 0 5px 10px 5px;
      .building-list-item{
        float: left;
        width: 33.33%;
        img{
          width: 100%;
          height: 100%;
         // object-fit: cover;
        }
      }
      /* 第一个 */
      .building-list-item:nth-last-child(n+5){
        height: 200px;
      }
      /* 后四个 */
      .building-list-item:nth-last-child(-n+4){
        height: 100px;
        box-sizing: border-box;
        padding-left: 3px;
      }
    }
  }
}
</style>
