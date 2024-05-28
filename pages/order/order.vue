<template>
  <view
    class="container"
    style="transition: all 1s ease; opacity: 0"
    :style="show ? 'transition: all .5s ease; opacity: 1' : ''"
  >
    <uni-card class="order-card" padding="0">
      <template v-slot:title>
        <uni-section title="我的选座" type="line"></uni-section>
      </template>
      <unicloud-db
        ref="orderDB"
        :options="options"
        v-slot:default="{ data, loading, hasMore, error, options }"
        :collection="orderDBList"
        :where="`userId=='${userinfo._id}'`"
        orderby="orderTime desc"
      >
        <view v-if="error">{{ error.message }}</view>
        <uni-list>
          <uni-list-item
            v-for="(item, index) in data"
            :key="item.chartId[0]._id"
            clickable
            link
            :to="'/pages/detail/detail?chartId=' + item.chartId[0]._id"
            :title="item.chartId[0].title"
            :note="item.chartId[0].note"
          >
            <template v-slot:body>
              <view class="item-body">
                <view class="item-content">
                  <text class="item-title">{{ item.chartId[0].title }}</text>
                  <text class="item-note">{{ item.chartId[0].note }}</text>
                </view>
                <view class="item-time">
                  <text>{{ formatTimeRange(item.chartId[0].effectiveTimeRange) }}</text>
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

    <uni-card class="admin-card" padding="0">
      <template v-slot:title>
        <uni-section title="我的管理" type="line"></uni-section>
      </template>
      <unicloud-db
        ref="adminDB"
        :options="options"
        v-slot:default="{ data, loading, hasMore, error, options }"
        collection="seat-chart"
        :field="`title,note,administrators`"
        :where="`in('${userinfo._id}', administrators)`"
        orderby="createTime desc"
      >
        <view v-if="error">{{ error.message }}</view>
        <uni-list>
          <uni-list-item
            v-for="(item, index) in data"
            :key="item._id"
            clickable
            link
            :to="'/pages/detail/detail?chartId=' + item._id"
            :title="item.title"
            :note="item.note"
          >
            <template v-slot:body>
              <view class="item-body">
                <view class="item-content">
                  <text class="item-title">{{ item.title }}</text>
                  <text class="item-note">{{ item.note }}</text>
                </view>
                <view class="item-time"> </view>
              </view>
            </template>
            <template v-slot:footer>
              <view class="item-footer">{{ item.administrators.length }}人管理</view>
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
import { onLoad, onShow, onHide, onPullDownRefresh } from "@dcloudio/uni-app";
const userinfo = ref(uni.getStorageSync("userinfo"));
const show = ref(false);

const page = getCurrentPages().find(page => page.route === "pages/order/order");
const db = uniCloud.database();
const orderDBList = ref([
  db.collection("order").where('userId ==  "216124125"').field("chartId,x,y,userId").getTemp(),
  db.collection("seat-chart").field("_id,effectiveTimeRange,selectableTimeRange,title,note").getTemp(),
]);
const formatTimeRange = timeRange => {
  return timeRange.join(" 至 ");
};
onShow(() => {
  userinfo.value = uni.getStorageSync("userinfo");
  console.log(getCurrentPages());
  page.$vm.$refs.orderDB?.loadData({ clear: true });
  page.$vm.$refs.adminDB?.loadData({ clear: true });
  setTimeout(() => {
    show.value = true;
  }, 100);
});

onHide(async () => {
  show.value = false;
});

onPullDownRefresh(async () => {
  page.$vm.$refs.orderDB.loadData({ clear: true });
  page.$vm.$refs.adminDB.loadData({ clear: true });
  uni.stopPullDownRefresh();
});
// const onReachBottom = () => {
//   //上拉加载更多
//   getCurrentPages()[0].$vm.$refs.orderDB.loadMore();
// };
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
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
