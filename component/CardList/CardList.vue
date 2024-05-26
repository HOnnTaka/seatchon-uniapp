<template>
  <view>
    <uni-card class="card" padding="0">
      <template v-slot:title>
        <uni-section :title="title" type="line"></uni-section>
      </template>
        <slot></slot>
    </uni-card>
  </view>
</template>

<script setup>
import { ref, defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.card {
  margin: 10px !important;
}
</style>
