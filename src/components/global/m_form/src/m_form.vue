<template>
  <ElForm :model="params" v-bind="form_base_config" ref="form_ref">
    <template v-for="item in formItems" :key="item.prop">
      <ElFormItem :label="item.label" :prop="item.prop" :rules="item.rule">
        <template #label="{ label }">
          <el-space :size="2">
            <slot :name="`${item.prop}_label`">{{ label }}</slot>
            <el-tooltip v-if="item.tips" placement="top">
              <template #content>
                <component :is="getTips(item.tips)" />
              </template>
              <MIcon name="Warning" />
            </el-tooltip>
          </el-space>
        </template>
        <slot :name="`${item.prop}_item`" :param="params">
          <MFormItem :config="item" :params="params">
            <template
              v-for="slotKey in ['prefix', 'suffix']"
              :key="slotKey"
              #[`${item.prop}_${slotKey}`]
            >
              <slot :name="`${item.prop}_${slotKey}`"></slot>
            </template>
          </MFormItem>
        </slot>
      </ElFormItem>
    </template>
  </ElForm>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElTooltip, ElSpace } from "element-plus";
import MFormItem from "./m_form_item.vue";

import type { FormInstance } from "element-plus";
import type { FormConfigPropType, BaseType } from "./type";

import { watch, ref, unref } from "vue";

import { isFunction } from "@/utils/is";

const $props = withDefaults(defineProps<FormConfigPropType>(), {
  params: () => ({}),
  formItems: () => [],
});

defineOptions({
  name: "MForm",
});

const getTips = (tips: Required<BaseType>["tips"]) => {
  return isFunction(tips) ? tips : () => tips;
};

const form_ref = ref<FormInstance>();
const handleResetFields = () => {
  unref(form_ref)?.resetFields();
};

const handleValidate = () => {
  return new Promise((resolve, reject) => {
    unref(form_ref)?.validate((valid) => (valid ? resolve(true) : reject));
  });
};

watch(
  () => $props.formItems,
  (v) => {
    const { params } = $props;
    v.forEach(({ defaultValue, prop }) => {
      if (!defaultValue) return;
      if (Object.prototype.hasOwnProperty.call(params, prop)) {
        params[prop] = defaultValue;
      }
    });
    console.log("set default", params);
  },
  {
    immediate: true,
  }
);

defineExpose({
  handleResetFields,
  handleValidate,
});
</script>

<style scoped lang="less">
.el-form {
  :deep(.el-input__wrapper) {
    min-width: 214px;
  }
}
</style>
