/*
 * @Author: your name
 * @Date: 2021-10-08 17:19:40
 * @LastEditTime: 2021-10-09 14:26:12
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

/**
 * 定义获取分类数据的方法
 * @returns
 */
export function getCategoryList() {
  return request.get('/categories')
}

/**
 * 获取搜索建议数据的方法
 * @param {*} keyword 
 * @returns 
 */
export function getSuggestionList(keyword) {
  return request.get('/goods/qsearch', {
    query: keyword
  })
}

/**
 * 获取商品列表
 * @param {*} params 
 * @returns 
 */
export function getProductList(params) {
  return request.get("/goods/search", params)
}

/**
 * 获取商品详情
 * @param {*} productId 
 * @returns 
 */
export function getProductDetail(productId) {
  return request.get("/goods/detail", {
    goods_id: productId
  });
}