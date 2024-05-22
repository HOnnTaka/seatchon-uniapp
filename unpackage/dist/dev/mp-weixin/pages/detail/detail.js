"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_group2 = common_vendor.resolveComponent("uni-group");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_uni_group2 + _easycom_uni_dateformat2)();
}
const _easycom_uni_group = () => "../../uni_modules/uni-group/components/uni-group/uni-group.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_group + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const selectedItem = common_vendor.ref(null);
    const chartId = common_vendor.ref(null);
    const chartDetail = common_vendor.ref();
    const loading = common_vendor.ref(false);
    const userinfo = common_vendor.ref(getApp().globalData.userinfo);
    const showDrawer = common_vendor.ref(false);
    const isSelectSubmit = common_vendor.ref(true);
    common_vendor.onLoad(async (option) => {
      chartId.value = option.chartId;
      await getChartDetail(option.chartId);
    });
    const getChartDetail = async (id) => {
      loading.value = true;
      const db = common_vendor.Ws.database();
      const { result } = await db.collection("seat-chart").doc(id).get();
      console.log(result);
      chartDetail.value = result.data[0];
      common_vendor.index.setNavigationBarTitle({
        title: chartDetail.value.title
      });
      loading.value = false;
    };
    const onrefreshBtnClick = async (showToast = true) => {
      if (showToast) {
        common_vendor.index.showToast({
          title: "加载中",
          icon: "loading",
          mask: true
        });
      }
      await getChartDetail(chartId.value);
      selectedItem.value = chartDetail.value.seats[selectedItem.value.index - 1];
      if (showToast) {
        common_vendor.index.showToast({
          title: "刷新成功",
          icon: "success"
        });
      }
    };
    const onSelectBtnClick = () => {
      var _a;
      isSelectSubmit.value = ((_a = selectedItem.value.stuInfo) == null ? void 0 : _a.openid) != userinfo.value._openid;
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
          isSelectSubmit: isSelectSubmit.value
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
        a: common_vendor.t((_a = chartDetail.value) == null ? void 0 : _a.note),
        b: common_vendor.t((_b = chartDetail.value) == null ? void 0 : _b.selectableTime),
        c: common_vendor.t((_c = chartDetail.value) == null ? void 0 : _c.effectiveTime),
        d: common_vendor.p({
          title: "课室信息",
          mode: "card"
        }),
        e: common_vendor.f((_d = chartDetail.value) == null ? void 0 : _d.seats, (item, index, i0) => {
          var _a2, _b2, _c2;
          return {
            a: common_vendor.t(item.stuInfo ? ((_a2 = item == null ? void 0 : item.stuInfo) == null ? void 0 : _a2.openid) != userinfo.value._openid ? "" : "你" : "空"),
            b: index,
            c: item.status == 2 ? 1 : "",
            d: item.index == ((_b2 = selectedItem.value) == null ? void 0 : _b2.index) ? 1 : "",
            e: common_vendor.s(item.stuInfo ? `background-image:url(${(_c2 = item.stuInfo) == null ? void 0 : _c2.avatar});` : ""),
            f: common_vendor.o(() => selectedItem.value = item, index)
          };
        }),
        f: common_vendor.s("--size:" + Math.max((_e = chartDetail.value) == null ? void 0 : _e.col, (_f = chartDetail.value) == null ? void 0 : _f.row) + ";"),
        g: common_vendor.o(onrefreshBtnClick),
        h: loading.value,
        i: common_vendor.p({
          title: "座位表",
          mode: "card"
        }),
        j: selectedItem.value
      }, selectedItem.value ? common_vendor.e({
        k: common_vendor.t((_g = selectedItem.value) == null ? void 0 : _g.x),
        l: common_vendor.t((_h = selectedItem.value) == null ? void 0 : _h.y),
        m: ((_i = selectedItem.value) == null ? void 0 : _i.stuInfo) && (chartDetail.value.stuInfoVisible || userinfo.value.type == 1)
      }, ((_j = selectedItem.value) == null ? void 0 : _j.stuInfo) && (chartDetail.value.stuInfoVisible || userinfo.value.type == 1) ? {
        n: common_vendor.t((_l = (_k = selectedItem.value) == null ? void 0 : _k.stuInfo) == null ? void 0 : _l.name),
        o: common_vendor.t((_n = (_m = selectedItem.value) == null ? void 0 : _m.stuInfo) == null ? void 0 : _n.id),
        p: common_vendor.t((_p = (_o = selectedItem.value) == null ? void 0 : _o.stuInfo) == null ? void 0 : _p.class)
      } : {}, {
        q: (_q = selectedItem.value) == null ? void 0 : _q.selectTime
      }, ((_r = selectedItem.value) == null ? void 0 : _r.selectTime) ? {
        r: common_vendor.p({
          date: new Date((_s = selectedItem.value) == null ? void 0 : _s.selectTime) - 3e4,
          format: "M月d日 h时m分",
          threshold: [0, 36e5]
        })
      } : {}, {
        s: common_vendor.p({
          title: "座位信息",
          mode: "card"
        })
      }) : {}, {
        t: common_vendor.t(((_u = (_t = selectedItem.value) == null ? void 0 : _t.stuInfo) == null ? void 0 : _u.openid) == userinfo.value._openid ? "撤销选座" : ((_v = selectedItem.value) == null ? void 0 : _v.status) == 3 ? "已被选择" : "选择座位"),
        v: common_vendor.o(onSelectBtnClick),
        w: ((_w = selectedItem.value) == null ? void 0 : _w.status) == 3 && ((_y = (_x = selectedItem.value) == null ? void 0 : _x.stuInfo) == null ? void 0 : _y.openid) != userinfo.value._openid || !selectedItem.value,
        x: ((_A = (_z = selectedItem.value) == null ? void 0 : _z.stuInfo) == null ? void 0 : _A.openid) == userinfo.value._openid ? "warn" : "primary",
        y: loading.value,
        z: common_vendor.t(isSelectSubmit.value ? "将使用以下信息选座：" : "将撤销以下选座："),
        A: common_vendor.t((_B = chartDetail.value) == null ? void 0 : _B.title),
        B: common_vendor.t((_C = selectedItem.value) == null ? void 0 : _C.x),
        C: common_vendor.t((_D = selectedItem.value) == null ? void 0 : _D.y),
        D: common_vendor.t((_E = chartDetail.value) == null ? void 0 : _E.effectiveTime),
        E: common_vendor.p({
          mode: "card"
        }),
        F: common_vendor.t(userinfo.value.stuInfo.name),
        G: common_vendor.t(userinfo.value.stuInfo.id),
        H: common_vendor.t(userinfo.value.stuInfo.class),
        I: common_vendor.p({
          mode: "card"
        }),
        J: common_vendor.o(onSubmitBtnClick),
        K: isSelectSubmit.value ? "primary" : "warn",
        L: loading.value,
        M: common_vendor.o(() => {
        }),
        N: common_vendor.o(() => showDrawer.value = false),
        O: !showDrawer.value ? 1 : ""
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"], ["__file", "D:/code/seatchon-uniapp/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
