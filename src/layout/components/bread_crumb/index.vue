<template>
  <div class="bread-crumb">
    <div class="bread-crumb__wrapper">
      <div class="bread-crumb__content">
        <el-breadcrumb separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">
            <div class="flex ai-center gap-5">
              <m-icon inject-g-size>
                <component is="HomeFilled" />
              </m-icon>
              首页
            </div>
          </el-breadcrumb-item>
          <transition-group name="trans-fade" appear>
            <template v-for="route in route_list" :key="route.path">
              <el-breadcrumb-item>
                <!-- 下拉菜单选项 -->
                <el-dropdown
                  v-if="route?.children && route.children.length"
                  @command="onDropdownCommand"
                >
                  <div class="flex ai-center gap-5">
                    <m-icon inject-g-size v-if="route.meta?.icon">
                      <component :is="route.meta.icon" />
                    </m-icon>
                    {{ route.meta?.title }}
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <template v-for="child in handleFilterChildren(route.children)">
                        <el-dropdown-item
                          :disabled="child.path == $route.path"
                          :command="child.path"
                        >
                          <m-icon inject-g-size v-if="child.meta?.icon">
                            <component :is="child.meta.icon" />
                          </m-icon>
                          {{ child.meta?.title }}
                        </el-dropdown-item>
                      </template>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <!-- 普通文字 -->
                <template v-else>
                  <div class="flex ai-center gap-5">
                    <m-icon inject-g-size v-if="route.meta?.icon">
                      <component :is="route.meta.icon" />
                    </m-icon>
                    {{ route.meta?.title }}
                  </div>
                </template>
              </el-breadcrumb-item>
            </template>
          </transition-group>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon,
} from "element-plus";

import { useMenuStore } from "@/store/modules/menu";

const $route = useRoute();
const $router = useRouter();
const $menu = useMenuStore();

const route_list = computed(() => {
  const cur_path = $route.path;
  const get_flat_routes = $menu.flat_routes;
  const get_flat_bread_list = $menu.flat_bread_list;
  const bread_list = get_flat_bread_list(cur_path);
  return bread_list.map((path) => get_flat_routes(path));
});

const handleFilterChildren = (menus: Menu.MenuOptions[]) => {
  return menus.filter((item) => !item.children);
};

const onDropdownCommand = (path: string) => {
  const route = $menu.getCurrentMenuTag(path);
  if (!route) {
    $router.push(path);
    return;
  }
  $router.push(route);
};
</script>

<style scoped></style>
