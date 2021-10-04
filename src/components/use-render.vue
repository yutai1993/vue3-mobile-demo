<template>
  <van-loading v-if="loading" size="24px">加载中...</van-loading>
  <van-empty v-if="empty" description="没有数据" />
</template>

<script>
export default {
  name: 'use-render',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    empty:{
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.van-loading{
  margin: 15px;
  text-align: center;
}
</style>
