/*
 * @Author: your name
 * @Date: 2021-10-09 16:53:25
 * @LastEditTime: 2021-10-09 17:37:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\store\modules\user.js
 */
export default {
  // 开启命名空间
  namespaced: true,
  state: {
    address: uni.getStorageSync('address') ? JSON.parse(uni.getStorageSync('address')) : {},
    token: ''
  },

  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address

      //2.持久化到本地缓存
      uni.setStorageSync("address", JSON.stringify(state.address))
    }
  },

  getters: {
    // 收货详细地址的计算属性
    fullAddress(state) {
      const {
        provinceName,
        cityName,
        countyName,
        detailInfo
      } = state.address;
      if (!provinceName) return "";
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return provinceName + cityName + countyName + detailInfo;
    }
  }
}