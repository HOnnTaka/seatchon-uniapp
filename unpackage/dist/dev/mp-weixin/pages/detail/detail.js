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
    const page = getCurrentPages().find((item) => item.route === "pages/detail/detail");
    const selectedItem = common_vendor.ref(null);
    const chartId = common_vendor.ref(null);
    const chartDetail = common_vendor.ref();
    const loading = common_vendor.ref(false);
    const userinfo = common_vendor.ref(common_vendor.index.getStorageSync("userinfo"));
    const showDrawer = common_vendor.ref(false);
    const isSelectSubmit = common_vendor.ref(true);
    const show = common_vendor.ref(false);
    const tip = common_vendor.ref("将使用以下信息选座：");
    common_vendor.onLoad(async (option) => {
      chartId.value = option.chartId;
      await getChartDetail(option.chartId);
      show.value = true;
      common_vendor.index.hideLoading();
    });
    common_vendor.onShow(async () => {
      userinfo.value = common_vendor.index.getStorageSync("userinfo");
      await getChartDetail(chartId.value);
    });
    common_vendor.onReady(() => {
    });
    common_vendor.onPullDownRefresh(async () => {
      await getChartDetail(chartId.value);
      common_vendor.index.vibrateShort();
      common_vendor.index.stopPullDownRefresh();
    });
    const isAdmin = common_vendor.computed(() => {
      var _a;
      return (_a = chartDetail.value) == null ? void 0 : _a.administrators.includes(userinfo.value._id);
    });
    const isCreater = common_vendor.computed(() => {
      var _a;
      return ((_a = chartDetail.value) == null ? void 0 : _a.administrators[0]) == userinfo.value._id;
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
    const adminName = common_vendor.ref([]);
    const getAdminName = async () => {
      var _a, _b;
      if (!((_a = chartDetail.value) == null ? void 0 : _a.administrators))
        return "";
      const db = common_vendor.Ws.database();
      const { result } = await db.collection("user").where({
        _id: db.command.in(chartDetail.value.administrators)
      }).field("nickName").get();
      const arr = (_b = chartDetail.value) == null ? void 0 : _b.administrators.map((item) => {
        const user = result.data.find((user2) => user2._id == item);
        if (user) {
          return user.nickName;
        }
      });
      adminName.value = arr;
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
    const cancelDrawer = async () => {
      showDrawer.value = false;
      updateData.value = {
        value: "",
        title: "",
        placeholder: ""
      };
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
      tip.value = isSelectSubmit.value ? "将使用以下信息选座：" : "将撤销以下选座：";
      showDrawer.value = true;
    };
    const onSubmitBtnClick = async () => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      loading.value = true;
      const { result } = await common_vendor.Ws.callFunction({
        name: "select-seat",
        data: {
          chartId: chartId.value,
          seatIndex: selectedItem.value.index,
          userinfo: isAdmin.value ? updateData.value : userinfo.value,
          isSelectSubmit: isSelectSubmit.value,
          orderId: selectedItem.value.orderId,
          edit: isAdmin.value
        }
      });
      showDrawer.value = false;
      if (result.code == 200) {
        common_vendor.index.showToast({
          title: isAdmin.value ? "修改成功" : "选座成功",
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
    const onAddAdminClick = async () => {
      popupData.value = {
        type: "addAdmin",
        title: "添加管理员(仅当前课室)",
        placeholder: "请输入管理员学号/id",
        value: ""
      };
      ifRenderDialog.value = true;
      setTimeout(() => {
        page.$vm.$refs.inputDialog.open();
      });
    };
    const onDeleteAdminClick = async () => {
      popupData.value = {
        type: "deleteAdmin",
        title: "删除管理员(仅当前课室)",
        placeholder: "请输入管理员学号/id",
        value: ""
      };
      ifRenderDialog.value = true;
      setTimeout(() => {
        page.$vm.$refs.inputDialog.open();
      });
    };
    const edit = async (type, value) => {
      popupData.value = {
        type,
        title: "编辑" + type,
        placeholder: "请输入" + type,
        value
      };
      ifRenderDialog.value = true;
      setTimeout(() => {
        page.$vm.$refs.inputDialog.open();
      });
    };
    const types = {
      姓名: "name",
      班级: "class",
      学号: "id"
    };
    const dialogInputConfirm = async (input) => {
      console.log(popupData.value);
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
        return addAdmin(text);
      if (type == "deleteAdmin")
        return deleteAdmin(text);
      if (type == "学号") {
        loading.value = true;
        common_vendor.index.showLoading({
          title: "加载中",
          mask: true
        });
        const db = common_vendor.Ws.database();
        const { result } = await db.collection("user").doc(text).field("_id,name,class").get();
        console.log(result);
        common_vendor.index.hideLoading();
        loading.value = false;
        if (result.data.length == 0) {
          common_vendor.index.showToast({
            title: "用户不存在",
            icon: "none"
          });
          return;
        }
        updateData.value[types[type]] = result.data[0]._id;
        updateData.value.name = result.data[0].name || "";
        updateData.value.class = result.data[0].class || "";
      } else {
        const comfirm = await common_vendor.index.showModal({
          title: "提示",
          content: "单独修改姓名或班级不会同步到相应用户",
          confirmText: "继续"
        });
        if (!comfirm.confirm)
          return;
        updateData.value[types[type]] = text;
      }
    };
    const addAdmin = async (id) => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      loading.value = true;
      const { administrators } = chartDetail.value;
      if (administrators.includes(id)) {
        common_vendor.index.showToast({
          title: "该用户已是管理员",
          icon: "none"
        });
        loading.value = false;
        return;
      }
      const db = common_vendor.Ws.database();
      const { result } = await db.collection("user").doc(id).field("_id").get();
      if (result.data.length == 0) {
        common_vendor.index.showToast({
          title: "用户不存在",
          icon: "none"
        });
        loading.value = false;
        return;
      }
      administrators.push(id);
      chartDetail.value.administrators = administrators;
      await db.collection("seat-chart").doc(chartId.value).update({
        administrators
      });
      await getAdminName();
      loading.value = false;
      common_vendor.index.showToast({
        title: "添加成功",
        icon: "success"
      });
      ifRenderDialog.value = false;
    };
    const deleteAdmin = async (id) => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      loading.value = true;
      const { administrators } = chartDetail.value;
      if (!administrators.includes(id)) {
        common_vendor.index.showToast({
          title: "该用户不是管理员",
          icon: "none"
        });
        loading.value = false;
        return;
      }
      if (id == userinfo.value._id) {
        common_vendor.index.showToast({
          title: "不能删除自己",
          icon: "none"
        });
        loading.value = false;
        return;
      }
      const index = administrators.indexOf(id);
      administrators.splice(index, 1);
      const db = common_vendor.Ws.database();
      await db.collection("seat-chart").doc(chartId.value).update({
        administrators
      });
      await getAdminName();
      chartDetail.value.administrators = administrators;
      common_vendor.index.showToast({
        title: "删除成功",
        icon: "success"
      });
      loading.value = false;
      ifRenderDialog.value = false;
    };
    const onChartEditBtnClick = () => {
      common_vendor.index.navigateTo({
        url: "/pages/createSeatChart/createSeatChart?type=edit&chartId=" + chartId.value
      });
    };
    const onChartDeleteBtnClick = async () => {
      const deleteConfirm = await common_vendor.index.showModal({
        title: "提示",
        content: "确定删除该课室吗？"
      });
      if (!deleteConfirm.confirm)
        return;
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      const db = common_vendor.Ws.database();
      const { result: delRes } = await db.collection("seat-chart").doc(chartId.value).remove();
      console.log(delRes);
      common_vendor.index.showToast({
        title: "删除成功",
        icon: "success"
      });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 1e3);
    };
    const updateData = common_vendor.ref({});
    const onSeatEditBtnClick = async () => {
      seatAdminEdit(true);
    };
    const onSeatDeleteBtnClick = async () => {
      seatAdminEdit(false);
    };
    const seatAdminEdit = async (isEdit) => {
      var _a, _b, _c;
      isSelectSubmit.value = isEdit;
      tip.value = isEdit ? "将修改以下选座：" : "将撤销以下选座：";
      updateData.value = {
        id: ((_a = selectedItem.value.stuInfo) == null ? void 0 : _a.id) || userinfo.value._id,
        name: ((_b = selectedItem.value.stuInfo) == null ? void 0 : _b.name) || userinfo.value.name,
        class: ((_c = selectedItem.value.stuInfo) == null ? void 0 : _c.class) || userinfo.value.class
      };
      showDrawer.value = true;
    };
    const copy = (text) => {
      console.log(text);
      common_vendor.index.setClipboardData({
        data: text,
        showToast: true,
        success: function() {
          common_vendor.index.vibrateShort();
        }
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H;
      return common_vendor.e({
        a: isAdmin.value
      }, isAdmin.value ? {} : {}, {
        b: common_vendor.p({
          title: "课室信息",
          type: "line"
        }),
        c: common_vendor.t((_a = chartDetail.value) == null ? void 0 : _a.title),
        d: common_vendor.o(($event) => {
          var _a2;
          return copy((_a2 = chartDetail.value) == null ? void 0 : _a2.title);
        }),
        e: common_vendor.p({
          title: "课室"
        }),
        f: common_vendor.t((_b = chartDetail.value) == null ? void 0 : _b.note),
        g: common_vendor.o(($event) => {
          var _a2;
          return copy((_a2 = chartDetail.value) == null ? void 0 : _a2.note);
        }),
        h: common_vendor.p({
          title: "备注"
        }),
        i: common_vendor.t((_c = chartDetail.value) == null ? void 0 : _c.selectableTimeRange.join(" 至 ")),
        j: common_vendor.o(($event) => {
          var _a2;
          return copy((_a2 = chartDetail.value) == null ? void 0 : _a2.selectableTimeRange.join(" 至 "));
        }),
        k: common_vendor.p({
          title: "选座时间"
        }),
        l: common_vendor.t((_d = chartDetail.value) == null ? void 0 : _d.effectiveTimeRange.join(" 至 ")),
        m: common_vendor.o(($event) => {
          var _a2;
          return copy((_a2 = chartDetail.value) == null ? void 0 : _a2.effectiveTimeRange.join(" 至 "));
        }),
        n: common_vendor.p({
          title: "生效时间"
        }),
        o: isAdmin.value
      }, isAdmin.value ? common_vendor.e({
        p: common_vendor.o(onChartEditBtnClick),
        q: loading.value,
        r: isCreater.value
      }, isCreater.value ? {
        s: common_vendor.o(onChartDeleteBtnClick),
        t: loading.value
      } : {}) : {}, {
        v: common_vendor.p({
          open: chartDetail.value != null && !loading.value,
          titleBorder: "none"
        }),
        w: common_vendor.p({
          padding: "0"
        }),
        x: common_vendor.p({
          title: "课室管理员",
          type: "line"
        }),
        y: common_vendor.f((_e = chartDetail.value) == null ? void 0 : _e.administrators, (admin, index, i0) => {
          return common_vendor.e({
            a: index == 0
          }, index == 0 ? {} : {}, {
            b: common_vendor.t(admin),
            c: common_vendor.o(($event) => copy(admin), index),
            d: index,
            e: "eca06f3c-12-" + i0 + ",eca06f3c-10",
            f: common_vendor.p({
              ellipsis: "1",
              title: adminName.value[index]
            })
          });
        }),
        z: isCreater.value
      }, isCreater.value ? {
        A: common_vendor.o(onAddAdminClick),
        B: loading.value,
        C: common_vendor.o(onDeleteAdminClick),
        D: loading.value
      } : {}, {
        E: common_vendor.p({
          open: chartDetail.value != null && !loading.value,
          titleBorder: "none"
        }),
        F: common_vendor.p({
          padding: "0"
        }),
        G: common_vendor.p({
          title: "座位表",
          type: "line"
        }),
        H: common_vendor.f((_f = chartDetail.value) == null ? void 0 : _f.seats, (item, index, i0) => {
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
        I: common_vendor.s(`--col:${(_g = chartDetail.value) == null ? void 0 : _g.col};--row:${(_h = chartDetail.value) == null ? void 0 : _h.row};`),
        J: common_vendor.o(onrefreshBtnClick),
        K: loading.value,
        L: common_vendor.p({
          padding: "0"
        }),
        M: selectedItem.value
      }, selectedItem.value ? common_vendor.e({
        N: common_vendor.p({
          title: "座位信息",
          type: "line"
        }),
        O: common_vendor.t((_i = selectedItem.value) == null ? void 0 : _i.x),
        P: common_vendor.t((_j = selectedItem.value) == null ? void 0 : _j.y),
        Q: common_vendor.p({
          title: "座位"
        }),
        R: ((_k = selectedItem.value) == null ? void 0 : _k.stuInfo) && (chartDetail.value.stuInfoVisible || userinfo.value.type == 1)
      }, ((_l = selectedItem.value) == null ? void 0 : _l.stuInfo) && (chartDetail.value.stuInfoVisible || userinfo.value.type == 1) ? {
        S: common_vendor.t((_n = (_m = selectedItem.value) == null ? void 0 : _m.stuInfo) == null ? void 0 : _n.name),
        T: common_vendor.p({
          title: "姓名"
        }),
        U: common_vendor.t((_p = (_o = selectedItem.value) == null ? void 0 : _o.stuInfo) == null ? void 0 : _p.id),
        V: common_vendor.p({
          title: "学号"
        }),
        W: common_vendor.t((_r = (_q = selectedItem.value) == null ? void 0 : _q.stuInfo) == null ? void 0 : _r.class),
        X: common_vendor.p({
          title: "班级"
        })
      } : {}, {
        Y: (_s = selectedItem.value) == null ? void 0 : _s.selectTime
      }, ((_t = selectedItem.value) == null ? void 0 : _t.selectTime) ? {
        Z: common_vendor.p({
          date: new Date((_u = selectedItem.value) == null ? void 0 : _u.selectTime) - 3e4,
          format: "M月d日 h时m分",
          threshold: [0, 36e5]
        }),
        aa: common_vendor.p({
          title: "选择时间"
        })
      } : {}, {
        ab: common_vendor.p({
          padding: "0"
        })
      }) : {}, {
        ac: isAdmin.value
      }, isAdmin.value ? {
        ad: !selectedItem.value,
        ae: common_vendor.o(onSeatEditBtnClick),
        af: loading.value,
        ag: ((_v = selectedItem.value) == null ? void 0 : _v.status) != 3,
        ah: common_vendor.o(onSeatDeleteBtnClick),
        ai: loading.value
      } : common_vendor.e({
        aj: avaliable()
      }, avaliable() ? {
        ak: common_vendor.t(((_x = (_w = selectedItem.value) == null ? void 0 : _w.stuInfo) == null ? void 0 : _x.id) == userinfo.value._id ? "撤销选座" : ((_y = selectedItem.value) == null ? void 0 : _y.status) == 3 ? "已被选择" : "选择座位"),
        al: common_vendor.o(onSelectBtnClick),
        am: ((_z = selectedItem.value) == null ? void 0 : _z.status) == 3 && ((_B = (_A = selectedItem.value) == null ? void 0 : _A.stuInfo) == null ? void 0 : _B.id) != userinfo.value._id || !selectedItem.value,
        an: ((_D = (_C = selectedItem.value) == null ? void 0 : _C.stuInfo) == null ? void 0 : _D.id) == userinfo.value._id ? "warn" : "primary",
        ao: loading.value
      } : {}, {
        ap: !avaliable()
      }, !avaliable() ? {} : {}), {
        aq: common_vendor.t(tip.value),
        ar: common_vendor.p({
          title: "课室信息",
          type: "line"
        }),
        as: common_vendor.t((_E = chartDetail.value) == null ? void 0 : _E.title),
        at: common_vendor.p({
          title: "课室"
        }),
        av: common_vendor.t((_F = selectedItem.value) == null ? void 0 : _F.x),
        aw: common_vendor.t((_G = selectedItem.value) == null ? void 0 : _G.y),
        ax: common_vendor.p({
          title: "座位"
        }),
        ay: common_vendor.t((_H = chartDetail.value) == null ? void 0 : _H.effectiveTimeRange.join(" 至 ")),
        az: common_vendor.p({
          title: "生效时间"
        }),
        aA: common_vendor.p({
          title: "学生信息",
          type: "line"
        }),
        aB: common_vendor.t(isAdmin.value ? updateData.value.id : userinfo.value._id),
        aC: common_vendor.o(($event) => edit("学号", updateData.value.id)),
        aD: common_vendor.p({
          title: "学号",
          link: isAdmin.value && isSelectSubmit.value
        }),
        aE: common_vendor.t(isAdmin.value ? updateData.value.name : userinfo.value.name),
        aF: common_vendor.o(($event) => edit("姓名", updateData.value.name)),
        aG: common_vendor.p({
          title: "姓名",
          link: isAdmin.value && isSelectSubmit.value
        }),
        aH: common_vendor.t(isAdmin.value ? updateData.value.class : userinfo.value.class),
        aI: common_vendor.o(($event) => edit("班级", updateData.value.class)),
        aJ: common_vendor.p({
          title: "班级",
          link: isAdmin.value && isSelectSubmit.value
        }),
        aK: common_vendor.p({
          padding: "0"
        }),
        aL: common_vendor.o(onSubmitBtnClick),
        aM: isSelectSubmit.value ? "primary" : "warn",
        aN: loading.value,
        aO: common_vendor.o(() => {
        }),
        aP: common_vendor.o(cancelDrawer),
        aQ: !showDrawer.value ? 1 : "",
        aR: ifRenderDialog.value
      }, ifRenderDialog.value ? {
        aS: common_vendor.sr("inputClose", "eca06f3c-34,eca06f3c-33"),
        aT: common_vendor.o(dialogInputConfirm),
        aU: common_vendor.o(($event) => ifRenderDialog.value = false),
        aV: common_vendor.o(($event) => popupData.value.value = $event),
        aW: common_vendor.p({
          mode: "input",
          title: popupData.value.title,
          placeholder: popupData.value.placeholder,
          modelValue: popupData.value.value
        }),
        aX: common_vendor.sr("inputDialog", "eca06f3c-33"),
        aY: common_vendor.p({
          type: "dialog"
        })
      } : {}, {
        aZ: common_vendor.s(chartDetail.value != null ? "transition: all .5s ease; opacity: 1" : "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"], ["__file", "D:/code/seatchon-uniapp/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
