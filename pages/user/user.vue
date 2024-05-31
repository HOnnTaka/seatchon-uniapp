<template>
  <view
    class="container"
    style="transition: all 1s ease; opacity: 0"
    :style="show ? 'transition: all .5s ease; opacity: 1' : ''"
  >
    <uni-card v-if="userinfo" padding="0">
      <uni-collapse>
        <uni-collapse-item :open="show" titleBorder="none">
          <template v-slot:title>
            <uni-section title="我的信息" type="line"></uni-section>
          </template>

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
          <uni-list-item clickable @click="edit('昵称', userinfo.nickName)" showArrow title="昵称">
            <template v-slot:footer>
              <view class="title">{{ userinfo.nickName }}</view>
            </template>
          </uni-list-item>
          <uni-list-item
            :clickable="userinfo.type == 1"
            :showArrow="userinfo.type == 1"
            @click="edit('姓名', userinfo.name)"
            @longpress="copy(userinfo.name)"
            title="姓名"
          >
            <template v-slot:footer>
              <text user-select selectable>{{ userinfo.name }}</text>
            </template>
          </uni-list-item>
          <uni-list-item @longpress="copy(userinfo._id)" :title="userinfo.type == 1 ? '学号/id' : '学号'">
            <template v-slot:footer>
              <text user-select selectable>{{ userinfo._id }}</text>
            </template>
          </uni-list-item>
          <uni-list-item
            :clickable="userinfo.type == 1"
            :showArrow="userinfo.type == 1"
            @click="edit('班级', userinfo.class)"
            title="班级"
          >
            <template v-slot:footer>
              <text user-select selectable>{{ userinfo.class }}</text>
            </template>
          </uni-list-item>
        </uni-collapse-item>
      </uni-collapse>
    </uni-card>
    <uni-card v-if="!userinfo" padding="0">
      <template v-slot:title>
        <uni-section title="登录" type="line"></uni-section>
      </template>
      <view style="padding: 10px">
        <uni-forms ref="form" :modelValue="formData">
          <uni-forms-item label="账号" required name="id">
            <uni-easyinput v-model="formData.id" placeholder="请输入账号/学号" />
          </uni-forms-item>
          <uni-forms-item label="密码" required name="pwd">
            <uni-easyinput v-model="formData.pwd" type="password" placeholder="请输入密码" />
          </uni-forms-item>
        </uni-forms>
        <button :loading="loading" type="primary" @click="submit('form')">登录</button>
      </view>
    </uni-card>

    <!--    <uni-card v-if="!userinfo" padding="0">
      <template v-slot:title>
        <uni-section title="管理员登录" type="line"></uni-section>
      </template>
      <view style="padding: 10px">
        <uni-forms ref="adminform" :modelValue="formData">
          <uni-forms-item name="adminpwd">
            <uni-easyinput v-model="formData.adminpwd" placeholder="请输入管理密码" />
          </uni-forms-item>
        </uni-forms>
        <button :loading="loading" type="primary" @click="submit('adminform')">管理员登录</button>
      </view>
    </uni-card> -->

    <uni-card v-if="userinfo" padding="0">
      <uni-collapse>
        <uni-collapse-item titleBorder="none">
          <template v-slot:title>
            <uni-section title="修改密码" type="line"></uni-section>
          </template>
          <view style="padding: 10px">
            <uni-forms ref="form1" :modelValue="formData" label-width="80px">
              <uni-forms-item label="旧密码" required name="pwd">
                <uni-easyinput trim="both" v-model="formData.pwd" type="password" placeholder="请输入密码" />
              </uni-forms-item>
              <uni-forms-item label="新密码" required name="newpwd">
                <uni-easyinput
                  trim="both"
                  v-model="formData.newpwd"
                  type="password"
                  placeholder="请输入新密码"
                />
              </uni-forms-item>
              <uni-forms-item label="确认密码" required name="newpwd2">
                <uni-easyinput
                  trim="both"
                  v-model="formData.newpwd2"
                  type="password"
                  placeholder="请确认新密码"
                />
              </uni-forms-item>
            </uni-forms>
            <button :loading="loading" type="primary" @click="submit('form1')">确认</button>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </uni-card>

    <uni-card v-if="userinfo.type == 1" padding="0">
      <uni-collapse>
        <uni-collapse-item titleBorder="none">
          <template v-slot:title>
            <uni-section title="添加学生（管理员）" type="line"></uni-section>
          </template>
          <view style="padding: 10px">
            <uni-forms ref="addStudentForm" :modelValue="addUserFormData" label-width="80px">
              <uni-forms-item label="学号/id" name="id">
                <uni-easyinput
                  trim="both"
                  v-model="addUserFormData.id"
                  placeholder="输入学号/id（留空自动生成id）"
                />
              </uni-forms-item>
              <uni-forms-item label="姓名" required name="name">
                <uni-easyinput trim="both" v-model="addUserFormData.name" placeholder="请输入姓名" />
              </uni-forms-item>
              <uni-forms-item label="班级" required name="class">
                <uni-easyinput trim="both" v-model="addUserFormData.class" placeholder="请输入班级" />
              </uni-forms-item>
              <view style="margin-bottom: 5px; text-align: center; color: #ccc">初始密码为123456</view>
            </uni-forms>
            <button :loading="loading" type="primary" @click="addUserFormSubmit">确认</button>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </uni-card>

    <uni-card v-if="userinfo.type == 1" padding="0">
      <uni-collapse>
        <uni-collapse-item titleBorder="none">
          <template v-slot:title>
            <uni-section title="重置密码（管理员）" type="line"></uni-section>
          </template>
          <view style="padding: 10px">
            <uni-forms ref="resetPwdForm" :modelValue="resetPwdFormData" label-width="80px">
              <uni-forms-item required label="学号/id" name="id">
                <uni-easyinput trim="both" v-model="resetPwdFormData.id" placeholder="输入学号/id" />
              </uni-forms-item>
              <view style="margin-bottom: 5px; text-align: center; color: #ccc">初始密码为123456</view>
            </uni-forms>
            <button :loading="loading" type="primary" @click="resetPwdFormSubmit">确认</button>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </uni-card>

    <!-- <uni-card v-if="userinfo.type == 1" padding="0">
      <uni-collapse>
        <uni-collapse-item titleBorder="none">
          <template v-slot:title>
            <uni-section title="批量添加学生（管理员）" type="line"></uni-section>
          </template>
          <view style="padding: 10px">
            <button :loading="loading" type="primary" @click="submit('form1')">确认</button>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </uni-card> -->

    <uni-card v-if="userinfo.type == 1" padding="0">
      <uni-collapse>
        <uni-collapse-item titleBorder="none">
          <template v-slot:title>
            <uni-section title="添加全局管理员（管理员）" type="line"></uni-section>
          </template>
          <view style="padding: 10px">
            <uni-forms ref="addAdminForm" :modelValue="addUserFormData" label-width="80px">
              <uni-forms-item label="id" name="id">
                <uni-easyinput
                  trim="both"
                  v-model="addUserFormData.id"
                  placeholder="输入学号/id（留空自动生成id）"
                />
              </uni-forms-item>
              <view style="margin-bottom: 5px; text-align: center; color: #ccc">初始密码为123456</view>
            </uni-forms>
            <button :loading="loading" type="primary" @click="addUserFormSubmit(1)">确认</button>
          </view>
        </uni-collapse-item>
      </uni-collapse>
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
      <!-- <view @click="clearPopupValue" class="popup-clear">×</view> -->
    </uni-popup>

    <button :loading="loading" v-if="userinfo" class="uni-mx-5" type="warn" @click="logout">退出登录</button>
    <view class="edgeInsetBottom"></view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onShow, onReady, onHide, onPullDownRefresh } from "@dcloudio/uni-app";
