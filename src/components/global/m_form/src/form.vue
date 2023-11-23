<template>
  <ElForm
    ref="formInstance"
    :model="initParam"
    :inline="inline"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :rules="rules"
  >
    <slot />
    <template v-for="item in formItems" :key="item.uniqueKey">
      <MFormItem v-bind="item" v-if="item.isShow ?? true">
        <template
          v-for="slot in Object.keys($slots)"
          :key="slot"
          #[slot]="scope"
        >
          <slot :name="slot" v-bind="scope" />
        </template>
      </MFormItem>
    </template>
  </ElForm>
</template>

<script setup lang="ts">
import { ElForm } from "element-plus";
import MFormItem from "./form_item.vue";

import type { FormInstance } from "element-plus";
import type { MFormPropType } from "./type";

import { provide, ref } from "vue";

import { LABEL_SUFFIX_KEY, PARAM_KEY } from "./constant";

defineOptions({
  name: "MForm",
});

const $props = withDefaults(defineProps<MFormPropType>(), {
  labelPosition: "right",
  formItems: () => [],
  initParam: () => ({}),
});

const formInstance = ref<FormInstance>();

provide(PARAM_KEY, $props.initParam);
provide(LABEL_SUFFIX_KEY, $props.labelSuffix);

defineExpose({
  formInstance,
});
</script>

<style scoped></style>
