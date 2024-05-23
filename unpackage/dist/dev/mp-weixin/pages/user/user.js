"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_group2 = common_vendor.resolveComponent("uni-group");
  _easycom_uni_group2();
}
const _easycom_uni_group = () => "../../uni_modules/uni-group/components/uni-group/uni-group.js";
if (!Math) {
  _easycom_uni_group();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userinfo = common_vendor.ref({});
    common_vendor.index.$on("userinfo", () => {
      userinfo.value = common_vendor.index.getStorageSync("userinfo");
    });
    return (_ctx, _cache) => {
      return {
        a: userinfo.value.avatarUrl,
        b: common_vendor.t(userinfo.value.nickName),
        c: common_vendor.t(userinfo.value.stuInfo.name),
        d: common_vendor.t(userinfo.value.stuInfo.id),
        e: common_vendor.t(userinfo.value.stuInfo.class),
        f: common_vendor.p({
          title: "座位信息",
          mode: "card"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/seatchon-uniapp/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