const page = getCurrentPages().find(item => item.route === "pages/user/user");
const userinfo = ref(uni.getStorageSync("userinfo"));
const show = ref(false);
const loading = ref(false);
onShow(async () => {
  setTimeout(() => {
    show.value = true;
  }, 100);
});

onHide(async () => {
  show.value = false;
});
const copy = text => {
  console.log(text);
  uni.setClipboardData({
    data: text,
    showToast: true,
    success: function () {
      uni.vibrateShort();
    },
  });
};
const formData = ref({
  id: "",
  pwd: "",
  adminpwd: "",
  newpwd: "",
  newpwd2: "",
});
const addUserFormData = ref({
  id: "",
  name: "",
  class: "",
});
const resetPwdFormData = ref({
  id: "",
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
    rules: [{ required: true, errorMessage: "请输入学号/id" }],
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
const addStudentFormRules = {
  name: {
    rules: [{ required: true, errorMessage: "请输入姓名" }],
  },
  class: {
    rules: [{ required: true, errorMessage: "请输入班级" }],
  },
};
onReady(async () => {
  page.$vm.$refs.form?.setRules(rules);
  page.$vm.$refs.form1?.setRules(rules);
  page.$vm.$refs.adminform?.setRules(rules);
  page.$vm.$refs.addStudentForm?.setRules(addStudentFormRules);
  page.$vm.$refs.resetPwdForm?.setRules(rules);
});
const submit = async ref => {
  uni.showLoading({
    title: "加载中",
    mask: true,
  });
  loading.value = true;
  try {
    let data = await page.$vm.$refs[ref].validate();
    if (ref == "adminform") {
      try {
        const { code } = await uni.login();
        const { result } = await uniCloud.callFunction({
          name: "login",
          data: { adminpwd: data.adminpwd, code: code },
        });
        uni.hideLoading();
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
        uni.showToast({
          title: "请使用微信小程序打开",
          icon: "none",
          duration: 2000,
        });
        loading.value = false;
      }
      return;
    }
    if (userinfo.value) data.id = userinfo.value._id;
    try {
      console.log(data, userinfo.value);
      const { result } = await uniCloud.callFunction({ name: "login", data });
      uni.hideLoading();
      console.log(result);
      uni.showToast({
        title: result.message,
        icon: result.code == 1 ? "error" : "success",
      });
      if (result.code != 1) {
        if (result.code != 3) {
          console.log(result.userinfo);
          userinfo.value = result.userinfo;
          uni.setStorageSync("userinfo", result.userinfo);
          uni.setStorageSync("token", result.token);
          uni.switchTab({
            url: "/pages/user/user",
          });
          setTimeout(() => {
            show.value = true;
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
      loading.value = false;
    }
  } catch (e) {
    console.log(e);
    uni.showToast({
      title: e[0].errorMessage,
      icon: "error",
      duration: 2000,
    });
    uni.hideLoading();
    loading.value = false;
    return;
  }
  loading.value = false;
};

const logout = async () => {
  loading.value = true;
  const logoutRes = await uniCloud.callFunction({
    name: "logout",
  });
  console.log(logoutRes);
  if (logoutRes) {
    uni.setStorageSync("userinfo", "");
    userinfo.value = "";
    uni.showToast({
      title: "退出登录成功",
      icon: "success",
    });
    loading.value = false;
  }
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
    page.$vm.$refs.inputDialog.open();
  });
};
const types = {
  昵称: "nickName",
  姓名: "name",
  班级: "class",
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
      userinfo.value[types[type].replace("stuInfo.", "")] = text;
    }
    uni.setStorageSync("userinfo", userinfo.value);
    popupData.value = {};
    uni.showToast({
      title: "修改成功",
      icon: "success",
    });
    ifRenderDialog.value = true;
    page.$vm.$refs.inputDialog.close();
    return;
  }
  uni.showToast({
    title: "修改失败",
    icon: "none",
  });
};
const clearPopupValue = e => {
  console.log(popupData.value.value);
  popupData.value.value = "";
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
  loading.value = true;
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
      loading.value = false;
      return;
    }
  } catch (e) {
    console.log(e);
  }
  loading.value = false;
  uni.showToast({
    title: "上传失败",
    icon: "none",
  });
};
const ifRenderDialog = ref(false);

