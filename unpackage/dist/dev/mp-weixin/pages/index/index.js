"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_search_bar2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_load_more2 + _easycom_uni_fab2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_load_more + _easycom_uni_fab)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    const charts = common_vendor.ref([]);
    const userinfo = common_vendor.ref({});
    common_vendor.onLoad(async () => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      await login();
      common_vendor.index.hideLoading();
    });
    const login = async () => {
      try {
        const { code } = await common_vendor.index.login();
        const { result } = await common_vendor.Ws.callFunction({ name: "login", data: { code } });
        userinfo.value = result;
        common_vendor.index.setStorageSync("userinfo", result);
        console.log(userinfo.value);
      } catch (err) {
        common_vendor.index.showToast({
          title: err.message,
          icon: "none"
        });
        console.log(err);
      }
    };
    common_vendor.onShow(async () => {
      getCharts(false);
    });
    common_vendor.onPullDownRefresh(async () => {
      await login();
      await getCharts(false);
      common_vendor.index.showToast({
        title: "刷新成功",
        icon: "success"
      });
    });
    const getCharts = async (showToast = true) => {
      if (showToast) {
        common_vendor.index.showLoading({
          title: "加载中"
        });
      }
      const db = common_vendor.Ws.database();
      const res = await db.collection("seat-chart").aggregate().project({
        _id: 1,
        title: 1,
        note: 1,
        creator: 1,
        creatorId: 1,
        selectableTimeRange: 1,
        effectiveTimeRange: 1
      }).end();
      charts.value = res.result.data;
      common_vendor.index.hideLoading();
    };
    const formatTimeRange = (timeRange) => {
      return timeRange.join(" 至 ");
    };
    const availabale = (e) => {
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
            c: common_vendor.t(formatTimeRange(item.selectableTimeRange)),
            d: common_vendor.t(formatTimeRange(item.effectiveTimeRange)),
            e: common_vendor.t(availabale()),
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
        e: common_vendor.p({
          status: "noMore"
        }),
        f: userinfo.value.type == 1
      }, userinfo.value.type == 1 ? {
        g: common_vendor.sr("fab", "1cf27b2a-4"),
        h: common_vendor.o(fabClick),
        i: common_vendor.p({
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
