<template>
  <view class="container">
    <uni-card class="order-card" padding="0">
      <template v-slot:title>
        <uni-section title="我的预定" type="line"></uni-section>
      </template>
      <unicloud-db
        ref="udb"
        :options="options"
        v-slot:default="{ data, loading, hasMore, error, options }"
        collection="order"
        :where="`userId=='${userinfo._id}'`"
        orderby="orderTime desc"
      >
        <view v-if="error">{{ error.message }}</view>
        <uni-list>
          <uni-list-item
            v-for="(item, index) in data"
            :key="item.chartId"
            clickable
            link
            :to="'/pages/detail/detail?chartId=' + item.chartId"
            :title="item.title"
            :note="item.note"
          >
            <template v-slot:body>
              <view class="item-body">
                <view class="item-content">
                  <text class="item-title">{{ item.title }}</text>
                  <text class="item-note">{{ item.note }}</text>
                </view>
                <view class="item-time">
                  <text>{{ formatTimeRange(item.effectiveTimeRange) }}</text>
                </view>
              </view>
            </template>
            <template v-slot:footer>
              <view class="item-footer">第{{ item.x }}列 第{{ item.y }}行</view>
            </template>
          </uni-list-item>
        </uni-list>
        <uni-load-more :status="loading ? 'loading' : hasMore ? 'default' : 'no-more'"></uni-load-more>
      </unicloud-db>
    </uni-card>

    <view class="edgeInsetBottom"></view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onShow, onPullDownRefresh } from "@dcloudio/uni-app";
const userinfo = ref(uni.getStorageSync("userinfo"));

const formatTimeRange = timeRange => {
  return timeRange.join(" 至 ");
};
onShow(() => {
  userinfo.value = uni.getStorageSync("userinfo");
  console.log(getCurrentPages());
  getCurrentPages()[0].$vm.$refs.udb?.loadData({ clear: true });
});
onPullDownRefresh(async () => {
  if (!userinfo.value) return uni.stopPullDownRefresh();
  await getCurrentPages()[0].$vm.$refs.udb.loadData({ clear: true }, () => {
    uni.stopPullDownRefresh();
    uni.showToast({
      title: "刷新成功",
      icon: "success",
    });
  });
});
// const onReachBottom = () => {
//   //上拉加载更多
//   getCurrentPages()[0].$vm.$refs.udb.loadMore();
// };
</script>

<style scoped>
.container {
  height: 100%;
}
.userinfo {
  font-size: 20px;
}
.uni-list-item__container {
  align-items: center;
}

.uni-list-item__content {
  flex-direction: row !important;
}

.edit-avatar {
  margin: 0;
  padding: 0;
  border: none !important;
}
.edit-avatar::after {
  border: none !important;
}

.hover .uni-list-item {
  background: #f1f1f1 !important;
}

.edit-avatar image {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}

.stuInfo {
  font-size: 18px;
}

.stuInfo view {
  cursor: pointer;
  margin-bottom: 5px;
}

.stuInfo view:last-child {
  margin-bottom: 0;
}
.item-title {
  font-size: 24px;
  color: #333;
}
.item-note {
  color: #666;
  font-size: 12px;
  margin-left: 5px;
}
.item-time {
  font-size: 13px;
  color: #666;
  display: flex;
  flex-direction: column;
}
.item-footer {
  align-self: center;
  margin-left: auto;
}
.edgeInsetBottom {
  height: var(--window-bottom);
}
</style>
