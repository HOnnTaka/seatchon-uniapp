<template>
  <view class="contaioner">
    <uni-group class="chartDetaill" title="课室信息" mode="card">
      <view>备注：{{ chartDetail?.note }}</view>
      <view>选座时间：{{ chartDetail?.selectableTime }}</view>
      <view>有效时间：{{ chartDetail?.effectiveTime }}</view>
    </uni-group>

    <uni-group class="seat-group" title="座位表" mode="card">
      <view class="seatTable" :style="'--size:' + Math.max(chartDetail?.col, chartDetail?.row) + ';'">
        <view
          v-for="(item, index) in chartDetail?.seats"
          :key="index"
          class="seat"
          :class="{ hide: item.status == 2, selected: item.index == selectedItem?.index }"
          :style="item.stuInfo ? `background-image:url(${item.stuInfo?.avatar});` : ''"
          @click="() => (selectedItem = item)"
        >
          <text>{{ item.stuInfo ? (item?.stuInfo?.openid != userinfo._openid ? "" : "你") : "空" }}</text>
        </view>
      </view>
      <button class="refresh-btn" @click="onrefreshBtnClick" type="default" size="mini" :loading="loading">
        刷新
      </button>
    </uni-group>

    <uni-group class="detail-group" title="座位信息" mode="card" v-if="selectedItem">
      <view class="detail">
        <view>座位：第{{ selectedItem?.x }}列 第{{ selectedItem?.y }}行</view>
        <view v-if="selectedItem?.stuInfo && (chartDetail.stuInfoVisible || userinfo.type == 1)">
          <view>姓名：{{ selectedItem?.stuInfo?.name }}</view>
          <view>学号：{{ selectedItem?.stuInfo?.id }}</view>
          <view>班级：{{ selectedItem?.stuInfo?.class }}</view>
        </view>
        <view v-if="selectedItem?.selectTime">
          选择时间：
          <uni-dateformat
            :date="new Date(selectedItem?.selectTime) - 30000"
            format="M月d日 h时m分"
            :threshold="[0, 3600000]"
          ></uni-dateformat>
        </view>
      </view>
    </uni-group>

    <button
      class="btn"
      @click="onSelectBtnClick"
      :disabled="
        (selectedItem?.status == 3 && selectedItem?.stuInfo?.openid != userinfo._openid) || !selectedItem
      "
      :type="selectedItem?.stuInfo?.openid == userinfo._openid ? 'warn' : 'primary'"
      :loading="loading"
    >
      {{
        selectedItem?.stuInfo?.openid == userinfo._openid
          ? "撤销选座"
          : selectedItem?.status == 3
          ? "已被选择"
          : "选择座位"
      }}
    </button>

    <view @click="() => (showDrawer = false)" class="drawer" :class="{ hide: !showDrawer }">
      <view @click.stop.prevent class="drawer-content">
        <view class="title">{{ isSelectSubmit ? "将使用以下信息选座：" : "将撤销以下选座：" }}</view>
        <uni-group mode="card" class="roomInfo">
          <view>课室：{{ chartDetail?.title }}</view>
          <view>座位：第{{ selectedItem?.x }}列 第{{ selectedItem?.y }}行</view>
          <view>有效时间：{{ chartDetail?.effectiveTime }}</view>
        </uni-group>
        <uni-group mode="card" class="userinfo">
          <view>姓名：{{ userinfo.stuInfo.name }}</view>
          <view>学号：{{ userinfo.stuInfo.id }}</view>
          <view>班级：{{ userinfo.stuInfo.class }}</view>
        </uni-group>

        <button @click="onSubmitBtnClick" :type="isSelectSubmit ? 'primary' : 'warn'" :loading="loading">
          确认
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const selectedItem = ref(null);
const chartId = ref(null);
const chartDetail = ref();
const loading = ref(false);
const userinfo = ref(getApp().globalData.userinfo);
const showDrawer = ref(false);
const isSelectSubmit = ref(true);

onLoad(async option => {
  chartId.value = option.chartId;
  await getChartDetail(option.chartId);
});

const getChartDetail = async id => {
  loading.value = true;
  const db = uniCloud.database();
  const { result } = await db.collection("seat-chart").doc(id).get();
  console.log(result);
  chartDetail.value = result.data[0];
  uni.setNavigationBarTitle({
    title: chartDetail.value.title,
  });
  loading.value = false;
};
const onrefreshBtnClick = async (showToast = true) => {
  if (showToast) {
    uni.showToast({
      title: "加载中",
      icon: "loading",
      mask: true,
    });
  }
  await getChartDetail(chartId.value);
  selectedItem.value = chartDetail.value.seats[selectedItem.value.index - 1];
  if (showToast) {
    uni.showToast({
      title: "刷新成功",
      icon: "success",
    });
  }
};
const onSelectBtnClick = () => {
  isSelectSubmit.value = selectedItem.value.stuInfo?.openid != userinfo.value._openid;
  showDrawer.value = true;
};
const onSubmitBtnClick = async () => {
  uni.showLoading({
    title: "加载中",
    mask: true,
  });
  const { result } = await uniCloud.callFunction({
    name: "select-seat",
    data: {
      chartId: chartId.value,
      seatIndex: selectedItem.value.index,
      userinfo: userinfo.value,
      isSelectSubmit: isSelectSubmit.value,
    },
  });
  showDrawer.value = false;
  if (result.code == 200) {
    uni.showToast({
      title: "选座成功",
      icon: "success",
    });
  } else if (result.code == 201) {
    uni.showToast({
      title: "撤销成功",
      icon: "success",
    });
  } else {
    uni.showToast({
      title: result.message,
      icon: "error",
    });
  }
  onrefreshBtnClick(false);
};

const revocation = async () => {};
</script>

<style scoped>
.contaioner {
  padding-bottom: 65px;
}
.seat-group {
  position: relative;
}
.chartDetaill {
  color: #999;
  font-size: 14px;
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

.drawer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #00000020;
  z-index: 200;
  inset: 0;
  transition: all 0.3s ease-in-out;
}
.drawer.hide {
  opacity: 0;
  pointer-events: none;
}
.drawer.hide .drawer-content {
  transform: translateY(100%);
}
.drawer-content {
  transition: all 0.3s 0.3s;
  background: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  border-radius: 10px 10px 0 0;
}
.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 10px;
}
.drawer button {
  margin: 0 10px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.08);
}
</style>
