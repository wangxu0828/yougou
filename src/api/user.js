/*
 * @Author: your name
 * @Date: 2021-10-08 17:19:40
 * @LastEditTime: 2021-10-08 17:23:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\api\api.js
 */
import request from '../utils/request'

export function getSwiperList() {
  return request.get('/home/swiperdata')
}
