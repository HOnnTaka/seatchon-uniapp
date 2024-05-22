"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/detail/detail.js";
  "./pages/myseat/myseat.js";
  "./pages/createSeatChart/createSeatChart.js";
}
const _sfc_main = {
  onLaunch: async () => {
    common_vendor.index.showLoading({
      title: "加载中",
      mask: true
    });
    const { code } = await common_vendor.index.login({
      timeout: 6e3
    });
    const { result } = await common_vendor.Ws.callFunction({
      name: "login",
      data: { code }
    });
    console.log(result);
    getApp().globalData.userinfo = result;
    common_vendor.index.$emit("userinfo");
    common_vendor.index.hideLoading();
  },
  onShow() {
  },
  onHide() {
  },
  globalData: {},
  onError(err) {
    console.err(err);
    common_vendor.index.hideLoading();
    common_vendor.index.showToast({
      title: err.message,
      icon: "none"
    });
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
