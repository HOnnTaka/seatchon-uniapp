"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_section2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_datetime_picker2 + _easycom_uni_data_checkbox2 + _easycom_uni_card2 + _easycom_uni_number_box2 + _easycom_uni_forms2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_datetime_picker + _easycom_uni_data_checkbox + _easycom_uni_card + _easycom_uni_number_box + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "createSeatChart",
  setup(__props) {
    const show = common_vendor.ref(false);
    const baseFormData = common_vendor.reactive({
      title: "",
      note: "",
      col: "10",
      row: "11",
      stuInfoVisible: 0,
      effectiveTimeRange: [],
      selectableTimeRange: []
    });
    common_vendor.onReady(() => {
      setTimeout(() => {
        show.value = true;
      }, 100);
    });
    const chartType = common_vendor.ref("");
    const chartId = common_vendor.ref("");
    const page = getCurrentPages().find((item) => item.route === "pages/createSeatChart/createSeatChart");
    common_vendor.onLoad(async (options) => {
      console.log(page);
      common_vendor.index.showLoading({
        title: "加载中"
      });
      const { type, chartId: ctID } = options;
      common_vendor.index.setNavigationBarTitle({
        title: type == "edit" ? "编辑课室" : "新建课室"
      });
      chartType.value = type;
      chartId.value = ctID;
      if (type == "edit") {
        const db = common_vendor.Ws.database();
        const { result } = await db.collection("seat-chart").doc(ctID).field("title,note,row,col,stuInfoVisible,effectiveTimeRange,selectableTimeRange").get();
        const chart = result.data[0];
        console.log(result.data[0], baseFormData);
        baseFormData.title = chart.title;
        baseFormData.note = chart.note;
        baseFormData.col = chart.col;
        baseFormData.row = chart.row;
        baseFormData.stuInfoVisible = chart.stuInfoVisible ? 0 : 1;
        baseFormData.effectiveTimeRange = chart.effectiveTimeRange;
        baseFormData.selectableTimeRange = chart.selectableTimeRange;
      }
      common_vendor.index.hideLoading();
    });
    const today = (/* @__PURE__ */ new Date()).toJSON().substring(0, 10);
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
    const isResetChartCheck = common_vendor.ref([]);
    const isResetChartData = [
      {
        text: "修改座位表",
        value: 0
      }
    ];
    const submit = async (ref) => {
      const vm = page.$vm;
      try {
        const data = await vm.$refs[ref].validate();
        console.log(data);
        loading.value = true;
        if (chartType.value == "edit") {
          await editChart(data);
        } else {
          await createChart(data);
        }
        loading.value = false;
      } catch (e) {
        console.log(e);
        common_vendor.index.showToast({
          title: e[0].errorMessage,
          icon: "none"
        });
      }
    };
    const createChart = async (data) => {
      const modal = await common_vendor.index.showModal({
        title: "提示",
        content: "将创建新课室：" + baseFormData.title,
        showCancel: true
      });
      if (modal.confirm) {
        common_vendor.index.showLoading({
          title: "创建中"
        });
        const userinfo = common_vendor.index.getStorageSync("userinfo");
        const db = common_vendor.Ws.database();
        const res = await db.collection("seat-chart").add({
          ...data,
          stuInfoVisible: data.stuInfoVisible == 0 ? true : false,
          createTime: (/* @__PURE__ */ new Date()).toJSON(),
          administrators: [userinfo._id],
          seats: seatFormat()
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
      }
    };
    const editChart = async (data) => {
      const modal = await common_vendor.index.showModal({
        title: "提示",
        content: "将修改课室：" + baseFormData.title,
        showCancel: true
      });
      if (!modal.confirm)
        return;
      const db = common_vendor.Ws.database();
      if (isResetChartCheck.value.includes(0)) {
        const resetModal = await common_vendor.index.showModal({
          title: "提示",
          content: "修改座位表将删除原有座位",
          showCancel: true
        });
        if (!resetModal.confirm)
          return;
        const removeOrderRes = await db.collection("order").where({
          chartId: chartId.value
        }).remove();
        console.log(removeOrderRes);
      }
      common_vendor.index.showLoading({
        title: "修改中"
      });
      let updateData = {
        ...data,
        stuInfoVisible: data.stuInfoVisible == 0 ? true : false
      };
      if (isResetChartCheck.value.includes(0)) {
        updateData.seats = seatFormat();
      }
      const updateRes = await db.collection("seat-chart").doc(chartId.value).update(updateData);
      console.log(updateRes);
      if (updateRes.result.errCode == 0) {
        common_vendor.index.showToast({
          title: "修改成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1e3);
        return;
      }
      common_vendor.index.hideLoading();
    };
    const seatFormat = () => {
      return seats.value.map((item, index) => ({
        x: item.x,
        y: item.y,
        status: seatStatus.value[index],
        index: index + 1
      }));
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
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
          trim: "both",
          placeholder: "请输入备注",
          modelValue: baseFormData.note
        }),
        g: common_vendor.p({
          label: "备注",
          name: "note"
        }),
        h: common_vendor.o(($event) => baseFormData.selectableTimeRange = $event),
        i: common_vendor.p({
          start: common_vendor.unref(today),
          ["start-placeholder"]: common_vendor.unref(today),
          type: "daterange",
          rangeSeparator: "至",
          modelValue: baseFormData.selectableTimeRange
        }),
        j: common_vendor.p({
          required: true,
          label: "开放选择时间",
          name: "selectableTimeRange"
        }),
        k: common_vendor.o(($event) => baseFormData.effectiveTimeRange = $event),
        l: common_vendor.p({
          ["start-placeholder"]: common_vendor.unref(today),
          start: common_vendor.unref(today),
          type: "daterange",
          rangeSeparator: "至",
          modelValue: baseFormData.effectiveTimeRange
        }),
        m: common_vendor.p({
          required: true,
          label: "座位生效时间",
          name: "effectiveTimeRange"
        }),
        n: common_vendor.o(($event) => baseFormData.stuInfoVisible = $event),
        o: common_vendor.p({
          localdata: stuInfoVisible.value,
          modelValue: baseFormData.stuInfoVisible
        }),
        p: common_vendor.p({
          label: "是否允许查看其它学生信息",
          required: true,
          name: "stuInfoVisible"
        }),
        q: common_vendor.p({
          padding: "10px"
        }),
        r: common_vendor.p({
          title: "座位表",
          type: "line"
        }),
        s: chartType.value == "edit"
      }, chartType.value == "edit" ? {
        t: common_vendor.o(($event) => isResetChartCheck.value = $event),
        v: common_vendor.p({
          multiple: true,
          localdata: isResetChartData,
          modelValue: isResetChartCheck.value
        })
      } : {}, {
        w: chartType.value != "edit" || ((_a = isResetChartCheck.value) == null ? void 0 : _a.includes(0))
      }, chartType.value != "edit" || ((_b = isResetChartCheck.value) == null ? void 0 : _b.includes(0)) ? {
        x: common_vendor.o(($event) => baseFormData.row = $event),
        y: common_vendor.p({
          modelValue: baseFormData.row
        }),
        z: common_vendor.p({
          ["label-position"]: "left",
          label: "行",
          required: true,
          name: "row"
        }),
        A: common_vendor.o(($event) => baseFormData.col = $event),
        B: common_vendor.p({
          modelValue: baseFormData.col
        }),
        C: common_vendor.p({
          label: "列",
          required: true,
          name: "col"
        }),
        D: common_vendor.f(seats.value, (item, index, i0) => {
          return {
            a: index,
            b: seatStatus.value[index] == 1 ? 1 : "",
            c: common_vendor.o(() => seatStatus.value[index] = seatStatus.value[index] == 1 ? 2 : 1, index)
          };
        }),
        E: common_vendor.s(`--col:${baseFormData.col};--row:${baseFormData.row};`)
      } : {}, {
        F: common_vendor.p({
          padding: "10px"
        }),
        G: loading.value,
        H: common_vendor.o(() => submit("valiForm")),
        I: common_vendor.sr("valiForm", "05355019-0"),
        J: common_vendor.p({
          ["label-width"]: "100%",
          modelValue: baseFormData,
          ["label-position"]: "top",
          rules
        }),
        K: common_vendor.s(show.value ? "transition: all .5s ease; opacity: 1" : "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/mcct/seatchon-uniapp/pages/createSeatChart/createSeatChart.vue"]]);
wx.createPage(MiniProgramPage);
