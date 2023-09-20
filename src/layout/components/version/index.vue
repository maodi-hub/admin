<template>
  <div class="app-version">
    <div class="app-version__wrapper">
      <div class="app-version__content">
        <ElText>version</ElText> <br />
        <ElText>{{ version }}</ElText>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElText } from "element-plus";

import { get_package_json } from "@/utils/lib";

const { version } = get_package_json();
</script>

<style scoped lang="less">
.app-version {
  &__content {
    text-align: center;
    // word-wrap: break-word;
  }
}
</style>
