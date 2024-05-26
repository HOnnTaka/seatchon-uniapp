"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_group2 = common_vendor.resolveComponent("uni-group");
  (_easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_card2 + _easycom_uni_dateformat2 + _easycom_uni_group2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_group = () => "../../uni_modules/uni-group/components/uni-group/uni-group.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_card + _easycom_uni_dateformat + _easycom_uni_group)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const selectedItem = common_vendor.ref(null);
    const chartId = common_vendor.ref(null);
    const chartDetail = common_vendor.ref();
    const loading = common_vendor.ref(false);
    const userinfo = common_vendor.ref(common_vendor.index.getStorageSync("userinfo"));
    const showDrawer = common_vendor.ref(false);
    const isSelectSubmit = common_vendor.ref(true);
    const show = common_vendor.ref(false);
    common_vendor.onLoad(async (option) => {
      chartId.value = option.chartId;
      await getChartDetail(option.chartId);
      show.value = true;
      common_vendor.index.hideLoading();
    });
    common_vendor.onShow(async () => {
      userinfo.value = common_vendor.index.getStorageSync("userinfo");
    });
    common_vendor.onReady(() => {
    });
    common_vendor.onPullDownRefresh(async () => {
      await getChartDetail(chartId.value);
      common_vendor.index.stopPullDownRefresh();
      common_vendor.index.showToast({
        title: "刷新成功",
        icon: "success"
      });
    });
    const getChartDetail = async (id) => {
      loading.value = true;
      const db = common_vendor.Ws.database();
      const { result } = await db.collection("seat-chart").doc(id).get();
      chartDetail.value = result.data[0];
      common_vendor.index.setNavigationBarTitle({
        title: chartDetail.value.title
      });
      loading.value = false;
    };
    const avaliable = () => {
      var _a;
      if (!chartDetail.value)
        return false;
      const selectableTimeRange = (_a = chartDetail.value) == null ? void 0 : _a.selectableTimeRange;
      const now = (/* @__PURE__ */ new Date()).getTime();
      const start = new Date(selectableTimeRange[0]).getTime();
      const end = new Date(selectableTimeRange[1]).getTime();
      return start <= now && now <= end;
    };
    const onrefreshBtnClick = async (showToast = true) => {
      var _a;
      await getChartDetail(chartId.value);
      if (showToast) {
        common_vendor.index.showToast({
          title: "刷新成功",
          icon: "success"
        });
      }
      selectedItem.value = chartDetail.value.seats[((_a = selectedItem.value) == null ? void 0 : _a.index) - 1];
    };
    const onSelectBtnClick = async () => {
      var _a;
      userinfo.value;
      isSelectSubmit.value = ((_a = selectedItem.value.stuInfo) == null ? void 0 : _a.id) != userinfo.value._id;
      showDrawer.value = true;
    };
    const onSubmitBtnClick = async () => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      const { result } = await common_vendor.Ws.callFunction({
        name: "select-seat",
        data: {
          chartId: chartId.value,
          seatIndex: selectedItem.value.index,
          userinfo: userinfo.value,
          isSelectSubmit: isSelectSubmit.value,
          orderId: selectedItem.value.orderId
        }
      });
      showDrawer.value = false;
      if (result.code == 200) {
        common_vendor.index.showToast({
          title: "选座成功",
          icon: "success"
        });
      } else if (result.code == 201) {
        common_vendor.index.showToast({
          title: "撤销成功",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: result.message,
          icon: "error"
        });
      }
      onrefreshBtnClick(false);
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E;
      return common_vendor.e({
        a: common_vendor.p({
          title: "课室信息",
          type: "line"
        }),
        b: common_vendor.t((_a = chartDetail.value) == null ? void 0 : _a.note),
        c: common_vendor.p({
          title: "备注："
        }),
        d: common_vendor.t((_b = chartDetail.value) == null ? void 0 : _b.selectableTimeRange.join(" 至 ")),
        e: common_vendor.p({
          title: "选座时间："
        }),
        f: common_vendor.t((_c = chartDetail.value) == null ? void 0 : _c.effectiveTimeRange.join(" 至 ")),
        g: common_vendor.p({
          title: "生效时间："
        }),
        h: common_vendor.p({
          padding: "0"
        }),
        i: common_vendor.p({
          title: "座位表",
          type: "line"
        }),
        j: common_vendor.f((_d = chartDetail.value) == null ? void 0 : _d.seats, (item, index, i0) => {
          var _a2, _b2, _c2;
          return {
            a: common_vendor.t(item.stuInfo ? ((_a2 = item == null ? void 0 : item.stuInfo) == null ? void 0 : _a2.id) != userinfo.value._id ? "" : "你" : "空"),
            b: index,
            c: item.status == 2 ? 1 : "",
            d: item.index == ((_b2 = selectedItem.value) == null ? void 0 : _b2.index) ? 1 : "",
            e: common_vendor.s(item.stuInfo ? `background-image:url(${(_c2 = item.stuInfo) == null ? void 0 : _c2.avatar});` : ""),
            f: common_vendor.o(() => selectedItem.value = item, index)
          };
        }),
        k: common_vendor.s(`--col:${(_e = chartDetail.value) == null ? void 0 : _e.col};--row:${(_f = chartDetail.value) == null ? void 0 : _f.row};`),
        l: common_vendor.o(onrefreshBtnClick),
        m: loading.value,
        n: common_vendor.p({
          padding: "0"
        }),
        o: selectedItem.value
      }, selectedItem.value ? common_vendor.e({
        p: common_vendor.p({
          title: "座位信息",
          type: "line"
        }),
        q: common_vendor.t((_g = selectedItem.value) == null ? void 0 : _g.x),
        r: common_vendor.t((_h = selectedItem.value) == null ? void 0 : _h.y),
        s: common_vendor.p({
          title: "座位："
        }),
        t: ((_i = selectedItem.value) == null ? void 0 : _i.stuInfo) && (chartDetail.value.stuInfoVisible || userinfo.value.type == 1)
      }, ((_j = selectedItem.value) == null ? void 0 : _j.stuInfo) && (chartDetail.value.stuInfoVisible || userinfo.value.type == 1) ? {
        v: common_vendor.t((_l = (_k = selectedItem.value) == null ? void 0 : _k.stuInfo) == null ? void 0 : _l.name),
        w: common_vendor.p({
          title: "姓名："
        }),
        x: common_vendor.t((_n = (_m = selectedItem.value) == null ? void 0 : _m.stuInfo) == null ? void 0 : _n.id),
        y: common_vendor.p({
          title: "学号："
        }),
        z: common_vendor.t((_p = (_o = selectedItem.value) == null ? void 0 : _o.stuInfo) == null ? void 0 : _p.class),
        A: common_vendor.p({
          title: "班级："
        })
      } : {}, {
        B: (_q = selectedItem.value) == null ? void 0 : _q.selectTime
      }, ((_r = selectedItem.value) == null ? void 0 : _r.selectTime) ? {
        C: common_vendor.p({
          date: new Date((_s = selectedItem.value) == null ? void 0 : _s.selectTime) - 3e4,
          format: "M月d日 h时m分",
          threshold: [0, 36e5]
        }),
        D: common_vendor.p({
          title: "选择时间："
        })
      } : {}, {
        E: common_vendor.p({
          padding: "0"
        })
      }) : {}, {
        F: avaliable()
      }, avaliable() ? {
        G: common_vendor.t(((_u = (_t = selectedItem.value) == null ? void 0 : _t.stuInfo) == null ? void 0 : _u.id) == userinfo.value._id ? "撤销选座" : ((_v = selectedItem.value) == null ? void 0 : _v.status) == 3 ? "已被选择" : "选择座位"),
        H: common_vendor.o(onSelectBtnClick),
        I: ((_w = selectedItem.value) == null ? void 0 : _w.status) == 3 && ((_y = (_x = selectedItem.value) == null ? void 0 : _x.stuInfo) == null ? void 0 : _y.id) != userinfo.value._id || !selectedItem.value,
        J: ((_A = (_z = selectedItem.value) == null ? void 0 : _z.stuInfo) == null ? void 0 : _A.id) == userinfo.value._id ? "warn" : "primary",
        K: loading.value
      } : {}, {
        L: common_vendor.t(isSelectSubmit.value ? "将使用以下信息选座：" : "将撤销以下选座："),
        M: common_vendor.t((_B = chartDetail.value) == null ? void 0 : _B.title),
        N: common_vendor.t((_C = selectedItem.value) == null ? void 0 : _C.x),
        O: common_vendor.t((_D = selectedItem.value) == null ? void 0 : _D.y),
        P: common_vendor.t((_E = chartDetail.value) == null ? void 0 : _E.effectiveTimeRange.join(" 至 ")),
        Q: common_vendor.p({
          mode: "card"
        }),
        R: common_vendor.t(userinfo.value.name),
        S: common_vendor.t(userinfo.value._id),
        T: common_vendor.t(userinfo.value.class),
        U: common_vendor.p({
          mode: "card"
        }),
        V: common_vendor.o(onSubmitBtnClick),
        W: isSelectSubmit.value ? "primary" : "warn",
        X: loading.value,
        Y: common_vendor.o(() => {
        }),
        Z: common_vendor.o(() => showDrawer.value = false),
        aa: !showDrawer.value ? 1 : ""
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"], ["__file", "D:/mcct/seatchon-uniapp/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
