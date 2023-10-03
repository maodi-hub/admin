<template>
  <template v-if="editing">
    <el-input ref="input_ref" v-model="value">
      <template #suffix>
        <el-tooltip placement="top" content="cancel">
          <el-button icon="Close" link @click="handleCancel" />
        </el-tooltip>
      </template>
    </el-input>
  </template>
  <template v-else>
    <div
      class="edit-text pointer"
      @click="handleClick"
      @mouseenter="showtips = true"
      @mouseleave="showtips = false"
    >
      {{ value ?? "--" }}<m-icon v-show="showtips" name="Edit" class="ml-5" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";

import type { InputInstance } from "element-plus";

import { ref, computed, watch, nextTick, onMounted, unref } from "vue";

interface Props {
  modelValue: any;
  editing?: boolean;
}
interface Emit {
  (e: "update:modelValue", v: any): void;
  (e: "editingChange", v: boolean): void;
  (e: "change", v: boolean): void;
}
const $props = defineProps<Props>();
const $emit = defineEmits<Emit>();

const input_ref = ref<InputInstance>();

const showtips = ref(false);

const value = computed({
  get() {
    return $props.modelValue;
  },
  set(v) {
    const state = v == reset_value ? false : true;
    $emit("change", state);
    $emit("update:modelValue", v);
  },
});

const handleClick = async () => {
  $emit("editingChange", true);
  await nextTick();
  unref(input_ref)?.focus();
};

const handleCancel = () => {
  showtips.value = false;
  $emit("change", false);
  $emit("editingChange", false);
  $emit("update:modelValue", reset_value);
};

let reset_value: any;
watch(
  () => $props.editing,
  (v) => {
    !v && handleCancel();
    // v && (reset_value = $props.modelValue);
  }
);
onMounted(() => {
  reset_value = $props.modelValue;
});
</script>

<style scoped lang="less">
.edit-text i {
  vertical-align: bottom;
}
</style>
