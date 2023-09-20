<template>
  <template v-for="menu in menu_list" :key="menu.path">
    <el-sub-menu v-if="handleHasChildren(menu)" :index="menu.path">
      <template #title>
        <m-icon>
          <component :is="menu.meta?.icon || ''" />
        </m-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <MenuItem :menu_list="menu.children!" @jump="(v) => $emit('jump', v)" />
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path" @click="$emit('jump', menu)">
      <m-icon>
        <component :is="menu.meta?.icon || ''" />
      </m-icon>
      <template #title>
        <span>{{ menu.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { ElMenuItem, ElSubMenu } from "element-plus";
import MenuItem from "./menu_item.vue";

interface Prop {
  menu_list: Menu.MenuOptions[];
}
defineProps<Prop>();
defineEmits<{ jump: [v: Menu.MenuOptions] }>();

const handleHasChildren = (menu: Menu.MenuOptions) =>
  !!(menu.children && menu.children.length);
</script>

<style scoped lang="less"></style>
