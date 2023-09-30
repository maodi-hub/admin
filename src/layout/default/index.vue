<template>
  <section class="m-container flex">
    <aside class="m-aside flex fd-column">
      <AsideHeader />
      <AsideMenu :collapse="$menu.collapse" class="flex-1 min-h-0 min-w-0" />
      <Version />
    </aside>
    <section class="m-container flex-1 flex fd-column min-h-0 min-w-0">
      <header class="m-header flex ai-center gap-10">
        <m-icon inject-g-size @click="$menu.setCollapse(!$menu.collapse)">
          <component :is="$menu.collapse ? Expand : Fold"></component>
        </m-icon>
        <BreadCrumb />

        <div class="m-header__right flex ai-center gap-20">
          <ComponentSize />
          <Language />
          <Avatar />
        </div>
      </header>
      <section class="m-tags flex ai-center gap-5">
        <MenuTags class="flex-1 min-w-0" /> <PageSetting />
      </section>
      <main
        ref="main_container_ref"
        class="m-main container flex-1 min-w-0 min-h-0"
        id="main-container"
      >
        <div class="m-container">
          <RouterView #default="{ Component, route }">
            <KeepAlive
              ref="keep"
              :include="$menu.include_keep_route"
              :exclude="$menu.exclude_keep_route"
            >
              <component :is="Component" :key="route.fullPath" v-if="$menu.reload" />
            </KeepAlive>
          </RouterView>
        </div>
      </main>
    </section>
  </section>
</template>

<script setup lang="ts">
import { Expand, Fold } from "@element-plus/icons-vue";
import AsideHeader from "../components/aside/aside_header.vue";
import AsideMenu from "../components/aside/aside_menu.vue";
import Version from "../components/version/index.vue";
import Language from "../components/language/index.vue";
import Avatar from "../components/avatar/index.vue";
import ComponentSize from "../components/component_size/index.vue";
import MenuTags from "../components/tags/index.vue";
import BreadCrumb from "../components/bread_crumb/index.vue";
import PageSetting from "../components/page_setting/index.vue";

import { provide, ref, getCurrentInstance, watch } from "vue";
import { useRoute } from "vue-router";

import { useMenuStore } from "@/store/modules/menu";

const $this = getCurrentInstance();
const $menu = useMenuStore();

const keep = ref();
const main_container_ref = ref<HTMLDivElement>();
provide("main_container_ref", main_container_ref);

const $route = useRoute();

watch($route, (route) => {
  const { path, name, query, params, meta } = route;
  $menu.setMenuTag({ path, name, query, params, meta });
});
</script>

<style scoped lang="less">
.m-container {
  &:not(.m-aside) {
    height: 100%;
  }
  .m-aside {
    background-color: #141414;
  }
  & > .m-container {
    .m-header {
      padding: 0 10px 0 20px;
      height: 60px;
      background-color: #fff;
      &__right {
        margin-right: 0;
        margin-left: auto;
      }
    }
    .m-main {
      & > .m-container {
        overflow: auto;
        overflow-x: hidden;
      }
    }
    .m-tags {
      padding-right: 10px;
      // background-color: #fff;
    }
  }
}
</style>
