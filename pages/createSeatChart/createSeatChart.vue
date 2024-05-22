<template>
  <view class="contaioner">
    <uni-group class="detail-group" title="课室信息" mode="card">
      <uni-forms title="基本用法" type="line">
        <uni-forms
          label-width="100%"
          ref="baseForm"
          :modelValue="baseFormData"
          label-position="top"
          validateTrigger="bind"
          :rules="rules"
        >
          <uni-forms-item label="标题（课室）" required>
            <uni-easyinput v-model="baseFormData.title" placeholder="请输入标题" />
          </uni-forms-item>
          <uni-forms-item label="备注">
            <uni-easyinput v-model="baseFormData.note" placeholder="请输入备注" />
          </uni-forms-item>
          <uni-forms-item label="行" required>
            <uni-easyinput v-model="baseFormData.row" type="number" placeholder="请输入行数" />
          </uni-forms-item>
          <uni-forms-item label="列" required>
            <uni-easyinput v-model="baseFormData.col" type="number" placeholder="请输入列数" />
          </uni-forms-item>
          <uni-forms-item required label="开放选择时间">
            <uni-datetime-picker
              :start="today"
              :start-placeholder="today"
              v-model="baseFormData.selectableTimeRange"
              type="daterange"
              rangeSeparator="至"
            />
          </uni-forms-item>
          <uni-forms-item required label="座位有效时间">
            <uni-datetime-picker
              :start-placeholder="today"
              :start="today"
              v-model="baseFormData.effectiveTimeRange"
              type="daterange"
              rangeSeparator="至"
            />
          </uni-forms-item>
          <uni-forms-item label="是否允许查看其它学生信息" required>
            <uni-data-checkbox v-model="baseFormData.stuInfoVisible" :localdata="stuInfoVisible" />
          </uni-forms-item>
        </uni-forms>
      </uni-forms>
    </uni-group>
    <uni-group class="seat-group" title="座位表" mode="card">
      <view class="seatTable" :style="'--size:' + Math.max(baseFormData.col, baseFormData.row) + ';'">
        <view
          v-for="(item, index) in baseFormData.col * baseFormData.row"
          :key="index"
          class="seat"
          :class="{ hide: item.status == 2, selected: item.index == selectedItem?.index }"
          @click="() => (selectedItem = item)"
        >
        </view>
      </view>
      <button class="refresh-btn" @click="onrefreshBtnClick" type="default" size="mini" :loading="loading">
        刷新
      </button>
    </uni-group>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

onLoad(() => {});
const today = new Date().toJSON().substring(0, 10);
const baseFormData = ref({
  title: "",
  note: "",
  col: "10",
  row: "11",
  stuInfoVisible: 0,
  effectiveTimeRange: [],
  selectableTimeRange: [],
});

const stuInfoVisible = ref([
  { text: "允许", value: 0 },
  { text: "不允许", value: 1 },
]);

const rules = {
  col: [
    { required: true, message: "请输入列数", trigger: "blur" },
    { type: "number", message: "请输入正确的数字", trigger: "blur" },
  ],
  row: [
    { required: true, message: "请输入行数", trigger: "blur" },
    { type: "number", message: "请输入正确的数字", trigger: "blur" },
  ],
};
</script>

<style>
.contaioner {
  padding-bottom: 50px;
}
.seat-group {
  position: relative;
}
.seatTable {
  width: calc(100vmin - 50px);
  height: calc(100vmin - 50px);
  display: flex;
  flex-wrap: wrap;
  background: #fff;
}
.refresh-btn {
  margin-left: auto;
  align-self: flex-end;
  float: right;
  margin: 10px 2.5px;
}
.seat {
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #eeeeee;
  width: calc(100% / var(--size) - 5px);
  height: calc(100% / var(--size) - 5px);
  margin: 2.5px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  font-size: calc(50vmin / var(--size));
  color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.seat.hide {
  opacity: 0;
  pointer-events: none;
}
.seat.selected {
  border: 2px solid #3292ff;
}
.btn {
  position: fixed;
  bottom: 20px;
  left: 10px;
  z-index: 100;
  gap: 10px;
  width: calc(100% - 20px);
  backdrop-filter: blur(10px);
}
</style>
