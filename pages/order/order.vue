<template>
  <view
    class="container"
    style="transition: all 1s ease; opacity: 0"
    :style="show ? 'transition: all .5s ease; opacity: 1' : ''"
  >
    <view style="margin-bottom: -10px">
      <uni-card class="order-card" padding="0">
        <template v-slot:title>
          <uni-section title="我的选座" type="line"></uni-section>
        </template>
        <scroll-view
          class="orderScrollBox"
          scroll-y
          refresher-enabled
          enable-back-to-top
          scroll-with-animation
          :refresher-triggered="loading.orderDB"
          @scrolltolower="onScrolltolower('orderDB')"
          @refresherrefresh="onRefresherrefresh('orderDB')"
        >
          <unicloud-db
            ref="orderDB"
            v-slot:default="{ data, loading, hasMore, error, options }"
            :page-size="10"
            :collection="orderDBList"
            :where="`userId=='${userinfo._id}'`"
            orderby="orderTime desc"
          >
            <view v-if="error" class="error"
              >{{ console.log(error.message) }}获取列表失败,下拉刷新试试？</view
            >
            <uni-list>
              <uni-list-item
                v-for="(item, index) in data"
                :key="item.chartId[0]._id"
                clickable
                showArrow
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
        </scroll-view>
      </uni-card>
    </view>

    <uni-card class="admin-card" padding="0">
      <template v-slot:title>
        <uni-section title="我的管理" type="line"></uni-section>
      </template>
      <scroll-view
        class="adminScrollBox"
        scroll-y
        refresher-enabled
        enable-back-to-top
        scroll-with-animation
        :refresher-triggered="loading.adminDB"
        @scrolltolower="onScrolltolower('adminDB')"
        @refresherrefresh="onRefresherrefresh('adminDB')"
      >
        <unicloud-db
          ref="adminDB"
          v-slot:default="{ data, loading, hasMore, error, options }"
          collection="seat-chart"
          :page-size="10"
          :field="`title,note,administrators`"
          :where="`in('${userinfo._id}', administrators)`"
          orderby="createTime desc"
        >
          <view v-if="error" class="error">{{ console.log(error.message) }}获取列表失败,下拉刷新试试？</view>
          <uni-list>
            <uni-list-item
              v-for="(item, index) in data"
              :key="item._id"
              clickable
              showArrow
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
      </scroll-view>
    </uni-card>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onShow, onHide, onPullDownRefresh } from "@dcloudio/uni-app";
const userinfo = ref(uni.getStorageSync("userinfo"));
const show = ref(false);
const loading = ref({
  orderDB: false,
  adminDB: false,
});

const page = getCurrentPages().find(page => page.route === "pages/order/order");
const db = uniCloud.database();
const orderDBList = ref([
  db.collection("order").where('userId ==  "216124125"').field("chartId,x,y,userId").getTemp(),
  db.collection("seat-chart").field("_id,effectiveTimeRange,selectableTimeRange,title,note").getTemp(),
]);
const formatTimeRange = timeRange => {
  return timeRange.join(" 至 ");
};
onShow(async () => {
  userinfo.value = uni.getStorageSync("userinfo");
  setTimeout(() => {
    uni.startPullDownRefresh();
    show.value = true;
  }, 100);
});

onHide(async () => {
  show.value = false;
});

const onScrolltolower = async ref => {
  await page.$vm.$refs[ref].loadMore();
  uni.vibrateShort();
};
const onRefresherrefresh = async ref => {
  loading.value[ref] = true;
  await page.$vm.$refs[ref].loadData({ clear: true });
  setTimeout(() => {
    uni.stopPullDownRefresh();
    loading.value[ref] = false;
    uni.vibrateShort();
  });
};

onPullDownRefresh(() => {
  onRefresherrefresh("orderDB");
  onRefresherrefresh("adminDB");
});
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.orderScrollBox,
.adminScrollBox {
  height: calc((100vh - var(--window-bottom) - var(--window-top)) / 2 - 60px);
}
.error {
  padding: 10px;
  text-align: center;
  background: #ff7626;
  color: #fff;
}
.item-content {
  margin-top: 10px;
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
