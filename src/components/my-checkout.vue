<!--
 * @Author: your name
 * @Date: 2021-10-09 17:04:32
 * @LastEditTime: 2021-10-09 17:59:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\components\my-checkout.vue
-->
<template>
  <!-- 最外层的容器 -->
  <view class="my-checkout-container">
    <!-- 全选区域 -->
    <label class="radio">
      <radio color="#C00000" :checked="isAllChecked" @click="checkAllChecked" />
      <text>全选</text>
    </label>

    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{ checkedAmount | tofixed }}</text>
    </view>

    <!-- 结算按钮 -->
    <view class="btn-checkout" @click="checkoutButtonHandler"
      >结算({{ checkedTotal }})</view
    >
  </view>
</template>

<script>
import { showMessage } from "../utils/message";
export default {
  data() {
    return {};
  },
  computed: {
    isAllChecked() {
      return this.$store.state.cart.cartItems.every((item) => item.goods_state);
    },
    checkedAmount() {
      return this.$store.getters["cart/checkedAmount"];
    },
    // token 为下面的结算按钮事件提供基础
    token() {
      return this.$store.state.user.token;
    },
    checkedTotal() {
      return this.$store.getters["cart/checkedCount"];
    },
    // 收货详细地址的计算属性
    fullAddress() {
      return this.$store.getters["user/fullAddress"];
    },
  },
  methods: {
    checkAllChecked() {
      this.$store.commit("cart/checkAllChecked", !this.isAllChecked);
    },

    checkoutButtonHandler() {
      // 1.先要判断是否勾选了要结算的商品
      console.log(this.checkedTotal, this.fullAddress, this.token);
      if (!this.checkedTotal) {
        showMessage("请选择要结算的商品");
        return;
      }

      // 2再判断是否选择了收货地址
      if (!this.fullAddress) {
        return showMessage("请选择收货地址");
      }

      // 3.最后判断用户是否登录了
      if (!this.token) {
        return showMessage("请先登录！");
      }
    },
  },
};
</script>

<style lang="scss">
.my-checkout-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10rpx;
  font-size: 28rpx;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-checkout {
    height: 100rpx;
    min-width: 200rpx;
    background-color: #c00000;
    color: white;
    line-height: 100rpx;
    text-align: center;
    padding: 0 20rpx;
  }
}
</style>
