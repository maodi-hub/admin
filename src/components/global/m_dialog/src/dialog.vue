<template>
  <el-dialog
    v-model="show_dialog"
    :width="width"
    :append-to-body="to_body"
    :draggable="can_draggable"
    :align-center="dialog_is_center"
    :center="align_center"
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

import type { DialogBeforeCloseFn } from "element-plus";

import { ref } from "vue";

interface Props {
  title?: string;
  width?: string | number;
  to_body?: boolean;
  can_draggable?: boolean;
  show_close_icon?: boolean;
  align_center?: boolean;
  dialog_is_center?: boolean;
  dialog_before_close?: DialogBeforeCloseFn;
}

interface Emit {
  (e: "dialog_open"): void;
  (e: "dialog_close"): void;
}

defineOptions({
  name: "MDialog",
});

withDefaults(defineProps<Props>(), {
  title: "",
  width: "50%",
  show_close_icon: true,
});

const $emit = defineEmits<Emit>();

const show_dialog = ref(false);

const handleOpen = () => {
  show_dialog.value = true;
};

const handleClose = () => {
  show_dialog.value = false;
};

defineExpose({
  handleOpen,
  handleClose,
});
</script>

<style scoped lang="less"></style>
