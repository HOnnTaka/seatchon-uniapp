<script>
export default {
  onLaunch: async () => {},
  onShow() {},
  onHide() {},
  globalData: {},
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/uni_modules/uni-scss/index.scss";
/* #ifndef APP-NVUE */
@import "@/static/customicons.css";
// 设置整个项目的背景色
/* #endif */
page,
html,
body {
  background-image: linear-gradient(90deg, #47c5ff10, #ff8fde10);
}
.uni-card {
  margin: 10px !important;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1) !important;
  border: none !important;
}
</style>
