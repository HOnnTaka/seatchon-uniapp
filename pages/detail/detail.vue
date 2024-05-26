<template>
  <view class="contaioner">
    <uni-card class="order-card" padding="0">
      <template v-slot:title>
        <uni-section title="课室信息" type="line"></uni-section>
      </template>
      <uni-list>
        <uni-list-item title="课室">
          <template v-slot:footer>
            <text>{{ chartDetail?.title }}</text>
          </template>
        </uni-list-item>
        <uni-list-item title="备注">
          <template v-slot:footer>
            <text>{{ chartDetail?.note }}</text>
          </template>
        </uni-list-item>
        <uni-list-item title="管理员">
          <template v-slot:footer>
            <text>{{ adminName }}</text>
          </template>
        </uni-list-item>
        <uni-list-item title="选座时间">
          <template v-slot:footer>
            <text>{{ chartDetail?.selectableTimeRange.join(" 至 ") }}</text>
          </template>
        </uni-list-item>
        <uni-list-item title="生效时间">
          <template v-slot:footer>
            <text>{{ chartDetail?.effectiveTimeRange.join(" 至 ") }}</text>
          </template>
        </uni-list-item>
      </uni-list>
    </uni-card>
    <uni-card class="order-card" padding="0">
      <template v-slot:title>
        <uni-section title="座位表" type="line"></uni-section>
      </template>
      <view class="seatTable" :style="`--col:${chartDetail?.col};--row:${chartDetail?.row};`">
        <view
          v-for="(item, index) in chartDetail?.seats"
          :key="index"
          class="seat"
          :class="{ hide: item.status == 2, selected: item.index == selectedItem?.index }"
          :style="
            item?.stuInfo?.id != userinfo._id
              ? `background-image:url(${item.stuInfo?.avatar});`
              : 'background:#333;'
          "
          @click="() => (selectedItem = item)"
        >
          <text>{{ item.stuInfo ? (item?.stuInfo?.id != userinfo._id ? "" : "你") : "空" }}</text>
        </view>
      </view>
      <button class="refresh-btn" @click="onrefreshBtnClick" type="default" size="mini" :loading="loading">
        刷新
      </button>
    </uni-card>

    <uni-card class="order-card" padding="0" v-if="selectedItem">
      <template v-slot:title>
        <uni-section title="座位信息" type="line"></uni-section>
      </template>
      <view class="detail">
        <uni-list-item title="座位">
          <template v-slot:footer>
            <text>第{{ selectedItem?.x }}列 第{{ selectedItem?.y }}行</text>
          </template>
        </uni-list-item>
        <view v-if="selectedItem?.stuInfo && (chartDetail.stuInfoVisible || userinfo.type == 1)">
          <uni-list-item title="姓名">
            <template v-slot:footer>
              <text>{{ selectedItem?.stuInfo?.name }}</text>
            </template>
          </uni-list-item>
          <uni-list-item title="学号">
            <template v-slot:footer>
              <text>{{ selectedItem?.stuInfo?.id }}</text>
            </template>
          </uni-list-item>
          <uni-list-item title="班级">
            <template v-slot:footer>
              <text>{{ selectedItem?.stuInfo?.class }}</text>
            </template>
          </uni-list-item>
        </view>
        <uni-list-item v-if="selectedItem?.selectTime" title="选择时间">
          <template v-slot:footer>
            <uni-dateformat
              :date="new Date(selectedItem?.selectTime) - 30000"
              format="M月d日 h时m分"
              :threshold="[0, 3600000]"
            ></uni-dateformat>
          </template>
        </uni-list-item>
      </view>
    </uni-card>

    <view class="btns">
      <button
        v-if="avaliable()"
        class="btn"
        @click="onSelectBtnClick"
        :disabled="(selectedItem?.status == 3 && selectedItem?.stuInfo?.id != userinfo._id) || !selectedItem"
        :type="selectedItem?.stuInfo?.id == userinfo._id ? 'warn' : 'primary'"
        :loading="loading"
      >
        {{
          selectedItem?.stuInfo?.id == userinfo._id
            ? "撤销选座"
            : selectedItem?.status == 3
            ? "已被选择"
            : "选择座位"
        }}
      </button>
      <button v-else class="btn" disabled>未开放</button>
    </view>

    <view @click="() => (showDrawer = false)" class="drawer" :class="{ hide: !showDrawer }">
      <view @click.stop.prevent class="drawer-content">
        <view class="title">{{ isSelectSubmit ? "将使用以下信息选座：" : "将撤销以下选座：" }}</view>
        <uni-card class="roomInfo">
          <template v-slot:title>
            <uni-section title="课室信息" type="line"></uni-section>
          </template>
          <uni-list-item title="课室">
            <template v-slot:footer>
              <text>{{ chartDetail?.title }}</text>
            </template>
          </uni-list-item>
          <uni-list-item title="座位">
            <template v-slot:footer>
              <text>第{{ selectedItem?.x }}列 第{{ selectedItem?.y }}行</text>
            </template>
          </uni-list-item>
          <uni-list-item title="生效时间">
            <template v-slot:footer>
              <text>{{ chartDetail?.effectiveTimeRange.join(" 至 ") }}</text>
            </template>
          </uni-list-item>
        </uni-card>
        <uni-card padding="0">
          <template v-slot:title>
            <uni-section title="学生信息" type="line"></uni-section>
          </template>
          <uni-list-item title="学号" :link="userinfo.type == 1">
            <template v-slot:footer>
              <text>{{ userinfo._id }}</text>
            </template>
          </uni-list-item>
          <uni-list-item title="姓名" :link="userinfo.type == 1">
            <template v-slot:footer>
              <text>{{ userinfo.name }}</text>
            </template>
          </uni-list-item>
          <uni-list-item title="班级" :link="userinfo.type == 1">
            <template v-slot:footer>
              <text>{{ userinfo.class }}</text>
            </template>
          </uni-list-item>
        </uni-card>
        <button @click="onSubmitBtnClick" :type="isSelectSubmit ? 'primary' : 'warn'" :loading="loading">
          确认
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onShow, onReady, onPullDownRefresh } from "@dcloudio/uni-app";

