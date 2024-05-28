<template>
  <view
    class="contaioner"
    style="transition: all 1s ease; opacity: 0"
    :style="show ? 'transition: all .5s ease; opacity: 1' : ''"
  >
    <uni-forms
      label-width="100%"
      :modelValue="baseFormData"
      label-position="top"
      :rules="rules"
      ref="valiForm"
    >
      <uni-card padding="0">
        <template v-slot:title>
          <uni-section title="课室信息" type="line"></uni-section>
        </template>
        <uni-forms-item label="标题（课室）" required name="title">
          <uni-easyinput trim="both" v-model="baseFormData.title" placeholder="请输入标题" />
        </uni-forms-item>
        <uni-forms-item label="备注" name="note">
          <uni-easyinput trim="both" v-model="baseFormData.note" placeholder="请输入备注" />
        </uni-forms-item>

        <uni-forms-item required label="开放选择时间" name="selectableTimeRange">
          <uni-datetime-picker
            :start="today"
            :start-placeholder="today"
            v-model="baseFormData.selectableTimeRange"
            type="daterange"
            rangeSeparator="至"
          />
        </uni-forms-item>
        <uni-forms-item required label="座位生效时间" name="effectiveTimeRange">
          <uni-datetime-picker
            :start-placeholder="today"
            :start="today"
            v-model="baseFormData.effectiveTimeRange"
            type="daterange"
            rangeSeparator="至"
          />
        </uni-forms-item>
        <uni-forms-item label="是否允许查看其它学生信息" required name="stuInfoVisible">
          <uni-data-checkbox v-model="baseFormData.stuInfoVisible" :localdata="stuInfoVisible" />
        </uni-forms-item>
      </uni-card>

      <uni-card class="chart-card" padding="0" style="padding-bottom: 10px">
        <template v-slot:title>
          <uni-section title="座位表" type="line"></uni-section>
        </template>
        <uni-data-checkbox
          v-if="chartType == 'edit'"
          multiple
          v-model="isResetChartCheck"
          :localdata="isResetChartData"
        ></uni-data-checkbox>
        <view v-if="chartType != 'edit' || isResetChartCheck?.includes(0)">
          <uni-forms-item label-position="left" label="行" required name="row">
            <uni-number-box v-model="baseFormData.row" />
            <!-- <uni-easyinput v-model="baseFormData.row" type="number" placeholder="请输入行数" /> -->
          </uni-forms-item>
          <uni-forms-item label="列" required name="col">
            <uni-number-box v-model="baseFormData.col" />
            <!-- <uni-easyinput v-model="baseFormData.col" type="number" placeholder="请输入列数" /> -->
          </uni-forms-item>
          <view class="seatTable" :style="`--col:${baseFormData.col};--row:${baseFormData.row};`">
            <view
              v-for="(item, index) in seats"
              :key="index"
              class="seat"
              :class="{ selected: seatStatus[index] == 1 }"
              @click="() => (seatStatus[index] = seatStatus[index] == 1 ? 2 : 1)"
            ></view>
          </view>
          <view class="tips">
            座位可选：
            <view class="seat selected"></view>
            座位不可选：
            <view class="seat hide"></view>
          </view>
        </view>
      </uni-card>
      <button class="btn" :loading="loading" type="primary" @click="() => submit('valiForm')">提交</button>
    </uni-forms>
  </view>
</template>

<script setup>
import { ref, watch, computed, reactive } from "vue";
import { onLoad, onReady } from "@dcloudio/uni-app";
const show = ref(false);
const baseFormData = reactive({
  title: "",
  note: "",
  col: "10",
  row: "11",
  stuInfoVisible: 0,
  effectiveTimeRange: [],
  selectableTimeRange: [],
});
onReady(() => {
  setTimeout(() => {
    show.value = true;
  }, 100);
})

const chartType = ref("");
const chartId = ref("");
const page = getCurrentPages().find(item => item.route === "pages/createSeatChart/createSeatChart");
onLoad(async options => {
  console.log(page);
  uni.showLoading({
    title: "加载中",
  });
  const { type, chartId: ctID } = options;
  uni.setNavigationBarTitle({
    title: type == "edit" ? "编辑课室" : "新建课室",
  });
  chartType.value = type;
  chartId.value = ctID;
  if (type == "edit") {
    const db = uniCloud.database();
    const { result } = await db
      .collection("seat-chart")
      .doc(ctID)
      .field("title,note,row,col,stuInfoVisible,effectiveTimeRange,selectableTimeRange")
      .get();
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
  uni.hideLoading();
});
const today = new Date().toJSON().substring(0, 10);

const loading = ref(false);
const seatStatus = ref([]);
const seats = computed(() => {
  const col = parseInt(baseFormData.col);
  const row = parseInt(baseFormData.row);
  // console.log(col, row);
  loading.value = true;
  let arr = [];
  seatStatus.value = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      arr.push({
        x: j + 1,
        y: i + 1,
      });
      seatStatus.value.push(1);
    }
  }
  loading.value = false;
  // console.log(seatStatus.value);
  return arr;
});

