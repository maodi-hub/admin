<template>
  <el-input type="textarea" v-model="input_value" :disabled="disabled">
    <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus";

import type { MTextareaPropType, MTextareaEmitType } from "./type";

import { computed } from "vue";

defineOptions({
  name: "MTextarea",
});

const $props = withDefaults(defineProps<MTextareaPropType>(), {});
const $emit = defineEmits<MTextareaEmitType>();

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
