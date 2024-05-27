"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_card2 + _easycom_uni_dateformat2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_list_item + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_card + _easycom_uni_dateformat + _easycom_uni_popup_dialog + _easycom_uni_popup)();
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
      await getAdminName();
      loading.value = false;
    };
    const adminName = common_vendor.ref("");
    const getAdminName = async () => {
      var _a;
      if (!((_a = chartDetail.value) == null ? void 0 : _a.administrators))
        return "";
      const db = common_vendor.Ws.database();
      const { result } = await db.collection("user").where({
        _id: db.command.in(chartDetail.value.administrators)
      }).field("nickName").get();
      adminName.value = result.data.map((item) => item.nickName).join("、");
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
    const popupData = common_vendor.ref({
      value: "",
      title: "",
      placeholder: ""
    });
    const ifRenderDialog = common_vendor.ref(false);
    const onAdminClick = async () => {
      popupData.value = {
        type: "addAdmin",
        title: "添加管理员(仅当前课室)",
        placeholder: "请输入管理员学号/id",
        value: ""
      };
      ifRenderDialog.value = true;
      setTimeout(() => {
        getCurrentPages()[1].$vm.$refs.inputDialog.open();
      });
    };
    const dialogInputConfirm = async (input) => {
      const text = input.trim();
      if (text.length === 0) {
        common_vendor.index.showToast({
          title: "内容不能为空",
          icon: "none"
        });
        return;
      }
      const { type } = popupData.value;
      if (type == "addAdmin")
        addAdmin(text);
    };
    const addAdmin = async (id) => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      const { administrators } = chartDetail.value;
      if (administrators.includes(id)) {
        common_vendor.index.showToast({
          title: "该用户已是管理员",
          icon: "none"
        });
        return;
      }
      const db = common_vendor.Ws.database();
      const { result } = await db.collection("user").doc(id).field("_id").get();
      if (result.data.length == 0) {
        common_vendor.index.showToast({
          title: "用户不存在",
          icon: "none"
        });
        return;
      }
      administrators.push(id);
      chartDetail.value.administrators = administrators;
      await db.collection("seat-chart").doc(chartId.value).update({
        administrators
      });
      await getAdminName();
      common_vendor.index.showToast({
        title: "添加成功",
        icon: "success"
      });
      ifRenderDialog.value = false;
    };
    const onChartEditBtnClick = () => {
      common_vendor.index.navigateTo({
        url: "/pages/createSeatChart/createSeatChart?type=edit&chartId=" + chartId.value
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K;
      return common_vendor.e({
        a: (_a = chartDetail.value) == null ? void 0 : _a.administrators.includes(userinfo.value._id)
      }, ((_b = chartDetail.value) == null ? void 0 : _b.administrators.includes(userinfo.value._id)) ? {} : {}, {
        b: common_vendor.p({
          title: "课室信息",
          type: "line"
        }),
        c: common_vendor.t((_c = chartDetail.value) == null ? void 0 : _c.title),
        d: common_vendor.p({
          title: "课室"
        }),
        e: common_vendor.t((_d = chartDetail.value) == null ? void 0 : _d.note),
        f: common_vendor.p({
          title: "备注"
        }),
        g: common_vendor.t(adminName.value),
        h: common_vendor.o(onAdminClick),
        i: common_vendor.p({
          title: "管理员",
          link: (_e = chartDetail.value) == null ? void 0 : _e.administrators.includes(userinfo.value._id)
        }),
        j: common_vendor.t((_f = chartDetail.value) == null ? void 0 : _f.selectableTimeRange.join(" 至 ")),
        k: common_vendor.p({
          title: "选座时间"
        }),
        l: common_vendor.t((_g = chartDetail.value) == null ? void 0 : _g.effectiveTimeRange.join(" 至 ")),
        m: common_vendor.p({
          title: "生效时间"
        }),
        n: common_vendor.o(onChartEditBtnClick),
        o: loading.value,
        p: common_vendor.o((...args) => _ctx.onChartDeleteBtnClick && _ctx.onChartDeleteBtnClick(...args)),
        q: loading.value,
        r: common_vendor.p({
          open: true,
          titleBorder: "none"
        }),
        s: common_vendor.p({
          padding: "0"
        }),
        t: common_vendor.p({
          title: "座位表",
          type: "line"
        }),
        v: common_vendor.f((_h = chartDetail.value) == null ? void 0 : _h.seats, (item, index, i0) => {
          var _a2, _b2, _c2, _d2;
          return {
            a: common_vendor.t(item.stuInfo ? ((_a2 = item == null ? void 0 : item.stuInfo) == null ? void 0 : _a2.id) != userinfo.value._id ? "" : "你" : "空"),
            b: index,
            c: item.status == 2 ? 1 : "",
            d: item.index == ((_b2 = selectedItem.value) == null ? void 0 : _b2.index) ? 1 : "",
            e: common_vendor.s(((_c2 = item == null ? void 0 : item.stuInfo) == null ? void 0 : _c2.id) != userinfo.value._id ? `background-image:url(${(_d2 = item.stuInfo) == null ? void 0 : _d2.avatar});` : "background:#333;"),
            f: common_vendor.o(() => selectedItem.value = item, index)
          };
        }),
        w: common_vendor.s(`--col:${(_i = chartDetail.value) == null ? void 0 : _i.col};--row:${(_j = chartDetail.value) == null ? void 0 : _j.row};`),
        x: common_vendor.o(onrefreshBtnClick),
        y: loading.value,
        z: common_vendor.p({
          padding: "0"
        }),
        A: selectedItem.value
      }, selectedItem.value ? common_vendor.e({
        B: common_vendor.p({
          title: "座位信息",
          type: "line"
        }),
        C: common_vendor.t((_k = selectedItem.value) == null ? void 0 : _k.x),
        D: common_vendor.t((_l = selectedItem.value) == null ? void 0 : _l.y),
        E: common_vendor.p({
          title: "座位"
        }),
        F: ((_m = selectedItem.value) == null ? void 0 : _m.stuInfo) && (chartDetail.value.stuInfoVisible || userinfo.value.type == 1)
      }, ((_n = selectedItem.value) == null ? void 0 : _n.stuInfo) && (chartDetail.value.stuInfoVisible || userinfo.value.type == 1) ? {
        G: common_vendor.t((_p = (_o = selectedItem.value) == null ? void 0 : _o.stuInfo) == null ? void 0 : _p.name),
        H: common_vendor.p({
          title: "姓名"
        }),
        I: common_vendor.t((_r = (_q = selectedItem.value) == null ? void 0 : _q.stuInfo) == null ? void 0 : _r.id),
        J: common_vendor.p({
          title: "学号"
        }),
        K: common_vendor.t((_t = (_s = selectedItem.value) == null ? void 0 : _s.stuInfo) == null ? void 0 : _t.class),
        L: common_vendor.p({
          title: "班级"
        })
      } : {}, {
        M: (_u = selectedItem.value) == null ? void 0 : _u.selectTime
      }, ((_v = selectedItem.value) == null ? void 0 : _v.selectTime) ? {
        N: common_vendor.p({
          date: new Date((_w = selectedItem.value) == null ? void 0 : _w.selectTime) - 3e4,
          format: "M月d日 h时m分",
          threshold: [0, 36e5]
        }),
        O: common_vendor.p({
          title: "选择时间"
        })
      } : {}, {
        P: common_vendor.p({
          padding: "0"
        })
      }) : {}, {
        Q: (_x = chartDetail.value) == null ? void 0 : _x.administrators.includes(userinfo.value._id)
      }, ((_y = chartDetail.value) == null ? void 0 : _y.administrators.includes(userinfo.value._id)) ? {
        R: !selectedItem.value,
        S: common_vendor.o((...args) => _ctx.onSeatEditBtnClick && _ctx.onSeatEditBtnClick(...args)),
        T: loading.value,
        U: !selectedItem.value,
        V: common_vendor.o((...args) => _ctx.onSeatDeleteBtnClick && _ctx.onSeatDeleteBtnClick(...args)),
        W: loading.value
      } : common_vendor.e({
        X: avaliable()
      }, avaliable() ? {
        Y: common_vendor.t(((_A = (_z = selectedItem.value) == null ? void 0 : _z.stuInfo) == null ? void 0 : _A.id) == userinfo.value._id ? "撤销选座" : ((_B = selectedItem.value) == null ? void 0 : _B.status) == 3 ? "已被选择" : "选择座位"),
        Z: common_vendor.o(onSelectBtnClick),
        aa: ((_C = selectedItem.value) == null ? void 0 : _C.status) == 3 && ((_E = (_D = selectedItem.value) == null ? void 0 : _D.stuInfo) == null ? void 0 : _E.id) != userinfo.value._id || !selectedItem.value,
        ab: ((_G = (_F = selectedItem.value) == null ? void 0 : _F.stuInfo) == null ? void 0 : _G.id) == userinfo.value._id ? "warn" : "primary",
        ac: loading.value
      } : {}, {
        ad: !avaliable()
      }, !avaliable() ? {} : {}), {
        ae: common_vendor.t(isSelectSubmit.value ? "将使用以下信息选座：" : "将撤销以下选座："),
        af: common_vendor.p({
          title: "课室信息",
          type: "line"
        }),
        ag: common_vendor.t((_H = chartDetail.value) == null ? void 0 : _H.title),
        ah: common_vendor.p({
          title: "课室"
        }),
        ai: common_vendor.t((_I = selectedItem.value) == null ? void 0 : _I.x),
        aj: common_vendor.t((_J = selectedItem.value) == null ? void 0 : _J.y),
        ak: common_vendor.p({
          title: "座位"
        }),
        al: common_vendor.t((_K = chartDetail.value) == null ? void 0 : _K.effectiveTimeRange.join(" 至 ")),
        am: common_vendor.p({
          title: "生效时间"
        }),
        an: common_vendor.p({
          title: "学生信息",
          type: "line"
        }),
        ao: common_vendor.t(userinfo.value._id),
        ap: common_vendor.p({
          title: "学号",
          link: userinfo.value.type == 1
        }),
        aq: common_vendor.t(userinfo.value.name),
        ar: common_vendor.p({
          title: "姓名",
          link: userinfo.value.type == 1
        }),
        as: common_vendor.t(userinfo.value.class),
        at: common_vendor.p({
          title: "班级",
          link: userinfo.value.type == 1
        }),
        av: common_vendor.p({
          padding: "0"
        }),
        aw: common_vendor.o(onSubmitBtnClick),
        ax: isSelectSubmit.value ? "primary" : "warn",
        ay: loading.value,
        az: common_vendor.o(() => {
        }),
        aA: common_vendor.o(() => showDrawer.value = false),
        aB: !showDrawer.value ? 1 : "",
        aC: ifRenderDialog.value
      }, ifRenderDialog.value ? {
        aD: common_vendor.sr("inputClose", "eca06f3c-30,eca06f3c-29"),
        aE: common_vendor.o(dialogInputConfirm),
        aF: common_vendor.o(($event) => ifRenderDialog.value = false),
        aG: common_vendor.o(($event) => popupData.value.value = $event),
        aH: common_vendor.p({
          mode: "input",
          title: popupData.value.title,
          placeholder: popupData.value.placeholder,
          modelValue: popupData.value.value
        }),
        aI: common_vendor.sr("inputDialog", "eca06f3c-29"),
        aJ: common_vendor.p({
          type: "dialog"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"], ["__file", "D:/code/seatchon-uniapp/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
