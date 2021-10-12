<template>
  <div class="goods-detail">
    <template v-if="!loading">
      <!-- 导航 -->
      <van-nav-bar title="商品详情" left-text="返回"
                   left-arrow fixed @click-left="clickLeft">
      </van-nav-bar>
      <div class="nav_fixed"></div><!-- 占位-->
      <!--  轮播  -->
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in goodsDetail.pics" :key="image">
          <router-link to="/">
            <img
              :src="image.pics_mid ? image.pics_mid : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'"
              alt=""/>
          </router-link>
        </van-swipe-item>
      </van-swipe>
      <!--title 标题-->
      <div class="header-text">
        <div class="left-title">
          <span>{{ goodsDetail.goods_name }}{{ goodsDetail.goods_name }}</span>
        </div>
        <div class="right" @click="clickTabHandle">
          <template v-if="collection">
            <van-icon name="like" size="19"/>
            <p>已收藏</p>
          </template>
          <template v-if="!collection">
            <van-icon name="like-o" size="19"/>
            <p>收藏</p>
          </template>
        </div>
      </div>
      <!--富文本 图片预览-->
      <use-parser :introduce="goodsDetail.goods_introduce"></use-parser>
      <!--底部动作-->
      <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" dot @click="chatHandle" />
        <van-action-bar-icon icon="cart-o" text="购物车" badge="5" @click="cartHandle"/>
        <van-action-bar-icon icon="shop-o" text="店铺"  @click="shopHandle"/>
        <van-action-bar-button type="warning" text="加入购物车" @click="warningHandle" />
        <van-action-bar-button type="danger" text="立即购买" v-tap="dangerHandle" />
      </van-action-bar>
      <!--底部占位-->
      <div class="useplaceholder"></div>
    </template>
  </div>
</template>

<script>

import { ref, reactive, toRefs, watchEffect, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getGoodsDetail } from '@/api/goods-detail'
import UseParser from '@/components/use-parser/use-parser'
import { getStorageItem, setStorageItem } from '@/utils/utils'
import { Toast } from 'vant'
export default {
  name: 'goods-detail',
  components: {
    UseParser
  },
  setup (props) {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      loading: true,
      collection: false,
      collectionShowIndex: -1,
      collectionKey: 'goodDetailCollection',
      goodsDetail: {},
      params: {
        goods_id: route.query.goods_id
      }
    })

    const fetchGoodsDetailData = async () => {
      const result = await getGoodsDetail(data.params)
      if (result && result.meta.status === 200) {
        data.goodsDetail = result.message
        data.loading = false
      }
    }
    onMounted(() => {
      fetchGoodsDetailData()
    })
    // 监听 goodsDetail
    watchEffect(()=>{
      let goodsDetail = data.goodsDetail
      data.collection = isCollection();
    })
    // 切换收藏
    const clickTabHandle = () => {
      let arr = getStorageItem(data.collectionKey) || []
      if (isCollection()){
        // 已收藏 取消收藏
        let putArr = arr.splice(data.collectionShowIndex, 1)
        setStorageItem(data.collectionKey, putArr)
        data.collection = false
        Toast.success('取消收藏');
      }else {
        // 没有收藏 收藏
        arr.push(data.goodsDetail)
        setStorageItem(data.collectionKey, arr)
        data.collection = true
        Toast.success('收藏成功');
      }

    }
    // 判断是否收藏
    function isCollection() {
      // 判断本地是否有收藏的数组
      let storageArr = getStorageItem(data.collectionKey)
      if (!storageArr){
        setStorageItem(data.collectionKey, [])
        return false;
      }
      // 判断本地有没有本条数据
      let index = storageArr.findIndex(value => value.goods_id === data.goodsDetail.goods_id)
      data.collectionShowIndex = index + 1
      return index !== -1;

    }
    // 立即购买
    const dangerHandle = (fn,e) => {
      Toast('立即购买')
    }
    // 加入购物车
    const warningHandle = () => {
      Toast('加入购物车')
    }
    // 客服
    const chatHandle = () => {
      Toast('客服')
    }
    // 进入购物车
    const cartHandle = () => {
      router.replace({name:'cart'})
    }
    // 进入店铺
    const shopHandle = () => {
      Toast('进入店铺')
    }
    // 后退
    function clickLeft () {
      router.back()
    }

    return {
      shopHandle,
      cartHandle,
      chatHandle,
      warningHandle,
      dangerHandle,
      clickTabHandle,
      clickLeft,
      ...toRefs(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-detail {
  /* 轮播 */
  .van-swipe {
    .van-swipe-item {
      img {
        width: 100%;
        height: 230px;
        display: block;
        object-fit: contain;
      }
    }
  }

  .header-text {
    display: flex;
    flex-wrap: nowrap;
    margin-top: 10px;
    font-size: 14px;

    .left-title {
      padding: 0 5px;

      > span {
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /*需要显示时文本行数*/
        font-weight: 700;
        line-height: 1.5;
        overflow: hidden;
        color: #333;
      }
    }

    .right {
      width: 60px;
      flex-shrink: 0;
      text-align: center;
      border-left: 2px solid #333;

      > p {

      }
    }
  }
  .useplaceholder{
    height: var(--van-action-bar-height);
  }
}

</style>
