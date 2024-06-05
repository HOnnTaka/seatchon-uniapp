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
    const show = common_vendor.ref(false);
    const loading = common_vendor.ref({
      orderDB: false,
      adminDB: false
    });
    const page = getCurrentPages().find((page2) => page2.route === "pages/order/order");
    const db = common_vendor.Ws.database();
    const orderDBList = common_vendor.ref([
      db.collection("order").where('userId ==  "216124125"').field("chartId,x,y,userId").getTemp(),
      db.collection("seat-chart").field("_id,effectiveTimeRange,selectableTimeRange,title,note").getTemp()
    ]);
    const formatTimeRange = (timeRange) => {
      return timeRange.join(" 至 ");
    };
    common_vendor.onShow(async () => {
      userinfo.value = common_vendor.index.getStorageSync("userinfo");
      setTimeout(() => {
        common_vendor.index.startPullDownRefresh();
        show.value = true;
      }, 100);
    });
    common_vendor.onHide(async () => {
      show.value = false;
    });
    const onScrolltolower = async (ref) => {
      await page.$vm.$refs[ref].loadMore();
      common_vendor.index.vibrateShort();
    };
    const onRefresherrefresh = async (ref) => {
      loading.value[ref] = true;
      await page.$vm.$refs[ref].loadData({ clear: true });
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
        loading.value[ref] = false;
        common_vendor.index.vibrateShort();
      });
    };
    common_vendor.onPullDownRefresh(() => {
      onRefresherrefresh("orderDB");
      onRefresherrefresh("adminDB");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "我的选座",
          type: "line"
        }),
        b: common_vendor.w(({
          data,
          loading: loading2,
          hasMore,
          error,
          options
        }, s0, i0) => {
          return common_vendor.e({
            a: error
          }, error ? {
            b: common_vendor.t(console.log(error.message))
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
                  showArrow: true,
                  to: "/pages/detail/detail?chartId=" + item.chartId[0]._id,
                  title: item.chartId[0].title,
                  note: item.chartId[0].note
                })
              };
            }),
            d: "93207a4f-3-" + i0 + ",93207a4f-2",
            e: "93207a4f-5-" + i0 + ",93207a4f-2",
            f: common_vendor.p({
              status: loading2 ? "loading" : hasMore ? "default" : "no-more"
            }),
            g: i0,
            h: s0
          });
        }, {
          name: "d",
          path: "b",
          vueId: "93207a4f-2,93207a4f-0"
        }),
        c: common_vendor.sr("orderDB", "93207a4f-2,93207a4f-0"),
        d: common_vendor.p({
          ["page-size"]: 10,
          collection: orderDBList.value,
          where: `userId=='${userinfo.value._id}'`,
          orderby: "orderTime desc"
        }),
        e: loading.value.orderDB,
        f: common_vendor.o(($event) => onScrolltolower("orderDB")),
        g: common_vendor.o(($event) => onRefresherrefresh("orderDB")),
        h: common_vendor.p({
          padding: "0"
        }),
        i: common_vendor.p({
          title: "我的管理",
          type: "line"
        }),
        j: common_vendor.w(({
          data,
          loading: loading2,
          hasMore,
          error,
          options
        }, s0, i0) => {
          return common_vendor.e({
            a: error
          }, error ? {
            b: common_vendor.t(console.log(error.message))
          } : {}, {
            c: common_vendor.f(data, (item, index, i1) => {
              return {
                a: common_vendor.t(item.title),
                b: common_vendor.t(item.note),
                c: common_vendor.t(item.administrators.length),
                d: item._id,
                e: "93207a4f-10-" + i0 + "-" + i1 + "," + ("93207a4f-9-" + i0),
                f: common_vendor.p({
                  clickable: true,
                  showArrow: true,
                  to: "/pages/detail/detail?chartId=" + item._id,
                  title: item.title,
                  note: item.note
                })
              };
            }),
            d: "93207a4f-9-" + i0 + ",93207a4f-8",
            e: "93207a4f-11-" + i0 + ",93207a4f-8",
            f: common_vendor.p({
              status: loading2 ? "loading" : hasMore ? "default" : "no-more"
            }),
            g: i0,
            h: s0
          });
        }, {
          name: "d",
          path: "j",
          vueId: "93207a4f-8,93207a4f-6"
        }),
        k: common_vendor.sr("adminDB", "93207a4f-8,93207a4f-6"),
        l: common_vendor.p({
          collection: "seat-chart",
          ["page-size"]: 10,
          field: `title,note,administrators`,
          where: `in('${userinfo.value._id}', administrators)`,
          orderby: "createTime desc"
        }),
        m: loading.value.adminDB,
        n: common_vendor.o(($event) => onScrolltolower("adminDB")),
        o: common_vendor.o(($event) => onRefresherrefresh("adminDB")),
        p: common_vendor.p({
          padding: "0"
        }),
        q: common_vendor.s(show.value ? "transition: all .5s ease; opacity: 1" : "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-93207a4f"], ["__file", "D:/mcct/seatchon-uniapp/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
