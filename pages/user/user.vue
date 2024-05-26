<template>
  <view class="container">
    <card-list title="我的信息" v-if="userinfo">
      <button
        @longpress="onLongPress"
        @chooseavatar="onChooseAvatar"
        open-type="chooseAvatar"
        hover-class="hover"
        class="edit-avatar"
      >
        <uni-list-item clickable showArrow>
          <template v-slot:header>
            <text class="title">头像</text>
          </template>
          <template v-slot:footer>
            <image :src="userinfo.avatarUrl" />
          </template>
        </uni-list-item>
      </button>
      <list-item title="昵称" link @click="edit('昵称', userinfo.nickName)" :content="userinfo.nickName" />
      <list-item title="姓名" link @click="edit('姓名', userinfo.name)" :content="userinfo.name" />
      <list-item title="学号" link @click="edit('学号', userinfo._id)" :content="userinfo._id" />
      <list-item title="班级" link @click="edit('班级', userinfo.class)" :content="userinfo.class" />
    </card-list>
    <card-list v-if="!userinfo">
      <template v-slot:title>
        <uni-section title="登录" type="line"></uni-section>
      </template>
      <uni-forms ref="form" :modelValue="formData">
        <uni-forms-item label="账号" required name="id">
          <uni-easyinput v-model="formData.id" placeholder="请输入账号/学号" />
        </uni-forms-item>
        <uni-forms-item label="密码" required name="pwd">
          <uni-easyinput v-model="formData.pwd" type="password" placeholder="请输入密码" />
        </uni-forms-item>
      </uni-forms>
      <button class="uni-mb-5" type="primary" @click="submit('form')">登录</button>
    </card-list>
    <card-list v-if="!userinfo">
      <template v-slot:title>
        <uni-section title="管理员登录" type="line"></uni-section>
      </template>
      <uni-forms ref="adminform" :modelValue="formData">
        <uni-forms-item name="adminpwd">
          <uni-easyinput v-model="formData.adminpwd" placeholder="请输入管理密码" />
        </uni-forms-item>
      </uni-forms>
      <button class="uni-mb-5" type="primary" @click="submit('adminform')">管理员登录</button>
    </card-list>

    <card-list v-if="userinfo">
      <template v-slot:title>
        <uni-section title="修改密码" type="line"></uni-section>
      </template>
      <uni-forms ref="form1" :modelValue="formData" label-width="80px">
        <uni-forms-item label="旧密码" required name="pwd">
          <uni-easyinput v-model="formData.pwd" type="password" placeholder="请输入密码" />
        </uni-forms-item>
        <uni-forms-item label="新密码" required name="newpwd">
          <uni-easyinput v-model="formData.newpwd" type="password" placeholder="请输入新密码" />
        </uni-forms-item>
        <uni-forms-item label="确认密码" required name="newpwd2">
          <uni-easyinput v-model="formData.newpwd2" type="password" placeholder="请确认新密码" />
        </uni-forms-item>
      </uni-forms>
      <button class="uni-mb-5" type="primary" @click="submit('form1')">确认</button>
    </card-list>

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

    <button v-if="userinfo" class="uni-mx-8" type="warn" @click="logout">退出登录</button>

    <view class="edgeInsetBottom"></view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onShow, onReady, onPullDownRefresh } from "@dcloudio/uni-app";
