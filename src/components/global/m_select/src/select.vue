<template>
  <ElSelect v-model="input_value" :disabled="disabled">
    <!-- <ElOption >
    <slot/></ElOption> -->
  </ElSelect>
</template>

<script setup lang="ts">
import { ElSelect, ElOption } from "element-plus";

import type { MSelectEmitType, MSelectPropType } from "./type";

import { computed } from "vue";

defineOptions({
  name: "MSelect",
});

const $props = withDefaults(defineProps<MSelectPropType>(), {});
const $emit = defineEmits<MSelectEmitType>();

const input_value = computed({
  get() {
    return $props.modelValue;
  },
  set(v) {
    $emit("update:modelValue", v);
  },
});
</script>

<style scoped></style>
