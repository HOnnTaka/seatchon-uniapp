"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_load_more2 + _easycom_unicloud_db2 + _easycom_uni_card2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_load_more + _easycom_unicloud_db + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const userinfo = common_vendor.ref(common_vendor.index.getStorageSync("userinfo"));
    const page = getCurrentPages().find((page2) => page2.route === "pages/order/order");
    const db = common_vendor.Ws.database();
    const dbList = common_vendor.ref([
      db.collection("order").where('userId ==  "216124125"').field("chartId,x,y,userId").getTemp(),
      db.collection("seat-chart").field("_id,effectiveTimeRange,selectableTimeRange,title,note").getTemp()
    ]);
    const formatTimeRange = (timeRange) => {
      return timeRange.join(" 至 ");
    };
    common_vendor.onShow(() => {
      var _a;
      userinfo.value = common_vendor.index.getStorageSync("userinfo");
      console.log(getCurrentPages());
      (_a = getCurrentPages()[0].$vm.$refs.udb) == null ? void 0 : _a.loadData({ clear: true });
    });
    common_vendor.onPullDownRefresh(async () => {
      await page.$vm.$refs.udb.loadData({ clear: true });
      common_vendor.index.stopPullDownRefresh();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "我的预定",
          type: "line"
        }),
        b: common_vendor.w(({
          data,
          loading,
          hasMore,
          error,
          options
        }, s0, i0) => {
          return common_vendor.e({
            a: error
          }, error ? {
            b: common_vendor.t(error.message)
          } : {}, {
            c: common_vendor.f(data, (item, index, i1) => {
              return {
                a: common_vendor.t(item.chartId[0].title),
                b: common_vendor.t(item.chartId[0].note),
                c: common_vendor.t(formatTimeRange(item.chartId[0].effectiveTimeRange)),
                d: common_vendor.t(item.x),
                e: common_vendor.t(item.y),
                f: item.chartId[0]._id,
                g: "93207a4f-4-" + i0 + "-" + i1 + "," + ("93207a4f-3-" + i0),
                h: common_vendor.p({
                  clickable: true,
                  link: true,
                  to: "/pages/detail/detail?chartId=" + item.chartId[0]._id,
                  title: item.chartId[0].title,
                  note: item.chartId[0].note
                })
              };
            }),
            d: "93207a4f-3-" + i0 + ",93207a4f-2",
            e: "93207a4f-5-" + i0 + ",93207a4f-2",
            f: common_vendor.p({
              status: loading ? "loading" : hasMore ? "default" : "no-more"
            }),
            g: i0,
            h: s0
          });
        }, {
          name: "d",
          path: "b",
          vueId: "93207a4f-2,93207a4f-0"
        }),
        c: common_vendor.sr("udb", "93207a4f-2,93207a4f-0"),
        d: common_vendor.p({
          options: _ctx.options,
          collection: dbList.value,
          where: `userId=='${userinfo.value._id}'`,
          orderby: "orderTime desc"
        }),
        e: common_vendor.p({
          padding: "0"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-93207a4f"], ["__file", "D:/code/seatchon-uniapp/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
