<template>
  <ElCheckboxGroup v-model="value" :disabled="disabled">
    <template v-for="item in optionList" :key="item[propsOption.value]">
      <ElCheckbox :label="item[propsOption.value]" :disabled="item[propsOption.disabled]">
        {{ item[propsOption.label] }}
      </ElCheckbox>
    </template>
  </ElCheckboxGroup>
</template>

<script setup lang="ts" generic="OP extends Record<string, any>">
import { ElCheckboxGroup, ElCheckbox } from "element-plus";

import type { MCheckboxEmitType, MCheckboxPropType } from "./type";

import { computed } from "vue";

import { useOptions } from "@/hooks/useOptions";

defineOptions({
  name: "MCheckbox",
});

const $props = withDefaults(defineProps<MCheckboxPropType<OP>>(), {
  immediate: true,
  clearable: true,
});
const $emit = defineEmits<MCheckboxEmitType>();

const { optionList, propsOption, handleGetData } = useOptions<OP>(
  $props.enumOption,
  $props.props
);

const value = computed({
  get() {
    return $props.modelValue;
  },
  set(v) {
    $emit("update:modelValue", v);
  },
});

if ($props.immediate) handleGetData();

defineExpose({
  optionList,
  handleGetData,
});
</script>

<style scoped></style>
