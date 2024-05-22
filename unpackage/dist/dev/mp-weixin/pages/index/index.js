"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_search_bar2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_fab2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_fab)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    const charts = common_vendor.ref([]);
    const userinfo = common_vendor.ref();
    common_vendor.index.$on("userinfo", () => {
      userinfo.value = getApp().globalData.userinfo;
    });
    common_vendor.onLoad(async () => {
      getCharts();
      console.log(userinfo.value);
    });
    const getCharts = async () => {
      const db = common_vendor.Ws.database();
      const res = await db.collection("seat-chart").aggregate().project({
        _id: 1,
        title: 1,
        note: 1,
        creator: 1,
        creatorId: 1,
        selectableTime: 1,
        effectiveTime: 1
      }).end();
      charts.value = res.result.data;
    };
    const availabale = (e) => {
      console.log(e);
      return "选座中";
    };
    const search = async () => {
    };
    const fabClick = () => {
      common_vendor.index.navigateTo({
        url: "/pages/createSeatChart/createSeatChart"
      });
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.o(search),
        b: common_vendor.o(($event) => searchValue.value = $event),
        c: common_vendor.p({
          placeholder: "请输入搜索内容",
          modelValue: searchValue.value
        }),
        d: common_vendor.f(charts.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.note),
            c: common_vendor.t(item.selectableTime),
            d: common_vendor.t(item.effectiveTime),
            e: common_vendor.t(availabale(item)),
            f: item.chartId,
            g: "1cf27b2a-2-" + i0 + ",1cf27b2a-1",
            h: common_vendor.p({
              clickable: true,
              link: true,
              to: "/pages/detail/detail?chartId=" + item._id,
              title: item.title,
              note: item.note
            })
          };
        }),
        e: ((_a = userinfo.value) == null ? void 0 : _a.type) == 1
      }, ((_b = userinfo.value) == null ? void 0 : _b.type) == 1 ? {
        f: common_vendor.sr("fab", "1cf27b2a-3"),
        g: common_vendor.o(fabClick),
        h: common_vendor.p({
          pattern: {
            buttonColor: "#07c160"
          },
          horizontal: "right",
          vertical: "bottom"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/code/seatchon-uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
