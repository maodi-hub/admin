<template>
  <ElIcon :size="icon_size" :color="color">
    <slot>
      <template v-if="name">
        <component :is="name"></component>
      </template>
    </slot>
  </ElIcon>
</template>

<script setup lang="ts">
import { ElIcon } from "element-plus";

import type { GlobalState } from "@/store/interface";

import { computed } from "vue";

import { useGlobalStore } from "@/store/modules/global";

import { ICON_SIZE } from "./const";

interface Props {
  name?: string;
  size?: GlobalState["size"] | number | (string & {});
  color?: string;
  injectGSize?: boolean;
}
const $props = withDefaults(defineProps<Props>(), {
  injectGSize: true,
});
defineOptions({
  name: "MIcon",
});

const $global = useGlobalStore();

const icon_size = computed<Props["size"]>(() => {
  const { size, injectGSize } = $props;
  return size ?? injectGSize ? ICON_SIZE[$global.size] || "" : "";
});
</script>

<style scoped></style>
