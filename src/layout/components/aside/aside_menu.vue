<template>
  <div class="aside-menu">
    <div class="aside-menu__wrapper">
      <div class="aside-menu__content">
        <ElScrollbar> <Menu :collapse="collapse" /> </ElScrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import Menu from "../menu/menu.vue";

interface Props {
  collapse?: boolean;
}
defineProps<Props>();
</script>

<style scoped lang="less">
.aside-menu {
  height: 100%;
  &__wrapper {
    height: 100%;
  }
  &__content {
    height: 100%;
  }
}
</style>
