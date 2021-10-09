/*
 * @Author: your name
 * @Date: 2021-10-09 16:33:54
 * @LastEditTime: 2021-10-09 16:33:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yougou\src\mixins\tabbar-badge.js
 */
export default {
  computed: {
    total() {
      return this.$store.getters["cart/total"];
    },
  },

  watch: {
    total: {
      handler(newVal) {
        if (newVal > 0) {
          // 大于0的时候才显示徽标
          uni.setTabBarBadge({
            index: 2, // tabBar的按钮索引，也就是第三个按钮
            text: "" + newVal, // 必须是字符串值！！！
          });
        } else {
          // 小于等于0则删除徽标
          uni.removeTabBarBadge({
            index: 2
          })
        }
      },
      immediate: true
    }
  }
}