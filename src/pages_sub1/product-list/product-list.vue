<!--
 * @Author: your name
 * @Date: 2021-10-08 17:30:45
 * @LastEditTime: 2021-10-09 14:23:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\pages_sub1\product-list\index.vue
-->
<template>
  <view>
    <view class="goods-list">
      <block v-for="(product, index) in productList" :key="index">
        <view class="goods-item" @click="gotoProductDetail(product)">
          <!-- 商品左侧图片区域 -->
          <view class="goods-item-left">
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
              <!-- 商品价格 -->
              <view class="goods-price"
                >￥{{ product.goods_price | tofixed }}</view
              >
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import { getProductList } from "../../api/user";
import showMessage from "../../utils/message.js";
export default {
  data() {
    return {
      // 请求参数对象
      params: {
        // 查询关键词
        query: "",
        // 分类id
        cid: "",
        // 页码
        pagenum: 1,
        // 每页条数
        pagesize: 10,
      },
      //商品数据
      productList: [],
      //商品数据总条数,用来实现分页
      total: 0,
      // 商品的默认图片
      defaultImage:
        "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
      // 节流阀开关
      isloading: false,
    };
  },
  async onLoad(options) {
    // 将页面参数转存到this.params对象中
    this.params.query = options.query || "";
    this.params.cid = options.cid || "";

    //获取商品列表数据的方法
    await this.getProductList();
  },
  async onReachBottom() {
    //判断是否还有下一页
    if (this.params.pagenum * this.params.pagesize >= this.total) {
      return showMessage("我是有底线的！所有商品数据已加载完毕！");
    }
    if (this.isLoading) {
      // 节流阀,当发送请求的时候,发生上拉事件,上一个请求未完成,就不会重新发送请求
      return;
    }
    // 页码加以
    this.params.pagenum += 1;
    //获取商品列表数据的方法
    await this.getProductList();
  },
  methods: {
    async getProductList() {
      this.isloading = true;
      const { message } = await getProductList(this.params);
      this.total = message.total;
      this.productList = [...this.productList, ...message.goods];
      this.isloading = false;
    },
    gotoProductDetail(product) {
      uni.navigateTo({
        url: `/pages_sub1/product-detail/product-detail?pid=${product.goods_id}`,
      });
    },
  },
};
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 20rpx 10rpx;
  border-bottom: 1rpx solid #f0f0f0;

  .goods-item-left {
    margin-right: 10rpx;

    .goods-pic {
      width: 200rpx;
      height: 200rpx;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 26rpx;
    }

    .goods-price {
      font-size: 32rpx;
      color: #c00000;
    }
  }
}
</style>
