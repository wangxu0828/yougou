<!--
 * @Author: your name
 * @Date: 2021-10-08 16:51:07
 * @LastEditTime: 2021-10-09 16:36:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\pages\home.vue
-->
<template>
  <view class="container">
    <!-- 搜索框 -->
    <view class="search">
      <my-search @click.native="gotoSearchPage"></my-search>
    </view>
    <view class="content">
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

      <!-- 分类导航区域 -->
      <view class="nav-list">
        <view
          @click="navClickHandler(item)"
          class="nav-item"
          v-for="(item, index) in navList"
          :key="index"
        >
          <image :src="item.image_src" class="nav-img"></image>
        </view>
      </view>

      <!-- 楼层区域 -->
      <view class="floor-list">
        <!-- 楼层 item 项 -->
        <view
          class="floor-item"
          v-for="(item, index) in floorList"
          :key="index"
        >
          <!-- 楼层标题 -->
          <image :src="item.floor_title.image_src" class="floor-title"></image>
          <!-- 楼层图片区域 -->
          <view class="floor-img-box">
            <!-- 左侧 1 个大图 -->
            <view class="left-img-box">
              <image
                :src="item.product_list[0].image_src"
                :style="{ width: item.product_list[0].image_width + 'rpx' }"
                mode="widthFix"
                @click="getProductListURL(product)"
              ></image>
            </view>

            <!-- 右侧 4 个小图 -->
            <view class="right-img-box">
              <block v-for="(product, idx) in item.product_list" :key="idx">
                <view class="right-img-item" v-if="idx !== 0">
                  <image
                    :src="product.image_src"
                    :style="{ width: product.image_width + 'rpx' }"
                    mode="widthFix"
                    @click="getProductListURL(product)"
                  ></image>
                </view>
              </block>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getSwiperList } from "../../api/user";
import { getNavList } from "../../api/user";
import { getFloorList } from "../../api/user";
import MySearch from "../../components/my-search";
import tabBarBadgeMixin from "@/mixins/tabbar-badge";
export default {
  mixins: [tabBarBadgeMixin],
  components: {
    MySearch,
  },
  data() {
    return {
      swiperList: [],
      // 分类导航的数据列表
      navList: [],
      // 1. 楼层的数据列表
      floorList: [],
    };
  },
  async created() {
    await this.getSwiperList();
    await this.getNavList();
    await this.getFloorList();
  },
  methods: {
    async getSwiperList() {
      const { message } = await getSwiperList();
      this.swiperList = message;
    },
    click(item) {
      uni.navigateTo({
        url: "/pages_sub1/product-detail/product-detail?pid=" + item.goods_id,
        fail(err) {
          console.log(err);
        },
      });
    },
    // 获取分类导航数据的方法
    async getNavList() {
      const { message } = await getNavList();
      this.navList = message;
    },

    async getFloorList() {
      const { message } = await getFloorList();
      this.floorList = message;
      console.log(message);
    },
    navClickHandler(item) {
      uni.switchTab({
        url: "/pages/category/index",
      });
    },
    getProductListURL(product) {
      const query = product.navigator_url.split("?")[1];
      uni.navigateTo({
        url: `/pages_sub1/product-list/product-list?${query}`,
      });
    },
    gotoSearchPage() {
      uni.navigateTo({
        url: "/pages_sub1/search/search",
      });
    },
  },
};
</script>

<style lang="scss">
page {
  overflow: hidden;
  height: 100%;
  .container {
    height: 100%;
    overflow: auto;
  }
  .content {
    margin-top: 50px;
    height: 100%;
    overflow: auto;
  }
}

.search {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
}
.top-swiper {
  height: 330rpx;

  .swiper-content,
  image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-title {
  display: flex;
  width: 100%;
  height: 60rpx;
}
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
</style>
