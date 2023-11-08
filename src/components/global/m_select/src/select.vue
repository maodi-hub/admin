<template>
  <ElSelect
    v-model="input_value"
    :disabled="disabled"
    :multiple="mutiple"
    :clearable="clearable"
    :loading="loading"
  >
    <template v-for="slot in Object.keys($slots)" #[slot]="scope" :key="slot">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
    <template v-for="item in optionsList" :key="item[propsOption.value]">
      <el-option :value="item[propsOption.value]" :disabled="item[propsOption.disabled]">
        <slot name="option_item" v-bind="item">
          {{ item[propsOption.label] }}
        </slot>
      </el-option>
    </template>
  </ElSelect>
</template>

<script setup lang="ts" generic="OP extends Record<string, any>">
import { ElSelect, ElOption } from "element-plus";

import type { MSelectEmitType, MSelectPropType } from "./type";

import { computed, watch } from "vue";

import { useSelect } from "./hooks";

defineOptions({
  name: "MSelect",
});

const $props = withDefaults(defineProps<MSelectPropType<OP>>(), {
  immediate: true,
  clearable: true,
});
const $emit = defineEmits<MSelectEmitType>();

const { loading, optionsList, handleGetData } = useSelect<OP>($props.enumOption);

const input_value = computed({
  get() {
    return $props.modelValue;
  },
  set(v) {
    $emit("update:modelValue", v);
  },
});

const propsOption = computed(() => {
  const { label = "label", value = "value", disabled = "disabled" } = $props.props || {};
  return {
    label,
    value,
    disabled,
  };
});

if ($props.immediate) handleGetData();

watch(() => $props.enumOption, handleGetData);

defineExpose({
  optionsList,
  handleGetData,
});
</script>

<style scoped></style>
