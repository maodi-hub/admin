<template>
  <div class="page-setting">
    <div class="page-setting__wrapper">
      <div class="page-setting__content flex jc-center ac-center">
        <el-dropdown @command="onCommandChange">
          <m-icon>
            <Setting />
          </m-icon>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="refresh">
                <m-icon>
                  <Refresh />
                </m-icon>
                <span>刷新</span>
              </el-dropdown-item>
              <el-dropdown-item command="full_screen">
                <m-icon>
                  <FullScreen />
                </m-icon>
                <span>最大化</span>
              </el-dropdown-item>
              <el-dropdown-item divided command="close_cur">
                <m-icon>
                  <Remove />
                </m-icon>
                <span>关闭当前</span>
              </el-dropdown-item>
              <el-dropdown-item command="close_oth">
                <m-icon>
                  <CircleClose />
                </m-icon>
                <span>关闭其他</span>
              </el-dropdown-item>
              <el-dropdown-item command="close_all">
                <m-icon>
                  <CloseBold />
                </m-icon>
                <span>关闭所有</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFullscreen } from "@vueuse/core";

import { ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus";

import { useMenuStore } from "@/store/modules/menu";

import type { Ref } from "vue";

const $route = useRoute();
const $router = useRouter();
const $menu = useMenuStore();

const main_conatiner_ref = inject<Ref<HTMLDivElement>>("main_container_ref");
const { toggle } = useFullscreen(main_conatiner_ref);

const command_event: Record<string, () => void> = {
  refresh: () => handleRefresh(),
  full_screen: () => handleFullScreen(),
  close_cur: () => handleCloseCur(),
  close_oth: () => handleCloseOth(),
  close_all: () => handleCloseAll(),
};

const handleRefresh = () => {
  setTimeout(() => {
    $menu.setUnKeepRoute($route.name as string);
    $menu.resetReloadPage(false);
    nextTick(() => {
      $menu.delUnKeepRoute($route.name as string);
      $menu.resetReloadPage(true);
    });
  }, 0);
};

const handleFullScreen = () => {
  toggle();
};

const handleCloseCur = () => {
  const path = $route.path;
  const cur_route = $menu.getCurrentMenuTag(path);
  if (!cur_route || cur_route.path == "/home") return;

  $menu.delMenuTag(cur_route, path);
  $router.push("/home");
};

const handleCloseOth = () => {
  const path = $route.path;
  const menu_tags = [...$menu.menu_tags];
  const need_rm_menu_tags = menu_tags.filter(
    (tag) => tag.path != "/home" && tag.path != path
  );
  need_rm_menu_tags.forEach((route) => $menu.delMenuTag(route, path));
};

const handleCloseAll = () => {
  $menu.resetMenuTag($route.path);
  $router.push("/home");
};

const onCommandChange = (command: string) => {
  const event = command_event[command];
  event && event();
};
</script>

<style scoped></style>
