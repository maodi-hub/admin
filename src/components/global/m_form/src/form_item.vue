<template>
  <ElFormItem
    v-if="isShow"
    :label="label"
    :label-width="labelWidth"
    :prop="prop"
    :rules="rules"
  >
    <!-- label -->
    <template #label>
      <template v-if="_renderLabel">
        <component :is="_renderLabel" v-bind="slot_prop.label" />
      </template>
      <template v-else>
        <slot
          :name="getSlotName(uniqueKey, FORM_LABEL_SUFFIX)"
          v-bind="slot_prop.label"
        >
          {{ label }}
          <span v-if="labelSuffix">{{ labelSuffix }}</span>
        </slot>
      </template>
    </template>
    <!-- 默认内容 -->
    <template #default>
      <div class="flex flex-1 ai-center gap-5 min-w-0 f-wrap">
        <!-- 自定义渲染 -->
        <template v-if="_renderContent">
          <component :is="_renderContent" :item="$props" />
        </template>
        <!-- 默认内容 -->
        <slot v-else>
          <component
            v-if="component"
            :is="component.name"
            v-model="searcParam[prop!]"
            v-bind="component"
            class="flex-1 min-w-0"
          ></component>
        </slot>
        <!-- unikey插槽内容 -->
        <slot
          :name="getSlotName(uniqueKey, FORM_CONTENT_SUFFIX)"
          v-bind="slot_prop.content"
        >
        </slot>
        <MTips :tips="tips" v-if="tips" />
      </div>
    </template>
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElFormItem } from "element-plus";

import type { MFormItemPropType } from "./type";

import { computed, inject } from "vue";
import { omit, pick } from "lodash";

import { getSlotName } from "@/shared";

import {
  FORM_LABEL_SUFFIX,
  FORM_CONTENT_SUFFIX,
  PARAM_KEY,
  LABEL_SUFFIX_KEY,
} from "./constant";

defineOptions({
  name: "MFormItem",
});

const $props = withDefaults(defineProps<MFormItemPropType>(), {
  isShow: true,
});

const searcParam = $props.searchParam ?? inject(PARAM_KEY, {});
const labelSuffix = inject(LABEL_SUFFIX_KEY, void 0);

const slot_prop = computed(() => {
  const label_includes = ["label", "tips"] as const;
  const label = pick($props, ...label_includes);

  const content = omit($props, ...label_includes);
  return {
    label: { ...label, labelSuffix },
    content,
  };
});

defineSlots<Record<string, any>>();
</script>

<style scoped></style>
