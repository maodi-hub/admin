<script setup lang="ts">
import { ElConfigProvider } from "element-plus";

import locale from "element-plus/lib/locale/lang/zh-cn";

import { useEventListener } from "@vueuse/core";
import { useGlobalStore } from "@/store/modules/global";
import { useMenuStore } from "@/store/modules/menu";

import debounce from "lodash/debounce";

const $global = useGlobalStore();
const $menu = useMenuStore();

useEventListener(
  "resize",
  debounce(() => {
    const w = document.documentElement.offsetWidth;
    if (w > 768) return;
    $menu.setCollapse(true);
  })
);
</script>

<template>
  <el-config-provider :z-index="2000" :locale="locale" :size="$global.size">
    <router-view></router-view>
  </el-config-provider>
</template>

<style></style>
