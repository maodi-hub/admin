<template>
  <ElSelect
    v-model="input_value"
    :disabled="disabled"
    @[trigger]="enumOptionFn"
  >
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template v-for="item in optionsList" :key="item[propsOption.value]">
      <el-option
        :value="item[propsOption.value]"
        :disabled="item[propsOption.disabled]"
      >
        {{ item[propsOption.label] }}
      </el-option>
    </template>
  </ElSelect>
</template>

<script setup lang="ts" generic="OP extends Record<string, any>">
import { ElSelect, ElOption } from "element-plus";

import type { MSelectEmitType, MSelectPropType } from "./type";

import { computed } from "vue";

import { useSelect } from "./hooks";

defineOptions({
  name: "MSelect",
});

const $props = withDefaults(defineProps<MSelectPropType<OP>>(), {
  immediate: true,
});
const $emit = defineEmits<MSelectEmitType>();

const { optionsList, handleGetData } = useSelect<OP>($props.enumOptionFn);

const input_value = computed({
  get() {
    return $props.modelValue;
  },
  set(v) {
    $emit("update:modelValue", v);
  },
});

const propsOption = computed(() => {
  const {
    label = "label",
    value = "value",
    disabled = "disabled",
  } = $props.props || {};
  return {
    label,
    value,
    disabled,
  };
});

if ($props.immediate) handleGetData();

defineExpose({
  optionsList,
  handleGetData,
});
</script>

<style scoped></style>
