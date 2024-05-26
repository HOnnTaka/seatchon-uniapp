"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_section2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_number_box2 + _easycom_uni_datetime_picker2 + _easycom_uni_data_checkbox2 + _easycom_uni_card2 + _easycom_uni_forms2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_number_box + _easycom_uni_datetime_picker + _easycom_uni_data_checkbox + _easycom_uni_card + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "createSeatChart",
  setup(__props) {
    common_vendor.onLoad(async () => {
    });
    const today = (/* @__PURE__ */ new Date()).toJSON().substring(0, 10);
    const baseFormData = common_vendor.reactive({
      title: "",
      note: "",
      col: "10",
      row: "11",
      stuInfoVisible: 0,
      effectiveTimeRange: [],
      selectableTimeRange: []
    });
    const loading = common_vendor.ref(false);
    const seatStatus = common_vendor.ref([]);
    const seats = common_vendor.computed(() => {
      const col = parseInt(baseFormData.col);
      const row = parseInt(baseFormData.row);
      loading.value = true;
      let arr = [];
      seatStatus.value = [];
      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          arr.push({
            x: j + 1,
            y: i + 1
          });
          seatStatus.value.push(1);
        }
      }
      loading.value = false;
      return arr;
    });
    const stuInfoVisible = common_vendor.ref([
      { text: "允许", value: 0 },
      { text: "不允许", value: 1 }
    ]);
    const rules = {
      title: {
        rules: [{ required: true, errorMessage: "请输入标题" }]
      },
      col: {
        rules: [
          { required: true, errorMessage: "请输入列数" },
          { format: "number", errorMessage: "请输入正确的数字" }
        ]
      },
      row: {
        rules: [
          { required: true, errorMessage: "请输入行数" },
          { format: "number", errorMessage: "请输入正确的数字" }
        ]
      },
      selectableTimeRange: {
        rules: [
          { required: true, errorMessage: "请选择开放选择时间" },
          { type: "array", errorMessage: "请选择开放选择时间" }
        ]
      },
      effectiveTimeRange: {
        rules: [
          { required: true, errorMessage: "请选择座位有效时间" },
          { type: "array", errorMessage: "请选择座位有效时间" }
        ]
      }
    };
    const submit = async (ref) => {
      const page = getCurrentPages()[1];
      const vm = page.$vm;
      try {
        const data = await vm.$refs[ref].validate();
        console.log(data);
        const modal = await common_vendor.index.showModal({
          title: "提示",
          content: "将创建新座位表" + baseFormData.title,
          showCancel: true
        });
        if (modal.confirm) {
          common_vendor.index.showLoading({
            title: "创建中"
          });
          loading.value = true;
          const userinfo = common_vendor.index.getStorageSync("userinfo");
          const db = common_vendor.Ws.database();
          const res = await db.collection("seat-chart").add({
            ...data,
            stuInfoVisible: data.stuInfoVisible == 0 ? true : false,
            createTime: (/* @__PURE__ */ new Date()).toJSON(),
            creator: userinfo.nickName,
            creatorId: userinfo._id,
            seats: seats.value.map((item, index) => ({
              x: item.x,
              y: item.y,
              status: seatStatus.value[index],
              index: index + 1
            }))
          });
          console.log(res);
          if (res.result.errCode == 0) {
            common_vendor.index.showToast({
              title: "创建成功",
              icon: "success"
            });
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 1e3);
          }
          common_vendor.index.hideLoading();
          loading.value = false;
        }
      } catch (e) {
        console.log(e);
        common_vendor.index.showToast({
          title: e[0].errorMessage,
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "课室信息",
          type: "line"
        }),
        b: common_vendor.o(($event) => baseFormData.title = $event),
        c: common_vendor.p({
          trim: "both",
          placeholder: "请输入标题",
          modelValue: baseFormData.title
        }),
        d: common_vendor.p({
          label: "标题（课室）",
          required: true,
          name: "title"
        }),
        e: common_vendor.o(($event) => baseFormData.note = $event),
        f: common_vendor.p({
          trim: "true",
          placeholder: "请输入备注",
          modelValue: baseFormData.note
        }),
        g: common_vendor.p({
          label: "备注",
          name: "note"
        }),
        h: common_vendor.o(($event) => baseFormData.row = $event),
        i: common_vendor.p({
          modelValue: baseFormData.row
        }),
        j: common_vendor.p({
          label: "行",
          required: true,
          name: "row"
        }),
        k: common_vendor.o(($event) => baseFormData.col = $event),
        l: common_vendor.p({
          modelValue: baseFormData.col
        }),
        m: common_vendor.p({
          label: "列",
          required: true,
          name: "col"
        }),
        n: common_vendor.o(($event) => baseFormData.selectableTimeRange = $event),
        o: common_vendor.p({
          start: common_vendor.unref(today),
          ["start-placeholder"]: common_vendor.unref(today),
          type: "daterange",
          rangeSeparator: "至",
          modelValue: baseFormData.selectableTimeRange
        }),
        p: common_vendor.p({
          required: true,
          label: "开放选择时间",
          name: "selectableTimeRange"
        }),
        q: common_vendor.o(($event) => baseFormData.effectiveTimeRange = $event),
        r: common_vendor.p({
          ["start-placeholder"]: common_vendor.unref(today),
          start: common_vendor.unref(today),
          type: "daterange",
          rangeSeparator: "至",
          modelValue: baseFormData.effectiveTimeRange
        }),
        s: common_vendor.p({
          required: true,
          label: "座位有效时间",
          name: "effectiveTimeRange"
        }),
        t: common_vendor.o(($event) => baseFormData.stuInfoVisible = $event),
        v: common_vendor.p({
          localdata: stuInfoVisible.value,
          modelValue: baseFormData.stuInfoVisible
        }),
        w: common_vendor.p({
          label: "是否允许查看其它学生信息",
          required: true,
          name: "stuInfoVisible"
        }),
        x: common_vendor.p({
          padding: "0"
        }),
        y: common_vendor.p({
          title: "座位表",
          type: "line"
        }),
        z: common_vendor.f(seats.value, (item, index, i0) => {
          return {
            a: index,
            b: seatStatus.value[index] == 1 ? 1 : "",
            c: common_vendor.o(() => seatStatus.value[index] = seatStatus.value[index] == 1 ? 2 : 1, index)
          };
        }),
        A: common_vendor.s(`--col:${baseFormData.col};--row:${baseFormData.row};`),
        B: common_vendor.p({
          padding: "0"
        }),
        C: common_vendor.o(() => submit("valiForm")),
        D: common_vendor.sr("valiForm", "05355019-0"),
        E: common_vendor.p({
          ["label-width"]: "100%",
          modelValue: baseFormData,
          ["label-position"]: "top",
          rules
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/mcct/seatchon-uniapp/pages/createSeatChart/createSeatChart.vue"]]);
wx.createPage(MiniProgramPage);
