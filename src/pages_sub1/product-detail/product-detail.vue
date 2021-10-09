<!--
 * @Author: your name
 * @Date: 2021-10-08 17:30:36
 * @LastEditTime: 2021-10-09 15:34:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\pages_sub1\product-detail\index.vue
-->
<template>
  <view v-if="info.goods_name">
    <!-- 轮播图区域 -->
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      :circular="true"
    >
      <swiper-item v-for="(item, index) in info.pics" :key="index">
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{ info.goods_price }}</view>

      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{ info.goods_name }}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>

      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav
        :fill="true"
        :options="leftOptions"
        :buttonGroup="rightOptions"
        @click="leftButtonClick"
        @buttonClick="rightButtonClick"
      />
    </view>
    <!-- 商品详情信息 -->
    <rich-text :nodes="info.goods_introduce"></rich-text>
  </view>
</template>

<script>
import { getProductDetail } from "../../api/user";
export default {
  data() {
    return {
      info: {},
      // 左侧按钮组的配置对象
      leftOptions: [
        {
          icon: "shop",
          text: "店铺",
        },
        {
          icon: "cart",
          text: "购物车",
          info: 11,
        },
      ],
      // 右侧按钮组的配置对象
      rightOptions: [
        {
          text: "加入购物车",
          backgroundColor: "#ff0000",
          color: "#fff",
        },
        {
          text: "立即购买",
          backgroundColor: "#ffa200",
          color: "#fff",
        },
      ],
    };
  },
  onLoad(options) {
    // 获取商品 Id
    const productId = options.pid;

    // 调用请求商品详情数据的方法
    this.getProductDetail(productId);
  },
  computed: {
    total() {
      return this.$store.getters["cart/total"];
    },
  },
  watch: {
    total: {
      handler(val) {
        this.leftOptions[1].info = val;
      },
      immediate: true,
    },
  },
  methods: {
    async getProductDetail(productId) {
      const { message } = await getProductDetail(productId);
      // 解决图片底部空白间隙: 使用 replace() 方法为 img 标签添加行内样式 display: block
      message.goods_introduce = message.goods_introduce.replace(
        /<img /gi,
        '<img style="display:block;" '
      );
      this.info = message;
    },
    preview(index) {
      uni.previewImage({
        // 默认显示图片的索引
        current: index,

        // 图片地址
        urls: this.info.pics.map((pic) => pic.pics_big),
      });
    },
    leftButtonClick(e) {
      if (e.content.text === "购物车") {
        uni.switchTab({ url: "/pages/cart/index" });
      }
    },

    // 右侧按钮的点击事件处理函数
    rightButtonClick(e) {
      // 1.判断是否点击了按钮:加入购物车
      if (e.content.text === "加入购物车") {
        // 2.组织一个商品信息对象
        const item = {
          goods_id: this.info.goods_id, // 商品的Id
          goods_name: this.info.goods_name, // 商品的名称
          goods_price: this.info.goods_price, // 商品的价格
          goods_count: 1, // 商品的数量
          goods_small_logo: this.info.goods_small_logo, // 商品的图片
          goods_state: true, // 商品的勾选状态
        };

        // 调用store中的mutations把商品信息对象存储到购物车中
        this.$store.commit("cart/addToCart", item);
      }
    },
  },
};
</script>

<style lang="scss">
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}
// 商品信息区域的样式
.goods-info-box {
  padding: 20rpx;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 36rpx;
    margin: 20rpx 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 26rpx;
      padding-right: 20rpx;
    }
    // 收藏区域
    .favi {
      width: 240rpx;
      font-size: 24rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1rpx solid #efefef;
      color: gray;
    }
  }

  // 运费
  .yf {
    margin: 20rpx 0;
    font-size: 24rpx;
    color: gray;
  }
}
.goods-detail-container {
  // 给页面外层的容器底部添加 100rpx 的 padding，防止页面内容被底部商品导航组件遮盖
  padding-bottom: 100rpx;
}

.goods_nav {
  // 商品导航组件固定在页底
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
