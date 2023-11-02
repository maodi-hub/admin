<template>
  <ElFormItem :label="label" :label-width="labelWidth" :prop="prop" :rules="rules">
    <!-- label -->
    <template #label>
      <template v-if="_renderLabel">
        <component :is="_renderLabel" v-bind="slot_prop.label" />
      </template>
      <ElSpace :size="2" v-else>
        <slot :name="getSlotName(uniqueKey, LABEL_SUFFIX)" v-bind="slot_prop.label">
          <span>{{ label }}</span>
          <template v-if="tips">
            <ElTooltip placement="top">
              <template #content>
                <component :is="tips" />
              </template>
              <MIcon name="Warning" size="14px" />
            </ElTooltip>
          </template>
        </slot>
      </ElSpace>
    </template>
    <!-- 默认内容 -->
    <template #default>
      <template v-if="_renderContent">
        <component :is="_renderContent" :item="$props" />
      </template>
      <slot
        v-else
        :name="getSlotName(uniqueKey, CONTENT_SUFFIX)"
        v-bind="slot_prop.content"
      >
        <ElInput v-model="searcParam[prop!]" />
      </slot>
    </template>
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElFormItem, ElTooltip, ElSpace, ElInput } from "element-plus";

import type { MFormItemPropType } from "./type";

import { computed, inject } from "vue";
import { omit, pick } from "lodash";

import { getSlotName } from "@/components/shared";

import { LABEL_SUFFIX, CONTENT_SUFFIX, PARAM_KEY } from "./enum";

const $props = defineProps<MFormItemPropType>();

const searcParam = inject(PARAM_KEY, {});

const slot_prop = computed(() => {
  const label_includes = ["label", "tips"] as const;
  const label = pick($props, ...label_includes);

  const content = omit($props, ...label_includes);
  return {
    label,
    content,
  };
});
</script>

<style scoped></style>
