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
