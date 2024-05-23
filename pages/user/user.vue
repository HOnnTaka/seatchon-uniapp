<template>
  <view class="container">
    <uni-list class="userinfo">
      <button
        @longpress="onLongPress"
        @chooseavatar="onChooseAvatar"
        open-type="chooseAvatar"
        hover-class="hover"
        class="edit-avatar"
      >
        <uni-list-item clickable showArrow title="头像">
          <template v-slot:footer>
            <image :src="userinfo.avatarUrl" />
          </template>
        </uni-list-item>
      </button>
      <uni-list-item clickable @click="edit('昵称')" showArrow title="昵称">
        <template v-slot:footer>
          <view class="title">{{ userinfo.nickName }}</view>
        </template>
      </uni-list-item>
      <uni-list-item clickable @click="edit('姓名')" showArrow title="姓名">
        <template v-slot:footer>
          <text>{{ userinfo.stuInfo.name || "未设置" }}</text>
        </template>
      </uni-list-item>
      <uni-list-item clickable @click="edit('学号')" showArrow title="学号">
        <template v-slot:footer>
          <text>{{ userinfo.stuInfo.id || "未设置" }}</text>
        </template>
      </uni-list-item>
      <uni-list-item clickable @click="edit('班级')" showArrow title="班级">
        <template v-slot:footer>
          <text>{{ userinfo.stuInfo.class || "未设置" }}</text>
        </template>
      </uni-list-item>
    </uni-list>

    <uni-popup ref="inputDialog" type="dialog">
      <uni-popup-dialog
        ref="inputClose"
        mode="input"
        :title="popupData.title"
        :placeholder="popupData.placeholder"
        v-model="popupData.value"
        @confirm="dialogInputConfirm"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
const userinfo = ref(uni.getStorageSync("userinfo"));
const popupData = ref({
  value: "",
  title: "",
  placeholder: "",
});

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
const edit = type => {
  popupData.value = {
    type: type,
    title: "编辑" + type,
    placeholder: "请输入" + type,
  };
  getCurrentPages()[0].$vm.$refs.inputDialog.open();
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
    getCurrentPages()[0].$vm.$refs.inputDialog.close();
  } else {
    uni.showToast({
      title: "修改失败",
      icon: "none",
    });
  }
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
  border: none;
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

.stuInfo text,
.title {
  margin-right: 5px;
}
</style>
