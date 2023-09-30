<template>
  <el-select v-model="value" v-bind="bindProps" :loading="loading">
    <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script setup lang="ts">
import type { SelectionPropType, SelectionEmitsType } from "./type";

import { computed } from "vue";
import { Omit, omit } from "lodash";

import { useSelection } from "./hooks/useSelection";

defineOptions({
  name: "MSelection"
})

const $props = defineProps<SelectionPropType>();
const $emit = defineEmits<SelectionEmitsType>();

const { loading, handleFetchData, option } = useSelection($props);

const value = computed({
  get() {
    return $props.modelValue
  },
  set(v) {
    $emit('update:modelValue', v);
  }
})

const bindProps = computed(() => omit($props, 'optionEnumFn', 'modelValue', 'prefix'))
</script>

<style scoped></style>