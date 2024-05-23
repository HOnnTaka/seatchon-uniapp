"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_dialog + _easycom_uni_popup)();
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
    const edit = (type) => {
      popupData.value = {
        type,
        title: "编辑" + type,
        placeholder: "请输入" + type
      };
      getCurrentPages()[0].$vm.$refs.inputDialog.open();
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
        getCurrentPages()[0].$vm.$refs.inputDialog.close();
      } else {
        common_vendor.index.showToast({
          title: "修改失败",
          icon: "none"
        });
      }
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
      return {
        a: userinfo.value.avatarUrl,
        b: common_vendor.p({
          clickable: true,
          showArrow: true,
          title: "头像"
        }),
        c: common_vendor.o(onLongPress),
        d: common_vendor.o(onChooseAvatar),
        e: common_vendor.t(userinfo.value.nickName),
        f: common_vendor.o(($event) => edit("昵称")),
        g: common_vendor.p({
          clickable: true,
          showArrow: true,
          title: "昵称"
        }),
        h: common_vendor.t(userinfo.value.stuInfo.name || "未设置"),
        i: common_vendor.o(($event) => edit("姓名")),
        j: common_vendor.p({
          clickable: true,
          showArrow: true,
          title: "姓名"
        }),
        k: common_vendor.t(userinfo.value.stuInfo.id || "未设置"),
        l: common_vendor.o(($event) => edit("学号")),
        m: common_vendor.p({
          clickable: true,
          showArrow: true,
          title: "学号"
        }),
        n: common_vendor.t(userinfo.value.stuInfo.class || "未设置"),
        o: common_vendor.o(($event) => edit("班级")),
        p: common_vendor.p({
          clickable: true,
          showArrow: true,
          title: "班级"
        }),
        q: common_vendor.sr("inputClose", "249eac86-7,249eac86-6"),
        r: common_vendor.o(dialogInputConfirm),
        s: common_vendor.o(($event) => popupData.value.value = $event),
        t: common_vendor.p({
          mode: "input",
          title: popupData.value.title,
          placeholder: popupData.value.placeholder,
          modelValue: popupData.value.value
        }),
        v: common_vendor.sr("inputDialog", "249eac86-6"),
        w: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/mcct/seatchon-uniapp/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
