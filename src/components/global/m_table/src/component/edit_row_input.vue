<template>
  <template v-if="editing_value">
    <el-input v-model="value"> </el-input>
  </template>
  <template v-else>
    <div class="edit-text pointer" @click="$emit('update:editing', true)">
      {{ value ?? "--" }}
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: any;
  editing?: boolean;
}
interface Emit {
  (e: "update:modelValue", v: any): void;
  (e: "update:editing", v: boolean): void;
}
const $props = defineProps<Props>();
const $emit = defineEmits<Emit>();

const value = computed({
  get() {
    return $props.modelValue;
  },
  set(v) {
    $emit("update:modelValue", v);
  },
});

const editing_value = computed({
  get() {
    return $props.editing;
  },
  set(v) {
    $emit("update:modelValue", v);
  },
});
</script>

<style scoped lang="less">
.edit-text i {
  vertical-align: bottom;
}
</style>
