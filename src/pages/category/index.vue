<template>
  <view>
    <!-- 搜索框 -->
    <my-search @click.native="gotoSearchPage"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧的滚动区域 -->
      <scroll-view
        class="left-scroll-view"
        scroll-y
        :style="{ height: wh + 'px' }"
      >
        <block v-for="(item1, index) in categoryList" :key="index">
          <view
            :class="{ active: index === selectedCategory }"
            class="left-scroll-view-item"
            @click="selectCategoryHandler(index)"
          >
            {{ item1.cat_name }}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧的滚动区域 -->
      <scroll-view
        class="right-scroll-view"
        scroll-y
        :style="{ height: wh + 'px' }"
        :scroll-top="scrollTop"
      >
        <!-- 动态渲染二级分类的列表数据 -->
        <view
          class="cate-lv2"
          v-for="(item2, index) in categoryList[selectedCategory].children"
          :key="index"
        >
          <view class="cate-lv2-title">/ {{ item2.cat_name }} /</view>

          <!-- 动态渲染三级分类的列表数据 -->
          <view class="cate-lv3-list">
            <view
              class="cate-lv3-item"
              v-for="(item3, index3) in item2.children"
              :key="index3"
              @click="gotoProductList(item3)"
            >
              <image :src="item3.cat_icon"></image>
              <text>{{ item3.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import MySearch from "@/components/my-search.vue";
import { getCategoryList } from "../../api/user";
import tabBarBadgeMixin from "@/mixins/tabbar-badge";
export default {
  mixins: [tabBarBadgeMixin],
  components: {
    MySearch,
  },
  data() {
    return {
      wh: 0,
      // 1. 分类数据数组
      categoryList: [],
      // 当前选中项的索引，默认让第一项被选中
      selectedCategory: 0,
      // 切换一级分类后要重置滚动条
      scrollTop: 0,
    };
  },
  async created() {
    //动态获取窗口可用高度
    // 获取当前系统信息
    const sysInfo = uni.getSystemInfoSync();

    //从系统信息里面获取窗口可用高度并赋值给wh
    // 窗口可用高度 = 屏幕高度 - navigationBar高度- tarbar高度
    this.wh = sysInfo.windowHeight - 50;
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      const { message } = await getCategoryList();
      this.categoryList = message;
    },
    selectCategoryHandler(index) {
      // 在每次点击一级分类的时候要让数值发生一下变化,因为值不变的话,不会引起视图变化
      this.scrollTop = this.scrollTop === 0 ? 1 : 0;
      this.selectedCategory = index;
    },
    gotoProductList(item) {
      uni.navigateTo({
        url: `/pages_sub1/product-list/product-list?cid=${item.cat_id}`,
      });
    },
  },
};
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 240rpx;

    .left-scroll-view-item {
      line-height: 120rpx;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 24rpx;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: " ";
          display: block;
          width: 6rpx;
          height: 60rpx;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .cate-lv2-title {
    font-size: 24rpx;
    font-weight: bold;
    text-align: center;
    padding: 30rpx 0;
  }
  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      width: 33.33%;
      margin-bottom: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 120rpx;
        height: 120rpx;
      }

      text {
        font-size: 24rpx;
      }
    }
  }
}
</style>
