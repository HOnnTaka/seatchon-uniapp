<script>
export default {
  onLaunch: async () => {
    uni.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      // uni.checkSession({
      //   success: () => {
      //     console.log(uni.getStorageSync("userinfo"));
      //   },

      //   fail: async () => {
          const { code } = await uni.login();
          const { result } = await uniCloud.callFunction({ name: "login", data: { code } });
          uni.setStorageSync("userinfo", result);
          console.log(uni.getStorageSync("userinfo"));
        // },
      // });
    } catch (err) {
      uni.showToast({
        title: err.message,
        icon: "none",
      });
      console.log(err);
    }
    uni.hideLoading();

    uni.$emit("userinfo");
  },
  onShow() {},
  onHide() {},
  globalData: {},
  onError(err) {},
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/uni_modules/uni-scss/index.scss";
/* #ifndef APP-NVUE */
@import "@/static/customicons.css";
// 设置整个项目的背景色
page {
  // background-image: linear-gradient(90deg, #47c5ff20, #ff8fde20);
}

/* #endif */
.example-info {
  font-size: 14px;
  color: #333;
  padding: 10px;
}
</style>
