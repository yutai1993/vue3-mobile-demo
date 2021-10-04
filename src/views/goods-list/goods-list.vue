<template>
  <div class="goods-list">
    <!-- 导航 -->
    <van-nav-bar title="商品列表" left-text="返回"
                 left-arrow fixed @click-left="clickLeft">
    </van-nav-bar>
    <div class="nav_fixed"></div>
    <!-- 搜索 -->
    <van-search
      v-model="value"
      shape="round"
      disabled
      @click="tapHandle"
      placeholder="请输入搜索关键词"
    />

    <!---->
    <van-tabs v-model:active="active" sticky>
      <van-tab title="综合">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <template v-for="item in list" :key="item.goods_id">
              <router-link :to="`/goods-detail?goods_id=${item.goods_id}`" custom v-slot="{ navigate }">
                <div @click="navigate" @keypress.enter="navigate" role="link" class="goods-item" >
                  <div class="goods-left">
                    <div class="img-box">
                      <img :src="item.goods_small_logo ? item.goods_small_logo : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg' "
                           alt="">
                    </div>
                  </div>
                  <div class="goods-right">
                    <div class="title-box">
                      <span class="ittle">{{item.goods_name}}</span>
                    </div>
                    <p class="price">￥{{item.goods_price}}</p>
                  </div>
                </div>
              </router-link>
            </template>

          </van-list>
        </van-pull-refresh>

      </van-tab>
      <van-tab title="销量">销量</van-tab>
      <van-tab title="价格">价格</van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { getGoods } from '@/api/goods-list'

export default {
  name: 'goods-list',
  setup (props) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const value = ref('')
    const active = ref(0)

    const list = ref([])
    const loading = ref(false) // 是否处于加载状态，加载过程中不触发 load 事件
    const finished = ref(false) // 是否已加载完成，加载完成后不再触发 load 事件
    const refreshing = ref(false) // 下拉刷新 是否处于加载中状态

    const data = reactive({
      params: {
        pagenum: 1,
        cid: route.query.cid,
        pagesize: 20
      }
    })

    /* 上拉 */
    async function onLoad () {
      // 下拉刷新执行
      if (refreshing.value) {
        list.value = []
        refreshing.value = false
      }
      // 是否处于加载状态 加载中 不触发 onLoad事件
      loading.value = true

      const result = await getGoods(data.params)
      if (result && result.meta.status === 200) {
        list.value.push(...result.message.goods)
        data.params.pagenum = ++data.params.pagenum
        // 加载完成 关闭加载中 关闭本次加载
        loading.value = false;
        // 到达总条数
        if (list.value.length >= result.message.total) {
          // 到底了
          finished.value = true
        }
      }

    }

    /* 下拉 */
    const onRefresh = () => {
      // 清空列表数据
      finished.value = false
      data.params.pagenum = 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true
      onLoad()
    }

    function clickLeft () {
      router.back()
    }

    /* 搜索跳转 */
    function tapHandle (fn, e) {
      router.push({
        name: 'search'
      })
    }

    return {
      value,
      active,
      clickLeft,
      tapHandle,

      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
    }
  }
}
</script>

<style lang="scss">
.goods-list {
  .van-tabs__line {
    width: 33.33%;
  }

  .goods-item {
    display: flex;
    flex-wrap: nowrap;
    margin: 10px 0;

    .goods-left {
      flex: 1;
      display: flex;
      justify-content: center;

      .img-box {
        width: 80px;
        height: 80px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

    }

    .goods-right {
      flex: 2;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;


      .title-box {
        padding-right: 10px;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      .price {
        color: red;
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
