<template>
  <ElRadioGroup v-model="input_value">
    <template v-for="item in optionList" :key="item.value">
      <ElRadio :label="item[propsOption.value]" :disabled="item[propsOption.disabled]">
        {{ item[propsOption.label] }}
      </ElRadio>
    </template>
  </ElRadioGroup>
</template>

<script setup lang="ts" generic="OP extends Record<string, any>">
import { ElRadio, ElRadioGroup } from "element-plus";

import type { MRadioEmitType, MRadioPropType } from "./type";

import { computed } from "vue";

import { useOptions } from "@/hooks/useOptions";

defineOptions({
  name: "MRadio",
});

const $props = withDefaults(defineProps<MRadioPropType<OP>>(), {});
const $emit = defineEmits<MRadioEmitType>();

const { optionList, propsOption, handleGetData } = useOptions<OP>(
  $props.enumOption,
  $props.props
);

const input_value = computed({
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
