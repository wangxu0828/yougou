/*
 * @Author: your name
 * @Date: 2021-10-08 17:05:05
 * @LastEditTime: 2021-10-08 17:15:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\utils\request.js
 */
import FlyIO from 'flyio/dist/npm/wx'
import { showMessage } from './message'
// 创建新的FlyIO实例
const request = new FlyIO()

//设置超时时间
request.config.timeout = 30000

// 设置基地址
request.config.baseURL = 'https://www.uinav.com/api/public/v1'

// 设置请求拦截器
request.interceptors.request.use(
  (config) => {
    uni.showLoading({
      title: '加载中',
      mask: true,
    })
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

// 设置响应拦截器
request.interceptors.response.use(
  (response) => {
    const { meta, message } = response.data
    if (meta.status !== 200) {
      showMessage()
      return
    }
    uni.hideLoading()
    // 去一层壳
    return response.data
  },
  (err) => {
    uni.hideLoading()
    return Promise.reject(err)
  },
)

// 导出
export default request
