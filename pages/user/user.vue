<template>
  <view class="container">
    <view class="header">
      <image :src="userinfo.avatarUrl" mode="scaleToFill" />
      <view class="title">{{ userinfo.nickName }}</view>
    </view>
    <uni-group class="detail-group" title="座位信息" mode="card">
      <view>姓名：{{ userinfo.stuInfo.name }}</view>
      <view>学号：{{ userinfo.stuInfo.id }}</view>
      <view>班级：{{ userinfo.stuInfo.class }}</view>
	  <button>编辑</button>
    </uni-group>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
const userinfo = ref({});

uni.$on("userinfo", () => {
  userinfo.value = uni.getStorageSync("userinfo");
});
</script>

<style>
	.header{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px;
	}
</style>
