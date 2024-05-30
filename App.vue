<script>
import uniIdPageInit from "@/uni_modules/uni-id-pages/init.js";
export default {
  onLaunch: async () => {
    await uniIdPageInit();
  },
  onShow() {},
  onHide() {},
  globalData: {},
  onError(err) {
    console.error(err);
    uni.showToast({
      title: "出错了",
      icon: "error",
      mask: true,
    });
    uni.getNetworkType(res => {
      if (res.networkType == "none") {
        uni.showToast({
          title: "网络异常，请检查网络",
          icon: "none",
          mask: true,
        });
      }
    });
  },
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
button {
  transition: 0.3s;
}
.uni-card {
  margin: 10px !important;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1) !important;
  border: none !important;
  padding: 0 !important;
}
.uni-button:after {
  border: none;
}
.uni-searchbar__box {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) !important;
}
</style>