const addUserFormSubmit = async (type = 0) => {
  uni.showLoading({
    title: "加载中",
    mask: true,
  });
  loading.value = true;
  try {
    let data =
      type == 0
        ? await page.$vm.$refs.addStudentForm.validate()
        : await page.$vm.$refs.addAdminForm.validate();
    if (data.id != "") data._id = data.id;
    delete data.id;
    console.log(data);
    const db = uniCloud.database();
    const { result: getRes } = await db.collection("user").doc(data._id).field("_id").get();
    if (getRes.data.length > 0) {
      uni.showToast({
        title: "该id已存在",
        icon: "none",
      });
      loading.value = false;
      return;
    }
    const { result: addRes } = await db.collection("user").add({
      ...data,
      avatarUrl: "",
      pwd: "$2a$10$WOW5NsssssCKafZZNDt9PO54RS1ZgoulTWhPl/1c5TTTnUI/w34Pq",
      type: type,
    });
    console.log(addRes.id);
    if (addRes.id) {
      const { result: updateRes } = await db
        .collection("user")
        .doc(addRes.id)
        .update({
          avatarUrl: `https://api.multiavatar.com/${addRes.id}.png`,
          nickName: `微信管理员${addRes.id}`,
        });
      console.log(updateRes);
      const copyComfirm = await uni.showModal({
        title: "添加成功",
        content: "id:" + addRes.id,
        showCancel: true,
        confirmText: "复制",
      });
      addUserFormData.value = {};
      if (copyComfirm.confirm) {
        uni.setClipboardData({
          data: addRes.id,
          showToast: true,
        });
      }
    }
  } catch (e) {
    console.log(e);
    uni.showToast({
      title: e[0].errorMessage,
      icon: "none",
    });
  }
  loading.value = false;
  uni.hideLoading();
};
const resetPwdFormSubmit = async e => {
  uni.showLoading({
    title: "加载中",
    mask: true,
  });
  loading.value = true;
  try {
    let data = await page.$vm.$refs.resetPwdForm.validate();
    console.log(data);
    const db = uniCloud.database();
    const { result: updateRes } = await db.collection("user").doc(data.id).update({
      pwd: "$2a$10$WOW5NsssssCKafZZNDt9PO54RS1ZgoulTWhPl/1c5TTTnUI/w34Pq",
    });
    if (updateRes.updated > 0) {
      uni.showToast({
        title: "重置成功",
        icon: "success",
      });
      loading.value = false;
      return;
    }
  } catch (e) {
    console.log(e);
    uni.showToast({
      title: e[0].errorMessage,
      icon: "none",
    });
  }
  loading.value = false;
  uni.hideLoading();
};
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
.popup-clear {
  position: absolute;
  top: calc(50% + 2px);
  right: 30px;
  background: rgba(0, 0, 0, 0.2);
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  z-index: 100;
  transform: translateY(-50%);
}
.edgeInsetBottom {
  height: var(--window-bottom);
}
</style>
