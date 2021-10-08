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
