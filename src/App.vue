<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";

import { useGlobalStore } from "@/store/modules/global";

const $global = useGlobalStore();
</script>

<template>
  <el-config-provider :z-index="2000" :locale="locale" :size="$global.size">
    <router-view></router-view>
  </el-config-provider>
</template>

<style></style>
