"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_card2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_list_item + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_card + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const page = getCurrentPages().find((item) => item.route === "pages/user/user");
    const userinfo = common_vendor.ref(common_vendor.index.getStorageSync("userinfo"));
    const show = common_vendor.ref(false);
    const loading = common_vendor.ref(false);
    common_vendor.onShow(async () => {
      setTimeout(() => {
        show.value = true;
      }, 100);
    });
    common_vendor.onHide(async () => {
      show.value = false;
    });
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
    const formData = common_vendor.ref({
      id: "",
      pwd: "",
      adminpwd: "",
      newpwd: "",
      newpwd2: ""
    });
    const addStudentformData = common_vendor.ref({
      id: "",
      name: "",
      class: ""
    });
    const resetPwdFormData = common_vendor.ref({
      id: ""
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
        rules: [{ required: true, errorMessage: "请输入学号/id" }]
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
    const addStudentFormRules = {
      name: {
        rules: [{ required: true, errorMessage: "请输入姓名" }]
      },
      class: {
        rules: [{ required: true, errorMessage: "请输入班级" }]
      }
    };
    common_vendor.onReady(async () => {
      var _a, _b, _c, _d, _e;
      (_a = page.$vm.$refs.form) == null ? void 0 : _a.setRules(rules);
      (_b = page.$vm.$refs.form1) == null ? void 0 : _b.setRules(rules);
      (_c = page.$vm.$refs.adminform) == null ? void 0 : _c.setRules(rules);
      (_d = page.$vm.$refs.addStudentForm) == null ? void 0 : _d.setRules(addStudentFormRules);
      (_e = page.$vm.$refs.resetPwdForm) == null ? void 0 : _e.setRules(rules);
    });
    const submit = async (ref) => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      loading.value = true;
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
            loading.value = false;
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
          loading.value = false;
        }
      } catch (e) {
        console.log(e);
        common_vendor.index.showToast({
          title: e[0].errorMessage,
          icon: "error",
          duration: 2e3
        });
        loading.value = false;
        return;
      }
      loading.value = false;
      common_vendor.index.hideLoading();
    };
    const logout = () => {
      loading.value = true;
      common_vendor.index.setStorageSync("userinfo", "");
      userinfo.value = "";
      common_vendor.index.showToast({
        title: "退出登录成功",
        icon: "success"
      });
      loading.value = false;
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
      loading.value = true;
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
          loading.value = false;
          return;
        }
      } catch (e2) {
        console.log(e2);
      }
      loading.value = false;
      common_vendor.index.showToast({
        title: "上传失败",
        icon: "none"
      });
    };
    const ifRenderDialog = common_vendor.ref(false);
    const addStudentFormSubmit = async (e) => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      loading.value = true;
      try {
        let data = await page.$vm.$refs.addStudentForm.validate();
        if (data.id != "")
          data._id = data.id;
        delete data.id;
        console.log(data);
        const db = common_vendor.Ws.database();
        const { result: getRes } = await db.collection("user").doc(data._id).field("_id").get();
        if (getRes.data.length > 0) {
          common_vendor.index.showToast({
            title: "该id已存在",
            icon: "none"
          });
          loading.value = false;
          return;
        }
        const { result: addRes } = await db.collection("user").add({
          ...data,
          avatarUrl: data._id ? `https://api.multiavatar.com/${data._id}.png` : "",
          pwd: "$2a$10$WOW5NsssssCKafZZNDt9PO54RS1ZgoulTWhPl/1c5TTTnUI/w34Pq",
          type: 0
        });
        console.log(addRes.id);
        if (addRes.id) {
          if (!data._id) {
            const { result: updateRes } = await db.collection("user").doc(addRes._id).update({
              avatarUrl: `https://api.multiavatar.com/${addRes.id}.png`
            });
          }
          const copyComfirm = await common_vendor.index.showModal({
            title: "添加成功",
            content: "id:" + addRes.id,
            showCancel: true,
            confirmText: "复制"
          });
          addStudentformData.value = {};
          if (copyComfirm.confirm) {
            common_vendor.index.setClipboardData({
              data: addRes._id,
              showToast: true
            });
          }
        }
      } catch (e2) {
        console.log(e2);
        common_vendor.index.showToast({
          title: e2[0].errorMessage,
          icon: "none"
        });
      }
      loading.value = false;
      common_vendor.index.hideLoading();
    };
    const resetPwdFormSubmit = async (e) => {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
      loading.value = true;
      try {
        let data = await page.$vm.$refs.resetPwdForm.validate();
        console.log(data);
        const db = common_vendor.Ws.database();
        const { result: updateRes } = await db.collection("user").doc(data.id).update({
          pwd: "$2a$10$WOW5NsssssCKafZZNDt9PO54RS1ZgoulTWhPl/1c5TTTnUI/w34Pq"
        });
        if (updateRes.updated > 0) {
          common_vendor.index.showToast({
            title: "重置成功",
            icon: "success"
          });
          loading.value = false;
          return;
        }
      } catch (e2) {
        console.log(e2);
        common_vendor.index.showToast({
          title: e2[0].errorMessage,
          icon: "none"
        });
      }
      loading.value = false;
      common_vendor.index.hideLoading();
    };
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
        k: common_vendor.o(($event) => copy(userinfo.value.name)),
        l: common_vendor.p({
          title: "姓名"
        }),
        m: common_vendor.t(userinfo.value._id),
        n: common_vendor.o(($event) => copy(userinfo.value._id)),
        o: common_vendor.p({
          title: userinfo.value.type == 1 ? "学号/id" : "学号"
        }),
        p: common_vendor.t(userinfo.value.class),
        q: common_vendor.p({
          title: "班级"
        }),
        r: common_vendor.p({
          open: show.value,
          titleBorder: "none"
        }),
        s: common_vendor.p({
          padding: "0"
        })
      } : {}, {
        t: !userinfo.value
      }, !userinfo.value ? {
        v: common_vendor.p({
          title: "登录",
          type: "line"
        }),
        w: common_vendor.o(($event) => formData.value.id = $event),
        x: common_vendor.p({
          placeholder: "请输入账号/学号",
          modelValue: formData.value.id
        }),
        y: common_vendor.p({
          label: "账号",
          required: true,
          name: "id"
        }),
        z: common_vendor.o(($event) => formData.value.pwd = $event),
        A: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: formData.value.pwd
        }),
        B: common_vendor.p({
          label: "密码",
          required: true,
          name: "pwd"
        }),
        C: common_vendor.sr("form", "0f7520f0-11,0f7520f0-9"),
        D: common_vendor.p({
          modelValue: formData.value
        }),
        E: loading.value,
        F: common_vendor.o(($event) => submit("form")),
        G: common_vendor.p({
          padding: "0"
        })
      } : {}, {
        H: !userinfo.value
      }, !userinfo.value ? {
        I: common_vendor.p({
          title: "管理员登录",
          type: "line"
        }),
        J: common_vendor.o(($event) => formData.value.adminpwd = $event),
        K: common_vendor.p({
          placeholder: "请输入管理密码",
          modelValue: formData.value.adminpwd
        }),
        L: common_vendor.p({
          name: "adminpwd"
        }),
        M: common_vendor.sr("adminform", "0f7520f0-18,0f7520f0-16"),
        N: common_vendor.p({
          modelValue: formData.value
        }),
        O: loading.value,
        P: common_vendor.o(($event) => submit("adminform")),
        Q: common_vendor.p({
          padding: "0"
        })
      } : {}, {
        R: userinfo.value
      }, userinfo.value ? {
        S: common_vendor.p({
          title: "修改密码",
          type: "line"
        }),
        T: common_vendor.o(($event) => formData.value.pwd = $event),
        U: common_vendor.p({
          trim: "both",
          type: "password",
          placeholder: "请输入密码",
          modelValue: formData.value.pwd
        }),
        V: common_vendor.p({
          label: "旧密码",
          required: true,
          name: "pwd"
        }),
        W: common_vendor.o(($event) => formData.value.newpwd = $event),
        X: common_vendor.p({
          trim: "both",
          type: "password",
          placeholder: "请输入新密码",
          modelValue: formData.value.newpwd
        }),
        Y: common_vendor.p({
          label: "新密码",
          required: true,
          name: "newpwd"
        }),
        Z: common_vendor.o(($event) => formData.value.newpwd2 = $event),
        aa: common_vendor.p({
          trim: "both",
          type: "password",
          placeholder: "请确认新密码",
          modelValue: formData.value.newpwd2
        }),
        ab: common_vendor.p({
          label: "确认密码",
          required: true,
          name: "newpwd2"
        }),
        ac: common_vendor.sr("form1", "0f7520f0-25,0f7520f0-23"),
        ad: common_vendor.p({
          modelValue: formData.value,
          ["label-width"]: "80px"
        }),
        ae: loading.value,
        af: common_vendor.o(($event) => submit("form1")),
        ag: common_vendor.p({
          titleBorder: "none"
        }),
        ah: common_vendor.p({
          padding: "0"
        })
      } : {}, {
        ai: userinfo.value.type == 1
      }, userinfo.value.type == 1 ? {
        aj: common_vendor.p({
          title: "添加学生（管理员）",
          type: "line"
        }),
        ak: common_vendor.o(($event) => addStudentformData.value.id = $event),
        al: common_vendor.p({
          trim: "both",
          placeholder: "输入学号/id（留空自动生成id）",
          modelValue: addStudentformData.value.id
        }),
        am: common_vendor.p({
          label: "学号/id",
          name: "id"
        }),
        an: common_vendor.o(($event) => addStudentformData.value.name = $event),
        ao: common_vendor.p({
          trim: "both",
          placeholder: "请输入姓名",
          modelValue: addStudentformData.value.name
        }),
        ap: common_vendor.p({
          label: "姓名",
          required: true,
          name: "name"
        }),
        aq: common_vendor.o(($event) => addStudentformData.value.class = $event),
        ar: common_vendor.p({
          trim: "both",
          placeholder: "请输入班级",
          modelValue: addStudentformData.value.class
        }),
        as: common_vendor.p({
          label: "班级",
          required: true,
          name: "class"
        }),
        at: common_vendor.sr("addStudentForm", "0f7520f0-36,0f7520f0-34"),
        av: common_vendor.p({
          modelValue: addStudentformData.value,
          ["label-width"]: "80px"
        }),
        aw: loading.value,
        ax: common_vendor.o(addStudentFormSubmit),
        ay: common_vendor.p({
          titleBorder: "none"
        }),
        az: common_vendor.p({
          padding: "0"
        })
      } : {}, {
        aA: userinfo.value.type == 1
      }, userinfo.value.type == 1 ? {
        aB: common_vendor.p({
          title: "重置密码（管理员）",
          type: "line"
        }),
        aC: common_vendor.o(($event) => resetPwdFormData.value.id = $event),
        aD: common_vendor.p({
          trim: "both",
          placeholder: "输入学号/id",
          modelValue: resetPwdFormData.value.id
        }),
        aE: common_vendor.p({
          required: true,
          label: "学号/id",
          name: "id"
        }),
        aF: common_vendor.sr("resetPwdForm", "0f7520f0-47,0f7520f0-45"),
        aG: common_vendor.p({
          modelValue: resetPwdFormData.value,
          ["label-width"]: "80px"
        }),
        aH: loading.value,
        aI: common_vendor.o(resetPwdFormSubmit),
        aJ: common_vendor.p({
          titleBorder: "none"
        }),
        aK: common_vendor.p({
          padding: "0"
        })
      } : {}, {
        aL: userinfo.value.type == 1
      }, userinfo.value.type == 1 ? {
        aM: common_vendor.p({
          title: "批量添加学生（管理员）",
          type: "line"
        }),
        aN: loading.value,
        aO: common_vendor.o(($event) => submit("form1")),
        aP: common_vendor.p({
          titleBorder: "none"
        }),
        aQ: common_vendor.p({
          padding: "0"
        })
      } : {}, {
        aR: ifRenderDialog.value
      }, ifRenderDialog.value ? {
        aS: common_vendor.sr("inputClose", "0f7520f0-55,0f7520f0-54"),
        aT: common_vendor.o(dialogInputConfirm),
        aU: common_vendor.o(($event) => ifRenderDialog.value = false),
        aV: common_vendor.o(($event) => popupData.value.value = $event),
        aW: common_vendor.p({
          mode: "input",
          title: popupData.value.title,
          placeholder: popupData.value.placeholder,
          modelValue: popupData.value.value
        }),
        aX: common_vendor.sr("inputDialog", "0f7520f0-54"),
        aY: common_vendor.p({
          type: "dialog"
        })
      } : {}, {
        aZ: userinfo.value
      }, userinfo.value ? {
        ba: loading.value,
        bb: common_vendor.o(logout)
      } : {}, {
        bc: common_vendor.s(show.value ? "transition: all .5s ease; opacity: 1" : "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "D:/code/seatchon-uniapp/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
