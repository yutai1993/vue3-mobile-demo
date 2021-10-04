<template>
  <div v-html="introduce" ref="h5Html" class="h5-html" @click="previewImage($event)"></div>
  <!--图片预览-->
  <template v-if="show">
    <van-image-preview ref="preview" teleport="body" v-model:show="show" v-model:images="minImgUrls" @change="onChange">
      <template v-slot:index>第{{ useCurrentIndex + 1 }}页</template>
    </van-image-preview>
  </template>

</template>

<script>
import { ref, reactive, toRefs, watchEffect, onMounted, onBeforeUnmount } from 'vue'
export default {
  name: 'use-parser',
  props: {
    introduce: {
      type: String,
      default: ''
    }
  },
  setup(props){
    const h5Html = ref(null)
    const preview = ref(null)

    const data = reactive({
      show: false, // 预览组件 调用
      imgUrls: [], // 图片大数组
      minImgUrls: [], // 图片小数组
      currentImgUrl: '', // 当前点击的图片链接
      useCurrentIndex: 0 // 图片小数组中的索引
    })


    const onChange = (newIndex) => {
      data.useCurrentIndex = newIndex;
    };

    // 预览图片
    const previewImage = (e) => {
      if (e.target.nodeName == 'IMG') {
        // 遍历
        let imgs = []
        h5Html.value.getElementsByTagName('img').forEach((item,index) => {
          imgs.push(item.getAttribute('src'))
        })
        data.imgUrls = imgs
        // 当前点击的img
        data.currentImgUrl = e.target.getAttribute('src')
        // 找到当前点击图片的索引 大数组中
        let index = data.imgUrls.findIndex(value => value === e.target.getAttribute('src'))
        // 以当前所点击的图片为索引1 截取出小数组
        data.minImgUrls = data.imgUrls.splice(index, 5)
        // 找到当前点击图片的索引 小数组中
        data.useCurrentIndex = data.minImgUrls.findIndex(value => value === e.target.getAttribute('src'))
        data.show = true
      } else {
        return
      }

    }

    function touchmoveHandle(e){
      e.preventDefault();
      e.stopPropagation();
    }

    // 图片预览弹出后阻止浏览器动作，关闭弹窗恢复
    watchEffect(() => {
      let show = data.show
      const { body } = document;
      if (show) {
        body.addEventListener('touchmove', touchmoveHandle,false);
      }else {
        body.removeEventListener('touchmove', touchmoveHandle,false)
      }
    })

    return {
      onChange,
      previewImage,
      h5Html,
      preview,
      ...toRefs(data)
    }
  }
}
</script>

<style scoped>
.h5-html {
  width: 100%;
  padding: 20px 0;
}
.h5-html img {
  width: 100%;
}
</style>
