<template>
  <view class="container">
    <view class="search-bar">
      <uni-search-bar @confirm="search" v-model="searchValue" placeholder="请输入搜索内容"></uni-search-bar>
    </view>
    <uni-list>
      <uni-list-item
        v-for="(item, index) in charts"
        :key="item.chartId"
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
            <view class="item-time">
              <text>选座时间：{{ item.selectableTime }}</text>
              <text>有效时间：{{ item.effectiveTime }}</text>
            </view>
          </view>
        </template>
        <template v-slot:footer>
          <view class="item-footer">
            {{ availabale(item) }}
          </view>
        </template>
      </uni-list-item>
    </uni-list>

    <uni-fab
      v-if="userinfo?.type == 1"
      ref="fab"
      :pattern="{ buttonColor: '#07c160' }"
      horizontal="right"
      vertical="bottom"
      @fabClick="fabClick"
    />

    <view class="edgeInsetBottom"></view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const searchValue = ref("");
const charts = ref([]);
const userinfo = ref();

uni.$on("userinfo", () => {
  userinfo.value = getApp().globalData.userinfo;
});

onLoad(async () => {
  getCharts();
  console.log(userinfo.value);
});

const getCharts = async () => {
  const db = uniCloud.database();
  const res = await db
    .collection("seat-chart")
    .aggregate()
    .project({
      _id: 1,
      title: 1,
      note: 1,
      creator: 1,
      creatorId: 1,
      selectableTime: 1,
      effectiveTime: 1,
    })
    .end();
  // console.log(res);
  charts.value = res.result.data;
};

const availabale = e => {
  console.log(e);
  return "选座中";
};

const search = async () => {};
const onItemClick = e => {};

const fabClick = () => {
  uni.navigateTo({
    url: "/pages/createSeatChart/createSeatChart",
  });
};
</script>

<style scoped lang="scss">
.containeer {
  font-size: 14px;
  line-height: 24px;
}
.search-bar {
  background: #fff;
}
.item-title {
  font-size: 24px;
  font-weight: bold;
}
.item-note {
  color: #999;
  font-size: 12px;
  margin-left: 5px;
}
.item-time {
  font-size: 12px;
  color: #999;
  display: flex;
  flex-direction: column;
}
.item-footer {
  align-self: center;
  margin-left: auto;
}
.edgeInsetBottom {
  width: 100%;
  height: var(--window-bottom);
}
</style>
