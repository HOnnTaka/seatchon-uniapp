<template>
  <view class="container">
    <view class="search-bar">
      <uni-search-bar @confirm="search" v-model="searchValue" placeholder="请输入搜索内容"></uni-search-bar>
    </view>
    <uni-list>
      <uni-list-item
        v-for="(item, index) in charts"
        :key="item.chartId"
        direction="column"
        clickable
        link
        :to="'/pages/detail/detail?chartId=' + item._id"
        :title="item.title"
        :note="item.note"
      >
        <template v-slot:footer>
          <view class="footer">id:{{ item._id }}</view>
        </template>
      </uni-list-item>
    </uni-list>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const searchValue = ref("");
const charts = ref([]);

onLoad(async () => {
  getCharts();
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
    })
    .end();
    console.log(res);
  charts.value = res.result.data;
};

const search = async () => {};
const onItemClick = e => {};
</script>

<style scoped lang="scss">
.containeer {
  font-size: 14px;
  line-height: 24px;
}
.search-bar {
  background: #fff;
}
</style>
