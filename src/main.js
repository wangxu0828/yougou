/*
 * @Author: your name
 * @Date: 2021-10-09 00:02:40
 * @LastEditTime: 2021-10-09 15:05:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\main.js
 */
import Vue from 'vue'
import App from './App'
// 1. 导入 vuex store 模块
import store from '@/store'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.filter('tofixed', function (data) {
  // 把数字处理为带两位小数点的数字
  return Number(data).toFixed(2);
})
const app = new Vue({
  store,
  ...App
})
app.$mount()