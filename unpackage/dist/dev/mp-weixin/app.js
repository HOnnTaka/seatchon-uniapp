"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/detail/detail.js";
  "./pages/user/user.js";
  "./pages/createSeatChart/createSeatChart.js";
  "./pages/user/updateUserInfo.js";
}
const _sfc_main = {
  onLaunch: async () => {
    common_vendor.index.showLoading({
      title: "加载中",
      mask: true
    });
    try {
      const { code } = await common_vendor.index.login();
      const { result } = await common_vendor.Ws.callFunction({ name: "login", data: { code } });
      common_vendor.index.setStorageSync("userinfo", result);
      console.log(common_vendor.index.getStorageSync("userinfo"));
    } catch (err) {
      common_vendor.index.showToast({
        title: err.message,
        icon: "none"
      });
      console.log(err);
    }
    common_vendor.index.hideLoading();
    common_vendor.index.$emit("userinfo");
  },
  onShow() {
  },
  onHide() {
  },
  globalData: {},
  onError(err) {
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/seatchon-uniapp/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
