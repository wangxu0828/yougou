<!--
 * @Author: your name
 * @Date: 2021-10-09 00:02:40
 * @LastEditTime: 2021-10-09 17:34:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\pages\cart\index.vue
-->
<template>
  <view>
    <!-- 购物车有商品时 -->
    <view class="cart-container" v-if="cartItems.length > 0">
      <!-- 地址信息 -->
      <my-address></my-address>
      <!-- 购物车商品列表的标题区域 -->
      <view class="cart-title">
        <!-- 左侧的图标 -->
        <uni-icons type="shop" size="18"></uni-icons>
        <!-- 描述文本 -->
        <text class="cart-title-text">购物车</text>
      </view>
      <!-- 商品列表区域 -->
      <block v-for="(product, index) in cartItems" :key="index">
        <view class="goods-item">
          <!-- 商品左侧图片区域 -->
          <view class="goods-item-left">
            <radio
              :checked="product.goods_state"
              color="#C00000"
              @click="radioChangeHandler(product)"
            ></radio>
            <image
              :src="product.goods_small_logo || defaultImage"
              class="goods-pic"
            ></image>
          </view>
          <!-- 商品右侧信息区域 -->
          <view class="goods-item-right">
            <!-- 商品标题 -->
            <view class="goods-name">{{ product.goods_name }}</view>
            <view class="goods-info-box">
              <view class="goods-info-box">
                <!-- 商品价格 -->
                <view class="goods-price"
                  >￥{{ product.goods_price | tofixed }}</view
                >
                <!-- 商品数量 -->
                <uni-number-box
                  :min="1"
                  :value="product.goods_count"
                  @change="numberChangeHandler($event, product)"
                ></uni-number-box>
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>

    <!-- 购物车无商品时 -->
    <view class="empty-cart" v-else>
      <text class="tip-text">
        空空如也
      </text>
    </view>
    <!-- 结算区域 -->
    <my-checkout></my-checkout>
  </view>
</template>

<script>
import tabBarBadgeMixin from "../../mixins/tabbar-badge";
import MyAddress from "../../components/my-address.vue";
import MyCheckout from "../../components/my-checkout.vue";
export default {
  mixins: [tabBarBadgeMixin],
  components: {
    MyAddress,
    MyCheckout,
  },
  data() {
    return {
      swipeOptions: [
        {
          text: "删除", // 显示的按钮文本
          style: {
            backgroundColor: "#C00000", // 按钮的背景颜色
          },
        },
      ],
    };
  },
  computed: {
    cartItems() {
      return this.$store.state.cart.cartItems;
    },
  },
  methods: {
    radioChangeHandler(item) {
      // 反选状态
      item.goods_state = !item.goods_state;
      // 更新store中的数据
      this.$store.commit("cart/updateState", item);
    },
    numberChangeHandler(e, item) {
      // 设置最新的商品数量
      item.goods_count = parseInt(e);
      // 更新store中的数据
      this.$store.commit("cart/updateCount", item);
    },
    // 点击了滑动操作按钮
    swipeActionClickHandler(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss">
.cart-container {
  padding-bottom: 100rpx;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 300rpx;

  .tip-text {
    font-size: 24rpx;
    color: gray;
    margin-top: 30rpx;
  }
}
.cart-title {
  height: 80rpx;
  display: flex;
  align-items: center;
  font-size: 28rpx;
  padding-left: 10rpx;
  border-bottom: 1rpx solid #efefef;
  .cart-title-text {
    margin-left: 20rpx;
  }
}
.goods-item {
  display: flex;
  padding: 20rpx 10rpx;
  border-bottom: 1rpx solid #f0f0f0;
  // 让 goods-item 项占满整个屏幕的宽度
  width: 750rpx;

  // 设置盒模型为 border-box
  box-sizing: border-box;
  .goods-item-left {
    margin-right: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .goods-pic {
      width: 200rpx;
      height: 200rpx;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 26rpx;
    }

    .goods-info-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .goods-price {
      font-size: 32rpx;
      color: #c00000;
    }
  }
}
</style>