import ListItem from "@/component/ListItem/ListItem";
import CardList from "@/component/CardList/CardList";
const userinfo = ref(uni.getStorageSync("userinfo"));
const formData = ref({
  id: "",
  pwd: "",
  adminpwd: "",
  newpwd: "",
  newpwd2: "",
});
const resetFormData = () => {
  formData.value = {
    id: "",
    pwd: "",
    adminpwd: "",
    newpwd: "",
    newpwd2: "",
  };
};
onLoad(() => {});
const rules = {
  id: {
    rules: [{ required: true, errorMessage: "请输入账号/学号" }],
  },
  pwd: {
    rules: [{ required: true, errorMessage: "请输入密码" }],
  },
  adminpwd: {
    rules: [{ required: true, errorMessage: "请输入管理密码" }],
  },
  newpwd: {
    rules: [
      { required: true, errorMessage: "请输入新密码" },
      // 8-20位字母、数字
      {
        validateFunction: function (rule, value, data, callback) {
          if (!/^[a-zA-Z0-9]{8,20}$/.test(value)) {
            callback("密码必须为8-20位字母、数字");
          }
          return;
        },
      },
    ],
  },
  newpwd2: {
    rules: [
      { required: true, errorMessage: "请确认新密码" },
      {
        validateFunction: function (rule, value, data, callback) {
          if (value != formData.value.newpwd) {
            callback("两次密码输入不一致");
          }
          return;
        },
      },
    ],
  },
};
const data = [{ text: "管理员登录", value: "admin" }];
onReady(async () => {
  getCurrentPages()[0].$vm.$refs.form?.setRules(rules);
  getCurrentPages()[0].$vm.$refs.form1?.setRules(rules);
  getCurrentPages()[0].$vm.$refs.adminform?.setRules(rules);
});
const submit = async ref => {
  uni.showLoading({
    title: "加载中",
    mask: true,
  });
  try {
    let data = await getCurrentPages()[0].$vm.$refs[ref].validate();
    if (ref == "adminform") {
      try {
        const { code } = await uni.login();
        const { result } = await uniCloud.callFunction({
          name: "login",
          data: { adminpwd: data.adminpwd, code: code },
        });
        console.log(result);
        uni.showToast({
          title: result.message,
          icon: result.code == 1 ? "error" : "success",
        });
        if (result.code == 0) {
          uni.setStorageSync("userinfo", result.userinfo);
          uni.reLaunch({
            url: "/pages/user/user",
          });
        }
      } catch (e) {
        console.log(e);
        uni.showToast({
          title: "请使用微信小程序打开",
          icon: "none",
          duration: 2000,
        });
      }
      return;
    }
    if (userinfo.value) data.id = userinfo.value._id;
    try {
      console.log(data, userinfo.value);
      const { result } = await uniCloud.callFunction({ name: "login", data });
      console.log(result);
      uni.showToast({
        title: result.message,
        icon: result.code == 1 ? "error" : "success",
      });
      if (result.code != 1) {
        if (result.code != 3) {
          uni.setStorageSync("userinfo", result.userinfo);
          userinfo.value = result.userinfo;
          uni.reLaunch({
            url: "/pages/user/user",
          });
          if (result.code == 2) {
            uni.showToast({
              title: "请尽快修改默认密码",
              icon: "none",
              duration: 4000,
            });
          }
        }
        resetFormData();
      }
    } catch (e) {
      console.log(e);
      uni.showToast({
        title: e.message,
        icon: "none",
        duration: 2000,
      });
    }
  } catch (e) {
    console.log(e);
    uni.showToast({
      title: "请检查输入内容",
      icon: "none",
      duration: 2000,
    });
    return;
  }
  uni.hideLoading();
};

const logout = () => {
  uni.setStorageSync("userinfo", "");
  userinfo.value = "";
  uni.showToast({
    title: "退出登录成功",
    icon: "success",
  });
};

const popupData = ref({
  value: "",
  title: "",
  placeholder: "",
});
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
      userinfo.value.type = userinfo.value.type == 0 ? 1 : 0;
      uni.setStorageSync("userinfo", userinfo.value);
      uni.reLaunch({
        url: "/pages/index/index",
      });
    }
  }
};

const onChooseAvatar = async e => {
  const tmpUrl = e.detail.avatarUrl;
  uni.showLoading({
    title: "上传中",
    mask: true,
  });
  try {
    const { fileID } = await uniCloud.uploadFile({
      filePath: tmpUrl,
      cloudPath: "avatar/" + userinfo.value._id + ".png",
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
</script>

<style scoped>
.userinfo {
  font-size: 20px;
}

.edit-avatar {
  margin: 0;
  padding: 0;
  border: none !important;
  border-radius: 0;
}
.edit-avatar::after {
  border: none !important;
}

.hover .uni-list-item {
  background: #f1f1f1 !important;
}
.title {
  font-size: 14px;
  color: #3b4144;
  display: flex;
  align-items: center;
  max-width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.edit-avatar image {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}
.edgeInsetBottom {
  height: var(--window-bottom);
}
</style>
