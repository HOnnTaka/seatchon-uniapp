"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_search_bar2 + _easycom_uni_fab2 + _easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_load_more2 + _easycom_unicloud_db2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_fab + _easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_load_more + _easycom_unicloud_db)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    common_vendor.ref([]);
    const userinfo = common_vendor.ref({});
    common_vendor.onLoad(async () => {
    });
    common_vendor.onShow(async () => {
      var _a;
      userinfo.value = common_vendor.index.getStorageSync("userinfo");
      (_a = getCurrentPages()[0].$vm.$refs.udb) == null ? void 0 : _a.loadData({ clear: true });
    });
    common_vendor.onPullDownRefresh(async () => {
      var _a;
      await ((_a = getCurrentPages()[0].$vm.$refs.udb) == null ? void 0 : _a.loadData({ clear: true }));
      common_vendor.index.stopPullDownRefresh();
      common_vendor.index.showToast({
        title: "刷新成功",
        icon: "success"
      });
    });
    const formatTimeRange = (timeRange) => {
      return timeRange.join(" 至 ");
    };
    const available = (item) => {
      const now = (/* @__PURE__ */ new Date()).getTime();
      const { selectableTimeRange, effectiveTimeRange } = item;
      const selectTimeRange = [
        new Date(selectableTimeRange[0]).getTime(),
        new Date(selectableTimeRange[1]).getTime()
      ];
      const effectTimeRange = [
        new Date(effectiveTimeRange[0]).getTime(),
        new Date(effectiveTimeRange[1]).getTime()
      ];
      if (now > effectTimeRange[0] && now < effectTimeRange[1])
        return "生效中";
      if (now > selectTimeRange[0] && now < selectTimeRange[1])
        return "选座中";
      if (now < selectTimeRange[0])
        return "未开始";
      if (now > effectTimeRange[1])
        return "已结束";
    };
    const search = async () => {
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
        a: common_vendor.o(search),
        b: common_vendor.o(($event) => searchValue.value = $event),
        c: common_vendor.p({
          bgColor: "#fff",
          placeholder: "请输入搜索内容",
          modelValue: searchValue.value
        }),
        d: userinfo.value.type == 1
      }, userinfo.value.type == 1 ? {
        e: common_vendor.sr("fab", "1cf27b2a-1"),
        f: common_vendor.o(fabClick),
        g: common_vendor.p({
          pattern: {
            buttonColor: "#2979ff"
          },
          horizontal: "right",
          vertical: "bottom"
        })
      } : {}, {
        h: common_vendor.p({
          title: "全部课室",
          type: "line"
        }),
        i: common_vendor.w(({
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
                a: common_vendor.t(item.title),
                b: common_vendor.t(item.note),
                c: common_vendor.t(formatTimeRange(item.selectableTimeRange)),
                d: common_vendor.t(formatTimeRange(item.effectiveTimeRange)),
                e: common_vendor.t(available(item)),
                f: item._id,
                g: common_vendor.o(($event) => onItemClick(item), item._id),
                h: "1cf27b2a-5-" + i0 + "-" + i1 + "," + ("1cf27b2a-4-" + i0),
                i: common_vendor.p({
                  clickable: true,
                  link: true,
                  title: item.title,
                  note: item.note
                })
              };
            }),
            d: "1cf27b2a-4-" + i0 + ",1cf27b2a-3",
            e: "1cf27b2a-6-" + i0 + ",1cf27b2a-3",
            f: common_vendor.p({
              status: loading ? "loading" : hasMore ? "default" : "no-more"
            }),
            g: i0,
            h: s0
          });
        }, {
          name: "d",
          path: "i",
          vueId: "1cf27b2a-3"
        }),
        j: common_vendor.sr("udb", "1cf27b2a-3"),
        k: common_vendor.p({
          options: _ctx.options,
          collection: "seat-chart",
          orderby: "createdTime desc"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/mcct/seatchon-uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
