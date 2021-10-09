/*
 * @Author: your name
 * @Date: 2021-10-09 15:02:03
 * @LastEditTime: 2021-10-09 16:57:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\store\index.js
 */
// 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 导入cart子模块
import cartStoreModule from './modules/cart'
// 导入user子模块
import userStoreModule from './modules/user'
// 将VueX安装为Vue的插件
Vue.use(Vuex)

//创建VueX的Store实例
const store = new Vuex.Store({
  modules: {
    // 挂载cart子模块. 该模块内成员的访问路径被调整为 cart，例如:
    // 该模块中的 cartItems 的访问路径现在为 cart/cartItems
    cart: cartStoreModule,
    // 挂载user子模块
    user: userStoreModule
  }
})

//导出
export default store