<template>
  <!-- 左侧导航 -->
  <div class="sidebar-left">
    <div style="height: 100%; overflow-y: auto; transition: .3s">
      <van-sidebar v-model="active" @change="onChange">
        <template v-for="(item,index) in categoryList" :key="item.cat_id">
          <van-sidebar-item :ref="el => { if (el) sidebar[index] = el }" :title="item.cat_name"/>
        </template>
      </van-sidebar>
    </div>

  </div>

  <div class="right">
    <!--右侧内容-->
    <template v-for="(item, index) in categoryList" :key="index">
      <div class="container" v-show="active === index">
        <!--右侧内单个分类-->

        <component :is="getterName(index)" :item="item"></component>
        <!--<component :is="TabsItem"></component>-->
        <!--<use-tabs-item :item="item"></use-tabs-item>-->
      </div>
    </template>


  </div>
</template>

<script>
import { ref, toRefs, reactive, onBeforeMount } from 'vue'
import useTabsItem from '@/components/tabs/use-tabs-item'

export default {
  name: 'useTabs',
  components: { useTabsItem },
  props: {
    categoryList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props) {
    const active = ref(0)
    const sidebar = ref([])
    let data = reactive({
      includesName: [0]
    })
    onBeforeMount(() => {
      sidebar.value = []
    })
    function getterName(index){
      if (data.includesName.includes(index)){
        return "useTabsItem"
      }else {
        return false
      }
    }
    const onChange = (index) => {
      observation(index)
      if (!data.includesName.includes(index)){
        data.includesName.push(index)
      }
    }

    // 观测 点击元素保持剧中
    function observation(index){
      /* 每次点击的元素 */
      const el = sidebar.value[index].$el;
      /* 框 */
      const boxObj = el.parentNode.parentNode
      /* 点击元素的高 */
      let itemHeight = el.getBoundingClientRect().height
      /* 点击元素距离顶部的距离 */
      let itemTop = el.getBoundingClientRect().top
      /* 框的高度 */
      let boxHeight = boxObj.getBoundingClientRect().height
      /* 计算当前元素所在位置 = 当前元素距离顶部的距离 + 卷曲出去的距离 */
      var itemOffsetTop = itemTop + boxObj.scrollTop
      /*  */
      var centerTop = ( boxHeight - itemHeight) / 2

      boxObj.scrollTop = itemOffsetTop - centerTop

    }
    return {
      active,
      sidebar,
      onChange,
      ...toRefs(data),
      getterName
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-left {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: white;
  padding-top: 54px;
  padding-bottom: calc(var(--van-tabbar-height) + 1px);

}

.right {
  overflow: hidden;
  padding-top: 54px;
  padding-left: var(--van-sidebar-width);


}
</style>
