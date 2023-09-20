<template>
  <el-menu
    unique-opened
    :default-active="default_active"
    :collapse="collapse"
    style="
      --el-menu-text-color: #fff;
      --el-menu-hover-text-color: #fff;
      --el-menu-bg-color: #141414;
      --el-menu-hover-bg-color: black;
      --el-menu-active-color: #fff;
      --el-menu-level: 0;
    "
  >
    <MenuItem :menu_list="menu_list" @jump="handleJump" />
  </el-menu>
</template>

<script setup lang="ts">
import MenuItem from "./menu_item.vue";
import { ElMenu } from "element-plus";

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useMenuStore } from "@/store/modules/menu";

interface Props {
  collapse?: boolean;
}
defineProps<Props>();

const $router = useRouter();
const $menu = useMenuStore();
const { menu_list } = storeToRefs($menu);

const $route = useRoute();
const default_active = computed(() => $route.path);

const handleJump = (menu: Menu.MenuOptions) => {
  const { name, path } = menu;
  const { isLink } = menu.meta;
  if (isLink) {
    window.open(path, "_blank");
    return;
  }

  $router.push({ name });
};
</script>

<style scoped lang="less">
.el-menu {
  border-right: none;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
  :deep(.el-menu-item) {
    &.is-active {
      background-color: black;
    }
  }
}
</style>
