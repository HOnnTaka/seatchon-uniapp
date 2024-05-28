<template>
  <view
    class="container"
    style="transition: all 1s ease; opacity: 0"
    :style="show ? 'transition: all .5s ease; opacity: 1' : ''"
  >
    <view class="search-bar">
      <uni-search-bar
        bgColor="#fff"
        @confirm="search"
        v-model="searchValue"
        placeholder="请输入搜索内容"
      ></uni-search-bar>
    </view>
    <uni-fab
      v-if="userinfo.type == 1"
      ref="fab"
      :pattern="{ buttonColor: '#2979ff' }"
      horizontal="right"
      vertical="bottom"
      @fabClick="fabClick"
    />
    <template v-slot:title>
      <uni-section title="全部课室" type="line"></uni-section>
    </template>
    <unicloud-db
      ref="udb"
      :options="options"
      v-slot:default="{ data, loading, hasMore, error, options }"
      collection="seat-chart"
      orderby="createdTime desc"
    >
      <view v-if="error" class="error">{{ error.message }},下拉刷新试试？</view>
      <uni-list>
        <uni-list-item
          v-for="(item, index) in data"
          :key="item._id"
          clickable
          link
          @click="onItemClick(item)"
          :title="item.title"
          :note="item.note"
        >
          <template v-slot:header>
            <view class="item-header"></view>
          </template>
          <template v-slot:body>
            <view class="item-body">
              <view class="item-content">
                <text class="item-title">{{ item.title }}</text>
                <text class="item-note">{{ item.note }}</text>
              </view>
              <view class="item-time">
                <text>选座：{{ formatTimeRange(item.selectableTimeRange) }}</text>
                <text>生效：{{ formatTimeRange(item.effectiveTimeRange) }}</text>
              </view>
            </view>
          </template>
          <template v-slot:footer>
            <view class="item-footer">
              {{ available(item) }}
            </view>
          </template>
        </uni-list-item>
      </uni-list>
      <uni-load-more :status="loading ? 'loading' : hasMore ? 'default' : 'no-more'"></uni-load-more>
    </unicloud-db>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onShow, onReady, onHide, onPullDownRefresh } from "@dcloudio/uni-app";
const page = getCurrentPages().find(item => item.route === "pages/index/index");
const searchValue = ref("");
const charts = ref([]);
const userinfo = ref({});
const show = ref(false);
onLoad(async () => {});
onShow(async () => {
  userinfo.value = uni.getStorageSync("userinfo");
  page.$vm.$refs.udb?.loadData({ clear: true });
  setTimeout(() => {
    show.value = true;
  }, 100);
});

onHide(async () => {
  show.value = false;
});
onPullDownRefresh(async () => {
  await page.$vm.$refs.udb?.loadData({ clear: true });
  uni.stopPullDownRefresh();
});

const formatTimeRange = timeRange => {
  return timeRange.join(" 至 ");
};
const available = item => {
  const now = new Date().getTime();
  const { selectableTimeRange, effectiveTimeRange } = item;
  const selectTimeRange = [
    new Date(selectableTimeRange[0]).getTime(),
    new Date(selectableTimeRange[1]).getTime(),
  ];
  const effectTimeRange = [
    new Date(effectiveTimeRange[0]).getTime(),
    new Date(effectiveTimeRange[1]).getTime(),
  ];
  if (now > effectTimeRange[0] && now < effectTimeRange[1]) return "生效中";
  if (now > selectTimeRange[0] && now < selectTimeRange[1]) return "选座中";
  if (now < selectTimeRange[0]) return "未开始";
  if (now > effectTimeRange[1]) return "已结束";
};

const search = async () => {};
const onItemClick = async item => {
  if (!userinfo.value) {
    const confirm = await uni.showModal({
      title: "提示",
      content: "还未登录，是否前往登录？",
      showCancel: true,
      confirmText: "前往登录",
    });

    if (confirm.confirm) {
      uni.switchTab({
        url: "/pages/user/user",
      });
    }
    return;
  }
  uni.showLoading({
    title: "加载中",
  });
  uni.navigateTo({
    url: `/pages/detail/detail?chartId=${item._id}`,
  });
};

const fabClick = () => {
  uni.navigateTo({
    url: "/pages/createSeatChart/createSeatChart",
  });
};
</script>

<style scoped lang="scss">
.containeer {
  font-size: 14px;
}

.search-bar {
  background: #f8f8f8;
}

.chart-list {
  padding: 0 !important;
  height: calc(100vh - var(--window-bottom) - var(--window-top) - 56px - 30px);
}
.item-title {
  color: #333;
  font-size: 24px;
  // font-weight: bold;
}
.item-header {
  background: #2979ff;
  width: 5px;
  margin-right: 10px;
  margin-top: 4px;
  border-radius: 5px;
  height: 25px;
  display: flex;
}
.error {
  padding: 10px;
  text-align: center;
  background: #ff7626;
}
.item-note {
  color: #666;
  font-size: 12px;
  margin-left: 5px;
}
.item-content {
  margin-bottom: 5px;
}
.item-time {
  font-size: 12px;
  color: #666;
  display: flex;
  flex-direction: column;
}

.item-footer {
  align-self: center;
  margin-left: auto;
  color: #666;
}
.item-footer > view {
  font-size: 12px;
}
</style>