const stuInfoVisible = ref([
  { text: "允许", value: 0 },
  { text: "不允许", value: 1 },
]);

const rules = {
  title: {
    rules: [{ required: true, errorMessage: "请输入标题" }],
  },
  col: {
    rules: [
      { required: true, errorMessage: "请输入列数" },
      { format: "number", errorMessage: "请输入正确的数字" },
    ],
  },
  row: {
    rules: [
      { required: true, errorMessage: "请输入行数" },
      { format: "number", errorMessage: "请输入正确的数字" },
    ],
  },
  selectableTimeRange: {
    rules: [
      { required: true, errorMessage: "请选择开放选择时间" },
      { type: "array", errorMessage: "请选择开放选择时间" },
    ],
  },
  effectiveTimeRange: {
    rules: [
      { required: true, errorMessage: "请选择座位有效时间" },
      { type: "array", errorMessage: "请选择座位有效时间" },
    ],
  },
};
const isResetChartCheck = ref([]);
const isResetChartData = [
  {
    text: "修改座位表",
    value: 0,
  },
];
const submit = async ref => {
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
    uni.showToast({
      title: e[0].errorMessage,
      icon: "none",
    });
  }
};
const createChart = async data => {
  const modal = await uni.showModal({
    title: "提示",
    content: "将创建新课室：" + baseFormData.title,
    showCancel: true,
  });
  if (modal.confirm) {
    uni.showLoading({
      title: "创建中",
    });
    const userinfo = uni.getStorageSync("userinfo");
    const db = uniCloud.database();
    const res = await db.collection("seat-chart").add({
      ...data,
      stuInfoVisible: data.stuInfoVisible == 0 ? true : false,
      createTime: new Date().toJSON(),
      administrators: [userinfo._id],
      seats: seatFormat(),
    });
    console.log(res);
    if (res.result.errCode == 0) {
      uni.showToast({
        title: "创建成功",
        icon: "success",
      });

      setTimeout(() => {
        uni.navigateBack();
      }, 1000);
    }
    uni.hideLoading();
  }
};
const editChart = async data => {
  const modal = await uni.showModal({
    title: "提示",
    content: "将修改课室：" + baseFormData.title,
    showCancel: true,
  });
  if (!modal.confirm) return;
  if (isResetChartCheck.value.includes(0)) {
    const resetModal = await uni.showModal({
      title: "提示",
      content: "修改座位表将删除原有座位",
      showCancel: true,
    });
    if (!resetModal.confirm) return;
  }
  uni.showLoading({
    title: "修改中",
  });
  const db = uniCloud.database();
  let updateData = {
    ...data,
    stuInfoVisible: data.stuInfoVisible == 0 ? true : false,
  };
  if (isResetChartCheck.value.includes(0)) {
    updateData.seats = seatFormat();
  }
  const updateRes = await db.collection("seat-chart").doc(chartId.value).update(updateData);
  console.log(updateRes);
  if (updateRes.result.errCode == 0) {
    uni.showToast({
      title: "修改成功",
      icon: "success",
    });

    setTimeout(() => {
      uni.navigateBack();
    }, 1000);
    return;
  }
  uni.hideLoading();
};

const seatFormat = () => {
  return seats.value.map((item, index) => ({
    x: item.x,
    y: item.y,
    status: seatStatus.value[index],
    index: index + 1,
  }));
};
</script>

<style>
.contaioner {
  padding-bottom: 50px;
}
.seatTable {
  --size: calc((100vmin - 50px) / var(--col));
  width: calc(var(--size) * var(--col));
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  margin: 0 auto;
}
.refresh-btn {
  display: block;
  margin: 0;
  margin-left: auto;
}
.seat {
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #cccccc;
  width: calc(var(--size) - 5px);
  height: calc(var(--size) - 5px);
  margin: 2.5px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  font-size: calc(50vmin / var(--size));
  color: #cccccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.seat.hide {
  border: 2px solid #cccccc;
}
.seat.selected {
  border: 2px solid #3292ff;
}
.tips {
  padding: 0 2.5px;
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.tips .seat {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.btn {
  margin: 0 10px;
}
</style>
