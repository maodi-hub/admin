<template>
  <ElTooltip :visible="visible" :placement="placement">
    <template #content>
      <slot />
    </template>
    <div
      :class="{ sle: canShow }"
      v-bind="$attrs"
      ref="container_ref"
      @mouseenter="onMouseEnter"
      @mouseleave="onMounseLeave"
    >
      <span><slot /></span>
    </div>
  </ElTooltip>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";

import type { MOverflowPromptPropType } from "./type";

import { ref, unref, nextTick, onBeforeUnmount } from "vue";
import { useResizeObserver } from "@vueuse/core";

const $props = withDefaults(defineProps<MOverflowPromptPropType>(), {
  placement: "top",
});

const visible = ref(false);
const can_scroll = ref(false);

const container_ref = ref<HTMLElement>();
const resize_observe = useResizeObserver(container_ref, () => {
  nextTick().then(() => {
    checkElement();
    const container = unref(container_ref)!;
    can_scroll.value = container.scrollWidth > container.clientWidth;
  });
});

const checkElement = () => {
  if (unref(container_ref)) return;
  throw new Error("element is null");
};

const onMouseEnter = () => {
  if (!$props.canShow || !unref(can_scroll)) return;
  visible.value = true;
};

const onMounseLeave = () => {
  visible.value = false;
};

onBeforeUnmount(() => {
  resize_observe.stop();
});
</script>

<style scoped></style>
