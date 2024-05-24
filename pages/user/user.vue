<template>
  <view class="container">
    <uni-card padding="0">
      <template v-slot:title>
        <uni-section title="我的信息" type="line"></uni-section>
      </template>
      <uni-list class="userinfo">
        <button
          @longpress="onLongPress"
          @chooseavatar="onChooseAvatar"
          open-type="chooseAvatar"
          hover-class="hover"
          class="edit-avatar"
        >
          <uni-list-item :border="false" clickable showArrow title="头像">
            <template v-slot:footer>
              <image :src="userinfo.avatarUrl" />
            </template>
          </uni-list-item>
        </button>
        <uni-list-item clickable @click="edit('昵称', userinfo.nickName)" showArrow title="昵称">
          <template v-slot:footer>
            <text class="title">{{ userinfo.nickName }}</text>
          </template>
        </uni-list-item>
        <uni-list-item clickable @click="edit('姓名', userinfo.stuInfo.name)" showArrow title="姓名">
          <template v-slot:footer>
            <text>{{ userinfo.stuInfo.name || "未设置" }}</text>
          </template>
        </uni-list-item>
        <uni-list-item clickable @click="edit('学号', userinfo.stuInfo.id)" showArrow title="学号">
          <template v-slot:footer>
            <text>{{ userinfo.stuInfo.id || "未设置" }}</text>
          </template>
        </uni-list-item>
        <uni-list-item clickable @click="edit('班级', userinfo.stuInfo.class)" showArrow title="班级">
          <template v-slot:footer>
            <text>{{ userinfo.stuInfo.class || "未设置" }}</text>
          </template>
        </uni-list-item>
      </uni-list>
    </uni-card>

    <uni-card padding="0">
      <template v-slot:title>
        <uni-section title="我的预定" type="line"></uni-section>
      </template>
      <unicloud-db
        ref="udb"
        :options="options"
        v-if="userinfo"
        v-slot:default="{ data, loading, hasMore, error, options }"
        collection="order"
        :where="`openid=='${userinfo._openid}'`"
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
                  <text>选座时间：{{ formatTimeRange(item.selectableTimeRange) }}</text>
                  <text>有效时间：{{ formatTimeRange(item.effectiveTimeRange) }}</text>
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

    <uni-popup v-if="ifRenderDialog" ref="inputDialog" type="dialog">
      <uni-popup-dialog
        ref="inputClose"
        mode="input"
        :title="popupData.title"
        :placeholder="popupData.placeholder"
        v-model="popupData.value"
        @confirm="dialogInputConfirm"
        @cancel="ifRenderDialog = false"
      ></uni-popup-dialog>
    </uni-popup>

    <view class="edgeInsetBottom"></view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onShow, onPullDownRefresh } from "@dcloudio/uni-app";
const userinfo = ref(uni.getStorageSync("userinfo"));
const popupData = ref({
  value: "",
  title: "",
  placeholder: "",
});
const formatTimeRange = timeRange => {
  return timeRange.join(" 至 ");
};
onShow(() => {
  getCurrentPages()[0].$vm.$refs.udb.loadData({ clear: true });
});
onPullDownRefresh(async () => {
  await getCurrentPages()[0].$vm.$refs.udb.loadData({ clear: true }, () => {
    uni.stopPullDownRefresh();
  });
  uni.showToast({
    title: "刷新成功",
    icon: "success",
  });
});
// const onReachBottom = () => {
//   //上拉加载更多
//   getCurrentPages()[0].$vm.$refs.udb.loadMore();
// };
const onChooseAvatar = async e => {
  const tmpUrl = e.detail.avatarUrl;
  uni.showLoading({
    title: "上传中",
    mask: true,
  });
  try {
    const { fileID } = await uniCloud.uploadFile({
      filePath: tmpUrl,
      cloudPath: "avatar/" + userinfo.value._openid + ".png",
      fileType: "image",
    });
    const { fileList } = await uniCloud.getTempFileURL({
      fileList: [fileID],
    });

    const { result } = await uniCloud.database().collection("user").doc(userinfo.value._id).update({
      avatarUrl: fileList[0].tempFileURL,
    });

    if (result.updated > 0) {
      userinfo.value.avatarUrl = fileList[0].tempFileURL;
      uni.setStorageSync("userinfo", userinfo.value);

      uni.showToast({
        title: "上传成功",
        icon: "success",
      });

      return;
    }
  } catch (e) {
    console.log(e);
  }
  uni.showToast({
    title: "上传失败",
    icon: "none",
  });
};
const ifRenderDialog = ref(false);
const inputDialog = ref(null);
const edit = async (type, value) => {
  popupData.value = {
    type: type,
    title: "编辑" + type,
    placeholder: "请输入" + type,
    value: value,
  };
  ifRenderDialog.value = true;
  setTimeout(() => {
    getCurrentPages()[0].$vm.$refs.inputDialog.open();
  });
};
const types = {
  昵称: "nickName",
  姓名: "stuInfo.name",
  学号: "stuInfo.id",
  班级: "stuInfo.class",
};
const dialogInputConfirm = async input => {
  const text = input.trim();
  if (text.length === 0) {
    uni.showToast({
      title: "内容不能为空",
      icon: "none",
    });
    return;
  }
  const { type } = popupData.value;
  const { result } = await uniCloud
    .database()
    .collection("user")
    .doc(userinfo.value._id)
    .update({
      [`${types[type]}`]: text,
    });
  if (result.errCode == 0) {
    if (type == "昵称") {
      userinfo.value.nickName = text;
    } else {
      userinfo.value.stuInfo[types[type].replace("stuInfo.", "")] = text;
    }
    uni.setStorageSync("userinfo", userinfo.value);
    popupData.value = {};
    uni.showToast({
      title: "修改成功",
      icon: "success",
    });
    ifRenderDialog.value = true;
    getCurrentPages()[0].$vm.$refs.inputDialog.close();
    return;
  }
  uni.showToast({
    title: "修改失败",
    icon: "none",
  });
};
const count = ref(0);
const onLongPress = async () => {
  count.value++;
  console.log(count.value);
  if (count.value >= 5) {
    console.log(userinfo.value.type);
    const { result } = await uniCloud
      .database()
      .collection("user")
      .doc(userinfo.value._id)
      .update({
        type: userinfo.value.type == 0 ? 1 : 0,
      });
    console.log(result);
    if (result.errCode == 0) {
      uni.reLaunch({
        url: "/pages/index/index",
      });
    }
  }
};
</script>

<style>
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
  padding: 10px;
}
</style>
