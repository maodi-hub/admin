<template>
  <ElForm
    ref="form_ref"
    :model="initParam"
    :inline="inline"
    :label-width="labelWidth"
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

import type { Arrayable } from "@vueuse/core";
import type { FormInstance, FormItemProp } from "element-plus";
import type { MFormPropType } from "./type";

import { provide, ref, unref } from "vue";

import { LABEL_SUFFIX_KEY, PARAM_KEY } from "./constant";

defineOptions({
  name: "MForm",
});

const $props = withDefaults(defineProps<MFormPropType>(), {
  labelPosition: "right",
  formItems: () => [],
  initParam: () => ({}),
});

const form_ref = ref<FormInstance>();

const checkInstance = () => {
  const form_instance = unref(form_ref);
  if (!form_instance) {
    throw new Error("form instance is null");
  }
};

const validate = () => {
  checkInstance();
  return unref(form_ref)!.validate();
};

const validateField = (props?: Arrayable<FormItemProp>) => {
  checkInstance();
  return unref(form_ref)!.validateField(props);
};

const resetFields = (props?: Arrayable<FormItemProp>) => {
  checkInstance();
  return unref(form_ref)!.resetFields(props);
};

const scrollToField = (prop: FormItemProp) => {
  checkInstance();
  return unref(form_ref)!.resetFields(prop);
};

const clearValidate = (props?: Arrayable<FormItemProp>) => {
  checkInstance();
  return unref(form_ref)!.clearValidate(props);
};

provide(PARAM_KEY, $props.initParam);
provide(LABEL_SUFFIX_KEY, $props.labelSuffix);

defineExpose({
  validate,
  validateField,
  resetFields,
  scrollToField,
  clearValidate,
});
</script>

<style scoped></style>
