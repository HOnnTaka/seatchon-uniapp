"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_card2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_card + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const page = getCurrentPages().find((item) => item.route === "pages/user/user");
    const userinfo = common_vendor.ref(common_vendor.index.getStorageSync("userinfo"));
    const formData = common_vendor.ref({
      id: "",
      pwd: "",
      adminpwd: "",
      newpwd: "",
      newpwd2: ""
    });
    const resetFormData = () => {
      formData.value = {
        id: "",
        pwd: "",
        adminpwd: "",
        newpwd: "",
        newpwd2: ""
      };
    };
    common_vendor.onLoad(() => {
    });
    const rules = {
      id: {
        rules: [{ required: true, errorMessage: "请输入账号/学号" }]
      },
      pwd: {
        rules: [{ required: true, errorMessage: "请输入密码" }]
      },
      adminpwd: {
        rules: [{ required: true, errorMessage: "请输入管理密码" }]
      },
      newpwd: {
        rules: [
          { required: true, errorMessage: "请输入新密码" },
          // 8-20位字母、数字
          {
            validateFunction: function(rule, value, data, callback) {
              if (!/^[a-zA-Z0-9]{8,20}$/.test(value)) {
                callback("密码必须为8-20位字母、数字");
              }
              return;
            }
          }
        ]
      },
      newpwd2: {
        rules: [
          { required: true, errorMessage: "请确认新密码" },
          {
            validateFunction: function(rule, value, data, callback) {
              if (value != formData.value.newpwd) {
                callback("两次密码输入不一致");
              }
              return;
            }
          }
        ]
      }
    };
    common_vendor.onReady(async () => {
      var _a, _b, _c;
      (_a = page.$vm.$refs.form) == null ? void 0 : _a.setRules(rules);
      (_b = page.$vm.$refs.form1) == null ? void 0 : _b.setRules(rules);
      (_c = page.$vm.$refs.adminform) == null ? void 0 : _c.setRules(rules);
    });
    const submit = async (ref) => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      try {
        let data = await page.$vm.$refs[ref].validate();
        if (ref == "adminform") {
          try {
            const { code } = await common_vendor.index.login();
            const { result } = await common_vendor.Ws.callFunction({
              name: "login",
              data: { adminpwd: data.adminpwd, code }
            });
            console.log(result);
            common_vendor.index.showToast({
              title: result.message,
              icon: result.code == 1 ? "error" : "success"
            });
            if (result.code == 0) {
              common_vendor.index.setStorageSync("userinfo", result.userinfo);
              common_vendor.index.reLaunch({
                url: "/pages/user/user"
              });
            }
          } catch (e) {
            common_vendor.index.showToast({
              title: "请使用微信小程序打开",
              icon: "none",
              duration: 2e3
            });
          }
          return;
        }
        if (userinfo.value)
          data.id = userinfo.value._id;
        try {
          console.log(data, userinfo.value);
          const { result } = await common_vendor.Ws.callFunction({ name: "login", data });
          console.log(result);
          common_vendor.index.showToast({
            title: result.message,
            icon: result.code == 1 ? "error" : "success"
          });
          if (result.code != 1) {
            if (result.code != 3) {
              common_vendor.index.setStorageSync("userinfo", result.userinfo);
              userinfo.value = result.userinfo;
              common_vendor.index.reLaunch({
                url: "/pages/user/user"
              });
              if (result.code == 2) {
                common_vendor.index.showToast({
                  title: "请尽快修改默认密码",
                  icon: "none",
                  duration: 4e3
                });
              }
            }
            resetFormData();
          }
        } catch (e) {
          console.log(e);
          common_vendor.index.showToast({
            title: e.message,
            icon: "none",
            duration: 2e3
          });
        }
      } catch (e) {
        console.log(e);
        common_vendor.index.showToast({
          title: "请检查输入内容",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      common_vendor.index.hideLoading();
    };
    const logout = () => {
      common_vendor.index.setStorageSync("userinfo", "");
      userinfo.value = "";
      common_vendor.index.showToast({
        title: "退出登录成功",
        icon: "success"
      });
    };
    const popupData = common_vendor.ref({
      value: "",
      title: "",
      placeholder: ""
    });
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
      昵称: "nickName"
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
        page.$vm.$refs.inputDialog.close();
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
          userinfo.value.type = userinfo.value.type == 0 ? 1 : 0;
          common_vendor.index.setStorageSync("userinfo", userinfo.value);
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      }
    };
    const onChooseAvatar = async (e) => {
      const tmpUrl = e.detail.avatarUrl;
      common_vendor.index.showLoading({
        title: "上传中",
        mask: true
      });
      try {
        const { fileID } = await common_vendor.Ws.uploadFile({
          filePath: tmpUrl,
          cloudPath: "avatar/" + userinfo.value._id + ".png",
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userinfo.value
      }, userinfo.value ? {
        b: common_vendor.p({
          title: "我的信息",
          type: "line"
        }),
        c: userinfo.value.avatarUrl,
        d: common_vendor.p({
          border: false,
          clickable: true,
          showArrow: true
        }),
        e: common_vendor.o(onLongPress),
        f: common_vendor.o(onChooseAvatar),
        g: common_vendor.t(userinfo.value.nickName),
        h: common_vendor.o(($event) => edit("昵称", userinfo.value.nickName)),
        i: common_vendor.p({
          clickable: true,
          showArrow: true,
          title: "昵称"
        }),
        j: common_vendor.t(userinfo.value.name),
        k: common_vendor.p({
          title: "姓名"
        }),
        l: common_vendor.t(userinfo.value._id),
        m: common_vendor.p({
          title: userinfo.value.type == 1 ? "学号/id" : "学号"
        }),
        n: common_vendor.t(userinfo.value.class),
        o: common_vendor.p({
          title: "班级"
        }),
        p: common_vendor.p({
          padding: "0"
        })
      } : {}, {
        q: !userinfo.value
      }, !userinfo.value ? {
        r: common_vendor.p({
          title: "登录",
          type: "line"
        }),
        s: common_vendor.o(($event) => formData.value.id = $event),
        t: common_vendor.p({
          placeholder: "请输入账号/学号",
          modelValue: formData.value.id
        }),
        v: common_vendor.p({
          label: "账号",
          required: true,
          name: "id"
        }),
        w: common_vendor.o(($event) => formData.value.pwd = $event),
        x: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: formData.value.pwd
        }),
        y: common_vendor.p({
          label: "密码",
          required: true,
          name: "pwd"
        }),
        z: common_vendor.sr("form", "0f7520f0-10,0f7520f0-8"),
        A: common_vendor.p({
          modelValue: formData.value
        }),
        B: common_vendor.o(($event) => submit("form")),
        C: common_vendor.p({
          padding: "0"
        })
      } : {}, {
        D: !userinfo.value
      }, !userinfo.value ? {
        E: common_vendor.p({
          title: "管理员登录",
          type: "line"
        }),
        F: common_vendor.o(($event) => formData.value.adminpwd = $event),
        G: common_vendor.p({
          placeholder: "请输入管理密码",
          modelValue: formData.value.adminpwd
        }),
        H: common_vendor.p({
          name: "adminpwd"
        }),
        I: common_vendor.sr("adminform", "0f7520f0-17,0f7520f0-15"),
        J: common_vendor.p({
          modelValue: formData.value
        }),
        K: common_vendor.o(($event) => submit("adminform")),
        L: common_vendor.p({
          padding: "0"
        })
      } : {}, {
        M: userinfo.value
      }, userinfo.value ? {
        N: common_vendor.p({
          title: "修改密码",
          type: "line"
        }),
        O: common_vendor.o(($event) => formData.value.pwd = $event),
        P: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: formData.value.pwd
        }),
        Q: common_vendor.p({
          label: "旧密码",
          required: true,
          name: "pwd"
        }),
        R: common_vendor.o(($event) => formData.value.newpwd = $event),
        S: common_vendor.p({
          type: "password",
          placeholder: "请输入新密码",
          modelValue: formData.value.newpwd
        }),
        T: common_vendor.p({
          label: "新密码",
          required: true,
          name: "newpwd"
        }),
        U: common_vendor.o(($event) => formData.value.newpwd2 = $event),
        V: common_vendor.p({
          type: "password",
          placeholder: "请确认新密码",
          modelValue: formData.value.newpwd2
        }),
        W: common_vendor.p({
          label: "确认密码",
          required: true,
          name: "newpwd2"
        }),
        X: common_vendor.sr("form1", "0f7520f0-24,0f7520f0-22"),
        Y: common_vendor.p({
          modelValue: formData.value,
          ["label-width"]: "80px"
        }),
        Z: common_vendor.o(($event) => submit("form1")),
        aa: common_vendor.p({
          padding: "0"
        })
      } : {}, {
        ab: ifRenderDialog.value
      }, ifRenderDialog.value ? {
        ac: common_vendor.sr("inputClose", "0f7520f0-32,0f7520f0-31"),
        ad: common_vendor.o(dialogInputConfirm),
        ae: common_vendor.o(($event) => ifRenderDialog.value = false),
        af: common_vendor.o(($event) => popupData.value.value = $event),
        ag: common_vendor.p({
          mode: "input",
          title: popupData.value.title,
          placeholder: popupData.value.placeholder,
          modelValue: popupData.value.value
        }),
        ah: common_vendor.sr(inputDialog, "0f7520f0-31", {
          "k": "inputDialog"
        }),
        ai: common_vendor.p({
          type: "dialog"
        })
      } : {}, {
        aj: userinfo.value
      }, userinfo.value ? {
        ak: common_vendor.o(logout)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "D:/code/seatchon-uniapp/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
