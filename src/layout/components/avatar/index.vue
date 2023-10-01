<template>
  <div class="component-size">
    <div class="component-size__wrapper">
      <div class="component-size__content">
        <el-dropdown @command="onCommandChange">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            class="pointer"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled> 用户：adad </el-dropdown-item>
              <template v-for="(item, index) in size_options" :key="item.value">
                <el-dropdown-item :command="item.value" :divided="index == 0">
                  <m-icon :name="item.icon" />{{ item.label }}
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
import {
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElMessage,
} from "element-plus";

import { useRouter } from "vue-router";

import { useGlobalStore } from "@/store/modules/global";
import { useMenuStore } from "@/store/modules/menu";

import { AUTH } from "@/api";
import { resetRouter } from "@/router/routes";

const $router = useRouter();
const $global = useGlobalStore();
const $menu = useMenuStore();

const size_options = [
  { label: "修改密码", value: "edit_password", icon: "Edit" },
  { label: "退出", value: "quit", icon: "SwitchButton" },
];

const operation: Record<string, () => void> = {
  edit_password: () => {},
  quit: () => {
    // AUTH.logOut().then((res) => {
    //   if (res.code) {
    //     ElMessage.error("退出失败");
    //     return;
    //   }
    $global.setToken("");
    $menu.resetMenuTag();
    $router.replace("/login");
    // });
  },
};

const onCommandChange = (name: string) => {
  const fn = operation[name];
  fn && fn();
};
</script>

<style scoped></style>
