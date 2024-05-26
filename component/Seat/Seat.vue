<template>
  <view
    class="seat"
    :class="{ hide: item.status == 2, selected: item.index == selectedItem?.index }"
    :style="item.stuInfo ? `background-image:url(${item.stuInfo?.avatar});` : ''"
    @click="() => (selectedItem = item)"
  >
    <text>{{ item.stuInfo ? (item?.stuInfo?.id != userinfo._id ? "" : "你") : "空" }}</text>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped></style>
