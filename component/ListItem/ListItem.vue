<template>
  <view>
    <uni-list-item :title="title" :link="link">
      <template v-slot:footer>
        <slot>
          <text>{{ content }}</text>
        </slot>
      </template>
    </uni-list-item>
  </view>
</template>

<script setup>
// props
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  link: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
