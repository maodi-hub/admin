<template>
  <component :is=""></component>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem } from "element-plus";

import type { InputType } from "./type";

interface Props {
  formItems?: InputType[]
}
const $props = withDefaults(defineProps<Props>(), {
  formItems: () => [],
})

defineOptions({
  name: "MForm"
})
</script>

<style scoped>

</style>