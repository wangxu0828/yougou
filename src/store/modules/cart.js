/*
 * @Author: your name
 * @Date: 2021-10-09 15:05:35
 * @LastEditTime: 2021-10-09 17:58:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\store\modules\cart.js
 */
export default {
  // 开启命名空间
  namespaced: true,

  //状态数据
  state: {
    // 如果缓存中有数据，转换回JSON对象数组，否则设置为空数组
    cartItems: uni.getStorageSync('cart') ? JSON.parse(uni.getStorageSync('cart')) : []
  },

  // mutations方法
  mutations: {
    addToCart(state, item) {
      // 根据商品id查询购物车时候存在这件商品
      const existedItem = state.cartItems.find(x => x.goods_id === item.goods_id)

      if (existedItem) {
        // 如果购物车中已经有这件商品,则更新数量
        existedItem.goods_count++
        // 将购物车信息保存到本地
      } else {
        // 如果购物车中没有这件商品,则添加进去
        state.cartItems.push(item)
      }
      // 将购物车信息保存到本地
      uni.setStorageSync("cart", JSON.stringify(state.existedItem));
    },

    // 更新选中状态
    updateState(state, item) {
      // 根据商品id查询购物车时候存在这件商品
      const existedItem = state.cartItems.find(x => x.goods_id === item.goods_id)
      if (existedItem) {
        existedItem.goods_state = item.goods_state
        // 持久化到本地存储
        uni.setStorageSync('cart', JSON.stringify(state.cartItems))
      }
    },

    //  更改商品数量
    updateCount(state, item) {
      // 在 store 中查找对应的商品数据
      const existedItem = state.cartItems.find(x => x.goods_id === item.goods_id)

      if (existedItem) {
        // 更新查找到的商品数据的数量
        existedItem.goods_count = item.goods_count

        // 持久化到本地存储
        uni.setStorageSync('cart', JSON.stringify(state.cartItems))
      }
    },
    checkAllChecked(state, status) {
      state.cartItems.forEach(item => item.goods_state = status)
    }
  },

  // getters方法
  getters: {
    //统计购物车中商品的总数量
    total(state) {
      return state.cartItems.reduce((p, item) => {
        return p + item.goods_count
      }, 0)
    },

    // 计算勾选的商品价格
    checkedAmount(state) {
      let result = 0
      state.cartItems.forEach((item) => {
        if (item.goods_state) {
          result += item.goods_count * item.goods_price
        }
      })
      return result
    },

    // 计算勾选的商品价格
    checkedCount(state) {
      let result = 0
      state.cartItems.forEach((item) => {
        if (item.goods_state) {
          result += item.goods_count
        }
      })
      return result
    },

  }
}