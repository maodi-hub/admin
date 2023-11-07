<template>
  <div class="tool-bar">
    <div class="tool-bar__wrapper">
      <div class="tool-bar__content">
        <el-scrollbar view-class="flex jc-between gap-20" wrap-class="p-5">
          <slot />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
</script>

<style scoped></style>
