/*
 * @Author: your name
 * @Date: 2021-10-09 00:02:40
 * @LastEditTime: 2021-10-09 17:51:18
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\utils\message.js
 */
export function showMessage(
  title = '请求数据失败',
  duration = 1500,
  icon = 'none',
) {
  uni.showToast({
    title,
    duration,
    icon,
  })
}