"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/detail/detail.js";
  "./pages/user/user.js";
  "./pages/createSeatChart/createSeatChart.js";
  "./pages/order/order.js";
}
const _sfc_main = {
  onLaunch: async () => {
    const { result } = await common_vendor.Ws.callFunction({
      name: "check",
      data: {
        token: common_vendor.index.getStorageSync("token")
      }
    });
    if ((result == null ? void 0 : result.error) == "Unauthorized") {
      if (common_vendor.index.getStorageSync("token")) {
        common_vendor.index.showToast({
          title: "登录过期，请重新登录",
          icon: "error"
        });
      }
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.removeStorageSync("userinfo");
    }
  },
  onShow() {
  },
  onHide() {
  },
  globalData: {},
  onError(err) {
    console.error(err);
    common_vendor.index.showToast({
      title: "出错了",
      icon: "error",
      mask: true
    });
    common_vendor.index.getNetworkType((res) => {
      if (res.networkType == "none") {
        common_vendor.index.showToast({
          title: "网络异常，请检查网络",
          icon: "none",
          mask: true
        });
      }
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
