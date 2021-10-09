<!--
 * @Author: your name
 * @Date: 2021-10-09 09:23:09
 * @LastEditTime: 2021-10-09 10:06:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\components\my-search.vue
-->
<template>
  <!-- // 这是一个没有输入功能的假输入框,点击后直接跳转到单独的搜索页面 -->
  <view class="my-search-container" :style="{ 'background-color': bgcolor }">
    <!-- 
      这是一个没有输入功能的假输入框，
      它使用 view 模拟输入框的样子但没有正真的输入功能，
      点击它后会直接跳转到单独的搜索页面去
     -->
    <view class="my-search-box" :style="{ 'border-radius': radius + 'rpx' }">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
export default {
  // 背景颜色
  props: {
    bgcolor: {
      type: String,
      default: "#C00000",
    },
    // 圆角尺寸
    radius: {
      type: Number,
      default: 30,
    },
  },
};
</script>

<style lang="scss">
.my-search-container {
  background-color: #c00000;
  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
}
.my-search-box {
  height: 72rpx;
  background-color: #ffffff;
  border-radius: 30rpx;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .placeholder {
    font-size: 30rpx;
    margin-left: 10rpx;
  }
}
</style>