const selectedItem = ref(null);
const chartId = ref(null);
const chartDetail = ref();
const loading = ref(false);
const userinfo = ref(uni.getStorageSync("userinfo"));
const showDrawer = ref(false);
const isSelectSubmit = ref(true);

const show = ref(false);
onLoad(async option => {
  chartId.value = option.chartId;
  await getChartDetail(option.chartId);
  show.value = true;
  uni.hideLoading();
});
onShow(async () => {
  userinfo.value = uni.getStorageSync("userinfo");
});
onReady(() => {});

onPullDownRefresh(async () => {
  await getChartDetail(chartId.value);
  uni.stopPullDownRefresh();
  uni.showToast({
    title: "刷新成功",
    icon: "success",
  });
});

const getChartDetail = async id => {
  loading.value = true;
  const db = uniCloud.database();
  const { result } = await db.collection("seat-chart").doc(id).get();
  // console.log(result);
  chartDetail.value = result.data[0];
  uni.setNavigationBarTitle({
    title: chartDetail.value.title,
  });
  await getAdminName();
  loading.value = false;
};
const adminName = ref("");
const getAdminName = async () => {
  if (!chartDetail.value?.administrator) return "";
  const db = uniCloud.database();
  const { result } = await db
    .collection("user")
    .where({
      _id: db.command.in(chartDetail.value.administrator),
    })
    .field("name")
    .get();
  adminName.value = result.data.map(item => item.name).join("、");
};
const avaliable = () => {
  if (!chartDetail.value) return false;
  const selectableTimeRange = chartDetail.value?.selectableTimeRange;
  const now = new Date().getTime();
  const start = new Date(selectableTimeRange[0]).getTime();
  const end = new Date(selectableTimeRange[1]).getTime();
  return start <= now && now <= end;
};
const onrefreshBtnClick = async (showToast = true) => {
  await getChartDetail(chartId.value);
  if (showToast) {
    uni.showToast({
      title: "刷新成功",
      icon: "success",
    });
  }
  selectedItem.value = chartDetail.value.seats[selectedItem.value?.index - 1];
};
const onSelectBtnClick = async () => {
  const { stuInfo } = userinfo.value;
  // if (stuInfo.class == "" || stuInfo.id == "" || stuInfo.name == "") {
  //   const { confirm } = await uni.showModal({
  //     title: "提示",
  //     content: "请先填写个人信息",
  //     confirmText: "去填写",
  //     mask: true,
  //   });
  //   if (!confirm) return;
  //   return uni.switchTab({
  //     url: "/pages/user/user",
  //   });
  // }
  isSelectSubmit.value = selectedItem.value.stuInfo?.id != userinfo.value._id;
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
      orderId: selectedItem.value.orderId,
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
  --size: calc((100vmin - 50px) / var(--col));
  width: calc(var(--size) * var(--col));
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  margin: 0 auto;
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
  opacity: 0;
  pointer-events: none;
}
.seat.selected {
  border: 2px solid #3292ff;
}
.btns {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
}
.btn {
  margin: 0;
  z-index: 100;
  flex: 1;
  border-radius: 0;
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
  padding: 10px;
  width: calc(100% - 20px);
  border-radius: 10px 10px 0 0;
}
.title {
  font-size: 20px;
  margin: 10px;
  text-align: center;
}
.roomInfo,
.userinfo {
  color: #666;
}
.drawer button {
  margin: 0 10px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.08);
}
</style>
