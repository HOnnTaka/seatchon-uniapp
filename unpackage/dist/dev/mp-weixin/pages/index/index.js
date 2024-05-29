"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_fab2 + _easycom_uni_search_bar2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_load_more2 + _easycom_unicloud_db2 + _easycom_uni_card2)();
}
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_fab + _easycom_uni_search_bar + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_load_more + _easycom_unicloud_db + _easycom_uni_card)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const page = getCurrentPages().find((item) => item.route === "pages/index/index");
    const searchValue = common_vendor.ref("");
    common_vendor.ref([]);
    common_vendor.ref({});
    const userinfo = common_vendor.ref({});
    const show = common_vendor.ref(false);
    const loading = common_vendor.ref(false);
    const where = common_vendor.ref("");
    common_vendor.onLoad(async () => {
    });
    common_vendor.onShow(async () => {
      common_vendor.index.startPullDownRefresh();
      setTimeout(() => {
        show.value = true;
      }, 100);
    });
    common_vendor.onHide(async () => {
      show.value = false;
    });
    const onRefresherrefresh = async () => {
      var _a;
      loading.value = true;
      userinfo.value = common_vendor.index.getStorageSync("userinfo");
      await ((_a = page.$vm.$refs.udb) == null ? void 0 : _a.loadData({ clear: true }));
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
        loading.value = false;
        common_vendor.index.vibrateShort();
      });
    };
    const onScrolltolower = async (e) => {
      console.log(e);
      await page.$vm.$refs.udb.loadMore();
      common_vendor.index.vibrateShort();
    };
    common_vendor.onPullDownRefresh(onRefresherrefresh);
    const formatTimeRange = (timeRange) => {
      return timeRange.join(" 至 ");
    };
    const isNotAvailable = (timeRange) => {
      const now = (/* @__PURE__ */ new Date()).getTime();
      const formatedTimeRange = [new Date(timeRange[0]).getTime(), new Date(timeRange[1]).getTime()];
      return now < formatedTimeRange[0] || now > formatedTimeRange[1];
    };
    const search = async () => {
      const words = searchValue.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      console.log(words);
      where.value = `${new RegExp(words, "i")}.test(title) || ${new RegExp(words, "i")}.test(note)`;
      setTimeout(async () => {
        var _a;
        await ((_a = page.$vm.$refs.udb) == null ? void 0 : _a.loadData({ clear: true }));
      });
    };
    const onCancel = async () => {
      where.value = "";
      setTimeout(async () => {
        var _a;
        await ((_a = page.$vm.$refs.udb) == null ? void 0 : _a.loadData({ clear: true }));
      });
    };
    const onItemClick = async (item) => {
      if (!userinfo.value) {
        const confirm = await common_vendor.index.showModal({
          title: "提示",
          content: "还未登录，是否前往登录？",
          showCancel: true,
          confirmText: "前往登录"
        });
        if (confirm.confirm) {
          common_vendor.index.switchTab({
            url: "/pages/user/user"
          });
        }
        return;
      }
      common_vendor.index.showLoading({
        title: "加载中"
      });
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?chartId=${item._id}`
      });
    };
    const fabClick = () => {
      common_vendor.index.navigateTo({
        url: "/pages/createSeatChart/createSeatChart"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userinfo.value.type == 1
      }, userinfo.value.type == 1 ? {
        b: common_vendor.sr("fab", "1cf27b2a-0"),
        c: common_vendor.o(fabClick),
        d: common_vendor.p({
          pattern: {
            buttonColor: "#2979ff"
          },
          horizontal: "right",
          vertical: "bottom"
        })
      } : {}, {
        e: common_vendor.o(search),
        f: common_vendor.o(onCancel),
        g: common_vendor.o(($event) => searchValue.value = $event),
        h: common_vendor.p({
          bgColor: "#fff",
          radius: "5",
          placeholder: "请输入搜索内容",
          modelValue: searchValue.value
        }),
        i: common_vendor.w(({
          data,
          loading: loading2,
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
                a: common_vendor.t(item.title),
                b: common_vendor.t(item.note),
                c: common_vendor.t(formatTimeRange(item.selectableTimeRange)),
                d: common_vendor.t(formatTimeRange(item.effectiveTimeRange)),
                e: isNotAvailable(item.selectableTimeRange) ? 1 : "",
                f: isNotAvailable(item.effectiveTimeRange) ? 1 : "",
                g: item._id,
                h: common_vendor.o(($event) => onItemClick(item), item._id),
                i: "1cf27b2a-5-" + i0 + "-" + i1 + "," + ("1cf27b2a-4-" + i0),
                j: common_vendor.p({
                  clickable: true,
                  showArrow: true,
                  title: item.title,
                  note: item.note
                })
              };
            }),
            d: "1cf27b2a-4-" + i0 + ",1cf27b2a-3",
            e: "1cf27b2a-6-" + i0 + ",1cf27b2a-3",
            f: common_vendor.p({
              status: loading2 ? "loading" : hasMore ? "more" : "no-more"
            }),
            g: i0,
            h: s0
          });
        }, {
          name: "d",
          path: "i",
          vueId: "1cf27b2a-3,1cf27b2a-2"
        }),
        j: common_vendor.p({
          showArrow: true
        }),
        k: common_vendor.sr("udb", "1cf27b2a-3,1cf27b2a-2"),
        l: common_vendor.p({
          collection: "seat-chart",
          ["page-size"]: 10,
          orderby: "title desc",
          where: where.value
        }),
        m: loading.value,
        n: common_vendor.o(onScrolltolower),
        o: common_vendor.o(onRefresherrefresh),
        p: common_vendor.p({
          padding: "0"
        }),
        q: common_vendor.s(show.value ? "transition: all .5s ease; opacity: 1" : "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/code/seatchon-uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
