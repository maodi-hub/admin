<template>
  <div class="component-size">
    <div class="component-size__wrapper">
      <div class="component-size__content">
        <el-dropdown @command="onCommandChange">
          <el-image :src="img_size" loading="eager" style="width: 24px" class="pointer" />
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="item in size_options" :key="item.value">
                <el-dropdown-item :command="item.value">
                  {{ item.label }}
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import img_size from "@/assets/icons/size.png?inline";

import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElImage } from "element-plus";

import type { GlobalState } from "@/store/interface";

import { useGlobalStore } from "@/store/modules/global";

const $global = useGlobalStore();

const size_options = [
  { label: "默认", value: "default" },
  { label: "小", value: "small" },
  { label: "大", value: "large" },
];

const onCommandChange = (name: GlobalState["size"]) => {
  $global.setSize(name);
};
</script>

<style scoped></style>
