<!--
 * @Author: your name
 * @Date: 2021-10-08 16:51:07
 * @LastEditTime: 2021-10-08 17:57:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\pages\home.vue
-->
<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper
      class="top-swiper"
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      :circular="true"
    >
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <view class="swiper-content" @click="click(item)">
          <image :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { getSwiperList } from '../../api/user'
export default {
  data() {
    return {
      swiperList: [],
    }
  },
  created() {
    this.getSwiperList()
    console.log(312312)
  },
  methods: {
    async getSwiperList() {
      const { message } = await getSwiperList()
      this.swiperList = message
    },
    click(item) {
      console.log(item)
      uni.navigateTo({
        url: '/pages_sub1/product-detail/product-detail?pid=' + item.goods_id,
        fail(err) {
          console.log(err)
        },
      })
    },
  },
}
</script>

<style lang="scss">
.top-swiper {
  height: 330rpx;

  .swiper-content,
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
