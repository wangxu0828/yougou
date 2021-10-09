<!--
 * @Author: your name
 * @Date: 2021-10-09 10:09:07
 * @LastEditTime: 2021-10-09 14:00:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\pages_sub1\search\search.vue
-->
<template>
  <view class="search-box">
    <!-- 使用uni-ui提供的搜索组件 -->
    <uni-search-bar
      cancelButton="none"
      :radius="100"
      @input="inputHandler"
      ref="searchbox"
    >
    </uni-search-bar>
    <!-- 搜索建议列表 -->
    <view class="sugg-list">
      <view
        class="sugg-item"
        v-for="(item, index) in sugguestions"
        :key="index"
        @click="gotoProductDetail(item)"
      >
        <view class="goods-name">{{ item.goods_name }}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-if="sugguestions.length === 0">
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
      </view>

      <!-- 历史列表 -->
      <view class="history-list">
        <uni-tag
          v-for="(item, index) in historyList"
          :key="index"
          :text="item"
          @click="gotoProductList(item)"
        ></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
import { getSuggestionList } from "../../api/user";
export default {
  data() {
    return {
      // 防抖定时器
      timer: null,
      // 搜索关键字
      keyword: "",
      // 搜索建议的数据数组
      sugguestions: [],
      // 搜索关键词的历史记录
      historyList: [],
    };
  },
  created() {
    // 从本地存储读取关键字历史字符串
    this.historyList = JSON.parse(uni.getStorageSync("keywords")) ?? [];
  },
  mounted() {
    // 进入页面时让输入框自动聚焦
    const searchbox = this.$refs.searchbox;
    searchbox.show = true;
    searchbox.showSync = true;
  },

  methods: {
    inputHandler(e) {
      // 1. 清除还未执行的定时器
      clearTimeout(this.timer);

      // 2. 创建一个新的定时器
      this.timer = setTimeout(() => {
        this.keyword = e;
        this.getSugguestionList();
        this.updateHistoryList();
      }, 500);
    },

    async getSugguestionList() {
      // 关键字为空则清空结果
      if (!this.keyword) {
        this.sugguestions = [];
        return;
      }

      const { meta, message } = await getSuggestionList(this.keyword);
      this.sugguestions = message;
      console.log(message);
    },
    gotoProductDetail(item) {
      // 跳转到产品详情页面
      uni.navigateTo({
        url: "/pages_sub1/product-detail/product-detail?pid=" + item.goods_id,
      });
    },
    //更新搜索历史列表
    updateHistoryList() {
      this.historyList.push(this.keyword);

      //历史搜索列表去重
      this.historyList = Array.from(new Set(this.historyList));

      if (this.historyList.length > 10) {
        arr.shift();
      }

      //将历史记录列表保存到本地
      uni.setStorageSync("keywords", JSON.stringify(this.historyList));
    },
    // 清空关键字
    clearHistory() {
      // 1.清空data中的数据
      this.historyList = [];

      //清空Storage中的数据
      uni.removeStorageSync("keywords");
    },
    // 点击历史关键字跳转商品列表
    gotoProductList(item) {
      uni.navigateTo({
        url: `/pages_sub1/product-list/product-list?query=${item}`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
// 使用样式穿透：覆盖 uni-search-bar 组件的 .uni-searchbar 背景色
::v-deep .uni-searchbar {
  background-color: #c00000 !important;
}

// 搜索框吸顶
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
// 搜索建议列表
.sugg-list {
  padding: 0 10rpx;

  .sugg-item {
    font-size: 24rpx;
    padding: 26rpx 0;
    border-bottom: 1rpx solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      margin-right: 6rpx;

      // 溢出部分隐藏
      overflow: hidden;

      // 文字不允许换行
      white-space: nowrap;

      // 文字溢出后使用省略号表示
      text-overflow: ellipsis;
    }
  }
}
// 搜索历史
.history-box {
  padding: 0 10rpx;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    font-size: 26rpx;
    border-bottom: 2rpx solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    uni-tag {
      margin-top: 10rpx;
      margin-right: 10rpx;
    }
  }
}
</style>
