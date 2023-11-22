<template>
  <el-drawer
    v-model="visible"
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

import type { BaseDrawerPropType, BaseModalEmitType } from "./type";

import { computed } from "vue";

defineOptions({
  name: "MDrawer",
});

const $props = withDefaults(defineProps<BaseDrawerPropType>(), {});

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
