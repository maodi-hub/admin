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
      <ElSpace :size="2" v-else>
        <slot :name="getSlotName(uniqueKey, FORM_LABEL_SUFFIX)" v-bind="slot_prop.label">
          <span>{{ label }}</span>
          <template v-if="tips">
            <ElTooltip placement="top">
              <template #content>
                <component :is="tips" />
              </template>
              <MIcon name="Warning" size="14px" color="var(--el-color-warning)" />
            </ElTooltip>
          </template>
          <span v-if="labelSuffix">{{ labelSuffix }}</span>
        </slot>
      </ElSpace>
    </template>
    <!-- 默认内容 -->
    <template #default>
      <!-- 默认内容 -->
      <slot />
      <!-- 嵌套表单项 -->
      <template v-if="hasChildren">
        <template v-for="item in hasChildren" :key="item.uniqueKey">
          <MFormItem v-bind="item" v-if="item.isShow ?? true">
            <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="scope">
              <slot :name="slot" v-bind="scope" />
            </template>
          </MFormItem>
        </template>
      </template>
      <!-- 自定义渲染 -->
      <template v-else-if="_renderContent">
        <component :is="_renderContent" :item="$props" />
      </template>
      <!-- unikey插槽内容 -->
      <slot
        v-else
        :name="getSlotName(uniqueKey, FORM_CONTENT_SUFFIX)"
        v-bind="slot_prop.content"
      >
        <component
          v-if="component"
          :is="component.name"
          v-model="searcParam[prop!]"
          v-bind="component"
        ></component>
      </slot>
    </template>
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElFormItem, ElTooltip, ElSpace } from "element-plus";

import type { MFormItemPropType } from "./type";

import { computed, inject } from "vue";
import { isArray, omit, pick } from "lodash";

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

const hasChildren = computed(() => {
  const { _children } = $props;
  if (!isArray(_children)) return;
  return _children;
});

defineSlots<Record<string, any>>();
</script>

<style scoped></style>
