<template>
  <component v-model="params[config.prop]" :is="`el-${config.el_type}`" v-bind="config">
    <template v-if="config.type != 'textarea'">
      <RenderSlot/>
    </template>
  </component>
</template>

<script setup lang="ts">
import { RenderSlot } from "./render";
import type { InputType, TextAreaType } from "./type";

interface Props {
  params: Record<string, any>
  config: InputType | TextAreaType
}

interface Emits {
  (e: "update:params", v: Props['params']): void
}

const $props = withDefaults(defineProps<Props>(), {
  params: () => ({})
})

const $emit = defineEmits<Emits>();

</script>

<style scoped></style>