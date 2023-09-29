<template>
  <ElForm :model="params" v-bind="base_config">
    <template v-for="item in formItems" :key="item.prop">
      <ElFormItem :label="item.label" :prop="item.prop" :rules="item.rule">
        <template #label="{label}">
          <slot :name="`${item.prop}_label`">{{ label }}  </slot>
        </template>
        <MFormItem :config="item" :params="params" />
      </ElFormItem>
    </template>
  </ElForm>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem } from "element-plus";
import MFormItem from "./m_form_item.vue";

import type { FormConfigPropType } from "./type";

import { watch } from "vue";

const $props = withDefaults(defineProps<FormConfigPropType>(), {
  params: () => ({}),
  formItems: () => [],
})

defineOptions({
  name: "MForm"
})

let reset_fields: Record<string, any> = $props.params;
watch(() => $props.params, (v) => {
  reset_fields = v;
  console.log("set default", reset_fields);
}, {
  deep: false
})
</script>

<style scoped></style>