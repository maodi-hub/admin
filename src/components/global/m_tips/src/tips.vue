<template>
  <ElTooltip placement="top" :disabled="!tips">
    <template #content>
      <component :is="renderMsg(tips)" />
    </template>
    <MIcon
      class="tips-icon"
      ref="affix_item"
      name="Warning"
      size="14px"
      color="var(--el-color-warning)"
    />
  </ElTooltip>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";

// import type { MIconInstance } from "@/components/global/m_icon";
import type { MTipsPropType } from "./type";

import { onMounted, ref, unref } from "vue";
import { isFunction } from "lodash";

defineOptions({
  name: "MTips",
});

defineProps<MTipsPropType>();

// const affix_item = ref<MIconInstance>();

const renderMsg = (tips?: MTipsPropType["tips"]) => {
  if (isFunction(tips)) return tips;
  return () => tips;
};

onMounted(() => {
  // const affixItem = unref(affix_item);
  // if (!affixItem) return;
  // const affixTarget = affixItem.$el.parentElement as HTMLDivElement;
  // if (!affixItem || !affixTarget) return;
  // affixTarget.classList.add("sle");
  // affixTarget.classList.add("affix-target");
  // affixItem.$el.classList.add("affix-item");
  // console.log(affixItem);
});
</script>

<style scoped lang="less"></style>
