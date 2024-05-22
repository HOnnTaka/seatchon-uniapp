"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_group2 = common_vendor.resolveComponent("uni-group");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_datetime_picker2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2 + _easycom_uni_group2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_group = () => "../../uni_modules/uni-group/components/uni-group/uni-group.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_datetime_picker + _easycom_uni_data_checkbox + _easycom_uni_forms + _easycom_uni_group)();
}
const _sfc_main = {
  __name: "createSeatChart",
  setup(__props) {
    common_vendor.onLoad(() => {
    });
    const today = (/* @__PURE__ */ new Date()).toJSON().substring(0, 10);
    const baseFormData = common_vendor.ref({
      title: "",
      note: "",
      col: "10",
      row: "11",
      stuInfoVisible: 0,
      effectiveTimeRange: [],
      selectableTimeRange: []
    });
    const stuInfoVisible = common_vendor.ref([
      { text: "允许", value: 0 },
      { text: "不允许", value: 1 }
    ]);
    const rules = {
      col: [
        { required: true, message: "请输入列数", trigger: "blur" },
        { type: "number", message: "请输入正确的数字", trigger: "blur" }
      ],
      row: [
        { required: true, message: "请输入行数", trigger: "blur" },
        { type: "number", message: "请输入正确的数字", trigger: "blur" }
      ]
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => baseFormData.value.title = $event),
        b: common_vendor.p({
          placeholder: "请输入标题",
          modelValue: baseFormData.value.title
        }),
        c: common_vendor.p({
          label: "标题（课室）",
          required: true
        }),
        d: common_vendor.o(($event) => baseFormData.value.note = $event),
        e: common_vendor.p({
          placeholder: "请输入备注",
          modelValue: baseFormData.value.note
        }),
        f: common_vendor.p({
          label: "备注"
        }),
        g: common_vendor.o(($event) => baseFormData.value.row = $event),
        h: common_vendor.p({
          type: "number",
          placeholder: "请输入行数",
          modelValue: baseFormData.value.row
        }),
        i: common_vendor.p({
          label: "行",
          required: true
        }),
        j: common_vendor.o(($event) => baseFormData.value.col = $event),
        k: common_vendor.p({
          type: "number",
          placeholder: "请输入列数",
          modelValue: baseFormData.value.col
        }),
        l: common_vendor.p({
          label: "列",
          required: true
        }),
        m: common_vendor.o(($event) => baseFormData.value.selectableTimeRange = $event),
        n: common_vendor.p({
          start: common_vendor.unref(today),
          ["start-placeholder"]: common_vendor.unref(today),
          type: "daterange",
          rangeSeparator: "至",
          modelValue: baseFormData.value.selectableTimeRange
        }),
        o: common_vendor.p({
          required: true,
          label: "开放选择时间"
        }),
        p: common_vendor.o(($event) => baseFormData.value.effectiveTimeRange = $event),
        q: common_vendor.p({
          ["start-placeholder"]: common_vendor.unref(today),
          start: common_vendor.unref(today),
          type: "daterange",
          rangeSeparator: "至",
          modelValue: baseFormData.value.effectiveTimeRange
        }),
        r: common_vendor.p({
          required: true,
          label: "座位有效时间"
        }),
        s: common_vendor.o(($event) => baseFormData.value.stuInfoVisible = $event),
        t: common_vendor.p({
          localdata: stuInfoVisible.value,
          modelValue: baseFormData.value.stuInfoVisible
        }),
        v: common_vendor.p({
          label: "是否允许查看其它学生信息",
          required: true
        }),
        w: common_vendor.sr("baseForm", "03a545ff-2,03a545ff-1"),
        x: common_vendor.p({
          ["label-width"]: "100%",
          modelValue: baseFormData.value,
          ["label-position"]: "top",
          validateTrigger: "bind",
          rules
        }),
        y: common_vendor.p({
          title: "基本用法",
          type: "line"
        }),
        z: common_vendor.p({
          title: "课室信息",
          mode: "card"
        }),
        A: common_vendor.f(baseFormData.value.col * baseFormData.value.row, (item, index, i0) => {
          var _a;
          return {
            a: index,
            b: item.status == 2 ? 1 : "",
            c: item.index == ((_a = _ctx.selectedItem) == null ? void 0 : _a.index) ? 1 : "",
            d: common_vendor.o(() => _ctx.selectedItem = item, index)
          };
        }),
        B: common_vendor.s("--size:" + Math.max(baseFormData.value.col, baseFormData.value.row) + ";"),
        C: common_vendor.o((...args) => _ctx.onrefreshBtnClick && _ctx.onrefreshBtnClick(...args)),
        D: _ctx.loading,
        E: common_vendor.p({
          title: "座位表",
          mode: "card"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/seatchon-uniapp/pages/createSeatChart/createSeatChart.vue"]]);
wx.createPage(MiniProgramPage);
