<template>
  {{ searchParam }}
  <ElForm
    :model="searchParam"
    :inline="inline"
    :label-width="labelWidth"
    :label-suffix="labelSuffix"
    :label-position="labelPosition"
    :rules="rules"
  >
    <slot />
    <template v-for="item in formItems" :key="item.uniqueKey">
      <MFormItem v-bind="item">
        <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </MFormItem>
    </template>
  </ElForm>
</template>

<script setup lang="ts">
import { ElForm } from "element-plus";
import MFormItem from "./form_item.vue";

import type { MFormPropType } from "./type";

import { provide } from "vue";

import { PARAM_KEY } from "./enum";

defineOptions({
  name: "MForm",
});

const $props = withDefaults(defineProps<MFormPropType>(), {
  labelPosition: "right",
  formItems: () => [],
  searchParam: () => ({}),
});

provide(PARAM_KEY, $props.searchParam);
</script>

<style scoped></style>
