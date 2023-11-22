<template>
  <component
    :is="type === 'dialog' ? Dialog : Drawer"
    v-bind="$props"
    v-model:visible="model_visible"
  ></component>
</template>

<script setup lang="ts">
import Dialog from "./dialog.vue";
import Drawer from "./drawer.vue";

import type { MModalPropType, BaseModalEmitType } from "./type";

import { computed } from "vue";

defineOptions({
  name: "MModal",
});

const $props = withDefaults(defineProps<MModalPropType>(), {
  type: "dialog",
  show_close_icon: true,
});

const $emit = defineEmits<BaseModalEmitType>();

const model_visible = computed({
  get() {
    return $props.visible;
  },
  set(v) {
    $emit("update:visible", v);
  },
});
</script>

<style scoped lang="less"></style>
