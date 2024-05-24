"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_card2 + _easycom_uni_load_more2 + _easycom_unicloud_db2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_card + _easycom_uni_load_more + _easycom_unicloud_db + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const userinfo = common_vendor.ref(common_vendor.index.getStorageSync("userinfo"));
    const popupData = common_vendor.ref({
      value: "",
      title: "",
      placeholder: ""
    });
    const formatTimeRange = (timeRange) => {
      return timeRange.join(" 至 ");
    };
    common_vendor.onShow(() => {
      getCurrentPages()[0].$vm.$refs.udb.loadData({ clear: true });
    });
    common_vendor.onPullDownRefresh(async () => {
      await getCurrentPages()[0].$vm.$refs.udb.loadData({ clear: true }, () => {
        common_vendor.index.stopPullDownRefresh();
      });
      common_vendor.index.showToast({
        title: "刷新成功",
        icon: "success"
      });
    });
    const onChooseAvatar = async (e) => {
      const tmpUrl = e.detail.avatarUrl;
      common_vendor.index.showLoading({
        title: "上传中",
        mask: true
      });
      try {
        const { fileID } = await common_vendor.Ws.uploadFile({
          filePath: tmpUrl,
          cloudPath: "avatar/" + userinfo.value._openid + ".png",
          fileType: "image"
        });
        const { fileList } = await common_vendor.Ws.getTempFileURL({
          fileList: [fileID]
        });
        const { result } = await common_vendor.Ws.database().collection("user").doc(userinfo.value._id).update({
          avatarUrl: fileList[0].tempFileURL
        });
        if (result.updated > 0) {
          userinfo.value.avatarUrl = fileList[0].tempFileURL;
          common_vendor.index.setStorageSync("userinfo", userinfo.value);
          common_vendor.index.showToast({
            title: "上传成功",
            icon: "success"
          });
          return;
        }
      } catch (e2) {
        console.log(e2);
      }
      common_vendor.index.showToast({
        title: "上传失败",
        icon: "none"
      });
    };
    const ifRenderDialog = common_vendor.ref(false);
    const inputDialog = common_vendor.ref(null);
    const edit = async (type, value) => {
      popupData.value = {
        type,
        title: "编辑" + type,
        placeholder: "请输入" + type,
        value
      };
      ifRenderDialog.value = true;
      setTimeout(() => {
        getCurrentPages()[0].$vm.$refs.inputDialog.open();
      });
    };
    const types = {
      昵称: "nickName",
      姓名: "stuInfo.name",
      学号: "stuInfo.id",
      班级: "stuInfo.class"
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
      const { result } = await common_vendor.Ws.database().collection("user").doc(userinfo.value._id).update({
        [`${types[type]}`]: text
      });
      if (result.errCode == 0) {
        if (type == "昵称") {
          userinfo.value.nickName = text;
        } else {
          userinfo.value.stuInfo[types[type].replace("stuInfo.", "")] = text;
        }
        common_vendor.index.setStorageSync("userinfo", userinfo.value);
        popupData.value = {};
        common_vendor.index.showToast({
          title: "修改成功",
          icon: "success"
        });
        ifRenderDialog.value = true;
        getCurrentPages()[0].$vm.$refs.inputDialog.close();
        return;
      }
      common_vendor.index.showToast({
        title: "修改失败",
        icon: "none"
      });
    };
    const count = common_vendor.ref(0);
    const onLongPress = async () => {
      count.value++;
      console.log(count.value);
      if (count.value >= 5) {
        console.log(userinfo.value.type);
        const { result } = await common_vendor.Ws.database().collection("user").doc(userinfo.value._id).update({
          type: userinfo.value.type == 0 ? 1 : 0
        });
        console.log(result);
        if (result.errCode == 0) {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "我的信息",
          type: "line"
        }),
        b: userinfo.value.avatarUrl,
        c: common_vendor.p({
          border: false,
          clickable: true,
          showArrow: true,
          title: "头像"
        }),
        d: common_vendor.o(onLongPress),
        e: common_vendor.o(onChooseAvatar),
        f: common_vendor.t(userinfo.value.nickName),
        g: common_vendor.o(($event) => edit("昵称", userinfo.value.nickName)),
        h: common_vendor.p({
          clickable: true,
          showArrow: true,
          title: "昵称"
        }),
        i: common_vendor.t(userinfo.value.stuInfo.name || "未设置"),
        j: common_vendor.o(($event) => edit("姓名", userinfo.value.stuInfo.name)),
        k: common_vendor.p({
          clickable: true,
          showArrow: true,
          title: "姓名"
        }),
        l: common_vendor.t(userinfo.value.stuInfo.id || "未设置"),
        m: common_vendor.o(($event) => edit("学号", userinfo.value.stuInfo.id)),
        n: common_vendor.p({
          clickable: true,
          showArrow: true,
          title: "学号"
        }),
        o: common_vendor.t(userinfo.value.stuInfo.class || "未设置"),
        p: common_vendor.o(($event) => edit("班级", userinfo.value.stuInfo.class)),
        q: common_vendor.p({
          clickable: true,
          showArrow: true,
          title: "班级"
        }),
        r: common_vendor.p({
          padding: "0"
        }),
        s: common_vendor.p({
          title: "我的预定",
          type: "line"
        }),
        t: userinfo.value
      }, userinfo.value ? {
        v: common_vendor.w(({
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
                e: common_vendor.t(item.x),
                f: common_vendor.t(item.y),
                g: item.chartId,
                h: "2d0e1023-12-" + i0 + "-" + i1 + "," + ("2d0e1023-11-" + i0),
                i: common_vendor.p({
                  clickable: true,
                  link: true,
                  to: "/pages/detail/detail?chartId=" + item.chartId,
                  title: item.title,
                  note: item.note
                })
              };
            }),
            d: "2d0e1023-11-" + i0 + ",2d0e1023-10",
            e: "2d0e1023-13-" + i0 + ",2d0e1023-10",
            f: common_vendor.p({
              status: loading ? "loading" : hasMore ? "default" : "no-more"
            }),
            g: i0,
            h: s0
          });
        }, {
          name: "d",
          path: "v",
          vueId: "2d0e1023-10,2d0e1023-8"
        }),
        w: common_vendor.sr("udb", "2d0e1023-10,2d0e1023-8"),
        x: common_vendor.p({
          options: _ctx.options,
          collection: "order",
          where: `openid=='${userinfo.value._openid}'`,
          orderby: "orderTime desc"
        })
      } : {}, {
        y: common_vendor.p({
          padding: "0"
        }),
        z: ifRenderDialog.value
      }, ifRenderDialog.value ? {
        A: common_vendor.sr("inputClose", "2d0e1023-15,2d0e1023-14"),
        B: common_vendor.o(dialogInputConfirm),
        C: common_vendor.o(($event) => ifRenderDialog.value = false),
        D: common_vendor.o(($event) => popupData.value.value = $event),
        E: common_vendor.p({
          mode: "input",
          title: popupData.value.title,
          placeholder: popupData.value.placeholder,
          modelValue: popupData.value.value
        }),
        F: common_vendor.sr(inputDialog, "2d0e1023-14", {
          "k": "inputDialog"
        }),
        G: common_vendor.p({
          type: "dialog"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/seatchon-uniapp/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
