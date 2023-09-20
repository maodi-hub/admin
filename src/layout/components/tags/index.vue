<template>
  <div class="menu-tags">
    <div class="menu-tags__wrapper">
      <div class="menu-tags__content">
        <el-tabs
          type="card"
          v-model="active_tag"
          @tab-click="onTabClick"
          @tab-remove="onTabRemove"
        >
          <template v-for="tag in menu_tags" :key="tag.name">
            <el-tab-pane
              :label="tag.meta?.title"
              :name="tag.path"
              :closable="tag.path != '/home'"
            >
              <template #label>
                <m-icon inject-g-size v-if="tag.meta?.icon">
                  <component :is="tag.meta.icon"></component>
                </m-icon>
                {{ tag.meta?.title }}
              </template>
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElTabs, ElTabPane } from "element-plus";

import type { TabsPaneContext, TabPaneName } from "element-plus";

import { ref, watch, unref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useMenuStore } from "@/store/modules/menu";

const $route = useRoute();
const $router = useRouter();
const $menu = useMenuStore();

const { menu_tags } = storeToRefs($menu);

const active_tag = ref($route.path);

const onTabClick = (pane: TabsPaneContext) => {
  const path = pane.paneName as string;
  const route = $menu.getCurrentMenuTag(path);
  if (!route) return;
  $router.push(route);
};

const onTabRemove = (name: TabPaneName) => {
  const path = name as string;
  const route = $menu.getCurrentMenuTag(path);
  if (!route) return;

  const tag_index = $menu.delMenuTag(route, unref(active_tag));
  if (tag_index == -1) return;

  const jump_index = handleCheckTag(tag_index);
  const jump_route = unref(menu_tags)[jump_index];
  $router.push(jump_route);
};

const handleCheckTag = (index: number) => {
  const length = unref(menu_tags).length;
  if (index >= length) return length - 1;
  return index - 1;
};

watch($route, (route) => (active_tag.value = route.path));
</script>

<style scoped lang="less">
:deep(.el-tabs) {
  .el-tabs__header {
    margin: 0;
  }
}
</style>
