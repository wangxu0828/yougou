/*
 * @Author: your name
 * @Date: 2021-10-08 17:19:40
 * @LastEditTime: 2021-10-08 17:23:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\api\api.js
 */
import request from '../utils/request'

/**
 * 获取轮播图
 * @returns
 */
export function getSwiperList() {
  return request.get('/home/swiperdata')
}

/**
 * 获取分类导航的方法
 * @returns
 */
export function getNavList() {
  return request.get('/home/catitems')
}

/**
 * 获取楼层数据的方法
 * @returns
 */
export function getFloorList() {
  return request.get('/home/floordata')
}
