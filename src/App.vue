<script setup lang="ts">
import { ElConfigProvider } from "element-plus";

import zh from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";

import { useEventListener } from "@vueuse/core";
import { useGlobalStore } from "@/store/modules/global";
import { useMenuStore } from "@/store/modules/menu";

import { computed } from "vue";
import debounce from "lodash/debounce";

const $global = useGlobalStore();
const $menu = useMenuStore();

const locale = computed(() => {
  const langs: Record<string, any> = {
    zh,
    en,
  };
  return langs[$global.language] || langs["zh"];
});

useEventListener(
  "resize",
  debounce(() => {
    const w = document.documentElement.offsetWidth;
    if (w > 768) return;
    $menu.setCollapse(true);
  }, 300)
);
</script>

<template>
  <el-config-provider :z-index="2000" :locale="locale" :size="$global.size">
    <router-view></router-view>
  </el-config-provider>
</template>

<style></style>
