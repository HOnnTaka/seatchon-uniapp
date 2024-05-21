<template>
  <view class="contaioner">
    <uni-group title="座位表" mode="card">
      <view class="seatTable" :style="'--size:' + Math.max(chartDetail?.col, chartDetail?.row) + ';'">
        <view
          v-for="(item, index) in chartDetail?.seats"
          :key="index"
          class="seat"
          :class="{ hide: item.status == 2, selected: item.index == selectedItem?.index }"
          :style="item.stuInfo ? `background:url(${item.stuInfo?.avator})` : ''"
          @click="() => (selectedItem = item)"
        ></view>
      </view>
    </uni-group>

    <uni-group title="座位信息" mode="card">
      <view class="detail">
        <text>第{{selectedItem?.y}}行</text>
        <text>第{{selectedItem?.x}}列</text>
		<button :disabled="selectedItem?.status == 3" type="primary" loading="true">选择座位</button>
      </view>
    </uni-group>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const selectedItem = ref(null);
const chartDetail = ref();

onLoad(async option => {
  console.log(option);
  await getChartDetail(option.chartId);
  uni.setNavigationBarTitle({
    title: chartDetail.value.title,
  });
});

const getChartDetail = async id => {
  const db = uniCloud.database();
  const { result } = await db.collection("seat-chart").doc(id).get();
  console.log(result);
  chartDetail.value = result.data[0];
};

// for (let i = 1; i < chartDetail.value.row + 1; i++) {
// 	for (let j = 1; j < chartDetail.value.col + 1; j++) {
// 		chartDetail.value.seats.push({
// 			x: i,
// 			y: j,
// 			disable: false
// 		});
// 		console.log(i);
// 	}
// }
</script>

<style scoped>
.seatTable {
  width: calc(100vmin - 50px);
  height: calc(100vmin - 50px);
  display: flex;
  flex-wrap: wrap;
  background: #fff;
}
.seat {
  box-sizing: border-box;
  border-radius: 5px;
  border: 0.5px solid #ccc;
  width: calc(100% / var(--size) - 5px);
  height: calc(100% / var(--size) - 5px);
  margin: 2.5px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}
.seat.hide {
  opacity: 0;
  pointer-events: none;
}
.seat.selected {
  border: 2px solid #3292ff;
}
</style>
