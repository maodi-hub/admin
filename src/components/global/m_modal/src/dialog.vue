<template>
  <el-dialog
    v-model="visible"
    :width="width"
    :append-to-body="to_body"
    :draggable="can_draggable"
    :show-close="show_close_icon"
    :before-close="dialog_before_close"
    @open="$emit('dialog_open')"
    @close="$emit('dialog_close')"
  >
    <template #header>
      <slot name="header">{{ title }}</slot>
    </template>
    <slot></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElDialog } from "element-plus";

import type { BaseDialogPropType, BaseModalEmitType } from "./type";

import { computed } from "vue";

defineOptions({
  name: "MDialog",
});

const $props = withDefaults(defineProps<BaseDialogPropType>(), {});

const $emit = defineEmits<BaseModalEmitType>();

const visible = computed({
  get() {
    return $props.visible;
  },
  set(v) {
    $emit("update:visible", v);
  },
});
</script>

<style scoped lang="less"></style>
