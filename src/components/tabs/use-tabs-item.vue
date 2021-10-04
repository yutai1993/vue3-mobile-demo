<template>
  <template v-for="(item2, index2) in item.children" :key="index2">
    <div class="list-box">
      <div class="title">
        <p>{{ item2.cat_name }}</p>
      </div>
      <div class="list">
        <template v-for="(item3, index3) in item2.children" :key="index3">
          <router-link class="list-item" :to="`/goods-list?cid=${item3.cat_id}`">
            <div class="img-box">
              <img :src="item3.cat_icon" alt="">
            </div>
            <p>{{ item3.cat_name }}</p>
          </router-link>
        </template>
      </div>
    </div>
  </template>
</template>

<script>
export default {
  name: 'use-tabs-item',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  setup(props){

  }
}
</script>

<style lang="scss" scoped>
.list-box {
  margin-bottom: 30px;

  .title {
    padding: 5px;
    font-size: 14px;
    font-weight: 700;
  }

  .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .list-item {
      width: 33.33%;
      display: flex;
      align-items: center;
      flex-direction: column;
      color: var(--van-sidebar-selected-text-color);
      .img-box {
        padding: 20px 20px 5px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      > p {
        font-size: 14px;
      }
    }
  }
}
</style>
