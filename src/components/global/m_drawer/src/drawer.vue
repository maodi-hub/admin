<template>
  <el-drawer
    v-model="show_dialog"
    :direction="direction"
    :with-header="with_header"
    :append-to-body="to_body"
    :show-close="show_close_icon"
    :before-close="dialog_before_close"
    @open="$emit('dialog_open')"
    @close="$emit('dialog_close')"
  >
    <template #header>
      <div class="m-drawer__title">
        <slot name="header">{{ title }}</slot>
      </div>
    </template>
    <slot></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ElDrawer } from "element-plus";

import type { DialogBeforeCloseFn } from "element-plus";
import type { EpPropMergeType } from "element-plus/es/utils";

import { ref } from "vue";

interface Props {
  title?: string;
  width?: string | number;
  direction?: EpPropMergeType<StringConstructor, "ltr" | "rtl" | "ttb" | "btt", unknown>;
  to_body?: boolean;
  with_header?: boolean;
  show_close_icon?: boolean;
  dialog_before_close?: DialogBeforeCloseFn;
}

interface Emit {
  (e: "dialog_open"): void;
  (e: "dialog_close"): void;
}

defineOptions({
  name: "MDrawer",
});

withDefaults(defineProps<Props>(), {
  title: "",
  width: "30%",
  with_header: true,
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
