<template>
  <view
    class="container"
    style="transition: all 1s ease; opacity: 0"
    :style="show ? 'transition: all .5s ease; opacity: 1' : ''"
  >
    <uni-fab
      v-if="userinfo.type == 1"
      ref="fab"
      :pattern="{ buttonColor: '#2979ff' }"
      horizontal="right"
      vertical="bottom"
      @fabClick="fabClick"
    />
    <view class="search-bar">
      <uni-search-bar
        bgColor="#fff"
        @confirm="search"
        @cancel="onCancel"
        radius="5"
        v-model="searchValue"
        placeholder="请输入搜索内容"
      ></uni-search-bar>
    </view>

    <uni-card padding="0">
      <scroll-view
        class="DBscrollBox"
        scroll-y
        refresher-enabled
        enable-back-to-top
        scroll-with-animation
        :refresher-triggered="loading"
        @scrolltolower="onScrolltolower"
        @refresherrefresh="onRefresherrefresh"
      >
        <unicloud-db
          ref="udb"
          v-slot:default="{ data, loading, hasMore, error, options }"
          collection="seat-chart"
          :page-size="10"
          orderby="title desc"
          :where="where"
          class="DBBox"
        >
          <view v-if="error" class="error">{{ error.message }},下拉刷新试试？</view>
          <uni-list showArrow>
            <uni-list-item
              v-for="(item, index) in data"
              :key="item._id"
              clickable
              showArrow
              @click="onItemClick(item)"
              :title="item.title"
              :note="item.note"
              class="list-item"
            >
              <template v-slot:header>
                <view class="item-header"></view>
              </template>
              <template v-slot:body>
                <view class="item-body">
                  <view class="item-content">
                    <text user-select class="item-title">{{ item.title }}</text>
                    <text user-select class="item-note">{{ item.note }}</text>
                  </view>
                  <view class="item-time">
                    <text>选座：{{ formatTimeRange(item.selectableTimeRange) }}</text>
                    <text>生效：{{ formatTimeRange(item.effectiveTimeRange) }}</text>
                  </view>
                </view>
              </template>
              <template v-slot:footer>
                <view class="item-footer">
                  <view class="tag-item" :class="{ disable: isNotAvailable(item.selectableTimeRange) }"
                    >选</view
                  >
                  <view class="tag-item" :class="{ disable: isNotAvailable(item.effectiveTimeRange) }"
                    >效</view
                  >
                </view>
              </template>
            </uni-list-item>
          </uni-list>
          <uni-load-more :status="loading ? 'loading' : hasMore ? 'more' : 'no-more'"></uni-load-more>
        </unicloud-db>
      </scroll-view>
    </uni-card>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onShow, onReady, onHide, onPullDownRefresh } from "@dcloudio/uni-app";
const page = getCurrentPages().find(item => item.route === "pages/index/index");
const searchValue = ref("");
const charts = ref([]);
const option = ref({});
const userinfo = ref({});
const show = ref(false);
const loading = ref(false);
const where = ref("");
onLoad(async () => {});
onShow(async () => {
  uni.startPullDownRefresh();
  setTimeout(() => {
    show.value = true;
  }, 100);
});

onHide(async () => {
  show.value = false;
});
const onRefresherrefresh = async () => {
  loading.value = true;
  userinfo.value = uni.getStorageSync("userinfo");
  await page.$vm.$refs.udb?.loadData({ clear: true });
  setTimeout(() => {
    uni.stopPullDownRefresh();
    loading.value = false;
    uni.vibrateShort();
  });
};
const onScrolltolower = async e => {
  console.log(e);
  await page.$vm.$refs.udb.loadMore();
  uni.vibrateShort();
};
onPullDownRefresh(onRefresherrefresh);

const formatTimeRange = timeRange => {
  return timeRange.join(" 至 ");
};
const isNotAvailable = timeRange => {
  const now = new Date().getTime();
  const formatedTimeRange = [new Date(timeRange[0]).getTime(), new Date(timeRange[1]).getTime()];
  return now < formatedTimeRange[0] || now > formatedTimeRange[1];
};

const search = async () => {
  const words = searchValue.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  console.log(words);
  where.value = `${new RegExp(words, "i")}.test(title) || ${new RegExp(words, "i")}.test(note)`;
  setTimeout(async () => {
    await page.$vm.$refs.udb?.loadData({ clear: true });
  });
};
const onCancel = async () => {
  where.value = "";
  setTimeout(async () => {
    await page.$vm.$refs.udb?.loadData({ clear: true });
  });
};
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

.DBscrollBox {
  max-height: calc(100vh - var(--window-bottom) - var(--window-top) - 56px - 10px);
}
.search-bar {
  margin-bottom: -10px;
}
.item-content {
  margin-bottom: 5px;
}
.item-title {
  color: #333;
  font-size: 24px;
  display: inline-block;
  margin-top: 10px;
  // font-weight: bold;
}
.item-header {
  background: #2979ff;
  width: 5px;
  margin-right: 10px;
  margin-top: 7px;
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
.item-time {
  font-size: 12px;
  color: #666;
  margin: 0;
  margin-left: -15px;
  display: flex;
  flex-direction: column;
  line-height: 1.25em;
}

.item-footer {
  align-self: center;
  margin-left: auto;
  color: #666;
  display: flex;
  gap: 10px;
}
.item-footer > view {
  color: #fff;
  background: #2979ff;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.item-footer > view.disable {
  background: #ccc;
}
</style>
