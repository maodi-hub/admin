<template>
  <el-select
    v-model="value"
    v-bind="bindProps"
    :remote-method="onRemoteMethod"
    :loading="loading"
  >
    <el-option
      v-for="item in option"
      :key="item[fileds_Props.value]"
      :label="item[fileds_Props.label]"
      :value="item[fileds_Props.value]"
    />
  </el-select>
</template>

<script setup lang="ts">
import type { SelectionPropType, SelectionEmitsType } from "./type";

import { computed, onMounted } from "vue";
import { Omit, omit } from "lodash";

import { useSelection } from "./hooks/useSelection";

defineOptions({
  name: "MSelection",
});

const $props = defineProps<SelectionPropType>();
const $emit = defineEmits<SelectionEmitsType>();

const { loading, handleFetchData, option } = useSelection($props);

const value = computed({
  get() {
    return $props.modelValue;
  },
  set(v) {
    $emit("update:modelValue", v);
  },
});

const fileds_Props = computed(() => {
  const DEFAULT_FIELDS = { value: "value", label: "label" };
  const { props } = $props;
  if (!props) return DEFAULT_FIELDS;
  return Object.assign({}, DEFAULT_FIELDS, props);
});

const bindProps = computed(() =>
  omit(
    $props,
    "optionEnumFn",
    "modelValue",
    "prefix",
    "remoteMethod",
    "props",
    "unique_key"
  )
);

const onRemoteMethod = (val: string) => {
  const { remoteMethod } = $props;
  if (!remoteMethod) return;
  remoteMethod(val, option, loading, handleFetchData);
};

onMounted(handleFetchData);
</script>

<style scoped></style>
