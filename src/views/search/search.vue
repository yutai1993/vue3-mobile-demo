<template>
  <!-- 导航 -->
  <van-nav-bar title="搜索" left-text="返回"
               left-arrow fixed @click-left="clickLeft">
  </van-nav-bar>
  <div class="nav_fixed"></div>
  <!-- 搜索 -->
  <van-search
    v-model="keyword"
    shape="round"
    placeholder="请输入搜索关键词"
  />
  <ul class="search-list">
    <router-link v-show="!show" to="" custom v-slot="{ navigate, href }" v-for="item in searchList"
                 :key="item.goods_id">
      <li>
        <a :href="href" @click="navigate">{{ item.goods_name }}</a>
      </li>
    </router-link>
    <van-empty v-show="!show" description="暂无数据"/>
  </ul>
</template>

<script>
import { getSearch } from '@/api/searcch'
import { ref, reactive, toRefs, customRef, watch } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'search',
  setup () {
    let router = useRouter()
    /* 数据 */
    let searchData = reactive({
      searchList: null,
      show: false,
    })

    //自定义一个myRef 节流防抖
    function myRef (value, delay) {
      let timer
      //通过customRef去实现自定义
      return customRef((track, trigger) => {
        return {
          get () {
            track() //告诉Vue这个value值是需要被“追踪”的
            return value
          },
          set (newValue) {
            clearTimeout(timer)
            timer = setTimeout(() => {
              value = newValue
              trigger() //告诉Vue去更新界面
            }, delay)
          }
        }
      })
    }

    const keyword = myRef('', 500) //使用程序员自定义的ref

    /* 监听查询参数 */
    watch(keyword, (newValue, oldValue) => {
      if (newValue) {
        getSearchData(newValue)
      } else {
        searchData.searchList = null
        searchData.show = false
      }
    })

    /* 获取搜索数据 */
    async function getSearchData (newValue) {
      const result = await getSearch({ query: newValue })
      if (result && result.meta.status === 200) {
        searchData['searchList'] = result.message
        searchData.show = result.message.length !== 0
      }
    }

    function clickLeft(){
      router.back()
    }
    return {
      clickLeft,
      keyword,
      ...toRefs(searchData)
    }
  }
}
</script>

<style lang="scss" scoped>

.search-list {
  padding: 0 5px;

  li {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 5px;

    a {
      font-size: 14px;
    }
  }
}
</style>
